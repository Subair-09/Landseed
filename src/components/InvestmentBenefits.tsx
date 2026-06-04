/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import { TrendingUp, Award, Users, ShieldAlert, ChevronUp, Share2, DollarSign } from "lucide-react";
import { COUNTERS_DATA, APPRECIATION_TIMELINE, ChartTimelineData } from "../data";

// Extracted CountUp utility component
function CountUp({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      if (start === end) return;

      const duration = 2000; // in ms
      const increment = end / (duration / 16); // ~60fps

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={containerRef} className="tabular-nums">
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function InvestmentBenefits() {
  const [hoveredData, setHoveredData] = useState<ChartTimelineData>(
    APPRECIATION_TIMELINE[APPRECIATION_TIMELINE.length - 3] // Default to 2026 current
  );

  // Calculate coordinates for the custom SVG chart
  // Standardizing responsive svg grid of width 600, height 250
  const width = 600;
  const height = 220;
  const paddingX = 40;
  const paddingY = 30;

  const minYear = APPRECIATION_TIMELINE[0].year;
  const maxYear = APPRECIATION_TIMELINE[APPRECIATION_TIMELINE.length - 1].year;
  const minVal = 0;
  const maxVal = Math.max(...APPRECIATION_TIMELINE.map(d => d.averageValuePerSqm)) * 1.1;

  const getX = (year: number) => {
    return paddingX + ((year - minYear) / (maxYear - minYear)) * (width - paddingX * 2);
  };

  const getY = (val: number) => {
    return height - paddingY - ((val - minVal) / (maxVal - minVal)) * (height - paddingY * 2);
  };

  // Construct SVG Path coordinates
  const linePoints = APPRECIATION_TIMELINE.map(d => `${getX(d.year)},${getY(d.averageValuePerSqm)}`).join(" ");
  const areaPoints = [
    `${getX(minYear)},${height - paddingY}`,
    ...APPRECIATION_TIMELINE.map(d => `${getX(d.year)},${getY(d.averageValuePerSqm)}`),
    `${getX(maxYear)},${height - paddingY}`
  ].join(" ");

  return (
    <section className="relative py-24 bg-black overflow-hidden" id="benefits-section">
      {/* Visual top and bottom dividing overlays */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      {/* Decorative center grid lines shadow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#090909_1px,transparent_1px),linear-gradient(to_bottom,#090909_1px,transparent_1px)] bg-[size:5rem_5rem] pointer-events-none" />

      {/* Crimson Accent Radial Flare */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-red-650/[0.04] blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Animated statistics counters row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-24" id="stats-counters">
          {COUNTERS_DATA.map((counter) => (
            <div 
              key={counter.id}
              className="group rounded-2xl border border-white/5 bg-neutral-900/40 p-6 backdrop-blur-md hover:border-white/10 transition-colors"
            >
              <div className="text-3xl sm:text-4.5xl md:text-5xl font-extrabold font-display tracking-tight text-white mb-2">
                <CountUp value={counter.value} suffix={counter.suffix} prefix={counter.prefix} />
              </div>
              <div className="text-xs sm:text-sm font-semibold text-neutral-200 font-display uppercase tracking-wider mb-2 group-hover:text-red-500 transition-colors">
                {counter.title}
              </div>
              <p className="text-[11px] sm:text-xs text-neutral-450 leading-relaxed font-light">
                {counter.description}
              </p>
            </div>
          ))}
        </div>

        {/* Chart + Analytics Highlights layout split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left panel: Custom responsive SVG line chart visualization with tooltips */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-5 sm:p-6 backdrop-blur-md">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h4 className="text-base sm:text-lg font-bold font-display text-white">
                    Value Growth Projection Chart
                  </h4>
                  <p className="text-[11px] text-neutral-400">
                    Ogun State land valuation path indices (₦ Millions per 500sqm)
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-red-650/10 text-red-500 text-[10px] font-mono uppercase tracking-wider">
                  <TrendingUp className="w-3 h-3" /> Average ROI 14x
                </div>
              </div>

              {/* Custom SVG Graphical Workspace Container */}
              <div className="relative w-full aspect-[21/10] bg-black/40 rounded-xl p-2 border border-white/5 overflow-hidden">
                <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
                  <defs>
                    {/* Fill gradient code under curves */}
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#E30613" stopOpacity="0.30"/>
                      <stop offset="100%" stopColor="#E30613" stopOpacity="0.00"/>
                    </linearGradient>
                  </defs>

                  {/* Horizontal grid guide lines */}
                  {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
                    const yVal = minVal + ratio * (maxVal - minVal);
                    const yCoord = getY(yVal);
                    return (
                      <g key={idx}>
                        <line 
                          x1={paddingX} 
                          y1={yCoord} 
                          x2={width - paddingX} 
                          y2={yCoord} 
                          stroke="rgba(255,255,255,0.04)" 
                          strokeWidth="1"
                        />
                        <text 
                          x={paddingX - 10} 
                          y={yCoord + 3} 
                          fill="rgba(255,255,255,0.3)" 
                          fontSize="9" 
                          fontFamily="monospace"
                          textAnchor="end"
                        >
                          ₦{(yVal).toFixed(1)}M
                        </text>
                      </g>
                    );
                  })}

                  {/* Year X axis grids */}
                  {APPRECIATION_TIMELINE.map((node, idx) => {
                    const xCoord = getX(node.year);
                    return (
                      <g key={idx}>
                        <line
                          x1={xCoord}
                          y1={paddingY}
                          x2={xCoord}
                          y2={height - paddingY}
                          stroke="rgba(255,255,255,0.03)"
                          strokeWidth="1"
                          strokeDasharray="4,4"
                        />
                        <text
                          x={xCoord}
                          y={height - 10}
                          fill="rgba(255,255,255,0.4)"
                          fontSize="9"
                          fontFamily="monospace"
                          textAnchor="middle"
                        >
                          {node.year}
                        </text>
                      </g>
                    );
                  })}

                  {/* Standard Curve Area and lines path */}
                  <polygon points={areaPoints} fill="url(#chartGradient)" />
                  <polyline points={linePoints} fill="none" stroke="#E30613" strokeWidth="2.5" />

                  {/* Active Nodes plotting coordinates */}
                  {APPRECIATION_TIMELINE.map((record) => {
                    const cx = getX(record.year);
                    const cy = getY(record.averageValuePerSqm);
                    const isActive = record.year === hoveredData.year;
                    
                    return (
                      <g 
                        key={record.year}
                        className="cursor-pointer"
                        onMouseEnter={() => setHoveredData(record)}
                        onClick={() => setHoveredData(record)}
                      >
                        <circle 
                          cx={cx} 
                          cy={cy} 
                          r={isActive ? 8 : 4} 
                          fill={isActive ? "#E30613" : "#FFFFFF"} 
                          stroke={isActive ? "rgba(255,255,255,0.5)" : "#E30613"}
                          strokeWidth="2.5"
                          className="transition-all duration-300"
                        />
                        {/* Hidden ultra-wide layout mouse targets for comfortable hovering */}
                        <circle 
                          cx={cx} 
                          cy={cy} 
                          r="24" 
                          fill="transparent" 
                        />
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Responsive Tip Prompt */}
              <div className="flex items-center justify-center gap-2 text-[10px] sm:text-xs text-neutral-400 pt-4 px-2 text-center">
                <span className="w-1.5 h-1.5 bg-red-650 rounded-full animate-ping flex-shrink-0" />
                <span>Hover or tap coordinates on the projection path to analyze compounding returns.</span>
              </div>
            </div>
          </div>

          {/* Right panel: Active ROI parameters breakdown card based on user hovered point */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-red-500 font-mono text-xs uppercase tracking-wider">
              <span className="w-8 h-[1px] bg-red-600 block"></span>
              Strategic Yield Analytics
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold font-display leading-tight text-white">
              Watch Your Capital Appreciation Multiplied
            </h3>

            {/* Dynamic Analytics Panel */}
            <div className="rounded-xl border border-white/10 bg-neutral-900/40 p-5 space-y-4">
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <div>
                  <span className="text-xs text-neutral-400">Yield Index Calendar:</span>
                  <div className="text-2xl font-bold font-display text-white mt-0.5">{hoveredData.year} Projection</div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-neutral-400">Compounded ROI:</span>
                  <div className="text-2xl font-black font-display text-emerald-500 flex items-center justify-end gap-1">
                    <ChevronUp className="w-5 h-5 text-emerald-400 inline" />
                    {(hoveredData.roiMultiplier * 100).toFixed(0)}%
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] uppercase font-mono text-neutral-500 tracking-wider">Value Per 500sqm</span>
                  <span className="block text-lg font-bold text-white mt-1">₦{hoveredData.averageValuePerSqm.toLocaleString()} Millions</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-neutral-500 tracking-wider">Equivalent Asset Growth</span>
                  <span className="block text-lg font-bold text-white mt-1">x{hoveredData.roiMultiplier.toFixed(1)} Initial Value</span>
                </div>
              </div>

              {/* Analytical scenario text explanation based on calendar */}
              <div className="rounded-lg bg-black/50 p-3 text-xs leading-relaxed text-neutral-300 border border-white/5">
                {hoveredData.year <= 2024 ? (
                  <span>
                    Early bird clients who invested in our properties around {hoveredData.year} acquired lands under exceptionally initial indices. An asset bought at that node has already registered a massive <strong className="text-emerald-400">x{hoveredData.roiMultiplier} return multiplier</strong>.
                  </span>
                ) : hoveredData.year <= 2026 ? (
                  <span>
                    The current {hoveredData.year} financial window constitutes an inflection point. With major road layouts, Dangote Cement connections, and university networks fully consolidating, investments now capture strong, stable double-digit yearly jumps.
                  </span>
                ) : (
                  <span>
                    By {hoveredData.year}, standard land values across strategic Ogun State hubs are projected to exceed <strong className="text-white">₦{hoveredData.averageValuePerSqm}M</strong> as urbanization matures. Entering today secures your position on the steep section of this appreciation climb.
                  </span>
                )}
              </div>
            </div>

            {/* General Highlights list */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="p-1 rounded-md bg-emerald-500/10 text-emerald-400 mt-1">
                  <DollarSign className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-white">Insulated Capital</h5>
                  <p className="text-xs text-neutral-400 mt-0.5">Physical land in active development corridors represents the ultimate inflation shield.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-1 rounded-md bg-emerald-500/10 text-emerald-400 mt-1">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-white">Compound Legacy</h5>
                  <p className="text-xs text-neutral-400 mt-0.5">Transfer full ownership securely with registered family-ready deed properties.</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
