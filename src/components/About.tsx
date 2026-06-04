/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { ShieldCheck, MapPin, BadgePercent, Lock, Award, Headphones, ArrowUpRight } from "lucide-react";
import { WHY_CHOOSE_DATA } from "../data";

// Type-safe mapping for dynamic Lucide Icons
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  ShieldCheck,
  MapPin,
  BadgePercent,
  Lock,
  Award,
  Headphones
};

interface AboutProps {
  onOpenBooking: () => void;
}

export default function About({ onOpenBooking }: AboutProps) {
  return (
    <section className="relative py-24 bg-black overflow-hidden" id="about-section">
      {/* Subtle decorative grid lines overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#141414_1px,transparent_1px),linear-gradient(to_bottom,#141414_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Crimson Gradient Bulb Accent */}
      <div className="absolute -left-64 top-1/4 w-[500px] h-[500px] bg-red-650/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* About Grid Wrapper */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          
          {/* Who We Are Left Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-red-500 font-mono text-xs uppercase tracking-wider">
              <span className="w-8 h-[1px] bg-red-600 block"></span>
              Corporate Profile
            </div>
            
            <h2 className="text-3xl sm:text-4.5xl font-extrabold font-display leading-[1.15] tracking-tight text-white">
              Sowing Seeds of <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">
                Wealth & Security
              </span>
            </h2>

            <p className="text-neutral-400 leading-relaxed text-sm sm:text-base font-light">
              <strong>LandSeeds Integrated Services Ltd</strong> is a premier property development and investment enterprise legally incorporated under corporate laws. We are explicitly devoted to facilitating legal, transparent, and seamless acquisition of genuine, appreciation-intensive land plots in Lagos State & Epe's fastest growing residential and major industrial corridors.
            </p>

            <p className="text-neutral-450 leading-relaxed text-sm font-light">
              We eliminate traditional real estate friction by doing exhaustive surveyor due diligence and legal title validations, and rendering the plots highly affordable through flexible investment installment strategies.
            </p>

            <div className="pt-4">
              <button
                onClick={onOpenBooking}
                className="group inline-flex items-center gap-2 cursor-pointer text-sm font-semibold text-white bg-red-650/10 border border-red-600/30 hover:bg-red-650 hover:border-red-600 px-6 py-3.5 rounded-xl transition-all"
                id="about-cta-btn"
              >
                Launch Your Investment
                <ArrowUpRight className="w-4 h-4 text-red-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Graphical Frame Right Panel */}
          <div className="lg:col-span-7 relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-neutral-900/60 p-4 sm:p-6 backdrop-blur-md">
              <div 
                className="h-80 w-full rounded-xl bg-cover bg-center brightness-[0.75] relative overflow-hidden group"
                style={{ backgroundImage: `url('https://i.imgur.com/COFmz2N.png')` }}
              >
                {/* Floating Stamp badge */}
                <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-black/85 backdrop-blur-md px-3.5 py-2 rounded-lg border border-white/10 flex items-center gap-2 select-none">
                  <ShieldCheck className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-red-500 flex-shrink-0" />
                  <span className="text-[10px] sm:text-xs font-mono font-medium tracking-wide text-white uppercase">C of O • Registered Survey Ready</span>
                </div>
              </div>

              {/* Company statistics teaser inside About area */}
              <div className="grid grid-cols-3 gap-4 mt-6 text-center">
                <div className="bg-black/40 rounded-lg p-3 border border-white/5">
                  <div className="text-xl sm:text-2xl font-bold font-display text-white">100%</div>
                  <div className="text-[10px] text-neutral-400 font-mono uppercase tracking-wider mt-1">Genuine Lands</div>
                </div>
                <div className="bg-black/40 rounded-lg p-3 border border-white/5">
                  <div className="text-xl sm:text-2xl font-bold font-display text-white">₦0</div>
                  <div className="text-[10px] text-neutral-400 font-mono uppercase tracking-wider mt-1">Omo-Onile Debt</div>
                </div>
                <div className="bg-black/40 rounded-lg p-3 border border-white/5">
                  <div className="text-xl sm:text-2xl font-bold font-display text-white">Instant</div>
                  <div className="text-[10px] text-neutral-400 font-mono uppercase tracking-wider mt-1">Site Allocation</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Section Headline */}
        <div className="text-center max-w-xl mx-auto mb-16 space-y-4">
          <div className="text-red-500 font-mono text-xs uppercase tracking-wider">Unmatched Value Standards</div>
          <h3 className="text-3xl sm:text-4.5xl font-bold font-display tracking-tight text-white">Why Smart Investors Choose LandSeeds</h3>
          <p className="text-neutral-400 text-sm font-light">
            We are dedicated to safeguarding client capital and scaling investments with strict compliance, prime positions, and transparency.
          </p>
        </div>

        {/* Why Choose Cards Grid with Framer Motion */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="why-choose-grid">
          {WHY_CHOOSE_DATA.map((item, index) => {
            const IconComponent = ICON_MAP[item.iconName] || ShieldCheck;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative rounded-2xl border border-white/5 bg-neutral-900/30 p-6 hover:bg-neutral-900/60 hover:border-red-650/40 transition-all duration-300 hover:shadow-xl hover:shadow-red-650/[0.02]"
                id={`why-card-${item.id}`}
              >
                {/* Visual Glassmorphic Glow Line on card top */}
                <span className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-red-650/0 via-red-650/10 to-red-650/0 group-hover:via-red-650/60 transition-all duration-500" />

                <div className="flex flex-col h-full justify-between">
                  <div>
                    {/* Icon container */}
                    <div className="w-12 h-12 rounded-xl bg-red-650/10 text-red-500 flex items-center justify-center mb-6 group-hover:bg-red-650 group-hover:text-white transition-all duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>

                    <h4 className="text-lg font-bold font-display text-white mb-2 group-hover:text-red-500 transition-colors">
                      {item.title}
                    </h4>
                    
                    <p className="text-neutral-400 text-xs sm:text-sm font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  
                  {/* Subtle lower arrow decorative */}
                  <div className="flex justify-end mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowUpRight className="w-4 h-4 text-neutral-400" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
