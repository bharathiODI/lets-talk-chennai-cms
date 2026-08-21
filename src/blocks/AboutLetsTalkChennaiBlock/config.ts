import { Block } from 'payload'

export const AboutLetsTalkChennaiBlock: Block = {
  slug: 'aboutLetsTalkChennaiBlock',
  labels: {
    singular: "About Let's Talk Chennai Block",
    plural: "About Let's Talk Chennai Blocks",
  },
  fields: [
    {
      name: 'badgeText',
      type: 'text',
      label: 'Badge Text',
      defaultValue: "LET'S TALK CHENNAI",
    },
    {
      name: 'title',
      type: 'text',
      label: 'Main Title',
      defaultValue: 'CHENNAI HAS GIVEN US STORIES TO LIVE.',
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle (Gradient Text)',
      defaultValue: 'TIME WE GAVE CHENNAI A VOICE.',
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Rich Text Content',
      admin: {
        description: 'நமது "Let\'s Talk Chennai" தகவல்களை Rich Text Editor மூலம் இங்கு உள்ளிடலாம்.',
      },
    },
    // 🌟 BACKGROUND IMAGE FIELD
    {
      name: 'bgImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image',
    },
    {
      name: 'mobileBgImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Mobile Background Image',
    },
  ],
}