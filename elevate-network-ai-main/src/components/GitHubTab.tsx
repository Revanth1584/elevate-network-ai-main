import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { repositories } from "@/data/demoData";
import type { Repository } from "@/data/demoData";
import { Github, Star, GitFork, Eye, trending as TrendingIcon, ExternalLink, Heart } from "lucide-react";

export default function GitHubTab() {
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(repositories[0]);
  const [starredRepos, setStarredRepos] = useState<Set<string>>(new Set(["r1", "r2"]));
  const [filter, setFilter] = useState<"all" | "trending" | "starred">("all");

  const filteredRepos = repositories.filter(r => {
    if (filter === "trending") return r.trending;
    if (filter === "starred") return starredRepos.has(r.id);
    return true;
  });

  const toggleStar = (id: string) => {
    const newSet = new Set(starredRepos);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setStarredRepos(newSet);
  };

  const getLanguageColor = (lang: string) => {
    const colors: Record<string, string> = {
      "Rust": "text-orange-500",
      "Python": "text-blue-500",
      "Go": "text-blue-400",
      "TypeScript": "text-blue-600",
      "JavaScript": "text-yellow-500",
      "Golang": "text-cyan-500",
    };
    return colors[lang] || "text-primary";
  };

  const getLanguageBg = (lang: string) => {
    const colors: Record<string, string> = {
      "Rust": "bg-orange-500/10",
      "Python": "bg-blue-500/10",
      "Go": "bg-blue-400/10",
      "TypeScript": "bg-blue-600/10",
      "JavaScript": "bg-yellow-500/10",
      "Golang": "bg-cyan-500/10",
    };
    return colors[lang] || "bg-primary/10";
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="text-4xl">💻</div>
          <div className="flex-1">
            <h1 className="font-display font-bold text-3xl">GitHub Integration</h1>
            <p className="text-sm text-muted-foreground">Discover trending repositories & projects from the community</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05, rotate: 10 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 rounded-xl gradient-primary text-primary-foreground hover:shadow-lg transition-all"
          >
            <Github className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-4">
          {(["all", "trending", "starred"] as const).map(f => (
            <motion.button
              key={f}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                filter === f
                  ? "gradient-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {f === "all" ? "All Repos" : f === "trending" ? "🔥 Trending" : `⭐ Starred (${starredRepos.size})`}
            </motion.button>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Repos List */}
        <motion.div className="lg:col-span-2 space-y-3">
          <AnimatePresence mode="popLayout">
            {filteredRepos.map((repo, index) => (
              <motion.div
                key={repo.id}
                layoutId={repo.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: index * 0.03 }}
                whileHover={{ scale: 1.01 }}
                onClick={() => setSelectedRepo(repo)}
                className="cursor-pointer"
              >
                <div className={`bg-card rounded-xl border transition-all p-4 hover:border-primary/50 relative overflow-hidden group ${
                  selectedRepo?.id === repo.id ? "border-primary ring-2 ring-primary/20" : "border-border"
                }`}>
                  {/* Background gradient on hover */}
                  <div className="absolute inset-0 gradient-primary opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none" />

                  <div className="relative z-10">
                    {/* Trending Badge */}
                    {repo.trending && (
                      <motion.div
                        layoutId={`trending-${repo.id}`}
                        className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-full bg-orange-500/20 text-orange-500 text-xs font-bold"
                      >
                        <span>🔥</span> Trending
                      </motion.div>
                    )}

                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-display font-semibold text-sm mb-1">{repo.name}</h3>
                        <p className="text-xs text-muted-foreground line-clamp-2">{repo.description}</p>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-3 text-xs mb-3 pt-2 border-t border-border/50">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleStar(repo.id);
                        }}
                        className="flex items-center gap-1 text-muted-foreground hover:text-warning transition-colors"
                      >
                        <Heart
                          className={`w-3.5 h-3.5 ${starredRepos.has(repo.id) ? "fill-current text-warning" : ""}`}
                        />
                        {repo.stars}
                      </button>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <GitFork className="w-3.5 h-3.5" />
                        {repo.forks}
                      </div>
                      <span className={`flex items-center gap-1 font-semibold ${getLanguageColor(repo.language)}`}>
                        <div className="w-1.5 h-1.5 rounded-full bg-current" />
                        {repo.language}
                      </span>
                    </div>

                    {/* Owner */}
                    <div className="flex items-center justify-between pt-2 border-t border-border/50">
                      <button className="flex items-center gap-2 hover:bg-secondary/50 px-2 py-1 rounded transition-colors">
                        <span className="text-lg">{repo.owner.avatar}</span>
                        <div className="text-left">
                          <p className="text-xs font-semibold">{repo.owner.name}</p>
                          <p className="text-[10px] text-muted-foreground">{repo.owner.title}</p>
                        </div>
                      </button>
                      <motion.button
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-1.5 rounded-lg hover:bg-primary/10 text-primary transition-colors"
                        title="Open on GitHub"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredRepos.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Github className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground">No repositories found</p>
            </motion.div>
          )}
        </motion.div>

        {/* Details Panel */}
        <motion.div className="lg:col-span-1">
          <AnimatePresence mode="wait">
            {selectedRepo ? (
              <motion.div
                key={selectedRepo.id}
                layoutId={selectedRepo.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="sticky top-24"
              >
                <div className="bg-card rounded-xl border border-primary/50 p-6 space-y-4">
                  <div>
                    <h2 className="font-display font-bold text-lg mb-2">{selectedRepo.name}</h2>
                    {selectedRepo.trending && (
                      <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-orange-500/20 text-orange-500 text-xs font-bold mb-3"
                      >
                        <span>🔥</span> Trending Now
                      </motion.div>
                    )}
                  </div>

                  <div className="border-t border-border pt-4">
                    <p className="text-xs text-muted-foreground mb-2">Description</p>
                    <p className="text-sm text-foreground/90">{selectedRepo.description}</p>
                  </div>

                  {/* Language */}
                  <div className="border-t border-border pt-4">
                    <p className="text-xs text-muted-foreground mb-2">Language</p>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${getLanguageBg(selectedRepo.language)} ${getLanguageColor(selectedRepo.language)} font-semibold text-xs`}>
                      <div className="w-2 h-2 rounded-full bg-current" />
                      {selectedRepo.language}
                    </span>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 border-t border-border pt-4">
                    <motion.div whileHover={{ scale: 1.05 }} className="bg-secondary/50 rounded-lg p-3">
                      <Heart className={`w-4 h-4 mx-auto mb-1 ${starredRepos.has(selectedRepo.id) ? "text-warning fill-current" : "text-muted-foreground"}`} />
                      <p className="text-[10px] text-muted-foreground text-center">Stars</p>
                      <p className="font-bold text-center">{(selectedRepo.stars / 1000).toFixed(1)}k</p>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} className="bg-secondary/50 rounded-lg p-3">
                      <GitFork className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                      <p className="text-[10px] text-muted-foreground text-center">Forks</p>
                      <p className="font-bold text-center">{(selectedRepo.forks / 1000).toFixed(1)}k</p>
                    </motion.div>
                  </div>

                  {/* Owner */}
                  <div className="border-t border-border pt-4">
                    <p className="text-xs font-semibold text-muted-foreground mb-2">Owner</p>
                    <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-secondary transition-colors cursor-pointer">
                      <span className="text-2xl">{selectedRepo.owner.avatar}</span>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold">{selectedRepo.owner.name}</p>
                        <p className="text-[10px] text-muted-foreground">{selectedRepo.owner.title}</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleStar(selectedRepo.id)}
                      className={`py-2 rounded-lg font-bold text-xs transition-all flex items-center justify-center gap-1 ${
                        starredRepos.has(selectedRepo.id)
                          ? "gradient-primary text-primary-foreground"
                          : "bg-secondary text-foreground hover:bg-primary/10"
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${starredRepos.has(selectedRepo.id) ? "fill-current" : ""}`} />
                      {starredRepos.has(selectedRepo.id) ? "Starred" : "Star"}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="py-2 rounded-lg bg-primary/10 text-primary font-bold text-xs hover:bg-primary hover:text-primary-foreground transition-all flex items-center justify-center gap-1"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Open
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
