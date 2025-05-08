import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/lib/auth.tsx";
import { useLocation } from "wouter";
import LocationList from "./LocationList";
import LocationDetails from "./LocationDetails";
import { ThemeModeToggle } from "./ThemeModeToggle";
import { Location } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { List, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

// Leaflet Imports
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix für die Standard-Marker-Icons in Leaflet mit React
const DefaultIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Grüner Marker für besuchte Orte
const VisitedIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Hilfskomponente zur Steuerung der Kartenposition
function MapController({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, zoom);
  }, [map, center, zoom]);
  
  return null;
}

export default function TravelMap() {
  const [, setLocation] = useLocation();
  const { logout } = useAuth();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  // Zustandsverwaltung
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [showLocationDetails, setShowLocationDetails] = useState(false);
  const [showSidebar, setShowSidebar] = useState(!isMobile);
  const [mapCenter, setMapCenter] = useState<[number, number]>([20, 0]);
  const [mapZoom, setMapZoom] = useState(2);

  // API-Abfrage für Standorte
  const { data: locations = [], isLoading, error } = useQuery({
    queryKey: ["/api/locations"],
  });

  // Wenn Standorte geladen werden, Karte entsprechend positionieren
  useEffect(() => {
    if (locations.length > 0 && !selectedLocation) {
      try {
        const locs = locations as any[];
        const avgLat = locs.reduce((sum, loc) => sum + parseFloat(loc.latitude), 0) / locs.length;
        const avgLng = locs.reduce((sum, loc) => sum + parseFloat(loc.longitude), 0) / locs.length;
        
        setMapCenter([avgLat, avgLng]);
        setMapZoom(2);
      } catch (e) {
        console.error("Error calculating map center:", e);
      }
    }
  }, [locations, selectedLocation]);

  // Logout-Handler
  const handleLogout = () => {
    logout();
    setLocation("/");
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully."
    });
  };

  // Standortauswahl-Handler
  const handleLocationSelect = (location: any) => {
    setSelectedLocation(location);
    setShowLocationDetails(true);
    if (isMobile) {
      setShowSidebar(false);
    }
  };

  // Handler zum Fokussieren eines Standorts auf der Karte
  const handleLocationFocus = (location: Location) => {
    try {
      setMapCenter([parseFloat(location.latitude), parseFloat(location.longitude)]);
      setMapZoom(6);
      setShowLocationDetails(false);
    } catch (e) {
      console.error("Error focusing location:", e);
    }
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
                <div className="relative w-full h-full">
                  <MapContainer 
                    center={[20, 0]} 
                    zoom={2} 
                    style={{ height: "100%", width: "100%" }} 
                    zoomControl={true}
                    minZoom={2}
                    maxZoom={8}
                    worldCopyJump={true}
                  >
                    {/* Controller zur Aktualisierung der Kartenansicht */}
                    <MapController 
                      center={mapCenter} 
                      zoom={mapZoom} 
                    />
                    
                    {/* Kartenstil mit reduziertem Detail */}
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                      url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    />
                    
                    {/* Marker für alle Standorte */}
                    {(locations as any[]).map((location) => (
                      <Marker
                        key={location.id}
                        position={[parseFloat(location.latitude), parseFloat(location.longitude)]}
                        icon={VisitedIcon}
                        eventHandlers={{
                          click: () => handleLocationSelect(location)
                        }}
                      >
                        <Popup>
                          <div className="font-medium">{location.name}</div>
                          <div className="text-sm text-muted-foreground">{location.date}</div>
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                </div>
              )}
            </div>
          </div>

          {/* Locations sidebar */}
          {showSidebar && (
            <div className="w-full md:w-1/4 bg-card rounded-xl shadow-md p-4 md:block">
              <LocationList 
                locations={locations as any[]}
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
