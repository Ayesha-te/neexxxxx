import { Crown } from "lucide-react";

interface LevelBadgeProps {
  level: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export function LevelBadge({ level, size = "md", showLabel = false }: LevelBadgeProps) {
  const sizeClasses = {
    sm: "w-7 h-7 text-xs",
    md: "w-9 h-9 text-sm",
    lg: "w-12 h-12 text-base",
  };

  return (
    <div className={`relative flex items-center justify-center rounded-full ${sizeClasses[size]} bg-gradient-to-br from-gold to-amber-600 text-white font-bold shadow-lg border-2 border-gold/50`}>
      <Crown className="size-4" />
      <span className="absolute inset-0 flex items-center justify-center font-bold">{level}</span>
    </div>
  );
}
