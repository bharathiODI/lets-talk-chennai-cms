// import type { Block } from 'payload'

// export const LetsTalkFormBlock: Block = {
//   slug: 'letsTalkFormBlock',

//   labels: {
//     singular: 'Let’s Talk Submission Form',
//     plural: 'Let’s Talk Submission Forms',
//   },

//   fields: [
//     {
//       name: 'showForm',
//       type: 'checkbox',
//       defaultValue: true,
//     },

//     {
//       name: 'sectionTitle',
//       type: 'text',
//       defaultValue: 'Share Your Story With Chennai',
//     },

//     {
//       name: 'sectionSubTitle',
//       type: 'text',
//       defaultValue: 'Submit Your Entry',
//     },

//     {
//       name: 'sectionDescrption',
//       type: 'text',
//       defaultValue:
//         'Share your stories, local places, trend updates, or ideas for Chennai. Our team will review and feature approved entries.',
//     },

//     {
//       name: 'enableGlassEffect',
//       type: 'checkbox',
//       defaultValue: true,
//     },

//     /* =========================================================
//        ENABLE / DISABLE IMAGE
//     ========================================================= */

//     {
//       name: 'showImage',
//       label: 'Show Side Image',
//       type: 'checkbox',
//       defaultValue: false,
//     },

//     /* =========================================================
//        IMAGE
//     ========================================================= */

//     {
//       name: 'sideImage',
//       label: 'Side Image',
//       type: 'upload',
//       relationTo: 'media',
//       admin: {
//         condition: (_, siblingData) => siblingData?.showImage,
//       },
//     },

//     /* =========================================================
//        IMAGE POSITION
//     ========================================================= */

//     {
//       name: 'imagePosition',
//       label: 'Image Position',
//       type: 'select',
//       defaultValue: 'left',

//       options: [
//         {
//           label: 'Left',
//           value: 'left',
//         },

//         {
//           label: 'Right',
//           value: 'right',
//         },
//       ],

//       admin: {
//         condition: (_, siblingData) => siblingData?.showImage,
//       },
//     },
//   ],
// }