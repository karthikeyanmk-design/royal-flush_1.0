"use client";
// "use client"
import { useAppPathname } from "@/lib/navigation";
import { AppLink } from "@/lib/navigation";
import { useEffect } from "react";

const NotFound = () => {
  const pathname = useAppPathname();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", pathname);
  }, [pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <AppLink href="/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </AppLink>
      </div>
    </div>
  );
};

export default NotFound;
