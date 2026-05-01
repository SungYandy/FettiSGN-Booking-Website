import { motion, AnimatePresence } from 'motion/react';
import React, { useState } from 'react';

const PRICING_DATA = {
  weekdays: [
    { tier: 'A', spend: '320.000 VND' },
    { tier: 'C', spend: '3.000.000 VND' },
    { tier: 'V', spend: '5.000.000 VND' },
    { tier: 'SVIP', spend: '8.000.000 VND' },
  ],
  weekends: [
    { tier: 'A', spend: '320.000 VND' },
    { tier: 'C', spend: '6.000.000 VND' },
    { tier: 'V', spend: '8.000.000 VND' },
    { tier: 'SVIP', spend: '15.000.000 VND' },
  ]
};

const PRICING_DETAILS = {
  'A': { 
    inclusions: [
      'ANNEX STANDING TABLES',
      '1-4 Guests',
      'Minimum spending: 320,000 VND on weekdays and weekends',
      'Bottle of booking price on arrival',
      'Reservations are free; all other costs paid upon arrival'
    ] 
  },
  'C': { 
    inclusions: [
      'PREMIUM SOFA TABLE',
      '1-5 Guests',
      'Includes Tab Bottles Charged at Booking Cost',
      'Minimum spending: weekdays 3,000,000 VND and weekends 6,000,000 VND',
      'Bottle of booking price on arrival',
      'Reservations are free; all other costs paid upon arrival'
    ] 
  },
  'V': { 
    inclusions: [
      'VIP SOFA TABLE',
      '1-10 Guests',
      'Includes Tab Bottles Charged at Booking Cost',
      'Minimum spending: 5,000,000 VND on weekdays and 8,000,000 VND on weekends',
      'Bottle of booking price on arrival',
      'Reservations are free; all other costs paid upon arrival'
    ] 
  },
  'SVIP': { 
    inclusions: [
      'SVIP SOFA TABLE',
      '1-12 Guests',
      'Includes Tab Bottles Charged at Booking Cost',
      'Minimum expenditure: weekdays 8,000,000 VND and weekends 15,000,000 VND',
      'Bottle of booking price on arrival',
      'Reservations are free; all other costs paid upon arrival'
    ] 
  },
};

export default function Pricing({ selectedTableTier }: { selectedTableTier?: string }) {
  const [expandedTier, setExpandedTier] = useState<string | null>(null);

  return (
    <section className="pt-8 pb-8 px-6 max-w-7xl mx-auto space-y-8 bg-[#25150f]/60 border-y border-[#c5a059]/10 relative overflow-hidden">
      <div className="relative z-10 space-y-8">
        <div className="text-left space-y-1">
            <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-3xl md:text-6xl font-light tracking-tighter text-[#c5a059]"
            >
                Seating Information
            </motion.h2>
 
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="max-w-xl pb-4"
            >
                <div className="flex flex-col gap-2">
                    <div>
                        <p className="text-[7.5px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#d4b9a8]/60 leading-relaxed font-medium">
                            <span className="text-[#c5a059]">Reservations are free;</span> all other costs paid upon arrival.
                        </p>
                    </div>
                    
                    <div className="space-y-0.5">
                        <p className="text-[10px] text-[#d4b9a8]/50 leading-relaxed italic font-medium">
                            Prices above do not include 10% VAT and 10% service charge.
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        {/* Weekdays */}
        <div className="space-y-6 md:space-y-8 bg-[#2a1a14] p-5 md:p-8 rounded-2xl border border-[#c5a059]/5">
            <h3 className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#c5a059]/60 border-b border-[#c5a059]/10 pb-4 italic">
                Weekdays (Sun to Thu)
            </h3>
            <div className="space-y-3 md:space-y-4">
                {PRICING_DATA.weekdays.map((item) => (
                    <div key={item.tier} className="space-y-2">
                        <button 
                            onClick={() => setExpandedTier(expandedTier === `weekday-${item.tier}` ? null : `weekday-${item.tier}`)}
                            className={`w-full flex justify-between items-center p-3 md:p-4 rounded-lg transition-all border ${
                                selectedTableTier === item.tier ? 'bg-[#c5a059]/10 border-[#c5a059]/30' : 'border-white/5 hover:bg-white/[0.02]'
                            }`}
                        >
                            <span className={`text-[10px] md:text-xs uppercase tracking-widest ${item.tier === 'SVIP' ? 'text-[#c5a059] font-bold underline decoration-[#c5a059]/30 underline-offset-4' : 'text-[#d4b9a8]'}`}>
                                {item.tier}
                            </span>
                            <span className="text-xs md:text-sm font-mono text-[#c5a059]">{item.spend}</span>
                        </button>
                        <AnimatePresence>
                            {expandedTier === `weekday-${item.tier}` && (
                                <motion.div 
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden px-2 md:px-4"
                                >
                                    <ul className="py-3 md:py-4 space-y-2 border-l border-[#c5a059]/20 ml-2 pl-4">
                                        {PRICING_DETAILS[item.tier as keyof typeof PRICING_DETAILS]?.inclusions.map(inc => (
                                            <li key={inc} className="text-[9px] md:text-[10px] uppercase tracking-widest text-[#d4b9a8]/40 flex items-start gap-2 leading-relaxed">
                                                <div className="w-1 h-1 bg-[#c5a059]/40 rounded-full mt-1 shrink-0" />
                                                {inc}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>

        {/* Weekends */}
        <div className="space-y-6 md:space-y-8 bg-[#2a1a14] p-5 md:p-8 rounded-2xl border border-[#c5a059]/5">
            <h3 className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#c5a059]/60 border-b border-[#c5a059]/10 pb-4 italic font-bold">
                Weekends & Events (Fri to Sat)
            </h3>
            <div className="space-y-3 md:space-y-4">
                {PRICING_DATA.weekends.map((item) => (
                    <div key={item.tier} className="space-y-2">
                        <button 
                            onClick={() => setExpandedTier(expandedTier === `weekend-${item.tier}` ? null : `weekend-${item.tier}`)}
                            className={`w-full flex justify-between items-center p-3 md:p-4 rounded-lg transition-all border ${
                                selectedTableTier === item.tier ? 'bg-[#c5a059]/10 border-[#c5a059]/30' : 'border-white/5 hover:bg-white/[0.02]'
                            }`}
                        >
                            <span className={`text-[10px] md:text-xs uppercase tracking-widest ${item.tier === 'SVIP' ? 'text-[#c5a059] font-bold underline decoration-[#c5a059]/30 underline-offset-4' : 'text-[#d4b9a8]'}`}>
                                {item.tier}
                            </span>
                            <span className="text-xs md:text-sm font-mono text-[#c5a059]">{item.spend}</span>
                        </button>
                        <AnimatePresence>
                            {expandedTier === `weekend-${item.tier}` && (
                                <motion.div 
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden px-2 md:px-4"
                                >
                                    <ul className="py-3 md:py-4 space-y-2 border-l border-[#c5a059]/20 ml-2 pl-4">
                                        {PRICING_DETAILS[item.tier as keyof typeof PRICING_DETAILS]?.inclusions.map(inc => (
                                            <li key={inc} className="text-[9px] md:text-[10px] uppercase tracking-widest text-[#d4b9a8]/40 flex items-start gap-2 leading-relaxed">
                                                <div className="w-1 h-1 bg-[#c5a059]/40 rounded-full mt-1 shrink-0" />
                                                {inc}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>

      </div>
    </div>
  </section>
);
}
