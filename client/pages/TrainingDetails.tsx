import { ArrowLeft, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

export default function TrainingDetails() {
    const navigate = useNavigate();
    const location = useLocation();
    const previousData = location.state || {}; // { service, date, time, priceRaw, isPeak }

    const [participants, setParticipants] = useState("1");
    const [guestName, setGuestName] = useState("");

    const handleContinue = () => {
        navigate("/training/review", {
            state: {
                ...previousData,
                participants,
                guestName,
                notes: "Please call upon arrival" // Mock note
            }
        });
    };

    return (
        <div className="min-h-[100dvh] w-full bg-white text-black font-sans flex flex-col">
            <div className="mx-auto w-full max-w-md bg-white flex-1 flex flex-col relative pb-safe">

                {/* Header */}
                <div className="sticky top-0 z-10 bg-white px-4 py-4 flex items-center gap-4 border-b border-gray-50">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 -ml-2 rounded-full hover:bg-gray-50 transition-colors"
                    >
                        <ArrowLeft className="h-5 w-5 text-gray-700" />
                    </button>
                    <h1 className="text-base font-bold text-gray-900">Training Details</h1>
                </div>

                {/* Content */}
                <div className="px-6 mt-6 space-y-6">

                    {/* Participants */}
                    <div className="space-y-2">
                        <Label className="text-gray-700 font-bold">Number of People</Label>
                        <Select value={participants} onValueChange={setParticipants}>
                            <SelectTrigger className="h-12 rounded-xl border-gray-200 bg-gray-50 focus:bg-white transition-colors text-base">
                                <SelectValue placeholder="Select participants" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">1 Person</SelectItem>
                                <SelectItem value="2">2 People</SelectItem>
                                <SelectItem value="3">3 People</SelectItem>
                                <SelectItem value="4">4 People</SelectItem>
                                <SelectItem value="5">5+ Group</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Guest Details */}
                    <div className="space-y-4">
                        <Label className="text-gray-700 font-bold">Main Guest Information</Label>

                        <div className="space-y-2">
                            <span className="text-xs font-semibold text-gray-500 uppercase">Full Name</span>
                            <div className="relative">
                                <Input
                                    value={guestName}
                                    onChange={(e) => setGuestName(e.target.value)}
                                    placeholder="Enter full name"
                                    className="h-12 rounded-xl border-gray-200 bg-gray-50 focus:bg-white pl-10 transition-colors text-base"
                                />
                                <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <span className="text-xs font-semibold text-gray-500 uppercase">Email Address (Optional)</span>
                            <Input
                                placeholder="guest@example.com"
                                className="h-12 rounded-xl border-gray-200 bg-gray-50 focus:bg-white transition-colors text-base"
                            />
                        </div>
                    </div>

                    {/* Special Requests */}
                    <div className="space-y-2">
                        <Label className="text-gray-700 font-bold">Special Requests / Notes</Label>
                        <Textarea
                            placeholder="Any health conditions, focus areas, or access requirements..."
                            className="min-h-[120px] rounded-xl border-gray-200 bg-gray-50 focus:bg-white resize-none p-4 transition-colors text-base"
                        />
                    </div>

                </div>

            </div>

            {/* Sticky Bottom Action */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 pb-safe z-20">
                <div className="mx-auto max-w-md">
                    <Button
                        className="w-full h-12 rounded-lg bg-black text-white hover:bg-gray-900 font-bold text-sm"
                        onClick={handleContinue}
                    >
                        Review & Pay
                    </Button>
                </div>
            </div>

        </div>
    );
}
