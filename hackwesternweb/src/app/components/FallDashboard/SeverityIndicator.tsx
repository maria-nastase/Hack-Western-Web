import React from "react";
import { Badge } from "@/app/components/ui/badge";
import { AlertTriangle, AlertCircle, AlertOctagon } from "lucide-react";

type SeverityLevel = "low" | "medium" | "high";

interface SeverityIndicatorProps {
  severity?: SeverityLevel;
  showIcon?: boolean;
  className?: string;
}

const SeverityIndicator = ({
  severity = "medium",
  showIcon = true,
  className = "",
}: SeverityIndicatorProps) => {
  const severityConfig = {
    low: {
      color: "bg-green-100 text-green-800 hover:bg-green-100/80",
      icon: AlertCircle,
      label: "Low Severity",
    },
    medium: {
      color: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80",
      icon: AlertTriangle,
      label: "Medium Severity",
    },
    high: {
      color: "bg-red-100 text-red-800 hover:bg-red-100/80",
      icon: AlertOctagon,
      label: "High Severity",
    },
  };

  const { color, icon: Icon, label } = severityConfig[severity];

  return (
    <Badge
      variant="secondary"
      className={`${color} flex items-center gap-1.5 px-3 py-1 h-10 ${className}`}
    >
      {showIcon && <Icon className="h-4 w-4" />}
      <span className="font-medium">{label}</span>
    </Badge>
  );
};

export default SeverityIndicator;
