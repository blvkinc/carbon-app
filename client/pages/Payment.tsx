
import { ArrowLeft, X, CreditCard, Gift, Wallet, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { AVAILABLE_PACKAGES, purchasePackage } from "@/lib/mockData";

export default function Payment() {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedMethod, setSelectedMethod] = useState<string>("card1");

    const packageId = location.state?.packageId;
    const selectedPackage = AVAILABLE_PACKAGES.find(p => p.id === packageId);

    const handlePayment = () => {
        if (selectedPackage) {
            purchasePackage(selectedPackage.id);
            navigate("/booking/success", { state: { purchasedItem: selectedPackage } });
        } else {
            // Fallback for other flows (not implemented in this task)
            navigate("/booking/success");
        }
    };

    return (
        <div className="min-h-screen w-full bg-white text-black font-sans flex flex-col">
            <div className="mx-auto w-full max-w-md bg-white flex-1 flex flex-col relative pb-32">

                {/* Header */}
                <div className="sticky top-0 z-10 bg-white px-4 py-4 flex items-center justify-between">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 rounded-full bg-gray-50 hover:bg-gray-100"
                    >
                        <ArrowLeft className="h-5 w-5 text-black" />
                    </button>
                    <h1 className="text-base font-bold text-gray-900">Select Payment Method</h1>
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 rounded-full bg-gray-50 hover:bg-gray-100"
                    >
                        <X className="h-5 w-5 text-black" />
                    </button>
                </div>

                {/* Content */}
                <div className="px-5 mt-2 space-y-6">

                    {/* Order Summary (New) */}
                    {selectedPackage && (
                        <section className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                            <h2 className="text-gray-500 font-medium text-xs uppercase tracking-wider mb-2">Order Summary</h2>
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="font-bold text-lg">{selectedPackage.name}</div>
                                    <div className="text-xs text-gray-500">{selectedPackage.creditCount} Credits • Valid {selectedPackage.validityDays} Days</div>
                                </div>
                                <div className="font-bold text-lg text-[#D4A017]">
                                    {selectedPackage.currency} {selectedPackage.price}
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Select Method Section */}
                    <section className="space-y-4">
                        <h2 className="text-gray-500 font-medium text-base">Select Payment Method</h2>

                        {/* Method 1: Saved Card (Default) */}
                        <div
                            onClick={() => setSelectedMethod("card1")}
                            className={`
                        p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all
                        ${selectedMethod === "card1" ? "border-gray-200 shadow-sm" : "border-gray-100"}
                    `}
                        >
                            <div className="flex items-center gap-4">
                                <div className="h-8 w-12 bg-none flex items-center justify-center">
                                    {/* Mastercard Icon Mock */}
                                    <div className="flex relative">
                                        <div className="h-6 w-6 rounded-full bg-red-600 opacity-80" />
                                        <div className="h-6 w-6 rounded-full bg-yellow-500 opacity-80 -ml-3" />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-bold text-gray-900">Jonathan Holmes</span>
                                    </div>
                                    <div className="text-xs text-gray-500 font-medium mt-1 tracking-wider">2354 •••• •••• 5698</div>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <span className="text-[10px] font-bold text-[#D4A017]">Default</span>
                                <div className={`
                             h-5 w-5 rounded-full border-2 flex items-center justify-center
                             ${selectedMethod === "card1" ? "border-black" : "border-gray-200"}
                         `}>
                                    {selectedMethod === "card1" && <div className="h-2.5 w-2.5 rounded-full bg-black" />}
                                </div>
                            </div>
                        </div>

                        {/* Method 2: Saved Card */}
                        <div
                            onClick={() => setSelectedMethod("card2")}
                            className={`
                        p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all
                        ${selectedMethod === "card2" ? "border-gray-200 shadow-sm" : "border-gray-100"}
                    `}
                        >
                            <div className="flex items-center gap-4">
                                <div className="h-8 w-12 bg-none flex items-center justify-center">
                                    {/* Mastercard Icon Mock */}
                                    <div className="flex relative">
                                        <div className="h-6 w-6 rounded-full bg-red-600 opacity-80" />
                                        <div className="h-6 w-6 rounded-full bg-yellow-500 opacity-80 -ml-3" />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-bold text-gray-900">Jonathan Holmes</span>
                                    </div>
                                    <div className="text-xs text-gray-500 font-medium mt-1 tracking-wider">6684 •••• •••• 6987</div>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <div className={`
                             h-5 w-5 rounded-full border-2 flex items-center justify-center mt-6
                             ${selectedMethod === "card2" ? "border-black" : "border-gray-200"}
                         `}>
                                    {selectedMethod === "card2" && <div className="h-2.5 w-2.5 rounded-full bg-black" />}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Add New Card */}
                    <section className="space-y-4">
                        <h2 className="text-black font-bold text-base">Add new card:</h2>
                        <div className="p-4 rounded-xl border border-gray-100 flex items-center gap-4 cursor-pointer hover:bg-gray-50 transition-colors">
                            <div className="h-10 w-10 rounded bg-none border border-black flex items-center justify-center">
                                {/* Generic Card Icon */}
                                <div className="h-6 w-7 border-2 border-black rounded-[2px] relative flex flex-col justify-end pb-1 items-center">
                                    <div className="w-5 h-[1px] bg-black mb-[2px]" />
                                </div>
                            </div>
                            <div>
                                <div className="text-sm font-bold text-gray-900">Add new card</div>
                                <div className="text-xs text-gray-400 mt-0.5">Add new Master, Visa or Visa Electron.</div>
                            </div>
                        </div>
                    </section>

                    {/* Wallet Section */}
                    <section>
                        <div className="w-full bg-black rounded-xl p-5 relative overflow-hidden text-white">
                            {/* Hexagon Background Pattern */}
                            <div className="absolute right-0 top-0 bottom-0 w-32 opacity-20">
                                <svg viewBox="0 0 100 100" className="h-full w-full">
                                    <path d="M50 0 L100 25 L100 75 L50 100 L0 75 L0 25 Z" fill="none" stroke="currentColor" strokeWidth="1" />
                                </svg>
                            </div>

                            <div className="relative z-10 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    {/* Wallet Icon */}
                                    <div className="relative h-12 w-12">
                                        <div className="absolute inset-0 border border-[#D4A017] rounded-lg rotate-45 transform scale-75" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Wallet className="h-5 w-5 text-white" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-400 mb-1">Carbon Wallet</div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-lg font-bold">AED 5,553.66</span>
                                            <span className="text-[10px] text-gray-400">•</span>
                                            <span className="text-sm text-gray-300">Silver tier</span>
                                        </div>
                                        <button className="text-xs text-white underline decoration-white/50 mt-2 font-medium">Top Up</button>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 flex justify-end">
                                <Button className="h-9 bg-[#D4A017] hover:bg-[#C29010] text-white font-bold text-xs px-4 rounded-lg">
                                    Pay With Wallet
                                </Button>
                            </div>
                        </div>
                    </section>
                </div>

            </div>

            {/* Sticky Bottom Actions */}
            <div className="fixed bottom-0 left-0 right-0 bg-white p-4 pb-6 z-20 space-y-3">
                <div className="mx-auto max-w-md space-y-3">
                    {/* Loyalty Banner */}
                    <div className="w-full bg-[#ECFDF5] rounded-xl p-3 flex items-center justify-center gap-2">
                        <Gift className="h-4 w-4 text-[#10B981]" />
                        <span className="text-xs font-bold text-[#10B981]">You'll Earn {selectedPackage ? selectedPackage.price * 1 : 800} Carbon loyalty points</span>
                    </div>

                    <Button
                        className="w-full h-12 rounded-lg bg-black text-white hover:bg-gray-900 font-bold text-sm"
                        onClick={handlePayment}
                    >
                        {selectedPackage ? `Pay ${selectedPackage.currency} ${selectedPackage.price}` : "Continue"}
                    </Button>
                </div>
            </div>

        </div>
    );
}

