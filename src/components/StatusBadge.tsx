import { 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  PlayCircle, 
  XCircle, 
  Minus,
  Timer
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type TokenStatus = "waiting" | "serving" | "upcoming" | "delayed" | "completed" | "noshow";

interface StatusBadgeProps {
  status: TokenStatus;
  language?: string;
  className?: string;
}

const StatusBadge = ({ status, language = "en", className }: StatusBadgeProps) => {
  const translations = {
    en: {
      waiting: "Waiting",
      serving: "Now Serving",
      upcoming: "Upcoming", 
      delayed: "Delayed",
      completed: "Completed",
      noshow: "No-show"
    },
    hi: {
      waiting: "प्रतीक्षा में",
      serving: "अब सेवा",
      upcoming: "आगामी",
      delayed: "देरी",
      completed: "पूर्ण",
      noshow: "नहीं आया"
    }
  };

  const t = translations[language as keyof typeof translations];

  const statusConfig = {
    waiting: {
      label: t.waiting,
      icon: Clock,
      variant: "secondary" as const,
      className: "bg-muted text-status-waiting border-status-waiting/20"
    },
    serving: {
      label: t.serving,
      icon: PlayCircle,
      variant: "default" as const,
      className: "bg-status-serving text-white border-status-serving"
    },
    upcoming: {
      label: t.upcoming,
      icon: Timer,
      variant: "secondary" as const,
      className: "bg-warning/10 text-status-upcoming border-status-upcoming/20"
    },
    delayed: {
      label: t.delayed,
      icon: AlertCircle,
      variant: "destructive" as const,
      className: "bg-destructive/10 text-status-delayed border-status-delayed/20"
    },
    completed: {
      label: t.completed,
      icon: CheckCircle,
      variant: "secondary" as const,
      className: "bg-teal/10 text-status-completed border-status-completed/20"
    },
    noshow: {
      label: t.noshow,
      icon: XCircle,
      variant: "secondary" as const,
      className: "bg-muted text-status-noshow border-status-noshow/20"
    }
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge 
      variant={config.variant}
      className={cn(
        "flex items-center gap-1.5 px-3 py-1 font-medium border transition-all duration-200",
        config.className,
        className
      )}
    >
      <Icon className="w-3.5 h-3.5 flex-shrink-0" />
      <span className="text-sm">{config.label}</span>
    </Badge>
  );
};

export default StatusBadge;