import type { Block } from 'payload'

export const LetsTalkChennaiFAQBlock: Block = {
  slug: 'letsTalkChennaiFaq',
  labels: {
    singular: "Let's Talk Chennai FAQ Block",
    plural: "Let's Talk Chennai FAQ Blocks",
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
        placeholder: "Ex: Let's Talk Chennai - Frequently Asked Questions",
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
      defaultValue: 'FAQ',
      label: 'Main Eyebrow / Large Header Text',
      required: true,
    },
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Frequently Asked Questions',
      label: 'Section Subtitle / Main Heading',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue: 'Find answers to common questions about stories, features, submissions, and events on Let’s Talk Chennai.',
      label: 'Section Description (Optional)',
    },

    /* =========================================
       ACCORDION SETTINGS
    ========================================= */
    {
      name: 'allowMultipleOpen',
      type: 'checkbox',
      defaultValue: false,
      label: 'Allow Multiple FAQs Open Simultaneously',
      admin: {
        description: 'If checked, multiple FAQ cards can remain open at the same time. Default opens one at a time.',
      },
    },

    /* =========================================
       FAQ ITEMS ARRAY
    ========================================= */
    {
      name: 'faqs',
      type: 'array',
      label: 'FAQ Items List',
      minRows: 1,
      defaultValue: [
        {
          question: "What is Let's Talk Chennai?",
          answer:
            "Let's Talk Chennai is a premium platform celebrating the vibrant stories, inspiring people, iconic places, and rich experiences that make Chennai truly special.",
        },
        {
          question: 'How can I submit my story or idea?',
          answer:
            "You can submit your story, feature request, or event proposal through our online contact form or by tagging us on social media with #LetsTalkChennai.",
        },
        {
          question: "Who can feature on Let's Talk Chennai?",
          answer:
            'Anyone with a unique story, business, community initiative, or artistic pursuit based in or related to Chennai is welcome to be featured.',
        },
        {
          question: 'Are the reels and events updated regularly?',
          answer:
            'Yes! We continuously publish new reels, weekly highlights, and local event coverage across our digital channels.',
        },
        {
          question: 'How can I stay updated with the latest from Let’s Talk Chennai?',
          answer:
            'Follow our social media pages, check out our reels section regularly, and subscribe to our mailing list for weekly highlights.',
        },
      ],
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
          label: 'Question',
        },
        {
          name: 'answer',
          type: 'textarea',
          required: true,
          label: 'Answer',
        },
      ],
    },

    /* =========================================
       BOTTOM CTA BUTTON (OPTIONAL)
    ========================================= */
    {
      name: 'ctaText',
      type: 'text',
      defaultValue: 'Have more questions? Contact our team',
      label: 'Bottom CTA Text',
    },
    {
      name: 'ctaUrl',
      type: 'text',
      label: 'Bottom CTA Target URL',
      admin: {
        placeholder: 'e.g., /contact',
      },
    },
  ],
}