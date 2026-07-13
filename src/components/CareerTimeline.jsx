import { motion } from "framer-motion";
import { useRef } from "react";

/* =======================================================
   TIMELINE DATA
======================================================= */

const timeline = [
  {
    id: 1,
    category: "Learning",
    date: "2025 — Present",
    title: "Exploring AI & ML Domain",
    org: "Continuous Learning",
    bullets: [
      "Deep diving into Machine Learning, Deep Learning, LLMs and AI systems through hands-on builds.",
      "Preparing for GATE DA while shipping practical projects on model optimization and generative AI.",
    ],
    skills: [
      "Machine Learning",
      "Deep Learning",
      "LLMs",
      "Generative AI",
      "Model Optimization",
      "GATE DA",
    ],
    color: "#8b5cf6",
  },
  {
    id: 2,
    category: "Work",
    date: "Oct 2024 — Dec 2025",
    title: "Full Stack Engineer",
    org: "Accenture",
    bullets: [
      "Developed enterprise applications using React, React Native and backend REST APIs.",
      "Collaborated with cross-functional Agile teams across sprint cycles from planning to release.",
    ],
    skills: ["React", "React Native", "JavaScript", "REST APIs", "Git", "Agile"],
    color: "#3b82f6",
  },
  {
    id: 3,
    category: "Education",
    date: "2020 — 2024",
    title: "Bachelor of Technology",
    org: "Artificial Intelligence & Machine Learning",
    bullets: [
      "Coursework centered on AI, Machine Learning, Deep Learning and Software Engineering.",
      "Built practical AI projects spanning computer vision and natural language processing.",
    ],
    skills: [
      "Python",
      "Machine Learning",
      "Deep Learning",
      "Data Structures",
      "Computer Vision",
      "NLP",
    ],
    color: "#22c55e",
  },
];

/* =======================================================
   ANIMATIONS
======================================================= */

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const cardVariants = {
  hidden: (direction) => ({
    opacity: 0,
    x: direction === "left" ? -60 : 60,
    y: 30,
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const lineVariants = {
  hidden: { height: 0 },
  visible: {
    height: "100%",
    transition: { duration: 1.8, ease: "easeInOut" },
  },
};

/* =======================================================
   COMPONENT
======================================================= */

export default function CareerTimeline() {
  const sectionRef = useRef(null);

  return (
    <section
      ref={sectionRef}
      id="experience"
       className="relative overflow-hidden px-5 sm:px-6 md:px-8 lg:px-10 py-16 md:py-24"
    >
      {/* Faint grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

      {/* Single ambient glow */}
      <div
        className="absolute left-1/2 top-24 -translate-x-1/2 w-[700px] h-[700px] rounded-full blur-[180px] opacity-[0.08] pointer-events-none"
        style={{ background: "radial-gradient(circle,#8b5cf6,transparent 70%)" }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="relative max-w-[1420px] mx-auto"
      >
        {/* Section Label */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-px" style={{ background: "var(--text-muted)" }} />
          <span
            className="uppercase tracking-[0.22em] text-xs font-mono"
            style={{ color: "var(--text-muted)" }}
          >
            Experience &middot; Education
          </span>
        </div>

        {/* Heading */}
        <div className="max-w-[760px] mb-16 md:mb-24">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight">
            Career <span className="text-purple-500">Journey.</span>
          </h2>
          <p
            className="mt-6 text-base md:text-lg leading-7 md:leading-8 max-w-[560px]"
            style={{ color: "var(--text-secondary)" }}
          >
            A reverse chronological record of the work, study and
            self-directed learning that got me here.
          </p>
        </div>

        {/* ===========================================
            TIMELINE
        =========================================== */}

        <div className="relative pl-12 sm:pl-14 md:pl-16 lg:pl-0">
          {/* Center rail — desktop only */}
          <div
            className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 overflow-hidden"
            style={{ background: "var(--glass-border)" }}
          >
            <motion.div
              variants={lineVariants}
              className="absolute top-0 left-0 w-full"
              style={{
                background: "linear-gradient(to bottom,#3b82f6,#8b5cf6,#22c55e)",
              }}
            />
          </div>

          {/* Mobile rail */}
          <div
            className="lg:hidden absolute left-[27px] md:left-[31px] top-2 bottom-2 w-px overflow-hidden"
            style={{ background: "var(--glass-border)" }}
          >
            <motion.div
              variants={lineVariants}
              className="absolute top-0 left-0 w-full"
              style={{
                background: "linear-gradient(to bottom,#3b82f6,#8b5cf6,#22c55e)",
              }}
            />
          </div>

          {timeline.map((item, index) => {
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={item.id}
                custom={isLeft ? "left" : "right"}
                variants={cardVariants}
                className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-20 xl:gap-28 items-start mb-14 md:mb-20 lg:mb-28 last:mb-0"
              >
                {/* Node — desktop centered, mobile on rail */}
                <div
                  className="absolute left-[-42px] md:left-[-46px] lg:left-1/2 top-1 lg:-translate-x-1/2 w-[19px] h-[19px] sm:w-[21px] sm:h-[21px] rounded-full border-2 flex items-center justify-center z-10"
                  style={{
                    borderColor: item.color,
                    background: "var(--bg)",
                    boxShadow: `0 0 16px ${item.color}55`,
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: item.color }}
                  />
                </div>

                {/* Card */}
                <div
                  className={`relative max-w-full lg:max-w-[600px] xl:max-w-[640px] ${
                    isLeft ? "lg:col-start-1 lg:justify-self-end" : "lg:col-start-2"
                  }`}
                >
                  <div
                    className="relative rounded-2xl border p-5 sm:p-6 md:p-7 backdrop-blur-xl transition-colors duration-500 hover:border-white/20"
                    style={{
                      background:
                        "linear-gradient(145deg,rgba(255,255,255,.045),rgba(255,255,255,.015))",
                      borderColor: "var(--glass-border)",
                      boxShadow: "0 8px 32px rgba(0,0,0,.3)",
                    }}
                  >
                    {/* Meta row */}
                    <div
                      className="flex flex-wrap items-baseline gap-x-2 gap-y-1 font-mono text-xs uppercase tracking-wider"
                      style={{ color: item.color }}
                    >
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <span style={{ color: "var(--text-muted)" }}>&middot;</span>
                      <span>{item.category}</span>
                      <span style={{ color: "var(--text-muted)" }}>&middot;</span>
                      <span style={{ color: "var(--text-muted)" }}>{item.date}</span>
                    </div>

                    {/* Title + org */}
                    <h3 className="text-xl md:text-2xl font-bold mt-3">{item.title}</h3>
                    <p className="mt-1.5" style={{ color: "var(--text-secondary)" }}>
                      {item.org}
                    </p>

                    {/* Divider */}
                    <div
                      className="my-5 h-px"
                      style={{ background: "rgba(255,255,255,.08)" }}
                    />

                    {/* Bullets */}
                    <ul className="space-y-2.5">
                      {item.bullets.map((bullet, i) => (
                        <li
                          key={i}
                          className="flex gap-3 text-sm md:text-base leading-6 md:leading-7"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          <span className="shrink-0" style={{ color: item.color }}>
                            &mdash;
                          </span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Skill tags */}
                    <div className="flex flex-wrap gap-2 mt-5">
                      {item.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 rounded-md text-xs font-mono border"
                          style={{
                            background: `${item.color}12`,
                            color: item.color,
                            borderColor: `${item.color}30`,
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Empty column to preserve alternating grid on desktop */}
                <div className={`hidden lg:block ${isLeft ? "" : "lg:col-start-1 lg:row-start-1"}`} />
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}