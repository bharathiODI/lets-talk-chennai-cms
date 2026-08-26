'use client'

import React, { useRef, useState } from 'react'
import Image from 'next/image'
import { Clapperboard, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import { ReelCard, ReelItem, MediaType } from './components/ReelCard'

type Props = {
  seoH1?: string
  bgImage?: MediaType | string | number | null
  eyebrow?: string
  heading?: string
  highlightText?: string
  headingSuffix?: string
  description?: string
  reels?: ReelItem[]
  button?: {
    text?: string
    url?: string
  }
}

function getBgImageUrl(media?: MediaType | string | number | null): string | null {
  if (!media) return null
  if (typeof media === 'object' && 'url' in media && media.url) {
    return media.url
  }
  if (typeof media === 'string') {
    return media
  }
  return null
}

export default function LetsTalkChennaiReelsBlockComponent({
  seoH1,
  bgImage,
  eyebrow = "LET'S TALK CHENNAI REELS",
  heading = 'Chennai,',
  highlightText = 'One Reel',
  headingSuffix = 'at a Time',
  description = 'Stories, people, places and ideas that make Chennai special.',
  reels = [],
  button,
}: Props) {
  const carouselRef = useRef<HTMLDivElement | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const backgroundImageUrl = getBgImageUrl(bgImage)

  // Auto handle active pagination dot on scroll
  const handleScroll = () => {
    if (!carouselRef.current) return
    const container = carouselRef.current
    const scrollPosition = container.scrollLeft
    const itemWidth = container.firstElementChild?.getBoundingClientRect().width || 320
    const newIndex = Math.round(scrollPosition / (itemWidth + 24))
    setActiveIndex(newIndex)
  }

  const scroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return
    const container = carouselRef.current
    const itemWidth = container.firstElementChild?.getBoundingClientRect().width || 320
    const scrollAmount = direction === 'left' ? -(itemWidth + 24) : itemWidth + 24

    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    })
  }

  const scrollTo = (index: number) => {
    if (!carouselRef.current) return
    const container = carouselRef.current
    const itemWidth = container.firstElementChild?.getBoundingClientRect().width || 320
    container.scrollTo({
      left: index * (itemWidth + 24),
      behavior: 'smooth',
    })
  }

  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-24 text-slate-900">
      {/* SECTION BACKGROUND IMAGE (IF PROVIDED) */}
      {backgroundImageUrl ? (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImageUrl}
            alt="Section Background"
            fill
            className="object-cover"
          />
          {/* Subtle Overlay so text & cards stay perfectly readable */}
          <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px]" />
        </div>
      ) : (
        /* Dynamic Background Glow Effect Fallback */
        <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-tr from-pink-200/40 to-purple-200/40 blur-[120px]" />
      )}

      {/* SEO Hidden H1 */}
      {seoH1 && <h1 className="sr-only">{seoH1}</h1>}

      <div className="relative z-10 container max-w-7xl mx-auto px-4 md:px-8">
        {/* =========================================
           TOP EYEBROW
        ========================================= */}
        <div className="flex items-center justify-center gap-4">
          <div className="h-[1px] w-12 md:w-20 bg-gradient-to-r from-transparent to-pink-500/50" />
          <div className="flex items-center gap-2 text-xs md:text-sm font-bold tracking-widest text-[#FF0F72] uppercase">
            <Clapperboard className="h-4 w-4" />
            <span>{eyebrow}</span>
          </div>
          <div className="h-[1px] w-12 md:w-20 bg-gradient-to-l from-transparent to-pink-500/50" />
        </div>

        {/* =========================================
           MAIN HEADING WITH SCRIPT ACCENT
        ========================================= */}
        <div className="mt-4 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#101A35]">
            {heading}{' '}
            <span className="relative inline-block font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-[#FF0F72] to-[#7B16C9] px-1">
              {highlightText}
              <svg
                className="absolute -bottom-2 left-0 w-full text-[#FF0F72]"
                viewBox="0 0 100 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 8C20 3 60 2 98 9"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>{' '}
            {headingSuffix}
          </h2>
          {description && (
            <p className="mt-4 text-sm md:text-base text-[#69738D] max-w-xl mx-auto font-medium">
              {description}
            </p>
          )}
        </div>

        {/* =========================================
           CAROUSEL AREA WITH ARROWS
        ========================================= */}
        {reels.length > 0 && (
          <div className="relative mt-12 md:mt-16">
            {/* Desktop Left Button */}
            <button
              type="button"
              onClick={() => scroll('left')}
              aria-label="Previous reels"
              className="hidden md:flex absolute -left-6 top-1/2 z-30 -translate-y-1/2 h-14 w-14 items-center justify-center rounded-full bg-white text-slate-800 shadow-xl border border-slate-100 hover:scale-110 hover:bg-slate-50 transition-all duration-300"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Carousel track */}
            <div
              ref={carouselRef}
              onScroll={handleScroll}
              className="flex gap-6 overflow-x-auto pb-4 pt-2 scrollbar-none snap-x snap-mandatory scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {reels.map((reel, idx) => (
                <div
                  key={reel.id || idx}
                  className="w-[85vw] sm:w-[300px] md:w-[285px] lg:w-[290px] shrink-0 snap-start"
                >
                  <ReelCard item={reel} />
                </div>
              ))}
            </div>

            {/* Desktop Right Button */}
            <button
              type="button"
              onClick={() => scroll('right')}
              aria-label="Next reels"
              className="hidden md:flex absolute -right-6 top-1/2 z-30 -translate-y-1/2 h-14 w-14 items-center justify-center rounded-full bg-white text-slate-800 shadow-xl border border-slate-100 hover:scale-110 hover:bg-slate-50 transition-all duration-300"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        )}

        {/* =========================================
           PAGINATION DOTS
        ========================================= */}
        {reels.length > 1 && (
          <div className="mt-8 flex justify-center items-center gap-2">
            {reels.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? 'w-8 bg-gradient-to-r from-[#FF0F72] to-[#7B16C9]'
                    : 'w-2.5 bg-slate-200 hover:bg-slate-300'
                }`}
              />
            ))}
          </div>
        )}

        {/* =========================================
           BOTTOM EXPLORE MORE CTA
        ========================================= */}
        {button?.text && button?.url && (
          <div className="mt-12 text-center">
            <a
              href={button.url}
              className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#FF0F72] to-[#7B16C9] px-8 py-4 text-xs md:text-sm font-bold text-white shadow-[0_10px_30px_rgba(255,15,114,0.3)] transition-all duration-300 hover:scale-105 hover:shadow-[0_15px_35px_rgba(255,15,114,0.5)] active:scale-95 uppercase tracking-widest"
            >
              <span>{button.text}</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        )}
      </div>
    </section>
  )
}