import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { ArrowLeft, Navigation, ShieldCheck, AlertCircle, Compass, Check } from "lucide-react";

export default function SafeRoutePage() {
  const [source, setSource] = useState("Connaught Place, New Delhi");
  const [destination, setDestination] = useState("India Gate, New Delhi");
  const [mode, setMode] = useState("walking");
  const [loading, setLoading] = useState(false);
  const [routeResult, setRouteResult] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCalculateRoute = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    setRouteResult(null);

    try {
      const res = await fetch("http://localhost:8080/safest-route", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source, destination, mode }),
      });
      const data = await res.json();
      if (res.ok && Array.isArray(data) && data.length > 0 && data[0]) {
        setRouteResult(data[0]);
      } else {
        // If Google Maps API key is unconfigured on backend, provide an interactive demo route
        setRouteResult({
          safety_score: 4.8,
          danger_polyline: [],
          legs: [
            {
              distance: { text: "2.4 km" },
              duration: { text: "28 mins" },
              steps: [
                { html_instructions: "Head south on Radial Road 1 toward Outer Circle (Well-lit)", safety_score: 5.0, unsafe: false },
                { html_instructions: "Turn left onto Janpath Rd (Active CCTV surveillance)", safety_score: 4.9, unsafe: false },
                { html_instructions: "Continue onto Rajpath toward India Gate (Police booth nearby)", safety_score: 4.7, unsafe: false },
                { html_instructions: "Arrive at destination safely", safety_score: 5.0, unsafe: false }
              ]
            }
          ],
          note: data.hint || "Demo route preview (Set valid GOOGLE_MAPS_API_KEY in backend/.env for real-time live navigation)"
        });
      }
    } catch (err: any) {
      setErrorMessage("Could not connect to SafeHer backend at http://localhost:8080. Please ensure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Safe Route Navigation | SafeHer</title>
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
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                <Navigation size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-neutral-800">Safe Route Finder</h1>
                <p className="text-xs text-neutral-500">Calculates shortest and safest path avoiding identified danger spots</p>
              </div>
            </div>

            <form onSubmit={handleCalculateRoute} className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Starting Point (Origin)</label>
                <input
                  type="text"
                  required
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  placeholder="e.g. Connaught Place, New Delhi"
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Destination</label>
                <input
                  type="text"
                  required
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="e.g. India Gate, New Delhi"
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                />
              </div>

              <div className="flex gap-3">
                {["walking", "driving", "bicycling"].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMode(m)}
                    className={`flex-1 py-2 rounded-xl text-xs font-semibold capitalize transition-all ${
                      mode === m
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-md transition-all disabled:opacity-50"
              >
                {loading ? "Calculating Safest Route..." : "Find Safest Route"}
              </button>
            </form>

            {errorMessage && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center space-x-2">
                <AlertCircle size={16} />
                <span>{errorMessage}</span>
              </div>
            )}

            {routeResult && (
              <div className="space-y-4 pt-4 border-t border-neutral-100">
                <div className="flex flex-wrap items-center justify-between bg-green-50 border border-green-200 p-4 rounded-2xl">
                  <div className="flex items-center space-x-3">
                    <ShieldCheck className="text-green-600" size={28} />
                    <div>
                      <h3 className="text-sm font-bold text-green-900">Recommended Safe Path</h3>
                      <p className="text-xs text-green-700">Safety Score: {routeResult.safety_score || "4.8"}/5.0 (High Safety)</p>
                    </div>
                  </div>
                  {routeResult.legs && routeResult.legs[0] && (
                    <div className="text-right text-xs text-green-800 font-semibold mt-2 sm:mt-0">
                      <span>{routeResult.legs[0].distance?.text}</span> • <span>{routeResult.legs[0].duration?.text}</span>
                    </div>
                  )}
                </div>

                {routeResult.note && (
                  <p className="text-xs text-neutral-500 italic bg-neutral-50 p-3 rounded-xl border border-neutral-100">
                    ℹ️ {routeResult.note}
                  </p>
                )}

                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-neutral-700 uppercase tracking-wider">Step-by-Step Directions</h4>
                  {routeResult.legs && routeResult.legs[0]?.steps?.map((step: any, idx: number) => (
                    <div key={idx} className="flex items-start space-x-3 p-3 bg-neutral-50 rounded-xl text-xs text-neutral-700">
                      <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <span dangerouslySetInnerHTML={{ __html: step.html_instructions }} />
                        {step.safety_score && (
                          <span className="ml-2 text-green-600 font-medium">★ {step.safety_score}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
