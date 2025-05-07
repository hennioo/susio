import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/lib/auth.tsx";
import { useLocation } from "wouter";
import LocationList from "./LocationList";
import LocationDetails from "./LocationDetails";
import { ThemeModeToggle } from "./ThemeModeToggle";
import { Location } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";
import { worldGeoData } from "@/lib/mapData";
import { MapPin, List, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

export default function TravelMap() {
  const [, setLocation] = useLocation();
  const { logout } = useAuth();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [showLocationDetails, setShowLocationDetails] = useState(false);
  const [showSidebar, setShowSidebar] = useState(!isMobile);
  const [mapPosition, setMapPosition] = useState({ coordinates: [10, 30] as [number, number], zoom: 1 });

  // Fetch locations from API
  const { data: locations = [], isLoading, error } = useQuery({
    queryKey: ["/api/locations"],
  });

  // When locations load, ensure map is positioned to show them
  useEffect(() => {
    if (locations.length > 0 && !selectedLocation) {
      const avgLat = locations.reduce((sum, loc) => sum + parseFloat(loc.latitude), 0) / locations.length;
      const avgLng = locations.reduce((sum, loc) => sum + parseFloat(loc.longitude), 0) / locations.length;
      setMapPosition({ coordinates: [avgLng, avgLat], zoom: 1.5 });
    }
  }, [locations, selectedLocation]);

  // Extract countries that have been visited
  const visitedCountryCodes = locations.map(location => location.countryCode);

  const handleLogout = () => {
    logout();
    setLocation("/");
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully."
    });
  };

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
    setShowLocationDetails(true);
    if (isMobile) {
      setShowSidebar(false);
    }
  };

  const handleLocationFocus = (location: Location) => {
    setMapPosition({
      coordinates: [parseFloat(location.longitude), parseFloat(location.latitude)],
      zoom: 4
    });
    setShowLocationDetails(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-sm h-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold font-heading text-foreground">Our Travel Map</h1>
          </div>
          <div className="flex items-center space-x-4">
            {isMobile && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowSidebar(!showSidebar)}
                className="md:hidden"
              >
                <List className="h-4 w-4 mr-2" />
                Locations
              </Button>
            )}
            <ThemeModeToggle />
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row py-4 gap-4">
          {/* Map container */}
          <div className="w-full md:w-3/4 bg-card rounded-xl shadow-md overflow-hidden">
            <div className="h-[calc(100vh-8rem)] md:h-[calc(100vh-8rem)]">
              {isLoading ? (
                <div className="h-full flex items-center justify-center">
                  <p className="text-foreground">Loading map...</p>
                </div>
              ) : error ? (
                <div className="h-full flex items-center justify-center">
                  <p className="text-destructive">Error loading map data</p>
                </div>
              ) : (
                <div className="relative w-full h-full bg-white dark:bg-gray-800">
                  <ComposableMap 
                    projection="geoEqualEarth"
                    projectionConfig={{
                      scale: 175,
                      center: [0, 0]
                    }}
                    style={{
                      width: "100%",
                      height: "100%",
                      backgroundColor: "var(--map-bg-color, #F1F5F9)"
                    }}
                  >
                    <ZoomableGroup 
                      zoom={mapPosition.zoom} 
                      center={mapPosition.coordinates}
                      maxZoom={8}
                    >
                      <Geographies geography={worldGeoData}>
                        {({ geographies }) =>
                          geographies.map(geo => {
                            const isVisited = visitedCountryCodes.includes(geo.properties.ISO_A2);
                            return (
                              <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                fill={
                                  isVisited
                                    ? "var(--map-visited-color, #10B981)"
                                    : "var(--map-unvisited-color, #E5E7EB)"
                                }
                                stroke="var(--map-stroke-color, #FFFFFF)"
                                style={{
                                  default: {
                                    fill: isVisited
                                      ? "var(--map-visited-color, #10B981)"
                                      : "var(--map-unvisited-color, #E5E7EB)",
                                    fillOpacity: isVisited ? 0.8 : 0.3,
                                    stroke: "var(--map-stroke-color, #FFFFFF)",
                                    strokeWidth: 0.5,
                                    outline: "none",
                                  },
                                  hover: {
                                    fill: isVisited
                                      ? "var(--map-visited-hover-color, #059669)"
                                      : "var(--map-unvisited-hover-color, #D1D5DB)",
                                    fillOpacity: isVisited ? 1 : 0.5,
                                    stroke: "var(--map-stroke-color, #FFFFFF)",
                                    strokeWidth: 0.75,
                                    outline: "none",
                                    cursor: "pointer"
                                  },
                                  pressed: {
                                    fill: isVisited
                                      ? "var(--map-visited-pressed-color, #047857)"
                                      : "var(--map-unvisited-pressed-color, #9CA3AF)",
                                    outline: "none",
                                  },
                                }}
                              />
                            )
                          })
                        }
                      </Geographies>
                      {locations.map((location) => (
                        <Marker
                          key={location.id}
                          coordinates={[parseFloat(location.longitude), parseFloat(location.latitude)]}
                          onClick={() => handleLocationSelect(location)}
                        >
                          <g
                            fill="none"
                            stroke="var(--map-marker-color, #F59E0B)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            transform="translate(-12, -24)"
                          >
                            <circle cx="12" cy="10" r="3" fill="var(--map-marker-color, #F59E0B)" />
                            <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" fill="var(--map-marker-color, #F59E0B)" />
                          </g>
                        </Marker>
                      ))}
                    </ZoomableGroup>
                  </ComposableMap>
                </div>
              )}
            </div>
          </div>

          {/* Locations sidebar */}
          {showSidebar && (
            <div className="w-full md:w-1/4 bg-card rounded-xl shadow-md p-4 md:block">
              <LocationList 
                locations={locations}
                isLoading={isLoading}
                onSelectLocation={handleLocationSelect}
                onCloseSidebar={() => setShowSidebar(false)}
                isMobile={isMobile}
              />
            </div>
          )}
        </div>
      </main>

      {/* Location Details Modal */}
      {showLocationDetails && selectedLocation && (
        <LocationDetails
          location={selectedLocation}
          onClose={() => setShowLocationDetails(false)}
          onViewOnMap={() => handleLocationFocus(selectedLocation)}
        />
      )}
    </div>
  );
}
