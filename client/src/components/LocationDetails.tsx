import type { LocationData } from "./TravelMap";
import { X, Heart, Trash2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

interface LocationDetailsProps {
  location: LocationData;
  onClose: () => void;
  onViewOnMap: () => void;
  onDelete?: (id: number) => void;
  isEditMode?: boolean;
}

export default function LocationDetails({ 
  location, 
  onClose, 
  onViewOnMap, 
  onDelete, 
  isEditMode = false 
}: LocationDetailsProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  
  // Handle clicks outside the modal content to close it
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  // Funktion zum Löschen des Ortes
  const handleDelete = () => {
    if (onDelete) {
      onDelete(location.id);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <Card className="max-w-md w-full mx-auto overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="relative">
          <img 
            src={location.image} 
            alt={`View of ${location.name}`}
            className="w-full h-48 object-cover"
          />
          <Button
            size="icon"
            variant="outline"
            className="absolute top-2 right-2 bg-white bg-opacity-80 rounded-full h-8 w-8"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <CardContent className="p-5">
          <h3 className="text-xl font-bold font-heading text-foreground mb-1">{location.name}</h3>
          <p className="text-sm text-muted-foreground mb-3">{location.date}</p>
          
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-foreground mb-1">Our Experience</h4>
            <p className="text-sm text-muted-foreground">
              {location.description}
            </p>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground flex items-center">
              <Heart className="h-4 w-4 text-primary mr-1" />
              <span>{location.highlight}</span>
            </div>
            
            <div className="flex gap-2">
              {isEditMode && onDelete && !confirmDelete && (
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => setConfirmDelete(true)}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Löschen
                </Button>
              )}
              
              {isEditMode && confirmDelete && (
                <>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={handleDelete}
                  >
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    Bestätigen
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setConfirmDelete(false)}
                  >
                    Abbrechen
                  </Button>
                </>
              )}
              
              {(!isEditMode || !confirmDelete) && (
                <Button
                  size="sm"
                  className="bg-primary hover:bg-primary/90"
                  onClick={onViewOnMap}
                >
                  View on Map
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
