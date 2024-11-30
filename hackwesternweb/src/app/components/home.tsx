/*function Home() {
  return (
    <div className="w-screen h-screen">
    </div>
  )
}

export default Home*/

"use client";

import { useState } from "react";
import GoogleMap from "./FallDashboard/GoogleMap";
import PatientCard from "./FallDashboard/PatientCard";
import FallHistorySidebar from "./FallDashboard/FallHistorySidebar";
import ShareableLink from "./FallDashboard/ShareableLink";
import LoadingState from "./FallDashboard/LoadingState";

function Home() {
  const [isLoading] = useState(false);
  const [selectedIncidentId, setSelectedIncidentId] = useState("1");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="w-screen h-screen bg-background flex">
      <div className="flex-1 p-6 space-y-6 relative">
        <div className="h-[calc(100%-280px)]">
          <GoogleMap
            coordinates={{ lat: 37.7749, lng: -122.4194 }}
            zoom={15}
            showRoute={true}
          />
        </div>

        {/* Patient Info */}
        <div className="flex items-start gap-4">
          <PatientCard
            patientName="John Doe"
            severity="high"
            location="123 Main St, San Francisco, CA"
            timestamp="2024-03-21 14:30:00"
          />

          <ShareableLink
            incidentId={selectedIncidentId}
            baseUrl="https://example.com/fall"
          />
        </div>
      </div>

      {/* Sidebar */}
      <FallHistorySidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        selectedIncidentId={selectedIncidentId}
        onIncidentSelect={setSelectedIncidentId}
      />
    </div>
  );
}

export default Home;
