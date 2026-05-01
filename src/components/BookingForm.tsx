import { motion } from 'motion/react';
import { MessageCircle, Send, Check, Calendar, Instagram, Facebook, Globe } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Table } from './TableMap';

interface BookingFormProps {
  selectedTable: Table | null;
  allTables: Table[];
}

export default function BookingForm({ selectedTable, allTables }: BookingFormProps) {
  const today = new Date().toISOString().split('T')[0];
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    date: '',
    guests: '',
    budget: '',
    preferredTable: '',
    referral: '',
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (selectedTable) {
        setFormData(prev => ({ ...prev, preferredTable: selectedTable.name }));
    }
  }, [selectedTable]);

  const whatsappLink = () => {
    const message = `Booking Request — FettiSGN\nName: ${formData.name || '-'}\nDate: ${formData.date || '-'}\nGuests: ${formData.guests || '-'}\nPreferred Table: ${formData.preferredTable || selectedTable?.name || '-'}\nBudget: ${formData.budget || '-'}\nConcierge/Referral: ${formData.referral || 'None'}`;
    return `https://wa.me/61493247133?text=${encodeURIComponent(message)}`;
  };

  const isFormValid = formData.name.trim() !== '' && 
                      formData.whatsapp.trim() !== '' && 
                      formData.date !== '' && 
                      formData.guests !== '';

  const handleWhatsAppClick = () => {
    if (!isFormValid) {
        alert("Please fill in all required fields (Name, WhatsApp, Date, and Guests).");
        return;
    }
    window.open(whatsappLink(), '_blank');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleWhatsAppClick();
  };

  return (
    <section id="booking" className="py-12 md:py-20 px-6 max-w-2xl mx-auto space-y-12 md:space-y-16">
      <div className="space-y-8 md:space-y-12">
        <div className="text-left space-y-3 md:space-y-4">
          <h2 className="text-3xl md:text-6xl font-light tracking-tighter text-[#c5a059]">Request Placement</h2>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 relative p-6 md:p-8 bg-[#2a1a14] border border-[#c5a059]/10 rounded-2xl shadow-xl">
          <div className="space-y-1.5 focus-within:text-[#c5a059] transition-colors">
            <label className="text-[10px] uppercase tracking-widest text-[#c5a059]/40 px-1 font-bold italic">Name *</label>
            <input 
                type="text" 
                required
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                placeholder="Full Name"
                className="w-full bg-transparent border-b border-[#c5a059]/20 py-3 text-[#d4b9a8] text-sm focus:outline-none focus:border-[#c5a059] transition-all placeholder:text-[#d4b9a8]/10"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-widest text-[#c5a059]/40 px-1 font-bold italic">WhatsApp *</label>
            <input 
                type="tel" 
                required
                value={formData.whatsapp}
                onChange={e => setFormData({...formData, whatsapp: e.target.value})}
                placeholder="Contact Number"
                className="w-full bg-transparent border-b border-[#c5a059]/20 py-3 text-[#d4b9a8] text-sm focus:outline-none focus:border-[#c5a059] transition-all placeholder:text-[#d4b9a8]/10"
            />
          </div>

          <div className="space-y-1.5 focus-within:text-[#c5a059] transition-colors relative group">
            <label className="text-[10px] uppercase tracking-widest text-[#c5a059]/40 px-1 font-bold italic">Date *</label>
            <div className="relative">
              <input 
                  type="date" 
                  required
                  min={today}
                  value={formData.date}
                  onChange={e => setFormData({...formData, date: e.target.value})}
                  className="w-full bg-transparent border-b border-[#c5a059]/20 py-3 pr-10 text-[#d4b9a8] text-sm focus:outline-none focus:border-[#c5a059] transition-all [color-scheme:dark] cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0"
              />
              <Calendar className="absolute right-0 bottom-3 w-4 h-4 text-[#c5a059]/40 group-focus-within:text-[#c5a059] transition-colors pointer-events-none" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-widest text-[#c5a059]/40 px-1 font-bold italic">Guests *</label>
            <select 
                required
                value={formData.guests}
                onChange={e => setFormData({...formData, guests: e.target.value})}
                className="w-full bg-transparent border-b border-[#c5a059]/20 py-3 text-[#d4b9a8] text-sm focus:outline-none focus:border-[#c5a059] transition-all appearance-none"
            >
                <option value="" disabled className="bg-[#1a0f0a]">Select Size</option>
                <option value="2-4" className="bg-[#1a0f0a]">2-4 Guests</option>
                <option value="5-8" className="bg-[#1a0f0a]">5-8 Guests</option>
                <option value="9-12" className="bg-[#1a0f0a]">9-12 Guests</option>
                <option value="12+" className="bg-[#1a0f0a]">12+ Guests</option>
            </select>
          </div>

          <div className="space-y-1.5 focus-within:text-[#c5a059] transition-colors relative group">
            <label className="text-[10px] uppercase tracking-widest text-[#c5a059]/40 px-1 font-bold italic">Preferred Table</label>
            <div className="relative">
              <select 
                value={formData.preferredTable || selectedTable?.name || ''}
                onChange={e => setFormData({...formData, preferredTable: e.target.value})}
                className="w-full bg-transparent border-b border-[#c5a059]/20 py-3 text-[#d4b9a8] text-sm focus:outline-none focus:border-[#c5a059] transition-all appearance-none cursor-pointer"
              >
                <option value="" disabled className="bg-[#1a0f0a]">Select Position</option>
                {allTables.map(t => (
                  <option key={t.id} value={t.name} className="bg-[#1a0f0a]">{t.name} ({t.tier})</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1.5 focus-within:text-[#c5a059] transition-colors">
            <label className="text-[10px] uppercase tracking-widest text-[#c5a059]/40 px-1 font-bold italic">Concierge or Referral (Optional)</label>
            <input 
                type="text" 
                value={formData.referral}
                onChange={e => setFormData({...formData, referral: e.target.value})}
                placeholder="Mention Referral Name"
                className="w-full bg-transparent border-b border-[#c5a059]/20 py-3 text-[#d4b9a8] text-sm focus:outline-none focus:border-[#c5a059] transition-all placeholder:text-[#d4b9a8]/10"
            />
          </div>

          <div className="space-y-1.5 focus-within:text-[#c5a059] transition-colors">
            <label className="text-[10px] uppercase tracking-widest text-[#c5a059]/40 px-1 font-bold italic">Inquiry Details</label>
            <select 
                value={formData.budget}
                onChange={e => setFormData({...formData, budget: e.target.value})}
                className="w-full bg-transparent border-b border-[#c5a059]/20 py-3 text-[#d4b9a8] text-sm focus:outline-none focus:border-[#c5a059] transition-all appearance-none"
            >
                <option value="" className="bg-[#1a0f0a]">Preferred Package</option>
                <option value="Bottle Service" className="bg-[#1a0f0a]">Bottle Service</option>
                <option value="Event Inquiry" className="bg-[#1a0f0a]">Event Inquiry</option>
                <option value="High Volume" className="bg-[#1a0f0a]">High Volume Group</option>
            </select>
          </div>

          <div className="md:col-span-2 pt-8">
            <button
                type="submit"
                className={`w-full py-5 rounded-sm flex items-center justify-center gap-3 transition-all ${
                    isFormValid 
                    ? 'bg-[#c5a059] text-black hover:bg-[#d4b9a8]' 
                    : 'bg-[#c5a059]/20 text-[#c5a059]/40 cursor-not-allowed border border-[#c5a059]/10'
                }`}
            >
                <MessageCircle className="w-4 h-4 flex-shrink-0" />
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] font-bold whitespace-nowrap">Request Fetti Reservation</span>
            </button>
          </div>
        </form>


      </div>
    </section>
  );
}
