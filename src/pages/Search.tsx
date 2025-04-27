
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Search as SearchIcon } from "lucide-react";

// Mock data for patient actions
const patientActions = [
  { id: 1, time: "08:15", date: "2025-04-27", action: "Medicação administrada: Paracetamol 500mg" },
  { id: 2, time: "09:30", date: "2025-04-27", action: "Sinais vitais verificados: Temperatura 36.5°C, Pressão 120/80" },
  { id: 3, time: "12:00", date: "2025-04-27", action: "Alimentação: Almoço completo" },
  { id: 4, time: "14:45", date: "2025-04-27", action: "Fisioterapia realizada: 30 minutos" },
  { id: 5, time: "16:30", date: "2025-04-27", action: "Medicação administrada: Dipirona 1g" },
  { id: 6, time: "18:00", date: "2025-04-27", action: "Alimentação: Janta completa" },
  { id: 7, time: "20:30", date: "2025-04-27", action: "Medicação administrada: Paracetamol 500mg" },
  { id: 8, time: "22:00", date: "2025-04-26", action: "Paciente dormiu" },
  { id: 9, time: "14:30", date: "2025-04-26", action: "Visita médica: Dr. Silva" },
  { id: 10, time: "10:15", date: "2025-04-26", action: "Banho realizado com assistência" },
];

// Mock AI responses
const aiResponses: Record<string, string> = {
  "quando foi a última medicação": "A última medicação foi administrada às 20:30 em 27/04/2025, Paracetamol 500mg.",
  "quando o paciente comeu": "O paciente realizou as refeições às 12:00 (almoço) e às 18:00 (janta) em 27/04/2025.",
  "quais os sinais vitais": "Os últimos sinais vitais registrados foram às 09:30 em 27/04/2025: Temperatura 36.5°C, Pressão 120/80.",
  "visita médica": "A última visita médica foi realizada pelo Dr. Silva às 14:30 em 26/04/2025.",
};

const Search = () => {
  const [timeFilter, setTimeFilter] = useState("day");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const filteredActions = patientActions.filter((action) => {
    const actionDate = new Date(action.date);
    const today = new Date();
    
    switch(timeFilter) {
      case "hour":
        const oneHourAgo = new Date(today.getTime() - 60 * 60 * 1000);
        return actionDate >= oneHourAgo;
      case "12hours":
        const twelveHoursAgo = new Date(today.getTime() - 12 * 60 * 60 * 1000);
        return actionDate >= twelveHoursAgo;
      case "day":
        return actionDate.toDateString() === today.toDateString();
      case "week":
        const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        return actionDate >= oneWeekAgo;
      case "month":
        return actionDate.getMonth() === today.getMonth() && 
               actionDate.getFullYear() === today.getFullYear();
      default:
        return true;
    }
  });

  const handleSearch = () => {
    // Simplified AI search for demo purposes
    const query = searchQuery.toLowerCase().trim();
    
    // Check for matches in our predefined responses
    for (const key in aiResponses) {
      if (query.includes(key)) {
        setSearchResult(aiResponses[key]);
        return;
      }
    }
    
    // Default response if no match found
    setSearchResult("Não encontrei informações específicas sobre essa consulta. Por favor, reformule ou seja mais específico.");
  };

  return (
    <div className="sigma-container py-6">
      <div className="grid grid-cols-1 gap-6">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-sigma-blue">
              Histórico de Ações
            </h2>
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecione o período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hour">Última hora</SelectItem>
                <SelectItem value="12hours">Últimas 12 horas</SelectItem>
                <SelectItem value="day">Hoje</SelectItem>
                <SelectItem value="week">Esta semana</SelectItem>
                <SelectItem value="month">Este mês</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card className="p-4 h-[300px] overflow-y-auto">
            {filteredActions.length > 0 ? (
              <ul className="space-y-3">
                {filteredActions.map((action) => (
                  <li key={action.id} className="border-b pb-2">
                    <div className="text-sm text-sigma-blue font-medium">
                      {action.time} - {formatDate(action.date)}
                    </div>
                    <div className="text-sigma-black">{action.action}</div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                Nenhuma ação encontrada para este período
              </div>
            )}
          </Card>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-bold text-sigma-blue mb-4">
            Procurar por Ação
          </h2>
          
          <div className="space-y-4">
            <div className="flex space-x-2">
              <Input 
                placeholder="Digite sua pergunta ou ação..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button 
                className="bg-sigma-blue hover:bg-sigma-blue-dark flex items-center gap-2"
                onClick={handleSearch}
              >
                <SearchIcon size={18} />
                <span>Procurar</span>
              </Button>
            </div>
            
            {searchResult && (
              <Card className="p-4 bg-gray-50">
                <h3 className="font-medium text-sigma-blue mb-2">Resultado:</h3>
                <p>{searchResult}</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
