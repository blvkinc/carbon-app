import { useNavigate, useLocation } from "react-router-dom";
import { Check, Gift, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BookingSuccess() {
    const navigate = useNavigate();
    const location = useLocation();
    const purchasedItem = location.state?.purchasedItem;

    const successMessage = purchasedItem
        ? `${purchasedItem.name} Purchased!`
        : "Successfully booked";

    const loyaltyPoints = purchasedItem
        ? purchasedItem.price * 1
        : 800;

    return (
        <div className="min-h-screen w-full bg-black text-white font-sans flex flex-col items-center p-6 overflow-y-auto">
            <div className="w-full max-w-sm flex flex-col items-center space-y-8 animate-in fade-in duration-700 mt-6 pb-20">

                {/* Logo Animation Section */}
                <div className="relative h-32 w-32 flex items-center justify-center shrink-0">
                    {/* Hexagon SVG */}
                    <svg viewBox="0 0 100 100" className="h-full w-full stroke-[#D4A017] fill-none stroke-[2px] overflow-visible">
                        <path d="M50 5 L93 28 L93 72 L50 95 L7 72 L7 28 Z" vectorEffect="non-scaling-stroke" />
                    </svg>

                    {/* "CARBON" Text */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="absolute top-[18%] right-[15%] text-[8px] font-bold text-white transform rotate-[30deg]">C</div>
                        <div className="absolute top-[28%] right-[5%] text-[8px] font-bold text-white transform rotate-[60deg]">A</div>
                        <div className="absolute top-[42%] right-[0%] text-[8px] font-bold text-white transform rotate-[90deg]">R</div>
                        <div className="absolute top-[56%] right-[2%] text-[8px] font-bold text-white transform rotate-[120deg]">B</div>
                        <div className="absolute top-[68%] right-[10%] text-[8px] font-bold text-white transform rotate-[150deg]">O</div>
                        <div className="absolute top-[75%] right-[22%] text-[8px] font-bold text-white transform rotate-[180deg]">N</div>
                    </div>

                    {/* Success Badge */}
                    <div className="absolute -bottom-2 right-4 bg-[#10B981] rounded-full p-1.5 shadow-lg border-4 border-black">
                        <Check className="h-4 w-4 text-black stroke-[3px]" />
                    </div>
                </div>

                {/* Text */}
                <h1 className="text-2xl font-bold text-white tracking-wide text-center">{successMessage}</h1>

                {/* Receipt Card */}
                <div className="w-full bg-[#1A1A1A] rounded-2xl p-6 border border-white/5 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <FileText className="w-24 h-24" />
                    </div>

                    <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
                        Receipt Detail
                    </h2>

                    <div className="space-y-4 relative z-10">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400 text-sm">Date</span>
                            <span className="text-white font-medium text-sm">19 March, 2024</span>
                        </div>

                        {purchasedItem ? (
                            <>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400 text-sm">Item</span>
                                    <span className="text-white font-medium text-sm text-right max-w-[150px] truncate">{purchasedItem.name}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400 text-sm">Validity</span>
                                    <span className="text-white font-medium text-sm">{purchasedItem.validityDays} Days</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400 text-sm">Price</span>
                                    <span className="text-white font-medium text-sm">AED {purchasedItem.price}</span>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400 text-sm">Service</span>
                                    <span className="text-white font-medium text-sm text-right max-w-[150px] truncate">Padel court (inside)</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400 text-sm">Time</span>
                                    <span className="text-white font-medium text-sm">8:00 AM – 8:30 AM</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400 text-sm">Attendees</span>
                                    <span className="text-white font-medium text-sm">2</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400 text-sm">Price</span>
                                    <span className="text-white font-medium text-sm">AED 2,400</span>
                                </div>
                            </>
                        )}

                        <div className="flex justify-between items-center">
                            <span className="text-gray-400 text-sm">Promo discount</span>
                            <span className="text-emerald-400 font-medium text-sm">-AED 200</span>
                        </div>

                        <div className="h-px bg-white/10 w-full my-4 border-dashed border-t border-white/20"></div>

                        <div className="flex justify-between items-center">
                            <span className="font-semibold text-white">Final Price</span>
                            <span className="font-bold text-[#D4A017] text-xl">
                                AED {purchasedItem ? Math.max(0, purchasedItem.price - 200) : "2,200"}
                            </span>
                        </div>

                        <div className="flex justify-between items-center mt-2 pt-4">
                            <span className="text-gray-500 text-xs">Payment Method</span>
                            <span className="text-gray-400 font-medium text-xs">•••• 6987</span>
                        </div>
                    </div>
                </div>

                {/* Loyalty Banner */}
                <div className="w-full bg-[#10B981]/10 rounded-xl p-4 flex items-center justify-center gap-3 border border-[#10B981]/20">
                    <Gift className="h-5 w-5 text-[#10B981]" />
                    <span className="text-sm font-semibold text-[#10B981] tracking-wide">You've Earned {loyaltyPoints} Carbon points</span>
                </div>

                {/* Action Button */}
                <Button
                    className="w-full h-14 rounded-xl bg-[#D4A017] hover:bg-[#C29010] text-white font-bold text-base transition-all active:scale-[0.98]"
                    onClick={() => {
                        if (purchasedItem) {
                            navigate("/package-redemption", { state: { package: purchasedItem } });
                        } else {
                            navigate("/");
                        }
                    }}
                >
                    {purchasedItem ? "View Package" : "Manage Bookings"}
                </Button>

            </div>
        </div>
    );
}
