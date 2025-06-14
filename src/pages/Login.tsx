
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

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
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50">
      <div className="bg-white shadow rounded-lg p-8 max-w-md w-full">
        <h2 className="text-xl font-bold mb-2 text-center">Entrar</h2>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <Input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
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
            />
          </div>
          <Button className="w-full" type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </form>
        <div className="mt-4 flex justify-between text-sm">
          <Link to="/auth/reset" className="text-blue-600 hover:underline">Esqueceu a senha?</Link>
          <Link to="/auth/register" className="text-blue-600 hover:underline">Cadastre-se</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
