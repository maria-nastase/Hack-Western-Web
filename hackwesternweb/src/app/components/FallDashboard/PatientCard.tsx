"use client";
import React from "react";
import { Card, CardHeader, CardContent } from "@/app/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/app/components/ui/avatar";
import { User, MapPin, Clock } from "lucide-react";
import SeverityIndicator from "./SeverityIndicator";

interface PatientCardProps {
  patientName?: string;
  patientImage?: string;
  severity?: "low" | "medium" | "high";
  location?: string;
  timestamp?: string;
}

const PatientCard = ({
  patientName = "John Doe",
  patientImage = "https://dummyimage.com/100x100/cccccc/666666&text=JD",
  severity = "medium",
  location = "123 Main St, San Francisco, CA",
  timestamp = "2024-03-21 14:30:00",
}: PatientCardProps) => {
  return (
    <Card className="w-[500px] bg-white shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={patientImage} alt={patientName} />
            <AvatarFallback className="bg-muted">
              <User className="h-8 w-8 text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-foreground">
              {patientName}
            </h2>
            <div className="mt-2">
              <SeverityIndicator severity={severity} />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">{location}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span className="text-sm">
              {new Date(timestamp).toLocaleString("en-us")}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientCard;
