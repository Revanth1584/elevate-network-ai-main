import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Clock, DollarSign, Star, MapPin, Filter, Zap, Shield, Users, ArrowUpRight } from "lucide-react";

interface Gig {
  id: string;
  title: string;
  company: string;
  avatar: string;
  budget: string;
  duration: string;
  skills: string[];
  applicants: number;
  rating: number;
  reviews: number;
  urgent: boolean;
  type: "fixed" | "hourly";
  posted: string;
  description: string;
}

const gigs: Gig[] = [
  { id: "g1", title: "Build a React Dashboard with Real-time Analytics", company: "Razorpay", avatar: "💳", budget: "₹2,00,000", duration: "3 weeks", skills: ["React", "TypeScript", "D3.js"], applicants: 12, rating: 4.9, reviews: 156, urgent: true, type: "fixed", posted: "2h ago", description: "We need a senior React developer to build an internal analytics dashboard with real-time data visualization." },
  { id: "g2", title: "AI Chatbot Integration for E-commerce", company: "Flipkart", avatar: "🛒", budget: "₹5,000/hr", duration: "4 weeks", skills: ["Python", "NLP", "FastAPI"], applicants: 8, rating: 4.8, reviews: 234, urgent: false, type: "hourly", posted: "5h ago", description: "Integrate an AI-powered chatbot for customer support with product recommendation capabilities." },
  { id: "g3", title: "Mobile App UI/UX Redesign", company: "Swiggy", avatar: "🍔", budget: "₹3,50,000", duration: "6 weeks", skills: ["Figma", "UI/UX", "Prototyping"], applicants: 23, rating: 4.7, reviews: 89, urgent: false, type: "fixed", posted: "1d ago", description: "Complete redesign of the delivery tracking experience with modern micro-interactions." },
  { id: "g4", title: "Kubernetes Cluster Migration", company: "Freshworks", avatar: "🦁", budget: "₹8,000/hr", duration: "2 weeks", skills: ["Kubernetes", "AWS", "Terraform"], applicants: 5, rating: 4.9, reviews: 67, urgent: true, type: "hourly", posted: "3h ago", description: "Migrate existing infrastructure from Docker Swarm to Kubernetes with zero downtime." },
  { id: "g5", title: "Data Pipeline Architecture", company: "Zomato", avatar: "🍕", budget: "₹4,50,000", duration: "5 weeks", skills: ["Kafka", "Spark", "Python"], applicants: 7, rating: 4.6, reviews: 45, urgent: false, type: "fixed", posted: "12h ago", description: "Design and implement a real-time data pipeline processing 1M+ events/hour." },
  { id: "g6", title: "Smart Contract Audit & Security Review", company: "InnovateTech", avatar: "🦅", budget: "₹6,00,000", duration: "2 weeks", skills: ["Solidity", "Security", "Web3"], applicants: 3, rating: 4.8, reviews: 34, urgent: true, type: "fixed", posted: "1h ago", description: "Comprehensive security audit of DeFi smart contracts with vulnerability report." },
];

const freelancerStats = [
  { label: "Active Gigs", value: "2", icon: "🔥" },
  { label: "Completed", value: "23", icon: "✅" },
  { label: "Earnings", value: "₹18.5L", icon: "💰" },
  { label: "Rating", value: "4.9★", icon: "⭐" },
];

export default function MarketplaceTab() {
  const [applied, setApplied] = useState<Record<string, boolean>>({});
  const [filterType, setFilterType] = useState<"all" | "fixed" | "hourly">("all");

  const filtered = gigs.filter((g) => filterType === "all" || g.type === filterType);

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between flex-wrap gap-2">
        <h2 className="font-display font-bold text-lg flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-accent" /> Freelance Marketplace
        </h2>
        <div className="flex items-center gap-2">
          <div className="flex gap-1 bg-card rounded-lg border border-border p-0.5">
            {(["all", "fixed", "hourly"] as const).map((f) => (
              <button key={f} onClick={() => setFilterType(f)} className={`text-[10px] px-3 py-1 rounded-md capitalize transition-all ${filterType === f ? "gradient-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary"}`}>
                {f === "all" ? "All Gigs" : f === "fixed" ? "Fixed Price" : "Hourly"}
              </button>
            ))}
          </div>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="text-[10px] px-3 py-1.5 rounded-full gradient-accent text-accent-foreground font-semibold">
            + Post a Gig
          </motion.button>
        </div>
      </motion.div>

      {/* Stats Banner */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="grid grid-cols-4 gap-3">
        {freelancerStats.map((s) => (
          <div key={s.label} className="bg-card rounded-xl border border-border p-3 text-center">
            <span className="text-lg">{s.icon}</span>
            <p className="font-display font-bold text-sm mt-0.5">{s.value}</p>
            <p className="text-[9px] text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Gig Listings */}
      <div className="space-y-3">
        {filtered.map((gig, i) => (
          <motion.div key={gig.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }} className="bg-card rounded-xl border border-border p-4 hover-lift">
            <div className="flex items-start gap-3">
              <span className="text-2xl">{gig.avatar}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h4 className="font-display font-bold text-sm">{gig.title}</h4>
                  {gig.urgent && (
                    <span className="text-[9px] bg-destructive/10 text-destructive px-1.5 py-0.5 rounded-full flex items-center gap-0.5 animate-pulse">
                      <Zap className="w-2.5 h-2.5" /> Urgent
                    </span>
                  )}
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${gig.type === "fixed" ? "bg-primary/10 text-primary" : "bg-success/10 text-success"}`}>
                    {gig.type === "fixed" ? "Fixed Price" : "Hourly Rate"}
                  </span>
                </div>
                <p className="text-[10px] text-muted-foreground mb-2">{gig.description}</p>
                <div className="flex items-center gap-3 text-[10px] text-muted-foreground mb-2 flex-wrap">
                  <span className="flex items-center gap-0.5 font-semibold text-foreground"><DollarSign className="w-3 h-3" />{gig.budget}</span>
                  <span className="flex items-center gap-0.5"><Clock className="w-3 h-3" />{gig.duration}</span>
                  <span className="flex items-center gap-0.5"><Users className="w-3 h-3" />{gig.applicants} proposals</span>
                  <span className="flex items-center gap-0.5"><Star className="w-3 h-3 text-warning" />{gig.rating} ({gig.reviews})</span>
                  <span>{gig.company} · {gig.posted}</span>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {gig.skills.map((s) => (
                    <span key={s} className="text-[9px] bg-secondary px-2 py-0.5 rounded-full">{s}</span>
                  ))}
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setApplied((a) => ({ ...a, [gig.id]: !a[gig.id] }))}
                className={`text-[10px] px-4 py-2 rounded-full font-semibold transition-all shrink-0 flex items-center gap-1 ${
                  applied[gig.id] ? "bg-success/10 text-success" : "gradient-primary text-primary-foreground"
                }`}
              >
                {applied[gig.id] ? "✓ Applied" : <>Apply <ArrowUpRight className="w-3 h-3" /></>}
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Escrow Trust Banner */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="bg-card rounded-xl border border-border p-4 flex items-center gap-3">
        <Shield className="w-8 h-8 text-success" />
        <div>
          <h4 className="font-display font-bold text-xs">Secure Escrow Payments</h4>
          <p className="text-[10px] text-muted-foreground">All payments are held in escrow until work is approved. 100% money-back guarantee.</p>
        </div>
        <span className="text-[9px] bg-success/10 text-success px-2 py-1 rounded-full font-semibold ml-auto shrink-0">🔒 Protected</span>
      </motion.div>
    </div>
  );
}
