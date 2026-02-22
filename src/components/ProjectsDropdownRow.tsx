import Link from "next/link";

export function ProjectsDropdownRow() {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-4 text-center">
      <Link
        href="/#projects"
        className="text-sm text-black/70 transition-colors hover:text-black"
      >
        View all projects →
      </Link>
    </div>
  );
}
