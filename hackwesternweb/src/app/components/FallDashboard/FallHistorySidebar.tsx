"use client";
import React from "react";
import { Card } from "@/app/components/ui/card";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { Button } from "@/app/components/ui/button";
import { ChevronLeft, ChevronRight, History } from "lucide-react";
import FallHistoryItem from "./FallHistoryItem";
import { useRouter } from "next/navigation";

interface FallHistoryEntry {
  id: string;
  timestamp: string;
  location: string;
  severity: "low" | "medium" | "high" | "severe";
  fallID: string;
}

interface FallHistorySidebarProps {
  isOpen?: boolean;
  onToggle?: () => void;
  selectedIncidentId?: string;
  onIncidentSelect?: (id: string) => void;
  fallHistory?: FallHistoryEntry[];
}

const FallHistorySidebar = ({
  isOpen = true,
  onToggle = () => { },
  selectedIncidentId = "",
  onIncidentSelect = () => { },
  fallHistory = [
    {
      id: "1",
      timestamp: "2024-03-21 14:30:00",
      location: "123 Main St, San Francisco, CA",
      severity: "high",
      fallID: '1',
    },
    {
      id: "2",
      timestamp: "2024-03-21 10:15:00",
      location: "456 Market St, San Francisco, CA",
      severity: "medium",
      fallID: '2',
    },
    {
      id: "3",
      timestamp: "2024-03-20 16:45:00",
      location: "789 Mission St, San Francisco, CA",
      severity: "low",
      fallID: '3',
    },
  ],
}: FallHistorySidebarProps) => {
  const router = useRouter();
  return (
    <div
      className={`fixed right-0 top-0 h-full transition-all duration-300 bg-white sidebar ${isOpen ? "w-[500px]" : "w-[60px] collapsed"}`}
    >
      <Card className="h-full bg-white shadow-lg rounded-l-lg rounded-r-none border-r-0">
        <div className="flex h-full">
          {/* Toggle Button */}
          <Button
            variant="ghost"
            size="icon"
            className="h-full w-[60px] rounded-none border-r hover:bg-slate-100"
            onClick={onToggle}
          >
            {isOpen ? (
              <ChevronRight className="h-6 w-6 text-muted-foreground" />
            ) : (
              <ChevronLeft className="h-6 w-6 text-muted-foreground" />
            )}
          </Button>

          {/* Main Content */}
          {isOpen && (
            <div className="flex-1 p-6">
              <div className="flex items-center gap-2 mb-6">
                <History className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Fall History</h2>
              </div>

              <ScrollArea className="h-[calc(100%-80px)] pr-4">
                <div className="space-y-4">
                  {fallHistory.map((incident) => (
                    
                      <FallHistoryItem
                        key={incident.id}
                        timestamp={incident.timestamp}
                        location={incident.location || 'bad'}
                        severity={incident.severity}
                        isSelected={selectedIncidentId === incident.id}
                        onClick={() => {
                          onIncidentSelect(incident.id)
                          router.push(`/?id=${incident.fallID}`)
                        }}
                      />
                    
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default FallHistorySidebar;
