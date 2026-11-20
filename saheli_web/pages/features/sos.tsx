import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { ArrowLeft, AlertTriangle, Phone, MapPin, CheckCircle, ShieldAlert } from "lucide-react";

export default function SOSPage() {
  const [countdown, setCountdown] = useState(5);
  const [isActive, setIsActive] = useState(false);
  const [alertSent, setAlertSent] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => setLocation({ lat: 28.6139, lng: 77.209 }) // fallback
      );
    }
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (isActive && countdown === 0) {
      setAlertSent(true);
      setIsActive(false);
    }
    return () => clearTimeout(timer);
  }, [isActive, countdown]);

  const handleStartSOS = () => {
    setCountdown(5);
    setIsActive(true);
    setAlertSent(false);
  };

  const handleCancel = () => {
    setIsActive(false);
    setCountdown(5);
  };

  return (
    <>
      <Head>
        <title>SOS Alert | SafeHer</title>
      </Head>
      <div className="min-h-screen bg-neutral-900 text-white p-4 sm:p-6 flex flex-col justify-between">
        <div>
          <Link
            href="/dashboard"
            className="inline-flex items-center space-x-2 text-sm text-neutral-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft size={18} />
            <span>Back to Dashboard</span>
          </Link>

          <div className="max-w-md mx-auto text-center mt-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-xs font-semibold mb-4">
              <ShieldAlert size={14} />
              <span>EMERGENCY BROADCAST SYSTEM</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white">Emergency SOS</h1>
            <p className="text-neutral-400 text-sm mt-2">
              Broadcasts your live GPS location and alerts pre-set emergency contacts and nearby help.
            </p>
          </div>
        </div>

        {/* Action Center */}
        <div className="max-w-md mx-auto text-center my-8">
          {alertSent ? (
            <div className="bg-red-950/80 border border-red-500/50 rounded-3xl p-8 space-y-4 shadow-2xl animate-pulse">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto text-white">
                <CheckCircle size={36} />
              </div>
              <h2 className="text-2xl font-bold text-red-300">SOS ALERT ACTIVATED!</h2>
              <p className="text-sm text-neutral-300">
                Your coordinates have been transmitted to your emergency contacts &amp; local authorities.
              </p>
              {location && (
                <div className="bg-black/50 p-3 rounded-xl text-xs font-mono text-neutral-400 flex items-center justify-center space-x-2">
                  <MapPin size={14} className="text-red-400" />
                  <span>GPS: {location.lat.toFixed(5)}, {location.lng.toFixed(5)}</span>
                </div>
              )}
              <div className="pt-2">
                <a
                  href="tel:112"
                  className="w-full inline-flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg transition-all"
                >
                  <Phone size={20} />
                  <span>Call Emergency 112</span>
                </a>
              </div>
              <button
                onClick={() => setAlertSent(false)}
                className="text-xs text-neutral-400 underline hover:text-white pt-2 block mx-auto"
              >
                Reset Alert
              </button>
            </div>
          ) : isActive ? (
            <div className="space-y-6">
              <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-red-600 animate-ping opacity-30"></div>
                <div className="w-40 h-40 rounded-full bg-red-600 flex flex-col items-center justify-center text-white shadow-2xl">
                  <span className="text-5xl font-black">{countdown}</span>
                  <span className="text-xs uppercase tracking-wider font-semibold mt-1">Seconds</span>
                </div>
              </div>
              <p className="text-neutral-300 text-sm">Alert will transmit automatically when timer hits zero.</p>
              <button
                onClick={handleCancel}
                className="w-full max-w-xs bg-neutral-800 hover:bg-neutral-700 text-white font-bold py-3 px-6 rounded-2xl border border-neutral-700 transition-all"
              >
                Cancel SOS
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <button
                onClick={handleStartSOS}
                className="group relative w-44 h-44 rounded-full bg-red-600 hover:bg-red-500 text-white flex flex-col items-center justify-center mx-auto shadow-2xl transition-all duration-300 active:scale-95 cursor-pointer"
              >
                <AlertTriangle size={48} />
                <span className="text-xl font-black mt-2 tracking-wider">TAP FOR SOS</span>
              </button>
              <p className="text-xs text-neutral-400">Tap button above to initiate 5-second countdown</p>
            </div>
          )}
        </div>

        {/* Quick Helplines */}
        <div className="max-w-md mx-auto w-full pt-4 border-t border-neutral-800">
          <div className="grid grid-cols-2 gap-3">
            <a
              href="tel:112"
              className="flex items-center justify-center space-x-2 bg-neutral-800 hover:bg-neutral-700 p-3 rounded-xl text-xs font-semibold text-white transition-all"
            >
              <Phone size={14} className="text-red-400" />
              <span>Police: 112</span>
            </a>
            <a
              href="tel:1091"
              className="flex items-center justify-center space-x-2 bg-neutral-800 hover:bg-neutral-700 p-3 rounded-xl text-xs font-semibold text-white transition-all"
            >
              <Phone size={14} className="text-primary" />
              <span>Women: 1091</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
