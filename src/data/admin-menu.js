export const menuItems = [
  { title: "Dashboard", link: "/admin/dashboard"},

  {
    title: "Participants",
    link: "/admin/participants",
    subLinks: [
      { title: "On-site", link: "/admin/participants/onsite", allowed: ['loc'] },
      { title: "Online", link: "/admin/participants/online", allowed: ['loc'] },
      { title: "Radio Workshop", link: "/admin/participants/workshops/radio", allowed: ['loc'] },
      { title: "Spectro Workshop", link: "/admin/participants/workshops/spectro", allowed: ['loc'] },
    ],
    allowed: ['loc']
  },
  {
    title: "Contributions",
    link: "/admin/contributions",
    subLinks: [
      { title: "Talks", link: "/admin/contributions/talks", allowed: ['loc', 'soc'] },
      { title: "Posters", link: "/admin/contributions/posters", allowed: ['loc', 'soc'] },
    ],
    allowed: ['loc', 'soc']
  },
  { title: "Accommodations", link: "/admin/accomodations", allowed: ['loc'] },
  { title: "Downloads", link: "/admin/downloads", allowed: ['loc', 'soc']  },
];
