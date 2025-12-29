import { useNavigate, useLocation } from "react-router-dom";
import { Check, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TrainingSuccess() {
    const navigate = useNavigate();
    const location = useLocation();
    const bookingData = location.state || {}; // { rewardsPoints }

    return (
        <div className="min-h-screen w-full bg-black text-white font-sans flex items-center justify-center p-6">
            <div className="w-full max-w-sm flex flex-col items-center space-y-8 animate-in fade-in duration-700">

                {/* Logo Animation Section */}
                <div className="relative h-40 w-40 flex items-center justify-center">
                    {/* Hexagon SVG */}
                    <svg viewBox="0 0 100 100" className="h-full w-full stroke-[#D4A017] fill-none stroke-[2px] overflow-visible">
                        <path d="M50 5 L93 28 L93 72 L50 95 L7 72 L7 28 Z" vectorEffect="non-scaling-stroke" />
                    </svg>

                    {/* "CARBON" Text */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="absolute top-[18%] right-[15%] text-[10px] font-bold text-white transform rotate-[30deg]">C</div>
                        <div className="absolute top-[28%] right-[5%] text-[10px] font-bold text-white transform rotate-[60deg]">A</div>
                        <div className="absolute top-[42%] right-[0%] text-[10px] font-bold text-white transform rotate-[90deg]">R</div>
                        <div className="absolute top-[56%] right-[2%] text-[10px] font-bold text-white transform rotate-[120deg]">B</div>
                        <div className="absolute top-[68%] right-[10%] text-[10px] font-bold text-white transform rotate-[150deg]">O</div>
                        <div className="absolute top-[75%] right-[22%] text-[10px] font-bold text-white transform rotate-[180deg]">N</div>
                    </div>

                    {/* Success Badge */}
                    <div className="absolute -bottom-2 right-8 bg-[#10B981] rounded-full p-1.5 shadow-lg border-4 border-black">
                        <Check className="h-4 w-4 text-black stroke-[3px]" />
                    </div>
                </div>

                {/* Text */}
                <h1 className="text-xl font-bold text-white tracking-wide text-center">Session Successfully booked</h1>

                {/* Loyalty Banner */}
                <div className="w-full bg-[#1A1A1A] rounded-lg p-4 flex items-center justify-center gap-3 border border-white/5">
                    <Gift className="h-4 w-4 text-[#10B981]" />
                    <span className="text-xs font-bold text-[#10B981] tracking-wide">You've Earn {bookingData.rewardsPoints || 100} Carbon loyalty points</span>
                </div>

                {/* Action Button */}
                <Button
                    className="w-full h-12 rounded-lg bg-[#D4A017] hover:bg-[#C29010] text-white font-bold text-sm"
                    onClick={() => navigate("/")}
                >
                    Manage Bookings
                </Button>

            </div>
        </div>
    );
}
