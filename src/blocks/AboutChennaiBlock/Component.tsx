/* eslint-disable @next/next/no-img-element */
'use client'

import { RichText } from '@payloadcms/richtext-lexical/react'
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
    <section className='aboutttsectionnnnew'>
      <section className="w-full px-4 py-12 md:px-8 max-w-7xl mx-auto widthbaoutsection">
        <div className="relative overflow-hidden rounded-3xl text-white">

          <div className="relative z-10 p-8 sm:p-12 md:p-16 max-w-xl lg:max-w-2xl contenttttwidth">
            {/* TITLE */}
            {title && (
              <div className="mb-6">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#ec265b] uppercase">{title}</h1>
                <div className="w-36 h-1 bg-[#ec265b] rounded-full mt-2" />
              </div>
            )}

            {/* PARAGRAPHS */}
            {paragraphs && paragraphs.length > 0 && (
              <div className="space-y-4 text-[#1d1d1d] text-sm sm:text-base">
                {paragraphs.map((item, index) =>
                  item?.text ? <p key={item.id || index}>{item.text}</p> : null,
                )}
              </div>
            )}

           

            {/* QUOTE SECTION */}
            {quote && (
              <div className="mt-8 flex items-start gap-4">
                <span className="text-[#000] text-4xl sm:text-5xl leading-none font-serif select-none">
                  “
                </span>
                <p className="text-sm sm:text-base font-medium text-[#000] leading-snug pt-1 whitespace-pre-line">
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
    </section>
  )
}

// 'use client'

// import React from 'react'
// import { RichText } from '@payloadcms/richtext-lexical/react' // 🌟 RichText import செய்யப்பட்டது

// type ParagraphItem = {
//   text: any // RichText தரவு JSON object ஆக இருக்கும்
//   id?: string
// }

// type Props = {
//   title?: string
//   paragraphs?: ParagraphItem[]
//   quote?: string
//   highlightText?: string
//   bgImage?: any
//   block?: {
//     title?: string
//     paragraphs?: ParagraphItem[]
//     quote?: string
//     highlightText?: string
//     bgImage?: any
//   }
// }

// export default function AboutChennaiBlockComponent(props: Props) {
//   const data = props.block || props

//   const { title, paragraphs, quote, highlightText, bgImage } = data

//   const imageUrl =
//     bgImage?.url || bgImage?.sizes?.large?.url || (typeof bgImage === 'string' ? bgImage : '')

//   return (
//     <section className="aboutttsectionnnnew">
//       <section className="w-full px-4 py-12 md:px-8 max-w-7xl mx-auto widthbaoutsection">
//         <div className="relative overflow-hidden rounded-3xl text-white">
//           <div className="relative z-10 p-8 sm:p-12 md:p-16 max-w-xl lg:max-w-2xl contenttttwidth">
//             {/* TITLE */}
//             {title && (
//               <div className="mb-6">
//                 <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#ec265b] uppercase">
//                   {title}
//                 </h1>
//                 <div className="w-36 h-1 bg-[#ec265b] rounded-full mt-2" />
//               </div>
//             )}

//             {/* PARAGRAPHS (RICH TEXT RENDER) */}
//             {paragraphs && paragraphs.length > 0 && (
//               <div className="space-y-4 text-[#1d1d1d] text-sm sm:text-base">
//                 {paragraphs.map((item, index) =>
//                   item?.text ? (
//                     <div key={item.id || index} className="prose max-w-none">
//                       {/* 🌟 RichText component பயன்படுத்தி render செய்கிறோம் */}
//                       <RichText data={item.text} />
//                     </div>
//                   ) : null,
//                 )}
//               </div>
//             )}

//             {/* QUOTE SECTION */}
//             {quote && (
//               <div className="mt-8 flex items-start gap-4">
//                 <span className="text-[#000] text-4xl sm:text-5xl leading-none font-serif select-none">
//                   “
//                 </span>
//                 <p className="text-sm sm:text-base font-medium text-[#000] leading-snug pt-1 whitespace-pre-line">
//                   {quote}
//                 </p>
//               </div>
//             )}

//             {/* PURPLE HIGHLIGHT BOX */}
//             {highlightText && (
//               <div className="mt-8 pl-4 border-l-2 border-purple-500">
//                 <p className="text-purple-400 font-semibold text-sm sm:text-base tracking-wide whitespace-pre-line">
//                   {highlightText}
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </section>
//     </section>
//   )
// }

// 'use client'

// import React from 'react'
// import { RichText } from '@payloadcms/richtext-lexical/react'

// type Props = {
//   badgeText?: string
//   title?: string
//   subtitle?: string
//   content?: any
//   block?: {
//     badgeText?: string
//     title?: string
//     subtitle?: string
//     content?: any
//   }
// }

// export default function AboutChennaiBlockComponent(props: Props) {
//   const data = props.block || props
//   const { badgeText, title, subtitle, content } = data

//   return (
//     <section className="relative w-full min-h-[500px] py-12 md:py-20 flex items-center overflow-hidden aboutttsectionnnnew">

//       <div className="relative z-10 container mx-auto px-4 md:px-6">
//         <div className="max-w-4xl mx-auto space-y-6">
//           {/* BADGE */}
//           <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-1.5 text-xs md:text-sm font-medium uppercase tracking-[0.2em] text-white backdrop-blur-xl shadow-lg">
//             <span className="h-2.5 w-2.5 rounded-full bg-orange-400 animate-pulse" />
//             {badgeText || "LET'S TALK CHENNAI"}
//           </div>

//           {/* MAIN HEADING & SUBTITLE */}
//           <div className="space-y-2">
//             <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight uppercase">
//               {title || 'CHENNAI HAS GIVEN US STORIES TO LIVE.'}
//             </h1>
//             <p className="text-xl sm:text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-orange-300 via-yellow-200 to-green-300 bg-clip-text text-transparent leading-tight uppercase">
//               {subtitle || 'TIME WE GAVE CHENNAI A VOICE.'}
//             </p>
//           </div>

//           {/* RICH TEXT CONTENT OR FALLBACK HARDCODED TEXT */}
//           <div className="text-white/90 text-sm sm:text-base md:text-lg leading-relaxed space-y-4">
//             {content ? (
//               <div className="prose prose-invert max-w-none prose-p:leading-relaxed prose-p:my-3">
//                 <RichText data={content} />
//               </div>
//             ) : (
//               /* Hardcoded Layout with exact gaps & structure */
//               <div className="space-y-4">
//                 <p className="text-orange-200 font-semibold text-lg md:text-xl">
//                   We are not just a one-dimensional city.
//                 </p>

//                 <p className="text-white/80">
//                   Ours is a city of engineering talent, startups, deep tech, healthcare, cinema,
//                   music, sport, food, beaches, friendships and dreams. A city that has shaped
//                   generations, and a city we all call home.
//                 </p>

//                 <p className="font-semibold text-white">
//                   Yet, somehow, we’ve never been very good at talking about our home.
//                 </p>

//                 <p className="text-orange-300 font-bold text-lg md:text-xl">
//                   Let’s Talk Chennai is Super Chennai’s invitation to change that.
//                 </p>

//                 <p className="text-white/80">
//                   Tell us about the Chennai that inspired you. The people, places, moments and
//                   stories that make this city yours. The beach where your mornings begin. The
//                   neighbourhood that shaped you. The café where ideas came alive. The street you’ve
//                   never stopped calling home.
//                 </p>

//                 <blockquote className="border-l-4 border-orange-400 pl-4 py-1 italic text-white/90 bg-white/5 rounded-r-lg my-4">
//                   Because cities aren’t remembered only for what they build. They’re remembered for
//                   the stories their people choose to tell.
//                 </blockquote>

//                 <p className="text-lg md:text-2xl font-bold bg-gradient-to-r from-yellow-200 to-orange-400 bg-clip-text text-transparent pt-2">
//                   Come, Let’s Talk Chennai. Let’s tell the amazing stories of Namma City to the
//                   world, every day.
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// 'use client'

// import React from 'react'
// import { RichText } from '@payloadcms/richtext-lexical/react'

// type Props = {
//   badgeText?: string
//   title?: string
//   subtitle?: string
//   content?: any
//   block?: {
//     badgeText?: string
//     title?: string
//     subtitle?: string
//     content?: any
//   }
// }

// export default function AboutChennaiBlockComponent(props: Props) {
//   const data = props.block || props
//   const { badgeText, title, subtitle, content } = data

//   return (
//     <section className="relative w-full min-h-[500px] py-12 md:py-20 flex items-center overflow-hidden aboutttsectionnnnew">
//       <div className="relative z-10 container mx-auto px-4 md:px-6">
//         <div className="max-w-4xl mx-auto space-y-6">

//           {/* BADGE (Black Text & Border) */}
//           <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/5 px-4 py-1.5 text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-black backdrop-blur-xl shadow-sm">
//             <span className="h-2.5 w-2.5 rounded-full bg-[#ec265b] animate-pulse" />
//             {badgeText || "LET'S TALK CHENNAI"}
//           </div>

//           {/* MAIN HEADING & SUBTITLE (Black & Dark Gradient) */}
//           <div className="space-y-2">
//             <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-black leading-tight uppercase">
//               {title || 'CHENNAI HAS GIVEN US STORIES TO LIVE.'}
//             </h1>
//             <p className="text-xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r from-[#ec265b] via-purple-700 to-indigo-900 bg-clip-text text-transparent leading-tight uppercase">
//               {subtitle || 'TIME WE GAVE CHENNAI A VOICE.'}
//             </p>
//           </div>

//           {/* RICH TEXT CONTENT OR FALLBACK HARDCODED TEXT */}
//           <div className="text-black text-sm sm:text-base md:text-lg leading-relaxed space-y-4">
//             {content ? (
//               /* 🌟 RichText output in crisp dark typography */
//               <div className="prose prose-neutral max-w-none text-black prose-p:leading-relaxed prose-p:my-3 prose-p:text-black">
//                 <RichText data={content} />
//               </div>
//             ) : (
//               /* Hardcoded Layout in Black & High Contrast Palette */
//               <div className="space-y-4">
//                 <p className="text-[#ec265b] font-bold text-lg md:text-xl">
//                   We are not just a one-dimensional city.
//                 </p>

//                 <p className="text-black/80 font-normal">
//                   Ours is a city of engineering talent, startups, deep tech, healthcare, cinema,
//                   music, sport, food, beaches, friendships and dreams. A city that has shaped
//                   generations, and a city we all call home.
//                 </p>

//                 <p className="font-bold text-black">
//                   Yet, somehow, we’ve never been very good at talking about our home.
//                 </p>

//                 <p className="text-[#ec265b] font-extrabold text-lg md:text-xl">
//                   Let’s Talk Chennai is Super Chennai’s invitation to change that.
//                 </p>

//                 <p className="text-black/80 font-normal">
//                   Tell us about the Chennai that inspired you. The people, places, moments and
//                   stories that make this city yours. The beach where your mornings begin. The
//                   neighbourhood that shaped you. The café where ideas came alive. The street you’ve
//                   never stopped calling home.
//                 </p>

//                 <blockquote className="border-l-4 border-[#ec265b] pl-4 py-2 italic font-medium text-black bg-black/5 rounded-r-lg my-4">
//                   Because cities aren’t remembered only for what they build. They’re remembered for
//                   the stories their people choose to tell.
//                 </blockquote>

//                 <p className="text-lg md:text-2xl font-black bg-gradient-to-r from-[#ec265b] to-purple-800 bg-clip-text text-transparent pt-2">
//                   Come, Let’s Talk Chennai. Let’s tell the amazing stories of Namma City to the
//                   world, every day.
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }


// 'use client'

// import React from 'react'
// import { RichText } from '@payloadcms/richtext-lexical/react'

// type Props = {
//   badgeText?: string
//   title?: string
//   subtitle?: string
//   content?: any
//   block?: {
//     badgeText?: string
//     title?: string
//     subtitle?: string
//     content?: any
//   }
// }

// export default function AboutChennaiBlockComponent(props: Props) {
//   const data = props.block || props
//   const { badgeText, title, subtitle, content } = data

//   return (
//     <section className="relative w-full min-h-[500px] py-12 md:py-20 flex items-center overflow-hidden aboutttsectionnnnew">
//       <div className="relative z-10 container mx-auto px-4 md:px-6">
//         {/* 🌟 FIX 1: mx-auto-வை நீக்கிவிட்டு text-left மற்றும் max-w-4xl மட்டும் வைக்கப்பட்டுள்ளது */}
//         <div className="max-w-4xl text-left space-y-6">
//           {/* BADGE (Left Aligned) */}
//           <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/5 px-4 py-1.5 text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-black backdrop-blur-xl shadow-sm">
//             <span className="h-2.5 w-2.5 rounded-full bg-[#ec265b] animate-pulse" />
//             {badgeText || "LET'S TALK CHENNAI"}
//           </div>

//           {/* MAIN HEADING & SUBTITLE */}
//           <div className="space-y-2 text-left">
//             <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-black leading-tight uppercase">
//               {title || 'CHENNAI HAS GIVEN US STORIES TO LIVE.'}
//             </h1>
//             <p className="text-xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r from-[#ec265b] via-purple-700 to-indigo-900 bg-clip-text text-transparent leading-tight uppercase">
//               {subtitle || 'TIME WE GAVE CHENNAI A VOICE.'}
//             </p>
//           </div>

//           {/* RICH TEXT CONTENT OR FALLBACK HARDCODED TEXT */}
//           <div className="text-black text-sm sm:text-base md:text-lg leading-relaxed space-y-4 text-left">
//             {content ? (
//               /* 🌟 FIX 2: text-left & prose-p:text-left சேர்க்கப்பட்டுள்ளது */
//               <div className="prose prose-neutral max-w-none text-black text-left prose-p:leading-relaxed prose-p:my-3 prose-p:text-black prose-p:text-left">
//                 <RichText data={content} />
//               </div>
//             ) : (
//               /* Hardcoded Layout in Left Alignment */
//               <div className="space-y-4 text-left">
//                 <p className="text-[#ec265b] font-bold text-lg md:text-xl">
//                   We are not just a one-dimensional city.
//                 </p>

//                 <p className="text-black/80 font-normal">
//                   Ours is a city of engineering talent, startups, deep tech, healthcare, cinema,
//                   music, sport, food, beaches, friendships and dreams. A city that has shaped
//                   generations, and a city we all call home.
//                 </p>

//                 <p className="font-bold text-black">
//                   Yet, somehow, we’ve never been very good at talking about our home.
//                 </p>

//                 <p className="text-[#ec265b] font-extrabold text-lg md:text-xl">
//                   Let’s Talk Chennai is Super Chennai’s invitation to change that.
//                 </p>

//                 <p className="text-black/80 font-normal">
//                   Tell us about the Chennai that inspired you. The people, places, moments and
//                   stories that make this city yours. The beach where your mornings begin. The
//                   neighbourhood that shaped you. The café where ideas came alive. The street you’ve
//                   never stopped calling home.
//                 </p>

//                 <blockquote className="border-l-4 border-[#ec265b] pl-4 py-2 italic font-medium text-black bg-black/5 rounded-r-lg my-4 text-left">
//                   Because cities aren’t remembered only for what they build. They’re remembered for
//                   the stories their people choose to tell.
//                 </blockquote>

//                 <p className="text-lg md:text-2xl font-black bg-gradient-to-r from-[#ec265b] to-purple-800 bg-clip-text text-transparent pt-2">
//                   Come, Let’s Talk Chennai. Let’s tell the amazing stories of Namma City to the
//                   world, every day.
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }
