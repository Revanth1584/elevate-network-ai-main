import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { weeklyChallenges } from "@/data/demoData";
import type { WeeklyChallenge } from "@/data/demoData";
import { Award, Flame, Trophy, Users, CheckCircle2, ArrowRight } from "lucide-react";

export default function WeeklyChallengeTab() {
  const [selectedChallenge, setSelectedChallenge] = useState<WeeklyChallenge | null>(null);
  const [participatingIds, setParticipatingIds] = useState<Set<string>>(new Set());

  const toggleParticipation = (id: string) => {
    const newSet = new Set(participatingIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setParticipatingIds(newSet);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "text-success";
      case "Medium": return "text-warning";
      case "Hard": return "text-destructive";
      default: return "text-primary";
    }
  };

  const getDifficultyBg = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-success/10";
      case "Medium": return "bg-warning/10";
      case "Hard": return "bg-destructive/10";
      default: return "bg-primary/10";
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="text-4xl">🏆</div>
          <h1 className="font-display font-bold text-3xl">Weekly Challenges</h1>
        </div>
        <p className="text-muted-foreground">Compete, grow, and win amazing prizes every week!</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Challenges List */}
        <motion.div className="lg:col-span-2 space-y-4">
          <AnimatePresence mode="popLayout">
            {weeklyChallenges.map((challenge, index) => (
              <motion.div
                key={challenge.id}
                layoutId={challenge.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02, translateX: 4 }}
                onClick={() => setSelectedChallenge(challenge)}
                className="cursor-pointer"
              >
                <div className={`bg-card rounded-xl border border-border p-5 hover:border-primary/50 transition-all ${
                  selectedChallenge?.id === challenge.id ? "border-primary ring-2 ring-primary/20" : ""
                }`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="text-4xl">{challenge.emoji}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-display font-semibold text-sm">{challenge.title}</h3>
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${getDifficultyBg(challenge.difficulty)} ${getDifficultyColor(challenge.difficulty)}`}>
                            {challenge.difficulty}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">{challenge.description}</p>
                      </div>
                    </div>
                    <div className="text-2xl">{challenge.icon}</div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-4 pt-3 border-t border-border">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-primary" />
                      <span className="text-xs font-semibold">{challenge.participants} joined</span>
                    </div>
                    <div className="text-xs text-muted-foreground text-center">
                      {challenge.startDate} - {challenge.endDate}
                    </div>
                    <div className="text-xs font-semibold text-accent text-right">
                      🎁 {challenge.prize}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[10px] bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {challenge.category}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleParticipation(challenge.id);
                      }}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        participatingIds.has(challenge.id)
                          ? "gradient-primary text-primary-foreground"
                          : "bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground"
                      }`}
                    >
                      {participatingIds.has(challenge.id) ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Joined
                        </>
                      ) : (
                        <>
                          <ArrowRight className="w-3.5 h-3.5" />
                          Join
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Details Panel */}
        <motion.div className="lg:col-span-1">
          <AnimatePresence mode="wait">
            {selectedChallenge ? (
              <motion.div
                key={selectedChallenge.id}
                layoutId={selectedChallenge.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="sticky top-24"
              >
                <div className="bg-card rounded-xl border border-primary/50 p-6 space-y-4">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="text-5xl">{selectedChallenge.emoji}</div>
                    <div>
                      <h2 className="font-display font-bold text-lg">{selectedChallenge.title}</h2>
                      <span className={`inline-block mt-1 text-xs font-bold px-2 py-1 rounded-full ${getDifficultyBg(selectedChallenge.difficulty)} ${getDifficultyColor(selectedChallenge.difficulty)}`}>
                        {selectedChallenge.difficulty}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground mb-1">Description</p>
                      <p className="text-sm text-foreground/80">{selectedChallenge.description}</p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-muted-foreground mb-2">Prize Pool</p>
                      <div className="flex items-center gap-2 px-3 py-2 rounded-lg gradient-primary text-primary-foreground">
                        <Trophy className="w-4 h-4" />
                        <span className="font-semibold text-sm">{selectedChallenge.prize}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-secondary/50 rounded-lg p-3">
                        <p className="text-[10px] text-muted-foreground mb-1">Participants</p>
                        <p className="font-display font-bold text-lg">{selectedChallenge.participants.toLocaleString()}</p>
                      </div>
                      <div className="bg-secondary/50 rounded-lg p-3">
                        <p className="text-[10px] text-muted-foreground mb-1">Category</p>
                        <p className="font-semibold text-sm">{selectedChallenge.category}</p>
                      </div>
                    </div>

                    <div className="border-t border-border pt-3">
                      <p className="text-xs font-semibold text-muted-foreground mb-2">Timeline</p>
                      <div className="text-xs space-y-1">
                        <p><span className="text-muted-foreground">Starts:</span> <span className="font-semibold">{selectedChallenge.startDate}</span></p>
                        <p><span className="text-muted-foreground">Ends:</span> <span className="font-semibold">{selectedChallenge.endDate}</span></p>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleParticipation(selectedChallenge.id)}
                    className={`w-full py-2.5 rounded-lg font-bold text-sm transition-all ${
                      participatingIds.has(selectedChallenge.id)
                        ? "gradient-primary text-primary-foreground"
                        : "bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground"
                    }`}
                  >
                    {participatingIds.has(selectedChallenge.id) ? "✓ You are participating" : "Join Challenge"}
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="sticky top-24 bg-card rounded-xl border border-border p-6 text-center"
              >
                <Award className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                <p className="text-sm text-muted-foreground">Select a challenge to see details</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
