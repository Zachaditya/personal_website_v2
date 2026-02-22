export type Project = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  short?: string;
  overview?: string;
  highlights: string[];
  repoUrl?: string;
  wip?: boolean;
  liveUrl?: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "portfolio_recommender",
    title: "Portfolio Recommender System",
    date: "Jan 2026",
    tags: ["AI", "Financial Modelling", "Next.js", "TypeScript", "UI/UX", "FastAPI", "SQLite3"],
    short:
      "Building a tailored portfolio recommendation system using LLMs to provide personalized investment suggestions based on user risk preferences and market data.",
    overview: `Building a tailored portfolio recommendation system based on user's answers to a set of survey questions to calibrate user's risk appetite and investment goals.
Portfolio recommendations take into account volatility spikes in different markets, institutional maturity and returns`,
    highlights: [
      "Risk survey + onboarding UX (calibrates risk appetite + goals)",
      "LLM-driven portfolio recommendations (transparent rationale, constraints-aware)",
      "Market signal inputs (volatility spikes, asset class maturity, returns considerations)",
      "Full-stack pipeline (Next.js UI → FastAPI endpoints → SQLite persistence)",
    ],
    repoUrl: "https://github.com/Zachaditya/eshop-hm_dataset",
    wip: true,
  },
  {
    slug: "hm-shop",
    title: "HM-Shop: E-commerce Simulation + AI Shopping Assistant",
    date: "Jan 2026",
    tags: ["LLM", "AI", "Next.js", "TypeScript", "UI/UX", "FastAPI", "SQLite3"],
    short:
      "Built a modern Next.js storefront over an H&M dataset with search/filtering, product pages, cart, and a chatbot grounded in catalog context.",
    overview: `This project simulates a full, end-to-end e-commerce experience using real product metadata from the Kaggle H&M dataset. I built the frontend as a responsive storefront with Next.js App Router and TypeScript modelling real online e-commerce shops with all the features you would expect: a product catalog, a search bar to query products, an add to cart feature, an onboarding feature as well as a chatbot to help guide the user to the best-fit products.
On the backend, I used FastAPI with SQLite to serve product data through a set of REST endpoints. This keeps the system realistic: the frontend isn't mock data—it fetches products, details, and similar items dynamically, like a real commerce stack.
The standout feature is an AI shopping assistant embedded in the site. Instead of being a generic chatbot, it's grounded in the actual catalog: the assistant receives relevant product context from the backend (based on the user's query or browsing state) and uses that context to answer questions and recommend items without inventing products. If something isn't present in the dataset (like sizing/fit), the assistant explicitly says it's unavailable.`,
    highlights: [
      "Search + filtering UX (category browsing, fast search, filters)",
      "Product detail pages + similar items (catalog-based recommendations)",
      "Cart + checkout flow (add/remove/update quantities, responsive UI states)",
      "AI shopping assistant grounded in catalog context (no hallucinated products)",
    ],
    repoUrl: "https://github.com/Zachaditya/eshop-hm_dataset",
    liveUrl: "https://eshop-hm-dataset.vercel.app",
  },
  {
    slug: "internal-dacs-tool",
    title: "DACS Risk Management and Visualization Tool",
    date: "August 2025",
    tags: ["Quant", "Risk Analysis", "Financial Modelling", "Python", "Flask", "Data Science/Visualization"],
    short:
      "An visualization tool used to analyze portfolio risk to maintain optimal risk parameters for the user base",
    overview:
      "During my time at Aetherum.ai, I built the Digital Asset Credit Score. A credit scoring metric focused on analyzing user portfolios holistically to give Aetherum the most suitable loan terms. I created an internal tool for the team to use to keep track of the changing crypto market which is extremely volatile and tweak the financial model as the team see fit",
    highlights: [
      "Wallet-level Digital Asset Credit Score (DACS) built from on-chain + market signals for underwriting",
      "Python scoring pipeline + API layer to serve real-time risk metrics to internal consumers",
      "Evaluation/backtesting harness (stress scenarios, threshold tuning, calibration) to validate reliability",
      "Internal dashboard for model introspection (drilldowns, explainability-style signals, audit-friendly outputs)",
    ],
    repoUrl: "https://github.com/Zachaditya/DACS_viz",
    liveUrl: "https://dacsviz-production.up.railway.app",
  },
  {
    slug: "dacs",
    title: "Digital Asset Credit Score: Wallet-Level Risk Modeling",
    date: "June 2025",
    tags: ["Python", "Risk Analysis", "Financial Modeling", "Data Science", "Statistics"],
    short:
      "Built a wallet-level risk scoring model for crypto-collateralized lending, combining market volatility signals and conventional credit scoring metrics into an interpretable Digital Asset Credit Score (DACS).",
    overview: `This project builds a Digital Asset Credit Score (DACS) to quantify wallet-level risk for crypto-collateralized lending. The model aggregates on-chain behavior signals (e.g., activity/flows and wallet characteristics) alongside market risk signals (e.g., volatility and drawdown proxies) into a structured score that can be used to inform underwriting and risk controls.

I focused on making the system practical for real-world decisioning: clear feature definitions, transparent scoring logic, and evaluation workflows to tune thresholds and validate stability under changing market conditions. The result is a score designed to be interpretable, testable, and usable as an input to collateral parameters and portfolio risk monitoring.`,
    highlights: [
      "Designed a wallet-level scoring framework (DACS) combining on-chain behavior features with market risk signals",
      "Built a Python feature pipeline for cleaning, transforming, and aggregating wallet metrics into model-ready inputs",
      "Created evaluation + backtesting workflows to tune score thresholds and sanity-check stability across market regimes",
      "Produced interpretable outputs to support underwriting decisions and risk parameter setting for collateralization",
    ],
    repoUrl: "https://github.com/Zachaditya/Digital-Asset-Credit-Score-Wallet-Level-Risk-Modeling",
  },
  {
    slug: "spotify",
    title: "Spotify Playlist Generator",
    date: "March 2025",
    tags: ["UI/UX", "Machine Learning", "Search Engine", "Recommendation System", "Data Science"],
    short:
      "Built a Spotify-style playlist builder with search and ML-driven recommendations that update based on the user's evolving playlist.",
    overview: `This project simulates a Spotify-like experience where users can search tracks, build playlists, and receive personalized recommendations from that playlist. I implemented the core recommendation logic using similarity-based ML techniques, turning playlist context into ranked suggestions that adapt as tracks are added or removed.

On the product side, I focused on making the workflow feel real: fast search, clean UI states, and recommendation panels designed for iteration. On the engineering side, I structured the system so the recommendation pipeline and search layer are modular and testable, enabling quick experimentation with feature weighting, ranking logic, and evaluation metrics.`,
    highlights: [
      "Playlist creation UX with real-time updates (add/remove tracks, responsive UI states)",
      "Search engine for tracks with ranked results and query handling for fast discovery",
      "ML-based recommendation pipeline (playlist-to-track similarity + ranking) that adapts as the playlist changes",
      "Modular architecture for experimentation (feature weighting, ranking tweaks, and evaluation metrics)",
    ],
    repoUrl: "https://github.com/Zachaditya/playlist_recommender",
    liveUrl: "https://playlistrecommender-production.up.railway.app",
  },
  {
    slug: "tableau",
    title: "Tableau Dashboard for Sales Analysis",
    date: "January 2025",
    tags: ["Tableau", "Data Science/Visualization", "SQL", "Interactive Dashboards"],
    short:
      "Built an interactive Tableau dashboard for sales and revenue analysis, enabling drilldowns by time, product, and customer segments from a simulated business dataset.",
    overview: `This project focuses on turning raw transactional sales data into a dashboard that supports real business questions: What's driving revenue? Which products and regions are growing? Where are margins slipping? I built an interactive Tableau dashboard with KPI summaries and drilldown views, allowing users to slice performance by time period, category, geography, and customer segments.

To keep the analysis reliable and scalable, I used SQL to clean and transform the underlying dataset into analysis-ready tables (e.g., consistent date dimensions, normalized product/customer fields, and aggregated metrics). The final dashboard emphasizes clarity and usability—filters, cross-highlighting, and tooltips that make it easy to move from high-level trends to specific drivers behind changes in sales and revenue.`,
    highlights: [
      "Designed an interactive Tableau dashboard with KPI cards and drilldowns (sales, revenue, and trend views)",
      "Built SQL transformations to clean, join, and aggregate raw transactions into analysis-ready tables",
      "Implemented filters and segmentation (time, product/category, region, customer segment) for exploratory analysis",
      "Added usability features like tooltips and cross-highlighting to quickly identify drivers behind performance changes",
    ],
    repoUrl: "https://github.com/Zachaditya/Tableau_salesDashboard",
  },
  {
    slug: "sp500",
    title: "S&P 500 Predictor using Machine Learning",
    date: "December 2024",
    tags: ["Machine Learning", "Jupyter Notebook", "Statistics", "Financial Modeling", "Risk Analysis"],
    short:
      "Built a Random Forest classifier to predict next-day S&P 500 direction using historical price/volume features and technical indicators, evaluated with precision-focused metrics.",
    overview: `This project explores next-day direction prediction for the S&P 500 using a supervised machine learning pipeline. I built a feature set from historical market data—price and volume history plus common technical indicators—and trained a Random Forest classifier to predict whether the index would move up or down the following day.

The emphasis was on creating a realistic evaluation loop rather than just fitting a model. I used time-aware splits to avoid lookahead bias, compared model performance against simple baselines, and evaluated results with precision-centric metrics to better reflect the cost of false positives in trading-style decisioning. The notebook is structured as an end-to-end workflow: data ingestion and cleaning, feature engineering, model training/tuning, and performance analysis with clear plots and diagnostics.`,
    highlights: [
      "End-to-end ML pipeline in Jupyter (data ingestion → feature engineering → training → evaluation)",
      "Engineered technical indicator features from historical price/volume data (trend, momentum, and volatility signals)",
      "Trained and tuned a Random Forest classifier for next-day direction prediction with time-aware validation",
      "Evaluated performance using precision-focused metrics and baseline comparisons to assess practical signal quality",
    ],
    repoUrl: "https://github.com/Zachaditya/SP500-Predictor",
  },
];
