import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const sequence = [
  {
    type: "command",
    text: "$ ssh dinesh@portfolio.ai",
    pause: 250,
  },
  {
    type: "output",
    text: "Authenticating...                  ✓",
    pause: 180,
  },
  {
    type: "output",
    text:
      "Connected to Dinesh Kumar B's portfolio",
    pause: 180,
  },
  {
    type: "output",
    text: "OS: AI/ML Engineer v1.0",
    pause: 120,
  },
  {
    type: "output",
    text:
      "Uptime: 22 years · Location: India",
    pause: 220,
  },
  {
    type: "space",
    text: "",
    pause: 100,
  },
  {
    type: "command",
    text:
      "$ ./initialize_model.sh",
    pause: 250,
  },
  {
    type: "output",
    text:
      "Loading neural weights...          ✓",
    pause: 120,
  },
  {
    type: "output",
    text:
      "Mounting RAG pipeline...           ✓",
    pause: 120,
  },
  {
    type: "output",
    text:
      "Connecting vector store...         ✓",
    pause: 220,
  },
  {
    type: "space",
    text: "",
    pause: 100,
  },
  {
    type: "output",
    text:
      "Training portfolio model...",
    pause: 250,
  },
];

const wait = (ms) =>
  new Promise((resolve) =>
    setTimeout(resolve, ms)
  );

export default function Preloader({
  onComplete,
}) {
  const [history, setHistory] =
    useState([]);
  const [current, setCurrent] =
    useState("");
  const [currentType, setCurrentType] =
    useState("output");

  const scrollRef = useRef(null);
  const hasStarted = useRef(false);

  /* auto scroll */
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top:
          scrollRef.current
            .scrollHeight,
        behavior: "smooth",
      });
    }
  }, [history, current]);

  useEffect(() => {
    if (hasStarted.current)
      return;

    hasStarted.current = true;

    let mounted = true;

    const typeLine = async (
      text,
      speed = 10
    ) => {
      setCurrent("");

      for (
        let i = 0;
        i <= text.length;
        i++
      ) {
        if (!mounted) return;

        setCurrent(
          text.slice(0, i)
        );

        await wait(speed);
      }
    };

    const runTerminal =
      async () => {
        for (const item of sequence) {
          if (!mounted) return;

          setCurrentType(
            item.type
          );

          if (
            item.type ===
            "space"
          ) {
            setHistory(
              (prev) => [
                ...prev,
                {
                  text: "",
                  type: "space",
                },
              ]
            );

            await wait(
              item.pause
            );
            continue;
          }

          await typeLine(
            item.text,
            item.type ===
              "command"
              ? 16
              : 10
          );

          setHistory(
            (prev) => [
              ...prev,
              item,
            ]
          );

          setCurrent("");

          await wait(
            item.pause
          );
        }

        const epochs = [
          {
            loss: "2.4821",
            acc: "0.31",
            progress: 33,
          },
          {
            loss: "0.8342",
            acc: "0.74",
            progress: 66,
          },
          {
            loss: "0.0271",
            acc: "0.99",
            progress: 100,
          },
        ];

        for (
          let i = 0;
          i < epochs.length;
          i++
        ) {
          const epoch =
            epochs[i];

          for (
            let progress = 0;
            progress <= 10;
            progress++
          ) {
            const bar =
              "█".repeat(
                progress
              ) +
              "░".repeat(
                10 -
                  progress
              );

            setCurrentType(
              "command"
            );

            setCurrent(
              `Epoch ${
                i + 1
              }/3  loss: ${
                epoch.loss
              }  acc: ${
                epoch.acc
              }  ${bar}  ${
                epoch.progress
              }%`
            );

            await wait(28);
          }

          setHistory(
            (prev) => [
              ...prev,
              {
                type:
                  "command",
                text: `Epoch ${
                  i + 1
                }/3  loss: ${
                  epoch.loss
                }  acc: ${
                  epoch.acc
                }  ██████████  ${
                  epoch.progress
                }%`,
              },
            ]
          );

          setCurrent("");

          await wait(180);
        }

        const ending = [
          {
            type: "output",
            text:
              "Model converged. Deploying Dinesh Kumar B... ✓",
          },
          {
            type:
              "command",
            text:
              "$ portfolio launched successfully 🚀",
          },
        ];

        for (const line of ending) {
          setCurrentType(
            line.type
          );

          await typeLine(
            line.text,
            line.type ===
              "command"
              ? 16
              : 10
          );

          setHistory(
            (prev) => [
              ...prev,
              line,
            ]
          );

          setCurrent("");

          await wait(180);
        }

        setCurrentType(
          "command"
        );

        setCurrent(
          "Launching portfolio..."
        );

        await wait(450);

        setCurrent("");

        await wait(250);

        if (mounted) {
          onComplete();
        }
      };

    runTerminal();

    return () => {
      mounted = false;
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="
          fixed
          inset-0
          z-50
          flex
          items-center
          justify-center
          bg-[#02040a]
          px-3
        "
        initial={{
          opacity: 1,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
          y: -120,
          scale: 0.96,
          filter:
            "blur(10px)",
        }}
        transition={{
          duration: 0.75,
          ease: [
            0.22,
            1,
            0.36,
            1,
          ],
        }}
      >
        <motion.div
          className="
            relative

            w-[94vw]
sm:w-[86vw]
md:w-[760px]
lg:w-[860px]

h-[38vh]
sm:h-[36vh]
md:h-[280px]
lg:h-[290px]

max-w-[860px]

mx-5
sm:mx-8

            rounded-[20px]
            sm:rounded-[24px]
            lg:rounded-[26px]

            border
            border-green-500/20
            bg-black

            px-4
py-3
sm:px-5
sm:py-4
lg:px-5
lg:py-4

            font-mono
            shadow-2xl
          "
          initial={{
            opacity: 0,
            y: 40,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.6,
          }}
        >
          {/* terminal top bar */}
          <div
            className="
              flex
              items-center
              gap-2
              mb-3
              sm:mb-4
              border-b
              border-white/10
              pb-3
              sm:pb-4
            "
          >
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />

            <span
              className="
                ml-3
                sm:ml-4
                text-[11px]
                sm:text-sm
                text-gray-400
                truncate
              "
            >
              ~/dinesh/portfolio
            </span>
          </div>

          {/* skip */}
          <button
            onClick={
              onComplete
            }
            className="
              absolute
              right-4
              top-4
              sm:right-6
              sm:top-5
              lg:right-8
              lg:top-7

              text-green-400
              text-[12px]
              sm:text-sm

              hover:text-green-300
              transition
            "
          >
            [skip]
          </button>

          {/* content */}
          <div
            ref={scrollRef}
            className="
              h-[calc(100%-50px)]
              overflow-y-auto
              pr-2

              text-[11px]
leading-5

sm:text-[13px]
sm:leading-6

md:text-[14px]
md:leading-7

lg:text-[16px]
lg:leading-8
              sm:leading-7

              md:text-[15px]
              md:leading-8

              lg:text-[17px]
              lg:leading-8

              scrollbar-hide
            "
          >
            {history.map(
              (
                line,
                index
              ) => (
                <div
                  key={index}
                  className={
                    line.type ===
                    "command"
                      ? "text-green-400 break-words"
                      : "text-white break-words"
                  }
                >
                  {line.text}
                </div>
              )
            )}

            <div
              className={
                currentType ===
                "command"
                  ? "text-green-400 break-words"
                  : "text-white break-words"
              }
            >
              {current}

              <span className="animate-pulse text-green-400">
                █
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}