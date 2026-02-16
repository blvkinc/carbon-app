import { useState } from "react";
import {
    ArrowLeft, Share, Heart, Phone,
    Calendar as CalendarIcon, Clock, Hourglass,
    Info, DollarSign, Dumbbell, MessageSquare,
    MapPin, Navigation, MessageCircle,
    ChevronRight, Bike, Trophy, Medal, Star, User,
    X, ChevronLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate, useLocation } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import { format, addMonths, subMonths } from "date-fns";

interface TimeSlotPage {
    range: string;
    price: number;
    isPeak: boolean;
}

const SLOT_DATA: TimeSlotPage[] = [
    { range: "8:00 AM - 8:30 AM", price: 250, isPeak: false },
    { range: "9:00 AM - 9:30 AM", price: 400, isPeak: true },
    { range: "9:30 AM - 1:00 AM", price: 250, isPeak: false },
    { range: "10:30 AM - 11:00 AM", price: 400, isPeak: true },
    { range: "11:30 AM - 12:00 PM", price: 400, isPeak: true },
    { range: "13:30 PM - 14:00 PM", price: 400, isPeak: true },
    { range: "15:00 PM - 15:30 PM", price: 250, isPeak: false },
    { range: "16:00 PM - 16:30 PM", price: 250, isPeak: false },
];

export default function TrainingSessionProfile() {
    const navigate = useNavigate();
    const location = useLocation();
    const service = location.state?.service || {
        title: "Personal Training",
        price: "AED 250",
        duration: "60 mins"
    };

    const [date, setDate] = useState<Date | undefined>(new Date());
    const [selectedSlot, setSelectedSlot] = useState<number | null>(null);

    const handleNextMonth = () => setDate(current => addMonths(current || new Date(), 1));
    const handlePrevMonth = () => setDate(current => subMonths(current || new Date(), 1));

    const handleContinue = () => {
        const selectedData = selectedSlot !== null ? SLOT_DATA[selectedSlot] : null;
        navigate("/training/review", {
            state: {
                service,
                date: date?.toISOString(),
                time: selectedData?.range,
                priceRaw: selectedData?.price,
                isPeak: selectedData?.isPeak,
                participants: "1", // Defaulted
                guestName: "Self" // Defaulted
            }
        });
    };

    return (
        <div className="min-h-screen w-full bg-white text-black font-sans pb-24">
            <div className="mx-auto max-w-md bg-white min-h-screen relative">

                {/* 1. Header Image Section */}
                <div className="relative h-64 w-full">
                    <img
                        src="https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=600&h=400&fit=crop"
                        alt="Training Session Cover"
                        className="h-full w-full object-cover"
                    />
                    {/* Top Overlay Buttons */}
                    <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start pt-12 bg-gradient-to-b from-black/40 to-transparent">
                        <button
                            onClick={() => navigate(-1)}
                            className="bg-white/90 p-2 rounded-full hover:bg-white transition-colors"
                        >
                            <ArrowLeft className="h-5 w-5 text-black" />
                        </button>
                        <div className="flex gap-3">
                            <button className="bg-white/90 p-2 rounded-full hover:bg-white transition-colors">
                                <Share className="h-5 w-5 text-black" />
                            </button>
                            <button className="bg-white/90 p-2 rounded-full hover:bg-white transition-colors">
                                <Heart className="h-5 w-5 text-black" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* 2. Main content container */}
                <div className="px-5 -mt-6 relative bg-white rounded-t-[32px] pt-8 space-y-6">

                    {/* Title Header */}
                    <div className="flex justify-between items-start">
                        <div className="space-y-1">
                            <h1 className="text-2xl font-bold text-gray-900">{service.title}</h1>
                            <div className="text-sm text-gray-500 font-medium">1-on-1 Coaching</div>
                            <div className="flex items-center gap-1 mt-1">
                                <Star className="h-3 w-3 fill-orange-500 text-orange-500" />
                                <span className="text-xs font-bold">4.9</span>
                                <span className="text-xs text-gray-400 underline decoration-gray-300 ml-1">42 reviews</span>
                            </div>
                        </div>
                    </div>

                    {/* 3. Calendar Section */}
                    <div className="mt-4">
                        <h3 className="font-bold text-base text-gray-900 mb-3">Select Date</h3>
                        <div className="flex items-center justify-between mb-4 px-2">
                            <button onClick={handlePrevMonth}><ChevronLeft className="h-5 w-5 text-gray-400" /></button>
                            <span className="text-base font-bold text-gray-600">
                                {format(date || new Date(), "MMMM yyyy")}
                            </span>
                            <button onClick={handleNextMonth}><ChevronRight className="h-5 w-5 text-gray-400" /></button>
                        </div>
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="w-full p-0"
                            classNames={{
                                month: "space-y-4 w-full",
                                table: "w-full border-collapse space-y-1",
                                head_row: "flex w-full justify-between mb-4",
                                head_cell: "text-gray-300 rounded-md w-9 font-normal text-[0.8rem] uppercase",
                                row: "flex w-full mt-2 justify-between",
                                cell: "h-9 w-9 text-center text-sm p-0 flex items-center justify-center relative [&:has([aria-selected])]:bg-transparent focus-within:relative focus-within:z-20",
                                day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 rounded-full hover:bg-gray-100 text-gray-600 transition-colors",
                                day_selected: "bg-black text-white hover:bg-black hover:text-white focus:bg-black focus:text-white shadow-md",
                                day_today: "bg-gray-50 text-gray-900",
                                day_outside: "text-gray-300 opacity-50",
                                day_disabled: "text-gray-300 opacity-50",
                                day_hidden: "invisible",
                                nav: "hidden",
                                caption: "hidden"
                            }}
                        />
                    </div>

                    {/* 4. Legend */}
                    <div className="mt-4">
                        <div className="flex items-center gap-6 bg-gray-50/50 p-2 rounded-lg w-fit">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#FFD700]" />
                                <span className="text-xs text-gray-500 font-medium">Peak Time</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#10B981]" />
                                <span className="text-xs text-gray-500 font-medium">Off-Peak Time</span>
                            </div>
                        </div>
                    </div>

                    {/* 5. Time Slots */}
                    <div className="mt-4 space-y-3 pb-8">
                        <h3 className="font-bold text-base text-gray-900">Select Time</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {SLOT_DATA.map((slot, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedSlot(idx)}
                                    className={`
                                relative flex flex-col items-start p-3 rounded-xl border text-left transition-all
                                bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)]
                                ${selectedSlot === idx ? 'ring-2 ring-black border-transparent' : 'border-gray-100 hover:border-gray-200'}
                            `}
                                >
                                    {/* Colored Left Border Indicator */}
                                    <div className={`absolute left-0 top-3 bottom-3 w-1 rounded-r-full ${slot.isPeak ? 'bg-[#FFD700]' : 'bg-[#10B981]'}`} />

                                    <div className="pl-3 w-full">
                                        <span className="text-[10px] text-gray-500 font-medium block mb-1">{slot.range}</span>
                                        <div className="flex justify-between items-center w-full">
                                            <span className="text-sm font-bold text-gray-900 block">AED {slot.price}</span>
                                            <div className={`
                                                inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold
                                                ${slot.isPeak
                                                    ? 'bg-[#FFF9E5] text-[#B88700]'
                                                    : 'bg-[#ECFDF5] text-[#059669]'
                                                }
                                            `}>
                                                {slot.isPeak ? 'Peak' : 'Off-Peak'}
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 6. Bottom Sticky Bar */}
                <div className="fixed bottom-0 left-0 right-0 border-t border-gray-100 bg-white p-4 pb-6 z-20">
                    <div className="mx-auto max-w-md flex items-center justify-between gap-4">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-gray-500 font-medium">Total Price</span>
                            <span className="text-sm font-bold text-gray-900">
                                {selectedSlot !== null ? `AED ${SLOT_DATA[selectedSlot].price}` : service.price}
                            </span>
                        </div>
                        <Button
                            className="px-8 h-10 bg-black hover:bg-gray-900 text-white font-bold text-sm rounded-lg flex-1"
                            disabled={selectedSlot === null}
                            onClick={handleContinue}
                        >
                            Continue
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    );
}
