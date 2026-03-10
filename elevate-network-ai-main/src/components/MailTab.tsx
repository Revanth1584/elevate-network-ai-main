import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Star, Trash2, Archive, Send, Inbox, ArrowLeft, Reply, ReplyAll, Forward, Paperclip, Search, MailPlus, X, Clock } from "lucide-react";
import { users } from "@/data/demoData";

interface Email {
  id: string;
  from: { name: string; email: string; avatar: string };
  to: string;
  subject: string;
  body: string;
  timestamp: string;
  read: boolean;
  starred: boolean;
  label: "inbox" | "sent" | "draft" | "important";
  attachments?: string[];
}

const demoEmails: Email[] = [
  {
    id: "e1",
    from: { name: "Ananya Gupta", email: "ananya@google.com", avatar: "🌸" },
    to: "arjun@techmahindra.com",
    subject: "Collaboration on AI Research Paper - NeurIPS 2026",
    body: "Hi Arjun,\n\nI hope this email finds you well! I recently came across your work on distributed systems and I think there's a fascinating intersection with our latest AI research.\n\nWe're working on a paper about efficient inference in edge computing environments, and your expertise in system design would be invaluable.\n\nWould you be interested in collaborating? We could set up a call next week to discuss the details.\n\nThe deadline for submissions is March 30th, so we have some time to work through the research.\n\nLooking forward to hearing from you!\n\nBest regards,\nAnanya Gupta\nAI Research Lead, Google India",
    timestamp: "10:30 AM",
    read: false,
    starred: true,
    label: "inbox",
    attachments: ["research_proposal.pdf", "data_samples.csv"],
  },
  {
    id: "e2",
    from: { name: "Amit Choudhary", email: "amit@innovatetech.in", avatar: "🦅" },
    to: "arjun@techmahindra.com",
    subject: "🚀 Engineering Lead Position - InnovateTech (₹40-60 LPA)",
    body: "Hey Arjun!\n\nCongratulations on your recent achievements! Your profile really stood out to us.\n\nWe just closed our Series A (₹50 Crore) and are scaling our engineering team. I'm personally reaching out because I believe you'd be a perfect fit for our Engineering Lead role.\n\nWhat we offer:\n• ₹40-60 LPA base + ESOPs\n• Remote-first culture\n• Direct impact on product direction\n• Small, elite team of 20 engineers\n• Health insurance for family\n\nWould love to chat over coffee. Are you free this Thursday?\n\nCheers,\nAmit Choudhary\nFounder & CEO, InnovateTech",
    timestamp: "9:15 AM",
    read: false,
    starred: false,
    label: "inbox",
  },
  {
    id: "e3",
    from: { name: "Priya Patel", email: "priya@flipkart.com", avatar: "🦋" },
    to: "arjun@techmahindra.com",
    subject: "Re: Tech Talk at Flipkart HQ - March 2026",
    body: "Hi Arjun,\n\nThank you so much for agreeing to give a tech talk at our Bengaluru office! The team is really excited.\n\nHere are the details:\n📅 Date: March 15, 2026\n🕐 Time: 3:00 PM - 5:00 PM IST\n📍 Venue: Flipkart HQ, Bengaluru\n👥 Expected audience: ~200 engineers\n\nTopic: \"Scaling Microservices: Lessons from Building 10M+ TPS Systems\"\n\nWe'll handle travel and accommodation. Could you share your presentation slides by March 10th?\n\nExcited to have you!\n\nBest,\nPriya Patel\nProduct Manager, Flipkart",
    timestamp: "Yesterday",
    read: true,
    starred: true,
    label: "inbox",
  },
  {
    id: "e4",
    from: { name: "LinkedIn Newsletter", email: "newsletter@linkedin.com", avatar: "💼" },
    to: "arjun@techmahindra.com",
    subject: "Your weekly digest: 15 new job matches, 3 profile views",
    body: "Hi Arjun,\n\nHere's your weekly LinkedIn activity summary:\n\n📈 Profile Views: 342 (up 28% from last week)\n👀 Search Appearances: 89\n📝 Post Impressions: 12,500\n💼 New Job Matches: 15\n🤝 Connection Requests: 8\n\nTop performing post:\n\"Hot take: Most tech interviews are broken\" — 2,341 upvotes\n\nKeep up the great work! Your profile is trending in the top 5% of profiles viewed.\n\nBest,\nThe LinkedIn Team",
    timestamp: "Yesterday",
    read: true,
    starred: false,
    label: "inbox",
  },
  {
    id: "e5",
    from: { name: "Vikram Singh", email: "vikram@razorpay.com", avatar: "🐘" },
    to: "arjun@techmahindra.com",
    subject: "System Design Workshop - Let's co-host!",
    body: "Arjun!\n\nBig fan of your system design content. I've been thinking — what if we co-host a System Design workshop series?\n\nConcept:\n• 4-week intensive workshop\n• Cover: Load Balancing, DB Sharding, Caching, Message Queues\n• Live coding sessions\n• Real-world case studies from Razorpay & Tech Mahindra\n• Charge ₹999/participant, donate to open-source\n\nI think we could easily get 500+ registrations. What do you think?\n\nLet's make it happen! 💪\n\nVikram Singh\nEngineering Lead, Razorpay",
    timestamp: "2 days ago",
    read: true,
    starred: false,
    label: "inbox",
  },
  {
    id: "e6",
    from: { name: "Karthik Nair", email: "karthik@freshworks.com", avatar: "🦁" },
    to: "arjun@techmahindra.com",
    subject: "Quick question about your Kafka setup",
    body: "Hey Arjun,\n\nSaw your post about handling 10M+ transactions/day. Impressive stuff!\n\nWe're setting up a similar event-driven architecture at Freshworks and had a few questions:\n\n1. Which Kafka distribution are you using? Confluent or Apache?\n2. How do you handle schema evolution?\n3. What's your consumer group strategy?\n4. Any issues with consumer lag at peak?\n\nWould really appreciate any pointers. Happy to buy you lunch if you're ever in Chennai! 😄\n\nThanks,\nKarthik",
    timestamp: "3 days ago",
    read: true,
    starred: false,
    label: "inbox",
  },
  {
    id: "e7",
    from: { name: "Revanth Kaushik", email: "arjun@techmahindra.com", avatar: "🦊" },
    to: "team@techmahindra.com",
    subject: "Sprint Retro Notes - Week 10",
    body: "Hi Team,\n\nGreat sprint everyone! Here are the key takeaways:\n\n✅ Completed: 34/38 story points (89%)\n🐛 Bugs fixed: 12\n🚀 Deployed: v2.4.1 to production\n\nWhat went well:\n• Kafka migration completed ahead of schedule\n• Zero downtime deployment\n• Great collaboration between frontend and backend\n\nImprovement areas:\n• Need better test coverage for edge cases\n• Code review turnaround time\n\nAction items for next sprint attached.\n\nGreat work team! 🎉",
    timestamp: "3 days ago",
    read: true,
    starred: false,
    label: "sent",
  },
];

const folders = [
  { id: "inbox", icon: Inbox, label: "Inbox", count: 4 },
  { id: "starred", icon: Star, label: "Starred", count: 2 },
  { id: "sent", icon: Send, label: "Sent", count: 1 },
  { id: "draft", icon: Clock, label: "Drafts", count: 0 },
  { id: "archive", icon: Archive, label: "Archive", count: 0 },
  { id: "trash", icon: Trash2, label: "Trash", count: 0 },
];

export default function MailTab() {
  const [emails, setEmails] = useState(demoEmails);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [activeFolder, setActiveFolder] = useState("inbox");
  const [composing, setComposing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [composeData, setComposeData] = useState({ to: "", subject: "", body: "" });

  const filteredEmails = emails.filter((e) => {
    if (activeFolder === "starred") return e.starred;
    if (activeFolder === "sent") return e.label === "sent";
    if (activeFolder === "inbox") return e.label === "inbox";
    return e.label === activeFolder;
  }).filter((e) =>
    !searchQuery || e.subject.toLowerCase().includes(searchQuery.toLowerCase()) || e.from.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleStar = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEmails((prev) => prev.map((em) => em.id === id ? { ...em, starred: !em.starred } : em));
  };

  const openEmail = (email: Email) => {
    setSelectedEmail(email);
    setEmails((prev) => prev.map((em) => em.id === email.id ? { ...em, read: true } : em));
  };

  const deleteEmail = (id: string) => {
    setEmails((prev) => prev.filter((em) => em.id !== id));
    if (selectedEmail?.id === id) setSelectedEmail(null);
  };

  const sendEmail = () => {
    if (!composeData.to || !composeData.subject) return;
    const newEmail: Email = {
      id: `sent-${Date.now()}`,
      from: { name: "Revanth Kaushik", email: "arjun@techmahindra.com", avatar: "🦊" },
      to: composeData.to,
      subject: composeData.subject,
      body: composeData.body,
      timestamp: "Just now",
      read: true,
      starred: false,
      label: "sent",
    };
    setEmails((prev) => [newEmail, ...prev]);
    setComposeData({ to: "", subject: "", body: "" });
    setComposing(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-xl border border-border overflow-hidden" style={{ height: 560 }}>
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-48 border-r border-border flex flex-col shrink-0 hidden sm:flex">
            <div className="p-3">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setComposing(true)}
                className="w-full flex items-center gap-2 py-2.5 px-4 rounded-xl gradient-primary text-primary-foreground text-xs font-semibold shadow-md"
              >
                <MailPlus className="w-4 h-4" /> Compose
              </motion.button>
            </div>
            <div className="flex-1 px-2 space-y-0.5">
              {folders.map((f) => (
                <button
                  key={f.id}
                  onClick={() => { setActiveFolder(f.id); setSelectedEmail(null); }}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-all ${
                    activeFolder === f.id ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  <f.icon className="w-3.5 h-3.5" />
                  <span className="flex-1 text-left">{f.label}</span>
                  {f.count > 0 && <span className="text-[10px] bg-primary/20 text-primary px-1.5 rounded-full">{f.count}</span>}
                </button>
              ))}
            </div>
            <div className="p-3 border-t border-border">
              <p className="text-[10px] text-muted-foreground">Storage: 2.4 GB / 15 GB</p>
              <div className="w-full h-1.5 bg-secondary rounded-full mt-1 overflow-hidden">
                <div className="h-full gradient-primary rounded-full" style={{ width: "16%" }} />
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 flex flex-col min-w-0">
            <AnimatePresence mode="wait">
              {!selectedEmail ? (
                <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col h-full">
                  {/* Header */}
                  <div className="p-3 border-b border-border flex items-center gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                      <input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search emails..."
                        className="w-full pl-8 pr-3 py-1.5 text-xs bg-secondary rounded-full outline-none text-foreground placeholder:text-muted-foreground"
                      />
                    </div>
                    <button onClick={() => setComposing(true)} className="sm:hidden p-2 rounded-full gradient-primary">
                      <MailPlus className="w-3.5 h-3.5 text-primary-foreground" />
                    </button>
                  </div>

                  {/* Mobile folder tabs */}
                  <div className="sm:hidden flex gap-1 p-2 overflow-x-auto border-b border-border">
                    {folders.slice(0, 4).map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setActiveFolder(f.id)}
                        className={`text-[10px] px-2.5 py-1 rounded-full whitespace-nowrap ${
                          activeFolder === f.id ? "gradient-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>

                  {/* Email list */}
                  <div className="flex-1 overflow-y-auto">
                    {filteredEmails.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                        <Mail className="w-10 h-10 mb-2 opacity-30" />
                        <p className="text-xs">No emails here</p>
                      </div>
                    ) : (
                      filteredEmails.map((email, i) => (
                        <motion.div
                          key={email.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.04 }}
                          onClick={() => openEmail(email)}
                          className={`flex items-center gap-3 px-4 py-3 border-b border-border/50 cursor-pointer transition-colors hover:bg-secondary/50 ${
                            !email.read ? "bg-primary/5 font-semibold" : ""
                          }`}
                        >
                          <span className="text-lg shrink-0">{email.from.avatar}</span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <p className={`text-xs truncate ${!email.read ? "font-bold" : ""}`}>{email.from.name}</p>
                              <p className="text-[10px] text-muted-foreground shrink-0">{email.timestamp}</p>
                            </div>
                            <p className={`text-xs truncate ${!email.read ? "font-semibold" : "text-foreground"}`}>{email.subject}</p>
                            <p className="text-[10px] text-muted-foreground truncate">{email.body.slice(0, 80)}...</p>
                          </div>
                          <div className="flex items-center gap-1 shrink-0">
                            {email.attachments && <Paperclip className="w-3 h-3 text-muted-foreground" />}
                            <motion.button
                              whileTap={{ scale: 1.4 }}
                              onClick={(e) => toggleStar(email.id, e)}
                              className={email.starred ? "text-warning" : "text-muted-foreground/40 hover:text-warning"}
                            >
                              <Star className="w-3.5 h-3.5" fill={email.starred ? "currentColor" : "none"} />
                            </motion.button>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div key="detail" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="flex flex-col h-full">
                  {/* Email header */}
                  <div className="flex items-center gap-2 p-3 border-b border-border">
                    <button onClick={() => setSelectedEmail(null)} className="p-1 rounded-full hover:bg-secondary transition-colors">
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <div className="flex-1" />
                    <motion.button whileTap={{ scale: 1.2 }} onClick={(e) => toggleStar(selectedEmail.id, e)} className={selectedEmail.starred ? "text-warning" : "text-muted-foreground hover:text-warning"}>
                      <Star className="w-4 h-4" fill={selectedEmail.starred ? "currentColor" : "none"} />
                    </motion.button>
                    <button onClick={() => deleteEmail(selectedEmail.id)} className="p-1 rounded-full hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button className="p-1 rounded-full hover:bg-secondary text-muted-foreground transition-colors">
                      <Archive className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Email content */}
                  <div className="flex-1 overflow-y-auto p-4">
                    <h3 className="font-display font-bold text-base mb-3">{selectedEmail.subject}</h3>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl">{selectedEmail.from.avatar}</span>
                      <div>
                        <p className="text-sm font-semibold">{selectedEmail.from.name}</p>
                        <p className="text-[10px] text-muted-foreground">{selectedEmail.from.email} · {selectedEmail.timestamp}</p>
                        <p className="text-[10px] text-muted-foreground">To: {selectedEmail.to}</p>
                      </div>
                    </div>
                    <div className="text-xs leading-relaxed whitespace-pre-line text-foreground/90">
                      {selectedEmail.body}
                    </div>
                    {selectedEmail.attachments && (
                      <div className="mt-4 space-y-1.5">
                        <p className="text-[10px] text-muted-foreground font-semibold flex items-center gap-1"><Paperclip className="w-3 h-3" /> Attachments</p>
                        {selectedEmail.attachments.map((a) => (
                          <div key={a} className="inline-flex items-center gap-1.5 text-[10px] bg-secondary px-2.5 py-1.5 rounded-lg mr-2 cursor-pointer hover:bg-secondary/80 transition-colors">
                            📎 {a}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Reply bar */}
                  <div className="flex items-center gap-2 p-3 border-t border-border">
                    <motion.button whileHover={{ scale: 1.05 }} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs gradient-primary text-primary-foreground font-semibold">
                      <Reply className="w-3.5 h-3.5" /> Reply
                    </motion.button>
                    <button className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors">
                      <ReplyAll className="w-3.5 h-3.5" /> Reply All
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors">
                      <Forward className="w-3.5 h-3.5" /> Forward
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Compose Modal */}
      <AnimatePresence>
        {composing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-foreground/30 backdrop-blur-sm p-4"
            onClick={() => setComposing(false)}
          >
            <motion.div
              initial={{ y: 40, scale: 0.95, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 40, scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card rounded-xl border border-border w-full max-w-lg shadow-2xl"
            >
              <div className="flex items-center justify-between p-3 border-b border-border gradient-primary rounded-t-xl">
                <h4 className="font-display font-semibold text-sm text-primary-foreground">New Message</h4>
                <button onClick={() => setComposing(false)} className="p-1 rounded-full hover:bg-primary-foreground/20 transition-colors">
                  <X className="w-4 h-4 text-primary-foreground" />
                </button>
              </div>
              <div className="p-3 space-y-2">
                <input
                  value={composeData.to}
                  onChange={(e) => setComposeData((d) => ({ ...d, to: e.target.value }))}
                  placeholder="To"
                  className="w-full text-xs bg-transparent border-b border-border py-2 outline-none text-foreground placeholder:text-muted-foreground"
                />
                <input
                  value={composeData.subject}
                  onChange={(e) => setComposeData((d) => ({ ...d, subject: e.target.value }))}
                  placeholder="Subject"
                  className="w-full text-xs bg-transparent border-b border-border py-2 outline-none text-foreground placeholder:text-muted-foreground"
                />
                <textarea
                  value={composeData.body}
                  onChange={(e) => setComposeData((d) => ({ ...d, body: e.target.value }))}
                  placeholder="Write your message..."
                  rows={8}
                  className="w-full text-xs bg-transparent outline-none resize-none text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <div className="flex items-center justify-between p-3 border-t border-border">
                <div className="flex gap-2">
                  <button className="p-1.5 rounded-full hover:bg-secondary text-muted-foreground transition-colors">
                    <Paperclip className="w-4 h-4" />
                  </button>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={sendEmail}
                  className="flex items-center gap-2 px-5 py-2 rounded-full gradient-primary text-primary-foreground text-xs font-semibold"
                >
                  <Send className="w-3.5 h-3.5" /> Send
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
