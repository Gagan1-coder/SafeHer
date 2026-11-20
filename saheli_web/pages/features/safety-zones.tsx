import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { ArrowLeft, Shield, MapPin, AlertTriangle, Plus, CheckCircle } from "lucide-react";

export default function SafetyZonesPage() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [locationName, setLocationName] = useState("");
  const [type, setType] = useState<"safe" | "unsafe">("unsafe");
  const [details, setDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [zones, setZones] = useState([
    { name: "Metro Gate No. 2 Exit", type: "safe", desc: "Well-lit area, active CCTV coverage and police booth present 24/7.", verified: true },
    { name: "Outer Ring Service Lane", type: "unsafe", desc: "Poor street lighting after 9 PM, low pedestrian traffic.", verified: true },
    { name: "City Center Market Complex", type: "safe", desc: "High footfall, security guards stationed at every exit point.", verified: true },
    { name: "Old Underpass Road", type: "unsafe", desc: "Frequent harassment reports, recommend taking main overbridge instead.", verified: true },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!locationName || !details) return;
    setZones([{ name: locationName, type, desc: details, verified: false }, ...zones]);
    setSubmitted(true);
    setLocationName("");
    setDetails("");
    setTimeout(() => {
      setSubmitted(false);
      setShowAddForm(false);
    }, 1500);
  };

  return (
    <>
      <Head>
        <title>Crowdsourced Safety Zones | SafeHer</title>
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-[#FD6978]/5 via-[#F7F4F1] to-[#FD6978]/10 p-4 sm:p-8">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/dashboard"
            className="inline-flex items-center space-x-2 text-sm text-neutral-600 hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft size={18} />
            <span>Back to Dashboard</span>
          </Link>

          <div className="bg-white rounded-3xl shadow-xl border border-neutral-100 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-2xl bg-pink-500/10 text-pink-600 flex items-center justify-center">
                  <Shield size={24} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-neutral-800">Safety Zones</h1>
                  <p className="text-xs text-neutral-500">Crowdsourced reports of safe areas and flagged unsafe locations</p>
                </div>
              </div>

              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 shadow-sm transition-all"
              >
                <Plus size={16} />
                <span>Report Location</span>
              </button>
            </div>

            {/* Add Report Form */}
            {showAddForm && (
              <form onSubmit={handleSubmit} className="mb-6 p-5 bg-pink-50/50 border border-pink-200 rounded-2xl space-y-3">
                <h3 className="text-sm font-bold text-neutral-800">Report a Location</h3>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">Location Name / Landmark</label>
                  <input
                    type="text"
                    required
                    value={locationName}
                    onChange={(e) => setLocationName(e.target.value)}
                    placeholder="e.g. Underpass near Sector 18"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">Safety Classification</label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setType("unsafe")}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-semibold ${
                        type === "unsafe" ? "bg-red-500 text-white" : "bg-neutral-200 text-neutral-700"
                      }`}
                    >
                      ⚠️ Unsafe / Poor Lighting
                    </button>
                    <button
                      type="button"
                      onClick={() => setType("safe")}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-semibold ${
                        type === "safe" ? "bg-green-600 text-white" : "bg-neutral-200 text-neutral-700"
                      }`}
                    >
                      🛡️ Safe / Well Guarded
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">Details &amp; Reason</label>
                  <textarea
                    required
                    rows={2}
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="Provide context (lighting, guards, police presence, etc.)"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
                  />
                </div>
                {submitted ? (
                  <div className="flex items-center space-x-2 text-xs text-green-700 font-bold">
                    <CheckCircle size={16} />
                    <span>Report submitted for community review!</span>
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="w-full py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-xl text-xs font-bold transition-all"
                  >
                    Submit Report
                  </button>
                )}
              </form>
            )}

            {/* List */}
            <div className="space-y-3">
              {zones.map((zone, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border transition-all ${
                    zone.type === "safe"
                      ? "bg-green-50/40 border-green-200"
                      : "bg-red-50/40 border-red-200"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      <MapPin size={16} className={zone.type === "safe" ? "text-green-600" : "text-red-500"} />
                      <h3 className="text-sm font-bold text-neutral-800">{zone.name}</h3>
                    </div>
                    <span
                      className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                        zone.type === "safe" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}
                    >
                      {zone.type === "safe" ? "Verified Safe" : "Caution: Unsafe"}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-600 pl-6">{zone.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
