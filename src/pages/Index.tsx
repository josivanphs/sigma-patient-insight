
import React from "react";
import { Link } from "react-router-dom";
import { FileText, Camera, Search, Calendar } from "lucide-react";

const Index = () => {
  const navigationCards = [
    {
      title: "Informações do Paciente",
      path: "/patient-info",
      icon: <FileText className="h-12 w-12 text-sigma-blue" />,
      description: "Gerenciar dados e informações do paciente",
    },
    {
      title: "Monitoramento",
      path: "/monitoring",
      icon: <Camera className="h-12 w-12 text-sigma-blue" />,
      description: "Visualizar câmera e monitorar o paciente",
    },
    {
      title: "Procura",
      path: "/search",
      icon: <Search className="h-12 w-12 text-sigma-blue" />,
      description: "Pesquisar ações do paciente no banco de dados",
    },
    {
      title: "Rotina",
      path: "/routine",
      icon: <Calendar className="h-12 w-12 text-sigma-blue" />,
      description: "Programar médico, dieta e exercícios",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-sigma-white p-4">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-sigma-blue mb-4">SIGMA</h1>
        <p className="text-xl text-sigma-black-light max-w-md mx-auto">
          Sistema Integrado de Gerenciamento e Monitoramento Assistencial
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
        {navigationCards.map((card) => (
          <Link
            to={card.path}
            key={card.title}
            className="sigma-card hover:border-sigma-blue flex flex-col items-center p-8"
          >
            <div className="mb-4">{card.icon}</div>
            <h2 className="text-xl font-semibold text-sigma-black mb-2">{card.title}</h2>
            <p className="text-sigma-black-light text-center">{card.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Index;
