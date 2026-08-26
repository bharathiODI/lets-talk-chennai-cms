'use client'

import React from 'react'
import { MessagesSquare } from 'lucide-react'

type FAQHeaderProps = {
  eyebrow?: string
  heading?: string
  description?: string
}

export function FAQHeader({
  eyebrow = 'FAQ',
  heading = 'Frequently Asked Questions',
  description,
}: FAQHeaderProps) {
  return (
    <div className="relative z-10 text-center flex flex-col items-center">
      {/* 1. TOP ICON WITH GRADIENT STROKE */}
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#FF0F72]/10 to-[#7B16C9]/10 p-3 shadow-sm border border-pink-100">
        <MessagesSquare className="h-10 w-10 text-[#FF0F72]" />
      </div>

      {/* 2. MAIN DECORATIVE EYEBROW / GRADIENT FAQ HEADING */}
      <div className="flex items-center justify-center gap-4 w-full max-w-2xl px-4">
        {/* Left Decorative Gradient Line & Dot */}
        <div className="flex items-center flex-1">
          <div className="h-2.5 w-2.5 rounded-full bg-[#FF0F72] shrink-0" />
          <div className="h-[2px] w-full bg-gradient-to-r from-[#FF0F72] to-pink-300" />
        </div>

        {/* Large FAQ Text */}
        <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-[76px] font-extrabold tracking-tight shrink-0 px-2">
          <span className="bg-gradient-to-r from-[#FF0F72] via-[#B8129C] to-[#7B16C9] bg-clip-text text-transparent">
            {eyebrow}
          </span>
        </h2>

        {/* Right Decorative Gradient Line & Dot */}
        <div className="flex items-center flex-1">
          <div className="h-[2px] w-full bg-gradient-to-r from-purple-300 to-[#7B16C9]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#7B16C9] shrink-0" />
        </div>
      </div>

      {/* 3. SUBTITLE / SECONDARY HEADING */}
      <h3 className="mt-3 text-lg md:text-xl lg:text-2xl font-bold text-[#101A35]">
        {heading}
      </h3>

      {/* 4. OPTIONAL DESCRIPTION */}
      {description && (
        <p className="mt-3 max-w-xl text-sm md:text-base font-medium text-[#667085]">
          {description}
        </p>
      )}
    </div>
  )
}