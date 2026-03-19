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
import AdminComplaints from "./pages/AdminComplaints";
import AddComplaint from "./pages/AddComplaint";
import ComplaintSuccess from "./pages/ComplaintSuccess";
import BookingDetails from "./pages/BookingDetails";
import ComplaintsDashboard from "./pages/ComplaintsDashboard";

import BookingSuccess from "./pages/BookingSuccess";
import Profile from "./pages/Profile";
import Wallet from "./pages/Wallet";
import PackageRedemption from "./pages/PackageRedemption";
import TrainingPackageRedemption from "./pages/TrainingPackageRedemption";
import TrainingServiceSelection from "./pages/TrainingServiceSelection";
import TrainingSessionProfile from "./pages/TrainingSessionProfile";
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
          <Route path="/profile" element={<Profile />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/package-redemption" element={<PackageRedemption />} />
          <Route path="/training/package-redemption" element={<TrainingPackageRedemption />} />

          {/* Training Session Flow */}
          <Route path="/training/services" element={<TrainingServiceSelection />} />
          <Route path="/training/session" element={<TrainingSessionProfile />} />
          <Route path="/training/details" element={<TrainingDetails />} />
          <Route path="/training/review" element={<TrainingReview />} />
          <Route path="/training/payment" element={<TrainingPayment />} />
          <Route path="/training/success" element={<TrainingSuccess />} />
          <Route path="/admin/complaints" element={<AdminComplaints />} />
          <Route path="/complaint/add" element={<AddComplaint />} />
          <Route path="/complaint/success" element={<ComplaintSuccess />} />
          <Route path="/booking/details" element={<BookingDetails />} />
          <Route path="/complaints" element={<ComplaintsDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
