import { useState } from "react";
import { ArrowLeft, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useNavigate, useLocation } from "react-router-dom";
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

export default function TrainingDetails() {
    const navigate = useNavigate();
    const location = useLocation();
    const previousData = location.state || {}; // { service }

    const [date, setDate] = useState<Date | undefined>(new Date());
    const [selectedSlot, setSelectedSlot] = useState<number | null>(null);

    const handleNextMonth = () => setDate(current => addMonths(current || new Date(), 1));
    const handlePrevMonth = () => setDate(current => subMonths(current || new Date(), 1));

    const handleContinue = () => {
        const selectedData = selectedSlot !== null ? SLOT_DATA[selectedSlot] : null;
        navigate("/training/review", {
            state: {
                ...previousData,
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
        <div className="min-h-[100dvh] w-full bg-white text-black font-sans flex flex-col">
            <div className="mx-auto w-full max-w-md bg-white flex-1 flex flex-col relative pb-safe">

                {/* Header */}
                <div className="sticky top-0 z-10 bg-white px-4 py-4 flex items-center justify-between border-b border-gray-50">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 -ml-2 rounded-full hover:bg-gray-50 transition-colors"
                    >
                        <ArrowLeft className="h-5 w-5 text-gray-700" />
                    </button>
                    <h1 className="text-base font-bold text-gray-900">Select Date & Time</h1>
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 -mr-2 rounded-full hover:bg-gray-50 transition-colors"
                    >
                        <X className="h-5 w-5 text-gray-700" />
                    </button>
                </div>

                {/* Calendar Section */}
                <div className="px-6 mt-4">
                    <div className="flex items-center justify-between mb-6 px-2">
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

                {/* Legend */}
                <div className="px-6 mt-8">
                    <h2 className="text-gray-400 font-medium text-sm mb-3">Available time</h2>
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

                {/* Time Slots Cards */}
                <div className="px-6 mt-4 space-y-3 pb-8">
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
                                    <span className="text-sm font-bold text-gray-900 block mb-2">AED {slot.price}</span>

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
                            </button>
                        ))}
                    </div>
                </div>

            </div>

            {/* Sticky Bottom Action */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 pb-safe z-20">
                <div className="mx-auto max-w-md">
                    <Button
                        className="w-full h-12 rounded-lg bg-black text-white hover:bg-gray-900 font-bold text-sm"
                        disabled={selectedSlot === null}
                        onClick={handleContinue}
                    >
                        Continue
                    </Button>
                </div>
            </div>

        </div>
    );
}
