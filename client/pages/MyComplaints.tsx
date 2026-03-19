import { ArrowLeft, MessageSquare, Clock, CheckCircle2, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Complaint } from "@shared/api";
import { cn } from "@/lib/utils";

// Mock data for user's complaints
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

export default function MyComplaints() {
    const navigate = useNavigate();
    const [complaints] = useState(MOCK_USER_COMPLAINTS);

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
                    <h1 className="text-2xl font-bold tracking-tight">My Complaints</h1>
                </header>

                <div className="space-y-6 mt-4">
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

                                <div className="bg-gray-50 rounded-xl p-3 border border-gray-50 mb-4">
                                    <p className="text-[11px] text-gray-500 italic leading-relaxed">
                                        "{complaint.reason}"
                                    </p>
                                </div>

                                <div className="flex items-center gap-4 text-[10px] text-gray-400 font-medium">
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" /> Updated {new Date(complaint.updatedAt).getHours()}h ago
                                    </div>
                                    {complaint.status === 'Refunded' && (
                                        <div className="flex items-center gap-1 text-green-600">
                                            <CheckCircle2 className="w-3 h-3" /> Refund Completed
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-20 px-10">
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <MessageSquare className="w-8 h-8 text-gray-300" />
                            </div>
                            <h3 className="text-base font-bold text-gray-900 mb-2">No complaints yet</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">
                                If you have any issues with your sessions, you can raise a complaint from the session details or the complain section.
                            </p>
                        </div>
                    )}
                </div>

                <div className="mt-auto py-10">
                    <div className="bg-black text-white p-5 rounded-2xl relative overflow-hidden">
                        <h4 className="font-bold text-sm mb-1">Our Promise</h4>
                        <p className="text-[11px] text-white/70 leading-relaxed">
                            We aim to resolve all complaints within 48 hours. Carbon Admin reviews each case individually.
                        </p>
                        <div className="absolute top-[-10px] right-[-10px] w-20 h-20 bg-white/5 rounded-full blur-xl" />
                    </div>
                </div>

            </div>
        </div>
    );
}
