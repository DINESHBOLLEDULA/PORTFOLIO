import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({
  theme,
  setTheme,
}) {
  const [scrolled, setScrolled] =
    useState(false);

  const [menuOpen, setMenuOpen] =
    useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(
        window.scrollY > 60
      );
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  const links = [
    "About",
    "Projects",
    "Experience",
    "Stack",
    "Writing",
    "Contact",
  ];

  const glassButtonStyle = {
    background:
      theme === "light"
        ? "rgba(255,255,255,0.12)"
        : "var(--button-bg)",

    borderColor:
      theme === "light"
        ? "rgba(255,255,255,0.25)"
        : "var(--button-border)",

    backdropFilter:
      "blur(18px) saturate(180%)",

    WebkitBackdropFilter:
      "blur(18px) saturate(180%)",
  };

  return (
    <>
      <header
        className="
          fixed
          top-4
          left-1/2
          z-50
          w-full
          -translate-x-1/2
          pointer-events-none
          px-2
          sm:px-4
        "
      >
        <motion.nav
          animate={{
            backgroundColor:
              theme === "light"
                ? scrolled
                  ? "rgba(255,255,255,0.18)"
                  : "rgba(255,255,255,0.10)"
                : scrolled
                ? "rgba(255,255,255,0.055)"
                : "rgba(255,255,255,0.015)",

            borderColor:
              theme === "light"
                ? "rgba(255,255,255,0.28)"
                : scrolled
                ? "rgba(255,255,255,0.12)"
                : "rgba(255,255,255,0.04)",

            boxShadow:
              theme === "light"
                ? `
                  0 8px 32px rgba(31,38,135,0.10),
                  inset 0 1px 0 rgba(255,255,255,0.55),
                  inset 0 -1px 0 rgba(255,255,255,0.08)
                `
                : scrolled
                ? `
                  0 10px 40px rgba(0,0,0,0.22),
                  inset 0 1px 0 rgba(255,255,255,0.12)
                `
                : `
                  inset 0 1px 0 rgba(255,255,255,0.06)
                `,
          }}
          transition={{
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            backdropFilter:
              theme === "light"
                ? scrolled
                  ? "blur(28px) saturate(220%)"
                  : "blur(22px) saturate(200%)"
                : scrolled
                ? "blur(40px) saturate(180%)"
                : "blur(18px) saturate(140%)",

            WebkitBackdropFilter:
              theme === "light"
                ? scrolled
                  ? "blur(28px) saturate(220%)"
                  : "blur(22px) saturate(200%)"
                : scrolled
                ? "blur(40px) saturate(180%)"
                : "blur(18px) saturate(140%)",
          }}
          className="
            pointer-events-auto
            relative
            mx-auto
            flex

            w-[94%]
            sm:w-[90%]
            md:w-[84%]
            lg:w-[78%]
            xl:w-[68%]
            2xl:w-[64%]

            max-w-[1250px]

            items-center
            justify-between
            overflow-hidden
            rounded-full
            border

            px-3
            py-2
            sm:px-5
            lg:px-6
            sm:px-5
            lg:px-6
          "
        >
          {/* glass shine */}
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              rounded-full
              bg-gradient-to-b
              from-white/[0.08]
              via-white/[0.03]
              to-transparent
            "
          />

          {/* LEFT */}
          <div
            className="
              relative
              z-10
              flex
              items-center
              gap-2
              shrink-0
            "
          >
            <div className="relative shrink-0">
              <div
                className="
                  flex
                  h-9
                  w-9
                  sm:h-10
                  sm:w-10
                  items-center
                  justify-center
                  rounded-full
                  bg-gradient-to-br
                  from-pink-300
                  to-purple-500
                  text-sm
                  font-medium
                  text-black
                "
              >
                DK
              </div>

              <div
                className="
                  absolute
                  bottom-0
                  right-0
                  h-2.5
                  w-2.5
                  rounded-full
                  border
                  border-black
                  bg-green-400
                "
              />
            </div>

            <span
  className="
    block
    text-[14px]
    sm:text-[15px]
    md:text-[18px]
    font-medium
    text-[var(--text-primary)]

    whitespace-nowrap
    overflow-hidden
    text-ellipsis
    max-w-[140px]
    sm:max-w-none
  "
>
  Dinesh Kumar B
</span>
          </div>

          {/* DESKTOP */}
          <div
            className="
              hidden
              xl:flex
              items-center
              gap-7
              relative
              z-10
            "
          >
            {links.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="
                  text-[15px]
                  text-[var(--nav-text)]
                  transition
                  hover:text-[var(--nav-hover)]
                "
              >
                {item}
              </a>
            ))}
          </div>

          {/* TABLET */}
          <div
            className="
              hidden
              md:flex
              xl:hidden
              items-center
              gap-6
              relative
              z-10
            "
          >
            {[
              "About",
              "Projects",
              "Experience",
            ].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="
                  text-[15px]
                  font-medium
                  whitespace-nowrap
                  text-[var(--nav-text)]
                  transition
                  hover:text-[var(--nav-hover)]
                "
              >
                {item}
              </a>
            ))}
          </div>

          {/* RIGHT DESKTOP */}
          <div
            className="
              hidden
              xl:flex
              items-center
              gap-3
              relative
              z-10
            "
          >
            <button
              onClick={() =>
                setTheme(
                  theme === "dark"
                    ? "light"
                    : "dark"
                )
              }
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                border
              "
              style={glassButtonStyle}
            >
              {theme === "dark"
                ? "☀️"
                : "🌙"}
            </button>

            <div
              className="
                flex
                items-center
                rounded-full
                border
                px-4
                py-2
                text-sm
                whitespace-nowrap
                text-[var(--text-primary)]
              "
              style={{
                ...glassButtonStyle,
                boxShadow:
                  theme === "light"
                    ? `
                    inset 0 1px 0 rgba(255,255,255,0.45)
                  `
                    : "none",
              }}
            >
              <span className="mr-2 text-green-400">
                ●
              </span>
              Available
            </div>
          </div>

          {/* MOBILE + TABLET */}
          <div
            className="
              flex
              items-center
              gap-2
              xl:hidden
              relative
              z-10
            "
          >
            <button
              onClick={() =>
                setTheme(
                  theme === "dark"
                    ? "light"
                    : "dark"
                )
              }
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                border
                shrink-0
              "
              style={{
                ...glassButtonStyle,
                color:
                  "var(--text-primary)",
              }}
            >
              {theme === "dark"
                ? "☀️"
                : "🌙"}
            </button>

            <button
              onClick={() =>
                setMenuOpen(
                  !menuOpen
                )
              }
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                border
                text-lg
                shrink-0
              "
              style={{
                ...glassButtonStyle,
                color:
                  "var(--text-primary)",
              }}
            >
              ☰
            </button>
          </div>
        </motion.nav>
      </header>

      <motion.div
  initial={false}
  animate={{
    opacity: menuOpen ? 1 : 0,
    y: menuOpen ? 0 : -10,
    scale: menuOpen ? 1 : 0.97,
    pointerEvents: menuOpen ? "auto" : "none",
  }}
  transition={{
    duration: 0.22,
    ease: [0.22, 1, 0.36, 1],
  }}
  className="xl:hidden"
 style={{
  position: "fixed",
  top: 80,
  right: 16,
  zIndex: 40,
  minWidth: 270,
  borderRadius: 30,
  padding: "12px",
  overflow: "hidden",

  willChange: "transform, opacity",
  transformOrigin: "top right",

  /* REAL APPLE GLASS */
  backdropFilter:
    theme === "light"
      ? `
        blur(70px)
        saturate(220%)
      `
      : `
        blur(140px)
        saturate(200%)
        contrast(1.08)
      `,

  WebkitBackdropFilter:
    theme === "light"
      ? `
        blur(70px)
        saturate(220%)
      `
      : `
        blur(140px)
        saturate(200%)
        contrast(1.08)
      `,

  /* KEY FIX FOR DARK MODE */
  background:
    theme === "light"
      ? `
        linear-gradient(
          180deg,
          rgba(255,255,255,0.58) 0%,
          rgba(255,255,255,0.40) 100%
        )
      `
      : `
        linear-gradient(
          180deg,
          rgba(38,38,50,0.46) 0%,
          rgba(18,18,30,0.34) 55%,
          rgba(10,10,20,0.26) 100%
        )
      `,

  border:
    theme === "light"
      ? "1px solid rgba(255,255,255,0.82)"
      : "1px solid rgba(255,255,255,0.12)",

  boxShadow:
    theme === "light"
      ? `
        0 16px 48px rgba(0,0,0,0.08),
        inset 0 1px 0 rgba(255,255,255,0.95),
        inset 0 -1px 0 rgba(255,255,255,0.15)
      `
      : `
        0 30px 90px rgba(0,0,0,0.82),
        inset 0 1px 0 rgba(255,255,255,0.14),
        inset 0 -1px 0 rgba(255,255,255,0.03),
        inset 0 0 50px rgba(255,255,255,0.02)
      `,
}}
>
    {/* Apple glass shine */}
<div
  className="pointer-events-none absolute inset-0"
  style={{
    background:
      theme === "light"
        ? `
          linear-gradient(
            180deg,
            rgba(255,255,255,0.22) 0%,
            rgba(255,255,255,0.06) 22%,
            transparent 55%
          )
        `
        : `
          linear-gradient(
            180deg,
            rgba(255,255,255,0.18) 0%,
            rgba(255,255,255,0.06) 18%,
            transparent 50%
          )
        `,
  }}
/>
  {/* Apple specular top-edge highlight */}
  <div
    aria-hidden="true"
    style={{
      position: "absolute",
      top: 1,
      left: "12%",
      right: "12%",
      height: 1,
      borderRadius: 999,
      background: theme === "light"
        ? "rgba(255,255,255,0.95)"
        : "rgba(255,255,255,0.22)",
      pointerEvents: "none",
    }}
  />

  {links.map((item) => (
    <a
      key={item}
      href={`#${item.toLowerCase()}`}
      onClick={() => setMenuOpen(false)}
      style={{
        display: "block",
        borderRadius: 16,
        padding: "11px 16px",
        fontSize: 17,
        fontWeight: 600,
        letterSpacing: "-0.02em",
        color: "var(--nav-text)",
        textDecoration: "none",
        transition: "background 0.12s ease, color 0.12s ease",
        position: "relative",
        zIndex: 1,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = theme === "light"
          ? "rgba(0,0,0,0.06)"
          : "rgba(255,255,255,0.14)";
        e.currentTarget.style.color = "var(--nav-hover)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.color = "var(--nav-text)";
      }}
    >
      {item}
    </a>
  ))}
</motion.div>
    </>
  );
}