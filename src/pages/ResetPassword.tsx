
import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";

const ResetPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + "/auth/login",
    });
    setLoading(false);
    if (error) {
      toast({ title: "Erro ao enviar e-mail", description: error.message, variant: "destructive" });
    } else {
      setSent(true);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50">
      <div className="bg-white shadow rounded-lg p-8 max-w-md w-full">
        <h2 className="text-xl font-bold mb-2 text-center">Recuperar senha</h2>
        {sent ? (
          <div className="text-green-700 mb-4">Enviamos um e-mail para redefinir sua senha!</div>
        ) : (
          <form className="space-y-4" onSubmit={handleReset}>
            <Input
              type="email"
              placeholder="Seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? "Enviando..." : "Enviar link de redefinição"}
            </Button>
          </form>
        )}
        <div className="mt-4 text-center">
          <Link to="/auth/login" className="text-blue-600 hover:underline">Voltar ao login</Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
