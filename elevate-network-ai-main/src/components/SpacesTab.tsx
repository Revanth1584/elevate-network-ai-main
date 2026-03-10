import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { spaces } from "@/data/demoData";
import type { Space } from "@/data/demoData";
import { Users, BookOpen, MessageSquare, Heart, Share2, Settings } from "lucide-react";

export default function SpacesTab() {
  const [selectedSpace, setSelectedSpace] = useState<Space | null>(spaces[0]);
  const [joinedSpaces, setJoinedSpaces] = useState<Set<string>>(new Set(["sp1"]));
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSpaces = spaces.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleJoin = (id: string) => {
    const newSet = new Set(joinedSpaces);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setJoinedSpaces(newSet);
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "Startups": "text-primary",
      "Engineering": "text-accent",
      "Community": "text-success",
      "Tools": "text-warning",
      "Growth": "text-destructive",
      "Security": "text-blue-500",
    };
    return colors[category] || "text-primary";
  };

  const getCategoryBg = (category: string) => {
    const colors: Record<string, string> = {
      "Startups": "bg-primary/10",
      "Engineering": "bg-accent/10",
      "Community": "bg-success/10",
      "Tools": "bg-warning/10",
      "Growth": "bg-destructive/10",
      "Security": "bg-blue-500/10",
    };
    return colors[category] || "bg-primary/10";
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="text-4xl">📚</div>
            <div>
              <h1 className="font-display font-bold text-3xl">Spaces</h1>
              <p className="text-sm text-muted-foreground">Join communities and explore interests</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search spaces..."
              className="w-full pl-4 pr-4 py-2.5 rounded-lg bg-card border border-border text-sm focus:border-primary focus:outline-none transition-all"
            />
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Spaces List */}
        <motion.div className="lg:col-span-2 space-y-3">
          <AnimatePresence mode="popLayout">
            {filteredSpaces.map((space, index) => (
              <motion.div
                key={space.id}
                layoutId={space.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: index * 0.03 }}
                whileHover={{ scale: 1.01 }}
                onClick={() => setSelectedSpace(space)}
                className="cursor-pointer"
              >
                <div className={`bg-card rounded-xl border transition-all p-4 hover:border-primary/50 ${
                  selectedSpace?.id === space.id ? "border-primary ring-2 ring-primary/20" : "border-border"
                }`}>
                  <div className="flex items-start gap-4 mb-3">
                    <div className="text-4xl flex-shrink-0">{space.avatar}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-display font-semibold text-sm">{space.name}</h3>
                        {space.private && (
                          <span className="text-xs bg-destructive/10 text-destructive px-2 py-0.5 rounded-full">
                            Private
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{space.description}</p>
                      <div className="flex items-center gap-3 text-xs">
                        <span className={`${getCategoryColor(space.category)} font-semibold`}>{space.category}</span>
                        <span span className="flex items-center gap-1 text-muted-foreground">
                          <Users className="w-3 h-3" /> {space.members} members
                        </span>
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <MessageSquare className="w-3 h-3" /> {space.posts} posts
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div className="flex items-center gap-2">
                      <div className="text-xs text-muted-foreground">
                        <Heart className="w-3.5 h-3.5 inline mr-1" />
                        {space.followers} followers
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleJoin(space.id);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        joinedSpaces.has(space.id)
                          ? "gradient-primary text-primary-foreground"
                          : "bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground"
                      }`}
                    >
                      {joinedSpaces.has(space.id) ? "✓ Joined" : "Join"}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredSpaces.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <BookOpen className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground">No spaces found matching your search</p>
            </motion.div>
          )}
        </motion.div>

        {/* Details Panel */}
        <motion.div className="lg:col-span-1">
          <AnimatePresence mode="wait">
            {selectedSpace ? (
              <motion.div
                key={selectedSpace.id}
                layoutId={selectedSpace.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="sticky top-24"
              >
                <div className="bg-card rounded-xl border border-primary/50 p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-5xl mb-2">{selectedSpace.avatar}</div>
                      <h2 className="font-display font-bold text-lg">{selectedSpace.name}</h2>
                      <span className={`inline-block mt-1 text-xs font-semibold px-2 py-1 rounded-full ${getCategoryBg(selectedSpace.category)} ${getCategoryColor(selectedSpace.category)}`}>
                        {selectedSpace.category}
                      </span>
                    </div>
                    <button className="p-2 rounded-lg hover:bg-secondary transition-all">
                      <Settings className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>

                  <div className="border-t border-border pt-4">
                    <p className="text-xs text-muted-foreground mb-2">Description</p>
                    <p className="text-sm text-foreground/90">{selectedSpace.description}</p>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-2">
                    <motion.div whileHover={{ scale: 1.05 }} className="bg-secondary/50 rounded-lg p-3 text-center">
                      <Users className="w-4 h-4 text-primary mx-auto mb-1" />
                      <p className="text-xs text-muted-foreground">Members</p>
                      <p className="font-bold text-sm">{(selectedSpace.members / 1000).toFixed(1)}k</p>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} className="bg-secondary/50 rounded-lg p-3 text-center">
                      <MessageSquare className="w-4 h-4 text-accent mx-auto mb-1" />
                      <p className="text-xs text-muted-foreground">Posts</p>
                      <p className="font-bold text-sm">{selectedSpace.posts}</p>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} className="bg-secondary/50 rounded-lg p-3 text-center">
                      <Heart className="w-4 h-4 text-warning mx-auto mb-1" />
                      <p className="text-xs text-muted-foreground">Followers</p>
                      <p className="font-bold text-sm">{(selectedSpace.followers / 1000).toFixed(1)}k</p>
                    </motion.div>
                  </div>

                  {/* Creator */}
                  <div className="border-t border-border pt-4">
                    <p className="text-xs font-semibold text-muted-foreground mb-2">Created by</p>
                    <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-secondary transition-colors cursor-pointer">
                      <span className="text-2xl">{selectedSpace.creator.avatar}</span>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold">{selectedSpace.creator.name}</p>
                        <p className="text-[10px] text-muted-foreground">{selectedSpace.creator.title}</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleJoin(selectedSpace.id)}
                      className={`py-2 rounded-lg font-bold text-xs transition-all ${
                        joinedSpaces.has(selectedSpace.id)
                          ? "gradient-primary text-primary-foreground"
                          : "bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground"
                      }`}
                    >
                      {joinedSpaces.has(selectedSpace.id) ? "✓ Joined" : "Join Space"}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="py-2 rounded-lg bg-secondary text-foreground font-bold text-xs hover:bg-secondary/80 transition-all flex items-center justify-center gap-1"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      Share
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
