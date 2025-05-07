// World map data in GeoJSON format for React Simple Maps

export const worldGeoData = {
  "type": "FeatureCollection",
  "features": [
    // Europe
    {
      "type": "Feature",
      "properties": { "ISO_A2": "FR", "NAME": "France" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[2.5, 48.8], [1.7, 43.6], [7.5, 43.7], [6.0, 49.2], [2.5, 48.8]]]
      }
    },
    {
      "type": "Feature",
      "properties": { "ISO_A2": "IT", "NAME": "Italy" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[12.5, 41.9], [9.2, 45.5], [13.7, 45.6], [14.7, 41.2], [12.5, 41.9]]]
      }
    },
    {
      "type": "Feature",
      "properties": { "ISO_A2": "ES", "NAME": "Spain" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[-3.7, 40.4], [-8.6, 42.6], [3.1, 42.4], [0.0, 38.0], [-3.7, 40.4]]]
      }
    },
    {
      "type": "Feature",
      "properties": { "ISO_A2": "NL", "NAME": "Netherlands" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[4.9, 52.4], [3.4, 51.5], [7.1, 52.6], [6.9, 53.5], [4.9, 52.4]]]
      }
    },
    // More of Europe
    {
      "type": "Feature",
      "properties": { "ISO_A2": "DE", "NAME": "Germany" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[10.5, 51.3], [6.1, 49.5], [14.0, 48.7], [14.6, 53.4], [10.5, 51.3]]]
      }
    },
    {
      "type": "Feature",
      "properties": { "ISO_A2": "GB", "NAME": "United Kingdom" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[-0.1, 51.5], [-3.2, 55.9], [0.8, 52.5], [-2.6, 51.1], [-0.1, 51.5]]]
      }
    },
    // North America
    {
      "type": "Feature",
      "properties": { "ISO_A2": "US", "NAME": "United States" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[-98.5, 39.8], [-122.4, 37.8], [-80.2, 25.8], [-73.9, 40.7], [-98.5, 39.8]]]
      }
    },
    {
      "type": "Feature",
      "properties": { "ISO_A2": "CA", "NAME": "Canada" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[-97.2, 49.9], [-123.1, 49.3], [-63.6, 44.6], [-79.4, 43.7], [-97.2, 49.9]]]
      }
    },
    // Asia
    {
      "type": "Feature",
      "properties": { "ISO_A2": "JP", "NAME": "Japan" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[139.8, 35.7], [133.9, 34.7], [141.7, 43.0], [140.9, 37.5], [139.8, 35.7]]]
      }
    },
    {
      "type": "Feature",
      "properties": { "ISO_A2": "CN", "NAME": "China" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[116.4, 39.9], [87.6, 43.8], [104.2, 35.2], [121.5, 31.2], [116.4, 39.9]]]
      }
    },
    // Africa
    {
      "type": "Feature",
      "properties": { "ISO_A2": "EG", "NAME": "Egypt" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[31.2, 30.0], [25.1, 31.5], [34.3, 31.0], [31.6, 22.9], [31.2, 30.0]]]
      }
    },
    {
      "type": "Feature",
      "properties": { "ISO_A2": "ZA", "NAME": "South Africa" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[18.4, -33.9], [22.8, -33.0], [31.1, -29.9], [28.2, -25.7], [18.4, -33.9]]]
      }
    },
    // South America
    {
      "type": "Feature",
      "properties": { "ISO_A2": "BR", "NAME": "Brazil" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[-47.9, -15.8], [-43.2, -22.9], [-56.1, -30.0], [-60.0, -3.0], [-47.9, -15.8]]]
      }
    },
    {
      "type": "Feature",
      "properties": { "ISO_A2": "AR", "NAME": "Argentina" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[-58.4, -34.6], [-64.0, -31.4], [-68.3, -54.8], [-57.6, -38.0], [-58.4, -34.6]]]
      }
    },
    // Australia and Oceania
    {
      "type": "Feature",
      "properties": { "ISO_A2": "AU", "NAME": "Australia" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[151.2, -33.9], [115.9, -32.0], [138.6, -34.9], [153.0, -27.5], [151.2, -33.9]]]
      }
    },
    {
      "type": "Feature",
      "properties": { "ISO_A2": "NZ", "NAME": "New Zealand" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[174.8, -36.9], [168.7, -45.0], [178.5, -38.0], [177.0, -41.3], [174.8, -36.9]]]
      }
    }
  ]
};
