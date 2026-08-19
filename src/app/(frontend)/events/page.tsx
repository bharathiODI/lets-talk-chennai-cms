import { ArattaiArchive } from '@/components/Summer/ArattaiArchive'
import configPromise from '@/payload.config'
import Image from 'next/image'
import type { Metadata } from 'next/types'
import { getPayload } from 'payload'
import AccodomationBanner from '../../../assets/images/withoutformherobanner.png'
import PageClient from './page.client'

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
      <section className="relative overflow-hidden">
        <div className="relative h-[380px] w-full md:h-[460px] lg:h-[540px]">
          <div className="absolute inset-0 bg-gradient-to-r from-red-950 via-slate-900 to-blue-950" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.4),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.4),transparent_45%)]" />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 md:px-6 mt-20">
            <div className="max-w-3xl">
              {/* Badge */}
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-5 py-2 text-sm font-medium uppercase tracking-[0.2em] text-white backdrop-blur-xl shadow-lg">
                <span className="h-2.5 w-2.5 rounded-full bg-orange-400 animate-pulse" />
                Let&apos;s Talk Chennai
              </div>

              {/* Heading */}
              <h1 className="text-4xl font-black leading-tight text-white md:text-6xl lg:text-7xl">
                Discover
                <span className="bg-gradient-to-r from-orange-300 via-yellow-200 to-green-300 bg-clip-text text-transparent">
                  {' '}
                  Let&apos;s Talk Chennai
                </span>
              </h1>

              {/* Description */}
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
                Explore immersive experiences, live performances, music nights, cultural
                celebrations, workshops and unforgettable moments happening across the city.
              </p>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-wrap gap-4"></div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-white to-transparent" />
      </section>

      <div className="container mx-auto mt-10">
        <ArattaiArchive events={eventsRes.docs} />
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Trending Chennai Events | Super Chennai',
  }
}
