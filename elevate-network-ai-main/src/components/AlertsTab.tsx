import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, CheckCircle2, Trash2, Filter, Check } from "lucide-react";
import { notifications as initialNotifications } from "@/data/demoData";

export default function AlertsTab() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    if (filter === "unread") return notifications.filter(n => !n.read);
    if (filter === "read") return notifications.filter(n => n.read);
    return notifications;
  }, [notifications, filter]);

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
    setSelectedIds(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const deleteSelected = () => {
    setNotifications(notifications.filter(n => !selectedIds.has(n.id)));
    setSelectedIds(new Set());
  };

  const toggleSelection = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedIds(newSet);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="text-4xl">🔔</div>
          <div className="flex-1">
            <h1 className="font-display font-bold text-3xl">Notifications & Alerts</h1>
            <p className="text-sm text-muted-foreground">
              {unreadCount > 0 ? `You have ${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}` : 'All caught up!'}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex items-center justify-between mb-6 flex-wrap gap-3"
      >
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <div className="flex gap-1 bg-card rounded-lg border border-border p-1">
            {(["all", "unread", "read"] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  filter === f
                    ? "gradient-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {f === "all" ? "All" : f === "unread" ? `Unread (${unreadCount})` : "Read"}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {selectedIds.size > 0 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={deleteSelected}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-destructive/10 text-destructive hover:bg-destructive/20 transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete ({selectedIds.size})
            </motion.button>
          )}
          {unreadCount > 0 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={markAllAsRead}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-primary/10 text-primary hover:bg-primary/20 transition-all"
            >
              <Check className="w-3.5 h-3.5" />
              Mark all as read
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Notifications List */}
      <motion.div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <Bell className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground">
                {filter === "unread" ? "No unread notifications" : filter === "read" ? "No read notifications" : "No notifications"}
              </p>
            </motion.div>
          ) : (
            filtered.map((notif, index) => (
              <motion.div
                key={notif.id}
                layoutId={notif.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: index * 0.03 }}
                className={`group rounded-xl border transition-all cursor-pointer ${
                  notif.read
                    ? "border-border bg-card hover:border-primary/30"
                    : "border-primary/40 bg-primary/5 hover:border-primary/60"
                }`}
              >
                <div className="p-4 flex items-start gap-3">
                  {/* Checkbox */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleSelection(notif.id)}
                    className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedIds.has(notif.id)
                        ? "gradient-primary border-primary"
                        : "border-border group-hover:border-primary/50"
                    }`}
                  >
                    {selectedIds.has(notif.id) && (
                      <Check className="w-3 h-3 text-primary-foreground" />
                    )}
                  </motion.button>

                  {/* Avatar & Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex items-start gap-2">
                        <span className="text-2xl flex-shrink-0">{notif.avatar}</span>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm ${notif.read ? "text-muted-foreground" : "font-semibold text-foreground"}`}>
                            {notif.content}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">{notif.timestamp}</p>
                        </div>
                      </div>

                      {/* Unread indicator & Actions */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {!notif.read && (
                          <div className="w-2.5 h-2.5 rounded-full gradient-primary" />
                        )}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.preventDefault();
                            deleteNotification(notif.id);
                          }}
                          className="opacity-0 group-hover:opacity-100 p-1 rounded-full hover:bg-destructive/10 text-destructive transition-all"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>

                    {/* Mark as read button */}
                    {!notif.read && (
                      <motion.button
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={() => markAsRead(notif.id)}
                        className="mt-2 flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-all"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Mark as read
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </motion.div>

      {/* Stats */}
      {notifications.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 pt-6 border-t border-border grid grid-cols-3 gap-4"
        >
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">Total</p>
            <p className="font-display font-bold text-2xl text-foreground">{notifications.length}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">Unread</p>
            <p className="font-display font-bold text-2xl text-primary">{unreadCount}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">Read</p>
            <p className="font-display font-bold text-2xl text-success">{notifications.filter(n => n.read).length}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
