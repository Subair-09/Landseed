/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Building2, MapPin, Globe, Instagram, Mail, Phone, Clock, Send, MessageSquare, Check, Sparkles, ChevronRight
} from "lucide-react";
import { ESTATES_DATA } from "../data";
import { Estate } from "../types";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [isSent, setIsSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [activeMapEstate, setActiveMapEstate] = useState<Estate>(ESTATES_DATA[4]); // default to Epe Marina

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      alert("Name, phone, and message are required parameters.");
      return;
    }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setIsSent(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    }, 1200);
  };

  const triggerWhatsAppSupport = () => {
    const text = "Hello LandSeeds Team, I would like to get in touch regarding available estate plots in Lagos State - Epe. Please connect me with an investment counselor.";
    window.open(`https://wa.me/2349000000000?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  };

  // Graphical vector representation layout coordinates for major Lagos State - Epe hubs
  const mapCoordinatesPinMap = [
    { id: "epe-phase-1", top: "42%", left: "48%", isPrimaryRegion: true },
    { id: "ketu-epe", top: "75%", left: "12%", isPrimaryRegion: true },
    { id: "itokin-epe", top: "48%", left: "32%", isPrimaryRegion: false },
    { id: "alaro-corridor", top: "68%", left: "45%", isPrimaryRegion: true },
    { id: "epe-marina", top: "82%", left: "38%", isPrimaryRegion: true },
    { id: "temu-epe", top: "25%", left: "62%", isPrimaryRegion: true }
  ];

  return (
    <section className="relative py-24 bg-black overflow-hidden" id="contact-section">
      {/* Background divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Ambient glassmorphic red glow bottom center */}
      <div className="absolute -bottom-64 left-1/3 w-[600px] h-[300px] bg-red-650/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Contact Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16">
          
          {/* LEFT COLUMN: CONTACT CHANNELS & FORM */}
          <div className="lg:col-span-6 space-y-10">
            
            <div className="space-y-4">
              <div className="text-red-500 font-mono text-xs uppercase tracking-wider">
                Elite Client Support
              </div>
              <h3 className="text-3xl sm:text-4.5xl font-extrabold font-display leading-tight text-white mb-2">
                Let’s Discuss Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-660 to-red-400">
                  Land Portfolio Goals
                </span>
              </h3>
              <p className="text-neutral-400 text-sm font-light">
                Secure investments start with a simple conversation. Connect with our dedicated sales counselors in Nigeria or diaspora liaison representatives.
              </p>
            </div>

            {/* Support Quick Icons List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-4">
              <div className="flex gap-3 bg-neutral-900/35 border border-white/5 rounded-xl p-4">
                <div className="p-2.5 rounded-lg bg-red-650/10 text-red-500 h-10 w-10 flex items-center justify-center">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-neutral-300 font-display uppercase tracking-wide">Corporate HQ</h5>
                  <p className="text-xs text-neutral-450 mt-1 select-all">
                    2, Iperu Akesan, Iyana - Ipaja, Lagos.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 bg-neutral-900/35 border border-white/5 rounded-xl p-4">
                <div className="p-2.5 rounded-lg bg-red-650/10 text-red-500 h-10 w-10 flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-neutral-300 font-display uppercase tracking-wide">Digital Desk</h5>
                  <div className="text-xs text-neutral-450 mt-1 space-y-0.5">
                    <p className="hover:text-white transition-colors cursor-pointer select-all">info@landseedsnigeria.com</p>
                    <p className="hover:text-white transition-colors cursor-pointer text-[11px] select-all">landseedsnigeria.com</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 bg-neutral-900/35 border border-white/5 rounded-xl p-4">
                <div className="p-2.5 rounded-lg bg-red-650/10 text-red-500 h-10 w-10 flex items-center justify-center">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-neutral-300 font-display uppercase tracking-wide">Social Connect</h5>
                  <p className="text-xs text-neutral-450 mt-1">
                    Instagram: <a href="https://instagram.com/land_seeds" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:underline font-semibold font-mono">@land_seeds</a>
                  </p>
                </div>
              </div>

              <div className="flex gap-3 bg-neutral-900/35 border border-white/5 rounded-xl p-4">
                <div className="p-2.5 rounded-lg bg-[#121212] border border-emerald-500/10 text-emerald-400 h-10 w-10 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-neutral-350 font-display uppercase tracking-wide">Hotline Chat</h5>
                  <p className="text-[11px] text-neutral-500 mt-1">Available 24/7 for diaspora callers</p>
                  <button 
                    onClick={triggerWhatsAppSupport}
                    className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold mt-1 flex items-center gap-1 cursor-pointer"
                  >
                    Open Live Link
                  </button>
                </div>
              </div>
            </div>

            {/* Interaction Direct Inquiry Form */}
            <div className="rounded-2xl border border-white/10 bg-neutral-900/45 p-6 backdrop-blur-md">
              <h4 className="text-base sm:text-lg font-bold font-display text-white mb-6">
                Transmit Immediate Inquiry
              </h4>

              {isSent ? (
                <div className="rounded-xl bg-emerald-500/5 border border-emerald-500/20 p-6 text-center space-y-4">
                  <div className="mx-auto h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-450">
                    <Check className="w-6 h-6" />
                  </div>
                  <h5 className="text-base font-bold text-white">Transmission Successful!</h5>
                  <p className="text-xs text-neutral-400">
                    Thank you. A LandSeeds investment representative will call or write you shortly within 24 working hours.
                  </p>
                  <button 
                    onClick={() => setIsSent(false)}
                    className="text-xs text-red-500 font-bold hover:underline pt-2"
                  >
                    Write another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] sm:text-xs font-medium text-neutral-400 uppercase tracking-wider mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-xs sm:text-sm text-white placeholder-neutral-600 focus:border-red-600 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] sm:text-xs font-medium text-neutral-400 uppercase tracking-wider mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+234..."
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-xs sm:text-sm text-white placeholder-neutral-600 focus:border-red-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] sm:text-xs font-medium text-neutral-400 uppercase tracking-wider mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="johndoe@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-xs sm:text-sm text-white placeholder-neutral-600 focus:border-red-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] sm:text-xs font-medium text-neutral-400 uppercase tracking-wider mb-1">
                      Message Inquiry *
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Tell us which estate you are eyeing, or describe your budget schedule..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-lg border border-white/10 bg-black/40 p-3 text-xs sm:text-sm text-white placeholder-neutral-605 focus:border-red-650 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full cursor-pointer flex items-center justify-center gap-2 rounded-lg bg-red-600 hover:bg-red-750 py-3 text-xs sm:text-sm font-semibold text-white transition-all disabled:opacity-55 active:scale-[0.98]"
                  >
                    <span>{sending ? "Processing Transmission..." : "Submit Secure Message"}</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>

          </div>

          {/* RIGHT COLUMN: HIGH-CONTRAST SIMULATED INTERACTIVE MAP INTEGRATION */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-5 sm:p-6 backdrop-blur-md relative overflow-hidden flex flex-col justify-between h-full">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h4 className="text-base sm:text-lg font-bold font-display text-white">
                      Lagos State - Epe Core Map Hub
                    </h4>
                    <p className="text-[11px] text-neutral-400">
                      Tap property markers below to view location specifics
                    </p>
                  </div>
                  <div className="rounded-full h-8 w-8 bg-neutral-955 flex items-center justify-center text-red-500 border border-white/10 shadow-inner">
                    <MapPin className="w-4.5 h-4.5" />
                  </div>
                </div>

                {/* Simulated Geographic Canvas */}
                <div className="relative w-full aspect-[4/3] bg-black/60 rounded-xl overflow-hidden border border-white/5 select-none" id="interactive-map-canvas">
                  
                  {/* Subtle vector grid lines on background of map */}
                  <div className="absolute inset-0 bg-radial-[circle_at_center,_#111111_0%,_#000000_100%]">
                    {/* Simplified contours of Ogun state inside map canvas */}
                    <svg viewBox="0 0 100 80" className="absolute inset-0 w-full h-full opacity-[0.14] fill-none stroke-white" strokeWidth="0.4">
                      {/* Outline representing simplified state border boundary */}
                      <path d="M 15 15 Q 35 12, 50 18 T 85 10 T 92 45 T 70 70 T 35 72 T 12 55 T 15 15 Z" />
                      {/* Sub-hubs transit pathways */}
                      <path d="M 15 15 L 48 42 L 82 82 M 45 68 L 62 25" strokeDasharray="2 2" stroke="rgba(255,255,255,0.6)" />
                    </svg>
                  </div>

                  {/* Layout coordinates plotting from Array */}
                  {mapCoordinatesPinMap.map((pin) => {
                    const est = ESTATES_DATA.find((e) => e.id === pin.id);
                    if (!est) return null;
                    const isActive = activeMapEstate?.id === pin.id;

                    return (
                      <div
                        key={pin.id}
                        style={{ top: pin.top, left: pin.left }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer group/pin"
                        onClick={() => setActiveMapEstate(est)}
                      >
                        <div className="relative flex items-center justify-center">
                          {/* Pulsing ring underneath active pinpoint */}
                          {isActive && (
                            <span className="absolute animate-ping inline-flex h-8 w-8 rounded-full bg-red-650 opacity-40"></span>
                          )}
                          
                          {/* Inner map node */}
                          <div className={`h-4 w-4 rounded-full border flex items-center justify-center shadow-lg transition-all duration-300 ${
                            isActive 
                              ? "bg-red-600 border-white scale-125 z-20" 
                              : "bg-neutral-900 border-red-650 hover:bg-red-650 hover:border-white"
                          }`}>
                            <div className="h-1.5 w-1.5 rounded-full bg-white" />
                          </div>
                          
                          {/* Inline micro Label */}
                          <div className={`absolute left-5 bg-black/90 border border-white/10 px-1.5 py-0.5 rounded text-[8px] sm:text-[9px] font-mono tracking-wide text-white uppercase whitespace-nowrap transition-opacity pointer-events-none ${
                            isActive ? "opacity-100" : "opacity-40 group-pin-hover:opacity-100"
                          }`}>
                            {est.title.replace("The Seeds Estate – ", "")}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Interactive Info Card matching selected Map Mark */}
              <AnimatePresence mode="wait">
                {activeMapEstate && (
                  <motion.div
                    key={activeMapEstate.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 rounded-xl border border-white/5 bg-black/40 p-4 space-y-3"
                  >
                    <div className="flex justify-between items-start border-b border-white/5 pb-2">
                      <div>
                        <h5 className="text-xs font-semibold text-white font-display">
                          {activeMapEstate.title}
                        </h5>
                        <p className="text-[10px] text-neutral-400 mt-0.5 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-red-500" /> {activeMapEstate.location}
                        </p>
                      </div>
                      <span className="text-[9px] font-mono font-semibold px-2 py-0.5 bg-red-650/10 text-red-400 rounded border border-red-650/15">
                        Active
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-[10px] text-neutral-500 block">Documentation Status:</span>
                        <span className="text-neutral-300 font-medium">{activeMapEstate.documentation}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-neutral-500 block">Entry-level Pricing:</span>
                        <span className="text-white font-bold block">250 sqm - ₦{activeMapEstate.prices[250].toLocaleString()}</span>
                        <span className="text-white font-bold block">500 sqm - ₦{activeMapEstate.prices[500].toLocaleString()}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
