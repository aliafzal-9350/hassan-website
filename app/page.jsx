'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import {
    Phone,
    Mail,
    MapPin,
    ShieldCheck,
    Truck,
    Layers,
    ChevronRight,
    Send,
    Check,
    RotateCcw,
    Plane,
    Anchor,
    ArrowUpRight,
    CheckCircle2,
    Menu,
    X
} from 'lucide-react';

const TruckCanvas = dynamic(() => import('@/components/TruckCanvas'), {
    ssr: false,
    loading: () => (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#080C10] text-slate-400">
            <div className="w-10 h-10 border-2 border-sky-400 border-t-transparent rounded-full animate-spin mb-3" />
            <p className="text-xs font-mono tracking-widest text-slate-400 uppercase">INITIALIZING 3D FLEET ENGINE</p>
        </div>
    ),
});

const PRESETS = [
    { id: 'front', label: 'Front 3/4', tag: 'Dock High' },
    { id: 'side', label: 'Side Profile', tag: 'TSA & TWIC' },
    { id: 'rear', label: 'Rear Liftgate', tag: 'Maxon 3.3K lbs' },
];

export default function HomePage() {
    const [activePreset, setActivePreset] = useState('front');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        origin: '',
        destination: '',
        cargo: '',
        contact: '',
        liftgate: true,
        notes: '',
    });

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
    };

    return (
        <div className="min-h-screen bg-[#080C10] text-slate-100 font-sans antialiased selection:bg-sky-400 selection:text-slate-950">

            {/* 1. TOP UTILITY STATUS BAR */}
            <div className="bg-[#05080C] text-slate-400 text-xs py-2 px-4 sm:px-6 lg:px-10 border-b border-white/[0.06]">
                <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
                    <div className="flex items-center gap-4 sm:gap-6">
                        <a
                            href="tel:6469736672"
                            className="flex items-center gap-2 hover:text-white transition font-medium"
                        >
                            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse flex-shrink-0" />
                            <span className="text-slate-200 font-semibold text-xs">(646) 973-6672</span>
                            <span className="text-slate-600 hidden sm:inline">•</span>
                            <span className="text-slate-400 hidden sm:inline">(917) 814-6278</span>
                        </a>

                        <a
                            href="mailto:transport@ajamuumajalogistics.com"
                            className="hidden md:flex items-center gap-1.5 hover:text-slate-200 transition text-slate-400"
                        >
                            <Mail className="w-3.5 h-3.5 text-sky-400" />
                            <span>transport@ajamuumajalogistics.com</span>
                        </a>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-4 text-xs font-mono">
                        <span className="hidden lg:inline text-slate-400 font-sans">
                            Wilmington, DE • Operating Nationwide
                        </span>
                        <span className="text-sky-400 font-bold bg-sky-400/10 px-2 py-0.5 rounded border border-sky-400/20 sm:bg-transparent sm:p-0 sm:border-0">
                            MC# 1508261
                        </span>
                        <span className="text-slate-500 hidden sm:inline">•</span>
                        <span className="text-slate-300 hidden sm:inline">
                            2 Dedicated Power Units
                        </span>
                    </div>
                </div>
            </div>

            {/* 2. FROSTED MINIMAL NAVBAR & MOBILE DRAWER */}
            <header className="bg-[#080C10]/85 backdrop-blur-xl sticky top-0 z-50 border-b border-white/[0.06]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-16 sm:h-20 flex items-center justify-between">
                    {/* Typographic Wordmark */}
                    <a href="#hero" className="flex flex-col group">
                        <span className="text-lg sm:text-2xl font-black tracking-tight text-white leading-none uppercase group-hover:text-sky-400 transition-colors">
                            UMAJA LOGISTICS
                        </span>
                        <span className="text-[9px] sm:text-[10px] font-mono font-bold tracking-widest text-sky-400 mt-1 uppercase">
                            LLC • MC# 1508261
                        </span>
                    </a>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-8 text-xs font-bold uppercase tracking-wider text-slate-400">
                        <a href="#hero" className="text-white hover:text-sky-400 transition">3D Fleet</a>
                        <a href="#specs" className="hover:text-white transition">Specifications</a>
                        <a href="#compliance" className="hover:text-white transition">TSA / TWIC</a>
                        <a href="#contact" className="hover:text-white transition">Dispatch</a>
                    </nav>

                    {/* Right Hand Actions */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        <a
                            href="tel:6469736672"
                            className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] transition"
                        >
                            <Phone className="w-3.5 h-3.5 text-sky-400" />
                            <span>(646) 973-6672</span>
                        </a>
                        <a
                            href="#contact"
                            className="bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-black uppercase tracking-wider px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl transition shadow-lg shadow-sky-500/20 hover:shadow-sky-500/35 flex items-center gap-1.5"
                        >
                            <span>Dispatch Quote</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                        </a>

                        {/* Mobile Menu Toggle Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle navigation menu"
                            className="lg:hidden p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-slate-200 focus:outline-none"
                        >
                            {mobileMenuOpen ? <X className="w-5 h-5 text-sky-400" /> : <Menu className="w-5 h-5 text-slate-200" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Drawer */}
                {mobileMenuOpen && (
                    <div className="lg:hidden bg-[#080C10]/98 border-b border-white/[0.1] px-4 py-5 shadow-2xl backdrop-blur-2xl">
                        <div className="max-w-7xl mx-auto space-y-4">
                            <div className="grid grid-cols-2 gap-2">
                                <a
                                    href="#hero"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] text-xs font-bold text-slate-200 uppercase tracking-wide transition"
                                >
                                    <Truck className="w-4 h-4 text-sky-400" />
                                    <span>3D Fleet</span>
                                </a>
                                <a
                                    href="#specs"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] text-xs font-bold text-slate-200 uppercase tracking-wide transition"
                                >
                                    <Layers className="w-4 h-4 text-sky-400" />
                                    <span>Specifications</span>
                                </a>
                                <a
                                    href="#compliance"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] text-xs font-bold text-slate-200 uppercase tracking-wide transition"
                                >
                                    <ShieldCheck className="w-4 h-4 text-sky-400" />
                                    <span>TSA / TWIC</span>
                                </a>
                                <a
                                    href="#contact"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center gap-2.5 p-3 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 text-xs font-bold text-sky-400 uppercase tracking-wide transition"
                                >
                                    <Send className="w-4 h-4 text-sky-400" />
                                    <span>Fast Quote</span>
                                </a>
                            </div>

                            {/* Direct Call & Dispatch Details in Drawer */}
                            <div className="pt-3 border-t border-white/[0.06] space-y-2">
                                <span className="text-[10px] font-mono uppercase font-bold text-slate-500 tracking-wider block">
                                    24/7 Direct Carrier Dispatch
                                </span>
                                <div className="flex flex-col gap-2">
                                    <a
                                        href="tel:6469736672"
                                        className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs font-bold text-white hover:border-sky-500/40 transition"
                                    >
                                        <div className="flex items-center gap-2">
                                            <Phone className="w-4 h-4 text-sky-400" />
                                            <span>(646) 973-6672</span>
                                        </div>
                                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">PRIMARY</span>
                                    </a>
                                    <a
                                        href="tel:9178146278"
                                        className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs font-bold text-slate-300 hover:border-sky-500/40 transition"
                                    >
                                        <div className="flex items-center gap-2">
                                            <Phone className="w-4 h-4 text-slate-400" />
                                            <span>(917) 814-6278</span>
                                        </div>
                                        <span className="text-[10px] font-mono text-slate-400">ALT</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </header>

            {/* 3. HERO SECTION (DUAL EXPERIENCE: FULL-BLEED DESKTOP & DEDICATED MOBILE STAGE) */}
            
            {/* 3A. DESKTOP HERO (lg and above) */}
            <section id="hero" className="hidden lg:flex relative w-full h-[calc(100vh-112px)] min-h-[620px] max-h-[920px] flex-col justify-between overflow-hidden">
                {/* Background 3D Viewport Layer */}
                <div className="absolute inset-0 z-0">
                    <TruckCanvas activePreset={activePreset} />
                    <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-[#080C10]/85 pointer-events-none" />
                </div>

                {/* Hero Editorial Overlay */}
                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 pt-10 sm:pt-14 pointer-events-none flex-1 flex flex-col justify-center">
                    <div className="max-w-2xl space-y-5">
                        <div className="space-y-0 text-white font-black tracking-tight leading-[0.92] uppercase text-6xl xl:text-7xl">
                            <div>PRECISION</div>
                            <div>EXPEDITED</div>
                            <div className="bg-gradient-to-r from-sky-400 to-cyan-200 bg-clip-text text-transparent">
                                FREIGHT.
                            </div>
                        </div>

                        <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-lg font-medium pt-1">
                            UMAJA LOGISTICS LLC delivers commercial 26ft dock-high straight box transport with heavy-duty Maxon liftgate operations. TSA Change 10 and TWIC credentialed for high-security corridors nationwide.
                        </p>

                        <div className="flex flex-wrap items-center gap-3.5 pt-2 pointer-events-auto">
                            <a
                                href="#contact"
                                className="bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs sm:text-sm font-black uppercase tracking-wider px-7 py-3.5 rounded-xl transition shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 flex items-center gap-2"
                            >
                                <span>Book Dedicated Run</span>
                                <ChevronRight className="w-4 h-4" />
                            </a>
                            <a
                                href="tel:6469736672"
                                className="bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md border border-white/[0.1] text-slate-200 text-xs sm:text-sm font-bold px-5 py-3.5 rounded-xl transition flex items-center gap-2"
                            >
                                <Phone className="w-4 h-4 text-sky-400" />
                                <span>Direct Dispatch: (646) 973-6672</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Floating View Controller Dock (Bottom) */}
                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 pb-8 pointer-events-none flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400 pointer-events-auto">
                        <RotateCcw className="w-3.5 h-3.5 text-sky-400" />
                        <span>INTERACTIVE 3D • DRAG TO ROTATE</span>
                    </div>

                    <div className="p-1 rounded-full bg-slate-950/80 backdrop-blur-xl border border-white/[0.1] shadow-2xl flex items-center gap-1 pointer-events-auto">
                        {PRESETS.map((preset) => (
                            <button
                                key={preset.id}
                                onClick={() => setActivePreset(preset.id)}
                                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${activePreset === preset.id
                                    ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/30'
                                    : 'text-slate-400 hover:text-white hover:bg-white/[0.03]'
                                    }`}
                            >
                                <span>{preset.label}</span>
                                <span className="text-[10px] opacity-70 font-mono hidden sm:inline">({preset.tag})</span>
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                        <span>USDOT / MC# 1508261</span>
                    </div>
                </div>
            </section>

            {/* 3B. MOBILE & TABLET HERO (< lg) */}
            <section className="lg:hidden py-8 sm:py-12 px-4 sm:px-6 max-w-7xl mx-auto space-y-6">
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-[11px] font-mono font-bold tracking-wider uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
                        <span>DEDICATED EXPEDITED FLEET</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight leading-[0.95]">
                        <div>PRECISION</div>
                        <div>EXPEDITED</div>
                        <div className="bg-gradient-to-r from-sky-400 to-cyan-200 bg-clip-text text-transparent">
                            FREIGHT.
                        </div>
                    </h1>

                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-lg font-medium">
                        UMAJA LOGISTICS LLC delivers commercial 26ft dock-high straight box transport with heavy-duty Maxon liftgate operations. TSA Change 10 and TWIC credentialed for high-security corridors nationwide.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                        <a
                            href="#contact"
                            className="bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-black uppercase tracking-wider px-6 py-3.5 rounded-xl transition shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2"
                        >
                            <span>Book Dedicated Run</span>
                            <ChevronRight className="w-4 h-4" />
                        </a>
                        <a
                            href="tel:6469736672"
                            className="bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-slate-200 text-xs font-bold px-4 py-3.5 rounded-xl transition flex items-center justify-center gap-2"
                        >
                            <Phone className="w-4 h-4 text-sky-400" />
                            <span>Direct Dispatch: (646) 973-6672</span>
                        </a>
                    </div>
                </div>

                {/* Mobile Dedicated 3D Interactive Stage */}
                <div className="relative w-full rounded-2xl sm:rounded-3xl bg-[#05080C] border border-white/[0.08] overflow-hidden shadow-2xl p-2 sm:p-3">
                    <div className="relative w-full h-[320px] sm:h-[380px] rounded-xl sm:rounded-2xl overflow-hidden bg-radial-grid">
                        <TruckCanvas activePreset={activePreset} />

                        {/* Top Badge Overlay */}
                        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md border border-white/[0.08] text-[10px] font-mono text-sky-400 pointer-events-none">
                            <RotateCcw className="w-3 h-3 text-sky-400" />
                            <span>DRAG TRUCK TO ROTATE</span>
                        </div>
                    </div>

                    {/* Mobile Preset Dock */}
                    <div className="mt-2.5 p-1 rounded-xl bg-slate-950/90 border border-white/[0.08] flex items-center justify-between gap-1">
                        {PRESETS.map((preset) => (
                            <button
                                key={preset.id}
                                onClick={() => setActivePreset(preset.id)}
                                className={`flex-1 py-2 px-1 rounded-lg text-[11px] font-bold transition-all text-center ${activePreset === preset.id
                                    ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20'
                                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                                    }`}
                            >
                                <span>{preset.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. STRUCTURED FLEET SPECIFICATIONS STRIP */}
            <section id="specs" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto border-t border-white/[0.06]">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-4">
                    <div>
                        <span className="text-xs font-mono font-bold uppercase tracking-widest text-sky-400 block mb-1">
                            ENGINEERING & CAPACITY
                        </span>
                        <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
                            Commercial Fleet Specifications
                        </h2>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-400 max-w-md font-medium">
                        Configured for rapid warehouse dock loading, ground-level liftgate operations, and restricted airport/port facilities.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                    {/* Card 1 */}
                    <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-sky-500/40 transition-all group">
                        <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                            <Truck className="w-5 h-5" />
                        </div>
                        <h3 className="text-base font-bold text-white mb-1">26ft Straight Box</h3>
                        <p className="text-xs text-slate-400 leading-relaxed mb-4">
                            10-12 standard pallet capacity with hardwood floors, scuff liners, and air-ride cargo protection.
                        </p>
                        <div className="space-y-2 text-xs border-t border-white/[0.06] pt-3 text-slate-300">
                            <div className="flex justify-between">
                                <span className="text-slate-500">Dimensions</span>
                                <span className="font-semibold text-slate-200">26ft × 102" × 102"</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">Volume</span>
                                <span className="font-semibold text-slate-200">~1,800 cu. ft</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">Payload</span>
                                <span className="font-semibold text-slate-200">10,000+ lbs</span>
                            </div>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-sky-500/40 transition-all group">
                        <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                            <Layers className="w-5 h-5" />
                        </div>
                        <h3 className="text-base font-bold text-white mb-1">Maxon Liftgate</h3>
                        <p className="text-xs text-slate-400 leading-relaxed mb-4">
                            Commercial heavy-duty hydraulic platform enabling autonomous ground-level delivery without a loading dock.
                        </p>
                        <div className="space-y-2 text-xs border-t border-white/[0.06] pt-3 text-slate-300">
                            <div className="flex justify-between">
                                <span className="text-slate-500">Lift Rating</span>
                                <span className="font-semibold text-slate-200">3,300+ lbs Hydraulic</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">Equipment</span>
                                <span className="font-semibold text-slate-200">Pallet Jack Onboard</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">Securing</span>
                                <span className="font-semibold text-slate-200">E-Tracks & Straps</span>
                            </div>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-sky-500/40 transition-all group">
                        <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                            <ShieldCheck className="w-5 h-5" />
                        </div>
                        <h3 className="text-base font-bold text-white mb-1">TSA & Port TWIC</h3>
                        <p className="text-xs text-slate-400 leading-relaxed mb-4">
                            Vetted for air cargo transfers, IAC air freight, and unescorted maritime container seaport access.
                        </p>
                        <div className="space-y-2 text-xs border-t border-white/[0.06] pt-3 text-slate-300">
                            <div className="flex justify-between">
                                <span className="text-slate-500">Aviation</span>
                                <span className="font-semibold text-slate-200">TSA Change 10</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">Maritime</span>
                                <span className="font-semibold text-slate-200">TWIC Card Approved</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">Access</span>
                                <span className="font-semibold text-slate-200">Port & Airport Ramps</span>
                            </div>
                        </div>
                    </div>

                    {/* Card 4 */}
                    <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-sky-500/40 transition-all group">
                        <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                            <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <h3 className="text-base font-bold text-white mb-1">2 Power Units</h3>
                        <p className="text-xs text-slate-400 leading-relaxed mb-4">
                            Dedicated power units with 24/7 telematics, live GPS status, and instant digital POD delivery.
                        </p>
                        <div className="space-y-2 text-xs border-t border-white/[0.06] pt-3 text-slate-300">
                            <div className="flex justify-between">
                                <span className="text-slate-500">Authority</span>
                                <span className="font-semibold text-slate-200">MC# 1508261</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">Cargo Coverage</span>
                                <span className="font-semibold text-slate-200">$100K+ Insured</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">Liability</span>
                                <span className="font-semibold text-slate-200">$1,000,000 Auto</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. SECURITY & COMPLIANCE SECTION */}
            <section id="compliance" className="py-14 sm:py-16 bg-[#06090D] border-y border-white/[0.06]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-center">
                        <div className="lg:col-span-6 space-y-4">
                            <span className="text-xs font-mono font-bold uppercase tracking-widest text-sky-400">
                                SECURITY & COMPLIANCE
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                                High-Security Port & Airport Clearances
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                                Complete federal compliance and authorization for secure aviation ramps, maritime marine terminals, and bonded transport corridors.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <Plane className="w-4 h-4 text-sky-400" />
                                        <h4 className="text-xs font-bold text-white uppercase">TSA Certified Change 10</h4>
                                    </div>
                                    <p className="text-[11px] text-slate-400 leading-relaxed">
                                        Authorized for indirect air carrier (IAC) freight, airport transfer ramps, and strict custody protocols.
                                    </p>
                                </div>
                                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <Anchor className="w-4 h-4 text-sky-400" />
                                        <h4 className="text-xs font-bold text-white uppercase">TWIC Card Approved</h4>
                                    </div>
                                    <p className="text-[11px] text-slate-400 leading-relaxed">
                                        Unescorted access to maritime container ports, marine terminals, and restricted corridors.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right: Carrier Verification Summary */}
                        <div className="lg:col-span-6 p-5 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
                            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-5">
                                <div>
                                    <span className="text-[10px] font-mono uppercase font-bold text-sky-400 tracking-wider">
                                        CARRIER VERIFICATION FILE
                                    </span>
                                    <h3 className="text-base sm:text-lg font-black text-white mt-0.5">UMAJA LOGISTICS LLC</h3>
                                </div>
                                <span className="text-[10px] sm:text-[11px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-md">
                                    ACTIVE & INSURED
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-3 text-xs">
                                <div className="p-3 sm:p-3.5 rounded-xl bg-black/40 border border-white/[0.04]">
                                    <span className="text-slate-500 text-[11px] block">Motor Carrier</span>
                                    <span className="text-white font-mono font-bold block mt-0.5">MC# 1508261</span>
                                </div>
                                <div className="p-3 sm:p-3.5 rounded-xl bg-black/40 border border-white/[0.04]">
                                    <span className="text-slate-500 text-[11px] block">Cargo Insurance</span>
                                    <span className="text-white font-mono font-bold block mt-0.5">$100,000+ Active</span>
                                </div>
                                <div className="p-3 sm:p-3.5 rounded-xl bg-black/40 border border-white/[0.04]">
                                    <span className="text-slate-500 text-[11px] block">Power Units</span>
                                    <span className="text-white font-mono font-bold block mt-0.5">2 Dedicated Units</span>
                                </div>
                                <div className="p-3 sm:p-3.5 rounded-xl bg-black/40 border border-white/[0.04]">
                                    <span className="text-slate-500 text-[11px] block">Auto Liability</span>
                                    <span className="text-white font-mono font-bold block mt-0.5">$1,000,000</span>
                                </div>
                            </div>

                            <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                                <span className="text-xs text-slate-400">Carrier Packet & COI ready for dispatch</span>
                                <a
                                    href="mailto:transport@ajamuumajalogistics.com?subject=Carrier%20Packet%20Request%20-%20MC%201508261"
                                    className="text-xs font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1 transition"
                                >
                                    <span>Request Packet</span>
                                    <ArrowUpRight className="w-3.5 h-3.5" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. DISPATCH & RATE CONFIRMATION SECTION */}
            <section id="contact" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-center">

                    {/* Left Column: Direct Dispatch Contacts */}
                    <div className="lg:col-span-5 space-y-6">
                        <div>
                            <span className="text-xs font-mono font-bold uppercase tracking-widest text-sky-400">
                                24/7 DIRECT DISPATCH
                            </span>
                            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight mt-1 mb-3">
                                Ready to Move Your Load?
                            </h2>
                            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                                Direct carrier dispatch, dedicated expedited runs, and instant rate confirmation with zero broker delays.
                            </p>
                        </div>

                        <div className="space-y-3.5">
                            <a
                                href="tel:6469736672"
                                className="block p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-sky-500/40 transition group"
                            >
                                <div className="flex items-center gap-3.5">
                                    <div className="w-10 h-10 rounded-xl bg-sky-500 text-slate-950 flex items-center justify-center shadow-lg shadow-sky-500/25 flex-shrink-0 group-hover:scale-105 transition-transform">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                                            Primary Dispatch Line
                                        </span>
                                        <span className="text-base sm:text-lg font-black text-white group-hover:text-sky-400 transition">
                                            (646) 973-6672
                                        </span>
                                        <span className="text-xs text-slate-500 block">Alt: (917) 814-6278</span>
                                    </div>
                                </div>
                            </a>

                            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
                                <div className="flex items-center gap-3.5">
                                    <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/[0.08] text-sky-400 flex items-center justify-center flex-shrink-0">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div className="min-w-0">
                                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                                            Rate Cons & Dispatch Emails
                                        </span>
                                        <a
                                            href="mailto:transport@ajamuumajalogistics.com"
                                            className="text-xs sm:text-sm font-bold text-slate-200 hover:text-sky-400 transition block truncate"
                                        >
                                            transport@ajamuumajalogistics.com
                                        </a>
                                        <a
                                            href="mailto:OSBORNEAUTOTRANSPORT@gmail.com"
                                            className="text-[11px] text-slate-400 hover:text-sky-400 transition block mt-0.5 truncate"
                                        >
                                            OSBORNEAUTOTRANSPORT@gmail.com
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
                                <div className="flex items-center gap-3.5">
                                    <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/[0.08] text-slate-300 flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div className="text-xs">
                                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                                            Corporate Dispatch Office
                                        </span>
                                        <p className="font-bold text-slate-200 mt-0.5">3422 Old Capitol Trl, STE 4086</p>
                                        <p className="text-slate-500">Wilmington, DE 19808</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Rate Confirmation Form */}
                    <div className="lg:col-span-7 p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-white/[0.08] shadow-2xl">
                        <div className="flex items-center justify-between mb-5">
                            <div>
                                <h3 className="text-lg sm:text-xl font-black text-white uppercase">Rapid Rate Confirmation</h3>
                                <p className="text-xs text-slate-400 mt-0.5">Direct carrier quote dispatched within 15 minutes.</p>
                            </div>
                            <span className="bg-sky-500/10 border border-sky-500/20 text-sky-400 px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold">
                                24/7 STATUS
                            </span>
                        </div>

                        {isSubmitted ? (
                            <div className="p-6 sm:p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-3">
                                <div className="w-12 h-12 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center mx-auto">
                                    <Check className="w-6 h-6" />
                                </div>
                                <h4 className="text-base font-bold text-white">Freight Details Received</h4>
                                <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                                    Our dispatch team is reviewing your lane now. For immediate live booking, call{' '}
                                    <a href="tel:6469736672" className="text-sky-400 font-bold underline">
                                        (646) 973-6672
                                    </a>.
                                </p>
                                <button
                                    onClick={() => setIsSubmitted(false)}
                                    className="text-xs font-semibold text-slate-400 hover:text-white underline pt-1"
                                >
                                    Submit another request
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleFormSubmit} className="space-y-3.5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                                            Origin (City or Zip) *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="Wilmington, DE"
                                            value={formData.origin}
                                            onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                                            className="w-full bg-black/40 border border-white/[0.08] rounded-xl px-3.5 py-3 sm:py-2.5 text-base sm:text-xs text-white placeholder:text-slate-600 focus:border-sky-400 outline-none transition"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                                            Destination (City or Zip) *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="Newark, NJ"
                                            value={formData.destination}
                                            onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                                            className="w-full bg-black/40 border border-white/[0.08] rounded-xl px-3.5 py-3 sm:py-2.5 text-base sm:text-xs text-white placeholder:text-slate-600 focus:border-sky-400 outline-none transition"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                                            Pallet Count & Weight *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="8 Pallets / 6,500 lbs"
                                            value={formData.cargo}
                                            onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
                                            className="w-full bg-black/40 border border-white/[0.08] rounded-xl px-3.5 py-3 sm:py-2.5 text-base sm:text-xs text-white placeholder:text-slate-600 focus:border-sky-400 outline-none transition"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                                            Broker Phone / Email *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="Phone or rate con email"
                                            value={formData.contact}
                                            onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                                            className="w-full bg-black/40 border border-white/[0.08] rounded-xl px-3.5 py-3 sm:py-2.5 text-base sm:text-xs text-white placeholder:text-slate-600 focus:border-sky-400 outline-none transition"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-black/30 border border-white/[0.06]">
                                    <input
                                        type="checkbox"
                                        id="liftgateCheck"
                                        checked={formData.liftgate}
                                        onChange={(e) => setFormData({ ...formData, liftgate: e.target.checked })}
                                        className="w-4 h-4 rounded text-sky-500 bg-slate-900 border-white/20 focus:ring-0 cursor-pointer"
                                    />
                                    <label htmlFor="liftgateCheck" className="text-xs text-slate-300 font-medium cursor-pointer">
                                        Maxon Hydraulic Liftgate & Pallet Jack Required
                                    </label>
                                </div>

                                <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-sky-500 hover:bg-sky-400 text-slate-950 font-black py-3.5 px-5 rounded-xl text-xs uppercase tracking-wider transition shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2"
                                    >
                                        <Send className="w-3.5 h-3.5" />
                                        <span>Submit Freight Request</span>
                                    </button>
                                    <a
                                        href={`mailto:transport@ajamuumajalogistics.com?subject=Freight%20Quote%20Inquiry&body=Origin:%20${encodeURIComponent(formData.origin)}%0ADestination:%20${encodeURIComponent(formData.destination)}%0APallets:%20${encodeURIComponent(formData.cargo)}%0ALiftgate:%20${formData.liftgate ? 'Yes' : 'No'}%0AContact:%20${encodeURIComponent(formData.contact)}`}
                                        className="bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.08] text-slate-200 text-xs font-semibold px-4 py-3.5 rounded-xl transition flex items-center justify-center gap-1.5"
                                    >
                                        <Mail className="w-3.5 h-3.5 text-sky-400" />
                                        <span>Direct Email</span>
                                    </a>
                                </div>
                            </form>
                        )}
                    </div>

                </div>
            </section>

            {/* 7. PROFESSIONAL ENTERPRISE FOOTER */}
            <footer className="bg-[#04070A] text-slate-400 py-12 sm:py-14 px-4 sm:px-6 lg:px-10 border-t border-white/[0.06]">
                <div className="max-w-7xl mx-auto space-y-8 sm:space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* Legal Entity & Authority */}
                        <div className="md:col-span-2 space-y-3">
                            <div className="flex flex-col">
                                <span className="text-xl font-black text-white tracking-tight uppercase">
                                    UMAJA LOGISTICS LLC
                                </span>
                                <span className="text-xs font-mono font-bold text-sky-400 mt-0.5">
                                    USDOT / MC# 1508261
                                </span>
                            </div>
                            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
                                Professional commercial freight transportation specializing in 26ft dock-high straight box truck operations, heavy-duty Maxon liftgate deliveries, and TSA Change 10 / TWIC approved high-security corridors.
                            </p>
                            <div className="flex items-center gap-3 pt-1 text-xs font-mono">
                                <span className="bg-sky-500/10 text-sky-400 px-2.5 py-0.5 rounded font-bold">
                                    2 Power Units
                                </span>
                                <span className="text-slate-500">•</span>
                                <span className="text-slate-300">
                                    $100K+ Cargo • $1M Liability
                                </span>
                            </div>
                        </div>

                        {/* Direct Contact */}
                        <div className="space-y-3 text-xs">
                            <h4 className="text-xs font-black text-white uppercase tracking-widest">
                                Dispatch & Operations
                            </h4>
                            <ul className="space-y-2">
                                <li>
                                    <a href="tel:6469736672" className="hover:text-sky-400 transition font-bold text-white block">
                                        (646) 973-6672
                                    </a>
                                </li>
                                <li>
                                    <a href="tel:9178146278" className="hover:text-sky-400 transition block">
                                        (917) 814-6278
                                    </a>
                                </li>
                                <li>
                                    <a href="mailto:transport@ajamuumajalogistics.com" className="hover:text-sky-400 transition block truncate">
                                        transport@ajamuumajalogistics.com
                                    </a>
                                </li>
                                <li>
                                    <a href="mailto:OSBORNEAUTOTRANSPORT@gmail.com" className="hover:text-sky-400 transition block truncate">
                                        OSBORNEAUTOTRANSPORT@gmail.com
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Physical Address & Compliance */}
                        <div className="space-y-3 text-xs">
                            <h4 className="text-xs font-black text-white uppercase tracking-widest">
                                Headquarters & Authority
                            </h4>
                            <p className="text-slate-400 leading-relaxed">
                                3422 Old Capitol Trl, STE 4086<br />
                                Wilmington, DE 19808<br />
                                United States
                            </p>
                            <p className="text-[11px] text-slate-500">
                                Port drayage, airport expedited freight, pallet & liftgate ground services, 24/7 dispatch status.
                            </p>
                        </div>
                    </div>

                    <div className="pt-6 sm:pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500 text-center sm:text-left">
                        <p>© {new Date().getFullYear()} UMAJA LOGISTICS LLC. All rights reserved. Registered with FMCSA MC# 1508261.</p>
                        <div className="flex flex-wrap justify-center sm:justify-end items-center gap-4 sm:gap-6 font-mono text-[10px] sm:text-[11px]">
                            <span>TSA CHANGE 10</span>
                            <span>TWIC CARD APPROVED</span>
                            <span>DOCK HIGH & LIFTGATE</span>
                        </div>
                    </div>
                </div>
            </footer>

        </div>
    );
}