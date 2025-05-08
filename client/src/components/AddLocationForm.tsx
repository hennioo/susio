import { useState, ChangeEvent, FormEvent } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Camera, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddLocationFormProps {
  markerPosition?: [number, number]; // [latitude, longitude]
  onCancel: () => void;
  onSuccess: (locationId: number) => void;
}

export default function AddLocationForm({ markerPosition, onCancel, onSuccess }: AddLocationFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    highlight: "", // Behalten für Kompatibilität mit der API, aber nicht anzeigen
    latitude: markerPosition ? markerPosition[0].toString() : "",
    longitude: markerPosition ? markerPosition[1].toString() : "",
    countryCode: "", // Behalten für Kompatibilität mit der API, aber nicht anzeigen
  });

  // Bild-Upload-Handling
  const [photo, setPhoto] = useState<File | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Überprüfe die Dateigröße (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Fehler",
          description: "Das Bild darf nicht größer als 5MB sein.",
          variant: "destructive"
        });
        return;
      }
      
      // Überprüfe den Dateityp
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Fehler",
          description: "Bitte wähle eine Bilddatei aus.",
          variant: "destructive"
        });
        return;
      }
      
      setPhoto(file);
      
      // Erstelle eine Vorschau
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formData.name || !formData.latitude || !formData.longitude) {
      toast({
        title: "Fehler",
        description: "Bitte gib mindestens einen Namen und die Position an.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Erstelle FormData für den Upload (mit Bild)
      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("description", formData.description);
      submitData.append("highlight", ""); // Immer leer senden, da nicht mehr verwendet
      // Formatiere das Datum als "Monat Jahr"
      const monthNames = [
        "Januar", "Februar", "März", "April", "Mai", "Juni", 
        "Juli", "August", "September", "Oktober", "November", "Dezember"
      ];
      const dateStr = date ? `${monthNames[date.getMonth()]} ${date.getFullYear()}` : "";
      submitData.append("date", dateStr);
      submitData.append("latitude", formData.latitude);
      submitData.append("longitude", formData.longitude);
      submitData.append("countryCode", ""); // Immer leer senden, da nicht mehr verwendet
      
      if (photo) {
        submitData.append("image", photo);
      }
      
      // Sende die Daten an den Server
      const response = await fetch("/api/locations", {
        method: "POST",
        body: submitData
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Fehler beim Hinzufügen des Ortes.");
      }
      
      const newLocation = await response.json();
      
      toast({
        title: "Erfolg!",
        description: `Der Ort "${formData.name}" wurde erfolgreich hinzugefügt.`
      });
      
      // Rufe die Callback-Funktion mit der ID des neuen Ortes auf
      onSuccess(newLocation.id);
    } catch (error) {
      console.error("Error adding location:", error);
      toast({
        title: "Fehler",
        description: error instanceof Error ? error.message : "Unbekannter Fehler beim Hinzufügen des Ortes.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 bg-card rounded-lg shadow-md border border-border max-w-md mx-auto max-h-[90vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-primary">Neuen Ort hinzufügen</h2>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onCancel}
          className="h-8 w-8"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Position (versteckt, wird automatisch gesetzt) */}
        <input
          type="hidden"
          id="latitude"
          name="latitude"
          value={formData.latitude}
          onChange={handleChange}
          required
        />
        <input
          type="hidden"
          id="longitude"
          name="longitude"
          value={formData.longitude}
          onChange={handleChange}
          required
        />
        
        <div className="py-1">
          <div className="flex items-center gap-2 mb-1">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Position auf der Karte markiert</span>
          </div>
          <div className="text-xs text-muted-foreground italic">
            {markerPosition ? 
              "Du kannst die Karte schließen und einen neuen Ort markieren, wenn du einen anderen Ort wählen möchtest." :
              "Bitte markiere zuerst eine Position auf der Karte."}
          </div>
        </div>
        
        {/* Ortsname */}
        <div>
          <Label htmlFor="name">Ortsname</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="z.B. Barcelona, Spanien"
            required
            className="mt-1"
          />
        </div>
        
        {/* Datum (nur Jahr und Monat) */}
        <div>
          <Label>Jahr und Monat des Besuchs</Label>
          <div className="grid grid-cols-2 gap-3 mt-1">
            {/* Jahr auswählen */}
            <div>
              <select 
                className="w-full px-3 py-2 border border-input rounded-md bg-background"
                value={date ? date.getFullYear() : new Date().getFullYear()}
                onChange={(e) => {
                  const year = parseInt(e.target.value);
                  const newDate = date ? new Date(date) : new Date();
                  newDate.setFullYear(year);
                  setDate(newDate);
                }}
              >
                {Array.from({ length: 31 }, (_, i) => 2000 + i).map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            
            {/* Monat auswählen */}
            <div>
              <select 
                className="w-full px-3 py-2 border border-input rounded-md bg-background"
                value={date ? date.getMonth() : new Date().getMonth()}
                onChange={(e) => {
                  const month = parseInt(e.target.value);
                  const newDate = date ? new Date(date) : new Date();
                  newDate.setMonth(month);
                  setDate(newDate);
                }}
              >
                {[
                  "Januar", "Februar", "März", "April", "Mai", "Juni", 
                  "Juli", "August", "September", "Oktober", "November", "Dezember"
                ].map((month, index) => (
                  <option key={index} value={index}>{month}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {/* Beschreibung */}
        <div>
          <Label htmlFor="description">Beschreibung (optional)</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Beschreibe eure Erlebnisse..."
            className="mt-1 min-h-24"
          />
        </div>
        
        {/* Highlight-Feld entfernt */}
        
        {/* Bild-Upload */}
        <div>
          <Label className="mb-2 block">Foto (optional)</Label>
          
          {photoPreview ? (
            <div className="relative rounded-md overflow-hidden mb-2 max-h-64">
              <img 
                src={photoPreview} 
                alt="Vorschau" 
                className="w-full object-cover"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8 bg-opacity-70"
                onClick={() => {
                  setPhoto(null);
                  setPhotoPreview(null);
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-md p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors relative">
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handlePhotoChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Camera className="h-8 w-8 mx-auto text-muted-foreground" />
              <p className="text-sm text-muted-foreground mt-2">Bild hochladen (max. 5MB)</p>
            </div>
          )}
          <p className="text-xs text-muted-foreground mt-1">
            Unterstützte Formate: JPG, PNG, GIF
          </p>
        </div>
        
        {/* Ländercode-Feld entfernt */}
        
        {/* Buttons */}
        <div className="flex gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
            className="flex-1"
          >
            Abbrechen
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting || !formData.name || !formData.latitude || !formData.longitude}
            className="flex-1"
          >
            {isSubmitting ? "Wird gespeichert..." : "Speichern"}
          </Button>
        </div>
      </form>
    </div>
  );
}