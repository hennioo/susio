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
                    projection="geoMercator"
                    projectionConfig={{
                      scale: 100,
                      center: [0, 20]
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
                      maxZoom={12}
                    >
                      <g>
                        {/* North America */}
                        <path
                          d="M-135.32 16.27L-111.08 1.06L-95.66 12.58L-84.3 11.97L-73.56 18.3L-77.42 30.43L-85.72 36.76L-97.99 41.48L-108.42 36.15L-122.13 24.01L-124.28 19.91L-135.32 16.27Z"
                          fill={visitedCountryCodes.includes("US") ? "var(--map-visited-color, #10B981)" : "var(--map-unvisited-color, #E5E7EB)"}
                          stroke="var(--map-stroke-color, #3F3F46)"
                          strokeWidth={2}
                        />

                        {/* South America */}
                        <path
                          d="M-70.65 -24.01L-67.87 -30.04L-63.39 -33.83L-57.06 -30.34L-50.73 -36.07L-47.03 -44.56L-40.09 -45.77L-33.76 -40.04L-32.95 -34.31L-34.26 -27.68L-31.18 -22.25L-28.4 -17.13L-27.9 -10.49L-34.76 -2.31L-38.77 6.31L-41.25 11.74L-52.91 16.26L-53.11 12.17L-58.37 11.44L-59.18 7.31L-63.39 6.88L-67.87 1.46L-69.94 -10.8L-66.25 -18.98L-70.65 -24.01Z"
                          fill={visitedCountryCodes.includes("BR") ? "var(--map-visited-color, #10B981)" : "var(--map-unvisited-color, #E5E7EB)"}
                          stroke="var(--map-stroke-color, #3F3F46)"
                          strokeWidth={2}
                        />

                        {/* Europe */}
                        <path
                          d="M0.5 24.01L-5.81 20.5L-6.73 11.7L-0.3 11.4L3.07 8.5L10.2 10.4L15.92 8.5L22.25 12.8L27.48 11.4L27.98 17.9L24.57 20.5L17.23 19.7L12.4 23.4L5.9 24.01L0.5 24.01Z"
                          fill={visitedCountryCodes.includes("FR") || visitedCountryCodes.includes("DE") || visitedCountryCodes.includes("ES") || visitedCountryCodes.includes("IT") ? "var(--map-visited-color, #10B981)" : "var(--map-unvisited-color, #E5E7EB)"}
                          stroke="var(--map-stroke-color, #3F3F46)"
                          strokeWidth={2}
                        />

                        {/* Great Britain */}
                        <path
                          d="M-3.1 37L-6.5 31.5L-2.5 26L1.5 28L-0.2 33L-3.1 37Z"
                          fill={visitedCountryCodes.includes("GB") ? "var(--map-visited-color, #10B981)" : "var(--map-unvisited-color, #E5E7EB)"}
                          stroke="var(--map-stroke-color, #3F3F46)"
                          strokeWidth={2}
                        />

                        {/* Africa */}
                        <path
                          d="M25.14 -3.01L13.18 -9.04L5.84 -1.67L3.77 8.2L9.59 16.57L14.99 18.38L20.32 24.11L28.46 28.43L38.03 27.72L47.6 23.4L51.6 11.97L44.76 1.64L44.46 -6.54L38.03 -11.46L25.14 -3.01Z"
                          fill={visitedCountryCodes.includes("EG") || visitedCountryCodes.includes("ZA") ? "var(--map-visited-color, #10B981)" : "var(--map-unvisited-color, #E5E7EB)"}
                          stroke="var(--map-stroke-color, #3F3F46)"
                          strokeWidth={2}
                        />

                        {/* Asia */}
                        <path
                          d="M51.41 23.4L63.17 25.91L67.87 20.19L78.31 14.46L83.64 22.83L93.21 22.13L102.28 11.97L103.08 -1.67L94.72 -8.7L86.58 -0.33L72.37 -3.35L67.97 -10.39L59.63 -6.06L53.1 4.45L51.41 23.4Z"
                          fill={visitedCountryCodes.includes("CN") || visitedCountryCodes.includes("IN") || visitedCountryCodes.includes("JP") ? "var(--map-visited-color, #10B981)" : "var(--map-unvisited-color, #E5E7EB)"}
                          stroke="var(--map-stroke-color, #3F3F46)"
                          strokeWidth={2}
                        />

                        {/* South East Asia */}
                        <path
                          d="M78.31 -8.7L85.64 -16.77L97.4 -14.25L104.19 -22.13L104.59 -29.16L95.32 -33.48L86.58 -27.05L79.65 -33.48L72.37 -31.97L67.07 -22.83L78.31 -8.7Z"
                          fill={visitedCountryCodes.includes("TH") || visitedCountryCodes.includes("VN") ? "var(--map-visited-color, #10B981)" : "var(--map-unvisited-color, #E5E7EB)"}
                          stroke="var(--map-stroke-color, #3F3F46)"
                          strokeWidth={2}
                        />

                        {/* Australia */}
                        <path
                          d="M115.34 -44.55L107.28 -38.83L104.69 -30.46L111.95 -24.24L122.33 -24.84L130.89 -34.39L126.2 -43.35L115.34 -44.55Z"
                          fill={visitedCountryCodes.includes("AU") ? "var(--map-visited-color, #10B981)" : "var(--map-unvisited-color, #E5E7EB)"}
                          stroke="var(--map-stroke-color, #3F3F46)"
                          strokeWidth={2}
                        />
                    </g>
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
