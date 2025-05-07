// World map data in GeoJSON format for React Simple Maps
// Created with simplified but representative country borders
// This uses rectangular shapes to approximate country boundaries
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
      "properties": { "ISO_A2": "PT", "NAME": "Portugal" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[-9.5, 37.0], [-9.5, 42.0], [-6.0, 42.0], [-6.0, 37.0], [-9.5, 37.0]]]
      }
    },
    {
      "type": "Feature",
      "properties": { "ISO_A2": "IE", "NAME": "Ireland" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[-10.5, 51.5], [-10.5, 55.0], [-6.0, 55.0], [-6.0, 51.5], [-10.5, 51.5]]]
      }
    },
    {
      "type": "Feature",
      "properties": { "ISO_A2": "CH", "NAME": "Switzerland" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[6.0, 45.8], [6.0, 47.8], [10.5, 47.8], [10.5, 45.8], [6.0, 45.8]]]
      }
    },
    {
      "type": "Feature",
      "properties": { "ISO_A2": "AT", "NAME": "Austria" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[9.5, 46.5], [9.5, 49.0], [17.0, 49.0], [17.0, 46.5], [9.5, 46.5]]]
      }
    },
    {
      "type": "Feature",
      "properties": { "ISO_A2": "BE", "NAME": "Belgium" },
      "geometry": {
        "type": "Polygon", 
        "coordinates": [[[2.5, 49.5], [2.5, 51.5], [6.5, 51.5], [6.5, 49.5], [2.5, 49.5]]]
      }
    },
    {
      "type": "Feature",
      "properties": { "ISO_A2": "NL", "NAME": "Netherlands" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[3.5, 51.0], [3.5, 53.5], [7.1, 53.5], [7.1, 51.0], [3.5, 51.0]]]
      }
    },
    {
      "type": "Feature",
      "properties": { "ISO_A2": "DK", "NAME": "Denmark" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[8.0, 54.5], [8.0, 57.8], [13.0, 57.8], [13.0, 54.5], [8.0, 54.5]]]
      }
    },
    {
      "type": "Feature",
      "properties": { "ISO_A2": "NO", "NAME": "Norway" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[4.5, 58.0], [4.5, 71.0], [31.0, 71.0], [31.0, 58.0], [4.5, 58.0]]]
      }
    },
    {
      "type": "Feature",
      "properties": { "ISO_A2": "SE", "NAME": "Sweden" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[11.0, 55.0], [11.0, 69.0], [24.0, 69.0], [24.0, 55.0], [11.0, 55.0]]]
      }
    },
    {
      "type": "Feature",
      "properties": { "ISO_A2": "FI", "NAME": "Finland" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[20.0, 60.0], [20.0, 70.0], [31.0, 70.0], [31.0, 60.0], [20.0, 60.0]]]
      }
    },
    {
      "type": "Feature",
      "properties": { "ISO_A2": "PL", "NAME": "Poland" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[14.5, 49.0], [14.5, 55.0], [24.0, 55.0], [24.0, 49.0], [14.5, 49.0]]]
      }
    },
    {
      "type": "Feature",
      "properties": { "ISO_A2": "CZ", "NAME": "Czech Republic" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[12.0, 48.5], [12.0, 51.0], [18.8, 51.0], [18.8, 48.5], [12.0, 48.5]]]
      }
    },
    {
      "type": "Feature",
      "properties": { "ISO_A2": "GR", "NAME": "Greece" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[19.0, 35.0], [19.0, 42.0], [28.0, 42.0], [28.0, 35.0], [19.0, 35.0]]]
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
    {
      "type": "Feature",
      "properties": { "ISO_A2": "CL", "NAME": "Chile" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[-76.0, -56.0], [-76.0, -18.0], [-66.0, -18.0], [-66.0, -56.0], [-76.0, -56.0]]]
      }
    },
    {
      "type": "Feature",
      "properties": { "ISO_A2": "PE", "NAME": "Peru" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[-82.0, -18.0], [-82.0, -1.0], [-68.0, -1.0], [-68.0, -18.0], [-82.0, -18.0]]]
      }
    },
    {
      "type": "Feature",
      "properties": { "ISO_A2": "CO", "NAME": "Colombia" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[-79.0, -4.0], [-79.0, 12.0], [-66.0, 12.0], [-66.0, -4.0], [-79.0, -4.0]]]
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
    {
      "type": "Feature",
      "properties": { "ISO_A2": "MA", "NAME": "Morocco" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[-17.0, 21.0], [-17.0, 36.0], [-1.0, 36.0], [-1.0, 21.0], [-17.0, 21.0]]]
      }
    },
    {
      "type": "Feature",
      "properties": { "ISO_A2": "NG", "NAME": "Nigeria" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[2.7, 4.0], [2.7, 14.0], [14.5, 14.0], [14.5, 4.0], [2.7, 4.0]]]
      }
    },
    {
      "type": "Feature",
      "properties": { "ISO_A2": "KE", "NAME": "Kenya" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[34.0, -4.5], [34.0, 5.0], [42.0, 5.0], [42.0, -4.5], [34.0, -4.5]]]
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
    {
      "type": "Feature",
      "properties": { "ISO_A2": "TH", "NAME": "Thailand" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[97.0, 5.0], [97.0, 20.5], [106.0, 20.5], [106.0, 5.0], [97.0, 5.0]]]
      }
    },
    {
      "type": "Feature",
      "properties": { "ISO_A2": "VN", "NAME": "Vietnam" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[102.0, 8.0], [102.0, 23.5], [109.5, 23.5], [109.5, 8.0], [102.0, 8.0]]]
      }
    },
    {
      "type": "Feature",
      "properties": { "ISO_A2": "ID", "NAME": "Indonesia" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[94.0, -11.0], [94.0, 6.0], [141.0, 6.0], [141.0, -11.0], [94.0, -11.0]]]
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
