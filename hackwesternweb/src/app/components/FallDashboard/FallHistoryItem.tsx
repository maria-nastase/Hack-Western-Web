import React from "react";
import { Card } from "@/app/components/ui/card";
import { MapPin, Clock } from "lucide-react";
import SeverityIndicator from "./SeverityIndicator";

interface FallHistoryItemProps {
  timestamp?: string;
  location?: string;
  severity?: "low" | "medium" | "high";
  isSelected?: boolean;
  onClick?: () => void;
}

const FallHistoryItem = ({
  timestamp = "2024-03-21 14:30:00",
  location = "123 Main St, San Francisco, CA",
  severity = "medium",
  isSelected = false,
  onClick = () => {},
}: FallHistoryItemProps) => {
  return (
    <Card
      className={`w-full bg-white p-4 cursor-pointer transition-colors hover:bg-slate-50 ${isSelected ? "border-primary" : ""}`}
      onClick={onClick}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span className="text-sm font-medium">
              {new Date(timestamp).toLocaleString("en-us")}
            </span>
          </div>
          <SeverityIndicator
            severity={severity}
            showIcon={true}
            className="h-8 text-xs"
          />
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span className="text-sm truncate">{location}</span>
        </div>
      </div>
    </Card>
  );
};

export default FallHistoryItem;
