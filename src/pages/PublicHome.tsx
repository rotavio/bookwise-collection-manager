
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const PublicHome = () => (
  <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50">
    <div className="bg-white shadow rounded-lg p-8 max-w-md w-full text-center">
      <h1 className="text-3xl font-bold mb-4 text-blue-900">BookiLib</h1>
      <p className="text-lg text-slate-600 mb-8">
        Sua biblioteca digital pessoal. Acesse, gerencie e descubra seus livros favoritos!
      </p>
      <div className="flex flex-col gap-3">
        <Button asChild><Link to="/auth/login">Entrar</Link></Button>
        <Button asChild variant="outline"><Link to="/auth/register">Cadastre-se</Link></Button>
      </div>
    </div>
  </div>
);

export default PublicHome;
