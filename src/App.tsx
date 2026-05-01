/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Facebook, Instagram } from 'lucide-react';
import EntryGate from './components/EntryGate';
import TableMap, { Table, TABLES } from './components/TableMap';
import Pricing from './components/Pricing';
import BookingForm from './components/BookingForm';
import { FettiLogo } from './components/FettiLogo';

export default function App() {
  const [isEntered, setIsEntered] = useState(false);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);

  const [activeTab, setActiveTab] = useState<'main' | 'menu' | 'events'>('main');

  const handleTableSelect = (table: Table) => {
    setSelectedTable(table);
    setActiveTab('main'); // Ensure they are on main tab
    // Smooth scroll to form on select with a slight offset
    setTimeout(() => {
        const bookingSection = document.getElementById('booking');
        if (bookingSection) {
            const yOffset = -100; 
            const y = bookingSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    }, 100);
  };

  const whatsappUrl = "https://wa.me/61493247133?text=Hi%20Concierge,%20I'm%20looking%20to%20book%20a%20table%20at%20FETTISGN.";
  const facebookUrl = "https://www.facebook.com/BookingFettiClub/";
  const instagramUrl = "https://www.instagram.com/fetti.socialclub/";

  return (
    <div className="min-h-screen bg-[#1a0f0a] text-[#d4b9a8] font-sans selection:bg-[#c5a059] selection:text-black">
      <AnimatePresence>
        {!isEntered && (
          <EntryGate onEnter={() => setIsEntered(true)} />
        )}
      </AnimatePresence>

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: isEntered ? 1 : 0 }}
        transition={{ duration: 1 }}
        className="relative"
      >
        {/* Universal Sticky Actions */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5 md:gap-2 p-1 bg-black/80 backdrop-blur-2xl border border-[#c5a059]/20 rounded-full shadow-2xl w-[90%] max-w-sm md:w-auto">
          <button 
            onClick={() => {
              setActiveTab('menu');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex-1 md:flex-none px-4 md:px-6 py-3 rounded-full text-[9px] md:text-[10px] uppercase tracking-[0.1em] md:tracking-[0.2em] transition-colors ${activeTab === 'menu' ? 'text-[#c5a059] font-bold' : 'text-[#d4b9a8]/60 hover:text-white'}`}
          >
            Menu
          </button>
          <motion.button
            onClick={() => {
              setActiveTab('main');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 md:gap-3 px-6 md:px-8 py-3 rounded-full group transition-all ${activeTab === 'main' ? 'bg-[#c5a059] text-black shadow-[0_0_20px_rgba(197,160,89,0.3)]' : 'bg-white/5 text-[#d4b9a8]/60 hover:text-white'}`}
          >
            <MessageCircle className="w-3 h-3 md:w-4 md:h-4" />
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest whitespace-nowrap">Book</span>
          </motion.button>
          <button 
            onClick={() => {
              setActiveTab('events');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex-1 md:flex-none px-4 md:px-6 py-3 rounded-full text-[9px] md:text-[10px] uppercase tracking-[0.1em] md:tracking-[0.2em] transition-colors ${activeTab === 'events' ? 'text-[#c5a059] font-bold' : 'text-[#d4b9a8]/60 hover:text-white'}`}
          >
            Events
          </button>
        </div>

        {/* Navigation Bar */}
        <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 border-b border-[#c5a059]/10 backdrop-blur-xl bg-black/40">
          <div className="max-w-7xl mx-auto flex justify-between items-center relative h-10 md:h-12">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => {
                  setActiveTab('main');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-3 group"
              >
                <div className="w-8 h-8 md:w-10 md:h-10 text-[#c5a059]">
                  <FettiLogo />
                </div>
                <span className="hidden sm:inline text-xl font-bold tracking-tighter whitespace-nowrap text-[#c5a059] group-hover:opacity-80 transition-opacity uppercase">
                  FETTI
                </span>
              </button>
            </div>

            {/* Tagline Centered */}
            <div className="absolute left-1/2 -translate-x-1/2 hidden lg:block">
              <span className="text-[10px] uppercase tracking-[0.4em] text-[#d4b9a8]/20 font-medium whitespace-nowrap">Nightlife made perfect</span>
            </div>
            
            <div className="flex gap-4 items-center">
                <div className="flex items-center gap-3 md:gap-6">
                  <a 
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-[#c5a059] font-bold hover:text-white transition-colors flex items-center gap-2"
                  >
                    <span>CHAT NOW</span>
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  </a>
                  
                  <div className="flex gap-3 md:gap-4">
                    <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="text-[#d4b9a8]/40 hover:text-[#c5a059] transition-colors">
                      <Facebook className="w-4 h-4" />
                    </a>
                    <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="text-[#d4b9a8]/40 hover:text-[#c5a059] transition-colors transition-colors">
                      <Instagram className="w-4 h-4" />
                    </a>
                  </div>
                </div>
            </div>
          </div>
        </nav>

        {/* Tab Content */}
        <div className="pt-24">
          <AnimatePresence mode="wait">
            {activeTab === 'main' && (
              <motion.div
                key="main"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
              >
                {/* Hero / Table Map Section */}
                <section className="pt-0 md:pt-4 pb-12 md:pb-20 px-6 max-w-7xl mx-auto space-y-6 md:space-y-10 relative">
                  {/* Decorative background accent removed (placeholder) */}

                  <div className="max-w-xl space-y-4 md:space-y-6 relative z-10 pt-2 md:pt-0">
                    <div className="space-y-3 md:space-y-4">
                      <h1 className="text-3xl md:text-6xl font-light tracking-tighter leading-tight md:leading-none text-[#d4b9a8]">
                        Reservation <span className="text-[#c5a059]">made easy.</span>
                      </h1>
                    </div>
                  </div>

                  <div className="bg-[#2a1a14]/50 rounded-2xl border border-[#c5a059]/10 shadow-2xl overflow-hidden backdrop-blur-sm relative z-10">
                    <TableMap 
                      onSelect={handleTableSelect} 
                      selectedTableId={selectedTable?.id} 
                    />
                  </div>
                </section>

                <Pricing selectedTableTier={selectedTable?.tier} />
                <BookingForm selectedTable={selectedTable} allTables={TABLES} />
              </motion.div>
            )}

            {activeTab === 'menu' && (
              <motion.section 
                key="menu"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="pt-8 pb-24 px-6 max-w-7xl mx-auto min-h-[60vh] space-y-6"
              >
                <div className="text-center space-y-4">
                  <h2 className="text-4xl font-light tracking-tighter text-[#c5a059]">Menu</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-16 max-w-5xl mx-auto">
                    {/* VIP & Spirits Selection */}
                    <div className="md:col-span-2 space-y-16 pb-8 border-b border-[#c5a059]/10">
                        <div className="space-y-8 max-w-xl">
                            <div className="border-b border-[#c5a059]/30 pb-4">
                                <h3 className="text-xl font-medium tracking-widest text-[#c5a059] uppercase italic">VIP Packages</h3>
                            </div>
                            <ul className="space-y-3 text-xs uppercase tracking-widest">
                                <li className="space-y-1">
                                    <div className="flex justify-between"><span>ACE Package (3 Armand Gold)</span> <span className="font-mono text-[#c5a059]">58.450</span></div>
                                </li>
                                <li className="space-y-1">
                                    <div className="flex justify-between"><span>Dom Package 1 (3 Dom Luminous)</span> <span className="font-mono text-[#c5a059]">48.450</span></div>
                                </li>
                                <li className="space-y-1">
                                    <div className="flex justify-between"><span>Moet Package 1 (6 Brut)</span> <span className="font-mono text-[#c5a059]">27.550</span></div>
                                </li>
                                <li className="space-y-1">
                                    <div className="flex justify-between"><span>Macallan Package (2 Macallan 12)</span> <span className="font-mono text-[#c5a059]">13.150</span></div>
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-8 max-w-xl">
                            <div className="border-b border-[#c5a059]/30 pb-4">
                                <h3 className="text-xl font-medium tracking-widest text-[#c5a059] uppercase italic">Spirits</h3>
                            </div>
                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <h4 className="text-[10px] uppercase tracking-[0.3em] text-[#c5a059]/40">Tequila</h4>
                                    <ul className="space-y-3 text-xs uppercase tracking-widest">
                                        <li className="flex justify-between"><span>Clase Azul San Luis</span> <span className="font-mono text-[#c5a059]">52.900</span></li>
                                        <li className="flex justify-between"><span>Clase Azul Gold</span> <span className="font-mono text-[#c5a059]">52.000</span></li>
                                        <li className="flex justify-between"><span>Don Julio 1942</span> <span className="font-mono text-[#c5a059]">15.300</span></li>
                                    </ul>
                                </div>
                                <div className="space-y-3">
                                    <h4 className="text-[10px] uppercase tracking-[0.3em] text-[#c5a059]/40">Vodka & Gin</h4>
                                    <ul className="space-y-3 text-xs uppercase tracking-widest">
                                        <li className="flex justify-between"><span>Belvedere B10 Luminous</span> <span className="font-mono text-[#c5a059]">12.950</span></li>
                                        <li className="flex justify-between"><span>Grey Goose 1.5L</span> <span className="font-mono text-[#c5a059]">6.850</span></li>
                                        <li className="flex justify-between"><span>Monkey 47</span> <span className="font-mono text-[#c5a059]">650 / 5.950</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Cocktails */}
                    <div className="space-y-8">
                        <div className="border-b border-[#c5a059]/30 pb-4">
                            <h3 className="text-xl font-medium tracking-widest text-[#c5a059] uppercase italic">Cocktails</h3>
                        </div>
                        <ul className="space-y-3">
                            {[
                                'Moscow Mule', 'Clover Club', 'Mojito', 'Margarita', 
                                'Whisky Sour', 'Negroni', 'Paloma', 'Old Fashioned'
                            ].map(item => (
                                <li key={item} className="flex justify-between items-center group">
                                    <span className="text-xs uppercase tracking-widest text-[#d4b9a8] group-hover:text-[#c5a059] transition-colors">{item}</span>
                                    <span className="text-xs font-mono text-[#c5a059]">{350}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Beer & Soft Drinks */}
                    <div className="space-y-8">
                        <div className="border-b border-[#c5a059]/30 pb-4">
                            <h3 className="text-xl font-medium tracking-widest text-[#c5a059] uppercase italic">Beer & Soft Drinks</h3>
                        </div>
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h4 className="text-[10px] uppercase tracking-[0.3em] text-[#c5a059]/40">Beer</h4>
                                    <ul className="space-y-3">
                                        <li className="flex justify-between text-xs uppercase tracking-widest"><span>Budweiser</span> <span className="font-mono text-[#c5a059]">210</span></li>
                                        <li className="flex justify-between text-xs uppercase tracking-widest"><span>Corona</span> <span className="font-mono text-[#c5a059]">210</span></li>
                                    </ul>
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-[10px] uppercase tracking-[0.3em] text-[#c5a059]/40">Soft Drinks</h4>
                                    <ul className="space-y-3">
                                        <li className="flex justify-between text-xs uppercase tracking-widest"><span>Evian 330ml</span> <span className="font-mono text-[#c5a059]">89</span></li>
                                        <li className="flex justify-between text-xs uppercase tracking-widest"><span>Coke / Light Coke</span> <span className="font-mono text-[#c5a059]">89</span></li>
                                        <li className="flex justify-between text-xs uppercase tracking-widest"><span>Sprite / Soda</span> <span className="font-mono text-[#c5a059]">89</span></li>
                                    </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-2xl mx-auto w-full text-center pt-8">
                  <p className="text-xs italic text-[#d4b9a8]/30">Prices are quoted in 1.000 VND and exclusive of 10% VAT & 10% Service Charge.</p>
                </div>
              </motion.section>
            )}

            {activeTab === 'events' && (
              <motion.section 
                key="events"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="pt-8 pb-24 px-6 max-w-7xl mx-auto min-h-[60vh] space-y-6"
              >
                <div className="text-center space-y-2">
                  <h2 className="text-4xl font-light tracking-tighter text-[#c5a059]">Events</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
        {[
          { date: 'WED, 1 April', title: 'Xinhderella Night', guest: 'Ladies Night', description: 'Experience the art of the pour with our master mixologists under the warm glow of velvet hues.', image: '/images/xinderellanight.png' },
          { date: 'Sat, 14 June', title: 'Spirituous Selection', guest: 'Dom Pérignon Host', description: 'An evening of rare vintages and premium spirits, hosted in our exclusive Clase Azul suite.' },
          { date: 'Fri, 27 June', title: 'Midnight Pulse', guest: 'European Support', description: 'A journey through light and sound across our recursive architectural landscapes.' }
        ].map((ev, i) => (
                      <div key={i} className="bg-[#2a1a14]/60 p-8 rounded-3xl border border-[#c5a059]/10 space-y-6 group hover:border-[#c5a059]/40 hover:bg-[#2a1a14]/80 transition-all duration-500 hover:-translate-y-1 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#c5a059]/5 blur-3xl -mr-16 -mt-16 group-hover:bg-[#c5a059]/10 transition-colors" />
                        
                        <div className="w-full aspect-[11/14] bg-[#1a0f0a] rounded-2xl overflow-hidden relative border border-[#c5a059]/5 flex items-center justify-center">
                            {ev.image ? (
                                <img 
                                    src={ev.image} 
                                    alt={ev.title}
                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    referrerPolicy="no-referrer"
                                />
                            ) : (
                                <div className="w-12 h-12 border border-[#c5a059]/10 rounded-full flex items-center justify-center">
                                    <div className="w-1 h-1 bg-[#c5a059]/20 rounded-full" />
                                </div>
                            )}
                           <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                           <div className="absolute bottom-6 left-6 right-6">
                              <p className="text-[10px] text-[#c5a059] uppercase tracking-widest font-bold mb-1">{ev.date}</p>
                              <h4 className="text-xl font-medium text-white tracking-tight">{ev.title}</h4>
                           </div>
                        </div>

                        <div className="space-y-3">
                          <p className="text-[10px] uppercase text-[#d4b9a8]/60 tracking-[0.2em]">{ev.guest}</p>
                          <p className="text-xs text-[#d4b9a8]/40 leading-relaxed font-light">{ev.description}</p>
                        </div>
                        
                        <button 
                          onClick={() => {
                            setActiveTab('main');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="w-full py-4 text-[10px] uppercase tracking-[0.3em] bg-white/5 border border-[#c5a059]/20 hover:border-[#c5a059] hover:bg-[#c5a059] hover:text-black transition-all font-bold rounded-xl"
                        >
                          Reserve Placement
                        </button>
                      </div>
                    ))}
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <footer className="pt-8 pb-24 px-6 border-t border-[#c5a059]/10 text-center">
          <div className="flex flex-col items-center gap-2">
            <div className="flex justify-center gap-8">
              <a 
                href={facebookUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#d4b9a8]/40 hover:text-[#c5a059] transition-colors flex items-center gap-2 group"
              >
                <Facebook className="w-5 h-5" />
                <span className="text-[10px] uppercase tracking-[0.2em] font-medium group-hover:tracking-[0.3em] transition-all">Facebook</span>
              </a>
              <a 
                href={instagramUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#d4b9a8]/40 hover:text-[#c5a059] transition-colors flex items-center gap-2 group"
              >
                <Instagram className="w-5 h-5" />
                <span className="text-[10px] uppercase tracking-[0.2em] font-medium group-hover:tracking-[0.3em] transition-all">Instagram</span>
              </a>
            </div>
            <div className="text-[9px] text-white/20 uppercase tracking-widest">
                © 2026 Fetti — Managed by Fetti C/O Sung.Yandy
            </div>
          </div>
        </footer>
      </motion.main>
    </div>
  );
}
