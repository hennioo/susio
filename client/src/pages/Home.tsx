import { useEffect } from "react";
import { useLocation } from "wouter";
import AccessGate from "@/components/AccessGate";
import { useAuth } from "@/lib/auth.tsx";

export default function Home() {
  const [, setLocation] = useLocation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // If already authenticated, redirect to map page
    if (isAuthenticated) {
      setLocation("/map");
    }
  }, [isAuthenticated, setLocation]);

  return (
    <div className="min-h-screen bg-background dark:bg-gradient-to-br dark:from-gray-900 dark:to-blue-950 bg-gradient-to-br from-blue-50 to-cyan-50">
      <AccessGate />
    </div>
  );
}
