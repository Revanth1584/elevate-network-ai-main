import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image, Video, FileText, BarChart3, Send, X, Hash } from "lucide-react";
import { currentUser } from "@/data/demoData";
import type { Post } from "@/data/demoData";

interface CreatePostProps {
  onPost: (post: Post) => void;
}

const attachments = [
  { icon: Image, label: "Photo", color: "text-success" },
  { icon: Video, label: "Video", color: "text-primary" },
  { icon: FileText, label: "Article", color: "text-accent" },
  { icon: BarChart3, label: "Poll", color: "text-reddit-orange" },
];

export default function CreatePost({ onPost }: CreatePostProps) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [tags, setTags] = useState("");

  const handlePost = () => {
    if (!text.trim()) return;
    const tagList = tags.split(",").map((t) => t.trim()).filter(Boolean);
    const newPost: Post = {
      id: `new-${Date.now()}`,
      author: currentUser,
      content: text,
      timestamp: "Just now",
      upvotes: 1,
      downvotes: 0,
      comments: [],
      reactions: { "🔥": 0 },
      shares: 0,
      tags: tagList,
    };
    onPost(newPost);
    setText("");
    setTags("");
    setOpen(false);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-xl border border-border p-4"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{currentUser.avatar}</span>
          <button
            onClick={() => setOpen(true)}
            className="flex-1 text-left text-sm text-muted-foreground bg-secondary/60 hover:bg-secondary rounded-full px-4 py-2.5 transition-colors"
          >
            What's on your mind, {currentUser.name.split(" ")[0]}?
          </button>
        </div>
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
          {attachments.map((a) => (
            <button
              key={a.label}
              onClick={() => setOpen(true)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs ${a.color} hover:bg-secondary rounded-full transition-colors`}
            >
              <a.icon className="w-4 h-4" /> {a.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 backdrop-blur-sm p-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card rounded-xl border border-border w-full max-w-lg shadow-2xl"
            >
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h3 className="font-display font-semibold">Create Post</h3>
                <button onClick={() => setOpen(false)} className="p-1 rounded-full hover:bg-secondary transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-2xl">{currentUser.avatar}</span>
                  <div>
                    <p className="text-sm font-semibold">{currentUser.name}</p>
                    <p className="text-xs text-muted-foreground">{currentUser.title}</p>
                  </div>
                </div>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Share your thoughts, ideas, or hot takes..."
                  rows={5}
                  className="w-full text-sm bg-transparent outline-none resize-none text-foreground placeholder:text-muted-foreground"
                  autoFocus
                />
                <div className="flex items-center gap-2 mt-2">
                  <Hash className="w-4 h-4 text-muted-foreground" />
                  <input
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="Tags (comma separated)"
                    className="flex-1 text-xs bg-secondary/50 rounded-full px-3 py-1 outline-none text-foreground placeholder:text-muted-foreground"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between p-4 border-t border-border">
                <div className="flex gap-2">
                  {attachments.map((a) => (
                    <button key={a.label} className={`p-2 rounded-full hover:bg-secondary ${a.color} transition-colors`}>
                      <a.icon className="w-4 h-4" />
                    </button>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePost}
                  disabled={!text.trim()}
                  className="flex items-center gap-2 px-5 py-2 rounded-full gradient-primary text-primary-foreground text-sm font-semibold disabled:opacity-50 transition-opacity"
                >
                  <Send className="w-4 h-4" /> Post
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
