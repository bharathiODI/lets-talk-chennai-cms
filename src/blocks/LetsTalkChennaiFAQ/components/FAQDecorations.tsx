'use client'

import React from 'react'

export function FAQDecorations() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden select-none" aria-hidden="true">
      {/* Subtle Soft Ambient Glows */}
      <div className="absolute left-1/4 top-10 h-96 w-96 rounded-full bg-pink-200/20 blur-[130px]" />
      <div className="absolute right-1/4 bottom-10 h-96 w-96 rounded-full bg-purple-200/20 blur-[130px]" />

      {/* Top-Left Dotted Decorative Matrix */}
      <div className="absolute left-4 top-12 hidden lg:block opacity-35">
        <div
          className="h-32 w-32"
          style={{
            backgroundImage:
              'radial-gradient(circle, #FF0F72 1.5px, transparent 1.5px)',
            backgroundSize: '16px 16px',
          }}
        />
      </div>

      {/* Bottom-Right Dotted Decorative Matrix */}
      <div className="absolute right-4 bottom-12 hidden lg:block opacity-35">
        <div
          className="h-32 w-32"
          style={{
            backgroundImage:
              'radial-gradient(circle, #7B16C9 1.5px, transparent 1.5px)',
            backgroundSize: '16px 16px',
          }}
        />
      </div>
    </div>
  )
}