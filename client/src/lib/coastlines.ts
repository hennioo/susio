/**
 * Spezielle Küstenlinien für ausgewählte Städte
 * 
 * Diese Daten definieren Polygone, die die Landmasse für bestimmte Städte repräsentieren
 * und werden verwendet, um den Farbverlauf auf die Landmasse zu beschränken.
 */

export interface CoastPolygon {
  name: string;
  coordinates: number[][];
}

export const coastPolygons: Record<string, CoastPolygon> = {
  // Barcelona (Spanien) - mit einfacher Küstenlinie
  'Barcelona, Spain': {
    name: 'Barcelona Coastal Area',
    coordinates: [
      // Ein vereinfachtes Polygon, das die Landmasse von Barcelona darstellt
      // Format: [lng, lat]
      [2.054, 41.407], // Nordwestecke
      [2.234, 41.456], // Nordostecke 
      [2.234, 41.370], // Südostecke
      [2.168, 41.351], // Küstenpunkt Südosten
      [2.140, 41.368], // Küstenpunkt nahe Stadtzentrum
      [2.054, 41.370], // Südwestecke
      [2.054, 41.407]  // Schließt das Polygon
    ]
  }
};

/**
 * Prüft, ob ein Punkt innerhalb eines Polygons liegt
 * 
 * @param x x-Koordinate (Longitude/Längengrad)
 * @param y y-Koordinate (Latitude/Breitengrad)
 * @param polygon Array von [x,y] Koordinaten, die das Polygon definieren
 * @returns true, wenn der Punkt im Polygon liegt, sonst false
 */
export function isPointInPolygon(x: number, y: number, polygon: number[][]): boolean {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i][0], yi = polygon[i][1];
    const xj = polygon[j][0], yj = polygon[j][1];
    
    const intersect = ((yi > y) !== (yj > y))
      && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  
  return inside;
}

/**
 * Findet die Küstenlinie für einen bestimmten Standort
 * 
 * @param locationName Der Name des Standorts (muss genau übereinstimmen)
 * @returns Das Küstenpolygon oder null, wenn keine Küstenlinie definiert ist
 */
export function getCoastPolygon(locationName: string): CoastPolygon | null {
  return coastPolygons[locationName] || null;
}

/**
 * Bestimmt, ob ein Punkt auf dem Land liegt (innerhalb der Küstenlinie)
 * 
 * @param lng Längengrad
 * @param lat Breitengrad
 * @param locationName Name des Standorts zur Identifikation der Küstenlinie
 * @returns true, wenn der Punkt auf Land liegt, false sonst
 */
export function isPointOnLand(lng: number, lat: number, locationName: string): boolean {
  const coast = getCoastPolygon(locationName);
  if (!coast) return true; // Wenn keine Küste definiert ist, gehen wir davon aus, dass alles Land ist
  
  return isPointInPolygon(lng, lat, coast.coordinates);
}

/**
 * Berechnet den Abstand zwischen zwei Punkten (in km)
 * 
 * @param lat1 Breitengrad Punkt 1
 * @param lng1 Längengrad Punkt 1
 * @param lat2 Breitengrad Punkt 2
 * @param lng2 Längengrad Punkt 2
 * @returns Entfernung in Kilometern
 */
export function getDistanceFromLatLonInKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; // Radius der Erde in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lng2 - lng1);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const d = R * c; // Entfernung in km
  return d;
}

function deg2rad(deg: number): number {
  return deg * (Math.PI/180);
}