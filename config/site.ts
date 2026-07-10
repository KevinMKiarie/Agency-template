export const siteConfig = {
  name: "Studio",
  tagline: "Build. Launch. Grow.",
  description: "A creative agency at the intersection of design and technology.",

  nav: [
    { label: "Work", href: "/work" },
    { label: "Services", href: "/services" },
    { label: "Studio", href: "/studio" },
    { label: "Contact", href: "/contact" },
  ],

  work: [
    { title: "Rebranding Monzo", category: "Brand", year: "2024", slug: "monzo" },
    { title: "Linear Growth Campaign", category: "Digital", year: "2024", slug: "linear" },
    { title: "Arc Browser Launch", category: "Campaign", year: "2023", slug: "arc" },
    { title: "Framer Site System", category: "Web", year: "2023", slug: "framer" },
  ],

  services: [
    { name: "Brand Strategy", description: "Positioning, identity, voice." },
    { name: "Digital Design", description: "Web, product, motion." },
    { name: "Development", description: "Next.js, Three.js, custom builds." },
    { name: "Campaigns", description: "Launch strategy and execution." },
  ],

  social: {
    twitter: "https://twitter.com",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
}
