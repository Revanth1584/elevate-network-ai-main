import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Users, Globe, Star, Clock, MessageSquare, Award, ArrowRight, Zap, Target, CheckCircle2 } from "lucide-react";

interface Mentor {
  id: string;
  name: string;
  avatar: string;
  title: string;
  company: string;
  skills: string[];
  rating: number;
  sessions: number;
  match: number;
  available: boolean;
  price: string;
  bio: string;
}

const mentors: Mentor[] = [
  { id: "m1", name: "Ananya Gupta", avatar: "🌸", title: "AI Research Lead", company: "Google India", skills: ["AI/ML", "Research", "Python"], rating: 4.9, sessions: 156, match: 95, available: true, price: "₹2,000/session", bio: "Published 20+ papers at NeurIPS, ICML. Passionate about democratizing AI education." },
  { id: "m2", name: "Vikram Singh", avatar: "🐘", title: "Engineering Lead", company: "Razorpay", skills: ["System Design", "Leadership", "Scaling"], rating: 4.8, sessions: 89, match: 88, available: true, price: "₹1,500/session", bio: "Built systems handling 10M+ TPS. Loves mentoring engineers transitioning to leadership." },
  { id: "m3", name: "Meera Joshi", avatar: "🐬", title: "Marketing Head", company: "Swiggy", skills: ["Growth", "Branding", "Content"], rating: 4.7, sessions: 67, match: 72, available: false, price: "₹1,800/session", bio: "Scaled Swiggy's brand to 50M+ users. Specialist in B2C growth marketing." },
  { id: "m4", name: "Amit Choudhary", avatar: "🦅", title: "Startup Founder", company: "InnovateTech", skills: ["Entrepreneurship", "Fundraising", "Product"], rating: 4.9, sessions: 234, match: 82, available: true, price: "Free", bio: "Raised ₹50Cr Series A. Mentors first-time founders on 0-to-1 journey." },
  { id: "m5", name: "Priya Patel", avatar: "🦋", title: "Product Manager", company: "Flipkart", skills: ["Product", "Analytics", "Strategy"], rating: 4.8, sessions: 112, match: 79, available: true, price: "₹1,200/session", bio: "Led products used by 100M+ users. Specializes in PM career transitions." },
];

const referralNetwork = [
  { name: "Sneha Reddy", avatar: "🦚", referred: "Revanth Kaushik", to: "Flipkart", role: "Senior Engineer", status: "interview", reward: "₹25,000" },
  { name: "Vikram Singh", avatar: "🐘", referred: "Karthik Nair", to: "Razorpay", role: "DevOps Lead", status: "hired", reward: "₹50,000" },
  { name: "Priya Patel", avatar: "🦋", referred: "Rahul Verma", to: "Swiggy", role: "Data Scientist", status: "applied", reward: "Pending" },
];

const milestones = [
  { week: 1, title: "Goal Setting & Assessment", done: true },
  { week: 2, title: "Skill Gap Analysis", done: true },
  { week: 3, title: "Action Plan Development", done: true },
  { week: 4, title: "Portfolio Review", done: false },
  { week: 5, title: "Mock Interviews", done: false },
  { week: 6, title: "Networking Strategy", done: false },
  { week: 7, title: "Job Application Sprint", done: false },
  { week: 8, title: "Final Review & Next Steps", done: false },
];

export default function MentorshipTab() {
  const [booked, setBooked] = useState<Record<string, boolean>>({});
  const [view, setView] = useState<"mentors" | "referrals">("mentors");

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <h2 className="font-display font-bold text-lg flex items-center gap-2">
          <Heart className="w-5 h-5 text-destructive" /> Mentorship & Referrals
        </h2>
        <div className="flex gap-1 bg-card rounded-lg border border-border p-0.5">
          {(["mentors", "referrals"] as const).map((v) => (
            <button key={v} onClick={() => setView(v)} className={`text-[10px] px-3 py-1 rounded-md capitalize transition-all ${view === v ? "gradient-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary"}`}>
              {v === "mentors" ? "🧑‍🏫 Find Mentors" : "🎯 Referral Network"}
            </button>
          ))}
        </div>
      </motion.div>

      {view === "mentors" ? (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-4">
          <div className="space-y-3">
            {mentors.map((m, i) => (
              <motion.div key={m.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-card rounded-xl border border-border p-4 hover-lift">
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <span className="text-3xl">{m.avatar}</span>
                    {m.available && <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-success border-2 border-card" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h4 className="font-display font-bold text-sm">{m.name}</h4>
                      <span className="text-[9px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full flex items-center gap-0.5"><Target className="w-2.5 h-2.5" />{m.match}% match</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground">{m.title} @ {m.company}</p>
                    <p className="text-[10px] text-foreground/80 mt-1 mb-2">{m.bio}</p>
                    <div className="flex items-center gap-3 text-[10px] text-muted-foreground mb-2">
                      <span className="flex items-center gap-0.5"><Star className="w-3 h-3 text-warning" />{m.rating}</span>
                      <span className="flex items-center gap-0.5"><MessageSquare className="w-3 h-3" />{m.sessions} sessions</span>
                      <span className="flex items-center gap-0.5 font-semibold text-foreground">{m.price}</span>
                    </div>
                    <div className="flex gap-1.5 flex-wrap">
                      {m.skills.map((s) => (
                        <span key={s} className="text-[9px] bg-secondary px-2 py-0.5 rounded-full">{s}</span>
                      ))}
                    </div>
                  </div>
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setBooked((b) => ({ ...b, [m.id]: !b[m.id] }))} disabled={!m.available} className={`text-[10px] px-3 py-2 rounded-full font-semibold transition-all shrink-0 ${booked[m.id] ? "bg-success/10 text-success" : m.available ? "gradient-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
                    {booked[m.id] ? "✓ Booked" : m.available ? "Book Session" : "Unavailable"}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 8-week Program */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <div className="bg-card rounded-xl border border-border p-4">
              <h4 className="font-display font-semibold text-xs mb-3 flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-warning" /> 8-Week Program</h4>
              <div className="space-y-1.5">
                {milestones.map((ms) => (
                  <div key={ms.week} className={`flex items-center gap-2 text-[10px] p-1.5 rounded-lg ${ms.done ? "bg-success/5" : "bg-secondary/30"}`}>
                    {ms.done ? <CheckCircle2 className="w-3 h-3 text-success shrink-0" /> : <div className="w-3 h-3 rounded-full border border-muted-foreground/30 shrink-0" />}
                    <span className={ms.done ? "line-through text-muted-foreground" : ""}>{ms.title}</span>
                    <span className="text-[9px] text-muted-foreground ml-auto">W{ms.week}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-card rounded-xl border border-border p-4 gradient-primary text-primary-foreground">
              <h4 className="font-bold text-xs mb-1">🌍 Cross-Border Mentorship</h4>
              <p className="text-[10px] opacity-90">Connect with mentors worldwide. Auto-translation in 40+ languages.</p>
            </div>
          </motion.div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Referral Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Referrals Made", value: "12", icon: "📤" },
              { label: "Successful Hires", value: "4", icon: "✅" },
              { label: "Credits Earned", value: "₹1.5L", icon: "💰" },
              { label: "Referral Score", value: "94/100", icon: "⭐" },
            ].map((s) => (
              <div key={s.label} className="bg-card rounded-xl border border-border p-3 text-center">
                <span className="text-lg">{s.icon}</span>
                <p className="font-display font-bold text-sm mt-0.5">{s.value}</p>
                <p className="text-[9px] text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Referral Activity */}
          <div className="bg-card rounded-xl border border-border p-4">
            <h4 className="font-display font-semibold text-xs mb-3">Recent Referral Activity</h4>
            <div className="space-y-3">
              {referralNetwork.map((ref, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }} className="flex items-center gap-3 bg-secondary/30 rounded-lg p-3">
                  <span className="text-xl">{ref.avatar}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold">{ref.name} → {ref.referred}</p>
                    <p className="text-[10px] text-muted-foreground">{ref.role} at {ref.to}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${ref.status === "hired" ? "bg-success/10 text-success" : ref.status === "interview" ? "bg-primary/10 text-primary" : "bg-warning/10 text-warning"}`}>
                      {ref.status === "hired" ? "✅ Hired" : ref.status === "interview" ? "🎤 Interview" : "📝 Applied"}
                    </span>
                    <p className="text-[9px] text-muted-foreground mt-0.5">{ref.reward}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full bg-card rounded-xl border border-border p-4 text-center gradient-primary text-primary-foreground font-display font-bold text-sm">
            🎯 Request a Referral from Your Network
          </motion.button>
        </div>
      )}
    </div>
  );
}
