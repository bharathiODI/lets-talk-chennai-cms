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
      {/* 1. COMPACT TOP ICON */}
      <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#FF0F72]/10 to-[#7B16C9]/10 p-2 shadow-sm border border-pink-100">
        <MessagesSquare className="h-5 w-5 text-[#FF0F72]" />
      </div>

      {/* 2. COMPACT DECORATIVE EYEBROW / GRADIENT FAQ HEADING */}
      <div className="flex items-center justify-center gap-3 w-full max-w-lg px-4">
        {/* Left Decorative Line */}
        <div className="flex items-center flex-1">
          <div className="h-1.5 w-1.5 rounded-full bg-[#FF0F72] shrink-0" />
          <div className="h-[2px] w-full bg-gradient-to-r from-[#FF0F72] to-pink-300" />
        </div>

        {/* FAQ Text (Height Reduced) */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight shrink-0 px-1">
          <span className="bg-gradient-to-r from-[#FF0F72] via-[#B8129C] to-[#7B16C9] bg-clip-text text-transparent">
            {eyebrow}
          </span>
        </h2>

        {/* Right Decorative Line */}
        <div className="flex items-center flex-1">
          <div className="h-[2px] w-full bg-gradient-to-r from-purple-300 to-[#7B16C9]" />
          <div className="h-1.5 w-1.5 rounded-full bg-[#7B16C9] shrink-0" />
        </div>
      </div>

      {/* 3. SUBTITLE / SECONDARY HEADING */}
      <h3 className="mt-1 text-base sm:text-lg md:text-xl font-bold text-[#101A35]">
        {heading}
      </h3>

      {/* 4. OPTIONAL DESCRIPTION */}
      {description && (
        <p className="mt-1 max-w-xl text-xs sm:text-sm font-medium text-[#667085]">
          {description}
        </p>
      )}
    </div>
  )
}