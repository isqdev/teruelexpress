import { Routes, Route } from 'react-router-dom';
import { LandingPage } from "../pages/landingPage";
import { LoginPage } from "../pages/authentication/LoginPage";
import { SignUpPage } from "../pages/authentication/SignUpPage";
import { Home } from "../pages/home";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/cadastro" element={<SignUpPage />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}
