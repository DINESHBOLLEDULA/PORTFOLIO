import { useEffect, useState } from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import Preloader from "./components/Preloader";
import emailjs from "@emailjs/browser";
import {
  ArrowRight,
  Download,
  Mail,
  User,
  Lock,
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

  const [formData, setFormData] = useState({
  name: "",
  email: "",
  topic: "Project inquiry",
  message: "",
});

const [sending, setSending] = useState(false);
const [success, setSuccess] = useState(false);
const [hoveredField, setHoveredField] = useState(null);

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

  const handleSubmit = async (e) => {
  e.preventDefault();

  setSending(true);

  try {
    await emailjs.send(
      "service_cupd2yo",
      "template_ked7cnu",
      {
        from_name: formData.name,
        from_email: formData.email,
        topic: formData.topic,
        message: formData.message,
      },
      "hPrLGtaHuvetDJrKy"
    );

    setSuccess(true);

    setFormData({
      name: "",
      email: "",
      topic: "Project inquiry",
      message: "",
    });

    setTimeout(() => {
      setSuccess(false);
    }, 3000);

  } catch (error) {
  console.log("EMAILJS ERROR:", error);

  alert(
    JSON.stringify(error, null, 2)
  );
}
  setSending(false);
};

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
      <div className="relative z-10 px-13 pt-25">
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
    mb-2
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
  {/* <button
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
  </button> */}
</div>

      </div>
    </section>


   {/* CONTACT SECTION */}
<section
  id="contact"
  className="
    px-4
    sm:px-6
    md:px-8
    lg:px-10
    pt-16
    pb-8
    md:pt-24
    md:pb-10
  "
>
  <div
  className="
    grid
    grid-cols-1
    lg:grid-cols-2
    gap-10
    lg:gap-16
    items-start
    max-w-[1420px]
    mx-auto
  "
>

    {/* LEFT SIDE */}
    <div>
      <div className="flex items-center gap-3 mb-8">
        <div className="w-8 h-[1px] bg-zinc-600" />
        <span className="uppercase tracking-[0.2em] text-xs text-zinc-400 font-mono">
          CONTACT
        </span>
      </div>

      <h2
        className="
          text-[36px]
sm:text-[44px]
md:text-[52px]
lg:text-[60px]
          leading-[0.95]
          tracking-[-0.05em]
          font-bold
        "
      >
        Let's build
        <br />
        something useful.
      </h2>

      <p
        className="
          mt-6
          text-[17px]
          leading-[1.9]
          text-[var(--text-secondary)]
          max-w-full lg:max-w-[460px]
        "
      >
        Open to AI Engineering roles, applied AI
        collaborations, and building scalable AI-powered
        platforms using LLMs, RAG, and modern AI
        workflows. I usually respond within 48 hours.
      </p>

      {/* EMAIL CARD */}
      <a
        href="mailto:dineshbolledula@gmail.com"
        className="
          mt-8
          border
          rounded-[22px]
          px-5
          py-4
          flex
          items-center
          justify-between
          transition-all
          duration-300
          hover:-translate-y-1
          hover:border-zinc-600
          group
          w-full
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
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div
            className="h-11 w-11 rounded-xl flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, rgba(56,189,248,0.15), rgba(217,70,239,0.15))",
            }}
          >
            <Mail
              size={18}
              className="transition-all duration-300 group-hover:scale-110 group-hover:text-cyan-300"
            />
          </div>
          <div>
            <p className="text-xs text-zinc-400">Email</p>
            <p
  className="
    text-[13px]
    sm:text-[15px]
    font-medium
    truncate
  "
>
  dineshbolledula@gmail.com
</p>
          </div>
        </div>
       <ArrowRight
  size={18}
  className="
    shrink-0
    transition-transform
    duration-300
    group-hover:translate-x-1
  "
/>
      </a>

    <div
  className="
    grid
    grid-cols-2
    gap-4
    mt-4
    w-full
  "
>
        {/* GITHUB */}
        <a
          href="https://github.com/DINESHBOLLEDULA"
          target="_blank"
          rel="noreferrer"
          className="
  group
  relative
  h-[90px]
md:h-[85px]
  rounded-[16px]
  border
 px-4
py-3
  flex
  flex-col
  justify-between
  transition-all
  duration-300
  hover:-translate-y-1
"
          style={{
            background: theme === "dark" ? "rgba(255,255,255,0.02)" : "#ffffff",
            borderColor: theme === "dark" ? "rgba(255,255,255,0.08)" : "#e2e8f0",
          }}
        >
          <FaGithub size={15} className="transition-all duration-300 group-hover:scale-110 group-hover:text-cyan-300" />
          <div>
            <p className="text-[11px] text-zinc-500">GitHub</p>
            <p className="text-[12px]
sm:text-[13px] font-medium tracking-[-0.03em]">@dineshbolledula</p>
          </div>
        </a>

        {/* LINKEDIN */}
        <a
          href="https://linkedin.com/in/dineshbolledula"
          target="_blank"
          rel="noreferrer"
          className="
  group
  relative
  h-[90px]
md:h-[85px]
  rounded-[16px]
  border
 px-4
py-3
  flex
  flex-col
  justify-between
  transition-all
  duration-300
  hover:-translate-y-1
"
          style={{
            background: theme === "dark" ? "rgba(255,255,255,0.02)" : "#ffffff",
            borderColor: theme === "dark" ? "rgba(255,255,255,0.08)" : "#e2e8f0",
          }}
        >
          <FaLinkedin size={15} className="transition-all duration-300 group-hover:scale-110 group-hover:text-cyan-400" />
          <div>
            <p className="text-[11px] text-zinc-500">LinkedIn</p>
            <p className="text-[12px]
sm:text-[13px] font-medium tracking-[-0.03em]">in/dineshbolledula</p>
          </div>
        </a>
      </div>
    </div>

    {/* RIGHT SIDE — FORM / SUCCESS */}
    <div
      className="
  border
  rounded-[24px]
  backdrop-blur-xl
  overflow-hidden
  w-full
"
      style={{
        background:
          theme === "dark" ? "rgba(255,255,255,0.03)" : "#ffffff",
        borderColor:
          theme === "dark" ? "rgba(255,255,255,0.10)" : "#e2e8f0",
        minHeight: "480px",
      }}
    >
      {success ? (
        /* ── SUCCESS STATE ── */
        <div className="
  flex
  flex-col
  items-center
  justify-center
  h-full
  px-5
  sm:px-8
  md:px-10
  py-14
  md:py-20
  text-center
" style={{ minHeight: "480px" }}>
          {/* Animated checkmark ring */}
          <div className="relative mb-8">
            <div
              className="h-20 w-20 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, rgba(165,216,255,0.15), rgba(224,170,255,0.15))",
                border: "1px solid rgba(165,216,255,0.25)",
              }}
            >
              {/* Outer pulse ring */}
              <span
                className="absolute inset-0 rounded-full animate-ping opacity-20"
                style={{ background: "linear-gradient(135deg, #a5d8ff, #e0aaff)" }}
              />
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <path
                  d="M8 18.5L14.5 25L28 11"
                  stroke="url(#grad)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <defs>
                  <linearGradient id="grad" x1="8" y1="18" x2="28" y2="18" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#a5d8ff" />
                    <stop offset="1" stopColor="#e0aaff" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Heading */}
          <h3
            className="text-[28px] font-bold tracking-[-0.04em] mb-3"
          >
            Message received.
          </h3>

          {/* Subtext */}
          <p className="text-[15px] leading-[1.8] text-zinc-400 max-w-[320px] mb-2">
            Thanks{formData.name ? `, ${formData.name.split(" ")[0]}` : ""}. I'll read every word and get back to you within 48 hours.
          </p>

          {/* Divider with label */}
          <div className="flex items-center gap-3 my-7 w-full max-w-[280px]">
            <div className="flex-1 h-px" style={{ background: theme === "dark" ? "rgba(255,255,255,0.08)" : "#e2e8f0" }} />
            <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-[0.15em]">while you wait</span>
            <div className="flex-1 h-px" style={{ background: theme === "dark" ? "rgba(255,255,255,0.08)" : "#e2e8f0" }} />
          </div>

          {/* Suggestions row */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {[
              { label: "View Projects", href: "#projects" },
              { label: "Read Writing", href: "#writing" },
              { label: "Check GitHub", href: "https://github.com/DINESHBOLLEDULA", ext: true },
            ].map(({ label, href, ext }) => (
              <a
                key={label}
                href={href}
                target={ext ? "_blank" : undefined}
                rel={ext ? "noreferrer" : undefined}
                className="px-4 py-2 rounded-full border text-[13px] font-mono transition-all duration-200 hover:-translate-y-[1px]"
                style={{
                  borderColor: theme === "dark" ? "rgba(255,255,255,0.14)" : "#e2e8f0",
                  color: "var(--text-primary)",
                }}
              >
                {label}
              </a>
            ))}
          </div>

          {/* Send another */}
          <button
            onClick={() => {
              setSuccess(false);
              setFormData({ name: "", email: "", topic: "Project inquiry", message: "" });
            }}
            className="text-[12px] font-mono text-zinc-500 hover:text-zinc-300 transition-colors underline underline-offset-4"
          >
            Send another message
          </button>
        </div>
      ) : (
        /* ── FORM STATE ── */
        <form
  onSubmit={handleSubmit}
  className="
    p-4
    sm:p-6
    md:p-7
  "
>
          {/* NAME + EMAIL ROW */}
          <div
  className="
    grid
    grid-cols-1
    md:grid-cols-2
    gap-5
    mb-8
  "
>
            <div>
              <label className="block text-[11px] uppercase tracking-[0.18em] text-zinc-400 mb-2 font-mono">
                Your Name
              </label>
              <input
                type="text"
                value={formData.name}
                maxLength={50}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                onMouseEnter={() => setHoveredField("name")}
                onMouseLeave={() => setHoveredField(null)}
                placeholder="Andrej Karpathy"
                required
                className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-300 placeholder-zinc-600 focus:border-zinc-500"
                style={{
                  background: theme === "dark" ? "rgba(255,255,255,0.04)" : "#f8fafc",
                  borderColor:
                    hoveredField === "name"
                      ? theme === "dark" ? "rgba(255,255,255,0.30)" : "#94a3b8"
                      : theme === "dark" ? "rgba(255,255,255,0.10)" : "#e2e8f0",
                  color: "var(--text-primary)",
                  boxShadow: hoveredField === "name"
                    ? theme === "dark" ? "0 0 0 3px rgba(255,255,255,0.04)" : "0 0 0 3px rgba(0,0,0,0.04)"
                    : "none",
                }}
              />
              <div className="flex justify-between mt-1.5">
                <span className="text-[11px] text-zinc-500 font-mono">Min 2, max 50 characters</span>
                <span className="text-[11px] text-zinc-500 font-mono">{formData.name.length}/50</span>
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-[0.18em] text-zinc-400 mb-2 font-mono">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                onMouseEnter={() => setHoveredField("email")}
                onMouseLeave={() => setHoveredField(null)}
                placeholder="ada@analytical.org"
                required
                className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-300 placeholder-zinc-600 focus:border-zinc-500"
                style={{
                  background: theme === "dark" ? "rgba(255,255,255,0.04)" : "#f8fafc",
                  borderColor:
                    hoveredField === "email"
                      ? theme === "dark" ? "rgba(255,255,255,0.30)" : "#94a3b8"
                      : theme === "dark" ? "rgba(255,255,255,0.10)" : "#e2e8f0",
                  color: "var(--text-primary)",
                  boxShadow: hoveredField === "email"
                    ? theme === "dark" ? "0 0 0 3px rgba(255,255,255,0.04)" : "0 0 0 3px rgba(0,0,0,0.04)"
                    : "none",
                }}
              />
            </div>
          </div>

          {/* TOPIC PILLS */}
          <div className="mb-5">
            <label className="block text-[11px] uppercase tracking-[0.18em] text-zinc-400 mb-3 font-mono">
              What's this about?
            </label>
            <div className="flex flex-wrap gap-2">
              {["Project inquiry", "Consulting", "Speaking", "Just saying hi"].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setFormData({ ...formData, topic: t })}
                  className="px-4 py-2 rounded-full border text-sm transition-all duration-200 font-mono"
                  style={{
                    background:
                      formData.topic === t
                        ? theme === "dark" ? "#ffffff" : "#0f172a"
                        : "transparent",
                    color:
                      formData.topic === t
                        ? theme === "dark" ? "#000000" : "#ffffff"
                        : "var(--text-primary)",
                    borderColor:
                      formData.topic === t
                        ? theme === "dark" ? "#ffffff" : "#0f172a"
                        : theme === "dark" ? "rgba(255,255,255,0.18)" : "#d1d5db",
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* MESSAGE */}
          <div className="mb-5">
            <label className="block text-[11px] uppercase tracking-[0.18em] text-zinc-400 mb-2 font-mono">
              Message
            </label>
            <textarea
              rows={7}
              value={formData.message}
              maxLength={5000}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              onMouseEnter={() => setHoveredField("message")}
              onMouseLeave={() => setHoveredField(null)}
              placeholder="Tell me about what you're building, who's involved, and what success looks like."
              required
              className="w-full rounded-xl border px-4 py-4 text-sm resize-none outline-none transition-all duration-300 placeholder-zinc-600 focus:border-zinc-500"
              style={{
                background: theme === "dark" ? "rgba(255,255,255,0.04)" : "#f8fafc",
                borderColor:
                  hoveredField === "message"
                    ? theme === "dark" ? "rgba(255,255,255,0.30)" : "#94a3b8"
                    : theme === "dark" ? "rgba(255,255,255,0.10)" : "#e2e8f0",
                color: "var(--text-primary)",
                boxShadow: hoveredField === "message"
                  ? theme === "dark" ? "0 0 0 3px rgba(255,255,255,0.04)" : "0 0 0 3px rgba(0,0,0,0.04)"
                  : "none",
              }}
            />
            <div className="flex justify-between mt-1.5">
              <span className="text-[11px] text-zinc-500 font-mono">Min 10, max 5000 characters</span>
              <span className="text-[11px] text-zinc-500 font-mono">{formData.message.length}/5000</span>
            </div>
          </div>

          {/* FORM FOOTER */}
         <div
  className="
    flex
    flex-col
    sm:flex-row
    gap-4
    sm:gap-0
    items-start
    sm:items-center
    justify-between
  "
>
            <div className="flex items-center gap-2 text-zinc-500">
              <Lock size={12} />
              <span className="text-[12px] font-mono">Encrypted in transit · Never shared</span>
            </div>
            <button
              type="submit"
              disabled={sending}
             className="
  h-12
  w-full
  sm:w-auto
  px-6
  rounded-full
  text-black
  font-semibold
  text-sm
  flex
  justify-center
  items-center
  gap-2
  hover:scale-[1.03]
  transition-all
  duration-300
  disabled:opacity-50
"
              style={{ background: "linear-gradient(90deg, #a5d8ff, #e0aaff)" }}
            >
              {sending ? (
                <>
                  <svg className="animate-spin" width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  Sending...
                </>
              ) : (
                <>Send message <ArrowRight size={15} /></>
              )}
            </button>
          </div>
        </form>
      )}
    </div>

  </div>
</section>



  {/* FOOTER */}
<footer
  className="
    relative
    border-t
    border-[var(--footer-border)]
    px-5
    sm:px-6
    lg:px-14
     pt-10
    md:pt-12
    pb-8
    mt-0
  "
>
  <div
  className="
  grid
  grid-cols-1
  sm:grid-cols-2
  lg:grid-cols-4
  gap-6
  lg:gap-8
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
  <a
    href="#about"
    className="
    footer-link
group
inline-flex
items-center
gap-2
w-fit
text-[17px]
text-[var(--text-primary)]
transition-all
duration-300
hover:translate-x-1
hover:text-cyan-500
"
  >
    About
    <span
    className="
      opacity-0
      -translate-x-2
      transition-all
      duration-300
      group-hover:opacity-100
      group-hover:translate-x-0
    "
  >
    →
  </span>
  </a>

  <a
    href="#projects"
    className="
    footer-link
group
inline-flex
items-center
gap-2
w-fit
text-[17px]
text-[var(--text-primary)]
transition-all
duration-300
hover:translate-x-1
hover:text-cyan-500
"
  >
    Projects
    <span
    className="
      opacity-0
      -translate-x-2
      transition-all
      duration-300
      group-hover:opacity-100
      group-hover:translate-x-0
    "
  >
    →
  </span>
  </a>

  <a
    href="#experience"
    className="
    footer-link
group
inline-flex
items-center
gap-2
w-fit
text-[17px]
text-[var(--text-primary)]
transition-all
duration-300
hover:translate-x-1
hover:text-cyan-500
"
  >
    Experience
    <span
    className="
      opacity-0
      -translate-x-2
      transition-all
      duration-300
      group-hover:opacity-100
      group-hover:translate-x-0
    "
  >
    →
  </span>
  </a>

  <a
    href="#stack"
   className="
   footer-link
group
inline-flex
items-center
gap-2
w-fit
text-[17px]
text-[var(--text-primary)]
transition-all
duration-300
hover:translate-x-1
hover:text-cyan-500
"
  >
    Stack
    <span
    className="
      opacity-0
      -translate-x-2
      transition-all
      duration-300
      group-hover:opacity-100
      group-hover:translate-x-0
    "
  >
    →
  </span>
  </a>

  <a
    href="#contact"
    className="
    footer-link
group
inline-flex
items-center
gap-2
w-fit
text-[17px]
text-[var(--text-primary)]
transition-all
duration-300
hover:translate-x-1
hover:text-cyan-500
"
  >
    Contact
    <span
    className="
      opacity-0
      -translate-x-2
      transition-all
      duration-300
      group-hover:opacity-100
      group-hover:translate-x-0
    "
  >
    →
  </span>
  </a>
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
group
flex
items-center
gap-3
w-fit
transition-all
duration-300
hover:translate-x-1
hover:text-cyan-500
"
    >
     <FaGithub
  size={18}
  className="
    transition-all
    duration-300
    group-hover:scale-110
  "
/>
      <span>GitHub</span>
    </a>

    <a
      href="https://www.linkedin.com/in/dineshbolledula/"
      target="_blank"
      rel="noreferrer"
      className="
group
flex
items-center
gap-3
w-fit
transition-all
duration-300
hover:translate-x-1
hover:text-cyan-500
"
    >
      <FaLinkedin
  size={18}
  className="
    transition-all
    duration-300
    group-hover:scale-110
  "
/>
      <span>LinkedIn</span>
    </a>

    <a
      href="https://medium.com/@dineshbolledula"
      target="_blank"
      rel="noreferrer"
      className="
group
flex
items-center
gap-3
w-fit
transition-all
duration-300
hover:translate-x-1
hover:text-cyan-500
"
    >
      <FaMedium
  size={18}
  className="
    transition-all
    duration-300
    group-hover:scale-110
  "
/>
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
    rounded-xl
    border
    px-4
    py-3
    backdrop-blur-xl
    max-w-[260px]
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

          <span className="font-medium text-sm">
  Available for work
</span>
        </div>

        <p
  className="
    mt-2
    text-xs
    text-[var(--text-muted)]
  "
>
  Open to AI/ML opportunities
</p>
      </div>
    </div>
  </div>

  {/* BOTTOM */}
 <div
  className="
    mt-6
    border-t
    pt-4
    text-sm
    text-[var(--text-muted)]
  "
  style={{
    borderColor: "var(--footer-border)"
  }}
>
  © 2026 dineshkumar
</div>
</footer>
  </main>
);
}

export default App;