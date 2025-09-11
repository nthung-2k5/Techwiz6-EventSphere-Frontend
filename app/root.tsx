import {
    isRouteErrorResponse,
    Links,
    Meta,
    Scripts,
    ScrollRestoration,
  } from "react-router";
  
  import type { Route } from "./+types/root";
  import "./app.css";
  import "antd/dist/reset.css";
  import "@ant-design/v5-patch-for-react-19";
  import DashboardLayout from "./components/DashboardLayout";
  import { AuthProvider } from "./context/AuthContext";
import { EventProvider } from "./context/EventContext";
  
  export const links: Route.LinksFunction = () => [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "anonymous",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
    },
  ];
  
  export function Layout({ children }: { children: React.ReactNode }) {
    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <Meta />
          <Links />
        </head>
        <body style={{ margin: 0 }}>
          {children}
          <ScrollRestoration />
          <Scripts />
        </body>
      </html>
    );
  }
  
 
  export default function App() {
    return (
        <AuthProvider>
        <EventProvider>
          <DashboardLayout />
        </EventProvider>
      </AuthProvider>
    );
  }
  
  export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    let message = "Oops!";
    let details = "An unexpected error occurred.";
    let stack: string | undefined;
  
    if (isRouteErrorResponse(error)) {
      message = error.status === 404 ? "404" : "Error";
      details =
        error.status === 404
          ? "The requested page could not be found."
          : error.statusText || details;
    } else if (import.meta.env.DEV && error instanceof Error) {
      details = error.message;
      stack = error.stack;
    }
  
    return (
      <main style={{ padding: "2rem", fontFamily: "Inter, system-ui, sans-serif" }}>
        <h1>{message}</h1>
        <p>{details}</p>
        {stack && (
          <pre style={{ background: "#f5f5f5", padding: "1rem", overflowX: "auto" }}>
            <code>{stack}</code>
          </pre>
        )}
      </main>
    );
  }
  