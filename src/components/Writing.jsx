import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
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

// ── Fallback articles (shown if RSS fetch fails) ──────────────────────────────
// Update these with your real article links from medium.com/@dineshbolledula
const FALLBACK_ARTICLES = [
  {
    guid: "1",
    title: "Memoization in Neural Networks",
    link: "https://medium.com/@dineshbolledula",
    pubDate: "2025-05-20",
    description: "Memoization isn't just an optimization trick in neural networks, it's what makes training deep networks computationally feasible.",
    content: "Memoization isn't just an optimization trick in neural networks, it's what makes training deep networks computationally feasible. A deep dive into how caching intermediate computations unlocks efficiency in backpropagation and beyond.",
    categories: ["Deep Learning"],
    thumbnail: null,
  },
  {
    guid: "2",
    title: "Types of Machine Learning Systems",
    link: "https://medium.com/@dineshbolledula",
    pubDate: "2025-05-14",
    description: "Before diving into the categories of machine learning, we must first understand the problem we are trying to solve.",
    content: "Before diving into the categories of machine learning, we must first understand the problem we are trying to solve. A comprehensive breakdown of supervised, unsupervised, and reinforcement learning paradigms.",
    categories: ["Machine Learning"],
    thumbnail: null,
  },
];

// ── RSS fetch via rss2json ────────────────────────────────────────────────────
async function fetchFeed() {
  try {
    const res = await fetch(RSS2JSON_URL);
    if (!res.ok) return null;
    const data = await res.json();
//     if (data.status === "ok" && data.items?.length) {
//       return data.items.map((item) => {
//   const enclosure =
//     item.enclosure?.link ||
//     item.thumbnail ||
//     null;

//   return {
//     guid: item.guid,
//     title: item.title,
//     link: item.link,
//     pubDate: item.pubDate,
//     description: item.description,
//     content: item.content,
//     categories: item.categories || [],
//     thumbnail: enclosure,
//   };
// });
//     }


if (data.status === "ok" && data.items?.length) {
  return data.items.map((item) => {

    return {
      guid: item.guid,
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      description: item.description,
      content: item.content,
      categories: item.categories || [],
      thumbnail: item.thumbnail || null,
    };
  });
}
    return null;
  } catch {
    return null;
  }
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function estimateReadTime(content = "") {
  const words = content.replace(/<[^>]+>/g, "").split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

function stripHtml(html = "") {
  return html.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").trim();
}

function extractThumbnail(item) {
  const title = item.title.toLowerCase();

  if (title.includes("memoization"))
    return ARTICLE_THUMBNAILS.memoization;

  if (title.includes("machine learning systems"))
    return ARTICLE_THUMBNAILS.mlsystems;

  return ARTICLE_THUMBNAILS.default;
}





function ArticleCard({
  item,
  theme,
}) {
  const image =
    extractThumbnail(item);
  
  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="
        group
        rounded-[28px]
        overflow-hidden
        border
        no-underline
        transition-all
        duration-300
        hover:-translate-y-2
hover:shadow-[0_20px_60px_rgba(124,58,237,.12)]
        
      "
      
      style={{
        background:
          theme === "dark"
            ? "rgba(255,255,255,.03)"
            : "#fff",

        borderColor:
          theme === "dark"
            ? "rgba(255,255,255,.08)"
            : "#e2e8f0",

            boxShadow:
  theme === "dark"
    ? "0 20px 60px rgba(124,58,237,.12)"
    : "0 20px 50px rgba(124,58,237,.08)"
      }}
    >
  <div
  className="
    relative
    h-[180px]
    sm:h-[200px]
    lg:h-[220px]
    overflow-hidden
  "
>
        {image && (
  <img
  src={image}
  alt={item.title}
  className="
    absolute
    inset-0
    w-full
    h-full
    object-contain
    p-4
    md:p-6
    transition-transform
    duration-700
    group-hover:scale-105
  "
/>
)}
      </div>

      <div className="p-5">

        <div className="flex flex-wrap gap-2 mb-4">

  {(item.categories || [])
    .slice(0, 3)
    .map((tag) => (
      <span
        key={tag}
        className="
          text-[11px]
          px-2
          py-1
          rounded-md
          bg-cyan-500/10
          text-cyan-500
        "
      >
        {tag}
      </span>
    ))}

</div>

        <h3
          className="
            text-xl
            font-semibold
            leading-snug
            mb-3
          "
        >
          {item.title}
        </h3>

        <p
          className="
            text-sm
            leading-7
            mb-5
          "
          style={{
            color:
              "var(--text-secondary)",
          }}
        >
          {stripHtml(
            item.description
          ).substring(0, 80)}
          ...
        </p>

        <div
          className="
            flex
            justify-between
            items-center
          "
        >
          <span
            className="text-xs"
            style={{
              color:
                "var(--text-secondary)",
            }}
          >
            {estimateReadTime(
              item.content
            )} min read
          </span>

          <ArrowRight
            size={18}
            className="
              text-purple-500
              transition-transform
              duration-300
              group-hover:translate-x-2
            "
          />
        </div>

      </div>
    </a>
  );
}
function FeaturedArticle({
  item,
  theme,
}) {
  const image =
    extractThumbnail(item);
  

  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="
        group
        block
        rounded-[32px]
        overflow-hidden
        border
        no-underline
      "
      style={{
        background:
          theme === "dark"
            ? "rgba(255,255,255,.03)"
            : "#fff",

        borderColor:
          theme === "dark"
            ? "rgba(255,255,255,.08)"
            : "#e2e8f0",
      }}
    >
   <div
  className="
    grid
    lg:grid-cols-[1.1fr_1fr]
  "
>

        {/* IMAGE */}
       <div
  className="
    relative
    overflow-hidden
    aspect-[16/10]
    lg:aspect-auto
    lg:h-full
   min-h-[180px]
sm:min-h-[220px]
  "
>
          {image && (
  <img
  src={image}
  alt={item.title}
  className="
    absolute
    inset-0
    w-full
    h-full
    object-contain
    p-4
    md:p-6
    transition-transform
    duration-700
    group-hover:scale-105
  "
/>
)}
        </div>

        {/* CONTENT */}
        <div className="p-5 sm:p-6 lg:p-8">

         <div
  className="
    flex
    flex-col
    sm:flex-row
    sm:items-center
    gap-3
    mb-6
  "
>

            <span
              className="
  text-[10px]
  w-fit
  sm:text-xs
  px-2
  sm:px-3
  py-1
  rounded-md
  bg-cyan-500/10
  text-cyan-500
"
            >
              FEATURED
            </span>

            <div className="flex flex-wrap gap-2">

  {(item.categories || [])
  .slice(0, window.innerWidth < 640 ? 2 : 3)
    .map((tag) => (
      <span
        key={tag}
        className="
        w-fit
          text-xs
          px-3
          py-1
          rounded-md
          bg-cyan-500/10
          text-cyan-500
        "
      >
        {tag}
      </span>
    ))}

</div>

          </div>

          <h3
          className="
  text-2xl
  sm:text-3xl
  md:text-4xl
  font-bold
"
          >
            {item.title}
          </h3>

          <p
            className="
              text-base
              leading-8
              mb-8
            "
            style={{
              color:
                "var(--text-secondary)",
            }}
          >
            {stripHtml(
              item.description
            ).substring(0, 220)}
            ...
          </p>

          <div
            className="
              flex
              items-center
              justify-between
            "
          >
            <span
              className="text-sm"
              style={{
                color:
                  "var(--text-secondary)",
              }}
            >
              {estimateReadTime(
                item.content
              )} min read
            </span>

            <ArrowRight
              className="
                text-purple-500
                transition-transform
                duration-300
                group-hover:translate-x-2
              "
            />
          </div>

        </div>
      </div>
    </a>
  );
}
// ── Main component ─────────────────────────────────────────────────────────────
export default function Writing({ theme = "dark" }) {
  const [articles, setArticles] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    fetchFeed().then((parsed) => {
      if (parsed && parsed.length) {
        setArticles(parsed);
        setStatus("success");
      } else {
        // RSS failed or empty — show hardcoded fallback articles
        setArticles(FALLBACK_ARTICLES);
        setStatus("success");
      }
    });
  }, []);

  const featured = articles[0] || null;
  const rest = articles.slice(1,5);


  // 👇 ADD THIS HERE
  if (status === "loading") {
    return (
      <section
  id="writing"
  className="
    px-4
    sm:px-6
    md:px-8
    lg:px-10
    py-24
  "
>
        <div className="max-w-5xl mx-auto">

          <div
            className="
              h-[420px]
              rounded-[32px]
              animate-pulse
            "
            style={{
              background:
                theme === "dark"
                  ? "rgba(255,255,255,0.04)"
                  : "rgba(0,0,0,0.04)",
            }}
          />

        </div>
      </section>
    );
  }


  return (
  <section
  id="writing"
  className="
    px-5
    sm:px-6
    md:px-8
    lg:px-10
    py-16
    md:py-24
  "
>
  <div className="max-w-[1420px] mx-auto">

    {/* Section Label */}
    <div className="flex items-center gap-3 mb-8">
      <div
        className="w-8 h-px"
        style={{
          background:
            theme === "dark"
              ? "#52525b"
              : "#cbd5e1",
        }}
      />
      <span
        className="
          uppercase
          tracking-[0.2em]
          text-xs
          font-mono
          text-zinc-400
        "
      >
        Writing
      </span>
    </div>


<div className="max-w-[760px]">
    {/* Heading */}
    <h2
  className="
    text-[34px]
    sm:text-[42px]
    md:text-[56px]
    font-bold
    leading-[0.95]
    tracking-tight
    mb-12
  "
>
      Notes from{" "}
      <span className="text-purple-500">
        production.
      </span>
    </h2>
<div
  className="
    flex
    flex-col
    gap-3
    mb-5
    sm:flex-row
    sm:items-center
    sm:justify-between
  "
>

  <div>
    <h3 className="text-xl font-semibold">
      Published on Medium
    </h3>

    <p
      className="text-sm mt-1"
      style={{
        color: "var(--text-secondary)",
      }}
    >
      Notes on AI, Machine Learning & Deep Learning
    </p>
  </div>
</div>
 <div
  className="
    w-fit
    self-start
    px-3
    py-1.5
    rounded-full
    bg-purple-500/10
    text-purple-500
    font-medium
    text-sm
    whitespace-nowrap
    shrink-0
    mb-8
  "
>
    {articles.length}+ Articles
  </div>

</div>

    {/* FEATURED */}
    {featured && (
      <FeaturedArticle
        item={featured}
        theme={theme}
      />
    )}

    {/* GRID */}
    <div
      className="
        mt-14
        grid
        md:grid-cols-2
        gap-6
      "
    >
      {rest.map((item) => (
        <ArticleCard
          key={item.guid}
          item={item}
          theme={theme}
        />
      ))}
    </div>

    {/* BUTTON */}
   <div className="mt-12 flex justify-center sm:justify-start">
      <a
        href={`https://medium.com/@${MEDIUM_USERNAME}`}
        target="_blank"
        rel="noopener noreferrer"
        className="
  inline-flex
  items-center
  justify-center
  gap-2
  sm:gap-3
  text-purple-500
  font-medium
  transition-all
  text-sm
  sm:text-base
  whitespace-nowrap
"
      >
        <FaMedium size={18} />
        View all articles
        <ArrowRight size={18} />
      </a>
    </div>

  </div>
</section>
  );
}