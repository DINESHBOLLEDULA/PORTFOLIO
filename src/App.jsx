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
  topic: "",
  message: "",
});

const [sending, setSending] = useState(false);
const [success, setSuccess] = useState(false);

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
        message: formData.message,
      },
      "hPrLGtaHuvetDJrKy"
    );

    setSuccess(true);

    setFormData({
      name: "",
      email: "",
      topic: "",
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
<section id="contact" className="px-10 py-20">
  <div className="grid lg:grid-cols-2 gap-16 items-start max-w-[1200px] mx-auto">

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
          text-[52px]
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
          max-w-[460px]
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
        <div className="flex items-center gap-4">
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
            <p className="text-base font-medium">dineshbolledula@gmail.com</p>
          </div>
        </div>
        <ArrowRight
          size={18}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </a>

      <div className="grid grid-cols-2 gap-4 mt-4">
        {/* GITHUB */}
        <a
          href="https://github.com/DINESHBOLLEDULA"
          target="_blank"
          rel="noreferrer"
          className="
            group relative h-[120px] rounded-[22px] border px-5 py-4
            flex flex-col justify-between transition-all duration-300 hover:-translate-y-1
          "
          style={{
            background: theme === "dark" ? "rgba(255,255,255,0.02)" : "#ffffff",
            borderColor: theme === "dark" ? "rgba(255,255,255,0.08)" : "#e2e8f0",
          }}
        >
          <FaGithub size={22} className="transition-all duration-300 group-hover:scale-110 group-hover:text-cyan-300" />
          <div>
            <p className="text-[13px] text-zinc-500">GitHub</p>
            <p className="text-[15px] font-medium tracking-[-0.03em]">@dineshbolledula</p>
          </div>
        </a>

        {/* LINKEDIN */}
        <a
          href="https://linkedin.com/in/dineshbolledula"
          target="_blank"
          rel="noreferrer"
          className="
            group relative h-[120px] rounded-[22px] border px-5 py-4
            flex flex-col justify-between transition-all duration-300 hover:-translate-y-1
          "
          style={{
            background: theme === "dark" ? "rgba(255,255,255,0.02)" : "#ffffff",
            borderColor: theme === "dark" ? "rgba(255,255,255,0.08)" : "#e2e8f0",
          }}
        >
          <FaLinkedin size={22} className="transition-all duration-300 group-hover:scale-110 group-hover:text-cyan-400" />
          <div>
            <p className="text-[13px] text-zinc-500">LinkedIn</p>
            <p className="text-[15px] font-medium tracking-[-0.03em]">in/dineshbolledula</p>
          </div>
        </a>
      </div>
    </div>

    {/* RIGHT SIDE — FORM */}
    <form
      onSubmit={handleSubmit}
      className="border rounded-[24px] p-7 backdrop-blur-xl"
      style={{
        background:
          theme === "dark" ? "rgba(255,255,255,0.03)" : "#ffffff",
        borderColor:
          theme === "dark" ? "rgba(255,255,255,0.10)" : "#e2e8f0",
      }}
    >
      {/* NAME + EMAIL ROW */}
      <div className="grid md:grid-cols-2 gap-5 mb-5">
        {/* NAME */}
        <div>
          <label className="block text-[11px] uppercase tracking-[0.18em] text-zinc-400 mb-2 font-mono">
            Your Name
          </label>
          <input
            type="text"
            value={formData.name}
            maxLength={50}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Andrej karpathy"
            required
            className="
              w-full px-4 py-3 rounded-xl border text-sm outline-none
              transition-all duration-300 placeholder-zinc-600
              focus:border-zinc-500
            "
            style={{
              background: theme === "dark" ? "rgba(255,255,255,0.04)" : "#f8fafc",
              borderColor: theme === "dark" ? "rgba(255,255,255,0.10)" : "#e2e8f0",
              color: "var(--text-primary)",
            }}
          />
          <div className="flex justify-between mt-1.5">
            <span className="text-[11px] text-zinc-500 font-mono">Min 2, max 50 characters</span>
            <span className="text-[11px] text-zinc-500 font-mono">{formData.name.length}/50</span>
          </div>
        </div>

        {/* EMAIL */}
        <div>
          <label className="block text-[11px] uppercase tracking-[0.18em] text-zinc-400 mb-2 font-mono">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="ada@analytical.org"
            required
            className="
              w-full px-4 py-3 rounded-xl border text-sm outline-none
              transition-all duration-300 placeholder-zinc-600
              focus:border-zinc-500
            "
            style={{
              background: theme === "dark" ? "rgba(255,255,255,0.04)" : "#f8fafc",
              borderColor: theme === "dark" ? "rgba(255,255,255,0.10)" : "#e2e8f0",
              color: "var(--text-primary)",
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
          {["Project inquiry", "Consulting", "Speaking", "Just saying hi"].map(
            (t) => (
              <button
                key={t}
                type="button"
                onClick={() =>
                  setFormData({ ...formData, topic: t === formData.topic ? "" : t })
                }
                className="
                  px-4 py-2 rounded-full border text-sm
                  transition-all duration-200 font-mono
                "
                style={{
                  background:
                    formData.topic === t
                      ? theme === "dark"
                        ? "#ffffff"
                        : "#0f172a"
                      : "transparent",
                  color:
                    formData.topic === t
                      ? theme === "dark"
                        ? "#000000"
                        : "#ffffff"
                      : "var(--text-primary)",
                  borderColor:
                    formData.topic === t
                      ? theme === "dark"
                        ? "#ffffff"
                        : "#0f172a"
                      : theme === "dark"
                      ? "rgba(255,255,255,0.18)"
                      : "#d1d5db",
                }}
              >
                {t}
              </button>
            )
          )}
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
          placeholder="Tell me about what you're building, who's involved, and what success looks like."
          required
          className="
            w-full rounded-xl border px-4 py-4 text-sm resize-none outline-none
            transition-all duration-300 placeholder-zinc-600
            focus:border-zinc-500
          "
          style={{
            background: theme === "dark" ? "rgba(255,255,255,0.04)" : "#f8fafc",
            borderColor: theme === "dark" ? "rgba(255,255,255,0.10)" : "#e2e8f0",
            color: "var(--text-primary)",
          }}
        />
        <div className="flex justify-between mt-1.5">
          <span className="text-[11px] text-zinc-500 font-mono">Min 10, max 5000 characters</span>
          <span className="text-[11px] text-zinc-500 font-mono">{formData.message.length}/5000</span>
        </div>
      </div>

      {/* FORM FOOTER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-zinc-500">
          <Lock size={12} />
          <span className="text-[12px] font-mono">Encrypted in transit · Never shared</span>
        </div>

        <div className="flex flex-col items-end gap-2">
          {success && (
            <p className="text-emerald-400 text-sm">✓ Message sent!</p>
          )}
          <button
            type="submit"
            disabled={sending}
            className="
              h-12 px-6 rounded-full text-black font-semibold text-sm
              flex items-center gap-2
              hover:scale-[1.03] transition-all duration-300 disabled:opacity-50
            "
            style={{
              background: "linear-gradient(90deg, #a5d8ff, #e0aaff)",
            }}
          >
            {sending ? "Sending..." : "Send message"}
            {!sending && <ArrowRight size={15} />}
          </button>
        </div>
      </div>
    </form>

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