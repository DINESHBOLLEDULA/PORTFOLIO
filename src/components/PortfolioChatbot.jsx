import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";

const WELCOME_MESSAGE = "Hi — I'm Dinesh's digital portfolio. Ask me about my work, experience, skills, or background.";
const SUGGESTIONS = ["What do you work on?", "Tell me about your experience", "What are your skills?"];
const CHAT_API_URL = import.meta.env.VITE_CHAT_API_URL?.replace(/\/$/, "");

// Kept self-contained so pixel-art visuals and section-aware prompts can evolve independently.
export default function PortfolioChatbot({ theme, activeSection }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ id: "welcome", role: "assistant", content: WELCOME_MESSAGE }]);
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messageSequence = useRef(0);

  useEffect(() => {
    if (CHAT_API_URL) fetch(`${CHAT_API_URL}/health`, { method: "GET", keepalive: true }).catch(() => {});
  }, []);

  const handleSend = async (suggestion) => {
    const content = typeof suggestion === "string" ? suggestion.trim() : inputValue.trim();
    if (!content || isSending) return;

    const sequence = ++messageSequence.current;
    const userMessage = { id: `user-${sequence}`, role: "user", content };
    const assistantMessageId = `assistant-${sequence}`;
    const conversation = [...messages.filter((message) => message.id !== "welcome"), userMessage];

    setMessages((current) => [...current, userMessage, { id: assistantMessageId, role: "assistant", content: "", isThinking: true }]);
    setInputValue("");
    setIsSending(true);

    try {
      if (!CHAT_API_URL) throw new Error("Missing VITE_CHAT_API_URL");
      const response = await fetch(`${CHAT_API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: conversation.map(({ role, content: text }) => ({ role, content: text })),
          activeSection,
        }),
      });
      if (!response.ok) throw new Error(`Chat service returned ${response.status}`);
      const { answer } = await response.json();
      setMessages((current) => current.map((message) => message.id === assistantMessageId
        ? { ...message, content: answer || "I couldn't generate a response just now. Please try again.", isThinking: false }
        : message));
    } catch (error) {
      setMessages((current) => current.map((message) => message.id === assistantMessageId
        ? { ...message, content: error.message.includes("503") ? "The portfolio chat service is waking up or temporarily unavailable. Please try again in a moment." : "I couldn't reach the chat service. Please try again.", isThinking: false }
        : message));
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[60]">
      {isOpen && <section className="mb-3 flex h-[min(560px,calc(100dvh-110px))] w-[min(380px,calc(100vw-32px))] flex-col overflow-hidden rounded-2xl border shadow-2xl" style={{ background: theme === "dark" ? "#111318" : "#fff", borderColor: "var(--glass-border)", color: "var(--text-primary)" }}>
        <header className="flex items-center justify-between border-b px-4 py-3" style={{ borderColor: "var(--glass-border)" }}>
          <div><h2 className="font-semibold">Dinesh</h2><p className="text-xs" style={{ color: "var(--text-secondary)" }}>Portfolio assistant</p></div>
          <button type="button" aria-label="Close chat" onClick={() => setIsOpen(false)}><X size={19} /></button>
        </header>
        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {messages.map((message) => <div key={message.id} className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm ${message.role === "user" ? "ml-auto bg-violet-500/20" : "border"}`} style={message.role === "assistant" ? { borderColor: "var(--glass-border)" } : undefined}>{message.content || "Thinking…"}</div>)}
          {messages.length === 1 && <div className="flex flex-wrap gap-2">{SUGGESTIONS.map((item) => <button key={item} type="button" onClick={() => handleSend(item)} className="rounded-full border px-3 py-1.5 text-xs" style={{ borderColor: "var(--glass-border)" }}>{item}</button>)}</div>}
        </div>
        <form className="flex gap-2 border-t p-3" style={{ borderColor: "var(--glass-border)" }} onSubmit={(event) => { event.preventDefault(); handleSend(); }}>
          <input value={inputValue} onChange={(event) => setInputValue(event.target.value)} disabled={isSending} placeholder="Ask about Dinesh…" className="min-w-0 flex-1 bg-transparent text-sm outline-none" />
          <button type="submit" disabled={isSending || !inputValue.trim()} aria-label="Send message"><Send size={18} /></button>
        </form>
      </section>}
      <button type="button" aria-label="Open portfolio chat" aria-expanded={isOpen} onClick={() => setIsOpen(true)} className="flex h-14 w-14 items-center justify-center rounded-full bg-violet-600 text-white shadow-lg"><MessageCircle size={24} /></button>
    </div>
  );
}
