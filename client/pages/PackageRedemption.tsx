import { ArrowLeft, ChevronRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { AVAILABLE_PACKAGES, ClassPackage } from "@/lib/mockData";
import { useState } from "react";

// Mock data for classes available under types
const MOCK_CLASSES = {
    "Yoga": [
        { id: "c1", name: "Morning Hatha Yoga", duration: "60 min", instructor: "Sarah" },
        { id: "c2", name: "Vinyasa Flow", duration: "45 min", instructor: "Mike" },
    ],
    "Pilates": [
        { id: "c3", name: "Reformer Foundation", duration: "50 min", instructor: "Jenny" },
        { id: "c4", name: "Mat Pilates", duration: "45 min", instructor: "Lisa" },
    ],
    "Barre": [
        { id: "c5", name: "Cardio Barre", duration: "55 min", instructor: "Emma" },
    ],
    "HIIT": [
        { id: "c6", name: "High Intensity Blast", duration: "30 min", instructor: "Tom" },
    ]
};

export default function PackageRedemption() {
    const navigate = useNavigate();
    const location = useLocation();
    const purchasedPackage = location.state?.package as ClassPackage;
    const [selectedType, setSelectedType] = useState<string | null>(null);

    // If no package state is passed (e.g. direct reload), we might fallback or redirect. 
    // For this demo, let's assume valid state or default fallback.
    const pkg = purchasedPackage || AVAILABLE_PACKAGES[1];

    return (
        <div className="min-h-screen w-full bg-white text-black font-sans flex flex-col">
            <div className="mx-auto w-full max-w-md bg-white flex-1 flex flex-col relative pb-10">

                {/* Header */}
                <div className="sticky top-0 z-10 bg-white px-4 py-4 flex items-center gap-3">
                    <button
                        onClick={() => selectedType ? setSelectedType(null) : navigate(-1)}
                        className="p-2 -ml-2 rounded-full hover:bg-gray-50 bg-gray-50"
                    >
                        <ArrowLeft className="h-5 w-5 text-black" />
                    </button>
                    <div>
                        <h1 className="text-base font-bold text-gray-900">{selectedType ? selectedType : "My Package"}</h1>
                        {!selectedType && <span className="text-xs text-gray-500 block">{pkg.name}</span>}
                    </div>
                </div>

                {/* Content */}
                <div className="px-5 mt-2 space-y-6">

                    {!selectedType ? (
                        <>
                            {/* Package Info Card */}
                            <div className="bg-black text-white p-5 rounded-2xl relative overflow-hidden">
                                <div className="absolute right-[-20px] top-[-20px] h-32 w-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                                <h2 className="text-2xl font-bold">{pkg.creditCount} Credits Left</h2>
                                <p className="text-white/70 text-sm mt-1 mb-4">Valid until {new Date(Date.now() + pkg.validityDays * 86400000).toLocaleDateString()}</p>
                                <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                                    <div className="h-2 w-2 bg-[#10B981] rounded-full animate-pulse" />
                                    Active
                                </div>
                            </div>

                            {/* Session Types */}
                            <section>
                                <h3 className="font-bold text-gray-900 mb-3">Available Sessions</h3>
                                <div className="grid gap-3">
                                    {pkg.eligibleClasses.map((type, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setSelectedType(type)}
                                            className="w-full p-4 rounded-xl border border-gray-100 flex items-center justify-between hover:border-black hover:bg-gray-50 transition-all group"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all">
                                                    {/* Placeholder Icon */}
                                                    <div className="h-5 w-5 rounded-sm bg-gray-300" />
                                                </div>
                                                <div className="text-left">
                                                    <span className="block font-bold text-sm">{type}</span>
                                                    <span className="block text-xs text-gray-500">View Classes</span>
                                                </div>
                                            </div>
                                            <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-black" />
                                        </button>
                                    ))}
                                </div>
                            </section>
                        </>
                    ) : (
                        /* Class Selection for Type */
                        <section className="animate-in slide-in-from-right-4 duration-300">
                            <div className="space-y-3">
                                {(MOCK_CLASSES[selectedType as keyof typeof MOCK_CLASSES] || []).map((cls) => (
                                    <div key={cls.id} className="p-4 rounded-xl border border-gray-200 bg-white">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="font-bold text-base">{cls.name}</h3>
                                                <p className="text-xs text-gray-500 mt-1">{cls.duration} • with {cls.instructor}</p>
                                            </div>
                                        </div>
                                        <Button
                                            className="w-full bg-black text-white h-10 rounded-lg mt-2 text-xs font-bold"
                                            onClick={() => navigate("/booking/date-time")}
                                        >
                                            Book This Class
                                        </Button>
                                    </div>
                                ))}
                                {(MOCK_CLASSES[selectedType as keyof typeof MOCK_CLASSES] || []).length === 0 && (
                                    <div className="text-center py-10 text-gray-500 text-sm">No classes available for this type right now.</div>
                                )}
                            </div>
                        </section>
                    )}

                </div>
            </div>
        </div>
    );
}
