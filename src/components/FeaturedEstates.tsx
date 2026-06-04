/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Search, Grid, FileText, Check, ChevronRight } from "lucide-react";
import { ESTATES_DATA } from "../data";
import { Estate } from "../types";

interface FeaturedEstatesProps {
  onSelectEstate: (estate: Estate) => void;
}

export default function FeaturedEstates({ onSelectEstate }: FeaturedEstatesProps) {
  const [filterRegion, setFilterRegion] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  
  // High-performance state tracking chosen plot size per estate (defaults to 500sqm for highest quality projection)
  const [selectedSizes, setSelectedSizes] = useState<Record<string, 250 | 500>>(
    ESTATES_DATA.reduce((acc, estate) => {
      acc[estate.id] = 500;
      return acc;
    }, {} as Record<string, 250 | 500>)
  );

  const toggleSize = (estateId: string, size: 250 | 500) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [estateId]: size
    }));
  };

  // Regions extractable from our land database
  const regions = ["All", "Ifo", "Agbara", "Abeokuta", "Atan Ota", "Idi Iroko", "Ibese"];

  const filteredEstates = ESTATES_DATA.filter((estate) => {
    const matchesRegion = filterRegion === "All" || estate.location.toLowerCase().includes(filterRegion.toLowerCase());
    const matchesQuery = 
      estate.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      estate.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesQuery;
  });

  return (
    <section className="relative py-24 bg-neutral-950" id="estates-section">
      {/* Decorative top grid lines shadow */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black to-transparent pointer-events-none" />

      {/* Luxury Red Glow behind container header */}
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-red-650/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
          <div className="space-y-4 max-w-xl">
            <div className="text-red-500 font-mono text-xs uppercase tracking-wider">
              Selected Portfolios
            </div>
            <h3 className="text-3xl sm:text-4.5xl font-extrabold font-display tracking-tight text-white">
              Discover Our Verified <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-650 to-red-400">
                Premium Estates
              </span>
            </h3>
            <p className="text-neutral-400 text-sm font-light">
              We own and develop genuine layout lands under institutional standards. Toggle sizes on the cards to view pre-calculated pricing and documents.
            </p>
          </div>

          {/* Quick Search Tool */}
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-neutral-500 pointer-events-none">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search by area, title, or road..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-neutral-900/60 pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-neutral-500 focus:border-red-650 focus:outline-none focus:ring-1 focus:ring-red-650 transition-all backdrop-blur-md"
            />
          </div>
        </div>

        {/* Categories region filter buttons tab row */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none border-b border-white/5">
          {regions.map((region) => (
            <button
              key={region}
              onClick={() => setFilterRegion(region)}
              className={`whitespace-nowrap px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                filterRegion === region
                  ? "bg-red-600 text-white shadow-lg shadow-red-650/15"
                  : "bg-neutral-900 text-neutral-400 hover:bg-neutral-850 hover:text-white"
              }`}
            >
              {region}
            </button>
          ))}
        </div>

        {/* Estates dynamic visual portfolio grid view */}
        <AnimatePresence mode="popLayout">
          {filteredEstates.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              id="estates-grid"
            >
              {filteredEstates.map((estate) => {
                const currentSize = selectedSizes[estate.id] || 500;
                const plotPrice = estate.prices[currentSize];
                
                return (
                  <motion.div
                    key={estate.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="group flex flex-col justify-between h-full bg-neutral-900/40 rounded-2xl border border-white/5 hover:border-white/15 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-red-650/[0.015]"
                    id={`estate-card-${estate.id}`}
                  >
                    
                    {/* Media Image Header Area */}
                    <div className="relative h-64 overflow-hidden bg-neutral-950">
                      <img
                        src={estate.imageUrl}
                        alt={estate.title}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.85]"
                      />
                      
                      {/* Gradient overlay on top of land image */}
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/10 to-transparent opacity-80" />

                      {/* Status badge chip overlay */}
                      <div className="absolute top-4 left-4 flex items-center">
                        <span className={`text-[10px] font-mono font-bold tracking-wider px-2.5 py-1.5 rounded-md uppercase text-white shadow-md ${
                          estate.status === "Limited Slots" 
                            ? "bg-amber-600" 
                            : estate.status === "Selling Fast" 
                            ? "bg-red-650" 
                            : "bg-neutral-800"
                        }`}>
                          {estate.status}
                        </span>
                      </div>

                      {/* Estate Title & Location overlay inside media section */}
                      <div className="absolute bottom-4 inset-x-4">
                        <div className="flex items-center gap-1.5 text-red-500 font-mono text-[10px] tracking-wide uppercase mb-1">
                          <MapPin className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">{estate.location.split(",")[0]}</span>
                        </div>
                        <h4 className="text-lg font-bold font-display text-white group-hover:text-red-500 transition-colors">
                          {estate.title}
                        </h4>
                      </div>
                    </div>

                    {/* Specifications Body Area */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-5">
                      
                      {/* Highlights */}
                      <p className="text-neutral-400 text-xs sm:text-sm font-light leading-relaxed">
                        {estate.highlights}
                      </p>

                      {/* Dynamic Size Toggler Widget */}
                      <div>
                        <div className="flex justify-between items-center text-xs text-neutral-500 mb-2">
                          <span>Plot Dimension Options:</span>
                          <span className="font-semibold text-neutral-450">{currentSize} sqm Selected</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 bg-black/40 rounded-lg p-1 border border-white/5">
                          <button
                            type="button"
                            onClick={() => toggleSize(estate.id, 250)}
                            className={`py-1.5 text-center text-xs font-semibold rounded cursor-pointer transition-all ${
                              currentSize === 250
                                ? "bg-neutral-800 text-white"
                                : "text-neutral-500 hover:text-white"
                            }`}
                          >
                            250 sqm
                          </button>
                          <button
                            type="button"
                            onClick={() => toggleSize(estate.id, 500)}
                            className={`py-1.5 text-center text-xs font-semibold rounded cursor-pointer transition-all ${
                              currentSize === 500
                                ? "bg-neutral-800 text-white"
                                : "text-neutral-500 hover:text-white"
                            }`}
                          >
                            500 sqm
                          </button>
                        </div>
                      </div>

                      {/* Spec Features list bulleteers */}
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-400 border-t border-b border-white/5 py-4">
                        {estate.features.map((feat, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="h-4 w-4 bg-red-650/15 text-red-500 flex items-center justify-center rounded-full mt-0.5 flex-shrink-0">
                              <Check className="w-2.5 h-2.5" />
                            </span>
                            <span className="leading-tight text-neutral-300">{feat}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Documentation Info & Verified Pricing Card */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center gap-1.5 text-xs text-neutral-400 font-medium">
                            <FileText className="w-3.5 h-3.5 text-neutral-500" />
                            {estate.documentation.split("&")[0]}
                          </span>
                          <span className="text-xs text-neutral-500">Document Issued</span>
                        </div>

                        <div className="flex items-baseline justify-between pt-1">
                          <span className="text-xs text-neutral-500">Acquisition Price:</span>
                          <div className="text-right">
                            <span className="text-xl font-black font-display text-white">
                              ₦{plotPrice >= 1000000 
                                ? `${(plotPrice / 1000000).toFixed(1)} Million` 
                                : plotPrice.toLocaleString()
                              }
                            </span>
                            <span className="text-[10px] text-neutral-500 block">All statutory fees inclusive</span>
                          </div>
                        </div>
                      </div>

                      {/* Selection CTA */}
                      <button
                        onClick={() => onSelectEstate(estate)}
                        className="w-full cursor-pointer group/btn inline-flex items-center justify-center gap-2 bg-[#E10613]/10 hover:bg-[#E10613] text-[#E10613] hover:text-white text-xs sm:text-sm font-bold tracking-wide py-3 px-4 rounded-xl transition-all border border-[#E10613]/20 hover:border-transparent active:scale-[0.98]"
                        id={`btn-inspect-${estate.id}`}
                      >
                        Secure Free Inspection Slot
                        <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </button>

                    </div>

                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            // No search results state
            <div className="text-center py-20 rounded-2xl border border-white/5 bg-neutral-900/20 max-w-lg mx-auto">
              <Grid className="w-12 h-12 text-neutral-650 mx-auto mb-4" />
              <h5 className="text-lg font-bold text-white mb-2">No Estates Match Filter</h5>
              <p className="text-xs text-neutral-400">
                Ensure you are typing regional keywords correctly (e.g., Ifo, Agbara, Abeokuta, Atan, Idi Iroko) or select "All".
              </p>
              <button
                onClick={() => { setFilterRegion("All"); setSearchQuery(""); }}
                className="mt-6 text-xs text-red-505 font-bold hover:underline"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
