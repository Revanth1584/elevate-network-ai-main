import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowBigUp, ArrowBigDown, MessageCircle, Share2, Bookmark, MoreHorizontal, Send, Award, Pin,
} from "lucide-react";
import type { Post, Comment } from "@/data/demoData";
import { currentUser } from "@/data/demoData";

const REACTION_EMOJIS = ["🔥", "💡", "👏", "❤️", "🚀", "💯", "😤", "🎉", "💪", "🧵"];

interface PostCardProps {
  post: Post;
  index: number;
}

export default function PostCard({ post, index }: PostCardProps) {
  const [votes, setVotes] = useState(post.upvotes - post.downvotes);
  const [voted, setVoted] = useState<"up" | "down" | null>(null);
  const [showComments, setShowComments] = useState(false);
  const [showReactions, setShowReactions] = useState(false);
  const [reactions, setReactions] = useState(post.reactions);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>(post.comments);
  const [saved, setSaved] = useState(false);
  const [shared, setShared] = useState(false);

  const handleVote = (dir: "up" | "down") => {
    if (voted === dir) {
      setVotes((v) => v + (dir === "up" ? -1 : 1));
      setVoted(null);
    } else {
      const delta = dir === "up" ? (voted === "down" ? 2 : 1) : voted === "up" ? -2 : -1;
      setVotes((v) => v + delta);
      setVoted(dir);
    }
  };

  const addReaction = (emoji: string) => {
    setReactions((r) => ({ ...r, [emoji]: (r[emoji] || 0) + 1 }));
    setShowReactions(false);
  };

  const addComment = () => {
    if (!commentText.trim()) return;
    const newComment: Comment = {
      id: `new-${Date.now()}`,
      author: currentUser,
      content: commentText,
      timestamp: "Just now",
      upvotes: 0,
      replies: [],
    };
    setComments((c) => [newComment, ...c]);
    setCommentText("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="bg-card rounded-xl border border-border overflow-hidden hover-lift"
    >
      {/* Pinned badge */}
      {post.pinned && (
        <div className="flex items-center gap-1 px-4 pt-2 text-xs text-accent font-semibold">
          <Pin className="w-3 h-3" /> Pinned Post
        </div>
      )}

      {/* Subreddit tag */}
      {post.subreddit && (
        <div className="px-4 pt-2">
          <span className="text-xs font-semibold text-reddit-orange bg-reddit-orange/10 px-2 py-0.5 rounded-full">
            {post.subreddit}
          </span>
        </div>
      )}

      {/* Author */}
      <div className="flex items-start gap-3 p-4 pb-2">
        <motion.div whileHover={{ scale: 1.15, rotate: 5 }} className="text-2xl cursor-pointer">
          {post.author.avatar}
        </motion.div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm">{post.author.name}</span>
            {post.author.verified && <Award className="w-3.5 h-3.5 text-primary" />}
            <span className="text-xs text-muted-foreground">· {post.timestamp}</span>
          </div>
          <p className="text-xs text-muted-foreground">{post.author.title} at {post.author.company}</p>
        </div>
        <button className="p-1 rounded-full hover:bg-secondary transition-colors">
          <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {/* Content */}
      <div className="px-4 pb-3">
        <p className="text-sm whitespace-pre-line leading-relaxed">{post.content}</p>
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-2">
          {post.tags.map((tag) => (
            <span key={tag} className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full cursor-pointer hover:bg-primary/20 transition-colors">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Reactions bar */}
      <div className="px-4 pb-2 flex flex-wrap gap-1.5">
        {Object.entries(reactions).map(([emoji, count]) => (
          <motion.button
            key={emoji}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => addReaction(emoji)}
            className="flex items-center gap-1 text-xs bg-secondary/80 hover:bg-secondary px-2 py-0.5 rounded-full transition-colors"
          >
            {emoji} <span className="text-muted-foreground">{count}</span>
          </motion.button>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center border-t border-border px-2 py-1">
        {/* Upvote / Downvote (Reddit-style) */}
        <div className="flex items-center gap-0.5">
          <motion.button
            whileTap={{ scale: 1.4 }}
            onClick={() => handleVote("up")}
            className={`p-1.5 rounded-full transition-colors ${voted === "up" ? "text-upvote bg-upvote/10" : "text-muted-foreground hover:text-upvote"}`}
          >
            <ArrowBigUp className="w-5 h-5" fill={voted === "up" ? "currentColor" : "none"} />
          </motion.button>
          <motion.span
            key={votes}
            initial={{ scale: 1.3 }}
            animate={{ scale: 1 }}
            className={`text-xs font-bold min-w-[2ch] text-center ${voted === "up" ? "text-upvote" : voted === "down" ? "text-downvote" : "text-muted-foreground"}`}
          >
            {votes}
          </motion.span>
          <motion.button
            whileTap={{ scale: 1.4 }}
            onClick={() => handleVote("down")}
            className={`p-1.5 rounded-full transition-colors ${voted === "down" ? "text-downvote bg-downvote/10" : "text-muted-foreground hover:text-downvote"}`}
          >
            <ArrowBigDown className="w-5 h-5" fill={voted === "down" ? "currentColor" : "none"} />
          </motion.button>
        </div>

        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-secondary rounded-full transition-colors ml-1"
        >
          <MessageCircle className="w-4 h-4" /> {comments.length}
        </button>

        {/* Reaction picker */}
        <div className="relative">
          <button
            onClick={() => setShowReactions(!showReactions)}
            className="px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-secondary rounded-full transition-colors"
          >
            😀 React
          </button>
          <AnimatePresence>
            {showReactions && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                className="absolute bottom-10 left-0 glass-strong rounded-xl p-2 flex gap-1 shadow-xl z-10"
              >
                {REACTION_EMOJIS.map((e) => (
                  <motion.button
                    key={e}
                    whileHover={{ scale: 1.4 }}
                    whileTap={{ scale: 0.8 }}
                    onClick={() => addReaction(e)}
                    className="text-lg p-1 hover:bg-secondary rounded-lg transition-colors"
                  >
                    {e}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button
          onClick={() => { setShared(true); setTimeout(() => setShared(false), 2000); }}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-secondary rounded-full transition-colors"
        >
          <Share2 className="w-4 h-4" /> {shared ? "Shared!" : `${post.shares}`}
        </button>

        <div className="ml-auto">
          <motion.button
            whileTap={{ scale: 1.3 }}
            onClick={() => setSaved(!saved)}
            className={`p-1.5 rounded-full transition-colors ${saved ? "text-warning" : "text-muted-foreground hover:text-warning"}`}
          >
            <Bookmark className="w-4 h-4" fill={saved ? "currentColor" : "none"} />
          </motion.button>
        </div>
      </div>

      {/* Comments */}
      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-border overflow-hidden"
          >
            {/* Comment input */}
            <div className="flex items-center gap-2 p-3 border-b border-border/50">
              <span className="text-lg">{currentUser.avatar}</span>
              <input
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addComment()}
                placeholder="Write a comment..."
                className="flex-1 text-sm bg-secondary/50 rounded-full px-3 py-1.5 outline-none focus:ring-2 focus:ring-primary/30 transition-all text-foreground placeholder:text-muted-foreground"
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={addComment}
                className="p-1.5 rounded-full gradient-primary"
              >
                <Send className="w-3.5 h-3.5 text-primary-foreground" />
              </motion.button>
            </div>

            {/* Comment list */}
            <div className="max-h-80 overflow-y-auto">
              {comments.map((c, i) => (
                <CommentItem key={c.id} comment={c} depth={0} index={i} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function CommentItem({ comment, depth, index }: { comment: Comment; depth: number; index: number }) {
  const [upvotes, setUpvotes] = useState(comment.upvotes);
  const [voted, setVoted] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="border-b border-border/30 last:border-0"
      style={{ paddingLeft: `${depth * 16 + 12}px` }}
    >
      <div className="flex items-start gap-2 py-2 pr-3">
        <span className="text-sm mt-0.5">{comment.author.avatar}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold">{comment.author.name}</span>
            <span className="text-[10px] text-muted-foreground">{comment.timestamp}</span>
          </div>
          <p className="text-xs mt-0.5 text-foreground/90">{comment.content}</p>
          <div className="flex items-center gap-2 mt-1">
            <button
              onClick={() => { setVoted(!voted); setUpvotes((v) => v + (voted ? -1 : 1)); }}
              className={`flex items-center gap-1 text-[10px] ${voted ? "text-upvote" : "text-muted-foreground"} hover:text-upvote transition-colors`}
            >
              <ArrowBigUp className="w-3 h-3" fill={voted ? "currentColor" : "none"} /> {upvotes}
            </button>
            <button className="text-[10px] text-muted-foreground hover:text-foreground transition-colors">Reply</button>
          </div>
        </div>
      </div>
      {comment.replies.map((r, i) => (
        <CommentItem key={r.id} comment={r} depth={depth + 1} index={i} />
      ))}
    </motion.div>
  );
}
