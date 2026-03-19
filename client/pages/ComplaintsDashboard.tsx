import { ArrowLeft, MessageSquare, Clock, CheckCircle2, AlertCircle, ChevronRight, PlusCircle, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getBookings } from "@/lib/mockData";
import { canMakeComplaint, getComplaintPolicyMessage } from "@/lib/policyEngine";
import { Booking, Complaint } from "@shared/api";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Mock data for user's complaints (would come from API)
const MOCK_USER_COMPLAINTS: (Complaint & { serviceName: string })[] = [
    {
        id: "c_1",
        bookingId: "b3",
        userId: "u1",
        serviceName: "Mat Pilates",
        reason: "Instructor was late and the room was too cold.",
        status: "PassedToAdmin",
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        updatedAt: new Date(Date.now() - 1800000).toISOString(),
    },
    {
        id: "c_2",
        bookingId: "b0",
        userId: "u1",
        serviceName: "Morning Yoga",
        reason: "The facility was clean but noisy.",
        status: "Refunded",
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        updatedAt: new Date(Date.now() - 43200000).toISOString(),
    }
];

export default function ComplaintsDashboard() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'track' | 'report'>('track');
    const bookings = getBookings();
    
    // Data for "Report" Tab
    const complaintEligible = bookings.filter(b => canMakeComplaint(b));
    const upcomingEligible = bookings.filter(b => b.status === 'Used' && !canMakeComplaint(b));
    
    // Data for "Track" Tab
    const [complaints] = useState(MOCK_USER_COMPLAINTS);

    const handleComplain = (booking: Booking) => {
        navigate("/complaint/add", { state: { booking } });
    };

    return (
        <div className="min-h-screen w-full bg-[#FAFAFA] text-black font-sans flex flex-col pb-10">
            <div className="mx-auto w-full max-w-md bg-white flex-1 flex flex-col relative">
                
                {/* Header Section */}
                <header className="px-6 pt-8 pb-4 bg-white">
                    <div className="flex items-center justify-between mb-6">
                        <button 
                            onClick={() => navigate("/profile")}
                            className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-all"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </button>
                        <h1 className="text-xl font-bold tracking-tight">Complaints</h1>
                        <div className="w-9 h-9" /> {/* Spacer */}
                    </div>

                    {/* Segmented Control (Tabs) */}
                    <div className="p-1 bg-gray-100 rounded-2xl flex gap-1">
                        <button 
                            onClick={() => setActiveTab('track')}
                            className={cn(
                                "flex-1 py-3 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2",
                                activeTab === 'track' ? "bg-white text-black shadow-sm" : "text-gray-400 hover:text-gray-600"
                            )}
                        >
                            <Search className="w-3.5 h-3.5" />
                            Track Activity
                        </button>
                        <button 
                            onClick={() => setActiveTab('report')}
                            className={cn(
                                "flex-1 py-3 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2",
                                activeTab === 'report' ? "bg-white text-black shadow-sm" : "text-gray-400 hover:text-gray-600"
                            )}
                        >
                            <PlusCircle className="w-3.5 h-3.5" />
                            Report Issue
                        </button>
                    </div>
                </header>

                <main className="px-6 pt-4 flex-1">
                    {activeTab === 'track' ? (
                        /* TRACK STATUS TAB */
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-400">
                            {complaints.length > 0 ? (
                                complaints.map((complaint) => (
                                    <div key={complaint.id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm relative overflow-hidden group hover:border-black transition-all">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                                                    <MessageSquare className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-sm leading-tight">{complaint.serviceName}</h3>
                                                    <p className="text-[10px] text-gray-400 mt-0.5">{new Date(complaint.createdAt).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                            <div className={cn(
                                                "text-[10px] font-bold px-2 py-1 rounded-md",
                                                complaint.status === 'Refunded' ? "bg-green-50 text-green-600" :
                                                complaint.status === 'Rejected' ? "bg-red-50 text-red-600" :
                                                "bg-orange-50 text-orange-600"
                                            )}>
                                                {complaint.status}
                                            </div>
                                        </div>

                                        <div className="bg-gray-50 rounded-xl p-3 border border-gray-50 mb-4 text-[11px] text-gray-500 italic">
                                            "{complaint.reason}"
                                        </div>

                                        <div className="flex items-center justify-between text-[10px] font-medium">
                                            <span className="text-gray-400 flex items-center gap-1">
                                                <Clock className="w-3 h-3" /> Updated {new Date(complaint.updatedAt).getHours()}h ago
                                            </span>
                                            {complaint.status === 'Refunded' && (
                                                <span className="text-green-600 font-bold">AED 250 Refunded</span>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                                    <MessageSquare className="w-10 h-10 text-gray-200 mx-auto mb-4" />
                                    <p className="text-sm text-gray-400 font-medium">No complaints tracked yet.</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        /* REPORT ISSUE TAB */
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-400">
                            {/* Eligible to Complain */}
                            <section>
                                <h2 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">Select finished session</h2>
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
                                                    <p className="text-[10px] text-gray-400 mt-0.5">Ended {new Date(booking.endTime).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                            <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-black" />
                                        </button>
                                    ))}
                                    
                                    {complaintEligible.length === 0 && upcomingEligible.length === 0 && (
                                        <div className="text-center py-10">
                                            <p className="text-xs text-gray-400 italic">No sessions found for reporting.</p>
                                        </div>
                                    )}
                                </div>
                            </section>

                            {/* In Waiting Period */}
                            {upcomingEligible.length > 0 && (
                                <section>
                                    <h2 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">In Wait Period</h2>
                                    <div className="space-y-3">
                                        {upcomingEligible.map((booking) => (
                                            <div key={booking.id} className="bg-gray-50/50 rounded-2xl p-4 border border-transparent flex flex-col gap-3 opacity-70">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                                                            <Clock className="w-5 h-5 text-gray-300" />
                                                        </div>
                                                        <div>
                                                            <h3 className="font-bold text-sm leading-tight">{booking.serviceName}</h3>
                                                            <p className="text-[10px] text-gray-400 mt-0.5">Finished recently</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-2 bg-white/50 p-2 rounded-lg">
                                                    <AlertCircle className="w-3 h-3 text-orange-400 shrink-0 mt-0.5" />
                                                    <p className="text-[9px] text-gray-500 italic leading-tight">
                                                        {getComplaintPolicyMessage(booking.serviceType as any)}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>
                    )}
                </main>

                {/* Promotional Banner (Fixed Bottom) */}
                <div className="p-6 mt-auto">
                    <div className="bg-slate-900 text-white rounded-3xl p-5 relative overflow-hidden">
                        <h4 className="font-bold text-sm mb-1 z-10 relative">Carbon Support</h4>
                        <p className="text-[10px] text-slate-400 leading-relaxed z-10 relative max-w-[200px]">
                            Need urgent help? Our team is available 24/7 via live support chat.
                        </p>
                        <Button variant="outline" className="mt-4 h-9 text-[10px] font-bold border-slate-700 bg-transparent hover:bg-slate-800 text-white rounded-xl">
                            Chat with us
                        </Button>
                        <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl" />
                    </div>
                </div>

            </div>
        </div>
    );
}
