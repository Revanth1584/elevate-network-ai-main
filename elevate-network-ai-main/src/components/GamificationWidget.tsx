import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Flame, Star, Zap, ChevronDown, ChevronUp, Target } from "lucide-react";

const xpBreakdown = [
  { action: "Daily post", xp: 50, icon: "📝" },
  { action: "Comment made", xp: 10, icon: "💬" },
  { action: "Connection accepted", xp: 25, icon: "🤝" },
  { action: "Course completed", xp: 200, icon: "🎓" },
  { action: "Referral hired", xp: 500, icon: "🎯" },
  { action: "Mentoring session", xp: 150, icon: "🧑‍🏫" },
];

const badges = [
  { icon: "🏆", label: "Top Voice", earned: true },
  { icon: "⚡", label: "Power Poster", earned: true },
  { icon: "🎯", label: "Super Connector", earned: true },
  { icon: "📚", label: "Lifelong Learner", earned: true },
  { icon: "🌟", label: "Rising Star", earned: false },
  { icon: "💎", label: "Industry Legend", earned: false },
];

const levels = [
  { name: "Rookie", minXP: 0, icon: "🌱" },
  { name: "Contributor", minXP: 1000, icon: "📝" },
  { name: "Expert", minXP: 5000, icon: "⭐" },
  { name: "Influencer", minXP: 15000, icon: "🔥" },
  { name: "Industry Legend", minXP: 50000, icon: "💎" },
];

export default function GamificationWidget() {
  const [expanded, setExpanded] = useState(false);
  const currentXP = 15420;
  const currentLevel = levels.filter((l) => currentXP >= l.minXP).pop()!;
  const nextLevel = levels[levels.indexOf(currentLevel) + 1];
  const progressToNext = nextLevel ? ((currentXP - currentLevel.minXP) / (nextLevel.minXP - currentLevel.minXP)) * 100 : 100;
  const streak = 32;

  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-card rounded-xl border border-border overflow-hidden">
      {/* Header - always visible */}
      <button onClick={() => setExpanded(!expanded)} className="w-full p-4 flex items-center gap-3 hover:bg-secondary/30 transition-colors">
        <div className="relative">
          <span className="text-2xl">{currentLevel.icon}</span>
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute -top-1 -right-1 text-xs">🔥</motion.div>
        </div>
        <div className="flex-1 text-left">
          <div className="flex items-center gap-1.5">
            <h4 className="font-display font-bold text-xs">{currentLevel.name}</h4>
            <span className="text-[9px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">{currentXP.toLocaleString()} XP</span>
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: `${progressToNext}%` }} transition={{ duration: 1 }} className="h-full gradient-primary rounded-full" />
            </div>
            {nextLevel && <span className="text-[9px] text-muted-foreground">{nextLevel.icon} {nextLevel.name}</span>}
          </div>
        </div>
        <div className="flex items-center gap-1 text-[10px] font-bold text-accent">
          <Flame className="w-3.5 h-3.5" /> {streak}d
        </div>
        {expanded ? <ChevronUp className="w-3.5 h-3.5 text-muted-foreground" /> : <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="px-4 pb-4 space-y-3">
              {/* Badges */}
              <div>
                <p className="text-[10px] font-semibold text-muted-foreground mb-1.5 flex items-center gap-1"><Trophy className="w-3 h-3" /> Badges</p>
                <div className="grid grid-cols-3 gap-1.5">
                  {badges.map((b) => (
                    <motion.div key={b.label} whileHover={{ scale: 1.05 }} className={`flex flex-col items-center gap-0.5 p-1.5 rounded-lg cursor-pointer ${b.earned ? "bg-secondary/50" : "bg-secondary/20 opacity-40"}`}>
                      <span className="text-sm">{b.icon}</span>
                      <span className="text-[8px] text-center">{b.label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* XP Breakdown */}
              <div>
                <p className="text-[10px] font-semibold text-muted-foreground mb-1.5 flex items-center gap-1"><Zap className="w-3 h-3" /> Earn XP</p>
                <div className="space-y-1">
                  {xpBreakdown.map((x) => (
                    <div key={x.action} className="flex items-center justify-between text-[10px]">
                      <span className="flex items-center gap-1.5">{x.icon} {x.action}</span>
                      <span className="font-bold text-primary">+{x.xp} XP</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weekly Challenge */}
              <div className="bg-secondary/50 rounded-lg p-2.5">
                <p className="text-[10px] font-semibold flex items-center gap-1"><Target className="w-3 h-3 text-accent" /> Weekly Challenge</p>
                <p className="text-[9px] text-muted-foreground mt-0.5">Post 5 times this week</p>
                <div className="flex items-center gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <div key={n} className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] ${n <= 3 ? "bg-success text-success-foreground" : "bg-secondary border border-border"}`}>
                      {n <= 3 ? "✓" : n}
                    </div>
                  ))}
                  <span className="text-[9px] text-muted-foreground ml-1">3/5</span>
                  <span className="text-[9px] font-bold text-primary ml-auto">+100 XP</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
