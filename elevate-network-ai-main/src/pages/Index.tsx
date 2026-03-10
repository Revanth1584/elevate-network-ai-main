import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";
import { initialPosts } from "@/data/demoData";
import type { Post } from "@/data/demoData";
import Navbar from "@/components/Navbar";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import CreatePost from "@/components/CreatePost";
import PostCard from "@/components/PostCard";
import ChatBot from "@/components/ChatBot";
import NetworkTab from "@/components/NetworkTab";
import JobsTab from "@/components/JobsTab";
import MessagesTab from "@/components/MessagesTab";
import MailTab from "@/components/MailTab";
import AnalyticsTab from "@/components/AnalyticsTab";
import LearningTab from "@/components/LearningTab";
import MarketplaceTab from "@/components/MarketplaceTab";
import CredentialsTab from "@/components/CredentialsTab";
import MentorshipTab from "@/components/MentorshipTab";
import GamificationWidget from "@/components/GamificationWidget";
import CommandPalette from "@/components/CommandPalette";
import WeeklyChallengeTab from "@/components/WeeklyChallenge";
import AlertsTab from "@/components/AlertsTab";
import SpacesTab from "@/components/SpacesTab";
import GitHubTab from "@/components/GitHubTab";
import ThreadsTab from "@/components/ThreadsTab";
import PremiumTab from "@/components/PremiumTab";
import BookmarksTab from "@/components/BookmarksTab";

export default function Index() {
  const { dark, toggle } = useTheme();
  const [activeTab, setActiveTab] = useState("feed");
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"hot" | "new" | "top">("hot");

  const addPost = (post: Post) => setPosts((p) => [post, ...p]);

  const filteredPosts = useMemo(() => {
    let result = posts;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.content.toLowerCase().includes(q) ||
          p.author.name.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    if (sortBy === "new") return [...result].reverse();
    if (sortBy === "top") return [...result].sort((a, b) => b.upvotes - a.upvotes);
    return result;
  }, [posts, searchQuery, sortBy]);

  const renderTab = () => {
    switch (activeTab) {
      case "mail": return <MailTab />;
      case "network": return <NetworkTab />;
      case "jobs": return <JobsTab />;
      case "messages": return <MessagesTab />;
      case "analytics": return <AnalyticsTab />;
      case "learning": return <LearningTab />;
      case "marketplace": return <MarketplaceTab />;
      case "credentials": return <CredentialsTab />;
      case "mentorship": return <MentorshipTab />;
      case "challenges": return <WeeklyChallengeTab />;
      case "alerts": return <AlertsTab />;
      case "spaces": return <SpacesTab />;
      case "github": return <GitHubTab />;
      case "threads": return <ThreadsTab />;
      case "premium": return <PremiumTab />;
      case "bookmarks": return <BookmarksTab />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar dark={dark} onToggleTheme={toggle} activeTab={activeTab} onTabChange={setActiveTab} onSearch={setSearchQuery} />
      <CommandPalette onNavigate={setActiveTab} />

      <main className="max-w-7xl mx-auto px-4 py-4">
        <AnimatePresence mode="wait">
          {activeTab === "feed" ? (
            <motion.div key="feed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 lg:grid-cols-[260px_1fr_280px] gap-4">
              <aside className="hidden lg:block">
                <div className="sticky top-[72px] space-y-4">
                  <LeftSidebar />
                  <GamificationWidget />
                </div>
              </aside>
              <div className="space-y-4">
                <CreatePost onPost={addPost} />
                <div className="flex items-center gap-1 bg-card rounded-xl border border-border p-1">
                  {(["hot", "new", "top"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setSortBy(s)}
                      className={`flex-1 text-xs py-1.5 rounded-lg font-semibold capitalize transition-all ${
                        sortBy === s ? "gradient-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary"
                      }`}
                    >
                      {s === "hot" ? "🔥 " : s === "new" ? "✨ " : "📈 "}{s}
                    </button>
                  ))}
                </div>
                {filteredPosts.map((post, i) => (
                  <PostCard key={post.id} post={post} index={i} />
                ))}
              </div>
              <aside className="hidden lg:block">
                <div className="sticky top-[72px]">
                  <RightSidebar />
                </div>
              </aside>
            </motion.div>
          ) : (
            <motion.div key={activeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {renderTab()}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <ChatBot />
    </div>
  );
}
