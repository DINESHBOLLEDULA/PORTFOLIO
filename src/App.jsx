import { useEffect, useState } from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import Preloader from "./components/Preloader";
import {
  ArrowRight,
  Download,
  Mail,
  
} from "lucide-react";

import {
  FaGithub,
  FaLinkedin,
   FaMedium,
  FaInstagram,
} from "react-icons/fa";
function App() {
  const [loading, setLoading] =
    useState(true);

  const [theme, setTheme] =
    useState(() => {
      return (
        localStorage.getItem(
          "theme"
        ) || "dark"
      );
    });

  useEffect(() => {
    document.documentElement.classList.remove(
      "light",
      "dark"
    );

    document.documentElement.classList.add(
      theme
    );

    localStorage.setItem(
      "theme",
      theme
    );
  }, [theme]);

  if (loading) {
    return (
      <Preloader
        onComplete={() =>
          setLoading(false)
        }
      />
    );
  }

  return (
  <main
    className="
      min-h-screen
      bg-[var(--bg)]
      text-[var(--text-primary)]
      transition-colors
      duration-500
    "
  >
    <Navbar
      theme={theme}
      setTheme={setTheme}
    />

    {/* HERO SECTION */}
    <section
      className="
        relative
        min-h-screen
        overflow-hidden
      "
    >
      {/* GRID BACKGROUND */}
      <div
        className="
          absolute
          inset-0
          pointer-events-none
          z-0
        "
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(120,120,120,0.08) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(120,120,120,0.08) 1px,
                transparent 1px
              )
            `,
            backgroundSize:
              "64px 64px",

            /* fade grid downward */
            maskImage:
              "linear-gradient(to bottom, black 40%, transparent 100%)",

            WebkitMaskImage:
              "linear-gradient(to bottom, black 40%, transparent 100%)",
          }}
        />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 px-10 pt-28">
       <div
  className="
    inline-flex
    items-center
    gap-2
    rounded-full
    border
    border-[var(--glass-border)]
    bg-[var(--badge-bg)]
    px-4
    py-2
    backdrop-blur-xl
    shadow-[var(--glass-shadow)]
    mb-6
  "
>
  <span
    className="
      h-2
      w-2
      rounded-full
      bg-emerald-400
      animate-pulse
    "
  />

  <span
    className="
      text-[10px]
      tracking-[0.18em]
      uppercase
      text-[var(--text-primary)]
      font-medium
    "
  >
    Building AI Products • Ex-ASE @ Accenture
  </span>
</div>
        <h1
          className="
            text-[90px]
            leading-[0.95]
            tracking-[-0.06em]
            font-light
          "
        >
          Building{" "}
          <span className="italic text-blue-500">
            neural
          </span>
          <br />
          systems that
          <br />
          <span className="text-purple-500">
            think,
          </span>
          <br />
          <span className="text-[var(--text-muted)]">
            reason, and ship.
          </span>
        </h1>

        <p
  className="
    mt-7
    max-w-[680px]
    text-[22px]
    leading-[1.7]
    tracking-[-0.02em]
    text-[var(--text-secondary)]
  "
>
  AI Engineer focused on building practical AI products
  using LLMs, RAG systems, AI agents, and modern AI
  workflows.
</p>
      
<div
  className="
    mt-8
    flex
    flex-wrap
    items-center
    gap-3
  "
>
<button
  className="
    group
    inline-flex
    items-center
    gap-2
    rounded-full
    px-7
    py-4
    text-[15px]
    font-semibold
    transition-all
    duration-300
    hover:-translate-y-[2px]
    hover:shadow-lg
  "
  style={{
    background:
      theme === "dark"
        ? "#ffffff"
        : "#000000",

    color:
      theme === "dark"
        ? "#000000"
        : "#ffffff",

    border: `1px solid ${
      theme === "dark"
        ? "#ffffff"
        : "#000000"
    }`,
  }}
>
  View Projects

  <ArrowRight
    size={17}
    className="
      transition-transform
      duration-300
      group-hover:translate-x-1
    "
  />
</button>
<button
  className="
    group
    inline-flex
    items-center
    gap-2
    rounded-full
    px-7
    py-4
    text-[15px]
    font-medium
    transition-all
    duration-300
    hover:-translate-y-[1px]
  "
  style={{
    background:
      theme === "dark"
        ? "#18181b" // zinc-900
        : "#f1f5f9", // slate-100

    color:
      theme === "dark"
        ? "#e4e4e7"
        : "#334155", // slate-700

    border: `1px solid ${
      theme === "dark"
        ? "#3f3f46"
        : "#cbd5e1" // slate-300
    }`,
  }}
>
  <Download size={16} />
  Download Resume
</button>


  {/* CONTACT ME */}
  <button
    className="
      group
      inline-flex
      items-center
      gap-2
      rounded-full
      px-6
      py-4
      text-[15px]
      font-medium

      text-zinc-500
      bg-transparent
      border
      border-transparent

      dark:text-zinc-300

      transition-all
      duration-300

      hover:-translate-y-[1px]

      hover:bg-zinc-100
      hover:text-black

      dark:hover:bg-white/10
      dark:hover:text-white

      rounded-full
    "
  >
    <Mail
      size={16}
      className="
        opacity-80
        group-hover:opacity-100
      "
    />

    Contact Me
  </button>
</div>

      </div>
    </section>
    {/* CONTACT SECTION */}
<section className="px-10 py-24">
  <div className="grid lg:grid-cols-2 gap-16">

    {/* LEFT SIDE */}
    <div>
      {/* LABEL */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-8 h-[1px] bg-zinc-600" />

        <span className="uppercase tracking-[0.2em] text-xs text-zinc-400">
          CONTACT
        </span>
      </div>

      {/* TITLE */}
      <h2
        className="
          text-[68px]
          leading-[0.95]
          tracking-[-0.06em]
          font-semibold
        "
      >
        Let’s build
        <br />
        something useful.
      </h2>

      {/* DESCRIPTION */}
      <p
        className="
          mt-8
          text-[22px]
          leading-[1.8]
          text-[var(--text-secondary)]
          max-w-[560px]
        "
      >
        Open to AI Engineering roles,
        applied AI collaborations,
        and building scalable
        AI-powered systems using
        LLMs, RAG, AI agents and
        modern workflows.
      </p>

      {/* EMAIL CARD */}
      <a
        href="mailto:your@email.com"
        className="
          mt-10
          border
          rounded-[30px]
          p-5
          flex
          items-center
          justify-between
          transition-all
          duration-300
          hover:-translate-y-1
          group
        "
        style={{
          background:
            theme === "dark"
              ? "rgba(255,255,255,0.03)"
              : "#ffffff",

          borderColor:
            theme === "dark"
              ? "rgba(255,255,255,0.08)"
              : "#e2e8f0",
        }}
      >
        <div className="flex items-center gap-4">
          <div
            className="
              h-14
              w-14
              rounded-2xl
              flex
              items-center
              justify-center
            "
            style={{
              background:
                "linear-gradient(135deg, rgba(56,189,248,0.15), rgba(217,70,239,0.15))",
            }}
          >
            <Mail
              size={22}
              className="text-cyan-400"
            />
          </div>

          <div>
            <p className="text-sm text-zinc-400">
              Email
            </p>

            <p className="text-lg font-medium">
              dineshbolledula@gmail.com
            </p>
          </div>
        </div>

        <ArrowRight
          size={22}
          className="
            transition-transform
            duration-300
            group-hover:translate-x-1
          "
        />
      </a>

      {/* SOCIALS */}
      <div className="grid grid-cols-2 gap-4 mt-4">

        {/* GITHUB */}
        <a
          href="https://github.com/"
          target="_blank"
          rel="noreferrer"
          className="
            border
            rounded-[28px]
            p-6
            transition-all
            duration-300
            hover:-translate-y-1
          "
          style={{
            background:
              theme === "dark"
                ? "rgba(255,255,255,0.03)"
                : "#ffffff",

            borderColor:
              theme === "dark"
                ? "rgba(255,255,255,0.08)"
                : "#e2e8f0",
          }}
        >
          <FaGithub size={24} />

          <p className="mt-5 text-zinc-400">
            GitHub
          </p>

          <p className="font-medium text-lg">
            @dinesh
          </p>
        </a>

        {/* LINKEDIN */}
        <a
          href="https://linkedin.com/"
          target="_blank"
          rel="noreferrer"
          className="
            border
            rounded-[28px]
            p-6
            transition-all
            duration-300
            hover:-translate-y-1
          "
          style={{
            background:
              theme === "dark"
                ? "rgba(255,255,255,0.03)"
                : "#ffffff",

            borderColor:
              theme === "dark"
                ? "rgba(255,255,255,0.08)"
                : "#e2e8f0",
          }}
        >
          <FaLinkedin size={24} />

          <p className="mt-5 text-zinc-400">
            LinkedIn
          </p>

          <p className="font-medium text-lg">
            /in/dinesh
          </p>
        </a>
      </div>
    </div>

    {/* RIGHT FORM */}
    <div
      className="
        border
        rounded-[40px]
        p-8
      "
      style={{
        background:
          theme === "dark"
            ? "rgba(255,255,255,0.03)"
            : "#ffffff",

        borderColor:
          theme === "dark"
            ? "rgba(255,255,255,0.08)"
            : "#e2e8f0",
      }}
    >
      {/* INPUTS */}
      <div className="grid md:grid-cols-2 gap-5">

        <div>
          <label className="block text-xs uppercase tracking-[0.2em] text-zinc-400 mb-3">
            Your Name
          </label>

          <input
            type="text"
            placeholder="Ada Lovelace"
            className="
              w-full
              rounded-[24px]
              border
              border-white/10
              bg-transparent
              px-5
              py-4
              outline-none
            "
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-[0.2em] text-zinc-400 mb-3">
            Email
          </label>

          <input
            type="email"
            placeholder="ada@analytical.org"
            className="
              w-full
              rounded-[24px]
              border
              border-white/10
              bg-transparent
              px-5
              py-4
              outline-none
            "
          />
        </div>
      </div>

      {/* TAGS */}
      <div className="mt-8">
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-400 mb-4">
          What's this about?
        </p>

        <div className="flex flex-wrap gap-3">
          <button className="px-5 py-3 rounded-full border border-cyan-400 bg-cyan-500/10">
            Project inquiry
          </button>

          <button className="px-5 py-3 rounded-full border border-white/10">
            Consulting
          </button>

          <button className="px-5 py-3 rounded-full border border-white/10">
            Speaking
          </button>

          <button className="px-5 py-3 rounded-full border border-white/10">
            Just saying hi
          </button>
        </div>
      </div>

      {/* MESSAGE */}
      <div className="mt-8">
        <label className="block text-xs uppercase tracking-[0.2em] text-zinc-400 mb-3">
          Message
        </label>

        <textarea
          rows="6"
          placeholder="Tell me about what you're building..."
          className="
            w-full
            rounded-[28px]
            border
            border-white/10
            bg-transparent
            p-5
            resize-none
            outline-none
          "
        />
      </div>

      {/* BUTTON */}
      <div className="mt-8 flex justify-between items-center flex-wrap gap-4">
        <p className="text-sm text-zinc-500">
          Usually responds within 48 hours
        </p>

        <button
          className="
            px-8
            py-4
            rounded-full
            text-black
            font-medium
            flex
            items-center
            gap-3
          "
          style={{
            background:
              "linear-gradient(90deg,#8ed8ff,#d47cff)",
          }}
        >
          Send Message
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  </div>
</section>



  {/* FOOTER */}
<footer
  className="
    relative
    border-t
    border-white/[0.06]
    px-10
    pt-20
    pb-8
    mt-10
  "
>
  <div
    className="
      grid
      grid-cols-1
      md:grid-cols-4
      gap-12
    "
  >
    {/* LEFT */}
    <div className="md:col-span-1">
      <div className="flex items-center gap-4">
        <div
          className="
            h-12
            w-12
            rounded-full
            flex
            items-center
            justify-center
            font-medium
            text-black
            bg-gradient-to-br
            from-cyan-300
            to-purple-400
          "
        >
          DK
        </div>

        <div>
          <h3 className="text-lg font-semibold">
            Dinesh Kumar B
          </h3>

          <p className="text-sm text-[var(--text-secondary)]">
            AI/ML Engineer • India
          </p>
        </div>
      </div>

      <p
        className="
          mt-6
          text-[16px]
          leading-8
          text-[var(--text-secondary)]
          max-w-sm
        "
      >
        Designed and built with too much
        coffee and a healthy obsession
        for neural systems, LLMs and
        AI products.
      </p>
    </div>

    {/* SITEMAP */}
    <div>
      <p
        className="
          text-xs
          uppercase
          tracking-[0.2em]
          text-[var(--text-muted)]
          mb-5
        "
      >
        Sitemap
      </p>

      <div className="flex flex-col gap-3">
        {[
          "About",
          "Projects",
          "Experience",
          "Stack",
          "Contact",
        ].map((item) => (
          <a
            key={item}
            href="#"
            className="
              text-[17px]
              text-[var(--text-primary)]
              hover:opacity-70
              transition
            "
          >
            {item}
          </a>
        ))}
      </div>
    </div>

    {/* SOCIALS */}
<div>
  <p
    className="
      text-xs
      uppercase
      tracking-[0.2em]
      text-[var(--text-muted)]
      mb-5
    "
  >
    Socials
  </p>

  <div className="flex flex-col gap-4">

    <a
      href="https://github.com/DINESHBOLLEDULA"
      target="_blank"
      rel="noreferrer"
      className="
        flex
        items-center
        gap-3
        hover:opacity-70
        transition
      "
    >
      <FaGithub size={18} />
      <span>GitHub</span>
    </a>

    <a
      href="https://www.linkedin.com/in/dineshbolledula/"
      target="_blank"
      rel="noreferrer"
      className="
        flex
        items-center
        gap-3
        hover:opacity-70
        transition
      "
    >
      <FaLinkedin size={18} />
      <span>LinkedIn</span>
    </a>

    <a
      href="https://medium.com/@dineshbolledula"
      target="_blank"
      rel="noreferrer"
      className="
        flex
        items-center
        gap-3
        hover:opacity-70
        transition
      "
    >
      <FaMedium size={18} />
      <span>Medium</span>
    </a>

    {/* <a
      href="https://instagram.com/YOUR_USERNAME"
      target="_blank"
      rel="noreferrer"
      className="
        flex
        items-center
        gap-3
        hover:opacity-70
        transition
      "
    >
      <FaInstagram size={18} />
      <span>Instagram</span>
    </a> */}

  </div>
</div>

    {/* STATUS */}
    <div>
      <p
        className="
          text-xs
          uppercase
          tracking-[0.2em]
          text-[var(--text-muted)]
          mb-5
        "
      >
        Status
      </p>

      <div
        className="
          rounded-3xl
          border
          p-5
          backdrop-blur-xl
        "
        style={{
          background:
            theme === "dark"
              ? "rgba(255,255,255,0.03)"
              : "rgba(255,255,255,0.7)",

          borderColor:
            theme === "dark"
              ? "rgba(255,255,255,0.08)"
              : "rgba(15,23,42,0.08)",
        }}
      >
        <div className="flex items-center gap-3">
          <span
            className="
              h-3
              w-3
              rounded-full
              bg-emerald-400
              animate-pulse
            "
          />

          <span className="font-medium">
            AI systems normal
          </span>
        </div>

        <p
          className="
            mt-4
            text-sm
            text-[var(--text-muted)]
          "
        >
          version 1.0.0 • uptime 99.9%
        </p>
      </div>
    </div>
  </div>

  {/* BOTTOM */}
  <div
    className="
      mt-16
      border-t
      border-white/[0.06]
      pt-8
      text-sm
      text-[var(--text-muted)]
    "
  >
    © 2026 dineshkumar
  </div>
</footer>
  </main>
);
}

export default App;