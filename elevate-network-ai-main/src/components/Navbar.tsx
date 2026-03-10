import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Home, Users, Briefcase, MessageSquare, Bell, Moon, Sun, Menu, X, Zap, Mail,
  BarChart3, BookOpen, ShoppingBag, Shield, Heart, Command, Trophy, Github, MessageCircle, Crown, Bookmark,
} from "lucide-react";
import { currentUser, notifications as demoNotifications } from "@/data/demoData";

interface NavbarProps {
  dark: boolean;
  onToggleTheme: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onSearch: (q: string) => void;
}

const primaryNavItems = [
  { id: "feed", icon: Home, label: "Feed" },
  { id: "network", icon: Users, label: "Network" },
  { id: "jobs", icon: Briefcase, label: "Jobs" },
  { id: "messages", icon: MessageSquare, label: "Chat" },
  { id: "bookmarks", icon: Bookmark, label: "Saved" },
  { id: "learning", icon: BookOpen, label: "Learn" },
];

const secondaryNavItems = [
  { id: "mail", icon: Mail, label: "Mail" },
  { id: "analytics", icon: BarChart3, label: "Analytics" },
  { id: "marketplace", icon: ShoppingBag, label: "Gigs" },
  { id: "credentials", icon: Shield, label: "Verify" },
  { id: "mentorship", icon: Heart, label: "Mentors" },
  { id: "challenges", icon: Trophy, label: "Challenges" },
  { id: "spaces", icon: Users, label: "Spaces" },
  { id: "github", icon: Github, label: "GitHub" },
  { id: "threads", icon: MessageCircle, label: "Threads" },
  { id: "premium", icon: Crown, label: "Premium" },
];

export default function Navbar({ dark, onToggleTheme, activeTab, onTabChange, onSearch }: NavbarProps) {
  const [search, setSearch] = useState("");
  const [showNotif, setShowNotif] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const unread = demoNotifications.filter((n) => !n.read).length;

  return (
    <nav className="sticky top-0 z-50 glass-strong shadow-sm">
      <div className="max-w-full mx-auto px-3 md:px-4 flex items-center justify-between h-16 md:h-14 gap-2 md:gap-3">
        {/* Logo */}
        <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
          <motion.div
            whileHover={{ rotate: 10, scale: 1.1 }}
            className="gradient-primary rounded-lg p-1.5 cursor-pointer"
          >
            <Zap className="w-4 md:w-5 h-4 md:h-5 text-primary-foreground" />
          </motion.div>
          <span className="font-display font-bold text-base md:text-lg hidden sm:block whitespace-nowrap">
            Linked<span className="gradient-text">In</span>
          </span>
        </div>

        {/* Search - with ⌘K hint - Hidden on small screens */}
        <div className="relative hidden lg:block w-48 xl:w-56 flex-shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); onSearch(e.target.value); }}
            placeholder="Search... ⌘K"
            className="w-full pl-9 pr-3 py-1.5 rounded-full bg-secondary text-sm border-none outline-none focus:ring-2 focus:ring-primary/40 transition-all text-foreground placeholder:text-muted-foreground"
          />
        </div>

        {/* Primary Nav Items - Main Features */}
        <div className="hidden md:flex items-center gap-0 xl:gap-1 flex-1 overflow-hidden">
          {primaryNavItems.map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center px-1.5 md:px-2 lg:px-3 py-1 rounded-lg text-[10px] md:text-[11px] transition-colors shrink-0 hover:bg-secondary/50 ${
                activeTab === item.id
                  ? "text-primary font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span className="whitespace-nowrap">{item.label}</span>
              {activeTab === item.id && (
                <motion.div layoutId="nav-underline" className="h-0.5 w-full gradient-primary rounded-full mt-0.5" />
              )}
            </motion.button>
          ))}
        </div>

        {/* Right side - Secondary Features */}
        <div className="flex items-center gap-0.5 md:gap-1 flex-shrink-0">
          {/* Secondary Nav Items - Icons only on desktop, visible on lg+ */}
          <div className="hidden xl:flex items-center gap-0.5">
            {secondaryNavItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onTabChange(item.id)}
                className={`flex items-center justify-center px-2 py-1.5 rounded-lg text-[10px] transition-colors shrink-0 hover:bg-secondary/50 ${
                  activeTab === item.id
                    ? "text-primary font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                title={item.label}
              >
                <item.icon className="w-4 h-4" />
              </motion.button>
            ))}
          </div>

          {/* Notifications Bell */}
          <div className="relative shrink-0">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowNotif(!showNotif)}
              className="flex items-center justify-center px-2 py-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors shrink-0"
              title="Alerts"
            >
              <Bell className="w-4 h-4" />
              {unread > 0 && (
                <span className="absolute -top-1 -right-0.5 w-4 h-4 rounded-full gradient-accent text-[10px] flex items-center justify-center text-accent-foreground font-bold animate-pulse-glow">
                  {unread}
                </span>
              )}
            </motion.button>

            <AnimatePresence>
              {showNotif && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="absolute right-0 top-12 w-80 glass-strong rounded-xl shadow-xl overflow-hidden"
                >
                  <div className="p-3 border-b border-border font-display font-semibold text-sm">Notifications</div>
                  {demoNotifications.map((n) => (
                    <div
                      key={n.id}
                      className={`flex items-start gap-3 p-3 hover:bg-secondary/60 transition-colors cursor-pointer ${
                        !n.read ? "bg-primary/5" : ""
                      }`}
                    >
                      <span className="text-xl">{n.avatar}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs">{n.content}</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{n.timestamp}</p>
                      </div>
                      {!n.read && <div className="w-2 h-2 rounded-full gradient-primary mt-1" />}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Theme Toggle */}
          <motion.button
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.3 }}
            onClick={onToggleTheme}
            className="p-1.5 md:p-2 rounded-full hover:bg-secondary transition-colors shrink-0"
            title={dark ? "Light mode" : "Dark mode"}
          >
            {dark ? <Sun className="w-4 h-4 text-warning" /> : <Moon className="w-4 h-4 text-muted-foreground" />}
          </motion.button>

          {/* User Avatar */}
          <motion.div 
            whileHover={{ scale: 1.1 }} 
            className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-sm cursor-pointer shrink-0"
            title="Profile"
          >
            {currentUser.avatar}
          </motion.div>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden p-1.5 shrink-0">
            {mobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-border"
          >
            <div className="p-3 space-y-1">
              <div className="relative mb-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); onSearch(e.target.value); }}
                  placeholder="Search..."
                  className="w-full pl-9 pr-3 py-2 rounded-full bg-secondary text-sm border-none outline-none text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <div className="text-xs font-semibold text-muted-foreground px-3 py-2">Main</div>
              {primaryNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { onTabChange(item.id); setMobileMenu(false); }}
                  className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeTab === item.id ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
              <div className="text-xs font-semibold text-muted-foreground px-3 py-2 mt-2">More</div>
              {secondaryNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { onTabChange(item.id); setMobileMenu(false); }}
                  className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeTab === item.id ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
