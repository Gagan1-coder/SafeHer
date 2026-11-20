import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { ArrowLeft, Video, Phone, PhoneOff, PhoneCall, User, ShieldCheck } from "lucide-react";

export default function FakeCallerPage() {
  const [callerName, setCallerName] = useState("Dad");
  const [callerNumber, setCallerNumber] = useState("+91 98765 43210");
  const [delay, setDelay] = useState(5);
  const [isCalling, setIsCalling] = useState(false);
  const [callActive, setCallActive] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [countdown, setCountdown] = useState<number | null>(null);

  const startFakeCall = () => {
    if (delay === 0) {
      setIsCalling(true);
    } else {
      setCountdown(delay);
    }
  };

  useEffect(() => {
    let t: NodeJS.Timeout;
    if (countdown !== null && countdown > 0) {
      t = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      setCountdown(null);
      setIsCalling(true);
    }
    return () => clearTimeout(t);
  }, [countdown]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (callActive) {
      timer = setInterval(() => setCallDuration((d) => d + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [callActive]);

  const handleAccept = () => {
    setIsCalling(false);
    setCallActive(true);
    setCallDuration(0);
  };

  const handleDecline = () => {
    setIsCalling(false);
    setCallActive(false);
    setCountdown(null);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <Head>
        <title>Fake Caller | SafeHer</title>
      </Head>

      {/* Full screen simulated incoming call */}
      {isCalling && (
        <div className="fixed inset-0 bg-neutral-900 z-50 flex flex-col justify-between p-8 text-white animate-fade-in">
          <div className="text-center mt-12 space-y-4">
            <div className="w-24 h-24 bg-neutral-700 rounded-full flex items-center justify-center mx-auto text-neutral-300">
              <User size={48} />
            </div>
            <div>
              <h2 className="text-3xl font-bold">{callerName}</h2>
              <p className="text-sm text-neutral-400">{callerNumber}</p>
            </div>
            <p className="text-xs uppercase tracking-widest text-primary animate-pulse font-semibold">
              Incoming Call...
            </p>
          </div>

          <div className="flex justify-around items-center mb-16 max-w-sm mx-auto w-full">
            <button
              onClick={handleDecline}
              className="flex flex-col items-center space-y-2 group"
            >
              <div className="w-18 h-18 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <PhoneOff size={28} />
              </div>
              <span className="text-xs text-neutral-300">Decline</span>
            </button>

            <button
              onClick={handleAccept}
              className="flex flex-col items-center space-y-2 group"
            >
              <div className="w-18 h-18 bg-green-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform animate-bounce">
                <PhoneCall size={28} />
              </div>
              <span className="text-xs text-neutral-300">Accept</span>
            </button>
          </div>
        </div>
      )}

      {/* Active Call In-Progress Screen */}
      {callActive && (
        <div className="fixed inset-0 bg-neutral-900 z-50 flex flex-col justify-between p-8 text-white">
          <div className="text-center mt-16 space-y-3">
            <div className="w-20 h-20 bg-neutral-800 rounded-full flex items-center justify-center mx-auto">
              <User size={40} className="text-primary" />
            </div>
            <h2 className="text-2xl font-bold">{callerName}</h2>
            <p className="text-xs text-neutral-400">{callerNumber}</p>
            <p className="text-sm font-mono text-green-400 font-semibold">{formatTime(callDuration)}</p>
          </div>

          <div className="text-center my-8 bg-neutral-800/60 p-4 rounded-2xl max-w-sm mx-auto">
            <p className="text-xs text-neutral-300 italic">
              &quot;Hey, where are you right now? I am waiting for you just outside the corner. Let me know when you reach.&quot;
            </p>
          </div>

          <div className="flex justify-center mb-16">
            <button
              onClick={handleDecline}
              className="w-16 h-16 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center shadow-xl transition-all"
            >
              <PhoneOff size={26} />
            </button>
          </div>
        </div>
      )}

      {/* Settings / Trigger page */}
      <div className="min-h-screen bg-gradient-to-br from-[#FD6978]/5 via-[#F7F4F1] to-[#FD6978]/10 p-4 sm:p-8">
        <div className="max-w-xl mx-auto">
          <Link
            href="/dashboard"
            className="inline-flex items-center space-x-2 text-sm text-neutral-600 hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft size={18} />
            <span>Back to Dashboard</span>
          </Link>

          <div className="bg-white rounded-3xl shadow-xl border border-neutral-100 p-6 sm:p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-600 flex items-center justify-center">
                <Video size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-neutral-800">Fake Caller</h1>
                <p className="text-xs text-neutral-500">Discreetly simulate an urgent incoming call to exit awkward or unsafe situations</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Caller Name</label>
                <input
                  type="text"
                  value={callerName}
                  onChange={(e) => setCallerName(e.target.value)}
                  placeholder="e.g. Dad, Mom, Boss, Police"
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Caller Number</label>
                <input
                  type="text"
                  value={callerNumber}
                  onChange={(e) => setCallerNumber(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Trigger Delay</label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { label: "Instant", val: 0 },
                    { label: "5 sec", val: 5 },
                    { label: "15 sec", val: 15 },
                    { label: "30 sec", val: 30 },
                  ].map((d) => (
                    <button
                      key={d.val}
                      type="button"
                      onClick={() => setDelay(d.val)}
                      className={`py-2 rounded-xl text-xs font-semibold transition-all ${
                        delay === d.val
                          ? "bg-orange-500 text-white shadow-sm"
                          : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {countdown !== null ? (
              <div className="text-center py-4 bg-orange-50 rounded-2xl border border-orange-200">
                <p className="text-sm font-semibold text-orange-800">
                  Call arriving in <span className="text-xl font-black">{countdown}</span> seconds...
                </p>
                <button
                  onClick={() => setCountdown(null)}
                  className="text-xs text-orange-600 underline font-semibold mt-1"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={startFakeCall}
                className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm rounded-xl shadow-lg transition-all"
              >
                Trigger Fake Call Now
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
