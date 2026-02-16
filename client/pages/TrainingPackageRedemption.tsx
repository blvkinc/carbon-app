import { ArrowLeft, ChevronRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { AVAILABLE_PACKAGES, ClassPackage } from "@/lib/mockData";
import { useState } from "react";

// Mock data for training sessions/sports
const MOCK_SESSIONS = {
    "Personal Training": [
        { id: "s1", name: "1-on-1 Strength", duration: "60 min", instructor: "Sarah" },
        { id: "s2", name: "HIIT Session", duration: "45 min", instructor: "Mike" },
    ],
    "Boxing": [
        { id: "s3", name: "Boxing Technique", duration: "60 min", instructor: "Tyson" },
        { id: "s4", name: "Sparring Practice", duration: "60 min", instructor: "Ali" },
    ],
    "Yoga": [
        { id: "s5", name: "Private Yoga", duration: "60 min", instructor: "Lisa" },
    ],
    "Tennis": [
        { id: "s6", name: "Court Rental + Coach", duration: "60 min", instructor: "Roger" },
    ]
};

// Sports list to select from
const SPORTS = ["Personal Training", "Boxing", "Yoga", "Tennis"];

export default function TrainingPackageRedemption() {
    const navigate = useNavigate();
    const location = useLocation();
    const purchasedPackage = location.state?.package as ClassPackage;

    // State
    const [selectedSport, setSelectedSport] = useState<string | null>(null);
    const [selectedType, setSelectedType] = useState<string | null>(null);

    // If no package state is passed, fallback to a mock one for demo
    const pkg = purchasedPackage || {
        ...AVAILABLE_PACKAGES[1],
        name: "Training Session Package",
        eligibleClasses: ["All Sports"]
    };

    const handleBack = () => {
        if (selectedType) {
            setSelectedType(null);
        } else if (selectedSport) {
            setSelectedSport(null);
        } else {
            navigate(-1);
        }
    };

    return (
        <div className="min-h-screen w-full bg-white text-black font-sans flex flex-col">
            <div className="mx-auto w-full max-w-md bg-white flex-1 flex flex-col relative pb-10">

                {/* Header */}
                <div className="sticky top-0 z-10 bg-white px-4 py-4 flex items-center gap-3 border-b border-gray-50">
                    <button
                        onClick={handleBack}
                        className="p-2 -ml-2 rounded-full hover:bg-gray-50 bg-gray-50"
                    >
                        <ArrowLeft className="h-5 w-5 text-black" />
                    </button>
                    <div>
                        <h1 className="text-base font-bold text-gray-900">
                            {selectedType ? selectedType : (selectedSport ? selectedSport : "My Package")}
                        </h1>
                        {!selectedType && !selectedSport && <span className="text-xs text-gray-500 block">{pkg.name}</span>}
                    </div>
                </div>

                {/* Content */}
                <div className="px-5 mt-4 space-y-6">

                    {/* Step 1: Package Info & Sport Selection */}
                    {!selectedSport && !selectedType ? (
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

                            {/* Sports Selection */}
                            <section>
                                <h3 className="font-bold text-gray-900 mb-3">Select Sport</h3>
                                <div className="grid gap-3">
                                    {SPORTS.map((sport, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setSelectedSport(sport)}
                                            className="w-full p-4 rounded-xl border border-gray-100 flex items-center justify-between hover:border-black hover:bg-gray-50 transition-all group"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all">
                                                    {/* Placeholder Icon */}
                                                    <div className="h-5 w-5 rounded-sm bg-gray-300" />
                                                </div>
                                                <div className="text-left">
                                                    <span className="block font-bold text-sm">{sport}</span>
                                                    <span className="block text-xs text-gray-500">View Sessions</span>
                                                </div>
                                            </div>
                                            <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-black" />
                                        </button>
                                    ))}
                                </div>
                            </section>
                        </>
                    ) : null}

                    {/* Step 2: Session Selection for Sport */}
                    {selectedSport && !selectedType ? (
                        <section className="animate-in slide-in-from-right-4 duration-300">
                            <h3 className="font-bold text-gray-900 mb-3">Available Sessions for {selectedSport}</h3>
                            <div className="space-y-3">
                                {(MOCK_SESSIONS[selectedSport as keyof typeof MOCK_SESSIONS] || []).map((session) => (
                                    <div key={session.id} className="p-4 rounded-xl border border-gray-200 bg-white">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="font-bold text-base">{session.name}</h3>
                                                <p className="text-xs text-gray-500 mt-1">{session.duration} • with {session.instructor}</p>
                                            </div>
                                        </div>
                                        <Button
                                            className="w-full bg-black text-white h-10 rounded-lg mt-2 text-xs font-bold"
                                            onClick={() => navigate("/training/session", { state: { service: { ...session, title: session.name, price: "Using Credit" } } })}
                                        >
                                            Book This Session
                                        </Button>
                                    </div>
                                ))}
                                {(MOCK_SESSIONS[selectedSport as keyof typeof MOCK_SESSIONS] || []).length === 0 && (
                                    <div className="text-center py-10 text-gray-500 text-sm">No sessions available for this sport right now.</div>
                                )}
                            </div>
                        </section>
                    ) : null}

                </div>
            </div>
        </div>
    );
}
