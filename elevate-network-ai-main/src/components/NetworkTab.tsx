import { useState } from "react";
import { motion } from "framer-motion";
import { Award, UserPlus, UserCheck, MapPin } from "lucide-react";
import { users } from "@/data/demoData";

export default function NetworkTab() {
  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-display font-bold text-lg"
      >
        Grow Your Network
      </motion.h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {users.map((user, i) => (
          <ConnectionCard key={user.id} user={user} index={i} />
        ))}
      </div>
    </div>
  );
}

function ConnectionCard({ user, index }: { user: typeof users[0]; index: number }) {
  const [connected, setConnected] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="bg-card rounded-xl border border-border overflow-hidden hover-lift"
    >
      <div className="h-12 gradient-primary" />
      <div className="px-4 pb-4 -mt-6">
        <motion.div whileHover={{ scale: 1.1 }} className="w-12 h-12 rounded-full bg-card border-3 border-card flex items-center justify-center text-2xl shadow-md">
          {user.avatar}
        </motion.div>
        <div className="mt-1.5">
          <div className="flex items-center gap-1">
            <h4 className="font-semibold text-sm">{user.name}</h4>
            {user.verified && <Award className="w-3 h-3 text-primary" />}
          </div>
          <p className="text-xs text-muted-foreground">{user.title} at {user.company}</p>
          <p className="text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5">
            <MapPin className="w-3 h-3" /> {user.location}
          </p>
          <p className="text-[10px] text-muted-foreground mt-0.5">{user.connections} connections · {user.karma.toLocaleString()} karma</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setConnected(!connected)}
          className={`w-full mt-3 flex items-center justify-center gap-1.5 py-2 rounded-full text-xs font-semibold transition-all ${
            connected
              ? "bg-secondary text-foreground"
              : "gradient-primary text-primary-foreground"
          }`}
        >
          {connected ? <><UserCheck className="w-3.5 h-3.5" /> Connected</> : <><UserPlus className="w-3.5 h-3.5" /> Connect</>}
        </motion.button>
      </div>
    </motion.div>
  );
}
