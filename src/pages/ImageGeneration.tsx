
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Book } from 'lucide-react';
import ImageGenerator from '@/components/ImageGenerator';

const ImageGeneration = () => {
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);

  const boardGamePrompt = "A modern, well-organized bookshelf filled with colorful board games instead of books. The shelf should have multiple levels with various board game boxes neatly arranged - including classic games, strategy games, and modern tabletop games. The boxes should have vibrant covers and different sizes. The setting should be in a bright, contemporary room with good lighting, wooden shelves, and a cozy atmosphere. The image should have the same composition and style as a library but featuring board games. High quality, detailed, realistic photography style.";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button asChild variant="ghost" size="sm">
                <Link to="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar
                </Link>
              </Button>
              <div className="flex items-center space-x-2">
                <Book className="w-8 h-8 text-blue-600" />
                <span className="text-2xl font-bold text-slate-900">GameLib</span>
                <span className="text-sm text-slate-500">Gerador de Imagens</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Gerar Imagem Hero com Board Games
            </h1>
            <p className="text-xl text-slate-600">
              Crie uma imagem similar à da home, mas com jogos de tabuleiro ao invés de livros
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Gerador de Imagem</h2>
              <ImageGenerator 
                onImageGenerated={setGeneratedImageUrl}
                defaultPrompt={boardGamePrompt}
              />
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Prévia</h2>
              <div className="bg-white rounded-lg shadow-lg p-6">
                {generatedImageUrl ? (
                  <div className="space-y-4">
                    <img 
                      src={generatedImageUrl} 
                      alt="Hero image com board games"
                      className="w-full rounded-lg shadow-md"
                    />
                    <p className="text-sm text-slate-600">
                      Imagem gerada com sucesso! Você pode baixá-la e usar como imagem hero.
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-slate-400 mb-4">
                      <Book className="w-16 h-16 mx-auto" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      Gere sua imagem
                    </h3>
                    <p className="text-slate-600">
                      Use o gerador ao lado para criar uma imagem com board games
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Como usar:</h3>
            <ol className="list-decimal list-inside space-y-2 text-slate-600">
              <li>Obtenha uma chave da API do OpenAI em platform.openai.com/api-keys</li>
              <li>Insira sua chave no campo apropriado</li>
              <li>Ajuste a descrição da imagem se necessário</li>
              <li>Clique em "Gerar Imagem" e aguarde</li>
              <li>Baixe a imagem gerada e substitua na página inicial</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGeneration;
