/**
 * LoginPage Component
 * 
 * Displays Microsoft sign-in button for unauthenticated users
 * Uses MSAL redirect flow for authentication
 */

import { useMsal } from "@azure/msal-react";
import { loginRequest } from "@/config/authConfig";
import { Button } from "@/components/ui/button";
import { Bot, Shield } from "lucide-react";

export function LoginPage() {
  const { instance } = useMsal();

  /**
   * Initiate Microsoft OAuth login via redirect
   * Redirect is preferred over popup for enterprise environments
   */
  const handleLogin = () => {
    instance.loginRedirect(loginRequest);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8 text-center">
        {/* Logo & Title */}
        <div className="space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-lg">
            <Bot className="h-8 w-8 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Enterprise AI Assistant
            </h1>
            <p className="mt-2 text-muted-foreground">
              Secure AI-powered chat for your organization
            </p>
          </div>
        </div>

        {/* Login Card */}
        <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
          <div className="mb-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4" />
            <span>Secured with Microsoft Entra ID</span>
          </div>
          
          <Button
            onClick={handleLogin}
            size="lg"
            className="w-full gap-3"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="1" y="1" width="9" height="9" fill="#F25022" />
              <rect x="11" y="1" width="9" height="9" fill="#7FBA00" />
              <rect x="1" y="11" width="9" height="9" fill="#00A4EF" />
              <rect x="11" y="11" width="9" height="9" fill="#FFB900" />
            </svg>
            Sign in with Microsoft
          </Button>

          <p className="mt-6 text-xs text-muted-foreground">
            By signing in, you agree to your organization's policies
          </p>
        </div>

        {/* Footer */}
        <p className="text-xs text-muted-foreground">
          Protected by enterprise-grade security
        </p>
      </div>
    </div>
  );
}
