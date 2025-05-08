import * as turf from '@turf/turf';
import type { Feature, FeatureCollection, Point, Polygon, MultiPolygon, Position } from 'geojson';
import worldData from 'geojson-world-map';

// Helper to get the simplified world data for masking
const simplifiedWorldData = (worldData as any).features;

/**
 * Findet das Land, in dem der angegebene Punkt liegt
 * @param lat Breitengrad
 * @param lng Längengrad
 * @returns Das Land-Feature oder null wenn keines gefunden wurde
 */
export function findLandMassAtPoint(lat: number, lng: number): Feature<Polygon | MultiPolygon> | null {
  // Erstelle einen GeoJSON-Punkt für die angegebene Position
  const point: Feature<Point> = {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'Point',
      coordinates: [lng, lat] // GeoJSON nutzt [longitude, latitude] Format
    }
  };

  // Durchsuche alle Land-Features
  for (const feature of simplifiedWorldData) {
    try {
      if (turf.booleanPointInPolygon(point, feature)) {
        return feature;
      }
    } catch (e) {
      console.error("Error checking point in polygon:", e);
    }
  }

  return null;
}

/**
 * Erstellt ein Masking für einen Kreis, damit er nur auf Land angezeigt wird
 */
export function createLandMaskedCircle(
  centerLat: number, 
  centerLng: number, 
  radiusKm: number
): Feature<Polygon | MultiPolygon> | null {
  try {
    // Erstelle einen Punkt für das Zentrum
    const center: Position = [centerLng, centerLat];
    
    // Erstelle einen Kreis mit dem angegebenen Radius
    const circle = turf.circle(center, radiusKm, {
      steps: 64, // Höhere Auflösung für bessere Küstenlinien
      units: 'kilometers'
    });
    
    // Finde das Land, in dem der Punkt liegt
    const landMass = findLandMassAtPoint(centerLat, centerLng);
    
    if (!landMass) {
      console.log("No land mass found at point:", centerLat, centerLng);
      return circle; // Fallback zum normalen Kreis
    }
    
    try {
      // Beschränke den Kreis auf das Land, indem eine Schnittmenge gebildet wird
      const landRestrictedCircle = turf.intersect(circle, landMass);
      if (landRestrictedCircle) {
        return landRestrictedCircle;
      }
    } catch (e) {
      console.error("Error intersecting circle with land:", e);
    }
    
    return circle;
  } catch (e) {
    console.error("Error creating land-masked circle:", e);
    return null;
  }
}

/**
 * Generiert die GeoJSON-Daten für einen abgestuften Farbverlauf
 * 
 * @param centerLat Breitengrad des Mittelpunkts
 * @param centerLng Längengrad des Mittelpunkts
 * @param maxRadiusKm Maximaler Radius in Kilometern
 * @param steps Anzahl der Abstufungen im Farbverlauf
 * @returns Array mit Informationen für alle Kreise im Farbverlauf
 */
export function createLandRestrictedGradient(
  centerLat: number,
  centerLng: number,
  maxRadiusKm: number = 30,
  steps: number = 30
): Array<{
  radius: number,
  opacity: number,
  fillColor: string,
  maskedCircle?: Feature<Polygon | MultiPolygon> | null
}> {
  const result = [];
  
  // Prüfe ob der Punkt auf Land liegt
  const isOnLand = findLandMassAtPoint(centerLat, centerLng) !== null;
  
  for (let i = 0; i < steps; i++) {
    const progress = i / steps;
    
    // Berechne abnehmenden Radius
    const radius = maxRadiusKm * 1000 * (1 - Math.pow(progress, 0.8));
    
    // Berechne zunehmende Opazität
    const opacity = 0.04 + (Math.pow(progress, 2.2) * 0.5);
    
    // Farbverlauf von hellem zu dunklem Orange
    const hue = 38; // Orange-Farbton exakt wie gewünscht (RGB 242,150,12)
    const saturation = 91; // Hohe Sättigung für kräftiges Orange
    const lightness = 70 - (progress * 40); // Von hell nach deutlich dunkler
    const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    
    // Nur alle 5 Schritte einen maskedCircle erstellen, um Performance zu sparen
    // Dies ist ein Kompromiss zwischen Genauigkeit und Leistung
    let maskedCircle = null;
    if (isOnLand && i % 5 === 0) {
      try {
        maskedCircle = createLandMaskedCircle(centerLat, centerLng, radius / 1000);
      } catch (e) {
        console.error(`Error creating masked circle at step ${i}:`, e);
      }
    }
    
    result.push({
      radius,
      opacity,
      fillColor: color,
      maskedCircle
    });
  }
  
  return result;
}