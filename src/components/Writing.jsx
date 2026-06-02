import { useEffect, useState } from "react";
import { ArrowRight, Clock } from "lucide-react";
import { FaMedium } from "react-icons/fa";

// ── Config ───────────────────────────────────────────────────────────────────
const MEDIUM_USERNAME = "dineshbolledula";
const ARTICLE_COUNT = 6;
const ARTICLE_THUMBNAILS = {
  memoization: "/articles/memoization.png",
  mlsystems: "/articles/ml-systems.png",
  default: "/articles/default-blog.png",
};
const RSS2JSON_KEY = "lpmwaazetycqxcmkwldfa4wjeuc8mvzx6qoqaymk";
const RSS2JSON_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(`https://medium.com/feed/@${MEDIUM_USERNAME}`)}&api_key=${RSS2JSON_KEY}&count=${ARTICLE_COUNT}`;

const FALLBACK_ARTICLES = [
  {
    guid: "1",
    title: "Memoization in Neural Networks",
    link: "https://medium.com/@dineshbolledula",
    pubDate: "2025-05-20",
    description:
      "Memoization isn't just an optimization trick in neural networks, it's what makes training deep networks computationally feasible.",
    content:
      "Memoization isn't just an optimization trick in neural networks, it's what makes training deep networks computationally feasible. A deep dive into how caching intermediate computations unlocks efficiency in backpropagation and beyond.",
    categories: ["Deep Learning", "ai", "backpropagation", "memoization"],
    thumbnail: null,
  },
  {
    guid: "2",
    title: "Types of Machine Learning Systems",
    link: "https://medium.com/@dineshbolledula",
    pubDate: "2025-05-14",
    description:
      "Before diving into the categories of machine learning, we must first understand the problem we are trying to solve.",
    content:
      "Before diving into the categories of machine learning, we must first understand the problem we are trying to solve. A comprehensive breakdown of supervised, unsupervised, and reinforcement learning paradigms.",
    categories: ["Machine Learning", "AI", "Data Science"],
    thumbnail: null,
  },
];

async function fetchFeed() {
  try {
    const res = await fetch(RSS2JSON_URL);
    if (!res.ok) return null;
    const data = await res.json();
    if (data.status === "ok" && data.items?.length) {
      return data.items.map((item) => ({
        guid: item.guid,
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        description: item.description,
        content: item.content,
        categories: item.categories || [],
        thumbnail: item.thumbnail || null,
      }));
    }
    return null;
  } catch {
    return null;
  }
}

function estimateReadTime(content = "") {
  const words = content.replace(/<[^>]+>/g, "").split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function stripHtml(html = "") {
  return html.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").trim();
}

function extractThumbnail(item) {
  const title = item.title.toLowerCase();
  if (title.includes("memoization")) return ARTICLE_THUMBNAILS.memoization;
  if (title.includes("machine learning systems")) return ARTICLE_THUMBNAILS.mlsystems;
  return ARTICLE_THUMBNAILS.default;
}

// ── Theme tokens ──────────────────────────────────────────────────────────────
function tokens(theme) {
  const dark = theme === "dark";
  return {
    // card background
    cardBg: dark
      ? "linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 100%)"
      : "#ffffff",

    // card border
    cardBorder: dark ? "rgba(255,255,255,0.10)" : "#e2e8f0",

    // card shadow
    cardShadow: dark
      ? "0 4px 24px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.07) inset"
      : "0 4px 20px rgba(15,23,42,0.08), 0 1px 3px rgba(15,23,42,0.05)",

    cardShadowHover: dark
      ? "0 20px 60px rgba(124,58,237,0.18), 0 4px 24px rgba(0,0,0,0.5)"
      : "0 20px 60px rgba(124,58,237,0.12), 0 4px 20px rgba(15,23,42,0.1)",

    // image panel background — KEY FIX for dark mode
    imgBg: dark
      ? "linear-gradient(135deg, #0d1117 0%, #161b27 50%, #0f172a 100%)"
      : "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",

    // tag
    tagBg: dark ? "rgba(139,92,246,0.12)" : "rgba(124,58,237,0.07)",
    tagColor: dark ? "#a78bfa" : "#7c3aed",

    // featured badge
    featuredBg: dark ? "rgba(6,182,212,0.12)" : "rgba(6,182,212,0.08)",
    featuredColor: dark ? "#22d3ee" : "#0891b2",

    // read time
    metaColor: dark ? "#71717a" : "#9ca3af",

    // description
    descColor: dark ? "#a1a1aa" : "#4b5563",
  };
}

// ── Tag chip ─────────────────────────────────────────────────────────────────
function Tag({ label, t }) {
  return (
    <span
      className="text-[11px] font-medium px-2.5 py-1 rounded-lg whitespace-nowrap"
      style={{ background: t.tagBg, color: t.tagColor }}
    >
      {label}
    </span>
  );
}

// ── Article Card (grid) ───────────────────────────────────────────────────────
function ArticleCard({ item, theme }) {
  const t = tokens(theme);
  const image = extractThumbnail(item);
  const readTime = estimateReadTime(item.content);
  const date = formatDate(item.pubDate);
  const excerpt = stripHtml(item.description).substring(0, 100) + "…";

  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-[24px] overflow-hidden border no-underline"
      style={{
        background: t.cardBg,
        borderColor: t.cardBorder,
        boxShadow: t.cardShadow,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = t.cardShadowHover;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = t.cardShadow;
      }}
    >
      {/* Image */}
      <div
        className="relative overflow-hidden"
        style={{
          height: "180px",
          background: t.imgBg,
          flexShrink: 0,
        }}
      >
        {image && (
          <img
            src={image}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-contain p-5 transition-transform duration-700 group-hover:scale-[1.04]"
          />
        )}
        {/* subtle gradient overlay at bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-10"
          style={{
            background:
              theme === "dark"
                ? "linear-gradient(to top, rgba(13,17,23,0.6), transparent)"
                : "linear-gradient(to top, rgba(248,250,252,0.4), transparent)",
          }}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {(item.categories || []).slice(0, 3).map((tag) => (
            <Tag key={tag} label={tag} t={t} />
          ))}
        </div>

        {/* Title */}
        <h3
          className="text-[17px] font-semibold leading-snug mb-2.5 flex-1"
          style={{ color: "var(--text-primary)" }}
        >
          {item.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm leading-6 mb-5" style={{ color: t.descColor }}>
          {excerpt}
        </p>

        {/* Meta footer */}
        <div className="flex items-center justify-between mt-auto pt-4"
          style={{ borderTop: `1px solid ${t.cardBorder}` }}
        >
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-xs" style={{ color: t.metaColor }}>
              <Clock size={12} />
              {readTime} min read
            </span>
            <span className="text-xs" style={{ color: t.metaColor }}>
              {date}
            </span>
          </div>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:translate-x-1"
            style={{
              background: t.tagBg,
              color: t.tagColor,
            }}
          >
            <ArrowRight size={14} />
          </div>
        </div>
      </div>
    </a>
  );
}

// ── Featured Article ──────────────────────────────────────────────────────────
function FeaturedArticle({ item, theme }) {
  const t = tokens(theme);
  const image = extractThumbnail(item);
  const readTime = estimateReadTime(item.content);
  const date = formatDate(item.pubDate);
  const excerpt = stripHtml(item.description).substring(0, 240) + "…";

  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-[28px] overflow-hidden border no-underline"
      style={{
        background: t.cardBg,
        borderColor: t.cardBorder,
        boxShadow: t.cardShadow,
        transition: "box-shadow 0.35s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = t.cardShadowHover;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = t.cardShadow;
      }}
    >
      <div className="grid lg:grid-cols-[1.05fr_1fr]">
        {/* Image panel */}
        <div
          className="relative overflow-hidden"
          style={{
            minHeight: "240px",
            background: t.imgBg,
          }}
        >
          {image && (
            <img
              src={image}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-contain p-6 md:p-8 transition-transform duration-700 group-hover:scale-[1.03]"
            />
          )}
          {/* Edge fade into content (desktop only) */}
          <div
            className="hidden lg:block absolute top-0 right-0 w-16 h-full"
            style={{
              background:
                theme === "dark"
                  ? "linear-gradient(to right, transparent, rgba(13,17,23,0.55))"
                  : "linear-gradient(to right, transparent, rgba(255,255,255,0.8))",
            }}
          />
        </div>

        {/* Content */}
        <div className="flex flex-col p-6 sm:p-8 lg:p-10">
          {/* Badges row */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span
              className="text-[11px] font-semibold px-2.5 py-1 rounded-lg tracking-wide"
              style={{ background: t.featuredBg, color: t.featuredColor }}
            >
              FEATURED
            </span>
            {(item.categories || []).slice(0, 3).map((tag) => (
              <Tag key={tag} label={tag} t={t} />
            ))}
          </div>

          {/* Title */}
          <h3
            className="text-2xl sm:text-3xl font-bold leading-tight mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            {item.title}
          </h3>

          {/* Excerpt */}
          <p
            className="text-[15px] leading-7 mb-8 flex-1"
            style={{ color: t.descColor }}
          >
            {excerpt}
          </p>

          {/* Footer */}
          <div
            className="flex items-center justify-between pt-5"
            style={{ borderTop: `1px solid ${t.cardBorder}` }}
          >
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-sm" style={{ color: t.metaColor }}>
                <Clock size={13} />
                {readTime} min read
              </span>
              <span className="text-sm" style={{ color: t.metaColor }}>
                {date}
              </span>
            </div>
            <div
              className="flex items-center gap-1.5 text-sm font-medium transition-all duration-300 group-hover:gap-2.5"
              style={{ color: t.tagColor }}
            >
              Read article
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}

// ── Skeleton loader ───────────────────────────────────────────────────────────
function Skeleton({ theme }) {
  const pulse =
    theme === "dark"
      ? "rgba(255,255,255,0.05)"
      : "rgba(0,0,0,0.05)";
  const pulseBright =
    theme === "dark"
      ? "rgba(255,255,255,0.09)"
      : "rgba(0,0,0,0.09)";

  return (
    <section
      id="writing"
      className="px-4 sm:px-6 md:px-8 lg:px-10 py-24"
    >
      <div className="max-w-[1420px] mx-auto space-y-6">
        <div
          className="h-[380px] rounded-[28px] animate-pulse"
          style={{ background: pulse }}
        />
        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-[280px] rounded-[24px] animate-pulse"
              style={{ background: pulse, animationDelay: `${i * 80}ms` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function Writing({ theme = "dark" }) {
  const [articles, setArticles] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    fetchFeed().then((parsed) => {
      if (parsed && parsed.length) {
        setArticles(parsed);
      } else {
        setArticles(FALLBACK_ARTICLES);
      }
      setStatus("success");
    });
  }, []);

  if (status === "loading") return <Skeleton theme={theme} />;

  const featured = articles[0] || null;
  const rest = articles.slice(1, 5);

  const t = tokens(theme);

  return (
    <section
      id="writing"
      className="px-5 sm:px-6 md:px-8 lg:px-10 py-16 md:py-24"
    >
      <div className="max-w-[1420px] mx-auto">

        {/* Section label */}
        <div className="flex items-center gap-3 mb-8">
          <div
            className="w-8 h-px"
            style={{ background: theme === "dark" ? "#52525b" : "#cbd5e1" }}
          />
          <span
            className="uppercase tracking-[0.2em] text-xs font-mono"
            style={{ color: t.metaColor }}
          >
            Writing
          </span>
        </div>

        {/* Heading block */}
        <div className="max-w-[760px] mb-12">
          <h2 className="text-[34px] sm:text-[42px] md:text-[56px] font-bold leading-[0.95] tracking-tight mb-8">
            Notes from{" "}
            <span className="text-purple-500">production.</span>
          </h2>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div>
              <h3 className="text-xl font-semibold" style={{ color: "var(--text-primary)" }}>
                Published on Medium
              </h3>
              <p className="text-sm mt-1" style={{ color: t.descColor }}>
                Notes on AI, Machine Learning &amp; Deep Learning
              </p>
            </div>

            <div
              className="w-fit px-3 py-1.5 rounded-full font-medium text-sm whitespace-nowrap shrink-0 sm:ml-auto"
              style={{ background: t.tagBg, color: t.tagColor }}
            >
              {articles.length}+ Articles
            </div>
          </div>
        </div>

        {/* Featured */}
        {featured && <FeaturedArticle item={featured} theme={theme} />}

        {/* Grid */}
        <div className="mt-10 grid md:grid-cols-2 gap-5">
          {rest.map((item) => (
            <ArticleCard key={item.guid} item={item} theme={theme} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 flex justify-center sm:justify-start">
          <a
            href={`https://medium.com/@${MEDIUM_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 font-medium text-sm sm:text-base whitespace-nowrap transition-all duration-300 group"
            style={{ color: t.tagColor }}
          >
            <FaMedium size={18} />
            View all articles on Medium
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </div>

      </div>
    </section>
  );
}