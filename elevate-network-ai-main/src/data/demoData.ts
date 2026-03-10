export interface User {
  id: string;
  name: string;
  avatar: string;
  title: string;
  company: string;
  location: string;
  connections: number;
  followers: number;
  karma: number;
  verified: boolean;
}

export interface Post {
  id: string;
  author: User;
  content: string;
  image?: string;
  timestamp: string;
  upvotes: number;
  downvotes: number;
  comments: Comment[];
  reactions: Record<string, number>;
  shares: number;
  tags: string[];
  subreddit?: string;
  pinned?: boolean;
}

export interface Comment {
  id: string;
  author: User;
  content: string;
  timestamp: string;
  upvotes: number;
  replies: Comment[];
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  posted: string;
  applicants: number;
  logo: string;
  tags: string[];
}

export interface TrendingTopic {
  id: string;
  tag: string;
  posts: number;
  category: string;
  trending: boolean;
}

export interface Message {
  id: string;
  from: User;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'connection' | 'mention' | 'job' | 'challenge' | 'milestone' | 'mention' | 'collaboration';
  content: string;
  timestamp: string;
  read: boolean;
  avatar: string;
}

export interface WeeklyChallenge {
  id: string;
  title: string;
  description: string;
  emoji: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  startDate: string;
  endDate: string;
  participants: number;
  prize: string;
  icon: string;
}

export interface Space {
  id: string;
  name: string;
  description: string;
  creator: User;
  members: number;
  posts: number;
  private: boolean;
  avatar: string;
  category: string;
  followers: number;
}

export interface Thread {
  id: string;
  author: User;
  content: string;
  replies: number;
  reposts: number;
  likes: number;
  shares: number;
  timestamp: string;
  depth: number;
}

export interface Repository {
  id: string;
  name: string;
  owner: User;
  description: string;
  stars: number;
  forks: number;
  language: string;
  url: string;
  trending: boolean;
}

export interface Bookmark {
  id: string;
  postId: string;
  userId: string;
  savedAt: string;
  folder: string;
}

export const currentUser: User = {
  id: "u0",
  name: "Revanth Kaushik",
  avatar: "🦊",
  title: "Full Stack Developer",
  company: "Tech Mahindra",
  location: "Bengaluru, India",
  connections: 842,
  followers: 1247,
  karma: 15420,
  verified: true,
};

export const users: User[] = [
  { id: "u1", name: "Priya Patel", avatar: "🦋", title: "Product Manager", company: "Flipkart", location: "Mumbai, India", connections: 1200, followers: 3400, karma: 22100, verified: true },
  { id: "u2", name: "Rahul Verma", avatar: "🐯", title: "Data Scientist", company: "Infosys", location: "Hyderabad, India", connections: 890, followers: 2100, karma: 18300, verified: false },
  { id: "u3", name: "Sneha Reddy", avatar: "🦚", title: "UX Designer", company: "Zoho", location: "Chennai, India", connections: 650, followers: 1800, karma: 12500, verified: true },
  { id: "u4", name: "Vikram Singh", avatar: "🐘", title: "Engineering Lead", company: "Razorpay", location: "Bengaluru, India", connections: 1500, followers: 5200, karma: 31200, verified: true },
  { id: "u5", name: "Ananya Gupta", avatar: "🌸", title: "AI Researcher", company: "Google India", location: "Gurugram, India", connections: 2100, followers: 8900, karma: 45600, verified: true },
  { id: "u6", name: "Karthik Nair", avatar: "🦁", title: "DevOps Engineer", company: "Freshworks", location: "Chennai, India", connections: 780, followers: 1600, karma: 9800, verified: false },
  { id: "u7", name: "Meera Joshi", avatar: "🐬", title: "Marketing Head", company: "Swiggy", location: "Bengaluru, India", connections: 1300, followers: 4100, karma: 27800, verified: true },
  { id: "u8", name: "Amit Choudhary", avatar: "🦅", title: "Startup Founder", company: "InnovateTech", location: "Delhi, India", connections: 3200, followers: 12000, karma: 56700, verified: true },
];

export const initialPosts: Post[] = [
  {
    id: "p1",
    author: users[4],
    content: "🚀 Just published my research paper on Large Language Models at NeurIPS 2026! The key finding: smaller, domain-specific models can outperform general-purpose LLMs by 40% on specialized tasks. This changes everything for enterprise AI adoption.\n\nThe future isn't about bigger models — it's about smarter ones. 🧠\n\n#AI #MachineLearning #Research #NeurIPS",
    timestamp: "2h ago",
    upvotes: 847,
    downvotes: 12,
    comments: [
      { id: "c1", author: users[1], content: "This is groundbreaking! We've been exploring this at Flipkart for our recommendation engine. Would love to collaborate! 🔥", timestamp: "1h ago", upvotes: 124, replies: [
        { id: "c1r1", author: users[4], content: "Absolutely! Let's connect. I'll DM you the pre-print.", timestamp: "45min ago", upvotes: 56, replies: [] }
      ]},
      { id: "c2", author: users[3], content: "The efficiency gains are incredible. We're already seeing this trend at Razorpay with our fraud detection models.", timestamp: "1h ago", upvotes: 89, replies: [] },
    ],
    reactions: { "🔥": 234, "💡": 156, "👏": 312, "🚀": 89 },
    shares: 234,
    tags: ["AI", "Research", "MachineLearning"],
    subreddit: "r/MachineLearning",
    pinned: true,
  },
  {
    id: "p2",
    author: users[7],
    content: "After 3 years of bootstrapping, InnovateTech just raised ₹50 Crore Series A! 🎉\n\nLesson learned: Your first 100 users matter more than your first 100 investors.\n\nWe built for our users, not for headlines. The funding followed.\n\nHiring across all roles — DM me if you want to be part of India's next big tech story! 💪",
    timestamp: "4h ago",
    upvotes: 1523,
    downvotes: 8,
    comments: [
      { id: "c3", author: users[6], content: "Congratulations Amit! 🎊 This is so well deserved. Your persistence is truly inspiring!", timestamp: "3h ago", upvotes: 201, replies: [] },
      { id: "c4", author: users[0], content: "Amazing milestone! Would love to learn about your tech stack. 🙏", timestamp: "2h ago", upvotes: 67, replies: [] },
    ],
    reactions: { "🎉": 456, "💪": 234, "🔥": 178, "❤️": 321 },
    shares: 456,
    tags: ["Startup", "Funding", "India"],
    subreddit: "r/IndianStartups",
  },
  {
    id: "p3",
    author: users[2],
    content: "Hot take: Most tech interviews are broken. 🔥\n\nWe spend months practicing LeetCode when the actual job requires:\n→ Reading legacy code\n→ Communicating with stakeholders\n→ Debugging production issues at 2 AM\n→ Writing documentation nobody reads\n\nCompanies: Please test for what people will ACTUALLY do. 💯\n\nAgree or disagree? Drop your thoughts below 👇",
    timestamp: "6h ago",
    upvotes: 2341,
    downvotes: 156,
    comments: [
      { id: "c5", author: users[5], content: "Couldn't agree more! I've seen brilliant engineers fail coding interviews but absolutely crush it on the job.", timestamp: "5h ago", upvotes: 456, replies: [
        { id: "c5r1", author: users[1], content: "Same here! At Flipkart we shifted to take-home projects and the quality of hires improved dramatically.", timestamp: "4h ago", upvotes: 234, replies: [] }
      ]},
    ],
    reactions: { "💯": 567, "🔥": 345, "💡": 123, "😤": 89 },
    shares: 789,
    tags: ["TechHiring", "Interviews", "HotTake"],
    subreddit: "r/cscareerquestions",
  },
  {
    id: "p4",
    author: users[3],
    content: "We just shipped a feature that handles 10M+ transactions/day with 99.99% uptime! 🎯\n\nOur secret sauce:\n1. Event-driven architecture with Kafka\n2. Circuit breakers for graceful degradation\n3. Blue-green deployments\n4. Chaos engineering in staging\n\nScaling isn't magic — it's discipline. Thread below 🧵",
    timestamp: "8h ago",
    upvotes: 678,
    downvotes: 5,
    comments: [
      { id: "c6", author: users[5], content: "This is gold! Can you share more about your Kafka setup? We're planning something similar at Freshworks.", timestamp: "7h ago", upvotes: 89, replies: [] },
    ],
    reactions: { "🔥": 234, "💡": 178, "👏": 145, "🧵": 67 },
    shares: 123,
    tags: ["SystemDesign", "Engineering", "Scale"],
    subreddit: "r/programming",
  },
  {
    id: "p5",
    author: users[6],
    content: "Marketing truth bomb 💣:\n\nYour product doesn't need more features.\nIt needs better storytelling.\n\nThe best products I've seen fail had amazing tech but terrible positioning.\n\nThe mediocre products that won? They nailed their narrative.\n\nStory > Specs. Every. Single. Time. 📖✨",
    timestamp: "12h ago",
    upvotes: 1890,
    downvotes: 45,
    comments: [
      { id: "c7", author: users[7], content: "100%! We rewrote our entire website copy and conversions jumped 3x. The product didn't change at all.", timestamp: "11h ago", upvotes: 345, replies: [] },
    ],
    reactions: { "💯": 890, "🔥": 456, "💡": 234, "👏": 567 },
    shares: 567,
    tags: ["Marketing", "Storytelling", "Growth"],
    subreddit: "r/marketing",
  },
];

export const trendingTopics: TrendingTopic[] = [
  { id: "t1", tag: "#AIRevolution", posts: 12500, category: "Technology", trending: true },
  { id: "t2", tag: "#StartupIndia", posts: 8900, category: "Business", trending: true },
  { id: "t3", tag: "#RemoteWork2026", posts: 6700, category: "Work Culture", trending: true },
  { id: "t4", tag: "#SystemDesign", posts: 4500, category: "Engineering", trending: true },
  { id: "t5", tag: "#WomenInTech", posts: 5600, category: "Community", trending: true },
  { id: "t6", tag: "#CryptoIndia", posts: 3200, category: "Finance", trending: false },
  { id: "t7", tag: "#ProductHunt", posts: 2800, category: "Product", trending: true },
  { id: "t8", tag: "#TechLayoffs", posts: 7800, category: "Industry", trending: true },
];

export const jobs: Job[] = [
  { id: "j1", title: "Senior React Developer", company: "Flipkart", location: "Bengaluru", salary: "₹25-40 LPA", type: "Full-time", posted: "2h ago", applicants: 156, logo: "🛒", tags: ["React", "TypeScript", "Node.js"] },
  { id: "j2", title: "ML Engineer", company: "Google India", location: "Hyderabad", salary: "₹45-70 LPA", type: "Full-time", posted: "5h ago", applicants: 342, logo: "🔍", tags: ["Python", "TensorFlow", "MLOps"] },
  { id: "j3", title: "Product Designer", company: "Razorpay", location: "Bengaluru", salary: "₹18-30 LPA", type: "Full-time", posted: "1d ago", applicants: 89, logo: "💳", tags: ["Figma", "UX Research", "Design Systems"] },
  { id: "j4", title: "DevOps Lead", company: "Swiggy", location: "Remote", salary: "₹30-50 LPA", type: "Remote", posted: "3h ago", applicants: 67, logo: "🍔", tags: ["AWS", "Kubernetes", "Terraform"] },
  { id: "j5", title: "Data Analyst", company: "Zomato", location: "Gurugram", salary: "₹12-20 LPA", type: "Hybrid", posted: "6h ago", applicants: 234, logo: "🍕", tags: ["SQL", "Python", "Tableau"] },
];

export const messages: Message[] = [
  { id: "m1", from: users[4], content: "Hey! Loved your latest post on system design. Want to collaborate on a tech talk?", timestamp: "10min ago", read: false },
  { id: "m2", from: users[7], content: "We're hiring! Thought of you for our engineering lead role. Interested?", timestamp: "1h ago", read: false },
  { id: "m3", from: users[1], content: "Thanks for connecting! Let's grab coffee when you're in Mumbai next 😊", timestamp: "3h ago", read: true },
  { id: "m4", from: users[6], content: "Your article on growth hacking was brilliant. Can I feature it in our newsletter?", timestamp: "1d ago", read: true },
];

export const notifications: Notification[] = [
  { id: "n1", type: "like", content: "Priya Patel and 234 others liked your post", timestamp: "5min ago", read: false, avatar: "🦋" },
  { id: "n2", type: "comment", content: "Vikram Singh commented on your post", timestamp: "15min ago", read: false, avatar: "🐘" },
  { id: "n3", type: "connection", content: "Ananya Gupta wants to connect", timestamp: "1h ago", read: false, avatar: "🌸" },
  { id: "n4", type: "mention", content: "Amit Choudhary mentioned you in a post", timestamp: "2h ago", read: true, avatar: "🦅" },
  { id: "n5", type: "job", content: "New job matching your profile: Senior Developer at Flipkart", timestamp: "3h ago", read: true, avatar: "🛒" },
];

export const chatbotResponses: Record<string, string> = {
  default: "I'm LinkedIn ProBot! 🤖 I can help with career advice, resume tips, interview prep, networking strategies, and more. What would you like to know?",
  career: "Great question about career growth! 📈 Here are my top tips:\n\n1. **Build in public** — share your work\n2. **Network intentionally** — quality over quantity\n3. **Upskill constantly** — tech evolves fast\n4. **Find mentors** — accelerate your learning\n5. **Take calculated risks** — comfort zones limit growth",
  resume: "For a standout resume in 2026: 🎯\n\n• **Quantify everything** — \"Improved performance by 40%\"\n• **Use action verbs** — Led, Built, Shipped, Scaled\n• **Keep it to 1 page** for < 10 years experience\n• **Add a skills section** with relevant tech\n• **Include GitHub/Portfolio** links\n• **Tailor for each role** — ATS keywords matter!",
  interview: "Interview prep strategy 🎯:\n\n1. **System Design** — Practice with real scenarios\n2. **Behavioral (STAR method)** — Prepare 5-6 stories\n3. **DSA** — Focus on patterns, not memorization\n4. **Company Research** — Know their products & culture\n5. **Ask great questions** — Shows genuine interest\n\nPro tip: Mock interviews with peers are 10x more effective than solo prep!",
  salary: "Salary negotiation tips 💰:\n\n• **Research market rates** on Glassdoor, Levels.fyi\n• **Never share current salary first**\n• **Negotiate total comp** — base + equity + benefits\n• **Have competing offers** when possible\n• **Be confident but respectful**\n• Indian market ranges vary widely by city and company tier",
  networking: "Networking like a pro 🤝:\n\n• **Give before you ask** — share knowledge freely\n• **Engage genuinely** — comment thoughtfully on posts\n• **Attend tech meetups** — BangaloreJS, PyCon India, etc.\n• **Build your personal brand** — consistent posting helps\n• **Follow up** — a simple thank-you goes a long way",
  skills: "Top skills to learn in 2026 🔥:\n\n**Tech:**\n• AI/ML & Prompt Engineering\n• Rust & Go for systems\n• Cloud-native architecture\n• Cybersecurity fundamentals\n\n**Non-Tech:**\n• Technical writing\n• Public speaking\n• Product thinking\n• Cross-cultural communication",
  hello: "Hey there! 👋 Welcome to LinkedIn ProBot!\n\nI'm your AI career companion. I can help with:\n🎯 Career advice\n📝 Resume tips\n🎤 Interview prep\n💰 Salary negotiation\n🤝 Networking strategies\n🔥 Trending skills\n\nJust ask me anything!",
  thanks: "You're welcome! 😊 Remember, your career is a marathon, not a sprint. Keep learning, keep connecting, and keep building. You've got this! 💪🚀",
  startup: "Thinking of starting up? 🚀\n\n• **Validate first** — talk to 100 potential users\n• **Start small** — MVP over perfection\n• **Indian ecosystem is booming** — great time to start\n• **Bootstrap if possible** — keeps you focused\n• **Build a co-founding team** — complementary skills\n• **Apply to accelerators** — Y Combinator, Antler India",
};

// Weekly Challenges
export const weeklyChallenges: WeeklyChallenge[] = [
  { id: "wc1", title: "Build in Public Challenge", description: "Share your daily progress on a project. Minimum 1 post per day.", emoji: "🚀", difficulty: "Easy", category: "Building", startDate: "Mar 10", endDate: "Mar 16", participants: 1247, prize: "₹10,000 + Featured", icon: "📱" },
  { id: "wc2", title: "System Design Masterclass", description: "Design a system for 1M users. Deep dive required.", emoji: "🎯", difficulty: "Hard", category: "Learning", startDate: "Mar 10", endDate: "Mar 17", participants: 523, prize: "₹25,000 + Mentorship", icon: "🏗️" },
  { id: "wc3", title: "Open Source Contributor", description: "Contribute to 3 legitimate open source projects.", emoji: "🔧", difficulty: "Medium", category: "Contributing", startDate: "Mar 10", endDate: "Mar 24", participants: 789, prize: "GitHub Pro + Featured", icon: "💻" },
  { id: "wc4", title: "Content Creator Sprint", description: "Write 5 technical articles. Video or written content counts.", emoji: "📝", difficulty: "Medium", category: "Content", startDate: "Mar 17", endDate: "Mar 23", participants: 645, prize: "₹15,000 + Promotion", icon: "✍️" },
  { id: "wc5", title: "Networking 100", description: "Connect with 100 genuine professionals + meaningful conversations.", emoji: "🤝", difficulty: "Easy", category: "Networking", startDate: "Mar 10", endDate: "Mar 31", participants: 2100, prize: "VIP Badge + Networking Pass", icon: "👥" },
  { id: "wc6", title: "AI/ML Project Launch", description: "Build and deploy an AI/ML project. Deploy it live.", emoji: "🤖", difficulty: "Hard", category: "AI/ML", startDate: "Mar 17", endDate: "Mar 31", participants: 432, prize: "₹50,000 + VC Intro", icon: "🧠" },
];

// Spaces (Notion-like communities)
export const spaces: Space[] = [
  { id: "sp1", name: "Indian Tech Founders", description: "India's most active founder community. Daily updates, advice, fundraising helps.", creator: users[7], members: 3200, posts: 458, private: false, avatar: "🚀", category: "Startups", followers: 4500 },
  { id: "sp2", name: "System Design Deep Dives", description: "In-depth system design discussions. Real-world problems from top companies.", creator: users[3], members: 2100, posts: 320, private: false, avatar: "🏗️", category: "Engineering", followers: 3200 },
  { id: "sp3", name: "Women in AI/ML", description: "Supporting women in artificial intelligence. Share resources, opportunities, stories.", creator: users[4], members: 1800, posts: 245, private: false, avatar: "👩‍💻", category: "Community", followers: 2800 },
  { id: "sp4", name: "Dev Tools Showcase", description: "New developer tools, libraries, and frameworks. Early access to amazing tools.", creator: users[0], members: 2500, posts: 389, private: false, avatar: "🛠️", category: "Tools", followers: 3800 },
  { id: "sp5", name: "Growth Hacking Lab", description: "Practical growth strategies. Case studies, metrics, and real experiments.", creator: users[6], members: 1950, posts: 267, private: false, avatar: "📈", category: "Growth", followers: 3100 },
  { id: "sp6", name: "Security & Cybersecurity", description: "Latest in security, vulnerability discussions, best practices.", creator: users[5], members: 1200, posts: 156, private: false, avatar: "🔐", category: "Security", followers: 1900 },
];

// Threads (Twitter-like short conversations)
export const threads: Thread[] = [
  { id: "th1", author: users[4], content: "Just realized something: The best DevOps engineers aren't the ones with the most tools. They're the ones who know why each tool exists.", replies: 234, reposts: 456, likes: 1234, shares: 89, timestamp: "2h ago", depth: 4 },
  { id: "th2", author: users[7], content: "Spending money on courses is pointless if you don't build something with what you learn. Building > Consuming. Always.", replies: 567, reposts: 789, likes: 2100, shares: 234, timestamp: "4h ago", depth: 6 },
  { id: "th3", author: users[3], content: "A reminder: Your codebase is a reflection of your communication skills. Bad code = poor documentation", replies: 345, reposts: 234, likes: 987, shares: 145, timestamp: "6h ago", depth: 3 },
  { id: "th4", author: users[1], content: "The future of product management is thinking like a hacker. Your PM should understand tradeoffs deeply.", replies: 456, reposts: 567, likes: 1456, shares: 178, timestamp: "8h ago", depth: 5 },
];

// GitHub Repositories
export const repositories: Repository[] = [
  { id: "r1", name: "LightningDB", owner: users[3], description: "Ultra-fast in-memory database written in Rust. 10x faster than Redis.", stars: 45230, forks: 3200, language: "Rust", url: "github.com/user/lightningdb", trending: true },
  { id: "r2", name: "NeuralFlow", owner: users[4], description: "Simplified neural network framework for India compute constraints.", stars: 23100, forks: 1800, language: "Python", url: "github.com/user/neuralflow", trending: true },
  { id: "r3", name: "SecurityShield", owner: users[5], description: "Open source security vulnerability scanner for cloud infrastructure.", stars: 15400, forks: 890, language: "Go", url: "github.com/user/securityshield", trending: true },
  { id: "r4", name: "WebTurbo", owner: users[2], description: "Next-gen frontend framework combining React + Rust performance.", stars: 34200, forks: 2100, language: "TypeScript", url: "github.com/user/webturbo", trending: false },
  { id: "r5", name: "DataVault", owner: users[6], description: "Anonymous data analytics platform respecting user privacy.", stars: 19800, forks: 1200, language: "Python", url: "github.com/user/datavault", trending: true },
];

// Collections/Bookmarks
export const bookmarks: Bookmark[] = [
  { id: "b1", postId: "p1", userId: "u0", savedAt: "Today", folder: "Research" },
  { id: "b2", postId: "p2", userId: "u0", savedAt: "Yesterday", folder: "Inspiration" },
  { id: "b3", postId: "p4", userId: "u0", savedAt: "2d ago", folder: "System Design" },
  { id: "b4", postId: "p5", userId: "u0", savedAt: "1w ago", folder: "Marketing" },
];

// Premium Tier/Tip system
export interface PremiumTier {
  id: string;
  name: string;
  price: string;
  features: string[];
  emoji: string;
  popular: boolean;
}

export const premiumTiers: PremiumTier[] = [
  {
    id: "free",
    name: "Starter",
    price: "Free",
    emoji: "⭐",
    popular: false,
    features: [
      "Basic posting",
      "Feed browsing",
      "Join spaces",
      "5 DMs per month"
    ]
  },
  {
    id: "pro",
    name: "Pro",
    price: "₹499/mo",
    emoji: "🚀",
    popular: true,
    features: [
      "Everything in Starter",
      "Advanced analytics",
      "Unlimited DMs",
      "Priority support",
      "Custom badges",
      "Access to exclusive spaces",
      "Weekly challenges priority"
    ]
  },
  {
    id: "vip",
    name: "VIP",
    price: "₹1,999/mo",
    emoji: "👑",
    popular: false,
    features: [
      "Everything in Pro",
      "Personal branding page",
      "1:1 mentorship matching",
      "Resume build service",
      "Interview prep coaching",
      "GitHub portfolio showcase",
      "Job alerts premium",
      "Tip & sponsorship features"
    ]
  },
];

// More Indian Influencers/Power Users
export const influencers: User[] = [
  { id: "inf1", name: "Sanjeev Singh", avatar: "🔥", title: "Founder & AI/ML Expert", company: "AI Labs India", location: "Bengaluru", connections: 45200, followers: 234000, karma: 345670, verified: true },
  { id: "inf2", name: "Divya Oberoi", avatar: "💎", title: "Chief Product Officer", company: "Product Collective", location: "Mumbai", connections: 38900, followers: 189000, karma: 267800, verified: true },
  { id: "inf3", name: "Abhishek Kadam", avatar: "⚡", title: "YC Alum, CTOSpeaker", company: "Elevate.tech", location: "Pune", connections: 52100, followers: 312000, karma: 456700, verified: true },
  { id: "inf4", name: "Neha Bhatnagar", avatar: "🌟", title: "Head of Growth", company: "ScaleUp India", location: "Delhi", connections: 41200, followers: 198000, karma: 334500, verified: true },
];
