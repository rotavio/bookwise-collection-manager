
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

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
      options: { emailRedirectTo: window.location.origin + "/" }
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
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50">
      <div className="bg-white shadow rounded-lg p-8 max-w-md w-full">
        <h2 className="text-xl font-bold mb-2 text-center">Cadastre-se</h2>
        <form className="space-y-4" onSubmit={handleRegister}>
          <Input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
            autoComplete="new-password"
          />
          <Button className="w-full" type="submit" disabled={loading}>
            {loading ? "Cadastrando..." : "Criar conta"}
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          <span>Já tem uma conta? </span>
          <Link to="/auth/login" className="text-blue-600 hover:underline">Entrar</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
