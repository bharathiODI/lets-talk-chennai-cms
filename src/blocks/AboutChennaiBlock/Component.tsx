/* eslint-disable @next/next/no-img-element */
'use client'

import React from 'react'

type ParagraphItem = {
  text: string
  id?: string
}

type Props = {
  title?: string
  paragraphs?: ParagraphItem[]
  quote?: string
  highlightText?: string
  bgImage?: any
  block?: {
    title?: string
    paragraphs?: ParagraphItem[]
    quote?: string
    highlightText?: string
    bgImage?: any
  }
}

export default function AboutChennaiBlockComponent(props: Props) {
  const data = props.block || props

  const { title, paragraphs, quote, highlightText, bgImage } = data

  const imageUrl =
    bgImage?.url || bgImage?.sizes?.large?.url || (typeof bgImage === 'string' ? bgImage : '')

  return (
    <section className="w-full px-4 py-12 md:px-8 max-w-7xl mx-auto">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0d0728] via-[#150a3c] to-transparent text-white shadow-2xl">
        {/* Background Image Layer */}
        {imageUrl && (
          <div className="absolute inset-0 z-0">
            <img
              src={imageUrl}
              alt={title || 'Chennai Background'}
              className="w-full h-full object-cover object-right"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0b0520] via-[#0b0520]/90 via-35% to-transparent" />
          </div>
        )}

        <div className="relative z-10 p-8 sm:p-12 md:p-16 max-w-xl lg:max-w-2xl">
          {/* TITLE */}
          {title && (
            <div className="mb-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase">{title}</h2>
              <div className="w-16 h-1 bg-amber-500 rounded-full mt-2" />
            </div>
          )}

          {/* PARAGRAPHS */}
          {paragraphs && paragraphs.length > 0 && (
            <div className="space-y-4 text-gray-200 text-sm sm:text-base leading-relaxed font-normal">
              {paragraphs.map((item, index) =>
                item?.text ? <p key={item.id || index}>{item.text}</p> : null,
              )}
            </div>
          )}

          {/* QUOTE SECTION */}
          {quote && (
            <div className="mt-8 flex items-start gap-4">
              <span className="text-purple-400 text-4xl sm:text-5xl leading-none font-serif select-none">
                “
              </span>
              <p className="text-sm sm:text-base font-medium text-purple-100 leading-snug pt-1 whitespace-pre-line">
                {quote}
              </p>
            </div>
          )}

          {/* PURPLE HIGHLIGHT BOX */}
          {highlightText && (
            <div className="mt-8 pl-4 border-l-2 border-purple-500">
              <p className="text-purple-400 font-semibold text-sm sm:text-base tracking-wide whitespace-pre-line">
                {highlightText}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
