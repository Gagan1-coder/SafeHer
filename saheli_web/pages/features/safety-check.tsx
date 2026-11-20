import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { ArrowLeft, Bell, ShieldCheck, CheckCircle2, Clock, AlertTriangle } from "lucide-react";

export default function SafetyCheckPage() {
  const [enabled, setEnabled] = useState(false);
  const [intervalMins, setIntervalMins] = useState(15);
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [alertPending, setAlertPending] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (enabled && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((t) => t - 1);
      }, 1000);
    } else if (enabled && timeLeft === 0) {
      setAlertPending(true);
    }
    return () => clearInterval(timer);
  }, [enabled, timeLeft]);

  const handleToggle = () => {
    if (!enabled) {
      setTimeLeft(intervalMins * 60);
      setEnabled(true);
      setAlertPending(false);
    } else {
      setEnabled(false);
      setAlertPending(false);
    }
  };

  const handleCheckIn = () => {
    setTimeLeft(intervalMins * 60);
    setAlertPending(false);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <Head>
        <title>Safety Check Assurance | SafeHer</title>
      </Head>
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
              <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 text-yellow-600 flex items-center justify-center">
                <Bell size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-neutral-800">Safety Check Assurance</h1>
                <p className="text-xs text-neutral-500">Periodic safety check-in timer during late travel</p>
              </div>
            </div>

            {alertPending ? (
              <div className="p-6 bg-red-50 border border-red-300 rounded-2xl text-center space-y-4 mb-6">
                <AlertTriangle size={36} className="text-red-500 mx-auto" />
                <h3 className="text-base font-bold text-red-800">Check-in Overdue!</h3>
                <p className="text-xs text-red-600">
                  Please confirm you are safe. If no response in 60 seconds, an SOS alert will be sent to your emergency contacts.
                </p>
                <button
                  onClick={handleCheckIn}
                  className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold text-sm rounded-xl shadow-lg transition-all"
                >
                  I Am Safe (Check In Now)
                </button>
              </div>
            ) : enabled ? (
              <div className="p-6 bg-yellow-50/60 border border-yellow-200 rounded-2xl text-center space-y-4 mb-6">
                <div className="flex items-center justify-center space-x-2 text-yellow-700">
                  <Clock size={16} />
                  <span className="text-xs font-semibold uppercase tracking-wider">Next Check-In Due In</span>
                </div>
                <div className="text-5xl font-mono font-black text-neutral-800">{formatTime(timeLeft)}</div>
                <button
                  onClick={handleCheckIn}
                  className="w-full py-2.5 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold text-xs rounded-xl shadow-sm transition-all"
                >
                  Check In Now (Reset Timer)
                </button>
              </div>
            ) : null}

            {/* Settings */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-2">Check-in Interval</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: "15 Mins", val: 15 },
                    { label: "30 Mins", val: 30 },
                    { label: "60 Mins", val: 60 },
                  ].map((inv) => (
                    <button
                      key={inv.val}
                      type="button"
                      disabled={enabled}
                      onClick={() => { setIntervalMins(inv.val); setTimeLeft(inv.val * 60); }}
                      className={`py-2 rounded-xl text-xs font-semibold transition-all ${
                        intervalMins === inv.val
                          ? "bg-yellow-500 text-white shadow-sm"
                          : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 disabled:opacity-50"
                      }`}
                    >
                      {inv.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleToggle}
              className={`w-full py-3.5 rounded-xl font-bold text-sm shadow-md transition-all ${
                enabled
                  ? "bg-neutral-800 hover:bg-neutral-900 text-white"
                  : "bg-yellow-500 hover:bg-yellow-600 text-white"
              }`}
            >
              {enabled ? "Deactivate Safety Check" : "Activate Safety Check Timer"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
