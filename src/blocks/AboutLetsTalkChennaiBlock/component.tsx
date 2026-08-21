'use client'

import React from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'

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
