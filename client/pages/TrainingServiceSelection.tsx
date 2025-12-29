import { ArrowLeft, ChevronRight, Dumbbell, Users, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const SERVICES = [
    {
        id: "personal",
        title: "Personal Training",
        description: "One-on-one session tailored to your goals.",
        price: "AED 250",
        duration: "60 mins",
        icon: Dumbbell,
        color: "bg-orange-50 text-orange-600"
    },
    {
        id: "group",
        title: "Group Session",
        description: "Train with friends or join a small group.",
        price: "AED 150",
        duration: "45 mins",
        icon: Users,
        color: "bg-blue-50 text-blue-600"
    },
    {
        id: "specialized",
        title: "Specialized Coaching",
        description: "Expert coaching for specific sports or skills.",
        price: "AED 400",
        duration: "90 mins",
        icon: Trophy,
        color: "bg-purple-50 text-purple-600"
    }
];

export default function TrainingServiceSelection() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen w-full bg-white text-black font-sans flex flex-col">
            <div className="mx-auto w-full max-w-md bg-white flex-1 flex flex-col relative pb-24">

                {/* Header */}
                <div className="sticky top-0 z-10 bg-white px-4 py-4 flex items-center gap-4 border-b border-gray-50">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 -ml-2 rounded-full hover:bg-gray-50 transition-colors"
                    >
                        <ArrowLeft className="h-5 w-5 text-gray-700" />
                    </button>
                    <h1 className="text-base font-bold text-gray-900">Select Service</h1>
                </div>

                {/* Content */}
                <div className="px-5 mt-6 space-y-6">

                    <div className="space-y-4">
                        {SERVICES.map((service) => (
                            <Card
                                key={service.id}
                                onClick={() => navigate("/training/session", { state: { service } })}
                                className="border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:border-black transition-all cursor-pointer group"
                            >
                                <CardContent className="p-4 flex items-center gap-4">
                                    <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${service.color}`}>
                                        <service.icon className="h-6 w-6" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-bold text-base text-gray-900">{service.title}</h3>
                                            <span className="font-bold text-sm text-[#D4A017]">{service.price}</span>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1 line-clamp-1">{service.description}</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <Badge variant="secondary" className="text-[10px] font-medium bg-gray-50 text-gray-600 hover:bg-gray-100">
                                                {service.duration}
                                            </Badge>
                                        </div>
                                    </div>
                                    <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-black transition-colors" />
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                </div>

            </div>
        </div>
    );
}
