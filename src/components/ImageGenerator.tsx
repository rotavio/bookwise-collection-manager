
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Download, Wand2 } from 'lucide-react';
import { toast } from 'sonner';

interface ImageGeneratorProps {
  onImageGenerated: (imageUrl: string) => void;
  defaultPrompt?: string;
}

const ImageGenerator: React.FC<ImageGeneratorProps> = ({ onImageGenerated, defaultPrompt }) => {
  const [prompt, setPrompt] = useState(defaultPrompt || '');
  const [isGenerating, setIsGenerating] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const generateImage = async () => {
    if (!apiKey.trim()) {
      toast.error('Por favor, insira sua chave da API do OpenAI');
      return;
    }

    if (!prompt.trim()) {
      toast.error('Por favor, insira uma descrição para a imagem');
      return;
    }

    setIsGenerating(true);

    try {
      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-image-1',
          prompt: prompt,
          n: 1,
          size: '1024x1024',
          quality: 'high',
          output_format: 'webp'
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Erro ao gerar imagem');
      }

      const data = await response.json();
      
      if (data.data && data.data[0] && data.data[0].b64_json) {
        const imageUrl = `data:image/webp;base64,${data.data[0].b64_json}`;
        setGeneratedImage(imageUrl);
        onImageGenerated(imageUrl);
        toast.success('Imagem gerada com sucesso!');
      } else {
        throw new Error('Formato de resposta inesperado');
      }
    } catch (error: any) {
      console.error('Erro ao gerar imagem:', error);
      toast.error(`Erro ao gerar imagem: ${error.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadImage = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = 'board-games-hero.webp';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="space-y-4 p-6 bg-white rounded-lg shadow-lg">
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">
          Chave da API OpenAI
        </label>
        <Input
          type="password"
          placeholder="sk-..."
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className="w-full"
        />
        <p className="text-xs text-slate-500">
          Obtenha sua chave em: <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">platform.openai.com/api-keys</a>
        </p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">
          Descrição da Imagem
        </label>
        <Input
          placeholder="Uma estante moderna organizada com board games..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full"
        />
      </div>

      <Button 
        onClick={generateImage} 
        disabled={isGenerating}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Gerando imagem...
          </>
        ) : (
          <>
            <Wand2 className="w-4 h-4 mr-2" />
            Gerar Imagem
          </>
        )}
      </Button>

      {generatedImage && (
        <div className="space-y-3">
          <img 
            src={generatedImage} 
            alt="Imagem gerada com board games" 
            className="w-full rounded-lg shadow-md"
          />
          <Button 
            onClick={downloadImage}
            variant="outline"
            className="w-full"
          >
            <Download className="w-4 h-4 mr-2" />
            Baixar Imagem
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImageGenerator;
