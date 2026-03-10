import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { premiumTiers } from "@/data/demoData";
import { Check, Zap, Crown, Gift } from "lucide-react";

export default function PremiumTab() {
  const [selectedTier, setSelectedTier] = useState("free");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  const currentTierIndex = premiumTiers.findIndex(t => t.id === selectedTier);
  const currentTier = premiumTiers[currentTierIndex];

  const getAnnualDiscount = (monthlyPrice: string) => {
    const price = parseInt(monthlyPrice.match(/\d+/)?.[0] || "0");
    return Math.round(price * 12 * 0.2);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="text-5xl mb-3">👑</div>
        <h1 className="font-display font-bold text-4xl mb-2">Unlock Premium Features</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Level up your networking game with our premium tiers. Get exclusive features, priority support, and access to premium content.
        </p>

        {/* Billing Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-4 mt-6 bg-card rounded-lg border border-border p-1"
        >
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-6 py-2 rounded-lg font-semibold text-sm transition-all ${
              billingCycle === "monthly"
                ? "gradient-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle("yearly")}
            className={`px-6 py-2 rounded-lg font-semibold text-sm transition-all relative ${
              billingCycle === "yearly"
                ? "gradient-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Yearly
            <span className="absolute -top-3 right-0 text-xs font-bold text-warning bg-warning/20 px-1.5 py-0.5 rounded-full">
              Save 20%
            </span>
          </button>
        </motion.div>
      </motion.div>

      {/* Pricing Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
      >
        <AnimatePresence mode="popLayout">
          {premiumTiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              layoutId={tier.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: selectedTier === tier.id ? 0 : -8 }}
              onClick={() => setSelectedTier(tier.id)}
              className={`cursor-pointer transition-all relative group overflow-hidden rounded-2xl border-2 ${
                selectedTier === tier.id
                  ? "border-primary ring-2 ring-primary/30 scale-105"
                  : "border-border hover:border-primary/50"
              }`}
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 transition-opacity ${
                selectedTier === tier.id ? "opacity-100" : "opacity-0 group-hover:opacity-5"
              }`}>
                <div className={`absolute inset-0 ${selectedTier === tier.id ? "gradient-primary" : ""}`} />
              </div>

              <div className={`relative p-8 ${selectedTier === tier.id ? "bg-primary/5" : "bg-card"}`}>
                {/* Badge */}
                {tier.popular && (
                  <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="absolute top-0 right-0 bg-warning text-warning-foreground px-4 py-1 text-xs font-bold rounded-bl-lg"
                  >
                    Most Popular
                  </motion.div>
                )}

                {/* Emoji & Title */}
                <div className="mb-4">
                  <div className="text-4xl mb-3">{tier.emoji}</div>
                  <h3 className="font-display font-bold text-2xl mb-1">{tier.name}</h3>
                </div>

                {/* Price */}
                <div className="mb-6">
                  {tier.price === "Free" ? (
                    <div className="text-4xl font-display font-bold">Free</div>
                  ) : (
                    <>
                      <div className="flex items-baseline gap-1 mb-2">
                        <span className="text-4xl font-display font-bold">
                          {billingCycle === "monthly"
                            ? tier.price
                            : `₹${Math.floor(parseInt(tier.price.match(/\\d+/)?.[0] || "0") * 12 * 0.8)}`}
                        </span>
                        <span className="text-muted-foreground text-sm">
                          {billingCycle === "monthly" ? "/month" : "/year"}
                        </span>
                      </div>
                      {billingCycle === "yearly" && tier.price !== "Free" && (
                        <p className="text-xs text-success font-semibold">
                          Save ₹{getAnnualDiscount(tier.price)} annually
                        </p>
                      )}
                    </>
                  )}
                </div>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-3 rounded-lg font-bold text-sm mb-6 transition-all flex items-center justify-center gap-2 ${
                    selectedTier === tier.id
                      ? "gradient-primary text-primary-foreground"
                      : "bg-secondary text-foreground hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  {tier.price === "Free" ? (
                    <>Current Plan</>
                  ) : selectedTier === tier.id ? (
                    <>
                      <Crown className="w-4 h-4" />
                      Upgrade Now
                    </>
                  ) : (
                    <>Upgrade to {tier.name}</>
                  )}
                </motion.button>

                {/* Features List */}
                <div className="space-y-3">
                  {tier.features.map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + i * 0.05 }}
                      className="flex items-start gap-2"
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-success" />
                      </div>
                      <span className="text-sm text-foreground/80">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Detailed Features Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-card rounded-2xl border border-border p-8"
      >
        <h3 className="font-display font-bold text-2xl mb-6 flex items-center gap-2">
          <Zap className="w-6 h-6 text-primary" />
          What's New in {currentTier.name}?
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentTier.features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.05 }}
              className="flex items-start gap-3 p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
            >
              <div className="flex-shrink-0 mt-1">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <Check className="w-5 h-5 text-success" />
                </motion.div>
              </div>
              <span className="text-sm text-foreground/90">{feature}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Bonus: Tips/Sponsorship */}
      {selectedTier !== "free" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl border border-primary/30 p-8"
        >
          <div className="flex items-start gap-4">
            <Gift className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-display font-bold text-lg mb-2 flex items-center gap-2">
                🎉 Exclusive Tier Perks
              </h4>
              <p className="text-sm text-foreground/80 mb-4">
                Your {currentTier.name} membership includes exclusive benefits:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "💰 Accept tips & sponsorships from admirers",
                  "🎬 Unlock trending content priority",
                  "🏆 Exclusive challenger tournament access",
                  "📊 Advanced analytics & insights",
                  "🤝 Priority mentorship matching",
                  "⭐ Premium badge on your profile",
                ].map((perk, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 + i * 0.05 }}
                    className="text-xs text-foreground/80"
                  >
                    {perk}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
