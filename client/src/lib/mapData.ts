// World map data in GeoJSON format for React Simple Maps

// This is a simplified GeoJSON dataset with major countries represented as rectangular polygons
export const worldGeoData = {
  "type": "FeatureCollection",
  "features": [
    // Europe
    {
      "type": "Feature",
      "properties": { "ISO_A2": "FR", "NAME": "France" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[-5.1, 48.5], [-2.0, 42.3], [8.2, 42.2], [8.5, 49.0], [-5.1, 48.5]]]
      }
    },
    {
      "type": "Feature",
      "properties": { "ISO_A2": "DE", "NAME": "Germany" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[5.9, 47.6], [15.0, 47.3], [15.0, 54.8], [5.9, 54.8], [5.9, 47.6]]]
      }
    },
    {
      "type": "Feature",
      "properties": { "ISO_A2": "ES", "NAME": "Spain" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[-9.5, 42.0], [-9.5, 36.0], [3.5, 36.0], [3.5, 42.0], [-9.5, 42.0]]]
      }
    },
    {
      "type": "Feature",
      "properties": { "ISO_A2": "IT", "NAME": "Italy" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[7.5, 43.0], [7.5, 36.5], [18.5, 36.5], [18.5, 47.0], [7.5, 47.0], [7.5, 43.0]]]
      }
    },
    {
      "type": "Feature",
      "properties": { "ISO_A2": "GB", "NAME": "United Kingdom" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[-7.5, 49.5], [-7.5, 58.5], [2.0, 58.5], [2.0, 49.5], [-7.5, 49.5]]]
      }
    },
    {
      "type": "Feature",
      "properties": { "ISO_A2": "RU", "NAME": "Russia" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[28.0, 41.0], [28.0, 82.0], [190.0, 82.0], [190.0, 41.0], [28.0, 41.0]]]
      }
    },
    
    // North America
    {
      "type": "Feature",
      "properties": { "ISO_A2": "US", "NAME": "United States" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[-125.0, 24.0], [-125.0, 49.0], [-66.0, 49.0], [-66.0, 24.0], [-125.0, 24.0]]]
      }
    },
    {
      "type": "Feature",
      "properties": { "ISO_A2": "CA", "NAME": "Canada" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[-141.0, 48.0], [-141.0, 83.0], [-52.5, 83.0], [-52.5, 48.0], [-141.0, 48.0]]]
      }
    },
    {
      "type": "Feature",
      "properties": { "ISO_A2": "MX", "NAME": "Mexico" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[-118.0, 14.0], [-118.0, 32.0], [-86.0, 32.0], [-86.0, 14.0], [-118.0, 14.0]]]
      }
    },
    
    // South America
    {
      "type": "Feature",
      "properties": { "ISO_A2": "BR", "NAME": "Brazil" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[-74.0, 5.0], [-74.0, -34.0], [-34.0, -34.0], [-34.0, 5.0], [-74.0, 5.0]]]
      }
    },
    {
      "type": "Feature",
      "properties": { "ISO_A2": "AR", "NAME": "Argentina" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[-73.0, -22.0], [-73.0, -55.0], [-53.0, -55.0], [-53.0, -22.0], [-73.0, -22.0]]]
      }
    },
    
    // Africa
    {
      "type": "Feature",
      "properties": { "ISO_A2": "ZA", "NAME": "South Africa" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[16.5, -35.0], [16.5, -22.0], [33.0, -22.0], [33.0, -35.0], [16.5, -35.0]]]
      }
    },
    {
      "type": "Feature",
      "properties": { "ISO_A2": "EG", "NAME": "Egypt" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[24.7, 22.0], [24.7, 31.5], [36.9, 31.5], [36.9, 22.0], [24.7, 22.0]]]
      }
    },
    
    // Asia
    {
      "type": "Feature",
      "properties": { "ISO_A2": "CN", "NAME": "China" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[73.5, 18.0], [73.5, 53.5], [135.0, 53.5], [135.0, 18.0], [73.5, 18.0]]]
      }
    },
    {
      "type": "Feature",
      "properties": { "ISO_A2": "IN", "NAME": "India" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[68.0, 6.0], [68.0, 35.5], [97.5, 35.5], [97.5, 6.0], [68.0, 6.0]]]
      }
    },
    {
      "type": "Feature",
      "properties": { "ISO_A2": "JP", "NAME": "Japan" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[128.5, 30.0], [128.5, 45.5], [146.0, 45.5], [146.0, 30.0], [128.5, 30.0]]]
      }
    },
    
    // Australia and Oceania
    {
      "type": "Feature",
      "properties": { "ISO_A2": "AU", "NAME": "Australia" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[112.0, -43.0], [112.0, -10.0], [155.0, -10.0], [155.0, -43.0], [112.0, -43.0]]]
      }
    },
    {
      "type": "Feature",
      "properties": { "ISO_A2": "NZ", "NAME": "New Zealand" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[165.0, -47.0], [165.0, -34.0], [179.0, -34.0], [179.0, -47.0], [165.0, -47.0]]]
      }
    }
  ]
};
