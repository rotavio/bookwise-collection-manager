
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, Heart, BarChart3, Search, Bookmark, Trophy, Star, Users, Clock, CheckCircle } from "lucide-react";

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

  const testimonials = [
    {
      name: "Maria Silva",
      text: "O BookLib transformou completamente como organizo minha biblioteca. Agora consigo encontrar qualquer livro em segundos!",
      rating: 5
    },
    {
      name: "João Santos",
      text: "Perfeito para quem tem muitos livros. As estatísticas me motivam a ler ainda mais!",
      rating: 5
    },
    {
      name: "Ana Costa",
      text: "Interface linda e muito fácil de usar. Recomendo para todos os amantes de livros!",
      rating: 5
    }
  ];

  const stats = [
    { icon: Users, value: "50K+", label: "Usuários Ativos" },
    { icon: Book, value: "2M+", label: "Livros Catalogados" },
    { icon: Clock, value: "24/7", label: "Disponibilidade" },
    { icon: Star, value: "4.9", label: "Avaliação Média" }
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
              <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Link to="/auth/register">Começar Agora</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
        <div className="max-w-7xl mx-auto text-center relative">
          <div className="mb-8">
            <h1 className="text-6xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight">
              Sua Biblioteca
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 block">
                Digital Perfeita
              </span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Organize, gerencie e descubra seus livros favoritos em um só lugar. 
              Uma experiência completa para bibliófilo modernos com tecnologia de ponta.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button asChild size="lg" className="px-10 py-4 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300">
              <Link to="/auth/register">Criar Conta Gratuita</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-10 py-4 text-lg border-2 hover:bg-slate-50 transition-all duration-300">
              <Link to="/auth/login">Já tenho conta</Link>
            </Button>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
                  <div className="text-slate-600">{stat.label}</div>
                </div>
              );
            })}
          </div>

          {/* Preview Image Placeholder */}
          <div className="relative max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-slate-200 transform hover:scale-105 transition-transform duration-300">
              <div className="aspect-video bg-gradient-to-br from-slate-100 via-blue-50 to-purple-50 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <Book className="w-20 h-20 text-blue-500 mx-auto mb-6" />
                  <p className="text-slate-700 text-xl font-semibold mb-2">Interface do BookLib</p>
                  <p className="text-slate-500 text-lg">Dashboard interativo para gerenciar sua biblioteca</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-slate-900 mb-6">
              Tudo que você precisa para organizar seus livros
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Funcionalidades pensadas especialmente para quem ama livros e quer manter sua coleção sempre organizada de forma moderna e eficiente.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-slate-200 hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                  <CardHeader>
                    <div className="w-14 h-14 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:from-blue-200 group-hover:to-purple-200 transition-colors duration-300">
                      <Icon className="w-7 h-7 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl text-slate-900">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-600 leading-relaxed text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              O que nossos usuários dizem
            </h2>
            <p className="text-xl text-slate-600">
              Milhares de leitores já transformaram sua experiência com livros
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white border-slate-200 hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-700 mb-4 italic">"{testimonial.text}"</p>
                  <p className="font-semibold text-slate-900">— {testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Por que escolher o BookLib?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">100% Gratuito</h3>
                    <p className="text-slate-600">Todas as funcionalidades principais são completamente gratuitas, sem taxas ocultas.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">Fácil de Usar</h3>
                    <p className="text-slate-600">Interface intuitiva que qualquer pessoa pode usar, independente da idade ou experiência técnica.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">Sempre Disponível</h3>
                    <p className="text-slate-600">Acesse sua biblioteca de qualquer dispositivo, a qualquer hora, em qualquer lugar.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">Dados Seguros</h3>
                    <p className="text-slate-600">Seus dados estão protegidos com a mais alta tecnologia de segurança e criptografia.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8 flex items-center justify-center">
              <div className="text-center">
                <Book className="w-32 h-32 text-blue-500 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Sua biblioteca digital perfeita</h3>
                <p className="text-slate-600">Organize, descubra e acompanhe sua jornada literária</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Pronto para organizar sua biblioteca?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Junte-se a milhares de leitores que já descobriram a melhor forma de gerenciar seus livros. 
            Comece gratuitamente hoje mesmo!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="px-10 py-4 text-lg bg-white text-slate-900 hover:bg-slate-100 shadow-lg hover:shadow-xl transition-all duration-300">
              <Link to="/auth/register">Começar Gratuitamente</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="px-10 py-4 text-lg border-2 border-white text-white hover:bg-white hover:text-slate-900 transition-all duration-300">
              <Link to="/auth/login">Fazer Login</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Book className="w-8 h-8 text-blue-400" />
                <span className="text-2xl font-bold text-white">BookLib</span>
              </div>
              <p className="text-slate-400 max-w-md">
                A plataforma completa para organizar, gerenciar e descobrir livros. 
                Transforme sua experiência de leitura com nossa tecnologia inovadora.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Produto</h3>
              <ul className="space-y-2 text-slate-400">
                <li><Link to="/auth/register" className="hover:text-white transition-colors">Funcionalidades</Link></li>
                <li><Link to="/auth/register" className="hover:text-white transition-colors">Preços</Link></li>
                <li><Link to="/auth/register" className="hover:text-white transition-colors">Suporte</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2 text-slate-400">
                <li><Link to="/auth/register" className="hover:text-white transition-colors">Sobre</Link></li>
                <li><Link to="/auth/register" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link to="/auth/register" className="hover:text-white transition-colors">Contato</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between">
            <div className="text-slate-400 text-center md:text-left mb-4 md:mb-0">
              <p>&copy; 2024 BookLib. Sua biblioteca digital pessoal.</p>
            </div>
            <div className="text-slate-400">
              <p>Feito com ❤️ para amantes de livros</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
