
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, Heart, BarChart3, Search, Bookmark, Trophy } from "lucide-react";

const LandingPage = () => {
  const features = [
    {
      icon: Book,
      title: "Gerencie sua Coleção",
      description: "Organize todos os seus livros em uma biblioteca digital completa e intuitiva."
    },
    {
      icon: Heart,
      title: "Lista de Desejos",
      description: "Mantenha uma lista dos livros que você deseja ler ou comprar no futuro."
    },
    {
      icon: Bookmark,
      title: "Aguardando Chegada",
      description: "Acompanhe os livros que você comprou e estão a caminho da sua casa."
    },
    {
      icon: Search,
      title: "Busca Avançada",
      description: "Encontre qualquer livro rapidamente com nossa ferramenta de busca inteligente."
    },
    {
      icon: BarChart3,
      title: "Relatórios e Estatísticas",
      description: "Visualize suas estatísticas de leitura e acompanhe seu progresso ao longo do tempo."
    },
    {
      icon: Trophy,
      title: "Acompanhe seu Progresso",
      description: "Defina metas de leitura e acompanhe seus objetivos com dashboards personalizados."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Book className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-slate-900">BookLib</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button asChild variant="ghost">
                <Link to="/auth/login">Entrar</Link>
              </Button>
              <Button asChild>
                <Link to="/auth/register">Começar Agora</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              Sua Biblioteca
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 block">
                Digital Perfeita
              </span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Organize, gerencie e descubra seus livros favoritos em um só lugar. 
              Uma experiência completa para bibliófilo modernos.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button asChild size="lg" className="px-8 py-3 text-lg">
              <Link to="/auth/register">Criar Conta Gratuita</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8 py-3 text-lg">
              <Link to="/auth/login">Já tenho conta</Link>
            </Button>
          </div>

          {/* Preview Image Placeholder */}
          <div className="relative max-w-5xl mx-auto">
            <div className="bg-white rounded-xl shadow-2xl p-8 border border-slate-200">
              <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Book className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-500 text-lg">Interface do BookLib</p>
                  <p className="text-slate-400">Dashboard interativo para gerenciar sua biblioteca</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Tudo que você precisa para organizar seus livros
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Funcionalidades pensadas especialmente para quem ama livros e quer manter sua coleção sempre organizada.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-slate-200 hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl text-slate-900">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-600 leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Pronto para organizar sua biblioteca?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de leitores que já descobriram a melhor forma de gerenciar seus livros.
          </p>
          <Button asChild size="lg" variant="secondary" className="px-8 py-3 text-lg">
            <Link to="/auth/register">Começar Gratuitamente</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Book className="w-8 h-8 text-blue-400" />
              <span className="text-2xl font-bold text-white">BookLib</span>
            </div>
            <div className="text-slate-400 text-center md:text-right">
              <p>&copy; 2024 BookLib. Sua biblioteca digital pessoal.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
