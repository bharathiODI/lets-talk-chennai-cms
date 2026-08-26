import type { Block } from 'payload'

export const LetsTalkChennaiReelsBlock: Block = {
  slug: 'letsTalkChennaiReels',
  labels: {
    singular: "Let's Talk Chennai Reels Block",
    plural: "Let's Talk Chennai Reels Blocks",
  },
  fields: [
    /* =========================================
       SEO HEADING (HIDDEN H1)
    ========================================= */
    {
      name: 'seoH1',
      type: 'text',
      label: 'SEO Hidden H1 Heading',
      admin: {
        description: 'Purely for SEO H1 ranking purpose (hidden visually).',
        placeholder: "Ex: Let's Talk Chennai - Trending Reels & Video Stories",
      },
    },
    /* =========================================
       BACKGROUND IMAGE FIELD (NEWLY ADDED)
    ========================================= */
    {
      name: 'bgImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Section Background Image',
      admin: {
        description: 'Optional section background image.',
      },
    },

    /* =========================================
       SECTION HEADER FIELDS
    ========================================= */
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: "LET'S TALK CHENNAI REELS",
      label: 'Top Eyebrow Label',
    },
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Chennai,',
      label: 'Heading Prefix (Normal Font)',
    },
    {
      name: 'highlightText',
      type: 'text',
      defaultValue: 'One Reel',
      label: 'Heading Highlight (Script/Gradient Font)',
    },
    {
      name: 'headingSuffix',
      type: 'text',
      defaultValue: 'at a Time',
      label: 'Heading Suffix (Normal Font)',
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue: 'Stories, people, places and ideas that make Chennai special.',
      label: 'Section Subtitle / Description',
    },

    /* =========================================
       REELS CAROUSEL ARRAY
    ========================================= */
    {
      name: 'reels',
      type: 'array',
      label: 'Reels Cards List',
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Reel Title',
          admin: {
            placeholder: 'e.g., Chennai Evenings Hit Different',
          },
        },
        {
          name: 'category',
          type: 'text',
          defaultValue: 'TRENDING',
          label: 'Category Pill Text',
          admin: {
            placeholder: 'e.g., PLACES, PEOPLE, CULTURE',
          },
        },
        {
          name: 'categoryColor',
          type: 'text',
          defaultValue: '#FF0F72',
          label: 'Category Color (Hex code)',
          admin: {
            placeholder: 'e.g., #FF0F72 or #7B16C9',
          },
        },
        {
          name: 'mediaType',
          type: 'select',
          defaultValue: 'image',
          required: true,
          options: [
            { label: 'Image with Link', value: 'image' },
            { label: 'Uploaded HTML5 Video', value: 'video' },
            { label: 'External Reel URL', value: 'reel' },
          ],
        },

        /* ---- COMMON POSTER/THUMBNAIL ---- */
        {
          name: 'thumbnail',
          type: 'upload',
          relationTo: 'media',
          label: 'Card Thumbnail / Video Poster',
          required: true,
        },

        /* ---- IMAGE SPECIFIC FIELDS ---- */
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Full Size Image (Optional override for Thumbnail)',
          admin: {
            condition: (_, siblingData) => siblingData?.mediaType === 'image',
          },
        },
        {
          name: 'redirectUrl',
          type: 'text',
          label: 'Redirect Target URL',
          admin: {
            condition: (_, siblingData) => siblingData?.mediaType === 'image',
            placeholder: 'https://example.com/chennai-events',
          },
        },

        /* ---- VIDEO SPECIFIC FIELDS ---- */
        {
          name: 'video',
          type: 'upload',
          relationTo: 'media',
          label: 'Uploaded Video File',
          admin: {
            condition: (_, siblingData) => siblingData?.mediaType === 'video',
          },
        },

        /* ---- REEL SPECIFIC FIELDS ---- */
        {
          name: 'reelUrl',
          type: 'text',
          label: 'External Reel / Short URL',
          admin: {
            condition: (_, siblingData) => siblingData?.mediaType === 'reel',
            placeholder: 'https://www.instagram.com/reel/XXXXXXXX/',
          },
        },

        /* ---- COMMON UTILITY FIELDS ---- */
        {
          name: 'openInNewTab',
          type: 'checkbox',
          defaultValue: false,
          label: 'Open link/reel in new tab',
          admin: {
            condition: (_, siblingData) => siblingData?.mediaType !== 'video',
          },
        },
        {
          name: 'sortOrder',
          type: 'number',
          defaultValue: 10,
          label: 'Priority Order',
        },
      ],
    },

    /* =========================================
       BOTTOM CTA BUTTON
    ========================================= */
    {
      name: 'button',
      type: 'group',
      label: 'Bottom CTA Button',
      fields: [
        {
          name: 'text',
          type: 'text',
          defaultValue: 'EXPLORE MORE REELS',
        },
        {
          name: 'url',
          type: 'text',
          defaultValue: '/reels',
        },
      ],
    },
  ],
}