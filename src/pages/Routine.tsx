
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface Event {
  id: number;
  date: Date;
  type: "medico" | "dieta" | "exercicio";
  title: string;
  description: string;
}

const Routine = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [eventType, setEventType] = useState<"medico" | "dieta" | "exercicio">("medico");
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      date: new Date(2025, 3, 28), // April 28, 2025
      type: "medico",
      title: "Consulta Dr. Santos",
      description: "Avaliação geral",
    },
    {
      id: 2,
      date: new Date(2025, 3, 29), // April 29, 2025
      type: "dieta",
      title: "Novo plano alimentar",
      description: "Dieta balanceada com restrição de sódio",
    },
    {
      id: 3,
      date: new Date(2025, 3, 30), // April 30, 2025
      type: "exercicio",
      title: "Fisioterapia",
      description: "Exercícios leves para fortalecer membros inferiores",
    },
  ]);

  const handleAddEvent = () => {
    if (!date || !eventTitle.trim()) {
      toast({
        title: "Erro",
        description: "Data e título são obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    const newEvent: Event = {
      id: events.length + 1,
      date: date,
      type: eventType,
      title: eventTitle,
      description: eventDescription,
    };

    setEvents([...events, newEvent]);
    setDialogOpen(false);
    setEventTitle("");
    setEventDescription("");

    toast({
      title: "Evento adicionado",
      description: `${eventTitle} foi adicionado ao calendário.`,
    });
  };

  const getTypeIcon = (type: "medico" | "dieta" | "exercicio") => {
    switch (type) {
      case "medico":
        return "👨‍⚕️";
      case "dieta":
        return "🍎";
      case "exercicio":
        return "🏋️";
      default:
        return "📅";
    }
  };

  const getTypeColor = (type: "medico" | "dieta" | "exercicio") => {
    switch (type) {
      case "medico":
        return "bg-blue-100 text-blue-800";
      case "dieta":
        return "bg-green-100 text-green-800";
      case "exercicio":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const selectedDateEvents = events.filter(
    (event) => 
      date && 
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
  );

  // Custom day rendering to show events
  const renderDay = (day: Date) => {
    const eventsOnDay = events.filter(
      (event) => 
        event.date.getDate() === day.getDate() &&
        event.date.getMonth() === day.getMonth() &&
        event.date.getFullYear() === day.getFullYear()
    );

    const hasEvents = eventsOnDay.length > 0;

    return (
      <div className="relative">
        <div className={hasEvents ? "font-bold" : ""}>{day.getDate()}</div>
        {hasEvents && (
          <div className="absolute bottom-0 left-0 right-0 flex justify-center">
            <div className="h-1 w-1 rounded-full bg-sigma-blue"></div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="sigma-container py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Card className="p-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="p-3 pointer-events-auto"
              renderDay={renderDay}
            />
          </Card>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full mt-4 bg-sigma-blue hover:bg-sigma-blue-dark">
                Adicionar Evento
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Adicionar Novo Evento</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="event-type">Tipo</Label>
                  <Select 
                    value={eventType} 
                    onValueChange={(value: "medico" | "dieta" | "exercicio") => setEventType(value)}
                  >
                    <SelectTrigger id="event-type">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="medico">Médico</SelectItem>
                      <SelectItem value="dieta">Dieta</SelectItem>
                      <SelectItem value="exercicio">Exercício</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                    placeholder="Título do evento"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Input
                    id="description"
                    value={eventDescription}
                    onChange={(e) => setEventDescription(e.target.value)}
                    placeholder="Descrição do evento"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button 
                  type="submit" 
                  onClick={handleAddEvent}
                  className="bg-sigma-blue hover:bg-sigma-blue-dark"
                >
                  Salvar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold text-sigma-blue mb-4">
            {date ? (
              <>Eventos para {date.toLocaleDateString('pt-BR')}</>
            ) : (
              <>Selecione uma data</>
            )}
          </h2>
          
          {selectedDateEvents.length > 0 ? (
            <div className="space-y-4">
              {selectedDateEvents.map((event) => (
                <Card key={event.id} className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{getTypeIcon(event.type)}</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">{event.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs ${getTypeColor(event.type)}`}>
                          {event.type === "medico" ? "Médico" : 
                           event.type === "dieta" ? "Dieta" : "Exercício"}
                        </span>
                      </div>
                      <p className="text-gray-600 mt-1">{event.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-6">
              <div className="text-center text-gray-500">
                <p>Nenhum evento para esta data</p>
                <p className="text-sm mt-2">Adicione um novo evento usando o botão abaixo</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Routine;
