
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

// Este componente garante que só usuários autenticados acessem rotas privadas
export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState<null | boolean>(null);

  useEffect(() => {
    // Sempre usar getSession e onAuthStateChange conforme recomendado
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthed(Boolean(session));
    });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthed(Boolean(session));
    });
    return () => data.subscription.unsubscribe();
  }, []);

  if (authed === null) {
    return <div className="flex h-screen items-center justify-center">Carregando...</div>;
  }
  return authed ? <>{children}</> : <Navigate to="/auth/login" replace />;
}
