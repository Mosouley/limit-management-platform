import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import Counterparties from "./pages/Counterparties";
import LimitTypes from "./pages/LimitTypes";
import Exposures from "./pages/Exposures";
import Limits from "./pages/Limits";
import BeamDemo from "./pages/BeamDemo";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <ThemeProvider defaultTheme="system" storageKey="app-theme">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/counterparties" element={<Counterparties />} />
            <Route path="/limit-types" element={<LimitTypes />} />
            <Route path="/exposures" element={<Exposures />} />
            <Route path="/limits" element={<Limits />} />
            <Route path="/beam-demo" element={<BeamDemo />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;