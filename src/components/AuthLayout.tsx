
import React, { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

// Se o usuário estiver logado, redireciona direto para /dashboard
const AuthLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session && active) navigate("/dashboard", { replace: true });
    });
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session && active) navigate("/dashboard", { replace: true });
    });
    return () => { active = false; data.subscription.unsubscribe(); };
  }, [navigate]);

  return <Outlet />;
};

export default AuthLayout;
