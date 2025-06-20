
import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import { Book } from "lucide-react";

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
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-md w-full border border-border">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Book className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">BookLib</span>
          </div>
          <h2 className="text-2xl font-bold text-foreground">Recuperar senha</h2>
          <p className="text-muted-foreground mt-2">Enviaremos um link para redefinir sua senha</p>
        </div>
        
        {sent ? (
          <div className="text-center">
            <div className="text-primary font-medium mb-4">E-mail enviado com sucesso!</div>
            <p className="text-muted-foreground mb-6">Verifique sua caixa de entrada e clique no link para redefinir sua senha.</p>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleReset}>
            <Input
              type="email"
              placeholder="Seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12"
            />
            <Button className="w-full h-12" type="submit" disabled={loading}>
              {loading ? "Enviando..." : "Enviar link de redefinição"}
            </Button>
          </form>
        )}
        
        <div className="mt-6 text-center">
          <Link to="/auth/login" className="text-primary hover:underline">Voltar ao login</Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
