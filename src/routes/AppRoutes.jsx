import { Routes, Route } from 'react-router-dom';
import { LandingPage } from "../pages/landingPage";
import { LoginPage } from "../pages/authentication/LoginPage";
import { SignUpPage } from "../pages/authentication/SignUpPage";
import { Layout } from "../pages/app/layout"

import { Home } from "../pages/app/home";
import { Budget } from "../pages/app/screens/Budget";


export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/cadastro" element={<SignUpPage />} />

      <Route path="/app" element={<Layout />}>
        <Route path="home" element={<Home />} />
        <Route path="orcamento" element={<Budget />} />
        <Route path="avaliar" element={Layout}/>
        <Route path="rotas-atendidas" element={Layout}/>

      </Route>
    </Routes>
  );
}
