import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, CheckCircle2, Award, Building, GraduationCap, Briefcase, Lock, ExternalLink, Star, Clock } from "lucide-react";

interface Credential {
  id: string;
  type: "degree" | "cert" | "work" | "badge";
  title: string;
  issuer: string;
  avatar: string;
  date: string;
  verified: boolean;
  hash?: string;
}

const credentials: Credential[] = [
  { id: "cr1", type: "degree", title: "B.Tech Computer Science", issuer: "IIT Bombay", avatar: "🎓", date: "2019", verified: true, hash: "0x7f3a...e82b" },
  { id: "cr2", type: "cert", title: "AWS Solutions Architect Professional", issuer: "Amazon Web Services", avatar: "☁️", date: "2025", verified: true, hash: "0x2c4d...a91f" },
  { id: "cr3", type: "work", title: "Senior Engineer (3 years)", issuer: "Tech Mahindra", avatar: "🏢", date: "2023-Present", verified: true, hash: "0x9b1e...d73c" },
  { id: "cr4", type: "cert", title: "Google Cloud Professional Data Engineer", issuer: "Google", avatar: "🔍", date: "2024", verified: true, hash: "0x5e8f...b24a" },
  { id: "cr5", type: "badge", title: "Top Voice in Software Engineering", issuer: "LinkedIn", avatar: "💼", date: "2026", verified: true, hash: "0x1a3c...f56d" },
  { id: "cr6", type: "work", title: "Software Engineer (2 years)", issuer: "Infosys", avatar: "🏢", date: "2019-2021", verified: true, hash: "0x8d2b...c47e" },
  { id: "cr7", type: "cert", title: "Kubernetes Administrator (CKA)", issuer: "CNCF", avatar: "⚙️", date: "2024", verified: false },
];

const verificationRequests = [
  { from: "Flipkart HR", avatar: "🛒", requesting: "B.Tech Degree + Work History", status: "pending", time: "2h ago" },
  { from: "Google Recruiter", avatar: "🔍", requesting: "AWS Certification", status: "approved", time: "1d ago" },
  { from: "Razorpay CTO", avatar: "💳", requesting: "Full Credential Wallet", status: "approved", time: "3d ago" },
];

const typeIcons = { degree: GraduationCap, cert: Award, work: Briefcase, badge: Star };
const typeColors = { degree: "text-primary", cert: "text-success", work: "text-accent", badge: "text-warning" };

export default function CredentialsTab() {
  const [filter, setFilter] = useState<"all" | "degree" | "cert" | "work" | "badge">("all");
  const filtered = credentials.filter((c) => filter === "all" || c.type === filter);

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between flex-wrap gap-2">
        <h2 className="font-display font-bold text-lg flex items-center gap-2">
          <Shield className="w-5 h-5 text-success" /> Verified Credential Wallet
        </h2>
        <div className="flex gap-1 bg-card rounded-lg border border-border p-0.5">
          {(["all", "degree", "cert", "work", "badge"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`text-[10px] px-2.5 py-1 rounded-md capitalize transition-all ${filter === f ? "gradient-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary"}`}>
              {f === "cert" ? "Certs" : f}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Trust Score */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-card rounded-xl border border-border p-5">
        <div className="flex items-center gap-4">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }} className="relative w-16 h-16">
            <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
              <path className="text-secondary" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="100, 100" />
              <motion.path initial={{ strokeDasharray: "0, 100" }} animate={{ strokeDasharray: "92, 100" }} transition={{ duration: 1.2, delay: 0.3 }} className="text-success" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display font-bold text-sm text-success">92%</span>
            </div>
          </motion.div>
          <div className="flex-1">
            <h3 className="font-display font-bold text-sm">Trust Score: 92/100</h3>
            <p className="text-[10px] text-muted-foreground">6 of 7 credentials verified on-chain</p>
            <div className="flex gap-2 mt-2">
              <span className="text-[9px] bg-success/10 text-success px-2 py-0.5 rounded-full">🔗 Blockchain Verified</span>
              <span className="text-[9px] bg-primary/10 text-primary px-2 py-0.5 rounded-full">🛡️ Tamper-Proof</span>
              <span className="text-[9px] bg-warning/10 text-warning px-2 py-0.5 rounded-full">📱 Portable</span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4">
        {/* Credentials List */}
        <div className="space-y-3">
          {filtered.map((cred, i) => {
            const Icon = typeIcons[cred.type];
            return (
              <motion.div key={cred.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }} className="bg-card rounded-xl border border-border p-4 hover-lift">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">{cred.avatar}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <Icon className={`w-3.5 h-3.5 ${typeColors[cred.type]}`} />
                      <h4 className="font-display font-bold text-sm">{cred.title}</h4>
                    </div>
                    <p className="text-[10px] text-muted-foreground">{cred.issuer} · {cred.date}</p>
                    {cred.hash && (
                      <p className="text-[9px] text-muted-foreground mt-1 font-mono flex items-center gap-1">
                        <Lock className="w-2.5 h-2.5" /> {cred.hash}
                      </p>
                    )}
                  </div>
                  <div className={`flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-full ${cred.verified ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>
                    {cred.verified ? <><CheckCircle2 className="w-3 h-3" /> Verified</> : <><Clock className="w-3 h-3" /> Pending</>}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Verification Requests */}
        <div className="space-y-4">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-card rounded-xl border border-border p-4">
            <h4 className="font-display font-semibold text-xs mb-3 flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-primary" /> Verification Requests</h4>
            <div className="space-y-2.5">
              {verificationRequests.map((req, i) => (
                <div key={i} className="bg-secondary/50 rounded-lg p-2.5">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm">{req.avatar}</span>
                    <span className="text-[10px] font-semibold">{req.from}</span>
                    <span className="text-[9px] text-muted-foreground ml-auto">{req.time}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground mb-1.5">Requesting: {req.requesting}</p>
                  <div className={`text-[9px] font-semibold px-2 py-0.5 rounded-full inline-flex items-center gap-0.5 ${req.status === "approved" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>
                    {req.status === "approved" ? "✅ Approved" : "⏳ Pending Review"}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="bg-card rounded-xl border border-border p-4 gradient-primary text-primary-foreground">
            <h4 className="font-bold text-xs mb-1">🔐 Your Data, Your Control</h4>
            <p className="text-[10px] opacity-90 mb-2">Share credentials selectively. Revoke access anytime. Full GDPR compliance.</p>
            <button className="text-[10px] bg-primary-foreground/20 hover:bg-primary-foreground/30 px-3 py-1 rounded-full transition-colors">Export Wallet →</button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
