import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { ArrowLeft, MapPin, Phone, ExternalLink, Shield, PlusCircle, Bus, HeartPulse } from "lucide-react";

export default function NearbyServicesPage() {
  const [filter, setFilter] = useState<"all" | "police" | "hospital" | "transit">("all");

  const services = [
    { type: "police", name: "Central Police Station", address: "Parliament Street, New Delhi", phone: "011-23361100", distance: "0.8 km" },
    { type: "hospital", name: "City Care Super Specialty Hospital", address: "Barakhamba Road, New Delhi", phone: "011-43555555", distance: "1.2 km" },
    { type: "police", name: "Women Police Help Desk", address: "Connaught Place Sector 4", phone: "1091", distance: "0.5 km" },
    { type: "hospital", name: "Apex Trauma & Emergency Center", address: "Janpath, New Delhi", phone: "102", distance: "1.6 km" },
    { type: "transit", name: "Central Metro & Bus Interchange", address: "Rajiv Chowk, Gate 4", phone: "011-155370", distance: "0.3 km" },
    { type: "hospital", name: "All India Institute of Medical Sciences", address: "Ansari Nagar, New Delhi", phone: "011-26588500", distance: "3.5 km" },
    { type: "police", name: "PCR Mobile Van Unit 12", address: "Patrolling Outer Circle", phone: "112", distance: "0.2 km" },
  ];

  const filtered = services.filter((s) => (filter === "all" ? true : s.type === filter));

  return (
    <>
      <Head>
        <title>Nearby Emergency Services | SafeHer</title>
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
              <div className="w-12 h-12 rounded-2xl bg-green-500/10 text-green-600 flex items-center justify-center">
                <MapPin size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-neutral-800">Nearby Emergency Services</h1>
                <p className="text-xs text-neutral-500">Fast access to verified police booths, hospitals and transit points</p>
              </div>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap gap-2 mb-6">
              {[
                { id: "all", label: "All Services" },
                { id: "police", label: "Police Stations" },
                { id: "hospital", label: "Hospitals" },
                { id: "transit", label: "Safe Transit" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    filter === tab.id
                      ? "bg-green-600 text-white shadow-sm"
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Cards */}
            <div className="space-y-3">
              {filtered.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-neutral-50 hover:bg-green-50/50 border border-neutral-100 hover:border-green-200 rounded-2xl transition-all gap-4"
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-green-600 flex-shrink-0 mt-0.5">
                      {item.type === "police" && <Shield size={18} />}
                      {item.type === "hospital" && <HeartPulse size={18} />}
                      {item.type === "transit" && <Bus size={18} />}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-neutral-800">{item.name}</h3>
                      <p className="text-xs text-neutral-500">{item.address}</p>
                      <span className="inline-block mt-1 text-[11px] font-semibold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                        {item.distance} away
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <a
                      href={`tel:${item.phone}`}
                      className="flex-1 sm:flex-none flex items-center justify-center space-x-1.5 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold rounded-xl shadow-sm transition-all"
                    >
                      <Phone size={13} />
                      <span>Call {item.phone}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
