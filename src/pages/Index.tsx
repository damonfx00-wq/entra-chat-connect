/**
 * Index Page - Authentication Router
 * 
 * Uses MSAL hooks to determine authentication state:
 * - Shows LoginPage if user is not authenticated
 * - Shows ChatPage if user is authenticated
 * 
 * Also handles loading state during authentication checks
 */

import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";
import { ChatPage } from "@/components/ChatPage";
import { LoginPage } from "@/components/LoginPage";
import { Loader2 } from "lucide-react";

const Index = () => {
  const isAuthenticated = useIsAuthenticated();
  const { inProgress } = useMsal();

  // Show loading while MSAL handles authentication
  if (inProgress !== InteractionStatus.None) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">
            Authenticating...
          </p>
        </div>
      </div>
    );
  }

  // Route based on authentication state
  return isAuthenticated ? <ChatPage /> : <LoginPage />;
};

export default Index;
