import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Flame, Users, ExternalLink, Award, BarChart3, Globe, Hash } from "lucide-react";
import { trendingTopics, users } from "@/data/demoData";

export default function RightSidebar() {
  const liveSpaces = [
    { title: "AI in India: What's Next?", host: "Ananya Gupta", listeners: 1243, live: true },
    { title: "Startup Fundraising AMA", host: "Amit Choudhary", listeners: 856, live: true },
    { title: "Code Review Best Practices", host: "Vikram Singh", listeners: 432, live: false },
  ];

  const polls = [
    { question: "Best programming language in 2026?", options: [
      { label: "Rust", votes: 342 },
      { label: "TypeScript", votes: 567 },
      { label: "Python", votes: 489 },
      { label: "Go", votes: 234 },
    ]},
  ];

  const newsDigest = [
    { title: "Google announces Gemini 3.0 with 10M context window", source: "TechCrunch", time: "2h ago" },
    { title: "Indian startups raised $2.4B in Q1 2026", source: "YourStory", time: "4h ago" },
    { title: "Remote work legislation passes in India", source: "Economic Times", time: "6h ago" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-4"
    >
      {/* Live Spaces (Twitter-style) */}
      <div className="bg-card rounded-xl border border-border p-4">
        <h4 className="font-display font-semibold text-xs mb-3 flex items-center gap-1.5">
          <Globe className="w-3.5 h-3.5 text-twitter-blue" /> Live Spaces
        </h4>
        <div className="space-y-2.5">
          {liveSpaces.map((space, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ x: 4 }}
              className="cursor-pointer group"
            >
              <div className="flex items-center gap-1.5">
                {space.live && <div className="w-2 h-2 rounded-full bg-destructive animate-pulse" />}
                <p className="text-xs font-semibold group-hover:text-primary transition-colors truncate">{space.title}</p>
              </div>
              <p className="text-[10px] text-muted-foreground">🎙 {space.host} · 👂 {space.listeners.toLocaleString()}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Live Poll */}
      <div className="bg-card rounded-xl border border-border p-4">
        <h4 className="font-display font-semibold text-xs mb-3 flex items-center gap-1.5">
          <BarChart3 className="w-3.5 h-3.5 text-accent" /> Community Poll
        </h4>
        {polls.map((poll, pi) => (
          <PollWidget key={pi} poll={poll} />
        ))}
      </div>

      {/* Trending */}
      <div className="bg-card rounded-xl border border-border p-4">
        <h4 className="font-display font-semibold text-xs mb-3 flex items-center gap-1.5">
          <Flame className="w-3.5 h-3.5 text-reddit-orange" /> Trending Now
        </h4>
        <div className="space-y-2.5">
          {trendingTopics.filter((t) => t.trending).slice(0, 5).map((topic, i) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ x: 4 }}
              className="flex items-start justify-between cursor-pointer group"
            >
              <div>
                <p className="text-xs font-semibold group-hover:text-primary transition-colors">{topic.tag}</p>
                <p className="text-[10px] text-muted-foreground">{topic.category} · {topic.posts.toLocaleString()} posts</p>
              </div>
              <TrendingUp className="w-3 h-3 text-success mt-0.5" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* News Digest */}
      <div className="bg-card rounded-xl border border-border p-4">
        <h4 className="font-display font-semibold text-xs mb-3 flex items-center gap-1.5">
          <Hash className="w-3.5 h-3.5 text-primary" /> News Digest
        </h4>
        <div className="space-y-2.5">
          {newsDigest.map((news, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ x: 3 }}
              className="cursor-pointer group"
            >
              <p className="text-xs font-medium group-hover:text-primary transition-colors">{news.title}</p>
              <p className="text-[10px] text-muted-foreground">{news.source} · {news.time}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* People to follow */}
      <div className="bg-card rounded-xl border border-border p-4">
        <h4 className="font-display font-semibold text-xs mb-3 flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5 text-primary" /> Who to Follow
        </h4>
        <div className="space-y-3">
          {users.slice(0, 4).map((user, i) => (
            <UserSuggestion key={user.id} user={user} index={i} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-[10px] text-muted-foreground px-4 space-y-1">
        <p>About · Accessibility · Help</p>
        <p>Privacy · Terms · Advertising</p>
        <p className="flex items-center justify-center gap-1 font-semibold">LinkedIn Corporation © 2026</p>
      </div>
    </motion.div>
  );
}

function PollWidget({ poll }: { poll: { question: string; options: { label: string; votes: number }[] } }) {
  const [voted, setVoted] = useState<string | null>(null);
  const totalVotes = poll.options.reduce((sum, o) => sum + o.votes, 0);

  return (
    <div>
      <p className="text-xs font-semibold mb-2">{poll.question}</p>
      <div className="space-y-1.5">
        {poll.options.map((opt) => {
          const pct = Math.round(((opt.votes + (voted === opt.label ? 1 : 0)) / (totalVotes + (voted ? 1 : 0))) * 100);
          return (
            <motion.button
              key={opt.label}
              whileTap={{ scale: 0.98 }}
              onClick={() => setVoted(opt.label)}
              className={`w-full relative overflow-hidden rounded-lg text-left px-3 py-1.5 text-xs transition-all border ${
                voted === opt.label ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
              }`}
            >
              {voted && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-y-0 left-0 bg-primary/10 rounded-lg"
                />
              )}
              <div className="relative flex items-center justify-between">
                <span className={voted === opt.label ? "font-semibold" : ""}>{opt.label}</span>
                {voted && <span className="text-[10px] font-bold text-primary">{pct}%</span>}
              </div>
            </motion.button>
          );
        })}
      </div>
      <p className="text-[10px] text-muted-foreground mt-1.5">{totalVotes.toLocaleString()} votes</p>
    </div>
  );
}

function UserSuggestion({ user, index }: { user: typeof users[0]; index: number }) {
  const [following, setFollowing] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08 }}
      className="flex items-center gap-2"
    >
      <motion.span whileHover={{ scale: 1.2, rotate: 10 }} className="text-lg cursor-pointer">
        {user.avatar}
      </motion.span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1">
          <p className="text-xs font-semibold truncate">{user.name}</p>
          {user.verified && <Award className="w-3 h-3 text-primary flex-shrink-0" />}
        </div>
        <p className="text-[10px] text-muted-foreground truncate">{user.title}</p>
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setFollowing(!following)}
        className={`text-[10px] px-2.5 py-1 rounded-full font-semibold transition-all ${
          following ? "bg-secondary text-foreground" : "gradient-primary text-primary-foreground"
        }`}
      >
        {following ? "Following" : "Follow"}
      </motion.button>
    </motion.div>
  );
}
