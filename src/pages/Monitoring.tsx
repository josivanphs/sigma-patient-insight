
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
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
import { useToast } from "@/hooks/use-toast";
import { Settings, Camera } from "lucide-react";

const CameraConfigModal = ({ onSave }: { onSave: (config: any) => void }) => {
  const [cameraIp, setCameraIp] = useState("");
  const [cameraName, setCameraName] = useState("");
  const [imageQuality, setImageQuality] = useState("medium");

  const handleSave = () => {
    onSave({
      ip: cameraIp,
      name: cameraName,
      quality: imageQuality,
    });
  };

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Configuração da Câmera</DialogTitle>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="camera-ip">IP da Câmera</Label>
          <Input
            id="camera-ip"
            placeholder="ex: 192.168.1.100"
            value={cameraIp}
            onChange={(e) => setCameraIp(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="camera-name">Nome da Câmera</Label>
          <Input
            id="camera-name"
            placeholder="ex: Câmera Principal"
            value={cameraName}
            onChange={(e) => setCameraName(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="image-quality">Qualidade da Imagem</Label>
          <Select
            value={imageQuality}
            onValueChange={setImageQuality}
          >
            <SelectTrigger id="image-quality">
              <SelectValue placeholder="Selecione a qualidade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Baixa</SelectItem>
              <SelectItem value="medium">Média</SelectItem>
              <SelectItem value="high">Alta</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-sigma-blue hover:bg-sigma-blue-dark">
          Salvar Configurações
        </Button>
      </div>
    </DialogContent>
  );
};

const Monitoring = () => {
  const { toast } = useToast();
  const [cameraConfig, setCameraConfig] = useState({
    ip: "192.168.1.100",
    name: "Câmera do Quarto",
    quality: "medium",
  });
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSaveConfig = (config: any) => {
    setCameraConfig(config);
    setDialogOpen(false);
    toast({
      title: "Configuração salva",
      description: `Câmera ${config.name} configurada com sucesso.`,
    });
  };

  const handleScreenshot = () => {
    toast({
      title: "Captura realizada",
      description: "Imagem da câmera foi salva com sucesso.",
    });
  };

  return (
    <div className="sigma-container py-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-sigma-blue">
          Monitoramento - {cameraConfig.name}
        </h2>
        <div className="flex space-x-3">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Settings size={18} />
                <span>Configurar</span>
              </Button>
            </DialogTrigger>
            <CameraConfigModal onSave={handleSaveConfig} />
          </Dialog>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={handleScreenshot}
          >
            <Camera size={18} />
            <span>Capturar</span>
          </Button>
        </div>
      </div>

      <div className="w-full h-[calc(100vh-180px)] bg-gray-900 rounded-lg overflow-hidden relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="mb-4">
              <Camera className="h-16 w-16 mx-auto text-gray-500" />
            </div>
            <p className="text-gray-400">
              Visualização da câmera {cameraConfig.name}
            </p>
            <p className="text-gray-500 text-sm mt-2">
              IP: {cameraConfig.ip} | Qualidade: {cameraConfig.quality === "low" ? "Baixa" 
                : cameraConfig.quality === "medium" ? "Média" 
                : "Alta"}
            </p>
          </div>
        </div>
        
        {/* This would be replaced with an actual camera feed in a real application */}
        <img 
          src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
          alt="Camera feed placeholder" 
          className="w-full h-full object-cover opacity-30"
        />
      </div>
    </div>
  );
};

export default Monitoring;
