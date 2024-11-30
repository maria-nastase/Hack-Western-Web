import React from "react";
import { Card } from "@/app/components/ui/card";
import { Skeleton } from "@/app/components/ui/skeleton";

interface LoadingStateProps {
  showSidebar?: boolean;
}

const LoadingState = ({ showSidebar = true }: LoadingStateProps) => {
  return (
    <div className="w-full h-full bg-background flex">
      {/* Main Map Area */}
      <div className="flex-1 p-6 space-y-6">
        {/* Map Skeleton */}
        <Card className="w-full h-[calc(100%-280px)] bg-white">
          <Skeleton className="w-full h-full" />
        </Card>

        {/* Patient Card Skeleton */}
        <Card className="w-[500px] p-6 space-y-4 bg-white">
          <div className="flex items-center gap-4">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </Card>

        {/* Shareable Link Skeleton */}
        <Card className="w-[500px] p-4 bg-white">
          <div className="flex items-center gap-3">
            <Skeleton className="h-5 w-5" />
            <Skeleton className="h-4 flex-1" />
            <Skeleton className="h-8 w-24" />
          </div>
        </Card>
      </div>

      {/* Sidebar Skeleton */}
      {showSidebar && (
        <div className="w-[500px] bg-white border-l">
          <div className="p-6 space-y-6">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-8 w-32" />
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="p-4 space-y-3 bg-white">
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-8 w-24" />
                  </div>
                  <Skeleton className="h-4 w-full" />
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoadingState;
