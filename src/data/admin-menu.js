export const menuItems = [
  { title: 'Dashboard', link: '/admin/dashboard' },

  { title: 'Participants', link: '/admin/participants',
    subLinks: [ 
      { title: 'Onsite', link: '/admin/participants/onsite' },
      { title: 'Online', link: '/admin/participants/online' },
      { title: 'Workshops', link: '/admin/participants/workshops' },
    ]
   },
  {
    title: 'Contributions', link: '/admin/contributions',
    subLinks: [ 
      { title: 'Talks', link: '/admin/contributions/talks' }, 
      { title: 'Posters', link: '/admin/contributions/posters' }, 
    ]
  }, 
  { title: 'Accomodations', link: '/admin/accomodations' },  
  { title: 'Export', link: '/admin/export'}
];