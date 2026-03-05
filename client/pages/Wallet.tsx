import { useNavigate } from "react-router-dom";
import { ArrowLeft, X, CreditCard, ChevronRight, Search, Activity, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data based on the admin refund screenshot
const refundTickets = [
    {
        id: "TKT-001",
        provider: "Airgo Gym",
        category: "Poor Service Quality",
        service: "LIVE Classes",
        date: "March 19, 2024",
        status: "New",
        statusColor: "text-red-500 bg-red-50 border-red-200"
    },
    {
        id: "TKT-002",
        provider: "FitZone Studio",
        category: "Unexpected Cancellation",
        service: "Play Sports",
        date: "March 19, 2024",
        status: "Awaiting Provider",
        statusColor: "text-amber-500 bg-amber-50 border-amber-200"
    },
    {
        id: "TKT-003",
        provider: "Airgo Gym",
        category: "Poor Service Quality",
        service: "LIVE Classes",
        date: "March 18, 2024",
        status: "Closed",
        statusColor: "text-emerald-500 bg-emerald-50 border-emerald-200"
    }
];

export default function Wallet() {
    const navigate = useNavigate();

    return (
        <div className="min-h-[100dvh] w-full bg-white text-black font-sans flex flex-col items-center">
            <div className="w-full max-w-md bg-white min-h-[100dvh] flex flex-col">

                {/* Header Actions */}
                <div className="flex justify-between items-center px-4 py-4 backdrop-blur-md sticky top-0 z-10 bg-white/80 border-b border-gray-50">
                    <button className="p-2 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors" onClick={() => navigate(-1)}>
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className="font-semibold text-base">Wallet</h1>
                    <button className="p-2 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors" onClick={() => navigate("/")}>
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto px-5 py-6 pb-12 space-y-8">

                    {/* Balance */}
                    <div className="flex flex-col items-center">
                        <span className="text-gray-500 text-sm mb-1">Total Balance</span>
                        <span className="text-3xl font-bold mb-6">AED 4,900</span>
                        <Button className="w-full h-12 bg-black text-white rounded-lg font-semibold text-sm hover:bg-gray-900 transition-colors">
                            Top Up
                        </Button>
                    </div>

                    {/* Saved Cards */}
                    <div className="space-y-3 mt-4">
                        <h2 className="text-base text-gray-500 mb-2">Saved Cards</h2>

                        {/* Card 1 */}
                        <div className="border border-gray-100 rounded-xl p-4 flex items-center justify-between shadow-sm hover:border-gray-300 transition-colors cursor-pointer bg-white">
                            <div className="flex items-center gap-4">
                                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
                                    {/* Mock Mastercard Logo */}
                                    <div className="flex">
                                        <div className="w-4 h-4 rounded-full bg-red-500/80 -mr-1.5 mix-blend-multiply"></div>
                                        <div className="w-4 h-4 rounded-full bg-yellow-500/80 mix-blend-multiply"></div>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sm text-gray-900">Jonathan Holmes</h3>
                                    <p className="text-xs text-gray-500 font-mono mt-0.5">2354 •••• •••• 5698</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <span className="text-[10px] font-semibold text-[#D4A017]">Default</span>
                                <div className="w-5 h-5 rounded-full border-[5px] border-black flex items-center justify-center"></div>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="border border-gray-100 rounded-xl p-4 flex items-center justify-between shadow-sm hover:border-gray-300 transition-colors cursor-pointer bg-white">
                            <div className="flex items-center gap-4">
                                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
                                    <div className="flex">
                                        <div className="w-4 h-4 rounded-full bg-red-500/80 -mr-1.5 mix-blend-multiply"></div>
                                        <div className="w-4 h-4 rounded-full bg-yellow-500/80 mix-blend-multiply"></div>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sm text-gray-900">Jonathan Holmes</h3>
                                    <p className="text-xs text-gray-500 font-mono mt-0.5">6684 •••• •••• 6987</p>
                                </div>
                            </div>
                            <div className="w-5 h-5 rounded-full border border-gray-300 bg-gray-50"></div>
                        </div>
                    </div>

                    {/* Add New Card */}
                    <div className="space-y-3">
                        <h2 className="text-sm font-semibold text-black">Add new card:</h2>
                        <div className="border border-gray-200 rounded-xl p-4 flex items-center gap-4 hover:border-black transition-colors cursor-pointer bg-white group">
                            <div className="p-1">
                                <CreditCard className="w-6 h-6 text-black" strokeWidth={1.5} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-sm text-black group-hover:underline">Add new card</h3>
                                <p className="text-xs text-gray-500 mt-0.5">Add new Master, Visa or Visa Electron.</p>
                            </div>
                        </div>
                    </div>

                    {/* My Refunds Section */}
                    <div className="pt-2">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold">My Refunds</h2>
                        </div>
                        <div className="space-y-3">
                            {refundTickets.map((ticket) => (
                                <div key={ticket.id} className="border border-gray-100 rounded-xl p-4 space-y-3 shadow-sm bg-white hover:border-gray-200 transition-colors cursor-pointer">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-mono font-medium">{ticket.id}</span>
                                            <h3 className="font-semibold text-sm mt-1">{ticket.provider}</h3>
                                        </div>
                                        <span className={`text-[10px] font-bold px-2 py-1 rounded-full border ${ticket.statusColor}`}>
                                            {ticket.status}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] px-2 py-1 rounded-full bg-gray-50 border border-gray-100 text-gray-600 whitespace-nowrap">
                                            {ticket.category}
                                        </span>
                                        <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-1 rounded-full border border-blue-100 whitespace-nowrap">
                                            {ticket.service}
                                        </span>
                                    </div>

                                    <div className="border-t border-gray-50 pt-2 mt-2 flex justify-between items-center text-xs text-gray-500">
                                        <span>Filed: {ticket.date}</span>
                                        <ChevronRight className="w-4 h-4 text-gray-400" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Transaction History Link */}
                    <div className="text-center pt-6 pb-2">
                        <button className="text-sm font-semibold underline underline-offset-4 decoration-2 hover:text-gray-600 transition-colors">
                            Transaction History
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
