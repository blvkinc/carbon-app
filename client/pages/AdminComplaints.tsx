import { ArrowLeft, CheckCircle, XCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Complaint, ComplaintStatus } from "@shared/api";

// Mock complaints for the admin
const INITIAL_COMPLAINTS: (Complaint & { serviceName: string, userName: string })[] = [
    {
        id: "c1",
        bookingId: "b3",
        userId: "u1",
        userName: "Demilo Angel",
        serviceName: "Mat Pilates",
        reason: "Instructor was late and the room was too cold.",
        status: "PassedToAdmin",
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        updatedAt: new Date(Date.now() - 1800000).toISOString(),
    },
    {
        id: "c2",
        bookingId: "b5",
        userId: "u2",
        userName: "Sarah Smith",
        serviceName: "Personal Training",
        reason: "The gym equipment was broken.",
        status: "PassedToAdmin",
        createdAt: new Date(Date.now() - 7200000).toISOString(),
        updatedAt: new Date(Date.now() - 3600000).toISOString(),
    }
];

export default function AdminComplaints() {
    const navigate = useNavigate();
    const [complaints, setComplaints] = useState(INITIAL_COMPLAINTS);

    const handleDecision = (id: string, status: ComplaintStatus) => {
        setComplaints(prev => prev.map(c => c.id === id ? { ...c, status } : c));
    };

    return (
        <div className="min-h-screen w-full bg-[#F8FAFC] text-slate-900 font-sans p-6">
            <div className="max-w-4xl mx-auto">
                <header className="flex items-center gap-4 mb-8">
                    <button 
                        onClick={() => navigate("/")}
                        className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Carbon Admin Dashboard</h1>
                        <p className="text-slate-500 text-sm">Reviewing escalated complaints</p>
                    </div>
                </header>

                <div className="grid gap-6">
                    {complaints.filter(c => c.status === 'PassedToAdmin').map((complaint) => (
                        <div key={complaint.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row gap-6">
                            <div className="flex-1 space-y-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded uppercase">Complaints</span>
                                            <span className="text-xs text-slate-400">ID: {complaint.id}</span>
                                        </div>
                                        <h3 className="text-lg font-bold">{complaint.serviceName}</h3>
                                        <p className="text-sm text-slate-500">Customer: <span className="text-slate-700 font-medium">{complaint.userName}</span></p>
                                    </div>
                                    <div className="text-right text-xs text-slate-400">
                                        Received: {new Date(complaint.createdAt).toLocaleDateString()}
                                    </div>
                                </div>

                                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                                    <h4 className="text-xs font-bold text-slate-500 uppercase mb-2 flex items-center gap-1.5">
                                        <Info className="w-3 h-3" /> Customer Reason
                                    </h4>
                                    <p className="text-sm text-slate-700 leading-relaxed italic">
                                        "{complaint.reason}"
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col justify-center gap-3 w-full md:w-48">
                                <Button 
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-11 rounded-xl flex items-center gap-2"
                                    onClick={() => handleDecision(complaint.id, 'Refunded')}
                                >
                                    <CheckCircle className="w-4 h-4" /> Approve Refund
                                </Button>
                                <Button 
                                    variant="outline"
                                    className="border-slate-200 text-slate-600 hover:bg-slate-50 font-bold h-11 rounded-xl flex items-center gap-2"
                                    onClick={() => handleDecision(complaint.id, 'Rejected')}
                                >
                                    <XCircle className="w-4 h-4" /> Reject
                                </Button>
                            </div>
                        </div>
                    ))}

                    {complaints.filter(c => c.status === 'PassedToAdmin').length === 0 && (
                        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
                            <p className="text-slate-400 font-medium">No pending complaints for review.</p>
                        </div>
                    )}
                </div>

                <section className="mt-12">
                    <h2 className="text-lg font-bold mb-4">Processed Recently</h2>
                    <div className="grid gap-3">
                        {complaints.filter(c => c.status !== 'PassedToAdmin').map((complaint) => (
                            <div key={complaint.id} className="bg-white/60 rounded-xl p-4 border border-slate-100 flex items-center justify-between opacity-75">
                                <div className="flex items-center gap-4">
                                    <div className={cn(
                                        "w-8 h-8 rounded-full flex items-center justify-center",
                                        complaint.status === 'Refunded' ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                                    )}>
                                        {complaint.status === 'Refunded' ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold">{complaint.serviceName}</p>
                                        <p className="text-[10px] text-slate-500">{complaint.userName}</p>
                                    </div>
                                </div>
                                <span className={cn(
                                    "text-[10px] font-bold px-2 py-0.5 rounded",
                                    complaint.status === 'Refunded' ? "text-emerald-700 bg-emerald-50" : "text-red-700 bg-red-50"
                                )}>
                                    {complaint.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}

// Helper function locally since we can't import cn in this view easily
function cn(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}
