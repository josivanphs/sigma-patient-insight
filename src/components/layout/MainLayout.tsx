
import React from "react";
import { Navbar } from "./Navbar";
import { useLocation } from "react-router-dom";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col bg-sigma-white">
      {!isHomePage && <Navbar />}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};
