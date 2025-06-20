
import React from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({ title: "Você saiu da sua conta." });
    navigate("/auth/login");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="bg-card shadow rounded-lg p-8 max-w-lg w-full text-center border border-border">
        <h1 className="text-2xl font-bold mb-4 text-foreground">Bem-vindo ao BookLib!</h1>
        <p className="mb-6 text-muted-foreground">Este é seu painel privado. Você está logado.</p>
        <Button onClick={handleLogout}>Sair</Button>
      </div>
    </div>
  );
};

export default Dashboard;
