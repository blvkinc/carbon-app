import { useNavigate } from "react-router-dom";
import {
    Sun, Bell, Wallet as WalletIcon, ChevronRight, Crown,
    Box, BarChart2, MessageSquare, Shield, Headset,
    HelpCircle, FileText, LogOut, Home, Clock, Heart, User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function Profile() {
    const navigate = useNavigate();

    return (
        <div className="min-h-[100dvh] w-full bg-[#FAFAFA] text-black font-sans pb-20 relative">
            <div className="mx-auto max-w-md flex flex-col bg-white min-h-[100dvh]">

                {/* Header Actions */}
                <div className="flex justify-end items-center px-4 py-4 gap-4">
                    <button className="p-1"><Sun className="w-6 h-6" /></button>
                    <button className="p-1 relative">
                        <Bell className="w-6 h-6" />
                        <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>
                </div>

                {/* Main Content scrollable */}
                <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-6">

                    {/* User Info */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="relative border-4 border-[#FAFAFA] rounded-full shadow-sm">
                                <img
                                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=128&auto=format&fit=crop"
                                    alt="Profile"
                                    className="w-16 h-16 rounded-full object-cover"
                                />
                                <div className="absolute bottom-0 right-0 bg-black rounded-full p-1 border-2 border-white">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-white"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                                </div>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold">Demilo Angel</h1>
                                <p className="text-sm text-gray-500">Silver tier</p>
                                <p className="text-xs text-gray-400 mt-0.5">Joined in March 2023</p>
                            </div>
                        </div>
                        <button className="text-xs font-bold text-black hover:underline px-2 py-1">
                            Edit Profile
                        </button>
                    </div>

                    {/* Wallet Card */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                        <div className="flex justify-between items-center mb-3">
                            <div className="flex items-center gap-2 text-gray-600">
                                <WalletIcon className="w-4 h-4" />
                                <span className="text-xs font-medium">Wallet Balance</span>
                            </div>
                            <button className="text-xs text-gray-500 hover:text-black transition-colors"
                                onClick={() => navigate("/wallet")}
                            >
                                Transaction History
                            </button>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-xl font-bold">AED 4,000</span>
                            <Button
                                className="h-8 bg-black text-white hover:bg-gray-800 rounded-lg px-4 text-xs font-semibold"
                                onClick={() => navigate("/wallet")}
                            >
                                Top Up
                            </Button>
                        </div>
                    </div>

                    {/* Tier Card */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 relative overflow-hidden">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                                    <Crown className="w-6 h-6 text-[#D4A017] fill-[#D4A017]" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-base">Silver Tier</h3>
                                    <p className="text-xs text-gray-500">5000pts accumulated</p>
                                </div>
                            </div>
                            <button className="p-1"><ChevronRight className="w-5 h-5 text-black" /></button>
                        </div>

                        <div className="space-y-1 mt-4">
                            <div className="flex justify-between text-xs font-medium mb-1.5">
                                <span>230pt to Gold tier</span>
                                <span className="text-gray-500">3000pts</span>
                            </div>
                            <Progress value={25} className="h-1.5 bg-gray-100 [&>div]:bg-[#D4A017]" />
                            <p className="text-xs mt-2 text-gray-600">
                                <span className="text-[#D4A017] font-semibold">97pts</span> are available to be used for discounts
                            </p>
                        </div>
                    </div>

                    {/* My Schedule */}
                    <div>
                        <div className="flex justify-between items-center mb-3">
                            <h2 className="text-lg font-bold">My Schedule</h2>
                            <button className="text-xs font-bold text-black hover:underline underline-offset-2">See All</button>
                        </div>

                        <div className="flex gap-3 overflow-x-auto pb-4 snap-x hide-scrollbar">
                            {[1, 2].map((i) => (
                                <div key={i} className="min-w-[260px] bg-white rounded-2xl border border-gray-100 shadow-sm p-3 snap-center">
                                    <div className="flex justify-between items-start mb-2">
                                        <img
                                            src="https://images.unsplash.com/photo-1549476464-37392f717541?q=80&w=64&auto=format&fit=crop"
                                            alt="Session"
                                            className="w-10 h-10 rounded-lg object-cover"
                                        />
                                        <span className="text-[10px] font-bold text-[#8B5CF6] bg-[#F3E8FF] px-2 py-1 rounded-md">
                                            PT Session
                                        </span>
                                    </div>
                                    <h3 className="font-semibold text-sm mb-1">Mixed Martial art</h3>
                                    <p className="text-xs text-gray-500 mb-2">Al Quoz Industrial Area</p>
                                    <div className="text-[11px] text-gray-500 flex items-center gap-1.5">
                                        Boxing <span className="w-1 h-1 rounded-full bg-gray-300"></span> 2nd Sept, 2024 <span className="w-1 h-1 rounded-full bg-gray-300"></span> 2:45am
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Links List */}
                    <div className="space-y-1">
                        {[
                            { icon: Box, label: "My Inventory" },
                            { icon: BarChart2, label: "Statistics" },
                            { icon: MessageSquare, label: "Reviews" },
                            { icon: Shield, label: "Refer a Friend" },
                            { icon: Headset, label: "Support" },
                            { icon: HelpCircle, label: "FAQs" },
                        ].map((item, idx) => (
                            <button key={idx} className="w-full flex items-center justify-between py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors px-2 rounded-lg">
                                <div className="flex items-center gap-4">
                                    <item.icon className="w-5 h-5 text-gray-700 stroke-[1.5]" />
                                    <span className="font-semibold text-sm">{item.label}</span>
                                </div>
                                <ChevronRight className="w-5 h-5 text-gray-400" />
                            </button>
                        ))}
                    </div>

                    <div className="h-px w-full bg-gray-100 my-2"></div>

                    <div className="space-y-1">
                        <button className="w-full flex items-center justify-between py-4 hover:bg-gray-50 transition-colors px-2 rounded-lg">
                            <div className="flex items-center gap-4">
                                <FileText className="w-5 h-5 text-gray-700 stroke-[1.5]" />
                                <span className="font-semibold text-sm">Terms & Condition</span>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                        </button>
                        <button className="w-full flex items-center justify-between py-4 hover:bg-red-50 transition-colors px-2 rounded-lg">
                            <div className="flex items-center gap-4">
                                <LogOut className="w-5 h-5 text-red-500 stroke-[1.5]" />
                                <span className="font-semibold text-sm text-red-500">Logout</span>
                            </div>
                        </button>
                    </div>

                </div>

                {/* Bottom Navigation */}
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 pb-safe z-50">
                    <div className="max-w-md mx-auto flex justify-between items-end">
                        <button className="flex flex-col items-center gap-1 p-2 text-gray-400 hover:text-black transition-colors" onClick={() => navigate("/")}>
                            <Home className="w-6 h-6 stroke-[1.5]" />
                        </button>
                        <button className="flex flex-col items-center gap-1 p-2 text-gray-400 hover:text-black transition-colors">
                            <Clock className="w-6 h-6 stroke-[1.5]" />
                        </button>
                        <button className="flex flex-col items-center gap-1 p-2 text-gray-400 hover:text-black transition-colors">
                            <Heart className="w-6 h-6 stroke-[1.5]" />
                        </button>
                        <button className="flex flex-col items-center gap-1 p-2 text-black" onClick={() => navigate("/profile")}>
                            <div className="w-6 h-6 rounded-full overflow-hidden border border-black p-0.5">
                                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=32&auto=format&fit=crop" alt="User" className="w-full h-full rounded-full object-cover" />
                            </div>
                            <span className="text-[10px] font-bold mt-1">Profile</span>
                        </button>
                    </div>
                </div>

            </div>

            <style>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
}
