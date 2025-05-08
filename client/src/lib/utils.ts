import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Funktion zum Ermitteln des Ländernamens anhand des Ländercodes
export function getCountryName(countryCode: string): string {
  const countries: Record<string, string> = {
    "AF": "Afghanistan", "AL": "Albanien", "DZ": "Algerien", "AS": "Amerikanisch-Samoa", 
    "AD": "Andorra", "AO": "Angola", "AI": "Anguilla", "AQ": "Antarktis", 
    "AG": "Antigua und Barbuda", "AR": "Argentinien", "AM": "Armenien", "AW": "Aruba", 
    "AU": "Australien", "AT": "Österreich", "AZ": "Aserbaidschan", "BS": "Bahamas", 
    "BH": "Bahrain", "BD": "Bangladesch", "BB": "Barbados", "BY": "Belarus", 
    "BE": "Belgien", "BZ": "Belize", "BJ": "Benin", "BM": "Bermuda", 
    "BT": "Bhutan", "BO": "Bolivien", "BA": "Bosnien und Herzegowina", "BW": "Botswana", 
    "BV": "Bouvetinsel", "BR": "Brasilien", "IO": "Britisches Territorium im Indischen Ozean", "BN": "Brunei", 
    "BG": "Bulgarien", "BF": "Burkina Faso", "BI": "Burundi", "KH": "Kambodscha", 
    "CM": "Kamerun", "CA": "Kanada", "CV": "Kap Verde", "KY": "Kaimaninseln", 
    "CF": "Zentralafrikanische Republik", "TD": "Tschad", "CL": "Chile", "CN": "China", 
    "CX": "Weihnachtsinsel", "CC": "Kokosinseln", "CO": "Kolumbien", "KM": "Komoren", 
    "CG": "Kongo", "CD": "Demokratische Republik Kongo", "CK": "Cookinseln", "CR": "Costa Rica", 
    "CI": "Elfenbeinküste", "HR": "Kroatien", "CU": "Kuba", "CY": "Zypern", 
    "CZ": "Tschechien", "DK": "Dänemark", "DJ": "Dschibuti", "DM": "Dominica", 
    "DO": "Dominikanische Republik", "EC": "Ecuador", "EG": "Ägypten", "SV": "El Salvador", 
    "GQ": "Äquatorialguinea", "ER": "Eritrea", "EE": "Estland", "ET": "Äthiopien", 
    "FK": "Falklandinseln", "FO": "Färöer", "FJ": "Fidschi", "FI": "Finnland", 
    "FR": "Frankreich", "GF": "Französisch-Guayana", "PF": "Französisch-Polynesien", "TF": "Französische Süd- und Antarktisgebiete", 
    "GA": "Gabun", "GM": "Gambia", "GE": "Georgien", "DE": "Deutschland", 
    "GH": "Ghana", "GI": "Gibraltar", "GR": "Griechenland", "GL": "Grönland", 
    "GD": "Grenada", "GP": "Guadeloupe", "GU": "Guam", "GT": "Guatemala", 
    "GG": "Guernsey", "GN": "Guinea", "GW": "Guinea-Bissau", "GY": "Guyana", 
    "HT": "Haiti", "HM": "Heard und McDonaldinseln", "VA": "Vatikanstadt", "HN": "Honduras", 
    "HK": "Hongkong", "HU": "Ungarn", "IS": "Island", "IN": "Indien", 
    "ID": "Indonesien", "IR": "Iran", "IQ": "Irak", "IE": "Irland", 
    "IM": "Isle of Man", "IL": "Israel", "IT": "Italien", "JM": "Jamaika", 
    "JP": "Japan", "JE": "Jersey", "JO": "Jordanien", "KZ": "Kasachstan", 
    "KE": "Kenia", "KI": "Kiribati", "KP": "Nordkorea", "KR": "Südkorea", 
    "KW": "Kuwait", "KG": "Kirgisistan", "LA": "Laos", "LV": "Lettland", 
    "LB": "Libanon", "LS": "Lesotho", "LR": "Liberia", "LY": "Libyen", 
    "LI": "Liechtenstein", "LT": "Litauen", "LU": "Luxemburg", "MO": "Macau", 
    "MK": "Nordmazedonien", "MG": "Madagaskar", "MW": "Malawi", "MY": "Malaysia", 
    "MV": "Malediven", "ML": "Mali", "MT": "Malta", "MH": "Marshallinseln", 
    "MQ": "Martinique", "MR": "Mauretanien", "MU": "Mauritius", "YT": "Mayotte", 
    "MX": "Mexiko", "FM": "Mikronesien", "MD": "Moldau", "MC": "Monaco", 
    "MN": "Mongolei", "ME": "Montenegro", "MS": "Montserrat", "MA": "Marokko", 
    "MZ": "Mosambik", "MM": "Myanmar", "NA": "Namibia", "NR": "Nauru", 
    "NP": "Nepal", "NL": "Niederlande", "NC": "Neukaledonien", "NZ": "Neuseeland", 
    "NI": "Nicaragua", "NE": "Niger", "NG": "Nigeria", "NU": "Niue", 
    "NF": "Norfolkinsel", "MP": "Nördliche Marianen", "NO": "Norwegen", "OM": "Oman", 
    "PK": "Pakistan", "PW": "Palau", "PS": "Palästina", "PA": "Panama", 
    "PG": "Papua-Neuguinea", "PY": "Paraguay", "PE": "Peru", "PH": "Philippinen", 
    "PN": "Pitcairninseln", "PL": "Polen", "PT": "Portugal", "PR": "Puerto Rico", 
    "QA": "Katar", "RE": "Réunion", "RO": "Rumänien", "RU": "Russland", 
    "RW": "Ruanda", "BL": "Saint-Barthélemy", "SH": "St. Helena", "KN": "St. Kitts und Nevis", 
    "LC": "St. Lucia", "MF": "Saint-Martin", "PM": "Saint-Pierre und Miquelon", "VC": "St. Vincent und die Grenadinen", 
    "WS": "Samoa", "SM": "San Marino", "ST": "São Tomé und Príncipe", "SA": "Saudi-Arabien", 
    "SN": "Senegal", "RS": "Serbien", "SC": "Seychellen", "SL": "Sierra Leone", 
    "SG": "Singapur", "SK": "Slowakei", "SI": "Slowenien", "SB": "Salomonen", 
    "SO": "Somalia", "ZA": "Südafrika", "GS": "Südgeorgien und die Südlichen Sandwichinseln", "ES": "Spanien", 
    "LK": "Sri Lanka", "SD": "Sudan", "SR": "Suriname", "SJ": "Spitzbergen und Jan Mayen", 
    "SZ": "Eswatini", "SE": "Schweden", "CH": "Schweiz", "SY": "Syrien", 
    "TW": "Taiwan", "TJ": "Tadschikistan", "TZ": "Tansania", "TH": "Thailand", 
    "TL": "Osttimor", "TG": "Togo", "TK": "Tokelau", "TO": "Tonga", 
    "TT": "Trinidad und Tobago", "TN": "Tunesien", "TR": "Türkei", "TM": "Turkmenistan", 
    "TC": "Turks- und Caicosinseln", "TV": "Tuvalu", "UG": "Uganda", "UA": "Ukraine", 
    "AE": "Vereinigte Arabische Emirate", "GB": "Vereinigtes Königreich", "US": "Vereinigte Staaten", "UM": "Amerikanische Überseeinseln", 
    "UY": "Uruguay", "UZ": "Usbekistan", "VU": "Vanuatu", "VE": "Venezuela", 
    "VN": "Vietnam", "VG": "Britische Jungferninseln", "VI": "Amerikanische Jungferninseln", "WF": "Wallis und Futuna", 
    "EH": "Westsahara", "YE": "Jemen", "ZM": "Sambia", "ZW": "Simbabwe"
  };
  
  return countries[countryCode] || "Unbekanntes Land";
}

// Funktion zur Generierung eines Fallback-Images für Orte ohne Bild
export function getFallbackImageUrl(locationName: string): string {
  // Erstelle eine einfarbige Hintergrundfarbe basierend auf dem Ortsnamen
  const hashCode = locationName.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  
  // Erzeuge einen HSL-Farbwert mit konstanter Sättigung und Helligkeit
  const hue = Math.abs(hashCode) % 360;
  
  // Erstelle einen Farbverlauf für das Fallback-Bild
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='hsl(${hue}, 80%25, 60%25)' /%3E%3Cstop offset='100%25' stop-color='hsl(${hue}, 80%25, 40%25)' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23g)' /%3E%3C/svg%3E`;
}
