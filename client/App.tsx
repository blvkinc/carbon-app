import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BookingReceipt from "./pages/BookingReceipt";
import TrainerProfile from "./pages/TrainerProfile";
import BookingDateTime from "./pages/BookingDateTime";
import BookingReview from "./pages/BookingReview";
import Payment from "./pages/Payment";
import BookingSuccess from "./pages/BookingSuccess";
import TrainingServiceSelection from "./pages/TrainingServiceSelection";
import TrainingSessionProfile from "./pages/TrainingSessionProfile";
import TrainingDateTime from "./pages/TrainingDateTime";
import TrainingDetails from "./pages/TrainingDetails";
import TrainingReview from "./pages/TrainingReview";
import TrainingPayment from "./pages/TrainingPayment";
import TrainingSuccess from "./pages/TrainingSuccess";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/booking-receipt" element={<BookingReceipt />} />
          <Route path="/trainer" element={<TrainerProfile />} />
          <Route path="/booking/date-time" element={<BookingDateTime />} />
          <Route path="/booking/review" element={<BookingReview />} />
          <Route path="/booking/payment" element={<Payment />} />
          <Route path="/booking/success" element={<BookingSuccess />} />

          {/* Training Session Flow */}
          <Route path="/training/services" element={<TrainingServiceSelection />} />
          <Route path="/training/session" element={<TrainingSessionProfile />} />
          <Route path="/training/date-time" element={<TrainingDateTime />} />
          <Route path="/training/details" element={<TrainingDetails />} />
          <Route path="/training/review" element={<TrainingReview />} />
          <Route path="/training/payment" element={<TrainingPayment />} />
          <Route path="/training/success" element={<TrainingSuccess />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
