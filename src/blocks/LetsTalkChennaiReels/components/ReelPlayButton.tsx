'use client'

import React from 'react'
import { Play } from 'lucide-react'

type ReelPlayButtonProps = {
  onClick?: (e: React.MouseEvent) => void
  ariaLabel?: string
}

export function ReelPlayButton({ onClick, ariaLabel = 'Play reel' }: ReelPlayButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className="group/btn relative flex h-16 w-16 md:h-18 md:w-18 items-center justify-center rounded-full bg-gradient-to-tr from-[#FF0F72]/90 to-[#7B16C9]/90 border-2 border-white/90 text-white shadow-[0_8px_25px_rgba(255,15,114,0.4)] backdrop-blur-sm transition-all duration-300 group-hover:scale-110 hover:shadow-[0_12px_30px_rgba(255,15,114,0.6)] active:scale-95"
    >
      <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
      <Play className="h-7 w-7 md:h-8 md:w-8 translate-x-0.5 fill-white text-white drop-shadow-sm" />
    </button>
  )
}