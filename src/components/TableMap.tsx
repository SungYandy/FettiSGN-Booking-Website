import { motion, AnimatePresence } from 'motion/react';
import { Info, User, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export type TableTier = 'A' | 'C' | 'V' | 'SVIP';

export interface Table {
  id: string;
  name: string;
  tier: TableTier;
  capacity: number;
  x: number;
  y: number;
  width?: number;
  height?: number;
  r?: number;
}

export const TABLES: Table[] = [
  // Top Wall (Left to Right)
  { id: 'A1', name: 'A1', tier: 'A', capacity: 4, x: 135, y: 80, width: 60, height: 40 },
  { id: 'A2', name: 'A2', tier: 'A', capacity: 4, x: 205, y: 80, width: 60, height: 40 },
  { id: 'V2', name: 'V2', tier: 'V', capacity: 6, x: 295, y: 80, width: 60, height: 40 },
  { id: 'V1', name: 'V1', tier: 'V', capacity: 6, x: 365, y: 80, width: 60, height: 40 },
  { id: 'SV3', name: 'S V3', tier: 'SVIP', capacity: 10, x: 435, y: 80, width: 75, height: 40 },
  { id: 'SV2', name: 'S V2', tier: 'SVIP', capacity: 10, x: 535, y: 80, width: 75, height: 40 },
  { id: 'SV1', name: 'S V1', tier: 'SVIP', capacity: 10, x: 620, y: 80, width: 75, height: 40 },
  { id: 'C8', name: 'C8', tier: 'C', capacity: 8, x: 730, y: 80, width: 60, height: 40 },
  { id: 'C7', name: 'C7', tier: 'C', capacity: 8, x: 800, y: 80, width: 60, height: 40 },

  // Inner row below top wall
  { id: 'V4', name: 'V4', tier: 'V', capacity: 6, x: 295, y: 220, width: 60, height: 40 },
  { id: 'V3', name: 'V3', tier: 'V', capacity: 6, x: 365, y: 220, width: 60, height: 40 },
  { id: 'SV4', name: 'S V4', tier: 'SVIP', capacity: 10, x: 435, y: 220, width: 75, height: 40 },

  // Center/Stage Area Surroundings (D) - Removed per request
  
  // Right Side Wall
  { id: 'C6', name: 'C6', tier: 'C', capacity: 8, x: 840, y: 170, width: 35, height: 55 },
  { id: 'C5', name: 'C5', tier: 'C', capacity: 8, x: 840, y: 270, width: 35, height: 55 },

  // Bottom-Right Curved Seating Row - Following the arc
  { id: 'C4', name: 'C4', tier: 'C', capacity: 8, x: 805, y: 400, width: 35, height: 60 },
  { id: 'C3', name: 'C3', tier: 'C', capacity: 8, x: 775, y: 485, width: 50, height: 40 },
  { id: 'C2', name: 'C2', tier: 'C', capacity: 8, x: 690, y: 535, width: 60, height: 40 },
  { id: 'C1', name: 'C1', tier: 'C', capacity: 8, x: 615, y: 510, width: 55, height: 40 },

  // Below Central Complex Row
  { id: 'V6', name: 'V6', tier: 'V', capacity: 6, x: 295, y: 560, width: 60, height: 40 },
  { id: 'V5', name: 'V5', tier: 'V', capacity: 6, x: 365, y: 560, width: 60, height: 40 },
  { id: 'SV5', name: 'S V5', tier: 'SVIP', capacity: 10, x: 445, y: 560, width: 85, height: 40 },

  // Bottom Left Annex Group
  { id: 'A8', name: 'A8', tier: 'A', capacity: 4, x: 100, y: 635, width: 55, height: 45 },
  { id: 'A3', name: 'A3', tier: 'A', capacity: 4, x: 175, y: 635, width: 55, height: 45 },
  { id: 'A7', name: 'A7', tier: 'A', capacity: 4, x: 100, y: 720, width: 55, height: 45 },
  { id: 'A4', name: 'A4', tier: 'A', capacity: 4, x: 175, y: 720, width: 55, height: 45 },
  { id: 'A6', name: 'A6', tier: 'A', capacity: 4, x: 100, y: 805, width: 55, height: 45 },
  { id: 'A5', name: 'A5', tier: 'A', capacity: 4, x: 175, y: 805, width: 55, height: 45 },
];

const TIER_COLORS: Record<TableTier, string> = {
  'A': 'stroke-[#c5a059]/30 fill-[#c5a059]/10',
  'C': 'stroke-[#c5a059]/50 fill-[#c5a059]/20',
  'V': 'stroke-amber-500/60 fill-amber-500/20',
  'SVIP': 'stroke-amber-300 fill-amber-300/30',
};

const TIER_HOVER: Record<TableTier, string> = {
  'A': 'hover:stroke-[#c5a059] hover:fill-[#c5a059]/30',
  'C': 'hover:stroke-white hover:fill-[#c5a059]/40',
  'V': 'hover:stroke-amber-400 hover:fill-amber-500/40',
  'SVIP': 'hover:stroke-amber-200 hover:fill-amber-300/50',
};

interface TableMapProps {
  onSelect: (table: Table) => void;
  selectedTableId?: string;
}

export default function TableMap({ onSelect, selectedTableId }: TableMapProps) {
  const [hoveredTable, setHoveredTable] = useState<Table|null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.matchMedia('(pointer: coarse)').matches);
    }
  }, []);

  const handleTableClick = (table: Table) => {
    setHoveredTable(table);
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto bg-[#110906] rounded-xl overflow-hidden border border-[#c5a059]/10 group/map flex flex-col"
         onClick={(e) => {
           // Clear tooltip if clicking background on mobile
           if (e.target === e.currentTarget && isMobile) setHoveredTable(null);
         }}>
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 pointer-events-none opacity-10" 
           style={{ 
             backgroundImage: `radial-gradient(circle at 1px 1px, rgba(197,160,89,0.1) 1px, transparent 0)`,
             backgroundSize: '24px 24px' 
           }} 
      />

      {/* Atmospheric Lighting - Richer colors */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[800px] h-[800px] bg-[#c5a059]/[0.05] blur-[180px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-amber-900/[0.08] blur-[150px] rounded-full translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative w-full p-5 md:p-8 pb-4 flex flex-col md:flex-row justify-between items-start md:items-center z-10 gap-4">
        <div className="space-y-1">
          <motion.h2 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-light tracking-tighter text-[#c5a059]"
          >
            Placement Map
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[10px] uppercase tracking-[0.4em] text-[#d4b9a8]/30"
          >
            Select a Table to RSVP
          </motion.p>
        </div>
        
        <div className="flex flex-wrap gap-x-4 gap-y-2 md:gap-6 justify-start md:justify-end">
             {Object.keys(TIER_COLORS).map((tier, i) => (
                <motion.div 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={tier} 
                    className="flex items-center gap-1.5"
                >
                    <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${tier === 'SVIP' ? 'bg-amber-300' : tier === 'V' ? 'bg-amber-500' : 'bg-[#c5a059]'}`} />
                    <span className="text-[8px] md:text-[9px] uppercase tracking-widest text-[#d4b9a8]/40 font-medium">{tier}</span>
                </motion.div>
             ))}
        </div>
      </div>

      <div className="relative w-full aspect-[11/10] sm:aspect-[10/9] md:min-h-[900px] md:aspect-auto">
        <svg 
          viewBox="0 0 1000 900" 
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-full relative z-0"
          xmlns="http://www.w3.org/2000/svg"
        >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id="textGlow">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <path id="barPath" d="M 160 180 Q 240 350 160 520" />
        </defs>

        {/* Outer Structural Walls - matching the annex and cutout shape */}
        <path 
          d="M 80 40 L 920 40 L 920 900 L 550 900 L 550 630 L 265 630 L 265 900 L 80 900 Z" 
          className="fill-[#1a0f0a] stroke-[#c5a059]/20 stroke-[3px]" 
        />
        
        {/* Bar Area - Curved counter with stools (B1 B20) */}
        <g opacity="0.7">
            {/* Bar text behind the counter */}
            <text className="fill-[#c5a059]/80 text-[10px] tracking-[0.4em] font-bold" filter="url(#textGlow)">
                <textPath href="#barPath" startOffset="50%" textAnchor="middle" spacing="auto">
                    <tspan dy="-18">BAR</tspan>
                </textPath>
            </text>
            <text className="fill-[#c5a059]/40 text-[8px] tracking-[0.2em]">
                <textPath href="#barPath" startOffset="50%" textAnchor="middle" spacing="auto">
                    <tspan dy="26">B1 B20</tspan>
                </textPath>
            </text>

            {/* The main counter */}
            <use href="#barPath" className="fill-none stroke-[#c5a059]/40 stroke-[22px] stroke-cap-round" />
            <use href="#barPath" className="fill-none stroke-[#c5a059]/10 stroke-[1px] stroke-cap-round" />
            
            {/* Bar stools */}
            {[...Array(10)].map((_, i) => (
                <circle key={i} cx={235 + Math.sin(i * 0.3) * 3} cy={210 + i * 35} r="6" className="fill-[#c5a059]/10 stroke-[#c5a059]/30" />
            ))}
        </g>
        
        {/* Central Complex (Stairs and In'out) */}
        <g opacity="0.6">
            <rect x="270" y="300" width="240" height="110" className="fill-[#c5a059]/5 stroke-[#c5a059]/30" />
            
            {/* Stairs detail - vertical lines on the left side */}
            {[...Array(8)].map((_, i) => (
                <line key={i} x1={270 + i * 18} y1="300" x2={270 + i * 18} y2="410" className="stroke-[#c5a059]/25 stroke-[1px]" />
            ))}
            
            {/* In'out box section */}
            <line x1="415" y1="300" x2="415" y2="410" className="stroke-[#c5a059]/40 stroke-[2px]" />
            <text x="465" y="360" textAnchor="middle" className="fill-[#c5a059]/80 text-[12px] tracking-[0.5em] font-bold">In' out</text>
        </g>
 
        {/* DJ Area / Circular Feature - Centered correctly relative to tables */}
        <g opacity="0.9">
            {/* Main Stage Circle */}
            <circle cx="680" cy="370" r="75" className="fill-none stroke-[#c5a059]/50 stroke-[3px]" filter="url(#glow)" />
            <circle cx="680" cy="370" r="55" className="fill-none stroke-[#c5a059]/20 stroke-[1px]" />
            
            {/* Opening in the circle for DJ access */}
            <path d="M 640 310 A 75 75 0 1 1 615 410" className="fill-none stroke-[#1a0f0a] stroke-[5px]" />
            
            <text x="680" y="375" textAnchor="middle" className="fill-[#c5a059] text-[10px] uppercase tracking-[0.5em] font-bold" filter="url(#textGlow)">DJ BOOTH</text>
        </g>

        {/* Diagonal Hatching in cutout area (lower right) */}
        <pattern id="diagonalHatch" patternUnits="userSpaceOnUse" width="10" height="10" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="10" className="stroke-[#c5a059]/20 stroke-[1px]" />
        </pattern>
        <rect x="560" y="640" width="350" height="260" fill="url(#diagonalHatch)" />
        <path d="M 560 640 L 910 640 L 910 900 L 560 900 Z" className="fill-none stroke-[#c5a059]/10" />

        <text 
          x="735" 
          y="770" 
          textAnchor="middle" 
          className="fill-[#c5a059] text-[24px] uppercase tracking-[0.8em] font-bold opacity-30 pointer-events-none"
          filter="url(#textGlow)"
        >
          FETTI
        </text>

        {/* Final adjustments to perimeter curve */}
        <path d="M 580 500 Q 800 550 900 350 Q 900 150 780 40" className="fill-none stroke-[#c5a059]/5 stroke-[30px] opacity-20" />


        {/* Section labels */}

        {/* Structural Bench Seating Bases (following the map's long structures) */}
        <g opacity="0.15">
            {/* Top row bench */}
            <path d="M 120 70 L 860 70 L 860 130 L 120 130 Z" className="fill-[#c5a059]/10 stroke-[#c5a059]/30" />
            
            {/* Bottom left annex bench */}
            <path d="M 120 660 L 260 660 L 260 880 L 120 880 Z" className="fill-[#c5a059]/10 stroke-[#c5a059]/30" />
        </g>

        {/* Tables */}
        {TABLES.map((table, i) => {
          const isRect = !table.r;
          const chairs = [];
          const capacity = table.capacity;
          
          if (isRect && table.width && table.height) {
            // Distribute chairs around the rectangle
            // For simplicity, we'll place them on long sides if possible
            const perSide = Math.ceil(capacity / 2);
            for(let j=0; j<capacity; j++) {
                const side = j % 2; // 0 for top/left, 1 for bottom/right
                const index = Math.floor(j / 2);
                const padding = 10;
                
                // If width > height, place on top/bottom
                if (table.width > table.height) {
                    const cx = table.x + padding + (index * (table.width - 2*padding) / (perSide - 1 || 1));
                    const cy = side === 0 ? table.y - 12 : table.y + table.height + 12;
                    chairs.push({ cx, cy });
                } else {
                    // Place on left/right
                    const cx = side === 0 ? table.x - 12 : table.x + table.width + 12;
                    const cy = table.y + padding + (index * (table.height - 2*padding) / (perSide - 1 || 1));
                    chairs.push({ cx, cy });
                }
            }
          }

          return (
          <motion.g 
            key={table.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + (i * 0.03), duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="cursor-pointer group select-none outline-none"
            onClick={(e) => {
              e.stopPropagation();
              handleTableClick(table);
            }}
          >
            {/* Chair Outlines */}
            {chairs.map((chair, ci) => (
                <circle 
                    key={`chair-${ci}`} 
                    cx={chair.cx} 
                    cy={chair.cy} 
                    r="4" 
                    className={`stroke-[#c5a059]/30 fill-transparent group-hover:stroke-[#c5a059]/60 transition-colors duration-500`} 
                />
            ))}

            {/* Table Shadow for Depth */}
            <g className={`${selectedTableId === table.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'} transition-opacity duration-500`}>
                {table.r ? (
                    <circle cx={table.x} cy={table.y + 4} r={table.r} className="fill-black/60 blur-sm" />
                ) : (
                    <rect x={table.x} y={table.y + 4} width={table.width} height={table.height} rx="8" className="fill-black/60 blur-sm" />
                )}
            </g>

            {/* Main Table Shape */}
            {table.r ? (
              <circle
                cx={table.x}
                cy={table.y}
                r={table.r}
                className={`${TIER_COLORS[table.tier]} ${TIER_HOVER[table.tier]} transition-all duration-500 ${selectedTableId === table.id ? 'stroke-white stroke-[2px]' : 'stroke-[0.5px]'}`}
                style={{ filter: selectedTableId === table.id ? 'url(#glow)' : 'none' }}
              />
            ) : (
              <rect
                x={table.x}
                y={table.y}
                width={table.width}
                height={table.height}
                rx="8"
                className={`${TIER_COLORS[table.tier]} ${TIER_HOVER[table.tier]} transition-all duration-500 ${selectedTableId === table.id ? 'stroke-white stroke-[2px]' : 'stroke-[0.5px]'}`}
                style={{ filter: selectedTableId === table.id ? 'url(#glow)' : 'none' }}
              />
            )}

            {/* Capacity Indicators (Minimized) */}
            <text 
              x={table.width ? table.x + table.width / 2 : table.x}
              y={table.height ? table.y + table.height / 2 + 3 : table.y + 3}
              textAnchor="middle"
              filter="url(#textGlow)"
              className={`text-[8px] font-mono tracking-tighter pointer-events-none transition-colors duration-500 ${selectedTableId === table.id ? 'fill-white font-bold' : 'fill-white/40 group-hover:fill-white/80'}`}
            >
              {table.id}
            </text>
          </motion.g>
        );
      })}
    </svg>
    </div>


      {/* Detail Overlay */}
      <AnimatePresence>
        {hoveredTable && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={`fixed md:absolute z-50 md:z-20 bg-neutral-900 border border-white/10 p-5 rounded-2xl shadow-2xl backdrop-blur-2xl min-w-[240px] md:min-w-[200px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:left-auto md:top-auto md:translate-x-0 md:translate-y-0 pointer-events-auto`}
            style={{ 
                left: typeof window !== 'undefined' && window.innerWidth >= 768 ? Math.min(Math.max(hoveredTable.x - 100, 20), 400) : undefined,
                top: typeof window !== 'undefined' && window.innerWidth >= 768 ? Math.max(hoveredTable.y - 140, 20) : undefined,
            }}
          >
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setHoveredTable(null);
              }}
              className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
            <div className="space-y-4" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-start border-b border-white/5 pb-2 pr-6">
                <div>
                  <h3 className="text-white text-base font-light tracking-tight">{hoveredTable.name}</h3>
                  <span className={`text-[9px] uppercase tracking-widest ${hoveredTable.tier === 'SVIP' ? 'text-amber-300' : 'text-white/40'}`}>
                    {hoveredTable.tier} Access
                  </span>
                </div>
                <div className={`px-2 py-0.5 rounded-full border text-[8px] tracking-tighter ${hoveredTable.tier === 'SVIP' ? 'border-amber-300/40 text-amber-300' : 'border-white/10 text-white/30'}`}>
                    Confirmed via Concierge
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pb-1">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1 text-white/30">
                    <span className="text-[9px] uppercase tracking-wider">Tier</span>
                  </div>
                  <p className="text-white text-sm font-mono">{hoveredTable.tier}</p>
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1 text-white/30">
                    <span className="text-[9px] uppercase tracking-wider">Capacity</span>
                  </div>
                  <p className="text-white text-sm font-mono">{hoveredTable.capacity} PAX</p>
                </div>
              </div>

              <div className="pt-3">
                <button 
                  onClick={() => {
                    onSelect(hoveredTable);
                    setHoveredTable(null);
                  }}
                  className={`w-full text-[9px] uppercase tracking-widest text-[#c5a059] text-center italic font-bold py-2 border border-[#c5a059]/20 rounded-lg hover:bg-[#c5a059]/10 transition-all`}
                >
                  {isMobile ? 'Tap to Book' : 'Click table to reserve'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


    </div>
  );
}
