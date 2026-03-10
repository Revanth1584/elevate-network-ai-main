import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, Sparkles, Zap, Shield, FileText, AlertTriangle } from "lucide-react";
import { chatbotResponses } from "@/data/demoData";

interface ChatMessage {
  role: "user" | "bot";
  content: string;
  intent?: string;
  isSpam?: boolean;
}

const quickActions = ["Career tips", "Resume help", "Interview prep", "Salary advice", "Networking", "Skills 2026", "Cold outreach", "Summarize thread"];

function detectIntent(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("job") || lower.includes("hiring") || lower.includes("opening") || lower.includes("role")) return "🎯 Job Inquiry";
  if (lower.includes("buy") || lower.includes("sell") || lower.includes("deal") || lower.includes("offer") || lower.includes("pitch")) return "💼 Sales Pitch";
  if (lower.includes("collab") || lower.includes("partner") || lower.includes("together") || lower.includes("project")) return "🤝 Collaboration";
  if (lower.includes("mentor") || lower.includes("advice") || lower.includes("help") || lower.includes("guide")) return "🧑‍🏫 Mentorship";
  if (lower.includes("refer") || lower.includes("introduce") || lower.includes("connect me")) return "🔗 Referral Request";
  return "💬 General";
}

function isSpamMessage(input: string): boolean {
  const spamWords = ["guaranteed income", "crypto opportunity", "mlm", "easy money", "click here", "limited time", "act now"];
  return spamWords.some((w) => input.toLowerCase().includes(w));
}

function getResponse(input: string): { content: string; intent: string; isSpam: boolean } {
  const intent = detectIntent(input);
  const spam = isSpamMessage(input);
  const lower = input.toLowerCase();

  if (spam) return { content: "⚠️ **Spam Detected**\n\nThis message appears to be low-quality outreach or spam. I've flagged it for your review.\n\n🛡️ ProBot keeps your inbox clean!", intent: "🚫 Spam", isSpam: true };

  if (lower.includes("cold outreach") || lower.includes("outreach")) return {
    content: "📨 **Cold Outreach Template (3x Response Rate)**\n\nHere's a high-converting template:\n\n---\n\nHi [Name],\n\nI noticed your work on [specific project/post] — really impressive, especially [specific detail].\n\nI'm working on [relevant project] and thought your expertise in [skill] could be a great fit for [specific opportunity].\n\nWould you be open to a 15-min chat this week? Happy to work around your schedule.\n\nBest,\n[Your name]\n\n---\n\n**Why it works:** Personalized, specific, low commitment ask, and shows you did research.",
    intent, isSpam: false
  };

  if (lower.includes("summarize") || lower.includes("summary") || lower.includes("thread")) return {
    content: "📋 **Thread Summary**\n\nHere's a summary of your recent unread threads:\n\n1. **Ananya Gupta** — Wants to collaborate on AI research paper for NeurIPS 2026. Deadline March 30th.\n\n2. **Amit Choudhary** — Offering Engineering Lead role at InnovateTech, ₹40-60 LPA + ESOPs.\n\n3. **Vikram Singh** — Proposing co-hosted System Design workshop series.\n\n**⚡ Action Items:**\n• Reply to Ananya (high priority)\n• Schedule call with Amit\n• Discuss workshop format with Vikram",
    intent: "📋 Summary", isSpam: false
  };

  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) return { content: chatbotResponses.hello + "\n\n🆕 **New AI Features:**\n• 🎯 Intent Detection on messages\n• 📋 Thread Summarization\n• 📨 Cold Outreach Generator\n• 🛡️ Spam Detection", intent, isSpam: false };
  if (lower.includes("career") || lower.includes("grow")) return { content: chatbotResponses.career, intent, isSpam: false };
  if (lower.includes("resume") || lower.includes("cv")) return { content: chatbotResponses.resume, intent, isSpam: false };
  if (lower.includes("interview") || lower.includes("prep")) return { content: chatbotResponses.interview, intent, isSpam: false };
  if (lower.includes("salary") || lower.includes("pay") || lower.includes("negotiate")) return { content: chatbotResponses.salary, intent, isSpam: false };
  if (lower.includes("network") || lower.includes("connect")) return { content: chatbotResponses.networking, intent, isSpam: false };
  if (lower.includes("skill") || lower.includes("learn")) return { content: chatbotResponses.skills, intent, isSpam: false };
  if (lower.includes("thank")) return { content: chatbotResponses.thanks, intent, isSpam: false };
  if (lower.includes("startup") || lower.includes("found")) return { content: chatbotResponses.startup, intent, isSpam: false };
  return { content: chatbotResponses.default, intent, isSpam: false };
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "bot", content: chatbotResponses.hello + "\n\n🆕 **New AI Features:**\n• 🎯 Intent Detection\n• 📋 Thread Summary\n• 📨 Cold Outreach\n• 🛡️ Spam Filter" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, typing]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userIntent = detectIntent(text);
    setMessages((m) => [...m, { role: "user", content: text, intent: userIntent }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const response = getResponse(text);
      setMessages((m) => [...m, { role: "bot", content: response.content, intent: response.intent, isSpam: response.isSpam }]);
      setTyping(false);
    }, 800 + Math.random() * 600);
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full gradient-primary shadow-xl flex items-center justify-center glow-primary animate-float"
      >
        {open ? <X className="w-6 h-6 text-primary-foreground" /> : <MessageCircle className="w-6 h-6 text-primary-foreground" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] glass-strong rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            style={{ height: "520px" }}
          >
            {/* Header */}
            <div className="gradient-primary p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-primary-foreground">ProBot AI</h4>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                  <span className="text-[10px] text-primary-foreground/80">Online · Smart Career Coach</span>
                </div>
              </div>
              <div className="ml-auto flex items-center gap-1">
                <span className="text-[9px] bg-primary-foreground/20 text-primary-foreground px-1.5 py-0.5 rounded-full flex items-center gap-0.5"><Zap className="w-2.5 h-2.5" />AI</span>
                <Sparkles className="w-4 h-4 text-primary-foreground/60 animate-pulse" />
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-3">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className="max-w-[88%]">
                    {/* Intent badge */}
                    {m.intent && (
                      <div className={`flex items-center gap-1 mb-0.5 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                        {m.isSpam && <AlertTriangle className="w-2.5 h-2.5 text-destructive" />}
                        <span className={`text-[8px] px-1.5 py-0.5 rounded-full ${m.isSpam ? "bg-destructive/10 text-destructive" : "bg-secondary text-muted-foreground"}`}>{m.intent}</span>
                      </div>
                    )}
                    <div
                      className={`rounded-2xl px-3 py-2 text-xs leading-relaxed whitespace-pre-line ${
                        m.role === "user"
                          ? "gradient-primary text-primary-foreground rounded-br-sm"
                          : m.isSpam
                          ? "bg-destructive/10 text-foreground rounded-bl-sm border border-destructive/20"
                          : "bg-secondary text-secondary-foreground rounded-bl-sm"
                      }`}
                    >
                      {m.content}
                    </div>
                  </div>
                </motion.div>
              ))}
              {typing && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1 text-muted-foreground px-2">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ y: [0, -4, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.15 }}
                        className="w-1.5 h-1.5 rounded-full bg-muted-foreground"
                      />
                    ))}
                  </div>
                  <span className="text-[10px] ml-1">ProBot is thinking...</span>
                </motion.div>
              )}
            </div>

            {/* Quick actions */}
            <div className="px-3 pb-2 flex flex-wrap gap-1">
              {quickActions.map((q) => (
                <motion.button
                  key={q}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => send(q)}
                  className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full hover:bg-primary/20 transition-colors"
                >
                  {q}
                </motion.button>
              ))}
            </div>

            {/* Input */}
            <div className="flex items-center gap-2 p-3 border-t border-border">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send(input)}
                placeholder="Ask me anything..."
                className="flex-1 text-xs bg-secondary/50 rounded-full px-3 py-2 outline-none focus:ring-2 focus:ring-primary/30 transition-all text-foreground placeholder:text-muted-foreground"
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => send(input)}
                className="p-2 rounded-full gradient-primary"
              >
                <Send className="w-3.5 h-3.5 text-primary-foreground" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
