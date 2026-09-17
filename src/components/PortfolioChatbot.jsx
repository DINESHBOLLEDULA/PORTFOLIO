import { useEffect, useRef, useState } from "react";
import { MessageCircle, Minus, Send, X } from "lucide-react";
import "./PortfolioChatbot.css";

const WELCOME_MESSAGE = "Hi! I’m Dinesh AI.\nAsk me anything about my projects, experience, skills, or anything else!";
const SUGGESTIONS = ["My Projects", "My Skills", "My Experience"];
const CHAT_API_URL = (import.meta.env.VITE_CHAT_API_URL || "https://portfolio-azyp.onrender.com").replace(/\/$/, "");

function Avatar({ small = false }) {
  return <span className={`portfolio-avatar${small ? " portfolio-avatar--small" : ""}`} aria-hidden="true">DK</span>;
}

async function readStream(reader, decoder, onChunk, accumulated = "") {
  const { done, value } = await reader.read();
  if (done) return `${accumulated}${decoder.decode()}`;
  const next = `${accumulated}${decoder.decode(value, { stream: true })}`;
  onChunk(next);
  return readStream(reader, decoder, onChunk, next);
}

export default function PortfolioChatbot({ activeSection }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ id: "welcome", role: "assistant", content: WELCOME_MESSAGE }]);
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messageSequence = useRef(0);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetch(`${CHAT_API_URL}/health`, { method: "GET", keepalive: true }).catch(() => {});
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  const handleSend = async (suggestion) => {
    const content = (typeof suggestion === "string" ? suggestion : inputValue).trim();
    if (!content || isSending) return;

    const sequence = ++messageSequence.current;
    const userMessage = { id: `user-${sequence}`, role: "user", content };
    const assistantMessageId = `assistant-${sequence}`;
    const conversation = [...messages.filter((message) => message.id !== "welcome"), userMessage];
    setMessages((current) => [...current, userMessage, { id: assistantMessageId, role: "assistant", content: "", isThinking: true }]);
    setInputValue("");
    setIsSending(true);

    try {
      const response = await fetch(`${CHAT_API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: conversation.map(({ role, content: text }) => ({ role, content: text })), activeSection }),
      });
      if (!response.ok || !response.body) throw new Error(`Chat service returned ${response.status}`);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      const answer = await readStream(reader, decoder, (chunk) => {
        setMessages((current) => current.map((message) => message.id === assistantMessageId ? { ...message, content: chunk, isThinking: false } : message));
      });
      setMessages((current) => current.map((message) => message.id === assistantMessageId ? { ...message, content: answer || "I couldn’t generate a response just now.", isThinking: false } : message));
    } catch (error) {
      const content = error.message.includes("503") ? "I’m waking up right now. Please try again in a moment." : "I couldn’t reach the chat service. Please try again.";
      setMessages((current) => current.map((message) => message.id === assistantMessageId ? { ...message, content, isThinking: false } : message));
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="portfolio-chat">
      {isOpen && (
        <section className="portfolio-chat__window" aria-label="Dinesh AI chat">
          <header className="portfolio-chat__header">
            <Avatar />
            <div className="portfolio-chat__identity"><strong>Dinesh AI</strong><span>Ask me anything!</span></div>
            <div className="portfolio-chat__controls"><button type="button" aria-label="Minimize chat" onClick={() => setIsOpen(false)}><Minus size={17} /></button><button type="button" aria-label="Close chat" onClick={() => setIsOpen(false)}><X size={17} /></button></div>
          </header>

          <div className="portfolio-chat__messages">
            {messages.map((message) => (
              <article key={message.id} className={`portfolio-message portfolio-message--${message.role}`}>
                {message.role === "assistant" && <Avatar small />}
                <p>{message.content || <span className="portfolio-message__typing">Thinking<span>.</span><span>.</span><span>.</span></span>}</p>
              </article>
            ))}
            {messages.length === 1 && <div className="portfolio-chat__suggestions">{SUGGESTIONS.map((item) => <button key={item} type="button" onClick={() => handleSend(item)} disabled={isSending}>{item}</button>)}</div>}
            <div ref={messagesEndRef} />
          </div>

          <form className="portfolio-chat__input" onSubmit={(event) => { event.preventDefault(); handleSend(); }}>
            <input value={inputValue} onChange={(event) => setInputValue(event.target.value)} disabled={isSending} placeholder="Type a message..." aria-label="Ask Dinesh a question" />
            <button type="submit" disabled={!inputValue.trim() || isSending} aria-label="Send message"><Send size={17} fill="currentColor" /></button>
          </form>
        </section>
      )}
      {!isOpen && <button type="button" className="portfolio-chat__launcher" aria-label="Open Dinesh AI chat" onClick={() => setIsOpen(true)}><MessageCircle size={24} /><span>Ask Dinesh</span></button>}
    </div>
  );
}
