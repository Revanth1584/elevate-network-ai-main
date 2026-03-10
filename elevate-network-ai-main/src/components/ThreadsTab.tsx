import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { threads } from "@/data/demoData";
import type { Thread } from "@/data/demoData";
import { MessageCircle, Repeat2, Heart, Share } from "lucide-react";

export default function ThreadsTab() {
  const [likedThreads, setLikedThreads] = useState<Set<string>>(new Set());
  const [rethreads, setRethreads] = useState<Set<string>>(new Set());
  const [selectedThread, setSelectedThread] = useState<Thread | null>(threads[0]);

  const toggleLike = (id: string) => {
    const newSet = new Set(likedThreads);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setLikedThreads(newSet);
  };

  const toggleRethread = (id: string) => {
    const newSet = new Set(rethreads);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setRethreads(newSet);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="text-4xl">💬</div>
          <div>
            <h1 className="font-display font-bold text-3xl">Threads</h1>
            <p className="text-sm text-muted-foreground">Hot takes and conversations from the community</p>
          </div>
        </div>
      </motion.div>

      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {threads.map((thread, index) => (
            <motion.div
              key={thread.id}
              layoutId={thread.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.01, y: -2 }}
              onClick={() => setSelectedThread(thread)}
              className="cursor-pointer"
            >
              <div className={`bg-card rounded-xl border transition-all p-5 hover:border-primary/50 group relative overflow-hidden ${
                selectedThread?.id === thread.id ? "border-primary ring-2 ring-primary/20" : "border-border"
              }`}>
                {/* Animated background */}
                <div className="absolute inset-0 gradient-primary opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none" />

                <div className="relative z-10">
                  {/* Author */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">{thread.author.avatar}</span>
                    <div className="flex-1">
                      <p className="text-sm font-semibold">{thread.author.name}</p>
                      <p className="text-xs text-muted-foreground">{thread.author.title}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{thread.timestamp}</span>
                  </div>

                  {/* Content */}
                  <p className="text-sm text-foreground mb-4 leading-relaxed">{thread.content}</p>

                  {/* Thread Depth Indicator */}
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border/50">
                    <div className="flex">
                      {Array.from({ length: thread.depth }).map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                          className="w-2 h-2 rounded-full gradient-primary -ml-1"
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">{thread.depth} replies deep</span>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-4 gap-3 mb-4">
                    <div className="flex items-center gap-1.5 text-xs hover:text-accent transition-colors cursor-pointer group/stat">
                      <div className="p-1.5 rounded-full group-hover/stat:bg-accent/10 transition-colors">
                        <MessageCircle className="w-3.5 h-3.5 group-hover/stat:text-accent transition-colors" />
                      </div>
                      <span className="font-semibold">{thread.replies}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs hover:text-primary transition-colors cursor-pointer group/stat" onClick={(e) => { e.stopPropagation(); toggleRethread(thread.id); }}>
                      <div className={`p-1.5 rounded-full transition-colors ${rethreads.has(thread.id) ? "bg-primary/20 text-primary" : "group-hover/stat:bg-primary/10"}`}>
                        <Repeat2 className={`w-3.5 h-3.5 transition-colors ${rethreads.has(thread.id) ? "text-primary" : "group-hover/stat:text-primary"}`} />
                      </div>
                      <span className={`font-semibold ${rethreads.has(thread.id) ? "text-primary" : ""}`}>{thread.reposts}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs hover:text-warning transition-colors cursor-pointer group/stat" onClick={(e) => { e.stopPropagation(); toggleLike(thread.id); }}>
                      <div className={`p-1.5 rounded-full transition-colors ${likedThreads.has(thread.id) ? "bg-warning/20 text-warning" : "group-hover/stat:bg-warning/10"}`}>
                        <Heart className={`w-3.5 h-3.5 transition-colors ${likedThreads.has(thread.id) ? "fill-current text-warning" : "group-hover/stat:text-warning"}`} />
                      </div>
                      <span className={`font-semibold ${likedThreads.has(thread.id) ? "text-warning" : ""}`}>{thread.likes}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs hover:text-success transition-colors cursor-pointer group/stat">
                      <div className="p-1.5 rounded-full group-hover/stat:bg-success/10 transition-colors">
                        <Share className="w-3.5 h-3.5 group-hover/stat:text-success transition-colors" />
                      </div>
                      <span className="font-semibold">{thread.shares}</span>
                    </div>
                  </div>

                  {/* Quick Reply */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-2 rounded-lg bg-primary/5 text-primary text-xs font-semibold hover:bg-primary/10 transition-all text-center group-hover:opacity-100 opacity-0"
                  >
                    Reply to thread
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Detail View */}
      <AnimatePresence>
        {selectedThread && (
          <motion.div
            layoutId={selectedThread.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed bottom-0 right-4 left-4 md:left-auto md:w-96 bg-card rounded-t-xl md:rounded-xl border border-border shadow-2xl z-40"
          >
            <div className="p-6 max-h-96 overflow-y-auto">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{selectedThread.author.avatar}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm">{selectedThread.author.name}</p>
                  <p className="text-xs text-muted-foreground">{selectedThread.author.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{selectedThread.timestamp}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedThread(null)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ✕
                </motion.button>
              </div>

              <p className="text-sm text-foreground mb-4 leading-relaxed">{selectedThread.content}</p>

              <div className="grid grid-cols-4 gap-2 py-3 border-t border-b border-border/50 mb-4 text-xs">
                <div className="text-center">
                  <p className="text-muted-foreground">Replies</p>
                  <p className="font-bold text-primary">{selectedThread.replies}</p>
                </div>
                <div className="text-center">
                  <p className="text-muted-foreground">Rethreads</p>
                  <p className="font-bold text-accent">{selectedThread.reposts}</p>
                </div>
                <div className="text-center">
                  <p className="text-muted-foreground">Likes</p>
                  <p className="font-bold text-warning">{selectedThread.likes}</p>
                </div>
                <div className="text-center">
                  <p className="text-muted-foreground">Shares</p>
                  <p className="font-bold text-success">{selectedThread.shares}</p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-2.5 rounded-lg gradient-primary text-primary-foreground font-semibold text-sm hover:shadow-lg transition-all"
              >
                Reply to Thread
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
