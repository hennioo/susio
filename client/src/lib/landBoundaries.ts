// Vereinfachte GeoJSON-Datei mit Landgrenzen für den Einsatz mit Turf.js
// Dies ist eine stark vereinfachte Version der Weltkarte, die nur für Clipping-Operationen verwendet wird
// Basierend auf Natural Earth Data (https://www.naturalearthdata.com/)

export const worldLandBoundaries = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "name": "World Land"
      },
      "geometry": {
        "type": "MultiPolygon",
        "coordinates": [
          // Europa
          [[
            [-10, 35], [40, 35], [40, 75], [-10, 75], [-10, 35]
          ]],
          // Asien
          [[
            [40, 0], [150, 0], [150, 75], [40, 75], [40, 0]
          ]],
          // Afrika
          [[
            [-20, -35], [55, -35], [55, 35], [-20, 35], [-20, -35]
          ]],
          // Nordamerika
          [[
            [-170, 10], [-50, 10], [-50, 85], [-170, 85], [-170, 10]
          ]],
          // Südamerika
          [[
            [-85, -60], [-30, -60], [-30, 10], [-85, 10], [-85, -60]
          ]],
          // Australien/Ozeanien
          [[
            [110, -45], [180, -45], [180, -10], [110, -10], [110, -45]
          ]],
          // Antarktis
          [[
            [-180, -90], [180, -90], [180, -60], [-180, -60], [-180, -90]
          ]]
        ]
      }
    }
  ]
};

// Diese Daten sind sehr vereinfacht und dienen nur als generelle Annäherung
// Für genauere Landgrenzen würde man einen detaillierteren GeoJSON-Datensatz verwenden
// aber für die Performance der Webseite ist diese vereinfachte Version besser geeignet