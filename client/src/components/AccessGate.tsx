import { useState } from "react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth.tsx";
import { Globe, Plane } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { validateAccessCodeSchema, type ValidateAccessCode } from "@shared/schema";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";

export default function AccessGate() {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const form = useForm<ValidateAccessCode>({
    resolver: zodResolver(validateAccessCodeSchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async (data: ValidateAccessCode) => {
    setIsLoading(true);
    
    try {
      const response = await fetch("/api/validate-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (response.ok && result.valid) {
        login();
        setLocation("/map");
      } else {
        toast({
          title: "Access Denied",
          description: "Invalid access code. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error validating access code:", error);
      toast({
        title: "Error",
        description: "Failed to validate access code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4">
      <Card className="w-full max-w-md animate-in fade-in duration-500 border-border">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold font-heading text-foreground">Our Travel Map</h1>
            <p className="mt-2 text-muted-foreground">Enter the access code to view our journey together</p>
          </div>

          <div className="flex justify-center mb-8">
            <div className="relative h-32 w-32">
              <Globe className="h-32 w-32 text-primary" />
              <Plane className="absolute top-4 right-4 h-8 w-8 text-accent transform rotate-45" />
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Access Code</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="Enter code" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 transition duration-200"
                disabled={isLoading}
              >
                {isLoading ? "Validating..." : "View Our Map"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
