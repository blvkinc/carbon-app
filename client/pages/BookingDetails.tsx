import { ArrowLeft, MapPin, Calendar, Clock, User, ShieldCheck, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { Booking } from "@shared/api";
import { canCancelBooking, canMakeComplaint, getCancellationPolicyMessage, getComplaintPolicyMessage } from "@/lib/policyEngine";
import { cn } from "@/lib/utils";

export default function BookingDetails() {
    const navigate = useNavigate();
    const location = useLocation();
    const booking = location.state?.booking as Booking;

    if (!booking) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
                <h1 className="text-xl font-bold mb-2">Booking Not Found</h1>
                <Button onClick={() => navigate("/profile")}>Back to Profile</Button>
            </div>
        );
    }

    const handleCancel = () => {
        // In a real app, this would call the API
        alert("Booking cancelled successfully.");
        navigate("/profile");
    };

    const handleComplain = () => {
        navigate("/complaint/add", { state: { booking } });
    };

    return (
        <div className="min-h-screen w-full bg-white text-black font-sans flex flex-col pb-10">
            <div className="mx-auto w-full max-w-md bg-white flex-1 flex flex-col relative">
                
                {/* Hero Header */}
                <div className="relative h-64 w-full bg-gray-100 overflow-hidden">
                    <img 
                        src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop" 
                        alt="Activity" 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
                    
                    <button 
                        onClick={() => navigate(-1)}
                        className="absolute top-4 left-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-all"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </button>

                    <div className="absolute bottom-6 left-6 right-6 text-white">
                        <div className="flex items-center gap-2 mb-2">
                             <span className="text-[10px] font-bold bg-white/20 backdrop-blur-md px-2 py-0.5 rounded uppercase tracking-wider">
                                {booking.serviceType}
                            </span>
                            <span className={cn(
                                "text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider",
                                booking.status === 'Booked' ? "bg-blue-500" : "bg-green-500"
                            )}>
                                {booking.status}
                            </span>
                        </div>
                        <h1 className="text-2xl font-bold leading-tight">{booking.serviceName}</h1>
                    </div>
                </div>

                <div className="px-6 py-8 space-y-8">
                    {/* Key Info */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
                            <Calendar className="w-5 h-5 text-gray-400" />
                            <div>
                                <p className="text-[10px] text-gray-400 font-bold uppercase">Date</p>
                                <p className="text-xs font-bold">{new Date(booking.startTime).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
                            <Clock className="w-5 h-5 text-gray-400" />
                            <div>
                                <p className="text-[10px] text-gray-400 font-bold uppercase">Time</p>
                                <p className="text-xs font-bold">{new Date(booking.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                            </div>
                        </div>
                    </div>

                    {/* Details Sections */}
                    <section className="space-y-4">
                        <h3 className="font-bold text-sm">Location & Provider</h3>
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                                <MapPin className="w-5 h-5 text-gray-500" />
                            </div>
                            <div>
                                <p className="text-sm font-bold">Vortex Oasis Hub</p>
                                <p className="text-xs text-gray-500">Al Quos Industrial Area 1, Dubai, UAE</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=64&auto=format&fit=crop" alt="Instructor" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <p className="text-sm font-bold">Sarah Jenkins</p>
                                <p className="text-xs text-gray-500">Senior Lead Instructor</p>
                            </div>
                        </div>
                    </section>

                    {/* Verification Section */}
                    <div className="p-4 bg-black text-white rounded-2xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                                <ShieldCheck className="w-5 h-5 text-green-400" />
                            </div>
                            <div>
                                <p className="text-xs font-bold">Booking Confirmed</p>
                                <p className="text-[10px] text-white/60">Reference: #VO-{booking.id.toUpperCase()}</p>
                            </div>
                        </div>
                    </div>

                    {/* Actions based on Policy */}
                    <section className="space-y-4 pt-4 border-t border-gray-100">
                        {canCancelBooking(booking) && (
                            <div className="p-4 bg-red-50 rounded-2xl border border-red-100">
                                <div className="flex items-center gap-2 mb-2">
                                    <AlertTriangle className="w-4 h-4 text-red-500" />
                                    <h4 className="text-xs font-bold text-red-700">Cancellation Policy</h4>
                                </div>
                                <p className="text-[10px] text-red-600/80 mb-4">
                                    {getCancellationPolicyMessage(booking.serviceType as any)}
                                </p>
                                <Button 
                                    variant="destructive"
                                    className="w-full h-11 rounded-xl bg-red-500 hover:bg-red-600 font-bold"
                                    onClick={handleCancel}
                                >
                                    Cancel This Activity
                                </Button>
                            </div>
                        )}

                        {canMakeComplaint(booking) && (
                            <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
                                <div className="flex items-center gap-2 mb-2">
                                    <ShieldCheck className="w-4 h-4 text-orange-500" />
                                    <h4 className="text-xs font-bold text-orange-700">Need to report an issue?</h4>
                                </div>
                                <p className="text-[10px] text-orange-600/80 mb-4">
                                    {getComplaintPolicyMessage(booking.serviceType as any)}
                                </p>
                                <Button 
                                    variant="outline"
                                    className="w-full h-11 rounded-xl border-orange-200 text-orange-700 hover:bg-orange-100 font-bold"
                                    onClick={handleComplain}
                                >
                                    Make a Complaint
                                </Button>
                            </div>
                        )}

                        {booking.status === 'Booked' && !canCancelBooking(booking) && (
                            <div className="text-center p-4">
                                <p className="text-xs text-gray-400 italic">This activity is starting soon. Cancellation is no longer available.</p>
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
}
