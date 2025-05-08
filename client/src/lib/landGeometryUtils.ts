import * as turf from '@turf/turf';
import type { Feature, FeatureCollection, Point, Polygon, MultiPolygon, Position } from 'geojson';

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
  maxRadiusKm: number = 50, // 50km Radius
  steps: number = 100 // Erhöhte Anzahl der Kreise für nahtlose Übergänge
): Array<{
  radius: number,
  opacity: number,
  fillColor: string
}> {
  const result = [];
  
  for (let i = 0; i < steps; i++) {
    const progress = i / steps;
    
    // Berechne abnehmenden Radius mit extrem sanftem Übergang
    // Linearer Abstieg für gleichmäßigste Abstände
    const radius = maxRadiusKm * 1000 * (1 - progress);
    
    // Sehr niedrige Opazität für jeden einzelnen Kreis, damit der Kartengrund sichtbar bleibt
    // Die Gesamtopazität ergibt sich aus der Überlagerung aller Kreise
    const opacity = 0.008 + (Math.pow(progress, 2.5) * 0.03);
    
    // Farbverlauf von hellem zu dunklem Orange
    const hue = 38; // Orange-Farbton exakt wie gewünscht (RGB 242,150,12)
    const saturation = 91; // Hohe Sättigung für kräftiges Orange
    const lightness = 70 - (progress * 40); // Von hell nach deutlich dunkler
    const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    
    result.push({
      radius,
      opacity,
      fillColor: color
    });
  }
  
  return result;
}