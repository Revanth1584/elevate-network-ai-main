import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Eye, FileText, Users, Target, Award, BarChart3, Zap, ArrowUpRight, ArrowDownRight, Globe, Briefcase, Star, Shield } from "lucide-react";

const weeklyData = [
  { day: "Mon", views: 45, posts: 12 },
  { day: "Tue", views: 62, posts: 18 },
  { day: "Wed", views: 78, posts: 25 },
  { day: "Thu", views: 53, posts: 15 },
  { day: "Fri", views: 91, posts: 32 },
  { day: "Sat", views: 34, posts: 8 },
  { day: "Sun", views: 28, posts: 5 },
];

const visitorBreakdown = [
  { label: "Technology", pct: 42, color: "bg-primary" },
  { label: "Finance", pct: 18, color: "bg-accent" },
  { label: "Marketing", pct: 15, color: "bg-success" },
  { label: "Consulting", pct: 12, color: "bg-warning" },
  { label: "Other", pct: 13, color: "bg-muted-foreground" },
];

const seniorityBreakdown = [
  { label: "Senior/Lead", pct: 35 },
  { label: "Mid-level", pct: 28 },
  { label: "Director/VP", pct: 20 },
  { label: "Entry-level", pct: 12 },
  { label: "C-Suite", pct: 5 },
];

const topSkills = [
  { skill: "React", searches: 89, trend: "+15%" },
  { skill: "System Design", searches: 67, trend: "+28%" },
  { skill: "TypeScript", searches: 54, trend: "+12%" },
  { skill: "Node.js", searches: 42, trend: "+8%" },
  { skill: "AWS", searches: 38, trend: "+22%" },
];

const contentROI = [
  { post: "Most tech interviews are broken 🔥", dms: 23, connections: 45, jobViews: 12, engagement: "4.2%" },
  { post: "Scaling 10M+ transactions/day 🎯", dms: 15, connections: 28, jobViews: 8, engagement: "3.8%" },
  { post: "AI Research at NeurIPS 2026 🚀", dms: 31, connections: 52, jobViews: 19, engagement: "5.1%" },
];

export default function AnalyticsTab() {
  const [period, setPeriod] = useState<"week" | "month" | "quarter">("week");
  const maxViews = Math.max(...weeklyData.map((d) => d.views));
  const careerScore = 82;

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <h2 className="font-display font-bold text-lg flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary" /> Analytics Dashboard
        </h2>
        <div className="flex gap-1 bg-card rounded-lg border border-border p-0.5">
          {(["week", "month", "quarter"] as const).map((p) => (
            <button key={p} onClick={() => setPeriod(p)} className={`text-[10px] px-3 py-1 rounded-md capitalize transition-all ${period === p ? "gradient-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary"}`}>
              {p}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Career Health Score */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-card rounded-xl border border-border p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-display font-bold text-sm flex items-center gap-1.5"><Shield className="w-4 h-4 text-primary" /> Career Health Score</h3>
            <p className="text-[10px] text-muted-foreground mt-0.5">Based on profile, activity, and market signals</p>
          </div>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.3 }} className="relative w-20 h-20">
            <svg className="w-20 h-20 -rotate-90" viewBox="0 0 36 36">
              <path className="text-secondary" strokeDasharray="100, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
              <motion.path initial={{ strokeDasharray: "0, 100" }} animate={{ strokeDasharray: `${careerScore}, 100` }} transition={{ duration: 1.5, delay: 0.5 }} className="text-primary" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display font-bold text-lg text-primary">{careerScore}</span>
            </div>
          </motion.div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { label: "Profile Strength", value: "Expert", icon: "💎" },
            { label: "Network Quality", value: "Top 5%", icon: "🌐" },
            { label: "Content Impact", value: "Rising", icon: "📈" },
            { label: "Market Fit", value: "High", icon: "🎯" },
          ].map((m) => (
            <div key={m.label} className="bg-secondary/50 rounded-lg p-2.5 text-center">
              <span className="text-lg">{m.icon}</span>
              <p className="text-[10px] font-bold mt-0.5">{m.value}</p>
              <p className="text-[9px] text-muted-foreground">{m.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Profile Views", value: "2,847", change: "+28%", up: true, icon: Eye },
          { label: "Post Impressions", value: "45.2K", change: "+42%", up: true, icon: FileText },
          { label: "Search Appearances", value: "892", change: "+15%", up: true, icon: Globe },
          { label: "Connection Growth", value: "+127", change: "+18%", up: true, icon: Users },
        ].map((m, i) => (
          <motion.div key={m.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }} className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-center justify-between mb-2">
              <m.icon className="w-4 h-4 text-muted-foreground" />
              <span className={`text-[10px] font-bold flex items-center gap-0.5 ${m.up ? "text-success" : "text-destructive"}`}>
                {m.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />} {m.change}
              </span>
            </div>
            <p className="font-display font-bold text-lg">{m.value}</p>
            <p className="text-[10px] text-muted-foreground">{m.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Bar Chart */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="bg-card rounded-xl border border-border p-4">
          <h4 className="font-display font-semibold text-xs mb-3 flex items-center gap-1.5"><TrendingUp className="w-3.5 h-3.5 text-primary" /> Weekly Profile Views</h4>
          <div className="flex items-end gap-2 h-32">
            {weeklyData.map((d, i) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                <motion.div initial={{ height: 0 }} animate={{ height: `${(d.views / maxViews) * 100}%` }} transition={{ duration: 0.6, delay: 0.3 + i * 0.08 }} className="w-full rounded-t-md gradient-primary min-h-[4px]" />
                <span className="text-[9px] text-muted-foreground">{d.day}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Visitor Industry Breakdown */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="bg-card rounded-xl border border-border p-4">
          <h4 className="font-display font-semibold text-xs mb-3 flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5 text-accent" /> Visitors by Industry</h4>
          <div className="space-y-2">
            {visitorBreakdown.map((v, i) => (
              <div key={v.label}>
                <div className="flex items-center justify-between text-[10px] mb-0.5">
                  <span>{v.label}</span>
                  <span className="font-bold">{v.pct}%</span>
                </div>
                <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${v.pct}%` }} transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }} className={`h-full rounded-full ${v.color}`} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Skills & Content ROI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Top Skills */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="bg-card rounded-xl border border-border p-4">
          <h4 className="font-display font-semibold text-xs mb-3 flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-warning" /> Skills Attracting Recruiters</h4>
          <div className="space-y-2">
            {topSkills.map((s, i) => (
              <motion.div key={s.skill} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 + i * 0.05 }} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-muted-foreground w-4">{i + 1}.</span>
                  <span className="text-xs font-medium">{s.skill}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-muted-foreground">{s.searches} searches</span>
                  <span className="text-[10px] font-bold text-success">{s.trend}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Seniority */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="bg-card rounded-xl border border-border p-4">
          <h4 className="font-display font-semibold text-xs mb-3 flex items-center gap-1.5"><Award className="w-3.5 h-3.5 text-primary" /> Visitors by Seniority</h4>
          <div className="space-y-2">
            {seniorityBreakdown.map((s, i) => (
              <div key={s.label}>
                <div className="flex items-center justify-between text-[10px] mb-0.5">
                  <span>{s.label}</span>
                  <span className="font-bold">{s.pct}%</span>
                </div>
                <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${s.pct}%` }} transition={{ duration: 0.8, delay: 0.4 + i * 0.08 }} className="h-full rounded-full gradient-primary" />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Content ROI Table */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="bg-card rounded-xl border border-border p-4">
        <h4 className="font-display font-semibold text-xs mb-3 flex items-center gap-1.5"><Target className="w-3.5 h-3.5 text-accent" /> Content ROI Tracker</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-[10px]">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 font-semibold text-muted-foreground">Post</th>
                <th className="text-center py-2 font-semibold text-muted-foreground">DMs</th>
                <th className="text-center py-2 font-semibold text-muted-foreground">Connections</th>
                <th className="text-center py-2 font-semibold text-muted-foreground">Job Views</th>
                <th className="text-center py-2 font-semibold text-muted-foreground">Engagement</th>
              </tr>
            </thead>
            <tbody>
              {contentROI.map((c) => (
                <tr key={c.post} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                  <td className="py-2 pr-2 max-w-[180px] truncate font-medium">{c.post}</td>
                  <td className="text-center py-2 text-primary font-bold">{c.dms}</td>
                  <td className="text-center py-2 text-success font-bold">+{c.connections}</td>
                  <td className="text-center py-2">{c.jobViews}</td>
                  <td className="text-center py-2 font-bold">{c.engagement}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Weekly Tips */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="bg-card rounded-xl border border-border p-4 gradient-primary text-primary-foreground">
        <h4 className="font-display font-bold text-sm mb-2">💡 Weekly Career Tips</h4>
        <ul className="space-y-1.5 text-xs">
          <li>• Your System Design posts get 3x more engagement — post more!</li>
          <li>• 20 recruiters searched for "React + TypeScript" — add these to your headline</li>
          <li>• Posting on Tuesday mornings gets you 40% more reach</li>
          <li>• Connect with 5 more people in FinTech to unlock new opportunities</li>
        </ul>
      </motion.div>
    </div>
  );
}
