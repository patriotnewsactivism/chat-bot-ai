import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/IndexEnhanced";
import Dashboard from "./pages/Dashboard";
import BotConfig from "./pages/BotConfig";
import Templates from "./pages/Templates";
import Pricing from "./pages/Pricing";
import Auth from "./pages/Auth";
import Widget from "./pages/Widget";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";
import WhiteLabelDashboard from "./pages/WhiteLabelDashboard";
import AffiliateProgram from "./pages/AffiliateProgram";
import VisualBotBuilder from "./components/VisualBotBuilder";
import AITrainingCenter from "./components/AITrainingCenter";
import MultiChannelDeployment from "./components/MultiChannelDeployment";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/widget/:botId" element={<Widget />} />
            <Route path="/affiliate-program" element={<AffiliateProgram />} />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/bot/:id" element={<ProtectedRoute><BotConfig /></ProtectedRoute>} />
          <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
          <Route path="/reseller" element={<ProtectedRoute><WhiteLabelDashboard /></ProtectedRoute>} />
          <Route path="/builder" element={<ProtectedRoute><VisualBotBuilder /></ProtectedRoute>} />
          <Route path="/training" element={<ProtectedRoute><AITrainingCenter /></ProtectedRoute>} />
          <Route path="/deployment" element={<ProtectedRoute><MultiChannelDeployment /></ProtectedRoute>} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
