import { MapPin, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import type { LocationData } from "./TravelMap";

interface LocationListProps {
  locations: LocationData[];
  isLoading: boolean;
  onSelectLocation: (location: LocationData) => void;
  onCloseSidebar: () => void;
  isMobile: boolean;
}

export default function LocationList({
  locations,
  isLoading,
  onSelectLocation,
  onCloseSidebar,
  isMobile
}: LocationListProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold font-heading text-foreground">Our Destinations</h2>
        {isMobile && (
          <button 
            onClick={onCloseSidebar}
            className="text-muted-foreground hover:text-foreground"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
      
      <ScrollArea className="flex-grow pr-2">
        <div className="divide-y divide-border">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="py-3">
                <div className="flex items-start space-x-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
              </div>
            ))
          ) : locations.length === 0 ? (
            <p className="py-6 text-center text-muted-foreground">No destinations found</p>
          ) : (
            locations.map((location) => (
              <div 
                key={location.id} 
                className="py-3 cursor-pointer hover:bg-muted transition duration-200"
                onClick={() => onSelectLocation(location)}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-foreground">{location.name}</h3>
                    <p className="text-xs text-muted-foreground">{location.date}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
