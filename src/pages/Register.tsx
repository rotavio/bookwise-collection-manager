
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Book } from "lucide-react";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: window.location.origin + "/dashboard" }
    });
    setLoading(false);
    if (error) {
      toast({ title: "Erro ao cadastrar", description: error.message, variant: "destructive" });
    } else {
      toast({
        title: "Verifique seu e-mail",
        description: "Enviamos um link para confirmar o cadastro."
      });
      navigate("/auth/login");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-md w-full border border-slate-200">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Book className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-slate-900">BookLib</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Criar sua conta</h2>
          <p className="text-slate-600 mt-2">Comece a organizar sua biblioteca hoje</p>
        </div>
        
        <form className="space-y-4" onSubmit={handleRegister}>
          <Input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            className="h-12"
          />
          <Input
            type="password"
            placeholder="Senha (mínimo 6 caracteres)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
            autoComplete="new-password"
            className="h-12"
          />
          <Button className="w-full h-12" type="submit" disabled={loading}>
            {loading ? "Criando conta..." : "Criar conta gratuita"}
          </Button>
        </form>
        
        <div className="mt-6 text-center text-sm">
          <span className="text-slate-600">Já tem uma conta? </span>
          <Link to="/auth/login" className="text-blue-600 hover:underline">Entrar</Link>
        </div>
        
        <div className="mt-4 text-center">
          <Link to="/" className="text-slate-600 hover:text-slate-900 text-sm">
            ← Voltar para início
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
