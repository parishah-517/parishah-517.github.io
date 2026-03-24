export type Project = {
  title: string;
  summary: string;
  context: string;
  tools: string;
  dates?: string;
  links?: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    title: "Milna Market",
    summary:
      "Founded and organized one of NYC's largest South Asian pop-up markets, leading design across social media and web. Now building an online vendor portal focused on a streamlined vendor experience, reducing friction from application to event-day and increasing repeat participation.",
    dates: "October 2025 – Present",
    context: "Founder + Product Design + Social Media + Software Development",
    tools: "Figma, React, TypeScript, Tailwind CSS, Node.js, Supabase, Cursor, Notion",
    links: [
      { label: "Website", href: "https://milna.market" },
      { label: "Instagram", href: "https://instagram.com/milna.market" },
      { label: "TikTok", href: "https://tiktok.com/@milna.market" }
    ]
  },
  {
    title: "Sincere Farm Mobile App Prototype",
    summary:
      "Built and shared a Figma prototype of a mobile app for an early-stage consumer nut butter brand, transforming an early idea into an intuitive social shopping experience while keeping the visual language consistent with the Shopify website.",
    dates: "May 2025",
    context: "Product Design + Prototyping",
    tools: "Figma, Shopify",
    links: [
      {
        label: "View Figma Prototype",
        href: "https://www.figma.com/proto/lzBRHbnC5iInozrF4Da8Z6/SF?node-id=212-1303&starting-point-node-id=27%3A78&t=In5M4FFPbPBRk8x1-1"
      },
      { label: "Brand Website", href: "http://sincerefarm.com/" },
      { label: "Brand Instagram", href: "https://www.instagram.com/sincere_farm/" }
    ]
  },
  {
    title: "Sales Incentive Platform",
    summary:
      "Contributed to the development and redesign of sales bonus management platforms for a global hotel company client, building 30+ pages and components, incorporating stakeholder feedback to improve UX and platform performance.",
    dates: "March 2024 – March 2025",
    context: "Software Engineering + Product Design",
    tools: "Figma, React, TypeScript, Laravel, TanStack",
    links: [{ label: "FTI Consulting", href: "https://www.fticonsulting.com/services/data-and-analytics" }]
  },
  {
    title: "AI Variance Analysis",
    summary:
      "Early team member on a rule-builder microservice for financial variance analysis, integrated with FloQast's core reporting platform. Full-stack scope with close collaboration across product design.",
    dates: "March 2025 – Present",
    context: "Software Engineering + Product Design",
    tools: "Figma, React, TypeScript, Express, MongoDB, Mongoose",
    links: [
      {
        label: "FloQast Variance Analysis",
        href: "https://www.floqast.com/integrated-record-to-report/products/variance-analysis"
      }
    ]
  },
  {
    title: "RETRO: Robotic Cloud System",
    summary:
      "Designed a proof-of-concept for a reliable cloud robotics system that blends individual robot capabilities with coordinated communication over WebSockets and OpenCV, enabling remote experiment control.",
    context: "Research Project",
    tools: "Python, OpenCV, WebSockets",
    links: [
      { label: "Watch Video", href: "https://youtu.be/_XKjZ5PoYlU" },
      { label: "View Poster", href: "/pdfs/gsuposter.pdf" }
    ]
  },
  {
    title: "Eye-Tracking Analysis",
    summary:
      "Analyzed Tobii eye-tracker data to study cognitive load in programming-focused learning experiences.",
    context: "Research Assistant",
    tools: "Python, Data Analysis",
    links: [{ label: "View Poster", href: "/pdfs/urop.pdf" }]
  },
];
