import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { bookmarks, initialPosts } from "@/data/demoData";
import { Bookmark, Folder, Trash2, FolderPlus, Share2 } from "lucide-react";

export default function BookmarksTab() {
  const [selectedFolder, setSelectedFolder] = useState<string>("all");
  const [bookmarkData, setBookmarkData] = useState(bookmarks);
  const [folders] = useState(["Research", "Inspiration", "System Design", "Marketing"]);

  const filteredBookmarks = selectedFolder === "all"
    ? bookmarkData
    : bookmarkData.filter(b => b.folder === selectedFolder);

  const getPostById = (postId: string) => {
    return initialPosts.find(p => p.id === postId);
  };

  const removeBookmark = (id: string) => {
    setBookmarkData(bookmarkData.filter(b => b.id !== id));
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
          <div className="text-4xl">🔖</div>
          <div className="flex-1">
            <h1 className="font-display font-bold text-3xl">Collections</h1>
            <p className="text-sm text-muted-foreground">Your saved posts and bookmarks organized by topic</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg gradient-primary text-primary-foreground font-semibold text-sm hover:shadow-lg transition-all"
          >
            <FolderPlus className="w-4 h-4" />
            New Folder
          </motion.button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Folders Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <div className="bg-card rounded-xl border border-border p-4 sticky top-24">
            <p className="text-xs font-semibold text-muted-foreground mb-3">Folders</p>
            <div className="space-y-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedFolder("all")}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                  selectedFolder === "all"
                    ? "gradient-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                <Bookmark className="w-4 h-4" />
                All Bookmarks
                <span className="ml-auto text-xs bg-background/20 px-2 py-0.5 rounded">
                  {bookmarkData.length}
                </span>
              </motion.button>

              {folders.map((folder, index) => {
                const count = bookmarkData.filter(b => b.folder === folder).length;
                return (
                  <motion.button
                    key={folder}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedFolder(folder)}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                      selectedFolder === folder
                        ? "gradient-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    }`}
                  >
                    <Folder className="w-4 h-4" />
                    <span className="truncate">{folder}</span>
                    <span className="ml-auto text-xs bg-background/20 px-2 py-0.5 rounded">
                      {count}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Bookmarks Grid */}
        <motion.div className="lg:col-span-3">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-4 flex items-center justify-between"
          >
            <h2 className="font-display font-semibold text-lg">
              {selectedFolder === "all" ? "All Bookmarks" : selectedFolder}
            </h2>
            <span className="text-xs font-semibold text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full">
              {filteredBookmarks.length} saved
            </span>
          </motion.div>

          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {filteredBookmarks.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-12"
                >
                  <Bookmark className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-muted-foreground">No bookmarks yet</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Save posts to organize them into collections
                  </p>
                </motion.div>
              ) : (
                filteredBookmarks.map((bookmark, index) => {
                  const post = getPostById(bookmark.postId);
                  if (!post) return null;

                  return (
                    <motion.div
                      key={bookmark.id}
                      layoutId={bookmark.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.03 }}
                      whileHover={{ scale: 1.01 }}
                      className="group"
                    >
                      <div className="bg-card rounded-xl border border-border p-4 hover:border-primary/50 transition-all">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{post.author.avatar}</span>
                            <div>
                              <p className="font-semibold text-sm">{post.author.name}</p>
                              <p className="text-xs text-muted-foreground">{bookmark.savedAt}</p>
                            </div>
                          </div>
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                            {bookmark.folder}
                          </span>
                        </div>

                        <p className="text-sm text-foreground/90 mb-3 line-clamp-3">{post.content}</p>

                        <div className="flex items-center justify-between pt-3 border-t border-border/50">
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span>👍 {post.upvotes}</span>
                            <span>💬 {post.comments.length}</span>
                            <span>📤 {post.shares}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              className="p-1.5 rounded-lg hover:bg-secondary transition-colors opacity-0 group-hover:opacity-100"
                              title="Share"
                            >
                              <Share2 className="w-4 h-4 text-muted-foreground" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => removeBookmark(bookmark.id)}
                              className="p-1.5 rounded-lg hover:bg-destructive/10 transition-colors opacity-0 group-hover:opacity-100"
                              title="Remove bookmark"
                            >
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
