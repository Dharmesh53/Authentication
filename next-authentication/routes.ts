// Routes accessible to public, don't require Authentication
export const publicRoutes = ["/", "/auth/new-verification"];

// Routes accessible to public, redirect logged in users to settings
export const authRoutes = ["/auth/login", "/auth/register", "/auth/error"];

// Redirect path after login and register, place where authroutes are going to redirect you after login or if already loggedin
export const DEFAULT_LOGIN_REDIRECT = "/settings";

// prefix for API authentication routes
export const apiAuthPrefix = "/api/auth";
