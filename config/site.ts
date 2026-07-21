export const siteConfig = {
  name: "CodeNova",
  shortName: "CodeNova",
  description: "Next-generation software engineering, AI architecture, and digital product design studio.",
  url: "https://codenova-studio.com",
  ogImage: "https://codenova-studio.com/og-image.jpg",
  links: {
    github: "https://github.com/Sarthakbhai395/service-website",
    twitter: "https://twitter.com/codenova_dev",
  },
  contact: {
    email: "contact@codenova-studio.com",
    phone: "+1 (800) 555-0199",
    address: "One World Trade Center, Suite 85, New York, NY 10007",
    coordinates: { lat: 40.7128, lng: -74.0060 }
  },
  services: [
    { slug: "mvp-development", name: "MVP Development" },
    { slug: "prototype-development", name: "Prototype Development" },
    { slug: "end-to-end-product", name: "End-to-End Product Development" },
    { slug: "web-development", name: "Web Development" },
    { slug: "mobile-app-development", name: "Mobile App Development" },
    { slug: "game-development", name: "Game Development" },
    { slug: "saas-development", name: "SaaS Development" },
    { slug: "ai-development", name: "AI Development" },
    { slug: "ui-ux-design", name: "UI/UX Design" },
    { slug: "api-development", name: "API Development" },
    { slug: "cloud-deployment", name: "Cloud Deployment" },
    { slug: "maintenance-support", name: "Maintenance & Support" }
  ]
};

export type SiteConfig = typeof siteConfig;
