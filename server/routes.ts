import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { validateAccessCodeSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes
  
  // Validate access code
  app.post("/api/validate-code", async (req, res) => {
    try {
      const result = validateAccessCodeSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          message: "Invalid request", 
          errors: result.error.errors 
        });
      }
      
      const isValid = await storage.validateAccessCode(result.data.code);
      
      if (isValid) {
        return res.status(200).json({ 
          valid: true, 
          message: "Access granted" 
        });
      } else {
        return res.status(401).json({ 
          valid: false, 
          message: "Invalid access code" 
        });
      }
    } catch (error) {
      console.error("Error validating access code:", error);
      return res.status(500).json({ 
        message: "Internal server error" 
      });
    }
  });

  // Get all locations
  app.get("/api/locations", async (req, res) => {
    try {
      const locations = await storage.getLocations();
      return res.status(200).json(locations);
    } catch (error) {
      console.error("Error getting locations:", error);
      return res.status(500).json({ 
        message: "Internal server error" 
      });
    }
  });

  // Get location by ID
  app.get("/api/locations/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ 
          message: "Invalid location ID" 
        });
      }
      
      const location = await storage.getLocation(id);
      
      if (!location) {
        return res.status(404).json({ 
          message: "Location not found" 
        });
      }
      
      return res.status(200).json(location);
    } catch (error) {
      console.error("Error getting location:", error);
      return res.status(500).json({ 
        message: "Internal server error" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
