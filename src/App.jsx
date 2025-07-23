import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';
import { Toaster } from 'sonner';

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster position="top-right" richColors/>
        <AppRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
