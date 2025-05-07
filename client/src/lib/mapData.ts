// World map data in GeoJSON format for React Simple Maps
import { feature } from "topojson-client";

// We need to use require here because the static JSON import is not working correctly
const worldData = require("world-atlas/countries-110m.json");

// Initialize with a basic GeoJSON structure
const geoData = {
  type: "FeatureCollection",
  features: []
};

try {
  // Try to convert TopoJSON to GeoJSON using the feature function
  const geoFeatures = feature(
    worldData as any,
    (worldData as any).objects.countries
  );
  
  // Update our features with the converted features
  if (geoFeatures && geoFeatures.features) {
    geoData.features = geoFeatures.features.map((feat: any) => {
      // Make sure each feature has the ISO_A2 property for country code matching
      const props = feat.properties || {};
      return {
        ...feat,
        properties: {
          ...props,
          ISO_A2: props.iso_a2 || "XX"
        }
      };
    });
  }
} catch (error) {
  console.error("Error processing map data:", error);
}

export const worldGeoData = geoData;
