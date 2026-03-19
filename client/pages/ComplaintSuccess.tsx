import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { Booking } from "@shared/api";

export default function ComplaintSuccess() {
    const navigate = useNavigate();
    const location = useLocation();
    const booking = location.state?.booking as Booking;

    return (
        <div className="min-h-screen w-full bg-white text-black font-sans flex flex-col p-6 items-center justify-center">
            <div className="max-w-md w-full text-center space-y-8 animate-in fade-in zoom-in duration-500">
                
                <div className="relative inline-block">
                    <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-12 h-12 text-green-500" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white animate-bounce" />
                </div>

                <div className="space-y-3">
                    <h1 className="text-3xl font-black tracking-tight">Complaint Received</h1>
                    <p className="text-gray-500 text-sm leading-relaxed max-w-[280px] mx-auto">
                        We've received your feedback for <span className="text-black font-bold">{booking?.serviceName || "your session"}</span>.
                    </p>
                </div>

                <div className="bg-gray-50 rounded-3xl p-6 text-left space-y-4 border border-gray-100/50">
                    <div className="flex gap-4">
                        <div className="w-1 h-12 bg-black rounded-full" />
                        <div>
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">What's next?</h4>
                            <p className="text-sm text-gray-600 leading-snug">
                                Carbon Admin will review your request. You'll be notified of the outcome via email within 24-48 hours.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="space-y-4 pt-4">
                    <Button 
                        className="w-full h-14 bg-black text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-900 shadow-lg group transition-all"
                        onClick={() => navigate("/profile")}
                    >
                        Return to Profile
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <p className="text-[10px] text-gray-400">Reference ID: COMP-{Math.floor(Math.random() * 1000000)}</p>
                </div>
            </div>
        </div>
    );
}
