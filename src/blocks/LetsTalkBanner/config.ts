import type { Block } from 'payload'

export const LetsTalkChennaiBlockBanner: Block = {
  slug: 'lets-talk-chennai-banner',
  labels: {
    singular: 'Let’s Talk Chennai',
    plural: 'Let’s Talk Chennai',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          defaultValue: "Let's Talk",
          admin: { width: '50%' },
        },
        {
          name: 'title',
          type: 'text',
          defaultValue: 'chennai',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue:
        'Chennai-making, rain-companing, summer-thriving, friend-for-life-finding city.',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'secondaryDescription',
          type: 'textarea',
          defaultValue: 'It’s also one that all of us call home.',
          admin: { width: '50%' },
        },
        {
          name: 'highlightedText',
          type: 'text',
          defaultValue: 'call home',
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'group',
      name: 'cta',
      label: 'Call To Action',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'buttonText',
              type: 'text',
              defaultValue: 'EXPLORE MORE',
              admin: { width: '40%' },
            },
            {
              name: 'buttonLink',
              type: 'text',
              admin: { width: '40%' },
            },
            {
              name: 'openInNewTab',
              type: 'checkbox',
              defaultValue: false,
              admin: { width: '20%' },
            },
          ],
        },
      ],
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Main Creative Image Collage',
    },
    {
      name: 'decorativeImages',
      type: 'array',
      label: 'Optional Floating Decorative Elements',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          type: 'row',
          fields: [
            {
              name: 'position',
              type: 'select',
              defaultValue: 'top-right',
              options: [
                { label: 'Top Left', value: 'top-left' },
                { label: 'Top Center', value: 'top-center' },
                { label: 'Top Right', value: 'top-right' },
                { label: 'Middle Left', value: 'middle-left' },
                { label: 'Middle Right', value: 'middle-right' },
                { label: 'Bottom Left', value: 'bottom-left' },
                { label: 'Bottom Center', value: 'bottom-center' },
                { label: 'Bottom Right', value: 'bottom-right' },
              ],
              admin: { width: '50%' },
            },
            {
              name: 'width',
              type: 'number',
              label: 'Width (px)',
              admin: { width: '50%' },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'top', type: 'number', label: 'Top (%)', admin: { width: '25%' } },
            { name: 'left', type: 'number', label: 'Left (%)', admin: { width: '25%' } },
            { name: 'right', type: 'number', label: 'Right (%)', admin: { width: '25%' } },
            { name: 'bottom', type: 'number', label: 'Bottom (%)', admin: { width: '25%' } },
          ],
        },
        {
          name: 'zIndex',
          type: 'number',
          defaultValue: 3,
        },
      ],
    },
  ],
}