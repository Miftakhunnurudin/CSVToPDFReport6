import { useLocation } from "wouter";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ChevronDown, LogOut, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SessionResponse {
  authenticated: boolean;
  user?: {
    id: string;
    username: string;
  };
}

export default function AppHeader() {
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
  const { data: session } = useQuery<SessionResponse>({
    queryKey: ["/api/auth/session"],
  });
  
  const isInbound = location.startsWith("/inbound");
  const isOutbound = location.startsWith("/outbound");
  const isCustomers = location.includes("/customers");
  const isStaffs = location.includes("/staffs");
  
  const currentSection = isOutbound ? "Outbound" : "Inbound";
  const currentSubSection = isCustomers ? "Customers" : "Staffs";

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await apiRequest("POST", "/api/auth/logout", {});
      
      await queryClient.invalidateQueries({ queryKey: ["/api/auth/session"] });
      
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
    } catch (error) {
      toast({
        title: "Logout failed",
        description: "An error occurred while logging out",
        variant: "destructive",
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <nav className="flex items-center h-14 gap-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="gap-2 font-medium"
                data-testid="dropdown-inbound"
              >
                Inbound
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem 
                onClick={() => setLocation("/inbound/customers")}
                data-testid="menu-inbound-customers"
              >
                Customers
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setLocation("/inbound/staffs")}
                data-testid="menu-inbound-staffs"
              >
                Staffs
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="gap-2 font-medium"
                data-testid="dropdown-outbound"
              >
                Outbound
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem 
                onClick={() => setLocation("/outbound/customers")}
                data-testid="menu-outbound-customers"
              >
                Customers
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setLocation("/outbound/staffs")}
                data-testid="menu-outbound-staffs"
              >
                Staffs
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="ml-auto flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="font-medium">{currentSection}</span>
              <span>/</span>
              <span>{currentSubSection}</span>
            </div>
            {session?.user && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground" data-testid="user-info">
                <User className="w-4 h-4" />
                <span>{session.user.username}</span>
              </div>
            )}
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleLogout}
              disabled={isLoggingOut}
              data-testid="button-logout"
              className="gap-2"
            >
              <LogOut className="w-4 h-4" />
              {isLoggingOut ? "Logging out..." : "Logout"}
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
