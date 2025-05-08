import * as turf from '@turf/turf';
import type { Feature, FeatureCollection, Polygon, MultiPolygon } from 'geojson';
import { worldLandBoundaries } from './landBoundaries';

/**
 * Erstellt einen auf Land beschränkten Kreis (GeoJSON) für die Visualisierung
 * @param centerLat Breitengrad des Kreismittelpunkts
 * @param centerLng Längengrad des Kreismittelpunkts
 * @param radiusInMeters Radius des Kreises in Metern
 * @param steps Anzahl der Punkte im Umfang des Kreises (mehr = glatter)
 * @returns GeoJSON Feature eines auf Land beschränkten Kreises
 */
export function createLandRestrictedCircle(
  centerLat: number, 
  centerLng: number, 
  radiusInMeters: number,
  steps: number = 64
): Feature<Polygon | MultiPolygon> | null {
  try {
    // Kreiere einen Punkt an der gewünschten Position
    const center = turf.point([centerLng, centerLat]);
    
    // Erstelle einen Kreis um diesen Punkt herum
    const circle = turf.circle(center, radiusInMeters / 1000, {
      steps: steps,
      units: 'kilometers',
    });
    
    // Hole unsere vereinfachte Landkarte
    const landMass = worldLandBoundaries;
    
    // Berechne die Schnittmenge (Intersection) des Kreises mit dem Land
    // Dies gibt uns nur den Teil des Kreises, der über Land liegt
    // worldLandBoundaries ist eine FeatureCollection, wir müssen die features[0] auswählen
    const landFeature = landMass.features[0];
    const intersection = turf.intersect(circle, landFeature as any);
    
    // Wenn es keine Schnittmenge gibt (z.B. mitten im Ozean), geben wir null zurück
    if (!intersection) {
      return null;
    }
    
    return intersection;
  } catch (error) {
    console.error("Fehler beim Erstellen des landbeschränkten Kreises:", error);
    return null;
  }
}

/**
 * Erzeugt einen GeoJSON-Feature für einen Farbverlauf-Effekt, der auf Land beschränkt ist
 * @param centerLat Breitengrad des Mittelpunkts
 * @param centerLng Längengrad des Mittelpunkts
 * @param maxRadius Maximaler Radius in Metern
 * @param steps Anzahl der Abstufungen im Farbverlauf
 * @returns Array von GeoJSON-Features mit abnehmender Größe und zunehmender Opazität
 */
export function createLandRestrictedGradient(
  centerLat: number,
  centerLng: number,
  maxRadius: number,
  steps: number = 30
): Array<{
  feature: Feature<Polygon | MultiPolygon> | null,
  opacity: number,
  color: string
}> {
  const result = [];
  
  for (let i = 0; i < steps; i++) {
    const progress = i / steps;
    
    // Berechne Radius, der mit jedem Schritt abnimmt
    // Nicht-lineare Abnahme für mehr Dichte an den Übergängen
    const radius = maxRadius * (1 - Math.pow(progress, 0.8));
    
    // Berechne Opazität, die mit jedem Schritt zunimmt
    // Sanfte Kurve für einen sehr natürlichen Verlauf
    const opacity = 0.04 + (Math.pow(progress, 2.2) * 0.5);
    
    // Farbverlauf basierend auf dem gewünschten Orange RGB(242, 150, 12)
    const hue = 38; // Orange-Farbton exakt wie gewünscht
    const saturation = 91; // Hohe Sättigung für kräftiges Orange
    const lightness = 70 - (progress * 40); // Von hell nach deutlich dunkler
    
    // Erzeuge den landbeschränkten Kreis mit aktuellem Radius
    const landRestrictedCircle = createLandRestrictedCircle(
      centerLat,
      centerLng,
      radius
    );
    
    // Füge das Feature mit seinen Styling-Informationen hinzu
    result.push({
      feature: landRestrictedCircle,
      opacity: opacity,
      color: `hsl(${hue}, ${saturation}%, ${lightness}%)`
    });
  }
  
  return result;
}