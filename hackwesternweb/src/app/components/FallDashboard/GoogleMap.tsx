/*import React from "react";
import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Navigation2, ZoomIn, ZoomOut } from "lucide-react";

interface GoogleMapProps {
  coordinates?: {
    lat: number;
    lng: number;
  };
  zoom?: number;
  showRoute?: boolean;
}

const GoogleMap = ({
  coordinates = { lat: 37.7749, lng: -122.4194 }, // Default to San Francisco
  zoom = 15,
  showRoute = true,
}: GoogleMapProps) => {
  return (
    <Card className="relative w-full h-full bg-white overflow-hidden">
      /* Placeholder for Google Maps */
      /*<div className="w-full h-full bg-slate-100 relative">
        /* Simulated map background */
        /*<div className="absolute inset-0">
          <img
            src="https://dummyimage.com/1012x982/e2e8f0/94a3b8&text=Map+View"
            alt="Map"
            className="w-full h-full object-cover"
          />
        </div>

        /* Map Controls */
        /*<div className="absolute top-4 right-4 flex flex-col gap-2">
          <Button
            variant="secondary"
            size="icon"
            className="bg-white shadow-md"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="bg-white shadow-md"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
        </div>*/

        /* Navigation Controls */
        /*{showRoute && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
            <Button className="bg-primary text-white shadow-lg flex items-center gap-2">
              <Navigation2 className="h-4 w-4" />
              Start Navigation
            </Button>
          </div>
        )}*/

        /* Incident Location Marker */
        /*<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-6 h-6 bg-destructive rounded-full animate-pulse">
            <div className="w-6 h-6 bg-destructive/50 rounded-full animate-ping" />
          </div>
        </div>*/

        /* Route Line Placeholder */
        /*{showRoute && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-1/2 h-0.5 bg-primary-foreground/50 transform rotate-45" />
          </div>
        )}
      </div>
    </Card>
  );
};

export default GoogleMap;*/

'use client'
import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';


const containerStyle = {
  width: '100%',
  height: '100%',
};



const GoogleMapComponent = ({latitude, longitude}) => {



  const center = {
    lat: latitude,
    lng: longitude
  };

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;