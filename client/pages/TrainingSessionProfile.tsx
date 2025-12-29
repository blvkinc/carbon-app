import { useRef } from "react";
import {
    ArrowLeft, Share, Heart, Phone,
    Calendar, Clock, Hourglass,
    Info, DollarSign, Dumbbell, MessageSquare,
    MapPin, Navigation, MessageCircle,
    ChevronRight, Bike, Trophy, Medal, Star, User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate, useLocation } from "react-router-dom";

export default function TrainingSessionProfile() {
    const navigate = useNavigate();
    const location = useLocation();
    const service = location.state?.service || {
        title: "Personal Training",
        price: "AED 250",
        duration: "60 mins"
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
                            <div className="text-xs text-gray-500">
                                <span className="underline decoration-gray-400">Elite Fitness</span> • Dubai, Downtown
                            </div>
                            <div className="flex items-center gap-1 mt-1">
                                <Star className="h-3 w-3 fill-orange-500 text-orange-500" />
                                <span className="text-xs font-bold">4.9</span>
                                <span className="text-xs text-gray-400 underline decoration-gray-300 ml-1">42 reviews</span>
                            </div>
                        </div>
                        <button className="p-3 rounded-full border border-gray-100 shadow-sm hover:bg-gray-50">
                            <Phone className="h-5 w-5 text-gray-700" />
                        </button>
                    </div>

                    {/* 3. Key Info Cards */}
                    <div className="grid grid-cols-3 gap-3">
                        <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-white border border-gray-50 shadow-[0_2px_8px_rgba(0,0,0,0.04)] text-center space-y-2">
                            <div className="p-2 bg-orange-50 text-orange-500 rounded-full">
                                <User className="h-5 w-5" />
                            </div>
                            <div>
                                <div className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">Type</div>
                                <div className="text-xs font-bold text-gray-800 mt-0.5">Individual</div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-white border border-gray-50 shadow-[0_2px_8px_rgba(0,0,0,0.04)] text-center space-y-2">
                            <div className="p-2 bg-orange-50 text-orange-500 rounded-full">
                                <Dumbbell className="h-5 w-5" />
                            </div>
                            <div>
                                <div className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">Focus</div>
                                <div className="text-xs font-bold text-gray-800 mt-0.5">Strength</div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-white border border-gray-50 shadow-[0_2px_8px_rgba(0,0,0,0.04)] text-center space-y-2">
                            <div className="p-2 bg-orange-50 text-orange-500 rounded-full">
                                <Hourglass className="h-5 w-5" />
                            </div>
                            <div>
                                <div className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">Duration</div>
                                <div className="text-xs font-bold text-gray-800 mt-0.5">{service.duration}</div>
                            </div>
                        </div>
                    </div>

                    {/* 4. Tabs Section */}
                    <div className="flex justify-between border-b border-gray-100 pb-1">
                        <button className="flex flex-col items-center gap-2 px-2 pb-2 border-b-2 border-black">
                            <div className="p-2 bg-gray-100 rounded-full">
                                <Info className="h-5 w-5 text-gray-700" />
                            </div>
                            <span className="text-[10px] font-bold text-gray-900">Details</span>
                        </button>
                        <button className="flex flex-col items-center gap-2 px-2 pb-2 text-gray-400 border-b-2 border-transparent hover:text-gray-600">
                            <div className="p-2 bg-transparent rounded-full">
                                <DollarSign className="h-5 w-5" />
                            </div>
                            <span className="text-[10px] font-medium">Pricing</span>
                        </button>
                        <button className="flex flex-col items-center gap-2 px-2 pb-2 text-gray-400 border-b-2 border-transparent hover:text-gray-600">
                            <div className="p-2 bg-transparent rounded-full">
                                <User className="h-5 w-5" />
                            </div>
                            <span className="text-[10px] font-medium">Trainer</span>
                        </button>
                        <button className="flex flex-col items-center gap-2 px-2 pb-2 text-gray-400 border-b-2 border-transparent hover:text-gray-600">
                            <div className="p-2 bg-transparent rounded-full">
                                <MessageSquare className="h-5 w-5" />
                            </div>
                            <span className="text-[10px] font-medium">Reviews</span>
                        </button>
                    </div>

                    {/* 5. About Session */}
                    <section className="space-y-2">
                        <h3 className="font-bold text-base text-gray-900">About Session</h3>
                        <p className="text-xs text-gray-500 leading-relaxed">
                            {service.description || "Our personal training sessions are designed to push your limits and help you achieve your fitness goals. Whether you want to build muscle, lose weight, or improve endurance, our expert trainers are here to guide you every step of the way."}
                        </p>
                        <div className="text-xs font-bold text-black cursor-pointer underline decoration-black/20">Read More</div>
                    </section>

                    {/* 6. About Trainer */}
                    <section className="space-y-4">
                        <h3 className="font-bold text-base text-gray-900">About Trainer</h3>
                        <div className="flex items-start gap-3">
                            <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-200 shrink-0">
                                <img
                                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&h=300&fit=crop"
                                    alt="Trainer"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div>
                                <div className="text-sm font-bold text-gray-900">Sarah Jenkins</div>
                                <div className="text-xs text-gray-500 mb-2">Elite Certified Trainer</div>
                                <p className="text-xs text-gray-500 leading-relaxed mb-2">
                                    Specializing in functional training and rehabilitation. Sarah creates personalized plans that fit your lifestyle.
                                </p>
                                <div className="text-xs font-bold text-black cursor-pointer underline decoration-black/20 mb-3">Read More</div>
                            </div>
                        </div>
                    </section>

                    {/* 7. Location */}
                    <section className="space-y-3">
                        <h3 className="font-bold text-base text-gray-900">Location</h3>
                        <p className="text-xs text-gray-600">Downtown Dubai, UAE</p>
                        <div className="h-32 w-full rounded-2xl bg-gray-100 overflow-hidden relative">
                            {/* Placeholder for map */}
                            <img src="https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/-122.4194,37.7749,14,0/600x300?access_token=YOUR_TOKEN" alt="Map" className="h-full w-full object-cover opacity-80" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <MapPin className="h-8 w-8 text-orange-500 fill-white drop-shadow-md" />
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Button variant="outline" className="flex-1 h-10 gap-2 text-xs font-bold border-gray-200 text-gray-700 rounded-lg">
                                <Navigation className="h-3.5 w-3.5" /> Get Directions
                            </Button>
                            <Button variant="outline" className="flex-1 h-10 gap-2 text-xs font-bold border-gray-200 text-gray-700 rounded-lg">
                                <MessageCircle className="h-3.5 w-3.5" /> Contact Trainer
                            </Button>
                        </div>
                    </section>

                    {/* 8. Available Facilities */}
                    <section className="space-y-3">
                        <h3 className="font-bold text-base text-gray-900">Facilities</h3>
                        <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary" className="bg-gray-50 text-gray-600 font-normal text-[10px] px-3 py-1.5 hover:bg-gray-100">Shower</Badge>
                            <Badge variant="secondary" className="bg-gray-50 text-gray-600 font-normal text-[10px] px-3 py-1.5 hover:bg-gray-100">Lockers</Badge>
                            <Badge variant="secondary" className="bg-gray-50 text-gray-600 font-normal text-[10px] px-3 py-1.5 hover:bg-gray-100">Parking</Badge>
                            <Badge variant="secondary" className="bg-gray-50 text-gray-600 font-normal text-[10px] px-3 py-1.5 hover:bg-gray-100">Juice Bar</Badge>
                        </div>
                    </section>

                    {/* 9. Reviews */}
                    <section className="space-y-4">
                        <h3 className="font-bold text-base text-gray-900">Reviews</h3>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 fill-orange-500 text-orange-500" />
                                <span className="text-xs font-bold">Overall 4.9</span>
                            </div>
                            <span className="text-xs text-gray-500 underline decoration-gray-300">42 reviews</span>
                        </div>

                        {/* Review Card 1 */}
                        <div className="border border-gray-100 rounded-xl p-4 shadow-sm bg-white">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden">
                                    <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" className="h-full w-full object-cover" />
                                </div>
                                <span className="text-xs font-bold text-gray-900">Ahmed K.</span>
                            </div>
                            <p className="text-xs text-gray-600 leading-relaxed mb-3">
                                Sarah is amazing! She pushed me harder than I thought possible. Highly recommend this session.
                            </p>
                            <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 fill-orange-500 text-orange-500" />
                                <span className="text-xs font-bold text-gray-500">5.0</span>
                            </div>
                        </div>

                    </section>
                </div>

                {/* 10. Bottom Sticky Bar */}
                <div className="fixed bottom-0 left-0 right-0 border-t border-gray-100 bg-white p-4 pb-6 z-20">
                    <div className="mx-auto max-w-md flex items-center justify-between gap-4">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-gray-500 font-medium">Session Price</span>
                            <span className="text-sm font-bold text-gray-900">{service.price}</span>
                        </div>
                        <Button
                            className="px-8 h-10 bg-[#D4A017] hover:bg-[#C29010] text-white font-bold text-sm rounded-lg"
                            onClick={() => navigate("/training/date-time", { state: { service } })}
                        >
                            Select Time
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    );
}
