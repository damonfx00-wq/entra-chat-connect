/**
 * Microsoft Entra ID (Azure AD) MSAL Configuration
 * 
 * OAuth2 Flow:
 * 1. User clicks "Sign in with Microsoft"
 * 2. MSAL redirects to Microsoft login page
 * 3. After authentication, Microsoft redirects back with auth code
 * 4. MSAL exchanges code for tokens (ID token, access token)
 * 5. Tokens are stored in MSAL cache (sessionStorage by default - not localStorage)
 * 6. ID token is used for backend API calls
 */

import { Configuration, LogLevel } from "@azure/msal-browser";

/**
 * MSAL Configuration
 * Replace these values with your Azure AD App Registration details
 */
export const msalConfig: Configuration = {
  auth: {
    // Your Azure AD Application (client) ID
    clientId: "YOUR_CLIENT_ID",
    
    // Your Azure AD tenant ID or "common" for multi-tenant
    authority: "https://login.microsoftonline.com/YOUR_TENANT_ID",
    
    // Redirect URI registered in Azure AD
    redirectUri: window.location.origin,
    
    // Where to redirect after logout
    postLogoutRedirectUri: window.location.origin,
    
    // Navigate to the request URL after login
    navigateToLoginRequestUrl: true,
  },
  cache: {
    // Use sessionStorage for security - tokens cleared on tab close
    // NEVER use localStorage for sensitive tokens
    cacheLocation: "sessionStorage",
    
    // Set to true for IE11/Edge compatibility
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) return;
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            break;
          case LogLevel.Warning:
            console.warn(message);
            break;
          case LogLevel.Info:
            console.info(message);
            break;
          case LogLevel.Verbose:
            console.debug(message);
            break;
        }
      },
      logLevel: LogLevel.Warning,
    },
  },
};

/**
 * Scopes for authentication
 * openid, profile, email are standard OIDC scopes
 * Add custom scopes for your API if needed
 */
export const loginRequest = {
  scopes: ["openid", "profile", "email"],
};

/**
 * API endpoint configuration
 */
export const apiConfig = {
  // Replace with your FastAPI backend URL
  chatEndpoint: "/chat",
};
