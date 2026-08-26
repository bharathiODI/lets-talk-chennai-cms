'use client'

import React, { useRef, useState } from 'react'
import Image from 'next/image'
import { Clapperboard } from 'lucide-react'
import { ReelPlayButton } from './ReelPlayButton'

export type MediaType = {
  id?: string | number
  url?: string
  alt?: string
}

export type ReelItem = {
  id?: string
  title: string
  category?: string
  categoryColor?: string
  mediaType: 'image' | 'video' | 'reel'
  thumbnail?: MediaType | string | number | null
  image?: MediaType | string | number | null
  video?: MediaType | string | number | null
  reelUrl?: string
  redirectUrl?: string
  openInNewTab?: boolean
}

function getMediaUrl(media?: MediaType | string | number | null): string | null {
  if (!media) return null
  if (typeof media === 'object' && 'url' in media && media.url) {
    return media.url
  }
  if (typeof media === 'string') {
    return media
  }
  return null
}

export function ReelCard({ item }: { item: ReelItem }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  const thumbnailUrl =
    getMediaUrl(item.image) || getMediaUrl(item.thumbnail) || '/placeholder-reel.jpg'

  const videoUrl = getMediaUrl(item.video)
  const categoryBg = item.categoryColor || '#FF0F72'

  const handleVideoToggle = () => {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
      setIsPlaying(false)
    } else {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  const handleCardClick = (e: React.MouseEvent) => {
    if (item.mediaType === 'video') {
      handleVideoToggle()
      return
    }

    const targetUrl = item.mediaType === 'reel' ? item.reelUrl : item.redirectUrl
    if (!targetUrl) return

    if (item.openInNewTab) {
      window.open(targetUrl, '_blank', 'noopener,noreferrer')
    } else {
      window.location.href = targetUrl
    }
  }

  return (
    <div
      onClick={handleCardClick}
      className="group relative flex h-[480px] w-full flex-col justify-between overflow-hidden rounded-[24px] border border-white/20 bg-slate-900 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-pink-500/15 cursor-pointer select-none"
      style={{
        borderColor: `${categoryBg}33`,
      }}
    >
      {/* 1. BACKGROUND MEDIA & OVERLAYS */}
      <div className="absolute inset-0 z-0">
        {item.mediaType === 'video' && videoUrl ? (
          <video
            ref={videoRef}
            src={videoUrl}
            poster={thumbnailUrl}
            playsInline
            preload="metadata"
            onEnded={() => setIsPlaying(false)}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          thumbnailUrl && (
            <Image
              src={thumbnailUrl}
              alt={item.title || 'Reel thumbnail'}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )
        )}
        {/* Dark Vignette Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/20" />
      </div>

      {/* 2. TOP ROW (CATEGORY PILL & REEL ICON) */}
      <div className="relative z-10 flex items-center justify-between p-5">
        {item.category && (
          <span
            className="rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-md backdrop-blur-md"
            style={{ backgroundColor: categoryBg }}
          >
            {item.category}
          </span>
        )}
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md border border-white/20">
          <Clapperboard className="h-5 w-5" />
        </div>
      </div>

      {/* 3. CENTER PLAY BUTTON */}
      {!isPlaying && (
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <ReelPlayButton ariaLabel={`Play ${item.title}`} />
        </div>
      )}

      {/* 4. BOTTOM TITLE AND ACCENT LINE */}
      <div className="relative z-10 p-6 pt-20 bg-gradient-to-t from-black/95 via-black/80 to-transparent">
        <h3 className="line-clamp-2 text-xl md:text-2xl font-bold leading-snug text-white drop-shadow-sm">
          {item.title}
        </h3>
        <div
          className="mt-3 h-1 w-14 rounded-full transition-all duration-300 group-hover:w-20"
          style={{ backgroundColor: categoryBg }}
        />
      </div>
    </div>
  )
}
