import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Briefcase, Award, TrendingUp, Star, Users, Flame, Trophy, Eye, FileText, Calendar, Zap, BookOpen } from "lucide-react";
import { currentUser } from "@/data/demoData";

type StatusType = "online" | "offline" | "busy" | "away" | "dnd";

const statusConfig: Record<StatusType, { color: string; label: string; dot: string }> = {
  online: { color: "bg-success", label: "Available", dot: "bg-success" },
  offline: { color: "bg-muted-foreground", label: "Offline", dot: "bg-muted-foreground" },
  busy: { color: "bg-destructive", label: "Busy", dot: "bg-destructive" },
  away: { color: "bg-warning", label: "Away", dot: "bg-warning" },
  dnd: { color: "bg-destructive", label: "Do Not Disturb", dot: "bg-destructive" },
};

export default function LeftSidebar() {
  const [status, setStatus] = useState<StatusType>("online");
  const [showStatusMenu, setShowStatusMenu] = useState(false);

  const stats = [
    { label: "Karma", value: currentUser.karma.toLocaleString(), icon: Flame, color: "text-reddit-orange" },
    { label: "Connections", value: currentUser.connections, icon: Users, color: "text-primary" },
    { label: "Followers", value: currentUser.followers.toLocaleString(), icon: Star, color: "text-warning" },
  ];

  const achievements = [
    { icon: "🏆", label: "Top Voice 2026" },
    { icon: "⚡", label: "Power Poster" },
    { icon: "🎯", label: "500+ Endorsements" },
    { icon: "📝", label: "10K+ Post Views" },
  ];

  const weeklyStats = [
    { icon: Eye, label: "Profile Views", value: "342", change: "+28%", up: true },
    { icon: FileText, label: "Post Impressions", value: "12.5K", change: "+15%", up: true },
    { icon: Users, label: "Search Appearances", value: "89", change: "+42%", up: true },
  ];

  const upcomingEvents = [
    { title: "Tech Talk @ Flipkart", date: "Mar 15", type: "Speaking" },
    { title: "System Design Workshop", date: "Mar 20", type: "Hosting" },
    { title: "AI/ML Meetup Bengaluru", date: "Mar 25", type: "Attending" },
  ];

  const learningProgress = [
    { skill: "Rust Programming", progress: 72 },
    { skill: "Kubernetes Advanced", progress: 45 },
    { skill: "AI/ML Fundamentals", progress: 88 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-4"
    >
      {/* Profile card */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="h-16 gradient-primary" />
        <div className="px-4 pb-4 -mt-8">
          <div className="relative inline-block">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-16 h-16 rounded-full bg-card border-4 border-card flex items-center justify-center text-3xl shadow-lg cursor-pointer"
            >
              {currentUser.avatar}
            </motion.div>
            {/* Status indicator */}
            <div className="relative">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowStatusMenu(!showStatusMenu)}
                className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-card ${statusConfig[status].dot} cursor-pointer`}
                title={statusConfig[status].label}
              />
              {showStatusMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute top-6 left-0 z-20 bg-card rounded-lg border border-border shadow-xl py-1 w-36"
                >
                  {(Object.keys(statusConfig) as StatusType[]).map((s) => (
                    <button
                      key={s}
                      onClick={() => { setStatus(s); setShowStatusMenu(false); }}
                      className={`w-full flex items-center gap-2 px-3 py-1.5 text-xs hover:bg-secondary transition-colors ${status === s ? "font-semibold" : ""}`}
                    >
                      <div className={`w-2.5 h-2.5 rounded-full ${statusConfig[s].dot}`} />
                      {statusConfig[s].label}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-center gap-1.5">
              <h3 className="font-display font-bold text-sm">{currentUser.name}</h3>
              {currentUser.verified && <Award className="w-3.5 h-3.5 text-primary" />}
            </div>
            <p className="text-xs text-muted-foreground">{currentUser.title}</p>
            <div className="flex items-center gap-1.5 mt-1">
              <div className={`w-2 h-2 rounded-full ${statusConfig[status].dot} ${status === "online" ? "animate-pulse" : ""}`} />
              <span className="text-[10px] text-muted-foreground">{statusConfig[status].label}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              <Briefcase className="w-3 h-3" /> {currentUser.company}
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="w-3 h-3" /> {currentUser.location}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 border-t border-border">
          {stats.map((s) => (
            <div key={s.label} className="text-center py-3 hover:bg-secondary/50 transition-colors cursor-pointer">
              <s.icon className={`w-4 h-4 mx-auto ${s.color}`} />
              <p className="text-xs font-bold mt-0.5">{s.value}</p>
              <p className="text-[10px] text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Analytics */}
      <div className="bg-card rounded-xl border border-border p-4">
        <h4 className="font-display font-semibold text-xs mb-2 flex items-center gap-1.5">
          <TrendingUp className="w-3.5 h-3.5 text-primary" /> Weekly Analytics
        </h4>
        <div className="space-y-2">
          {weeklyStats.map((stat) => (
            <div key={stat.label} className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <stat.icon className="w-3 h-3 text-muted-foreground" />
                <span className="text-[10px] text-muted-foreground">{stat.label}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[10px] font-bold">{stat.value}</span>
                <span className={`text-[9px] ${stat.up ? "text-success" : "text-destructive"}`}>{stat.change}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-card rounded-xl border border-border p-4">
        <h4 className="font-display font-semibold text-xs mb-2 flex items-center gap-1.5">
          <Trophy className="w-3.5 h-3.5 text-warning" /> Achievements
        </h4>
        <div className="grid grid-cols-2 gap-1.5">
          {achievements.map((a) => (
            <motion.div
              key={a.label}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-1.5 bg-secondary/50 rounded-lg p-1.5 cursor-pointer"
            >
              <span className="text-sm">{a.icon}</span>
              <span className="text-[9px] text-foreground/80">{a.label}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Skills with progress */}
      <div className="bg-card rounded-xl border border-border p-4">
        <h4 className="font-display font-semibold text-xs mb-2 flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-accent" /> Skills & Endorsements
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {["React", "TypeScript", "Node.js", "Python", "AWS", "System Design", "Docker", "Kubernetes", "GraphQL", "Redis", "Kafka"].map((skill) => (
            <motion.span
              key={skill}
              whileHover={{ scale: 1.08 }}
              className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full cursor-pointer hover:bg-primary/20 transition-colors"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Learning */}
      <div className="bg-card rounded-xl border border-border p-4">
        <h4 className="font-display font-semibold text-xs mb-2 flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-success" /> Learning Progress
        </h4>
        <div className="space-y-2">
          {learningProgress.map((l) => (
            <div key={l.skill}>
              <div className="flex items-center justify-between">
                <span className="text-[10px]">{l.skill}</span>
                <span className="text-[10px] font-bold text-primary">{l.progress}%</span>
              </div>
              <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden mt-0.5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${l.progress}%` }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="h-full gradient-primary rounded-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-card rounded-xl border border-border p-4">
        <h4 className="font-display font-semibold text-xs mb-2 flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-twitter-blue" /> Upcoming Events
        </h4>
        <div className="space-y-2">
          {upcomingEvents.map((ev) => (
            <motion.div
              key={ev.title}
              whileHover={{ x: 3 }}
              className="flex items-center justify-between cursor-pointer"
            >
              <div>
                <p className="text-[10px] font-semibold">{ev.title}</p>
                <p className="text-[9px] text-muted-foreground">{ev.date}</p>
              </div>
              <span className="text-[9px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">{ev.type}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
