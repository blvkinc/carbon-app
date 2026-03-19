import { ArrowLeft, AlertCircle, ChevronRight, MessageSquare, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getBookings } from "@/lib/mockData";
import { canMakeComplaint, getComplaintPolicyMessage } from "@/lib/policyEngine";
import { Booking } from "@shared/api";

export default function ComplainSection() {
    const navigate = useNavigate();
    const bookings = getBookings();
    
    // Filter to only show bookings that are finished and eligible for complaint
    const complaintEligible = bookings.filter(b => canMakeComplaint(b));
    const upcomingEligible = bookings.filter(b => b.status === 'Used' && !canMakeComplaint(b));

    const handleComplain = (booking: Booking) => {
        navigate("/complaint/add", { state: { booking } });
    };

    return (
        <div className="min-h-screen w-full bg-[#FAFAFA] text-black font-sans flex flex-col pb-10">
            <div className="mx-auto w-full max-w-md bg-white flex-1 flex flex-col relative px-6">
                
                {/* Header */}
                <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md -mx-6 px-6 py-6 flex items-center gap-4 mb-4">
                    <button 
                        onClick={() => navigate("/profile")}
                        className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-all"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </button>
                    <h1 className="text-2xl font-bold tracking-tight">Complain Center</h1>
                </header>

                <main className="space-y-8 mt-4">
                    {/* Eligible Sessions */}
                    <section>
                        <div className="flex items-center gap-2 mb-4">
                            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400">Available to Complain</h2>
                            <div className="bg-orange-100 text-orange-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                                {complaintEligible.length}
                            </div>
                        </div>

                        <div className="space-y-3">
                            {complaintEligible.map((booking) => (
                                <button
                                    key={booking.id}
                                    onClick={() => handleComplain(booking)}
                                    className="w-full text-left bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center justify-between hover:border-black transition-all group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                                            <MessageSquare className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-sm leading-tight">{booking.serviceName}</h3>
                                            <p className="text-[10px] text-gray-500 mt-0.5">Finished {new Date(booking.endTime).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-black" />
                                </button>
                            ))}

                            {complaintEligible.length === 0 && (
                                <div className="text-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                                    <p className="text-xs text-gray-400">No sessions currently eligible for complaints.</p>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Waiting Period Sessions */}
                    {upcomingEligible.length > 0 && (
                        <section>
                            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">In Mandatory Waiting Period</h2>
                            <div className="space-y-3 opacity-60">
                                {upcomingEligible.map((booking) => (
                                    <div
                                        key={booking.id}
                                        className="bg-gray-50 rounded-2xl p-4 border border-transparent flex flex-col gap-2"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                                                    <Clock className="w-5 h-5 text-gray-400" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-sm leading-tight">{booking.serviceName}</h3>
                                                    <p className="text-[10px] text-gray-500 mt-0.5">Finished {new Date(booking.endTime).toLocaleTimeString()}</p>
                                                </div>
                                            </div>
                                            <div className="text-[9px] font-bold text-black uppercase tracking-widest bg-white/50 px-2 py-0.5 rounded">Waiting</div>
                                        </div>
                                        <div className="flex items-center gap-1.5 mt-1">
                                            <AlertCircle className="w-3 h-3 text-gray-400" />
                                            <p className="text-[9px] text-gray-500 italic">
                                                {getComplaintPolicyMessage(booking.serviceType as any)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Policy Info Card */}
                    <div className="p-6 bg-indigo-600 text-white rounded-3xl relative overflow-hidden shadow-xl shadow-indigo-100">
                        <h3 className="text-lg font-bold mb-2">Our Quality Commitment</h3>
                        <p className="text-xs text-indigo-100 leading-relaxed mb-6">
                            We take all complaints seriously. Service providers are given 24 hours to address issues before Carbon Admin intervenes to ensure a fair resolution.
                        </p>
                        <div className="absolute bottom-[-20px] right-[-20px] w-32 h-32 bg-white/10 rounded-full blur-3xl" />
                    </div>
                </main>

            </div>
        </div>
    );
}
