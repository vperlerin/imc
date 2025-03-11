export const menuItems = [
  { title: "Dashboard", link: "/admin/dashboard" },

  {
    title: "Participants",
    link: "/admin/participants",
    subLinks: [
      { title: "On-site", link: "/admin/participants/onsite" },
      { title: "Online", link: "/admin/participants/online" },
      { title: "Radio Workshop", link: "/admin/participants/workshops/radio" },
      { title: "Spectro Workshop", link: "/admin/participants/workshops/spectro" },
    ],
  },
  {
    title: "Contributions",
    link: "/admin/contributions",
    subLinks: [
      { title: "Talks", link: "/admin/contributions/talks" },
      { title: "Posters", link: "/admin/contributions/posters" },
    ],
  },
  { title: "Accomodations", link: "/admin/accomodations" },
  { title: "Downloads", link: "/admin/downloads" },
];
