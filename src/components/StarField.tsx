"use client";

import { useEffect, useRef } from "react";

interface Star {
  nx: number; // normalized 0–1
  ny: number;
  radius: number;
  opacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
  tint: "white" | "blue" | "purple";
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  tailLength: number;
  opacity: number;
  active: boolean;
}

const TINT_RGB: Record<Star["tint"], string> = {
  white: "255,255,255",
  blue: "180,220,255",
  purple: "210,185,255",
};

const GLOW_RGB: Record<Star["tint"], string> = {
  white: "200,220,255",
  blue: "140,200,255",
  purple: "190,160,255",
};

export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let raf: number;
    let frame = 0;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener("resize", setSize);

    // Stars — power-law radius distribution (many tiny, few large)
    const STAR_COUNT = 120;
    const rand = () => Math.random();
    const pickTint = (): Star["tint"] => {
      const r = rand();
      if (r < 0.08) return "blue";
      if (r < 0.14) return "purple";
      return "white";
    };

    const stars: Star[] = Array.from({ length: STAR_COUNT }, () => ({
      nx: rand(),
      ny: rand(),
      radius: Math.pow(rand(), 2.2) * 2.2 + 0.2,
      opacity: rand() * 0.6 + 0.3,
      twinkleSpeed: rand() * 0.028 + 0.005,
      twinklePhase: rand() * Math.PI * 2,
      tint: pickTint(),
    }));

    // Shooting star pool
    const shooters: ShootingStar[] = Array.from({ length: 3 }, () => ({
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      tailLength: 0,
      opacity: 0,
      active: false,
    }));

    const activateShooter = (s: ShootingStar) => {
      const w = canvas.width;
      const h = canvas.height;
      const angle = Math.PI / 4 + (rand() - 0.5) * 0.5;
      const speed = rand() * 11 + 8;
      s.x = rand() * w * 0.8;
      s.y = rand() * h * 0.45;
      s.vx = Math.cos(angle) * speed;
      s.vy = Math.sin(angle) * speed;
      s.tailLength = rand() * 160 + 80;
      s.opacity = 1.0;
      s.active = true;
    };

    // Nebula blobs — normalized positions, use accent palette
    type NebulaSpec = {
      fx: number;
      fy: number;
      r: number;
      rgb: string;
      a: number;
    };
    const nebulae: NebulaSpec[] = [
      { fx: 0.1,  fy: 0.08, r: 420, rgb: "13,153,255",  a: 0.042 },
      { fx: 0.88, fy: 0.18, r: 320, rgb: "162,89,255",  a: 0.048 },
      { fx: 0.5,  fy: 0.52, r: 360, rgb: "38,221,249",  a: 0.028 },
      { fx: 0.22, fy: 0.8,  r: 240, rgb: "162,89,255",  a: 0.038 },
      { fx: 0.78, fy: 0.88, r: 280, rgb: "13,153,255",  a: 0.032 },
    ];

    const drawFrame = () => {
      frame++;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // ── Nebulae ─────────────────────────────────────────────────
      for (const n of nebulae) {
        const nx = n.fx * w;
        const ny = n.fy * h;
        const grd = ctx.createRadialGradient(nx, ny, 0, nx, ny, n.r);
        grd.addColorStop(0,   `rgba(${n.rgb},${n.a})`);
        grd.addColorStop(0.5, `rgba(${n.rgb},${n.a * 0.35})`);
        grd.addColorStop(1,   `rgba(${n.rgb},0)`);
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(nx, ny, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Stars ────────────────────────────────────────────────────
      for (const s of stars) {
        const sx = s.nx * w;
        const sy = s.ny * h;
        const twinkle = prefersReducedMotion
          ? 0
          : Math.sin(frame * s.twinkleSpeed + s.twinklePhase);
        const alpha = Math.max(0, s.opacity * (0.55 + 0.45 * twinkle));

        // Soft glow halo for medium/large stars
        if (s.radius > 0.85) {
          const glowR = s.radius * 5.5;
          const glow = ctx.createRadialGradient(sx, sy, 0, sx, sy, glowR);
          glow.addColorStop(0, `rgba(${GLOW_RGB[s.tint]},${alpha * 0.45})`);
          glow.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(sx, sy, glowR, 0, Math.PI * 2);
          ctx.fill();
        }

        // Star core
        ctx.beginPath();
        ctx.arc(sx, sy, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${TINT_RGB[s.tint]},${alpha})`;
        ctx.fill();

        // Subtle cross-flare on the largest stars
        if (s.radius > 1.5) {
          const fl = s.radius * 7;
          ctx.save();
          ctx.globalAlpha = alpha * 0.22;
          ctx.strokeStyle = `rgba(${TINT_RGB[s.tint]},1)`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(sx - fl, sy);
          ctx.lineTo(sx + fl, sy);
          ctx.moveTo(sx, sy - fl);
          ctx.lineTo(sx, sy + fl);
          ctx.stroke();
          ctx.restore();
        }
      }

      // ── Shooting Stars ───────────────────────────────────────────
      if (!prefersReducedMotion) {
        for (const s of shooters) {
          if (!s.active) {
            if (rand() < 0.0025) activateShooter(s);
            continue;
          }

          s.x += s.vx;
          s.y += s.vy;
          s.opacity -= 0.017;

          if (
            s.opacity <= 0 ||
            s.x > canvas.width + 200 ||
            s.y > canvas.height + 200
          ) {
            s.active = false;
            continue;
          }

          const speed = Math.hypot(s.vx, s.vy);
          const tailX = s.x - (s.vx / speed) * s.tailLength;
          const tailY = s.y - (s.vy / speed) * s.tailLength;

          const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
          grad.addColorStop(0,   "rgba(255,255,255,0)");
          grad.addColorStop(0.6, `rgba(180,220,255,${s.opacity * 0.35})`);
          grad.addColorStop(1,   `rgba(255,255,255,${s.opacity})`);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(s.x, s.y);
          ctx.stroke();

          // Bright tip flare
          const tipGlow = ctx.createRadialGradient(
            s.x, s.y, 0,
            s.x, s.y, 7
          );
          tipGlow.addColorStop(0, `rgba(255,255,255,${s.opacity})`);
          tipGlow.addColorStop(1, "rgba(255,255,255,0)");
          ctx.fillStyle = tipGlow;
          ctx.beginPath();
          ctx.arc(s.x, s.y, 7, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(drawFrame);
    };

    drawFrame();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", setSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
