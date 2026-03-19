import { ArrowLeft, Send, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { Booking } from "@shared/api";
import { cn } from "@/lib/utils";

const COMPLAINT_REASONS = [
    "Instructor was late",
    "Facility was not clean",
    "Equipment was missing/broken",
    "Session was cancelled without notice",
    "Vibe/Atmosphere was not as expected",
    "Safety concerns",
    "Other"
];

export default function AddComplaint() {
    const navigate = useNavigate();
    const location = useLocation();
    const booking = location.state?.booking as Booking;
    
    const [selectedReason, setSelectedReason] = useState<string>("");
    const [details, setDetails] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!booking) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
                <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                <h1 className="text-xl font-bold mb-2">No Booking Selected</h1>
                <p className="text-gray-500 mb-6">Please go back to your profile to select a booking for complaint.</p>
                <Button onClick={() => navigate("/profile")}>Go to Profile</Button>
            </div>
        );
    }

    const handleSubmit = async () => {
        if (!selectedReason || !details) return;
        
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        
        navigate("/complaint/success", { state: { booking } });
    };

    return (
        <div className="min-h-screen w-full bg-white text-black font-sans flex flex-col pb-10">
            <div className="mx-auto w-full max-w-md bg-white flex-1 flex flex-col relative">
                
                {/* Header */}
                <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md px-4 py-4 flex items-center gap-3">
                    <button 
                        onClick={() => navigate(-1)}
                        className="p-2 rounded-full hover:bg-gray-50 transition-colors"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </button>
                    <h1 className="text-lg font-bold">Raise a Complaint</h1>
                </header>

                <main className="px-6 flex-1 space-y-8 pt-4">
                    {/* Booking Brief */}
                    <div className="bg-gray-50 rounded-2xl p-4 flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Booking for</p>
                            <h2 className="font-bold text-sm">{booking.serviceName}</h2>
                            <p className="text-xs text-gray-500">{new Date(booking.startTime).toLocaleDateString()}</p>
                        </div>
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                    </div>

                    {/* Reason Selection */}
                    <section>
                        <h3 className="text-sm font-bold mb-4">Why are you raising a complaint?</h3>
                        <div className="flex flex-wrap gap-2">
                            {COMPLAINT_REASONS.map((reason) => (
                                <button
                                    key={reason}
                                    onClick={() => setSelectedReason(reason)}
                                    className={cn(
                                        "px-4 py-2 rounded-full text-xs font-medium transition-all border",
                                        selectedReason === reason 
                                            ? "bg-black text-white border-black" 
                                            : "bg-white text-gray-600 border-gray-100 hover:border-gray-300"
                                    )}
                                >
                                    {reason}
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* Details */}
                    <section className="space-y-4">
                        <label className="text-sm font-bold block">Can you provide more details?</label>
                        <Textarea 
                            placeholder="Tell us what happened..."
                            className="min-h-[150px] bg-gray-50 border-none rounded-2xl p-4 text-sm placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-black transition-all"
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                        />
                        <p className="text-[10px] text-gray-400 italic">
                            Your complaint will be shared with the Service Provider and Carbon Admin for review.
                        </p>
                    </section>
                </main>

                {/* Footer Action */}
                <div className="px-6 py-4 mt-auto">
                    <Button 
                        disabled={!selectedReason || !details || isSubmitting}
                        className="w-full h-14 bg-black text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-900 disabled:opacity-30 transition-all shadow-lg"
                        onClick={handleSubmit}
                    >
                        {isSubmitting ? (
                            <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                <Send className="w-4 h-4" />
                                Submit Complaint
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}
