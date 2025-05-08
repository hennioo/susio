import { useState, useEffect, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/lib/auth.tsx";
import { useLocation } from "wouter";
import LocationList from "./LocationList";
import LocationDetails from "./LocationDetails";
import AddLocationForm from "./AddLocationForm";
import { ThemeModeToggle } from "./ThemeModeToggle";
import { Button } from "@/components/ui/button";
import { List, LogOut, Plus, Map, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import coupleTravelImage from "../assets/couple-travel.png";
import { createLandRestrictedGradient } from "@/lib/geoUtils";
import * as turf from '@turf/turf';

// Leaflet Imports
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle, GeoJSON } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import L from "leaflet";
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

// Gold/Orange Marker für besuchte Orte (RGB 242,150,12 ist näher an Gold als an Standard-Orange)
const VisitedIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png",
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

// MapClickHandler - Komponente, die Klick-Events auf der Karte abfängt
function MapClickHandler({ isEditing, onMapClick }: { isEditing: boolean, onMapClick: (lat: number, lng: number) => void }) {
  const map = useMap();
  
  useEffect(() => {
    // Nur wenn der Bearbeitungsmodus aktiv ist, Klick-Event hinzufügen
    if (isEditing) {
      const handleMapClick = (e: L.LeafletMouseEvent) => {
        const { lat, lng } = e.latlng;
        onMapClick(lat, lng);
      };
      
      map.on('click', handleMapClick);
      
      // Event-Listener entfernen, wenn die Komponente unmountet oder isEditing sich ändert
      return () => {
        map.off('click', handleMapClick);
      };
    }
  }, [map, isEditing, onMapClick]);
  
  return null;
}

export default function TravelMap() {
  const [, setLocation] = useLocation();
  const { logout } = useAuth();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const queryClient = useQueryClient();
  
  // Zustandsverwaltung
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);
  const [showLocationDetails, setShowLocationDetails] = useState(false);
  const [showSidebar, setShowSidebar] = useState(!isMobile);
  // Deutschland als Standardzentrum (51.1657, 10.4515 ist die geografische Mitte Deutschlands)
  const [mapCenter, setMapCenter] = useState<LatLngExpression>([51.1657, 10.4515]);
  const [mapZoom, setMapZoom] = useState(5); // Näher herangezoomt, um Deutschland gut zu sehen
  
  // Bearbeitungsmodus
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAddingLocation, setIsAddingLocation] = useState(false);
  const [newLocationMarker, setNewLocationMarker] = useState<[number, number] | null>(null);

  // API-Abfrage für Standorte
  const { data: locations = [], isLoading, error } = useQuery<LocationData[]>({
    queryKey: ["/api/locations"],
  });

  // Wir verwenden keinen automatischen Durchschnitt mehr, da wir immer Deutschland als Zentrum haben wollen
  // Wir behalten aber den useEffect für zukünftige Änderungen
  useEffect(() => {
    // Nichts tun - standardmäßig auf Deutschland zentriert bleiben
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
  
  // Editiermodus aktivieren/deaktivieren
  const toggleEditMode = () => {
    // Wenn wir den Bearbeitungsmodus verlassen, alle zugehörigen Zustände zurücksetzen
    if (isEditMode) {
      setNewLocationMarker(null);
      setIsAddingLocation(false);
    }
    
    setIsEditMode(prev => !prev);
    
    toast({
      title: isEditMode ? "Bearbeitungsmodus deaktiviert" : "Bearbeitungsmodus aktiviert",
      description: isEditMode 
        ? "Du kannst jetzt wieder die Karte erkunden." 
        : "Klicke auf die Karte, um einen neuen Ort hinzuzufügen."
    });
  };
  
  // Erfolgreiche Hinzufügung eines neuen Ortes
  const handleLocationAdded = (locationId: number) => {
    // Bearbeitungsmodus und Formular zurücksetzen
    setIsAddingLocation(false);
    setNewLocationMarker(null);
    
    // QueryCache aktualisieren, um den neuen Ort anzuzeigen
    queryClient.invalidateQueries({ queryKey: ["/api/locations"] });
    
    toast({
      title: "Ort hinzugefügt!",
      description: "Der neue Ort wurde erfolgreich hinzugefügt."
    });
  };
  
  // Ort löschen
  const handleLocationDelete = async (locationId: number) => {
    try {
      const response = await fetch(`/api/locations/${locationId}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Fehler beim Löschen des Ortes");
      }
      
      // Details-Modal schließen
      setShowLocationDetails(false);
      setSelectedLocation(null);
      
      // QueryCache aktualisieren
      queryClient.invalidateQueries({ queryKey: ["/api/locations"] });
      
      toast({
        title: "Ort gelöscht",
        description: "Der Ort wurde erfolgreich gelöscht."
      });
    } catch (error) {
      console.error("Error deleting location:", error);
      toast({
        title: "Fehler",
        description: error instanceof Error ? error.message : "Unbekannter Fehler beim Löschen",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header mit sehr hohem z-index damit alles immer über der Karte liegt */}
      <header className="bg-card shadow-sm h-20 fixed top-0 left-0 right-0 z-[1000]" style={{ zIndex: 1000 }}>
        <div className="max-w-7xl mx-auto px-2 sm:px-4 h-full flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-primary flex-shrink-0">
              <img 
                src={coupleTravelImage} 
                alt="Couple traveling" 
                className="h-full w-full object-cover"
              />
            </div>
            <h1 className="text-xl font-bold font-heading text-foreground bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Susibert</h1>
          </div>
          <div className="flex items-center space-x-2">
            {isMobile && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowSidebar(!showSidebar)}
                className="md:hidden z-[1001] px-2"
                style={{ zIndex: 1001 }}
              >
                <List className="h-4 w-4" />
                <span className="sr-only">Locations</span>
              </Button>
            )}
            <div>
              <ThemeModeToggle />
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout}
              className="z-[1001] !px-2"
              style={{ zIndex: 1001 }}
            >
              <LogOut className="h-4 w-4" />
              <span className="sr-only md:not-sr-only md:ml-2">Exit</span>
            </Button>
          </div>
        </div>
      </header>
      
      {/* Platz für den Header */}
      <div className="h-20"></div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bearbeitungsmodus-Steuerung */}
        <div className="flex justify-between items-center py-2">
          <div>
            <Button
              variant={isEditMode ? "destructive" : "outline"}
              size="sm"
              onClick={toggleEditMode}
              className="space-x-1"
            >
              {isEditMode ? (
                <>
                  <Map className="h-4 w-4" />
                  <span>Bearbeiten beenden</span>
                </>
              ) : (
                <>
                  <Edit className="h-4 w-4" />
                  <span>Orte bearbeiten</span>
                </>
              )}
            </Button>
          </div>
          
          {isEditMode && (
            <div className="text-sm text-muted-foreground">
              Klicke auf die Karte, um einen neuen Ort hinzuzufügen
            </div>
          )}
        </div>
        
        <div className="flex flex-col md:flex-row py-2 gap-4">
          {/* Map container */}
          <div className="w-full md:w-3/4 bg-card rounded-xl shadow-md overflow-hidden">
            <div className="h-[calc(100vh-9rem)] md:h-[calc(100vh-9rem)]">
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
                    zoom={5} 
                    center={[51.1657, 10.4515] as LatLngExpression}
                    zoomControl={true} 
                    minZoom={2}
                    maxZoom={10}
                    scrollWheelZoom={true}
                    dragging={true}
                    worldCopyJump={true}
                  >
                    {/* Controller zur Aktualisierung der Kartenansicht */}
                    <MapController 
                      center={mapCenter} 
                      zoom={mapZoom} 
                    />
                    
                    {/* CartoDB Positron - Minimalistischer, clean-design Kartenstil (ähnlich Toner Lite) */}
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                      url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                      subdomains="abcd"
                      minZoom={1}
                      maxZoom={19}
                    />
                    
                    {/* Kreise für besuchte Orte mit Farbverlauf (Gradient) */}
                    {locations.map((location) => {
                      const lat = parseFloat(location.latitude);
                      const lng = parseFloat(location.longitude);
                      
                      // Erzeugt Kreise mit abnehmendem Radius und zunehmender Intensität
                      const circles = [];
                      const maxRadius = 50000; // 50km Radius
                      const steps = 30;
                      
                      for (let i = 0; i < steps; i++) {
                        const progress = i / steps;
                        
                        // Berechne abnehmenden Radius
                        const radius = maxRadius * (1 - Math.pow(progress, 0.8));
                        
                        // Stark verbesserte Opazitätsfunktion - fast vollständige Transparenz im Zentrum
                        // und nur an den äußeren Rändern wird der Farbverlauf sichtbar
                        let opacity = 0;
                        
                        if (i < steps * 0.6) {
                          // Innerste 60% der Kreise sind extrem transparent
                          opacity = 0.001 + (progress * 0.01); // Minimale Sichtbarkeit (0.1%-1.1%)
                        } else if (i < steps * 0.8) {
                          // Mittlere Kreise haben geringe Transparenz
                          opacity = 0.01 + (progress * 0.05); // 1.1% bis 6%
                        } else {
                          // Nur die äußersten 20% der Kreise werden intensiver für den Effekt
                          opacity = 0.025 + (Math.pow(progress, 2) * 0.15); // 2.5% bis 17.5%
                        }
                        
                        // Farbverlauf von hellem zu dunklem Orange
                        const hue = 38; // Orange-Farbton exakt wie gewünscht (RGB 242,150,12)
                        const saturation = 91; // Hohe Sättigung für kräftiges Orange
                        const lightness = 70 - (progress * 40); // Von hell nach deutlich dunkler
                        const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
                        
                        circles.push(
                          <Circle
                            key={`circle-${location.id}-${i}`}
                            center={[lat, lng]}
                            radius={radius}
                            pathOptions={{
                              fillColor: color,
                              fillOpacity: opacity,
                              color: 'transparent',
                              weight: 0
                            }}
                          />
                        );
                      }
                      
                      return (
                        <div key={`circle-group-${location.id}`}>
                          {circles}
                        </div>
                      );
                    })}
                    
                    {/* Klick-Event-Handler für den Bearbeitungsmodus */}
                    <MapClickHandler 
                      isEditing={isEditMode} 
                      onMapClick={(lat, lng) => {
                        // Setze den neuen Marker an die geklickte Position
                        setNewLocationMarker([lat, lng]);
                        // Aktiviere das Hinzufügen-Formular
                        setIsAddingLocation(true);
                      }} 
                    />
                    
                    {/* Marker für alle Standorte */}
                    {locations.map((location) => (
                      <Marker
                        key={location.id}
                        position={[parseFloat(location.latitude), parseFloat(location.longitude)]}
                        icon={VisitedIcon}
                        eventHandlers={{
                          click: () => {
                            // Im Bearbeitungsmodus keine Details anzeigen
                            if (!isEditMode) {
                              handleLocationSelect(location);
                            }
                          }
                        }}
                      >
                        <Popup>
                          <div className="font-medium">{location.name}</div>
                          <div className="text-sm text-muted-foreground">{location.date}</div>
                        </Popup>
                      </Marker>
                    ))}
                    
                    {/* Temporärer Marker für neue Standorte */}
                    {isEditMode && newLocationMarker && (
                      <Marker
                        position={newLocationMarker}
                        icon={new L.Icon({
                          iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
                          shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
                          iconSize: [25, 41],
                          iconAnchor: [12, 41],
                          popupAnchor: [1, -34],
                          shadowSize: [41, 41]
                        })}
                      >
                        <Popup>
                          <div className="text-sm">Neuer Standort</div>
                          <div className="text-xs text-muted-foreground">
                            Lat: {newLocationMarker[0].toFixed(4)}, Lng: {newLocationMarker[1].toFixed(4)}
                          </div>
                        </Popup>
                      </Marker>
                    )}
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
          onDelete={isEditMode ? handleLocationDelete : undefined}
          isEditMode={isEditMode}
        />
      )}
      
      {/* Add Location Form */}
      {isAddingLocation && newLocationMarker && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[1001]">
          <AddLocationForm
            markerPosition={newLocationMarker}
            onCancel={() => {
              setIsAddingLocation(false);
              setNewLocationMarker(null);
            }}
            onSuccess={handleLocationAdded}
          />
        </div>
      )}
    </div>
  );
}
