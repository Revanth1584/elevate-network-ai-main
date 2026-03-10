import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Users, ExternalLink, Bookmark, Check } from "lucide-react";
import { jobs } from "@/data/demoData";

export default function JobsTab() {
  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="font-display font-bold text-lg">
        Jobs For You
      </motion.h2>
      <div className="space-y-3">
        {jobs.map((job, i) => (
          <JobCard key={job.id} job={job} index={i} />
        ))}
      </div>
    </div>
  );
}

function JobCard({ job, index }: { job: typeof jobs[0]; index: number }) {
  const [saved, setSaved] = useState(false);
  const [applied, setApplied] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-card rounded-xl border border-border p-4 hover-lift"
    >
      <div className="flex items-start gap-3">
        <motion.div whileHover={{ rotate: 10 }} className="text-3xl">{job.logo}</motion.div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm">{job.title}</h4>
          <p className="text-xs text-muted-foreground">{job.company}</p>
          <div className="flex flex-wrap items-center gap-3 text-[10px] text-muted-foreground mt-1">
            <span className="flex items-center gap-0.5"><MapPin className="w-3 h-3" /> {job.location}</span>
            <span className="flex items-center gap-0.5"><Clock className="w-3 h-3" /> {job.posted}</span>
            <span className="flex items-center gap-0.5"><Users className="w-3 h-3" /> {job.applicants} applicants</span>
          </div>
          <p className="text-xs font-bold text-success mt-1">{job.salary}</p>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {job.tags.map((t) => (
              <span key={t} className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full">{t}</span>
            ))}
          </div>
          <span className="inline-block text-[10px] bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full mt-1.5">{job.type}</span>
        </div>
        <motion.button
          whileTap={{ scale: 1.3 }}
          onClick={() => setSaved(!saved)}
          className={`p-1.5 rounded-full transition-colors ${saved ? "text-warning" : "text-muted-foreground hover:text-warning"}`}
        >
          <Bookmark className="w-4 h-4" fill={saved ? "currentColor" : "none"} />
        </motion.button>
      </div>
      <div className="flex gap-2 mt-3">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setApplied(!applied)}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-full text-xs font-semibold transition-all ${
            applied ? "bg-success/20 text-success" : "gradient-primary text-primary-foreground"
          }`}
        >
          {applied ? <><Check className="w-3.5 h-3.5" /> Applied!</> : <><ExternalLink className="w-3.5 h-3.5" /> Easy Apply</>}
        </motion.button>
      </div>
    </motion.div>
  );
}
