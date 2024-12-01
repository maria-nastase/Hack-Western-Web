"use client";

import { useState } from "react";
import GoogleMap from "./FallDashboard/GoogleMap";
import PatientCard from "./FallDashboard/PatientCard";
import FallHistorySidebar from "./FallDashboard/FallHistorySidebar";
import ShareableLink from "./FallDashboard/ShareableLink";
import LoadingState from "./FallDashboard/LoadingState";

function Home({ fname }) {
  const [isLoading] = useState(false);
  const [selectedIncidentId, setSelectedIncidentId] = useState("1");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="w-screen h-screen bg-background">
      <div className="z-10 bg-white w-[500px] h-[70px] shadow-lg relative flex items-center justify-center rounded-md gap-2 text-muted-foreground">
        <h1 className="text-5xl font-semibold center">Upright</h1>
      </div>
      <div className="flex-1 p-6 fixed top-0">
        <div className="h-screen z-1 w-full fixed top-0 left-0 p-0 z-0">
          <GoogleMap
            coordinates={{ lat: 37.7749, lng: -122.4194 }}
            showRoute={true}
            zoomControl={true}
            gestureHandling="auto"
            disableDefaultUI={false}
            draggable={true}
          />
        </div>

        {/* Patient Info */}
        <div className="items-start relative gap-4 z-10 top-20">
          <PatientCard
            patientName={fname || "Loading"}
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
