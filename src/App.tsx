/**
 * App Component
 * 
 * Root component that:
 * 1. Initializes MSAL for Microsoft Entra ID authentication
 * 2. Provides MSAL context to the application
 * 3. Sets up routing
 * 
 * MSAL Flow:
 * - PublicClientApplication is created once at startup
 * - MsalProvider makes auth methods available via hooks
 * - Components use useMsal, useIsAuthenticated hooks
 */

import { useEffect, useState } from "react";
import { PublicClientApplication, EventType, AuthenticationResult } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { msalConfig } from "@/config/authConfig";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { Loader2 } from "lucide-react";

const queryClient = new QueryClient();

// Create MSAL instance outside component to prevent re-creation
const msalInstance = new PublicClientApplication(msalConfig);

const App = () => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    /**
     * Initialize MSAL instance
     * Required before any auth operations
     */
    const initializeMsal = async () => {
      try {
        await msalInstance.initialize();
        
        // Handle redirect promise (for redirect login flow)
        await msalInstance.handleRedirectPromise();

        // Set active account if available
        const accounts = msalInstance.getAllAccounts();
        if (accounts.length > 0) {
          msalInstance.setActiveAccount(accounts[0]);
        }

        // Listen for login events to set active account
        msalInstance.addEventCallback((event) => {
          if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
            const payload = event.payload as AuthenticationResult;
            msalInstance.setActiveAccount(payload.account);
          }
        });

        setIsInitialized(true);
      } catch (error) {
        console.error("MSAL initialization failed:", error);
        setIsInitialized(true); // Still render app to show error state
      }
    };

    initializeMsal();
  }, []);

  // Show loading while MSAL initializes
  if (!isInitialized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <MsalProvider instance={msalInstance}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </MsalProvider>
  );
};

export default App;
