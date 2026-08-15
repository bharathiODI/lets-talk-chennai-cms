export type MediaValue =
  | string
  | {
      url?: string | null
      alt?: string | null
      width?: number | null
      height?: number | null
    }
  | null
  | undefined

export interface DecorativeImageItem {
  id?: string | null
  image: MediaValue
  position?:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'middle-left'
    | 'middle-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right'
  width?: number | null
  top?: number | null
  left?: number | null
  right?: number | null
  bottom?: number | null
  zIndex?: number | null
}

export interface LetsTalkChennaiBlockProps {
  eyebrow?: string
  title?: string
  description?: string
  secondaryDescription?: string
  highlightedText?: string
  buttonText?: string
  buttonLink?: string
  openInNewTab?: boolean
  heroImage: MediaValue
  decorativeImages?: DecorativeImageItem[]
  blockType?: 'lets-talk-chennai'
}