import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  MapPin, Phone, Shield, Bell, Video, AlertTriangle,
  LogOut, User, Navigation, Mic, Camera, Heart
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string; phone?: string } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("safeher_user");
    if (!stored) {
      router.replace("/login");
      return;
    }
    setUser(JSON.parse(stored));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("safeher_user");
    router.replace("/login");
  };

  if (!user) return null;

  const features = [
    { icon: <AlertTriangle size={22} />, title: "SOS Alert", desc: "Send emergency alert to trusted contacts", color: "bg-red-500", href: "/features/sos" },
    { icon: <Navigation size={22} />, title: "Safe Route", desc: "Find the safest path to your destination", color: "bg-blue-500", href: "/features/safe-route" },
    { icon: <MapPin size={22} />, title: "Nearby Services", desc: "Locate police stations & hospitals", color: "bg-green-500", href: "/features/nearby" },
    { icon: <Phone size={22} />, title: "Helplines", desc: "Emergency helpline numbers directory", color: "bg-purple-500", href: "/features/helplines" },
    { icon: <Video size={22} />, title: "Fake Caller", desc: "Trigger a fake incoming call", color: "bg-orange-500", href: "/features/fake-caller" },
    { icon: <Mic size={22} />, title: "Audio Record", desc: "Record audio evidence discreetly", color: "bg-teal-500", href: "/features/recorder" },
    { icon: <Camera size={22} />, title: "Video Record", desc: "Capture video with SOS alerts", color: "bg-indigo-500", href: "/features/recorder" },
    { icon: <Shield size={22} />, title: "Safety Zones", desc: "Report & view safe/unsafe areas", color: "bg-pink-500", href: "/features/safety-zones" },
    { icon: <Bell size={22} />, title: "Safety Check", desc: "Regular safety assurance mode", color: "bg-yellow-500", href: "/features/safety-check" },
  ];

  return (
    <>
      <Head>
        <title>Dashboard | SafeHer</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-[#FD6978]/5 via-[#F7F4F1] to-[#FD6978]/10">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-neutral-100 sticky top-0 z-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Image src="/logo.svg" alt="SafeHer" width={36} height={36} />
              <span className="text-xl font-bold text-primary">SafeHer</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full">
                <Heart size={14} />
                <span>Protected</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <User size={16} className="text-primary" />
                </div>
                <span className="hidden sm:inline text-sm font-medium text-neutral-700">{user.name || user.email}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 text-xs font-medium text-neutral-500 hover:text-red-500 transition-colors px-3 py-2 rounded-lg hover:bg-red-50"
              >
                <LogOut size={14} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* Welcome Section */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-4">
          <div className="bg-gradient-to-r from-primary to-[#e05564] rounded-2xl p-6 sm:p-8 text-white shadow-lg">
            <h1 className="text-2xl sm:text-3xl font-bold">
              Hello, {user.name || "User"} 👋
            </h1>
            <p className="mt-2 text-white/80 text-sm sm:text-base">
              Welcome to SafeHer — Your Ultimate Safety Companion. Stay safe and confident.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl text-xs font-medium">
                📧 {user.email}
              </div>
              {user.phone && (
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl text-xs font-medium">
                  📱 {user.phone}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SOS Button */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-center">
          <button
            onClick={() => router.push("/features/sos")}
            className="group relative w-32 h-32 rounded-full bg-red-500 hover:bg-red-600 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col items-center justify-center text-white active:scale-95 cursor-pointer"
          >
            <div className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-20"></div>
            <AlertTriangle size={32} className="relative z-10" />
            <span className="relative z-10 text-sm font-bold mt-1">SOS</span>
          </button>
        </div>
        <p className="text-center text-xs text-neutral-500 mb-6">Press in case of emergency</p>

        {/* Feature Grid */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-12">
          <h2 className="text-lg font-bold text-neutral-800 mb-4">Safety Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <button
                key={i}
                onClick={() => router.push(f.href)}
                className="flex items-start space-x-4 p-4 bg-white rounded-2xl shadow-sm border border-neutral-100 hover:shadow-md hover:border-primary/30 transition-all text-left group cursor-pointer"
              >
                <div className={`${f.color} w-11 h-11 rounded-xl flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform`}>
                  {f.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-800 text-sm">{f.title}</h3>
                  <p className="text-xs text-neutral-500 mt-0.5">{f.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
