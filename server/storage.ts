import { 
  users, type User, type InsertUser, 
  locations, type Location, type InsertLocation,
  accessCodes, type AccessCode, type InsertAccessCode
} from "@shared/schema";

// Interface for storage operations
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Location methods
  getLocations(): Promise<Location[]>;
  getLocation(id: number): Promise<Location | undefined>;
  createLocation(location: InsertLocation): Promise<Location>;
  
  // Access code methods
  getAccessCodes(): Promise<AccessCode[]>;
  validateAccessCode(code: string): Promise<boolean>;
  createAccessCode(accessCode: InsertAccessCode): Promise<AccessCode>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private locations: Map<number, Location>;
  private accessCodes: Map<number, AccessCode>;
  private userCurrentId: number;
  private locationCurrentId: number;
  private accessCodeCurrentId: number;

  constructor() {
    this.users = new Map();
    this.locations = new Map();
    this.accessCodes = new Map();
    this.userCurrentId = 1;
    this.locationCurrentId = 1;
    this.accessCodeCurrentId = 1;

    // Add default access code
    this.createAccessCode({ code: "lovetravel", active: true });

    // Add sample locations
    this.createLocation({
      name: "Paris, France",
      date: "October 2022",
      description: "We spent an amazing week exploring the city of love. We visited the Eiffel Tower, strolled along the Seine, and enjoyed delicious pastries at local cafés.",
      highlight: "First trip together abroad",
      latitude: "48.8566",
      longitude: "2.3522",
      countryCode: "FR",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    });

    this.createLocation({
      name: "Rome, Italy",
      date: "December 2022",
      description: "We explored ancient ruins, tossed coins in the Trevi Fountain, and enjoyed authentic Italian pasta and gelato.",
      highlight: "Christmas in Rome",
      latitude: "41.9028",
      longitude: "12.4964",
      countryCode: "IT",
      image: "https://images.unsplash.com/photo-1555992336-fb0d29498b13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    });

    this.createLocation({
      name: "Barcelona, Spain",
      date: "March 2023",
      description: "Gaudi's architecture, tapas, and the beautiful beaches made this trip unforgettable.",
      highlight: "Watching the sunset at Park Güell",
      latitude: "41.3851",
      longitude: "2.1734",
      countryCode: "ES",
      image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    });

    this.createLocation({
      name: "Amsterdam, Netherlands",
      date: "June 2023",
      description: "We cycled through the city, visited museums, and took a boat tour through the canals.",
      highlight: "Cycling adventure through Vondelpark",
      latitude: "52.3676",
      longitude: "4.9041",
      countryCode: "NL",
      image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Location methods
  async getLocations(): Promise<Location[]> {
    return Array.from(this.locations.values());
  }

  async getLocation(id: number): Promise<Location | undefined> {
    return this.locations.get(id);
  }

  async createLocation(insertLocation: InsertLocation): Promise<Location> {
    const id = this.locationCurrentId++;
    const location: Location = { ...insertLocation, id };
    this.locations.set(id, location);
    return location;
  }

  // Access code methods
  async getAccessCodes(): Promise<AccessCode[]> {
    return Array.from(this.accessCodes.values());
  }

  async validateAccessCode(code: string): Promise<boolean> {
    const accessCodes = await this.getAccessCodes();
    return accessCodes.some(ac => ac.code === code && ac.active);
  }

  async createAccessCode(insertAccessCode: InsertAccessCode): Promise<AccessCode> {
    const id = this.accessCodeCurrentId++;
    const accessCode: AccessCode = { ...insertAccessCode, id };
    this.accessCodes.set(id, accessCode);
    return accessCode;
  }
}

export const storage = new MemStorage();
