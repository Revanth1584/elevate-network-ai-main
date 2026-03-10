import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Users, Trophy, Clock, Star, Award, ChevronRight, Play, CheckCircle2, MessageSquare, Flame } from "lucide-react";

interface Cohort {
  id: string;
  title: string;
  instructor: string;
  avatar: string;
  members: number;
  duration: string;
  progress: number;
  enrolled: boolean;
  category: string;
  rating: number;
  lessons: number;
  completedLessons: number;
  badge: string;
}

const cohorts: Cohort[] = [
  { id: "c1", title: "Mastering System Design", instructor: "Vikram Singh", avatar: "🐘", members: 234, duration: "8 weeks", progress: 65, enrolled: true, category: "Engineering", rating: 4.9, lessons: 24, completedLessons: 16, badge: "🏗️" },
  { id: "c2", title: "AI/ML for Product Managers", instructor: "Ananya Gupta", avatar: "🌸", members: 189, duration: "6 weeks", progress: 0, enrolled: false, category: "AI/ML", rating: 4.8, lessons: 18, completedLessons: 0, badge: "🤖" },
  { id: "c3", title: "Full Stack Web Development", instructor: "Revanth Kaushik", avatar: "🦊", members: 312, duration: "12 weeks", progress: 88, enrolled: true, category: "Development", rating: 4.7, lessons: 36, completedLessons: 32, badge: "⚡" },
  { id: "c4", title: "Data Science with Python", instructor: "Rahul Verma", avatar: "🐯", members: 267, duration: "10 weeks", progress: 0, enrolled: false, category: "Data", rating: 4.9, lessons: 30, completedLessons: 0, badge: "📊" },
  { id: "c5", title: "DevOps & Cloud Engineering", instructor: "Karthik Nair", avatar: "🦁", members: 156, duration: "8 weeks", progress: 32, enrolled: true, category: "DevOps", rating: 4.6, lessons: 22, completedLessons: 7, badge: "☁️" },
  { id: "c6", title: "Growth Marketing Masterclass", instructor: "Meera Joshi", avatar: "🐬", members: 198, duration: "6 weeks", progress: 0, enrolled: false, category: "Marketing", rating: 4.8, lessons: 16, completedLessons: 0, badge: "📈" },
];

const leaderboard = [
  { name: "Sneha Reddy", avatar: "🦚", xp: 12450, streak: 45 },
  { name: "Vikram Singh", avatar: "🐘", xp: 11200, streak: 38 },
  { name: "Revanth Kaushik", avatar: "🦊", xp: 10800, streak: 32 },
  { name: "Priya Patel", avatar: "🦋", xp: 9600, streak: 28 },
  { name: "Amit Choudhary", avatar: "🦅", xp: 8900, streak: 21 },
];

export default function LearningTab() {
  const [enrolledMap, setEnrolledMap] = useState<Record<string, boolean>>(
    Object.fromEntries(cohorts.filter((c) => c.enrolled).map((c) => [c.id, true]))
  );
  const [filter, setFilter] = useState<"all" | "enrolled" | "explore">("all");
  const [selectedCohort, setSelectedCohort] = useState<Cohort | null>(null);

  const filtered = cohorts.filter((c) => {
    if (filter === "enrolled") return enrolledMap[c.id];
    if (filter === "explore") return !enrolledMap[c.id];
    return true;
  });

  const toggleEnroll = (id: string) => setEnrolledMap((m) => ({ ...m, [id]: !m[id] }));

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <h2 className="font-display font-bold text-lg flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-success" /> Learning Cohorts
        </h2>
        <div className="flex gap-1 bg-card rounded-lg border border-border p-0.5">
          {(["all", "enrolled", "explore"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`text-[10px] px-3 py-1 rounded-md capitalize transition-all ${filter === f ? "gradient-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary"}`}>
              {f}
            </button>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4">
        {/* Courses */}
        <div className="space-y-3">
          {filtered.map((c, i) => (
            <motion.div key={c.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-card rounded-xl border border-border p-4 hover-lift cursor-pointer" onClick={() => setSelectedCohort(c)}>
              <div className="flex items-start gap-3">
                <div className="text-2xl">{c.badge}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-display font-bold text-sm">{c.title}</h4>
                    <span className="text-[9px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">{c.category}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground mb-2">
                    <span>{c.avatar} {c.instructor}</span>
                    <span>·</span>
                    <span className="flex items-center gap-0.5"><Clock className="w-3 h-3" />{c.duration}</span>
                    <span>·</span>
                    <span className="flex items-center gap-0.5"><Users className="w-3 h-3" />{c.members}</span>
                    <span>·</span>
                    <span className="flex items-center gap-0.5"><Star className="w-3 h-3 text-warning" />{c.rating}</span>
                  </div>
                  {enrolledMap[c.id] && (
                    <div>
                      <div className="flex items-center justify-between text-[10px] mb-1">
                        <span>{c.completedLessons}/{c.lessons} lessons</span>
                        <span className="font-bold text-primary">{c.progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${c.progress}%` }} transition={{ duration: 0.8, delay: 0.2 }} className="h-full gradient-primary rounded-full" />
                      </div>
                    </div>
                  )}
                </div>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={(e) => { e.stopPropagation(); toggleEnroll(c.id); }} className={`text-[10px] px-3 py-1.5 rounded-full font-semibold transition-all shrink-0 ${enrolledMap[c.id] ? "bg-success/10 text-success" : "gradient-primary text-primary-foreground"}`}>
                  {enrolledMap[c.id] ? "✓ Enrolled" : "Join Cohort"}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sidebar: Leaderboard + Certificates */}
        <div className="space-y-4">
          {/* Leaderboard */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-card rounded-xl border border-border p-4">
            <h4 className="font-display font-semibold text-xs mb-3 flex items-center gap-1.5"><Trophy className="w-3.5 h-3.5 text-warning" /> Leaderboard</h4>
            <div className="space-y-2">
              {leaderboard.map((l, i) => (
                <motion.div key={l.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 + i * 0.05 }} className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold w-5 text-center ${i === 0 ? "text-warning" : i === 1 ? "text-muted-foreground" : i === 2 ? "text-accent" : "text-muted-foreground"}`}>
                    {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `${i + 1}`}
                  </span>
                  <span className="text-sm">{l.avatar}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-semibold truncate">{l.name}</p>
                    <p className="text-[9px] text-muted-foreground">{l.xp.toLocaleString()} XP · 🔥 {l.streak}d streak</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Certificates */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} className="bg-card rounded-xl border border-border p-4">
            <h4 className="font-display font-semibold text-xs mb-3 flex items-center gap-1.5"><Award className="w-3.5 h-3.5 text-primary" /> Your Certificates</h4>
            <div className="space-y-2">
              {[
                { title: "React Advanced Patterns", date: "Feb 2026", verified: true },
                { title: "Cloud Architecture", date: "Jan 2026", verified: true },
                { title: "TypeScript Mastery", date: "Dec 2025", verified: true },
              ].map((cert) => (
                <div key={cert.title} className="flex items-center gap-2 bg-secondary/50 rounded-lg p-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-success shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-semibold truncate">{cert.title}</p>
                    <p className="text-[9px] text-muted-foreground">{cert.date} {cert.verified && "· ✅ Verified"}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Daily Challenge */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="bg-card rounded-xl border border-border p-4 gradient-primary text-primary-foreground">
            <h4 className="font-bold text-xs mb-1 flex items-center gap-1.5"><Flame className="w-3.5 h-3.5" /> Daily Challenge</h4>
            <p className="text-[10px] mb-2 opacity-90">Design a rate limiter for a distributed system</p>
            <button className="text-[10px] bg-primary-foreground/20 hover:bg-primary-foreground/30 px-3 py-1 rounded-full transition-colors">Start Challenge →</button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
