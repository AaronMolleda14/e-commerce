// app/middleware.ts 
import { withAuth } from "next-auth/middleware"; 

export default withAuth({ 
  callbacks: { 
    authorized({ token, req }) { 
      const pathname = req.nextUrl.pathname; 
      // Protect admin routes (adminProducts, adminUsers, adminOrders, dashboard, etc.) 
      if (pathname.startsWith("/adminProducts") || pathname.startsWith("/adminUsers") || pathname.startsWith("/adminOrders") || pathname.startsWith("/dashboard")) { 
        return token?.role === "ADMIN"; 
      } 
      
      if (pathname.startsWith("/checkout")) { 
        return !!token; 
      } 
      
      return true; 
    }, 
  }, 
}); 

export const config = { 
  matcher: [ 
    "/adminProducts/:path*", 
    "/adminUsers/:path*", 
    "/adminOrders/:path*", 
    "/dashboard/:path*", 
    "/checkout/:path*", 
    "/adminProducts", 
    "/adminUsers", 
    "/adminOrders", 
    "/dashboard", 
  ], 
};