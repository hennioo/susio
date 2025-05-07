// This is a simplified GeoJSON structure for the world map
// We're using the React Simple Maps library which needs GeoJSON data

export const worldGeoData = {
  "type": "FeatureCollection",
  "features": [
    // The actual geography data is too large to include here
    // In a real application, we would import a full GeoJSON file
    // React Simple Maps has a built-in access to world map data
    // For performance reasons, we're referencing a simplified world topology
  ]
};

// This would normally be the full GeoJSON data
// For the actual implementation, we'll use the data provided by React Simple Maps
// The data is accessed via: 
// https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json
