import { Block } from 'payload'

export const AboutChennaiBlock: Block = {
  slug: 'aboutChennaiBlock',
  labels: {
    singular: 'About Chennai Block',
    plural: 'About Chennai Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      defaultValue: 'ABOUT CHENNAI',
    },
    {
      name: 'paragraphs',
      type: 'array',
      label: 'Paragraphs',
      fields: [
        {
          name: 'text',
          type: 'textarea',
          label: 'Paragraph Text',
        },
      ],
    },
    {
      name: 'quote',
      type: 'textarea',
      label: 'Quote Text',
    },
    {
      name: 'highlightText',
      type: 'textarea',
      label: 'Purple Highlight Text',
    },
    {
      name: 'bgImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image',
    },
  ],
}
