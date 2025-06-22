
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Book, 
  Plus, 
  Search, 
  Heart, 
  BarChart3, 
  Settings,
  ArrowRight,
  ArrowLeft,
  Check,
  Clock,
  Star
} from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Bem-vindo ao BookLib! 📚",
      description: "Sua biblioteca digital pessoal está pronta para organizar todos os seus livros de forma inteligente.",
      icon: Book,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      content: (
        <div className="text-center space-y-4">
          <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mx-auto flex items-center justify-center">
            <Book className="w-12 h-12 text-blue-600" />
          </div>
          <p className="text-slate-600 leading-relaxed">
            O BookLib foi criado especialmente para amantes de livros que querem manter sua coleção sempre organizada e acessível.
          </p>
        </div>
      )
    },
    {
      title: "Adicione seus primeiros livros",
      description: "Comece criando sua biblioteca digital adicionando os livros que você possui.",
      icon: Plus,
      color: "text-green-600",
      bgColor: "bg-green-100",
      content: (
        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Plus className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-slate-900">Clique em "Adicionar Livro"</p>
              <p className="text-sm text-slate-600">Na seção "Meus Livros" do menu lateral</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Search className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-slate-900">Busque ou digite manualmente</p>
              <p className="text-sm text-slate-600">Encontre rapidamente usando nossa busca inteligente</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Organize com listas inteligentes",
      description: "Use nossas listas especiais para manter tudo organizando conforme seu fluxo de leitura.",
      icon: Heart,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center space-x-3 p-3 border border-slate-200 rounded-lg">
              <Heart className="w-5 h-5 text-red-500" />
              <div>
                <p className="font-medium text-slate-900">Lista de Desejos</p>
                <p className="text-sm text-slate-600">Livros que você quer ler ou comprar</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 border border-slate-200 rounded-lg">
              <Clock className="w-5 h-5 text-orange-500" />
              <div>
                <p className="font-medium text-slate-900">Aguardando Chegada</p>
                <p className="text-sm text-slate-600">Livros comprados que estão a caminho</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 border border-slate-200 rounded-lg">
              <Star className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="font-medium text-slate-900">Em Leitura</p>
                <p className="text-sm text-slate-600">Acompanhe seu progresso atual</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Acompanhe suas estatísticas",
      description: "Visualize seu progresso de leitura com relatórios detalhados e metas personalizadas.",
      icon: BarChart3,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100",
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded-lg">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-indigo-600">42</div>
                <div className="text-sm text-slate-600">Livros Lidos</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">156h</div>
                <div className="text-sm text-slate-600">Horas de Leitura</div>
              </div>
            </div>
          </div>
          <p className="text-slate-600 text-sm">
            Acesse a seção "Relatórios" para ver gráficos detalhados, definir metas anuais e acompanhar sua evolução como leitor.
          </p>
        </div>
      )
    },
    {
      title: "Personalize sua experiência",
      description: "Configure o app do seu jeito nas configurações para uma experiência ainda melhor.",
      icon: Settings,
      color: "text-slate-600",
      bgColor: "bg-slate-100",
      content: (
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <span className="text-slate-900 font-medium">Tema escuro/claro</span>
              <Badge variant="secondary">Configurações</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <span className="text-slate-900 font-medium">Metas de leitura</span>
              <Badge variant="secondary">Configurações</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <span className="text-slate-900 font-medium">Notificações</span>
              <Badge variant="secondary">Configurações</Badge>
            </div>
          </div>
          <p className="text-slate-600 text-sm">
            Explore todas as opções disponíveis no menu "Configurações" para personalizar sua experiência.
          </p>
        </div>
      )
    },
    {
      title: "Tudo pronto! 🎉",
      description: "Agora você está pronto para começar a organizar sua biblioteca digital.",
      icon: Check,
      color: "text-green-600",
      bgColor: "bg-green-100",
      content: (
        <div className="text-center space-y-4">
          <div className="w-24 h-24 bg-gradient-to-r from-green-100 to-blue-100 rounded-full mx-auto flex items-center justify-center">
            <Check className="w-12 h-12 text-green-600" />
          </div>
          <div className="space-y-2">
            <p className="text-slate-900 font-medium">Sua jornada literária começa agora!</p>
            <p className="text-slate-600 text-sm">
              Comece adicionando seus primeiros livros e explore todas as funcionalidades do BookLib.
            </p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-blue-800 text-sm font-medium">💡 Dica:</p>
            <p className="text-blue-700 text-sm">
              Você pode acessar este tutorial novamente nas configurações a qualquer momento.
            </p>
          </div>
        </div>
      )
    }
  ];

  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  const handleNext = () => {
    if (isLastStep) {
      onComplete();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex space-x-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index <= currentStep ? 'bg-blue-600' : 'bg-slate-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-slate-500">
              {currentStep + 1} de {steps.length}
            </span>
          </div>
          <CardTitle className="text-2xl text-slate-900 mb-2">
            {currentStepData.title}
          </CardTitle>
          <p className="text-slate-600">
            {currentStepData.description}
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {currentStepData.content}

          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            <div className="flex space-x-2">
              {!isFirstStep && (
                <Button
                  onClick={handlePrevious}
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Anterior</span>
                </Button>
              )}
              {!isLastStep && (
                <Button
                  onClick={handleSkip}
                  variant="ghost"
                  className="text-slate-500 hover:text-slate-700"
                >
                  Pular tutorial
                </Button>
              )}
            </div>

            <Button
              onClick={handleNext}
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <span>{isLastStep ? 'Começar a usar' : 'Próximo'}</span>
              {!isLastStep && <ArrowRight className="w-4 h-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;
