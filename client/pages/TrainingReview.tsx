import { ArrowLeft, X, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";

export default function TrainingReview() {
    const navigate = useNavigate();
    const location = useLocation();
    const bookingData = location.state || {}; // { service, date, time, priceRaw, isPeak, participants, guestName, notes }

    const formattedDate = bookingData.date ? format(new Date(bookingData.date), "dd MMMM, yyyy") : "Date TBD";
    const totalPrice = (bookingData.priceRaw || 0) * (parseInt(bookingData.participants) || 1);
    const rewardsPoints = Math.floor(totalPrice * 0.5); // Simplified logic

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
                        You've booked <span className="font-bold">{bookingData.service?.title || "Training Session"}</span> with the following details
                    </h2>

                    {/* Details List */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center py-2 border-b border-gray-50">
                            <span className="text-sm text-gray-500">Date</span>
                            <span className="text-sm font-medium text-gray-900">{formattedDate}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-50">
                            <span className="text-sm text-gray-500">Time</span>
                            <span className="text-sm font-medium text-gray-900">{bookingData.time}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-50">
                            <span className="text-sm text-gray-500">People</span>
                            <span className="text-sm font-medium text-gray-900">{bookingData.participants} Person(s)</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-50">
                            <span className="text-sm text-gray-500">Guest</span>
                            <span className="text-sm font-medium text-gray-900">{bookingData.guestName || "Self"}</span>
                        </div>
                    </div>

                    {/* Price Row */}
                    <div className="flex items-center justify-between pt-2">
                        <span className="text-gray-500 text-sm font-medium">Total Price</span>
                        <span className="text-base font-bold text-gray-900">AED {totalPrice}</span>
                    </div>

                    {/* Promo Code */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-black">Promo Code</label>
                        <Input
                            placeholder="Enter code"
                            className="h-12 bg-gray-50 border-none rounded-xl text-sm placeholder:text-gray-500"
                        />
                    </div>

                    {/* Card Summary */}
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

                    {/* Disclaimer */}
                    <p className="text-xs text-gray-500 leading-relaxed">
                        Cancellation of membership note will be added here. Each venue has it's own cancellation policy in regards to membership
                    </p>

                </div>

            </div>

            {/* Sticky Bottom Actions */}
            <div className="fixed bottom-0 left-0 right-0 bg-white p-4 pb-6 z-20 space-y-3 shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">
                <div className="mx-auto max-w-md space-y-3">
                    {/* Loyalty Banner */}
                    <div className="w-full bg-[#ECFDF5] rounded-xl p-3 flex items-center px-4 gap-3">
                        <Gift className="h-4 w-4 text-[#10B981]" />
                        <span className="text-xs font-bold text-[#10B981]">You'll Earn {rewardsPoints} Carbon loyalty points</span>
                    </div>

                    <Button
                        className="w-full h-12 rounded-lg bg-black text-white hover:bg-gray-900 font-bold text-sm"
                        onClick={() => navigate("/training/payment", { state: { ...bookingData, totalPrice, rewardsPoints } })}
                    >
                        Confirm & Pay (AED {totalPrice})
                    </Button>
                </div>
            </div>

        </div>
    );
}
