
import { ArrowLeft, X, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { getUserInventory, redeemCredit, AVAILABLE_PACKAGES } from "@/lib/mockData";

// Mock data
const BOOKED_DATES = [
    { id: 1, date: "19 March,2024" },
    { id: 2, date: "19 March,2024" }
];

export default function BookingReview() {
    const navigate = useNavigate();
    const location = useLocation();
    const [items, setItems] = useState(BOOKED_DATES);
    const { price, trainer, time, date } = location.state || {}; // Get passed state

    // Logic to find applicable package
    const inventory = getUserInventory();
    const applicablePackageItem = inventory.find(item => item.remainingCredits > 0);
    const packageDetails = applicablePackageItem
        ? AVAILABLE_PACKAGES.find(p => p.id === applicablePackageItem.packageId)
        : null;

    const handleDelete = (id: number) => {
        setItems(prev => prev.filter(item => item.id !== id));
    };

    const handleConfirm = () => {
        if (applicablePackageItem) {
            const success = redeemCredit(applicablePackageItem.packageId);
            if (success) {
                // Navigate to success with booking info
                navigate("/booking/success", { state: { bookingType: "redemption", packageName: packageDetails?.name } });
            } else {
                alert("Failed to redeem credit");
            }
        } else {
            // Regular payment flow
            navigate("/booking/payment");
        }
    };

    return (
        <div className="min-h-screen w-full bg-white text-black font-sans flex flex-col">
            <div className="mx-auto w-full max-w-md bg-white flex-1 flex flex-col relative pb-40">

                {/* Header */}
                <div className="sticky top-0 z-10 bg-white px-4 py-4 flex items-center justify-between">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 rounded-full bg-gray-50 hover:bg-gray-100"
                    >
                        <ArrowLeft className="h-5 w-5 text-black" />
                    </button>
                    <h1 className="text-base font-bold text-gray-900">Summary</h1>
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 rounded-full bg-gray-50 hover:bg-gray-100"
                    >
                        <X className="h-5 w-5 text-black" />
                    </button>
                </div>

                {/* Content */}
                <div className="px-5 mt-4 space-y-8">

                    {/* Title */}
                    <h2 className="text-base font-medium text-black leading-relaxed">
                        You're booking <span className="font-bold">Yoga Class</span> with the following details
                    </h2>
                    {/* Dynamic Details */}
                    {date && <div className="text-sm text-gray-600">Date: {new Date(date).toDateString()}</div>}
                    {time && <div className="text-sm text-gray-600">Time: {time}</div>}


                    {/* Package Redemption Banner */}
                    {applicablePackageItem && packageDetails && (
                        <div className="bg-black text-white p-4 rounded-xl flex items-center justify-between">
                            <div>
                                <div className="font-bold text-sm">Use Package Credit</div>
                                <div className="text-xs text-gray-400">{packageDetails.name} • {applicablePackageItem.remainingCredits} Credits Remaining</div>
                            </div>
                            <div className="bg-[#D4A017] text-black text-xs font-bold px-2 py-1 rounded">Applied</div>
                        </div>
                    )}

                    {/* Dates List (Legacy/Mock) */}
                    {/* <div className="space-y-4"> ... </div> */}
                    {/* Keeping existing structure but potentially simplified for this demo flow */}

                    {/* Price Row */}
                    <div className="flex items-center justify-between pt-2">
                        <span className="text-gray-500 text-sm font-medium">Price</span>
                        <div className="text-right">
                            {applicablePackageItem ? (
                                <>
                                    <span className="text-base font-bold text-gray-900 line-through mr-2">{price || "AED 250"}</span>
                                    <span className="text-base font-bold text-[#D4A017]">1 Credit</span>
                                </>
                            ) : (
                                <span className="text-base font-bold text-gray-900">{price || "AED 250"}</span>
                            )}
                        </div>
                    </div>

                    {/* Promo Code - Hide if using credits */}
                    {!applicablePackageItem && (
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-black">Promo Code</label>
                            <Input
                                placeholder="Enter code"
                                className="h-12 bg-gray-50 border-none rounded-xl text-sm placeholder:text-gray-500"
                            />
                        </div>
                    )}

                    {/* Payment Method - Hide if using credits */}
                    {!applicablePackageItem && (
                        <div className="p-4 rounded-xl border border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="h-8 w-12 flex items-center justify-center">
                                    <div className="flex relative">
                                        <div className="h-6 w-6 rounded-full bg-red-600 opacity-80" />
                                        <div className="h-6 w-6 rounded-full bg-yellow-500 opacity-80 -ml-3" />
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-gray-900">Jonathan Holmes</div>
                                    <div className="text-xs text-gray-500 font-medium mt-1 tracking-wider">6684 •••• •••• 6987</div>
                                </div>
                            </div>
                            <div className="h-6 w-6 rounded-full border border-gray-200" />
                        </div>
                    )}

                    {/* Disclaimer */}
                    <p className="text-xs text-gray-500 leading-relaxed">
                        Cancellation of membership note will be added here. Each venue has it's own cancellation policy in regards to membership
                    </p>

                </div>

            </div>

            {/* Sticky Bottom Actions */}
            <div className="fixed bottom-0 left-0 right-0 bg-white p-4 pb-6 z-20 space-y-3 shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">
                <div className="mx-auto max-w-md space-y-3">
                    {/* Loyalty Banner - Only show if paying? Or always? Let's hide for redemption to reduce clutter or keep small */}
                    {!applicablePackageItem && (
                        <div className="w-full bg-[#ECFDF5] rounded-xl p-3 flex items-center px-4 gap-3">
                            <Gift className="h-4 w-4 text-[#10B981]" />
                            <span className="text-xs font-bold text-[#10B981]">You'll Earn 800 Carbon loyalty points</span>
                        </div>
                    )}

                    <Button
                        className="w-full h-12 rounded-lg bg-black text-white hover:bg-gray-900 font-bold text-sm"
                        onClick={handleConfirm}
                    >
                        {applicablePackageItem ? "Confirm Booking (1 Credit)" : "Pay (AED 800)"}
                    </Button>
                </div>
            </div>

        </div>
    );
}

