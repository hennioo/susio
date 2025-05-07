import { useEffect } from "react";
import { useLocation } from "wouter";
import TravelMap from "@/components/TravelMap";
import { useAuth } from "@/lib/auth.tsx";

export default function Map() {
  const [, setLocation] = useLocation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // If not authenticated, redirect to home page
    if (!isAuthenticated) {
      setLocation("/");
    }
  }, [isAuthenticated, setLocation]);

  // Don't render if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return <TravelMap />;
}
