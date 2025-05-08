/**
 * Dieses Modul generiert stimmungsbasierte Farbpaletten für verschiedene Standorte
 * basierend auf ihren Namen, Beschreibungen und Stichwortzuordnungen.
 */

// Basis-Farben für verschiedene Stimmungen oder Themen
interface MoodColors {
  [key: string]: {
    primary: string;
    secondary: string;
    accent: string;
    light: string;
    dark: string;
  };
}

// Vordefinierte Farbschemata für verschiedene Stimmungen
const moodColors: MoodColors = {
  beach: {
    primary: '#068FD8',     // Helles Blau (Meer)
    secondary: '#F9DA7B',   // Sandfarbe
    accent: '#FF9F4A',      // Sunset Orange
    light: '#E6F7FF',       // Helles Himmelblau
    dark: '#025E8E',        // Dunkles Meeresblau
  },
  mountain: {
    primary: '#2D7B4D',     // Waldgrün
    secondary: '#A4BFA7',   // Hellgrün
    accent: '#F0F0F0',      // Schneeweiß
    light: '#E0EBE3',       // Sehr helles Grün
    dark: '#1A462D',        // Dunkelgrün
  },
  city: {
    primary: '#4A5568',     // Stadtgrau
    secondary: '#CBD5E0',   // Hellgrau
    accent: '#F6AD55',      // Orange (Lichter)
    light: '#F7FAFC',       // Fast weiß
    dark: '#2D3748',        // Dunkelgrau
  },
  desert: {
    primary: '#DD6B20',     // Orangerot
    secondary: '#F6AD55',   // Helleres Orange
    accent: '#FC8181',      // Korallenrot
    light: '#FEEBC8',       // Sand
    dark: '#9C4221',        // Dunkelbraun
  },
  tropical: {
    primary: '#38A169',     // Saftiges Grün
    secondary: '#68D391',   // Hellgrün
    accent: '#F6E05E',      // Gelb
    light: '#F0FFF4',       // Fast weißes Grün
    dark: '#276749',        // Dunkelgrün
  },
  historic: {
    primary: '#8A5A44',     // Braun
    secondary: '#C6A47C',   // Hellbraun
    accent: '#F6AD55',      // Orange
    light: '#F0E7DB',       // Beige
    dark: '#5C3425',        // Dunkelbraun
  },
  winter: {
    primary: '#3182CE',     // Eis-Blau
    secondary: '#BEE3F8',   // Hellblau
    accent: '#FC8181',      // Warmes Rot
    light: '#EBF8FF',       // Fast weißes Blau
    dark: '#2A4365',        // Dunkelblau
  },
  autumn: {
    primary: '#DD6B20',     // Orange
    secondary: '#F6AD55',   // Helleres Orange
    accent: '#ED8936',      // Bernstein
    light: '#FEEBC8',       // Helles Beige
    dark: '#9C4221',        // Dunkelbraun
  },
  spring: {
    primary: '#38A169',     // Grün
    secondary: '#9AE6B4',   // Hellgrün
    accent: '#F6E05E',      // Gelb
    light: '#F0FFF4',       // Fast weißes Grün
    dark: '#276749',        // Dunkelgrün
  },
  summer: {
    primary: '#D69E2E',     // Goldgelb
    secondary: '#F6E05E',   // Gelb
    accent: '#ED8936',      // Orange
    light: '#FFFFF0',       // Fast weißes Gelb
    dark: '#975A16',        // Dunkelgelb
  },
  romantic: {
    primary: '#D53F8C',     // Pink
    secondary: '#FBB6CE',   // Hellrosa
    accent: '#FC8181',      // Korallenrot
    light: '#FFF5F7',       // Fast weißes Rosa
    dark: '#97266D',        // Dunkelpink
  },
  adventure: {
    primary: '#DD6B20',     // Orange
    secondary: '#F6AD55',   // Helleres Orange
    accent: '#F56565',      // Rot
    light: '#FEEBC8',       // Helles Beige
    dark: '#9C4221',        // Dunkelbraun
  },
  cultural: {
    primary: '#805AD5',     // Lila
    secondary: '#D6BCFA',   // Helllila
    accent: '#F6AD55',      // Orange
    light: '#FAF5FF',       // Fast weißes Lila
    dark: '#553C9A',        // Dunkellila
  },
  culinary: {
    primary: '#E53E3E',     // Rot
    secondary: '#FC8181',   // Hellrot
    accent: '#F6E05E',      // Gelb
    light: '#FFF5F5',       // Fast weißes Rot
    dark: '#9B2C2C',        // Dunkelrot
  }
};

// Schlüsselwörter, die bestimmten Stimmungen zugeordnet sind
const moodKeywords: Record<string, string[]> = {
  beach: ['beach', 'ocean', 'sea', 'coast', 'shore', 'sand', 'surf', 'wave', 'tropical', 'island', 'paradise'],
  mountain: ['mountain', 'peak', 'hill', 'valley', 'alp', 'snow', 'hiking', 'trek', 'climb', 'highland', 'forest'],
  city: ['city', 'urban', 'downtown', 'metropolis', 'skyline', 'building', 'street', 'avenue', 'boulevard', 'tower'],
  desert: ['desert', 'dune', 'sand', 'arid', 'cactus', 'dry', 'oasis', 'barren', 'canyon', 'rock'],
  tropical: ['tropical', 'jungle', 'rainforest', 'humid', 'palm', 'exotic', 'lush', 'green', 'vegetation'],
  historic: ['historic', 'ancient', 'ruin', 'old', 'heritage', 'monument', 'museum', 'castle', 'palace', 'cathedral'],
  winter: ['winter', 'snow', 'ice', 'cold', 'frost', 'frozen', 'ski', 'snowboard', 'christmas', 'december'],
  autumn: ['autumn', 'fall', 'foliage', 'leaf', 'orange', 'harvest', 'october', 'november', 'maple', 'cozy'],
  spring: ['spring', 'blossom', 'flower', 'bloom', 'garden', 'april', 'may', 'fresh', 'renewal', 'green'],
  summer: ['summer', 'hot', 'sunny', 'warm', 'beach', 'vacation', 'july', 'august', 'sun', 'bright'],
  romantic: ['romantic', 'love', 'couple', 'honeymoon', 'valentine', 'intimate', 'sunset', 'candlelight', 'rose'],
  adventure: ['adventure', 'explore', 'discovery', 'wild', 'trek', 'expedition', 'safari', 'journey', 'quest'],
  cultural: ['cultural', 'tradition', 'heritage', 'art', 'museum', 'gallery', 'theater', 'festival', 'music', 'history'],
  culinary: ['culinary', 'food', 'cuisine', 'restaurant', 'dine', 'taste', 'flavor', 'dish', 'chef', 'gourmet', 'dinner']
};

// Länder und ihre zugeordneten Stimmungen
const countryMoods: Record<string, string[]> = {
  'FR': ['romantic', 'cultural', 'culinary', 'historic'],  // Frankreich
  'IT': ['cultural', 'historic', 'culinary', 'romantic'],  // Italien
  'ES': ['cultural', 'beach', 'culinary', 'historic'],     // Spanien
  'GR': ['historic', 'beach', 'cultural', 'summer'],       // Griechenland
  'DE': ['historic', 'cultural', 'city', 'autumn'],        // Deutschland
  'GB': ['historic', 'city', 'cultural', 'autumn'],        // Großbritannien
  'US': ['city', 'adventure', 'beach', 'mountain'],        // USA
  'CA': ['mountain', 'winter', 'adventure', 'city'],       // Kanada
  'JP': ['cultural', 'city', 'spring', 'historic'],        // Japan
  'TH': ['tropical', 'beach', 'cultural', 'culinary'],     // Thailand
  'AU': ['beach', 'adventure', 'desert', 'city'],          // Australien
  'NZ': ['adventure', 'mountain', 'beach', 'spring'],      // Neuseeland
  'BR': ['tropical', 'beach', 'adventure', 'cultural'],    // Brasilien
  'MX': ['cultural', 'beach', 'culinary', 'historic'],     // Mexiko
  'EG': ['historic', 'desert', 'adventure', 'cultural'],   // Ägypten
  'ZA': ['adventure', 'desert', 'beach', 'cultural'],      // Südafrika
  'IN': ['cultural', 'historic', 'culinary', 'tropical'],  // Indien
  'CN': ['historic', 'cultural', 'city', 'culinary'],      // China
};

/**
 * Generiert eine stimmungsbasierte Farbpalette für einen Ort basierend auf
 * - dem Standortnamen
 * - der Beschreibung 
 * - dem Highlight
 * - dem Ländercode
 * 
 * @param name Standortname
 * @param description Beschreibung des Standorts
 * @param highlight Besonderes Merkmal/Highlight des Standorts
 * @param countryCode Ländercode (z.B. "FR" für Frankreich)
 */
export function generateLocationPalette(
  name: string,
  description: string,
  highlight: string,
  countryCode: string
): {
  primary: string;
  secondary: string;
  accent: string;
  light: string;
  dark: string;
} {
  // Kombiniere alle Textinformationen für die Stimmungsanalyse
  const combinedText = `${name} ${description} ${highlight}`.toLowerCase();
  
  // Punktzahl für jede Stimmung basierend auf Schlüsselwörtern
  const moodScores: Record<string, number> = {};
  
  // Initialisiere alle Stimmungen mit 0
  Object.keys(moodColors).forEach(mood => {
    moodScores[mood] = 0;
  });
  
  // Zähle Schlüsselwörter für jede Stimmung
  Object.entries(moodKeywords).forEach(([mood, keywords]) => {
    keywords.forEach(keyword => {
      if (combinedText.includes(keyword)) {
        moodScores[mood] += 1;
      }
    });
  });
  
  // Berücksichtige länderspezifische Stimmungen
  if (countryCode && countryMoods[countryCode]) {
    countryMoods[countryCode].forEach((mood, index) => {
      // Die erste Stimmung erhält 4 Punkte, die zweite 3, usw.
      moodScores[mood] += (4 - index);
    });
  }
  
  // Wähle die Stimmung mit der höchsten Punktzahl
  let topMood = Object.keys(moodScores)[0];
  let topScore = moodScores[topMood];
  
  Object.entries(moodScores).forEach(([mood, score]) => {
    if (score > topScore) {
      topMood = mood;
      topScore = score;
    }
  });
  
  // Wähle eine Standardstimmung, wenn keine klare Übereinstimmung gefunden wurde
  if (topScore === 0) {
    if (countryCode && countryMoods[countryCode]) {
      topMood = countryMoods[countryCode][0]; // Verwende die erste länderspezifische Stimmung
    } else {
      // Fallback-Stimmung basierend auf dem Monat (Jahreszeit)
      const month = new Date().getMonth(); // 0 = Januar, 11 = Dezember
      
      if (month >= 2 && month <= 4) {
        topMood = 'spring';
      } else if (month >= 5 && month <= 7) {
        topMood = 'summer';
      } else if (month >= 8 && month <= 10) {
        topMood = 'autumn';
      } else {
        topMood = 'winter';
      }
    }
  }
  
  // Gib die Farbpalette der gewählten Stimmung zurück
  return moodColors[topMood];
}

/**
 * Gibt eine CSS-Farbe basierend auf einer Stimmung und einem bestimmten Farbton zurück
 */
export function getMoodColor(
  name: string,
  description: string,
  highlight: string,
  countryCode: string,
  colorType: 'primary' | 'secondary' | 'accent' | 'light' | 'dark' = 'primary'
): string {
  const palette = generateLocationPalette(name, description, highlight, countryCode);
  return palette[colorType];
}

/**
 * Gibt den Namen der Stimmung für einen Ort zurück
 */
export function getLocationMood(
  name: string,
  description: string,
  highlight: string,
  countryCode: string
): string {
  // Kombiniere alle Textinformationen für die Stimmungsanalyse
  const combinedText = `${name} ${description} ${highlight}`.toLowerCase();
  
  // Punktzahl für jede Stimmung basierend auf Schlüsselwörtern
  const moodScores: Record<string, number> = {};
  
  // Initialisiere alle Stimmungen mit 0
  Object.keys(moodColors).forEach(mood => {
    moodScores[mood] = 0;
  });
  
  // Zähle Schlüsselwörter für jede Stimmung
  Object.entries(moodKeywords).forEach(([mood, keywords]) => {
    keywords.forEach(keyword => {
      if (combinedText.includes(keyword)) {
        moodScores[mood] += 1;
      }
    });
  });
  
  // Berücksichtige länderspezifische Stimmungen
  if (countryCode && countryMoods[countryCode]) {
    countryMoods[countryCode].forEach((mood, index) => {
      // Die erste Stimmung erhält 4 Punkte, die zweite 3, usw.
      moodScores[mood] += (4 - index);
    });
  }
  
  // Wähle die Stimmung mit der höchsten Punktzahl
  let topMood = Object.keys(moodScores)[0];
  let topScore = moodScores[topMood];
  
  Object.entries(moodScores).forEach(([mood, score]) => {
    if (score > topScore) {
      topMood = mood;
      topScore = score;
    }
  });
  
  // Wähle eine Standardstimmung, wenn keine klare Übereinstimmung gefunden wurde
  if (topScore === 0) {
    if (countryCode && countryMoods[countryCode]) {
      topMood = countryMoods[countryCode][0]; // Verwende die erste länderspezifische Stimmung
    } else {
      // Fallback-Stimmung basierend auf dem Monat (Jahreszeit)
      const month = new Date().getMonth(); // 0 = Januar, 11 = Dezember
      
      if (month >= 2 && month <= 4) {
        topMood = 'spring';
      } else if (month >= 5 && month <= 7) {
        topMood = 'summer';
      } else if (month >= 8 && month <= 10) {
        topMood = 'autumn';
      } else {
        topMood = 'winter';
      }
    }
  }
  
  return topMood;
}

/**
 * Deutsche Übersetzungen für die Stimmungen
 */
export const moodTranslations: Record<string, string> = {
  beach: 'Strand',
  mountain: 'Berge',
  city: 'Stadt',
  desert: 'Wüste',
  tropical: 'Tropisch',
  historic: 'Historisch',
  winter: 'Winter',
  autumn: 'Herbst',
  spring: 'Frühling',
  summer: 'Sommer',
  romantic: 'Romantisch',
  adventure: 'Abenteuer',
  cultural: 'Kulturell',
  culinary: 'Kulinarisch'
};