
import React from "react";
import { Link, useLocation } from "react-router-dom";

export const Navbar: React.FC = () => {
  const location = useLocation();
  
  const getPageTitle = () => {
    switch (location.pathname) {
      case "/patient-info":
        return "Informações do Paciente";
      case "/monitoring":
        return "Monitoramento";
      case "/search":
        return "Procura";
      case "/routine":
        return "Rotina";
      default:
        return "SIGMA";
    }
  };

  return (
    <header className="bg-sigma-blue text-white shadow-md">
      <div className="sigma-container py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold">
            SIGMA
          </Link>
          <h1 className="text-xl font-medium ml-4 md:ml-8">{getPageTitle()}</h1>
        </div>
        <Link 
          to="/" 
          className="sigma-btn bg-sigma-blue-dark hover:bg-sigma-blue-light text-white"
        >
          Início
        </Link>
      </div>
    </header>
  );
};
