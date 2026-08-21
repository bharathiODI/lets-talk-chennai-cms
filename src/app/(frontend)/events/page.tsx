import { ArattaiArchive } from '@/components/Summer/ArattaiArchive'
import configPromise from '@/payload.config'
import Image from 'next/image'
import type { Metadata } from 'next/types'
import { getPayload } from 'payload'
import PageClient from './page.client'
import { FlyingBirds } from './FlyingBirds'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const eventsRes = await payload.find({
    collection: 'lets-talks-chennai',
    limit: 10000,
    sort: '-createdAt',
  })

  return (
    <div className=" pb-24">
      <PageClient />
      <FlyingBirds />
      <section className="relative overflow-hidden">
        {/* Hero Background Image */}
        <div className="relative h-[380px] w-full md:h-[460px] lg:h-[540px]">
          <Image
            src="/app-images/bg-about-sectin.png"
            alt="Let's Talk Chennai Hero"
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Content Layer */}
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 md:px-6 mt-20">
            <div className="max-w-3xl">
              {/* Badge - Border & Text colored for White BG */}
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#6d4399]/20 bg-[#6d4399]/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#6d4399] shadow-sm">
                <span className="h-2.5 w-2.5 rounded-full bg-[#d63384] animate-pulse" />
                Let&apos;s Talk Chennai
              </div>

              {/* Heading with #6d4399 & #d63384 Gradient */}
              <h1 className="text-4xl font-black leading-tight text-[#6d4399] md:text-6xl lg:text-7xl">
                Discover
                <span className="bg-gradient-to-r from-[#d63384] to-[#6d4399] bg-clip-text text-transparent">
                  {' '}
                  Let&apos;s Talk Chennai
                </span>
              </h1>

              {/* Description in Dark Slate for readability on White BG */}
              <p className="mt-6 max-w-2xl text-base font-medium leading-relaxed text-slate-700 md:text-lg">
                Explore immersive experiences, live performances, music nights, cultural
                celebrations, workshops and unforgettable moments happening across the city.
              </p>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-wrap gap-4"></div>
            </div>
          </div>
        </div>
      </section>
      <div className="container mx-auto mt-10">
        <ArattaiArchive events={eventsRes.docs} />
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'lets talk chennai | Super Chennai',
  }
}
