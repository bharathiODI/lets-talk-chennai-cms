
import type { CollectionConfig } from 'payload'
import { isAdminOrClientAdminAccess } from '../../access/isAdmin'

export const EventDashboard: CollectionConfig = {
  slug: 'event-dashboard',

  access: {
    // Both Admin & Client can access this dashboard view
    admin: isAdminOrClientAdminAccess,
    read: isAdminOrClientAdminAccess,
  },

  admin: {
    group: 'Events Management',
    // Always visible in the sidebar for logged-in Admin & Client roles
    hidden: false,

    components: {
      views: {
        list: {
          Component:
            '@/collections/EventDashboard/components/Dashboard',
        },
      },
    },
  },

  fields: [],
}
// import type { CollectionConfig } from 'payload'

// export const EventDashboard: CollectionConfig = {
//   slug: 'event-dashboard',

//   admin: {
//     group: 'Events Management',

//     components: {
//       views: {
//         list: {
//           Component:
//             '@/collections/EventDashboard/components/Dashboard',
//         },
//       },
//     },
//   },

//   fields: [],
// }