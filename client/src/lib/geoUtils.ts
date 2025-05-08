import * as turf from '@turf/turf';
import { point, circle, polygon, featureCollection } from '@turf/helpers';
import mask from '@turf/mask';
import booleanContains from '@turf/boolean-contains';
import worldLand from 'world-atlas/land-110m.json';
import type { Feature, FeatureCollection, Point, Polygon, MultiPolygon, Position } from 'geojson';

// WorldLand beinhaltet die GeoJSON-Daten für alle Landmassen der Erde
const worldLandFeatures = worldLand as FeatureCollection;

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
    // Erstelle einen Kreis mit dem angegebenen Radius
    const centerPoint = point([centerLng, centerLat]);
    const circleFeature = circle([centerLng, centerLat], radiusInMeters / 1000, {
      steps: steps,
      units: 'kilometers'
    });
    
    // Finde das Land unter dem Punkt (wenn möglich)
    let landFeatures = worldLandFeatures.features;
    
    // Erzwinge Konvertierung zu Feature<Polygon>[]
    const polygonFeatures = landFeatures.filter(f => 
      f.geometry.type === 'Polygon' || f.geometry.type === 'MultiPolygon'
    ) as Feature<Polygon | MultiPolygon>[];
    
    // Finde Land, das den Punkt enthält
    let landMass = null;
    for (const feature of polygonFeatures) {
      try {
        if (booleanContains(feature, centerPoint)) {
          landMass = feature;
          break;
        }
      } catch (e) {
        console.warn('Error checking if point is contained in land feature:', e);
      }
    }
    
    if (!landMass) {
      return circleFeature; // Fallback zum normalen Kreis, wenn kein Land gefunden wird
    }
    
    // Schnittmenge des Kreises mit dem Land bilden
    try {
      // Mask funktioniert gut, um GeoJSON-Features zu beschneiden
      const maskedCircle = mask(featureCollection([circleFeature]), featureCollection([landMass]));
      return maskedCircle.features[0] as Feature<Polygon>;
    } catch (e) {
      console.error('Error creating land-restricted circle:', e);
      return circleFeature; // Fallback zum normalen Kreis
    }
  } catch (e) {
    console.error('Error in createLandRestrictedCircle:', e);
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
  maxRadius: number = 30000,
  steps: number = 30
): Array<{
  radius: number,
  opacity: number,
  fillColor: string,
  geoJsonFeature?: Feature<Polygon | MultiPolygon> | null
}> {
  const result = [];
  
  for (let i = 0; i < steps; i++) {
    const progress = i / steps;
    
    // Berechne abnehmenden Radius
    const radius = maxRadius * (1 - Math.pow(progress, 0.8));
    
    // Berechne zunehmende Opazität
    const opacity = 0.04 + (Math.pow(progress, 2.2) * 0.5);
    
    // Farbverlauf von hellem zu dunklem Orange
    const hue = 38; // Orange-Farbton exakt wie gewünscht (RGB 242,150,12)
    const saturation = 91; // Hohe Sättigung für kräftiges Orange
    const lightness = 70 - (progress * 40); // Von hell nach deutlich dunkler
    const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    
    // Nur für bestimmte Stufen den aufwändigen Land-Umriss berechnen
    // um Performance zu sparen (jeder 5. Kreis)
    let geoJsonFeature = null;
    if (i % 5 === 0) {
      try {
        geoJsonFeature = createLandRestrictedCircle(centerLat, centerLng, radius);
      } catch (e) {
        console.error(`Error creating GeoJSON for gradient step ${i}:`, e);
      }
    }
    
    result.push({
      radius,
      opacity,
      fillColor: color,
      geoJsonFeature
    });
  }
  
  return result;
}