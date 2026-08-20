'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Home, Coffee, Sparkles, CloudRain, Sun } from 'lucide-react'

export default function NotFound() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-r from-sky-200 via-sky-100 via-amber-100 to-amber-200 text-slate-800 flex flex-col justify-between items-center px-4 sm:px-6 py-10 md:py-16">
      {/* =========================================================
         1. DUAL WEATHER ATMOSPHERE BACKGROUND (RAINY LEFT + SUNNY RIGHT)
      ========================================================= */}

      {/* LEFT SIDE: COOL RAINY CLOUD GLOWS */}
      <div className="absolute top-[-10%] left-[-10%] h-[500px] sm:h-[600px] w-[500px] sm:w-[600px] rounded-full bg-slate-400/30 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-5%] h-[400px] sm:h-[500px] w-[400px] sm:w-[500px] rounded-full bg-sky-500/25 blur-[140px] pointer-events-none" />

      {/* RIGHT SIDE: WARM SUNSHINE GLOWS */}
      <div className="absolute top-[-10%] right-[-10%] h-[500px] sm:h-[600px] w-[500px] sm:w-[600px] rounded-full bg-amber-300/40 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[10%] h-[500px] sm:h-[600px] w-[500px] sm:w-[600px] rounded-full bg-orange-300/35 blur-[140px] pointer-events-none" />

      {/* =========================================================
         2. ANIMATED WEATHER ELEMENTS (RAIN DROPS + FLYING BIRDS)
      ========================================================= */}

      {/* LEFT WEATHER: ANIMATED RAINDROPS & STORM CLOUDS */}
      <div className="absolute top-0 left-0 w-1/2 h-full pointer-events-none z-10 overflow-hidden opacity-70">
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={`drop-${i}`}
            initial={{ y: -20, opacity: 0 }}
            animate={{
              y: ['0vh', '100vh'],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 1.2 + (i % 5) * 0.3,
              repeat: Infinity,
              ease: 'linear',
              delay: (i % 7) * 0.2,
            }}
            style={{
              left: `${i * 5.5 + 2}%`,
            }}
            className="absolute w-[2px] h-8 sm:h-12 bg-gradient-to-b from-transparent via-sky-400 to-sky-600 rounded-full"
          />
        ))}

        {/* Rain Cloud Icon Floating */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-10 left-8 sm:left-16 text-slate-500/40"
        >
          <CloudRain className="w-20 h-20 sm:w-28 sm:h-28" />
        </motion.div>
      </div>

      {/* RIGHT WEATHER: ANIMATED SUN & FLYING BIRDS */}
      <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none z-20 overflow-hidden">
        {/* Glowing Sun */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="absolute top-8 right-8 sm:right-16 text-amber-400/50"
        >
          <Sun className="w-24 h-24 sm:w-32 sm:h-32" />
        </motion.div>

        {/* Bird 1 */}
        <motion.div
          initial={{ x: '0vw', y: 40 }}
          animate={{
            x: '60vw',
            y: [40, 20, 50, 30],
          }}
          transition={{
            x: { duration: 16, repeat: Infinity, ease: 'linear' },
            y: { duration: 4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
          }}
          className="absolute top-12 left-10"
        >
          <svg className="w-6 h-6 sm:w-8 sm:h-8 fill-amber-700" viewBox="0 0 50 50">
            <path d="M 0 20 Q 15 5, 25 20 Q 35 5, 50 20 Q 35 12, 25 22 Q 15 12, 0 20 Z">
              <animate
                attributeName="d"
                dur="0.6s"
                repeatCount="indefinite"
                values="
                  M 0 20 Q 15 5, 25 20 Q 35 5, 50 20 Q 35 12, 25 22 Q 15 12, 0 20 Z;
                  M 0 10 Q 15 25, 25 20 Q 35 25, 50 10 Q 35 18, 25 22 Q 15 18, 0 10 Z;
                  M 0 20 Q 15 5, 25 20 Q 35 5, 50 20 Q 35 12, 25 22 Q 15 12, 0 20 Z
                "
              />
            </path>
          </svg>
        </motion.div>
      </div>

      {/* =========================================================
         3. MAIN CONTENT CONTAINER
      ========================================================= */}
      <div className="relative z-30 w-full max-w-4xl mx-auto text-center flex-1 flex flex-col justify-center items-center pb-32 pt-8">
        {/* CHENNAI WEATHER & COFFEE BADGE */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4 sm:mb-6 inline-flex items-center gap-2.5 rounded-full border border-amber-300/80 bg-white/70 px-5 sm:px-6 py-2 sm:py-2.5 text-xs font-extrabold tracking-widest text-amber-900 uppercase backdrop-blur-xl shadow-sm"
        >
          <CloudRain className="h-4 w-4 text-sky-600 animate-pulse" />
          <span className="text-slate-400">•</span>
          <Coffee className="h-4 w-4 text-amber-600 animate-bounce" />
          Chennai Rain & Hot Degree Coffee • 404 Route
        </motion.div>

        {/* 404 SUNBURST + RAIN GRADIENT TEXT */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative inline-block my-0"
        >
          <h1 className="text-[100px] sm:text-[150px] md:text-[200px] leading-none font-black tracking-tighter bg-gradient-to-r from-sky-600 via-amber-500 to-orange-500 bg-clip-text text-transparent drop-shadow-[0_10px_25px_rgba(245,158,11,0.2)] select-none">
            404
          </h1>
        </motion.div>

        {/* TITLE & POSITIVE DESCRIPTION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="px-2"
        >
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#061E43] tracking-tight">
            Mazhai Oru Pakkam, Sun-u Oru Pakkam...{' '}
            <span className="bg-gradient-to-r from-sky-600 via-amber-500 to-orange-500 bg-clip-text text-transparent">
              Namma Chennai!
            </span>
          </h2>

          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-slate-700 max-w-xl mx-auto leading-relaxed font-medium">
            Looks like you&apos;ve wandered off into a sudden Chennai rain shower! Grab a hot Degree
            Coffee, relax, and let us guide you back to the happening events.
          </p>
        </motion.div>

        {/* VIBRANT FEEL-GOOD BUTTONS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto px-4"
        >
          <Link
            href="/"
            className="w-full sm:w-auto group inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400 px-8 py-4 text-white font-bold shadow-lg shadow-orange-500/25 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/35"
          >
            <Home className="h-5 w-5 stroke-[2.5]" />
            Back To Homepage
          </Link>

          <Link
            href="/events"
            className="w-full sm:w-auto group inline-flex items-center justify-center gap-3 rounded-full border border-sky-300 bg-white/80 px-8 py-4 text-sky-900 font-semibold backdrop-blur-md transition-all duration-300 hover:bg-sky-600 hover:text-white hover:border-sky-600 shadow-sm"
          >
            <Sparkles className="h-4 w-4 text-amber-500 group-hover:text-amber-300" />
            Explore Chennai Events
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>

      {/* =========================================================
         4. CHENNAI LANDSCAPE SILHOUETTE WITH ANIMATED AUTO RICKSHAW
      ========================================================= */}
      <div className="absolute bottom-0 left-0 right-0 h-36 sm:h-48 md:h-60 pointer-events-none z-10 overflow-hidden">
        {/* AUTO RICKSHAW ROAD ANIMATION */}
        <div className="absolute bottom-12 sm:bottom-16 md:bottom-20 left-0 right-0 h-1 bg-gradient-to-r from-sky-400/40 via-amber-400/60 to-orange-400/40 z-20">
          <motion.div
            initial={{ x: '-20%' }}
            animate={{ x: '120%' }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            className="absolute -top-3 sm:-top-4 w-20 sm:w-28 md:w-36 h-3 sm:h-4 bg-gradient-to-r from-amber-500 via-yellow-400 to-orange-500 rounded-full shadow-md"
          >
            {/* Auto Headlight Glow */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 bg-amber-300 rounded-full blur-[1px]" />
          </motion.div>
        </div>

        {/* SILHOUETTE SVG */}
        <svg
          className="absolute bottom-0 w-full h-full text-[#005B70] fill-current preserve-3d opacity-90"
          viewBox="0 0 1200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* TEMPLE GOPURAM (LEFT) */}
          <path d="M 30,200 L 30,150 L 40,150 L 45,120 L 50,120 L 55,90 L 60,90 L 65,60 L 75,30 L 85,30 L 95,60 L 100,90 L 105,90 L 110,120 L 115,120 L 120,150 L 130,150 L 130,200 Z" />
          <path d="M 77,30 L 77,20 L 80,15 L 83,20 L 83,30 Z" />
          <path
            d="M 67,60 L 93,60 M 62,90 L 98,90 M 57,120 L 103,120"
            stroke="currentColor"
            strokeWidth="2"
          />

          {/* METRO PILLARS (CENTER) */}
          <path d="M 200,200 L 200,120 L 220,120 L 220,200 Z" />
          <path d="M 450,200 L 450,120 L 470,120 L 470,200 Z" />
          <path d="M 700,200 L 700,120 L 720,120 L 720,200 Z" />

          {/* LIGHTHOUSE & PALM TREES (RIGHT) */}
          <path d="M 1020,200 L 1030,70 L 1050,70 L 1060,200 Z" />
          <path d="M 1025,70 L 1025,55 L 1055,55 L 1055,70 Z" />
          <path d="M 1040,55 L 1040,40" stroke="currentColor" strokeWidth="3" />
          <path
            d="M 1120,200 Q 1125,140 1150,110 Q 1120,110 1100,120 M 1150,110 Q 1170,90 1190,105 M 1150,110 Q 1160,130 1180,140"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* MARINA OCEAN BASELINE */}
          <path
            d="M 0,185 Q 150,175 300,185 T 600,185 T 900,185 T 1200,185 L 1200,200 L 0,200 Z"
            opacity="0.8"
          />
        </svg>

        {/* LIGHTHOUSE ROTATING BEAM */}
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          className="absolute right-[10%] sm:right-[12%] bottom-[80px] sm:bottom-[110px] w-[220px] sm:w-[320px] h-[35px] sm:h-[45px] origin-left bg-gradient-to-r from-amber-400/50 via-amber-300/20 to-transparent blur-md pointer-events-none"
          style={{ clipPath: 'polygon(0 40%, 100% 0%, 100% 100%, 0 60%)' }}
        />
      </div>

      {/* FOOTER TEXT */}
      <div className="relative z-30 text-center text-[10px] sm:text-xs tracking-widest text-[#005B70] font-extrabold uppercase pt-4">
        Namma Chennai • Monsoon Vibes • Culture • Community
      </div>
    </section>
  )
}
