
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Book } from "lucide-react";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast({ title: "Falha ao entrar", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Login realizado com sucesso!" });
      navigate("/dashboard");
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
          <h2 className="text-2xl font-bold text-slate-900">Entrar na sua conta</h2>
          <p className="text-slate-600 mt-2">Acesse sua biblioteca digital</p>
        </div>
        
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <Input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="h-12"
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="h-12"
            />
          </div>
          <Button className="w-full h-12" type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </form>
        
        <div className="mt-6 flex justify-between text-sm">
          <Link to="/auth/reset" className="text-blue-600 hover:underline">Esqueceu a senha?</Link>
          <Link to="/auth/register" className="text-blue-600 hover:underline">Criar conta</Link>
        </div>
        
        <div className="mt-6 text-center">
          <Link to="/" className="text-slate-600 hover:text-slate-900 text-sm">
            ← Voltar para início
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
