"use client";

import { useState } from "react";
import GoogleMap from "./FallDashboard/GoogleMap";
import PatientCard from "./FallDashboard/PatientCard";
import FallHistorySidebar from "./FallDashboard/FallHistorySidebar";
import ShareableLink from "./FallDashboard/ShareableLink";
import LoadingState from "./FallDashboard/LoadingState";

function Home({ fname, lname, severity, latitude, longitude, createdAt, fallID, prevFalls, url }) {
  const [isLoading] = useState(false);
  const [selectedIncidentId, setSelectedIncidentId] = useState("1");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="w-screen h-screen bg-background">
      <div className="z-10 bg-white w-[500px] h-[70px] shadow-lg relative flex items-center justify-center rounded-md gap-2 text-muted-foreground box title">
        <h1 className="text-5xl font-semibold center">Upright</h1>
      </div>
      <div className="flex-1 p-6 fixed top-0">
        <div className="h-screen z-1 w-full fixed top-0 left-0 p-0 z-0">
          <GoogleMap
            latitude={parseFloat(latitude)}
            longitude={parseFloat(longitude)}

          //center={{ lat: parseFloat(latitude), lng: parseFloat
          //coordinates={{ lat: parseFloat(latitude), lng: parseFloat(longitude) }}
          //showRoute={true}
          //zoomControl={true}
          //gestureHandling="auto"
          //disableDefaultUI={false}
          //draggable={true}
          />
        </div>

        {/* Patient Info */}
        <div className="items-start relative gap-4 z-10 top-20">
          <PatientCard
            patientName={`${fname} ${lname}`}
            patientImage={`https://dummyimage.com/100x100/cccccc/666666&text=${fname[0]}${lname[0]}`}
            severity={severity}
            location={`(${latitude}, ${longitude})`}
            timestamp={createdAt}
          />

          <ShareableLink
            shareableUrl={`${url}/?id=${fallID}`}
          />
        </div>
      </div>

      {/* Sidebar */}
      <FallHistorySidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        selectedIncidentId={selectedIncidentId}
        onIncidentSelect={setSelectedIncidentId}
        fallHistory={prevFalls}
      />
    </div>
  );
}
export default Home;
