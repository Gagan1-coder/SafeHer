import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { ArrowLeft, Phone, Search, ShieldAlert, HeartHandshake, PhoneCall } from "lucide-react";

export default function HelplinesPage() {
  const [search, setSearch] = useState("");

  const helplines = [
    { title: "National Emergency Helpline", number: "112", desc: "All-in-one emergency service for Police, Fire & Medical.", category: "Emergency", badge: "24x7 Active" },
    { title: "Women Helpline (All India)", number: "1091", desc: "Immediate police intervention and rescue for women in distress.", category: "Women Safety", badge: "Toll Free" },
    { title: "Domestic Violence & Women in Distress", number: "181", desc: "Counseling, legal aid and emergency shelter assistance.", category: "Support", badge: "Government" },
    { title: "National Commission for Women (NCW)", number: "7827170170", desc: "24x7 WhatsApp and calling helpline for women facing violence.", category: "Legal Aid", badge: "National" },
    { title: "Cyber Crime Helpline", number: "1930", desc: "Report online harassment, stalkers, fake profiles & cyber threats.", category: "Cyber Safety", badge: "Specialized" },
    { title: "Medical Emergency / Ambulance", number: "108", desc: "Free state emergency ambulance and first responder transport.", category: "Medical", badge: "Ambulance" },
    { title: "Child Helpline", number: "1098", desc: "Protection and rescue helpline for minors and young girls.", category: "Youth", badge: "24x7" },
    { title: "Mental Health & Counseling (KIRAN)", number: "1800-599-0019", desc: "Free mental health support and psychological first aid.", category: "Counseling", badge: "Toll Free" }
  ];

  const filtered = helplines.filter(
    (h) => h.title.toLowerCase().includes(search.toLowerCase()) || h.number.includes(search) || h.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Head>
        <title>Emergency Helplines Directory | SafeHer</title>
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
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
                <Phone size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-neutral-800">Helpline Directory</h1>
                <p className="text-xs text-neutral-500">Official, verified national helplines for immediate rescue and support</p>
              </div>
            </div>

            {/* Search Input */}
            <div className="relative mb-6">
              <Search size={18} className="absolute left-3.5 top-3.5 text-neutral-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, number or category (e.g. 112, Police, Cyber)..."
                className="w-full pl-10 pr-4 py-3 text-sm rounded-2xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-500"
              />
            </div>

            {/* List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filtered.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-neutral-50 hover:bg-purple-50/50 border border-neutral-100 hover:border-purple-200 rounded-2xl transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-purple-600 bg-purple-100 px-2.5 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                      <span className="text-xs text-neutral-400">{item.category}</span>
                    </div>
                    <h3 className="text-sm font-bold text-neutral-800 mb-1">{item.title}</h3>
                    <p className="text-xs text-neutral-500 line-clamp-2 mb-4">{item.desc}</p>
                  </div>

                  <a
                    href={`tel:${item.number}`}
                    className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
                  >
                    <PhoneCall size={14} />
                    <span>Call {item.number}</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
