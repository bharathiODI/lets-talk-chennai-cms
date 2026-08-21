'use client'

import React from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { motion } from 'framer-motion'

type Props = {
  badgeText?: string
  title?: string
  subtitle?: string
  content?: any
  bgImage?: any
  mobileBgImage?: any
  block?: {
    badgeText?: string
    title?: string
    subtitle?: string
    content?: any
    bgImage?: any
    mobileBgImage?: any
  }
}

export default function AboutletsTalkChennaiBlockComponent(props: Props) {
  const data = props.block || props
  const { badgeText, title, subtitle, content, bgImage, mobileBgImage } = data

  // Desktop Image URL
  const desktopImageUrl =
    bgImage?.url ||
    bgImage?.sizes?.large?.url ||
    (typeof bgImage === 'string' ? bgImage : '/app-images/bg-about-sectin.png')

  // Mobile Image URL (Desktop Image as Fallback)
  const mobileImageUrl =
    mobileBgImage?.url ||
    mobileBgImage?.sizes?.large?.url ||
    (typeof mobileBgImage === 'string' ? mobileBgImage : desktopImageUrl)

  const FlyingBird = ({ className = '' }: { className?: string }) => (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`w-6 h-6 text-black/60 md:text-black/70 ${className}`}
    >
      <path d="M21.5 8.5C18 9 15.5 11.5 13 14C11.5 12 9 10.5 5 11C3 11.2 1.5 12 1 12.5C2.5 13 4.5 13.5 6 13C8.5 12.2 10.5 13.5 12 16C13.5 14 16 12 19 12C20.5 12 21.5 12.5 22.5 13C22 11.5 22 9.5 21.5 8.5Z" />
    </svg>
  )

  return (
    <section
      className="relative w-full min-h-[836px] py-16 md:py-24 flex items-center justify-center overflow-hidden
                 bg-no-repeat bg-cover bg-center
                 bg-[image:var(--bg-mobile-image)] md:bg-[image:var(--bg-desktop-image)]"
      style={
        {
          '--bg-desktop-image': `url(${desktopImageUrl})`,
          '--bg-mobile-image': `url(${mobileImageUrl})`,
        } as React.CSSProperties
      }
    >
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Bird 1 - Fast High Flight */}
        <motion.div
          initial={{ x: '-10vw', y: '15vh', scale: 0.8, opacity: 0 }}
          animate={{
            x: ['-10vw', '110vw'],
            y: ['15vh', '10vh', '18vh', '8vh'],
            opacity: [0, 0.8, 0.8, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'linear',
            delay: 0,
          }}
          className="absolute top-0 left-0"
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* <FlyingBird className="w-7 h-7" /> */}
          </motion.div>
        </motion.div>

        {/* Bird 2 - Medium Slow Flight (Flock Partner) */}
        <motion.div
          initial={{ x: '-10vw', y: '22vh', scale: 0.6, opacity: 0 }}
          animate={{
            x: ['-10vw', '110vw'],
            y: ['22vh', '18vh', '24vh', '15vh'],
            opacity: [0, 0.6, 0.6, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'linear',
            delay: 3,
          }}
          className="absolute top-0 left-0"
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* <FlyingBird className="w-5 h-5" /> */}
          </motion.div>
        </motion.div>

        {/* Bird 3 - Small Distant Bird */}
        <motion.div
          initial={{ x: '-10vw', y: '30vh', scale: 0.4, opacity: 0 }}
          animate={{
            x: ['-10vw', '110vw'],
            y: ['30vh', '25vh', '28vh', '20vh'],
            opacity: [0, 0.5, 0.5, 0],
          }}
          transition={{
            duration: 26,
            repeat: Infinity,
            ease: 'linear',
            delay: 7,
          }}
          className="absolute top-0 left-0"
        >
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 0.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* <FlyingBird className="w-4 h-4 opacity-75" /> */}
          </motion.div>
        </motion.div>

        {/* Bird 4 - Lower Diagonal Flight */}
        <motion.div
          initial={{ x: '-10vw', y: '40vh', scale: 0.7, opacity: 0 }}
          animate={{
            x: ['-10vw', '110vw'],
            y: ['40vh', '32vh', '38vh', '28vh'],
            opacity: [0, 0.7, 0.7, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
            delay: 12,
          }}
          className="absolute top-0 left-0"
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 0.55, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* <FlyingBird className="w-6 h-6" /> */}
          </motion.div>
        </motion.div>
      </div>
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-6">
        <div className="w-full flex flex-col items-center space-y-6">
          {badgeText && (
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/5 px-4 py-1.5 text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-black backdrop-blur-xl shadow-sm">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ec265b] animate-pulse" />
              {badgeText}
            </div>
          )}
          <div className="w-36 h-1 bg-[#ec265b] rounded-full mt-2"></div>

          <div className="space-y-2 text-center">
            {title && (
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#ec265b] uppercase">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r from-[#ec265b] via-purple-700 to-indigo-900 bg-clip-text text-transparent leading-tight uppercase">
                {subtitle}
              </p>
            )}
          </div>

          {/* RICH TEXT CONTENT */}
          {content && (
            <div className="text-black text-sm sm:text-base md:text-lg leading-relaxed space-y-4 text-justify w-full">
              <div className="prose prose-neutral max-w-none text-black text-justify prose-p:leading-relaxed prose-p:my-3 prose-p:text-black prose-p:text-justify prose-headings:text-center">
                <RichText data={content} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
