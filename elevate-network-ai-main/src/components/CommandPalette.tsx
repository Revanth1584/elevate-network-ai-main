import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, User, Briefcase, FileText, MessageSquare, Hash, ArrowRight, Command, Zap } from "lucide-react";
import { users, jobs, trendingTopics, initialPosts } from "@/data/demoData";

interface CommandPaletteProps {
  onNavigate: (tab: string) => void;
}

interface SearchResult {
  type: "person" | "job" | "post" | "topic" | "action";
  icon: string;
  title: string;
  subtitle: string;
  action?: string;
}

export default function CommandPalette({ onNavigate }: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const results: SearchResult[] = (() => {
    if (!query.trim()) {
      return [
        { type: "action", icon: "🏠", title: "Go to Feed", subtitle: "View your home feed", action: "feed" },
        { type: "action", icon: "📧", title: "Open Mail", subtitle: "Check your inbox", action: "mail" },
        { type: "action", icon: "💼", title: "Browse Jobs", subtitle: "Find opportunities", action: "jobs" },
        { type: "action", icon: "📊", title: "View Analytics", subtitle: "Your career dashboard", action: "analytics" },
        { type: "action", icon: "🎓", title: "Learning Hub", subtitle: "Courses & cohorts", action: "learning" },
        { type: "action", icon: "🏪", title: "Freelance Market", subtitle: "Find or post gigs", action: "marketplace" },
      ];
    }
    const q = query.toLowerCase();
    const r: SearchResult[] = [];
    users.filter((u) => u.name.toLowerCase().includes(q) || u.title.toLowerCase().includes(q)).slice(0, 3)
      .forEach((u) => r.push({ type: "person", icon: u.avatar, title: u.name, subtitle: `${u.title} @ ${u.company}` }));
    jobs.filter((j) => j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q)).slice(0, 3)
      .forEach((j) => r.push({ type: "job", icon: j.logo, title: j.title, subtitle: `${j.company} · ${j.salary}`, action: "jobs" }));
    initialPosts.filter((p) => p.content.toLowerCase().includes(q)).slice(0, 2)
      .forEach((p) => r.push({ type: "post", icon: p.author.avatar, title: p.content.slice(0, 60) + "...", subtitle: `by ${p.author.name}`, action: "feed" }));
    trendingTopics.filter((t) => t.tag.toLowerCase().includes(q)).slice(0, 2)
      .forEach((t) => r.push({ type: "topic", icon: "🔥", title: t.tag, subtitle: `${t.posts.toLocaleString()} posts · ${t.category}` }));
    return r;
  })();

  const typeIcons = { person: User, job: Briefcase, post: FileText, topic: Hash, action: Zap };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]"
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg mx-4 bg-card rounded-2xl border border-border shadow-2xl overflow-hidden"
          >
            {/* Input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
              <Search className="w-5 h-5 text-muted-foreground" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search people, jobs, posts, or type a command..."
                className="flex-1 bg-transparent text-sm outline-none text-foreground placeholder:text-muted-foreground"
              />
              <kbd className="hidden sm:flex text-[10px] text-muted-foreground bg-secondary px-1.5 py-0.5 rounded border border-border font-mono">ESC</kbd>
            </div>

            {/* Results */}
            <div className="max-h-80 overflow-y-auto py-2">
              {results.length === 0 ? (
                <div className="py-8 text-center text-muted-foreground text-sm">No results found</div>
              ) : (
                results.map((r, i) => {
                  const Icon = typeIcons[r.type];
                  return (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03 }}
                      onClick={() => { if (r.action) onNavigate(r.action); setOpen(false); setQuery(""); }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-secondary/70 transition-colors text-left group"
                    >
                      <span className="text-lg">{r.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium truncate">{r.title}</p>
                        <p className="text-[10px] text-muted-foreground truncate">{r.subtitle}</p>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.button>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2 border-t border-border flex items-center justify-between text-[10px] text-muted-foreground">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1"><Command className="w-3 h-3" />K to toggle</span>
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
              </div>
              <span className="text-primary font-semibold">⚡ ProSearch</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
