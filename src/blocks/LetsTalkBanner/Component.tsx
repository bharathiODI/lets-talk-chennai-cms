import React from 'react'
import Image from 'next/image'
import type { LetsTalkChennaiBlockProps, MediaValue } from './types'
import styles from './styles.css'

function getMediaUrl(media: MediaValue): string | null {
  if (!media) return null
  if (typeof media === 'string') return media
  return media.url || null
}

function getMediaAlt(media: MediaValue, fallback: string): string {
  if (typeof media === 'object' && media?.alt) {
    return media.alt
  }
  return fallback
}

export default function LetsTalkChennaiComponent(props: LetsTalkChennaiBlockProps) {
  const {
    eyebrow = "Let's Talk",
    title = 'chennai',
    description = 'Chennai-making, rain-companing, summer-thriving, friend-for-life-finding city.',
    secondaryDescription = 'It’s also one that all of us call home.',
    highlightedText = 'call home',
    buttonText = 'EXPLORE MORE',
    buttonLink = '#',
    openInNewTab = false,
    heroImage,
    decorativeImages = [],
  } = props

  const heroUrl = getMediaUrl(heroImage)
  const heroAlt = getMediaAlt(heroImage, 'Let’s Talk Chennai visual collage')

  // Helper to format text with highlighted span
  const renderSecondaryDescription = () => {
    if (!secondaryDescription) return null
    if (!highlightedText || !secondaryDescription.includes(highlightedText)) {
      return secondaryDescription
    }

    const parts = secondaryDescription.split(highlightedText)
    return (
      <>
        {parts[0]}
        <span className={styles.highlight}>{highlightedText}</span>
        {parts[1]}
      </>
    )
  }

  return (
    <section className={styles.bannerSection} aria-label="Let's Talk Chennai">
      <div className={styles.bannerContainer}>
        {/* LEFT TEXT CONTENT */}
        <div className={styles.leftContent}>
          {eyebrow && <h3 className={styles.eyebrow}>{eyebrow}</h3>}
          {title && <h2 className={styles.title}>{title}</h2>}

          <div className={styles.descriptionWrapper}>
            {description && <p className={styles.description}>{description}</p>}
            {secondaryDescription && (
              <p className={styles.secondaryDescription}>
                {renderSecondaryDescription()}
              </p>
            )}
          </div>

          {buttonText && (
            <a
              href={buttonLink || '#'}
              target={openInNewTab ? '_blank' : '_self'}
              rel={openInNewTab ? 'noopener noreferrer' : undefined}
              className={styles.ctaButton}
            >
              <span>{buttonText}</span>
              <span className={styles.arrowIcon} aria-hidden="true">
                →
              </span>
            </a>
          )}
        </div>

        {/* RIGHT COLLAGE CREATIVE */}
        <div className={styles.creativeWrapper}>
          {heroUrl && (
            <div className={styles.heroImageContainer}>
              <Image
                src={heroUrl}
                alt={heroAlt}
                fill
                priority
                sizes="(max-width: 899px) 100vw, (max-width: 1200px) 58vw, 64vw"
                className={styles.heroImage}
              />
            </div>
          )}

          {/* DYNAMIC DECORATIVE OVERLAYS (MANAGED VIA PAYLOAD) */}
          {decorativeImages?.map((item, index) => {
            const imgUrl = getMediaUrl(item.image)
            if (!imgUrl) return null

            const inlineStyle: React.CSSProperties = {
              width: item.width ? `${item.width}px` : 'auto',
              top: item.top !== null && item.top !== undefined ? `${item.top}%` : undefined,
              left: item.left !== null && item.left !== undefined ? `${item.left}%` : undefined,
              right: item.right !== null && item.right !== undefined ? `${item.right}%` : undefined,
              bottom: item.bottom !== null && item.bottom !== undefined ? `${item.bottom}%` : undefined,
              zIndex: item.zIndex || 3,
            }

            return (
              <div
                key={item.id || index}
                className={styles.decorativeElement}
                style={inlineStyle}
              >
                <Image
                  src={imgUrl}
                  alt={getMediaAlt(item.image, 'Decorative element')}
                  width={item.width || 120}
                  height={item.width || 120}
                  style={{ objectFit: 'contain' }}
                />
              </div>
            )
          })}
        </div>
      </div>

      {/* BOTTOM PURPLE TORN PAPER SHAPE */}
      <div className={styles.tornPaperBottom} aria-hidden="true" />
    </section>
  )
}