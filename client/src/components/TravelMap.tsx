import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/lib/auth.tsx";
import { useLocation } from "wouter";
import LocationList from "./LocationList";
import LocationDetails from "./LocationDetails";
import { ThemeModeToggle } from "./ThemeModeToggle";
import { Button } from "@/components/ui/button";
import { List, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import coupleTravelImage from "../assets/couple-travel.png";

// Leaflet Imports
import { MapContainer, TileLayer, Marker, Popup, useMap, GeoJSON } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import L from "leaflet";
// Import für die Länder-GeoJSON-Daten
import countriesData from "../assets/countries.json";
// Typen für GeoJSON
import { Feature, FeatureCollection } from "geojson";
// CSS ist bereits in index.html importiert

// Fix für die Standard-Marker-Icons in Leaflet mit React
const DefaultIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Pastellrosa Marker für besuchte Orte, passt besser zum Wasserfarben-Style
const VisitedIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Interface for typed location data
export interface LocationData {
  id: number;
  name: string;
  description: string;
  date: string;
  highlight: string;
  latitude: string;
  longitude: string;
  countryCode: string;
  image: string;
}

// Hilfskomponente zur Steuerung der Kartenposition
function MapController({ center, zoom }: { center: LatLngExpression, zoom: number }) {
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
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);
  const [showLocationDetails, setShowLocationDetails] = useState(false);
  const [showSidebar, setShowSidebar] = useState(!isMobile);
  const [mapCenter, setMapCenter] = useState<LatLngExpression>([20, 0]);
  const [mapZoom, setMapZoom] = useState(2);

  // API-Abfrage für Standorte
  const { data: locations = [], isLoading, error } = useQuery<LocationData[]>({
    queryKey: ["/api/locations"],
  });

  // Wenn Standorte geladen werden, Karte entsprechend positionieren
  useEffect(() => {
    if (locations.length > 0 && !selectedLocation) {
      try {
        const avgLat = locations.reduce((sum, loc) => sum + parseFloat(loc.latitude), 0) / locations.length;
        const avgLng = locations.reduce((sum, loc) => sum + parseFloat(loc.longitude), 0) / locations.length;
        
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
  const handleLocationSelect = (location: LocationData) => {
    setSelectedLocation(location);
    setShowLocationDetails(true);
    if (isMobile) {
      setShowSidebar(false);
    }
  };

  // Handler zum Fokussieren eines Standorts auf der Karte
  const handleLocationFocus = (location: LocationData) => {
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
      <header className="bg-card shadow-sm h-20 relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-primary flex-shrink-0">
              <img 
                src={coupleTravelImage} 
                alt="Couple traveling" 
                className="h-full w-full object-cover"
              />
            </div>
            <h1 className="text-2xl font-bold font-heading text-foreground bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Susibert</h1>
          </div>
          <div className="flex items-center space-x-4 relative z-50">
            {isMobile && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowSidebar(!showSidebar)}
                className="md:hidden relative z-50"
              >
                <List className="h-4 w-4 mr-2" />
                Locations
              </Button>
            )}
            <div className="relative z-50">
              <ThemeModeToggle />
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout}
              className="relative z-50"
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
                  {/* Der initial ausgelieferte Zustand ist nur das Fundament - react-leaflet ersetzt dies beim Mounten */}
                  <MapContainer 
                    style={{ height: "100%", width: "100%" }} 
                    zoom={2} 
                    center={[20, 0] as LatLngExpression}
                    zoomControl={true} 
                    minZoom={2}
                    maxZoom={8}
                    scrollWheelZoom={true}
                    dragging={true}
                    worldCopyJump={true}
                  >
                    {/* Controller zur Aktualisierung der Kartenansicht */}
                    <MapController 
                      center={mapCenter} 
                      zoom={mapZoom} 
                    />
                    
                    {/* Kartenstil mit reduziertem Detail und Pastellfarben */}
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    />
                    
                    {/* GeoJSON-Layer für besuchte Länder */}
                    <GeoJSON 
                      key="countries-geojson"
                      data={countriesData as unknown as FeatureCollection}
                      style={(feature?: Feature) => {
                        if (!feature || !feature.properties) return {};
                        
                        const countryCode = feature.properties.ISO_A2;
                        
                        // Prüfen, ob das Land in unseren Standorten vorkommt
                        const isVisited = locations.some(location => 
                          location.countryCode.toUpperCase() === countryCode
                        );
                        
                        return {
                          fillColor: isVisited ? '#e189f5' : 'transparent', // Pastell Lila für besuchte Länder
                          weight: 1,
                          color: '#555',
                          fillOpacity: 0.4,
                          opacity: 0.5
                        };
                      }}
                    />
                    
                    {/* Marker für alle Standorte */}
                    {locations.map((location) => (
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
