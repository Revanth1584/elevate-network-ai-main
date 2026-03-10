import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, ArrowLeft, Search } from "lucide-react";
import { messages as demoMessages, currentUser } from "@/data/demoData";
import type { Message } from "@/data/demoData";

interface ChatMsg {
  role: "sent" | "received";
  text: string;
  time: string;
}

export default function MessagesTab() {
  const [selected, setSelected] = useState<Message | null>(null);
  const [chats, setChats] = useState<Record<string, ChatMsg[]>>({});
  const [input, setInput] = useState("");

  const openChat = (msg: Message) => {
    setSelected(msg);
    if (!chats[msg.id]) {
      setChats((c) => ({
        ...c,
        [msg.id]: [{ role: "received", text: msg.content, time: msg.timestamp }],
      }));
    }
  };

  const sendMessage = () => {
    if (!input.trim() || !selected) return;
    setChats((c) => ({
      ...c,
      [selected.id]: [...(c[selected.id] || []), { role: "sent", text: input, time: "Just now" }],
    }));
    setInput("");
    // Auto reply
    setTimeout(() => {
      setChats((c) => ({
        ...c,
        [selected.id]: [
          ...(c[selected.id] || []),
          { role: "received", text: "Thanks for your message! I'll get back to you shortly. 😊", time: "Just now" },
        ],
      }));
    }, 1200);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-xl border border-border overflow-hidden" style={{ height: 500 }}>
        <AnimatePresence mode="wait">
          {!selected ? (
            <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full flex flex-col">
              <div className="p-3 border-b border-border">
                <h3 className="font-display font-bold text-sm mb-2">Messages</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                  <input placeholder="Search messages..." className="w-full pl-8 pr-3 py-1.5 text-xs bg-secondary rounded-full outline-none text-foreground placeholder:text-muted-foreground" />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                {demoMessages.map((msg, i) => (
                  <motion.button
                    key={msg.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    onClick={() => openChat(msg)}
                    className={`w-full flex items-center gap-3 p-3 hover:bg-secondary/60 transition-colors text-left ${!msg.read ? "bg-primary/5" : ""}`}
                  >
                    <span className="text-xl">{msg.from.avatar}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold">{msg.from.name}</p>
                        <p className="text-[10px] text-muted-foreground">{msg.timestamp}</p>
                      </div>
                      <p className="text-[11px] text-muted-foreground truncate">{msg.content}</p>
                    </div>
                    {!msg.read && <div className="w-2 h-2 rounded-full gradient-primary flex-shrink-0" />}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="h-full flex flex-col">
              <div className="flex items-center gap-2 p-3 border-b border-border">
                <button onClick={() => setSelected(null)} className="p-1 rounded-full hover:bg-secondary transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <span className="text-lg">{selected.from.avatar}</span>
                <div>
                  <p className="text-xs font-semibold">{selected.from.name}</p>
                  <p className="text-[10px] text-muted-foreground">{selected.from.title}</p>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-3 space-y-2">
                {(chats[selected.id] || []).map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${m.role === "sent" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-xs ${
                      m.role === "sent" ? "gradient-primary text-primary-foreground rounded-br-sm" : "bg-secondary text-secondary-foreground rounded-bl-sm"
                    }`}>
                      {m.text}
                      <p className={`text-[9px] mt-0.5 ${m.role === "sent" ? "text-primary-foreground/60" : "text-muted-foreground"}`}>{m.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="flex items-center gap-2 p-3 border-t border-border">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 text-xs bg-secondary/50 rounded-full px-3 py-2 outline-none focus:ring-2 focus:ring-primary/30 text-foreground placeholder:text-muted-foreground"
                />
                <motion.button whileTap={{ scale: 0.9 }} onClick={sendMessage} className="p-2 rounded-full gradient-primary">
                  <Send className="w-3.5 h-3.5 text-primary-foreground" />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
