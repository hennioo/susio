import { Location } from "@shared/schema";
import { MapPin, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

interface LocationListProps {
  locations: Location[];
  isLoading: boolean;
  onSelectLocation: (location: Location) => void;
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
        <h2 className="text-xl font-bold font-heading text-gray-800">Our Destinations</h2>
        {isMobile && (
          <button 
            onClick={onCloseSidebar}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
      
      <ScrollArea className="flex-grow pr-2">
        <div className="divide-y divide-gray-200">
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
            <p className="py-6 text-center text-gray-500">No destinations found</p>
          ) : (
            locations.map((location) => (
              <div 
                key={location.id} 
                className="py-3 cursor-pointer hover:bg-gray-50 transition"
                onClick={() => onSelectLocation(location)}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{location.name}</h3>
                    <p className="text-xs text-gray-500">{location.date}</p>
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
