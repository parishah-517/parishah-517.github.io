export type CardMedia =
  | {
      kind: "image";
      src: string;
      alt: string;
      /** Default cover. Use contain to show the full image (letterboxed, “zoomed out”). */
      objectFit?: "cover" | "contain";
      /** With object-fit: cover, aligns the crop (e.g. top center keeps the top visible). */
      objectPosition?: string;
    }
  | { kind: "video"; src: string; alt: string };

/** Auto-rotating image carousel on the project page (e.g. Milna Market). */
export type DetailCarouselSlide = {
  src: string;
  alt: string;
};

/** Clips on the project page (2-up grid; use fullWidth for a full-bleed row). */
export type DetailVideo = {
  label: string;
  src: string;
  alt: string;
  fullWidth?: boolean;
};

/** Optional three-panel row: left image, muted looping center video, right image (replaces the default hero when set). */
export type DetailTriptych = {
  /** Optional section label (e.g. “Social Media”) above intro + panels. */
  heading?: string;
  /** Optional blurb directly above the three panels. */
  intro?: string;
  left: { src: string; alt: string; objectPosition?: string; translateY?: string };
  centerVideo: { src: string; alt: string };
  right: { src: string; alt: string; objectPosition?: string; translateY?: string };
};

/** Short copy beside a featured video (e.g. app walkthrough), rendered above `detailTriptych` when both are set. */
export type DetailAppVideo = {
  /** Optional section label (e.g. “Mobile App”) above the row. */
  heading?: string;
  /** Shown to the left of the video on wide screens; below the video on narrow viewports. */
  description: string;
  video: { src: string; alt: string; poster?: string };
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  tools: string;
  dates?: string;
  links?: { label: string; href: string }[];
  cardMedia: CardMedia;
  /** Hero on project page. If unset and the card is a video, no hero is shown (avoids duplicating the card clip). */
  detailMedia?: CardMedia;
  /** Renders in a row below the title (stacks on small screens). */
  detailVideos?: DetailVideo[];
  /** Optional section label above the portal / detail videos block (e.g. “Vendor portal”). */
  detailVideosHeading?: string;
  /** Optional blurb placed directly above the detail video row. */
  detailVideosIntro?: string;
  /** Optional duration value shown below the video intro (renders as “Duration: …”, same style as Tools). */
  detailVideosDuration?: string;
  /** Image carousel below the title; auto-advances unless reduced motion is on. */
  detailCarousel?: DetailCarouselSlide[];
  /** Optional section label above the carousel (e.g. “Photos”). */
  detailCarouselHeading?: string;
  /** Optional left / center video / right gallery (stacks on small screens). */
  detailTriptych?: DetailTriptych;
  /** Optional description + video row (e.g. app prototype); place before triptych in page order. */
  detailAppVideo?: DetailAppVideo;
};

export const projects: Project[] = [
  {
    slug: "milna-market",
    title: "Milna Market",
    summary:
      "Founder and organizer of NYC's largest South Asian pop-up markets, leading design across web and social media to create a cohesive brand and event experience for both vendors and attendees. The market brings together 1,200+ attendees and 60+ vendors across food, beverage, jewelry, home, clothing, beauty, and more.",
    detailVideosHeading: "Vendor portal",
    detailVideosIntro:
      "Designed and developed an online vendor portal to improve the vendor experience by simplifying key touchpoints from application through event-day, reducing confusion, minimizing manual back-and-forth, and encouraging repeat vendor participation.",
    detailVideosDuration: "2 weeks",
    dates: "October 2025 – Present",
    tools: "Figma, React, TypeScript, Tailwind CSS, Node.js, Supabase, Cursor, Notion, Canva",
    cardMedia: {
      kind: "video",
      src: "/videos/milna-project.mov",
      alt: "Milna Market event highlights"
    },
    links: [
      { label: "Website", href: "https://milna.market" },
      { label: "Instagram", href: "https://instagram.com/milna.market" },
      { label: "TikTok", href: "https://tiktok.com/@milna.market" }
    ],
    detailCarouselHeading: "Photos",
    detailCarousel: [
      {
        src: "/images/milna-carousel/slide-01.png",
        alt: "Guests playing Carrom at a busy Milna Market gathering"
      },
      {
        src: "/images/milna-carousel/slide-02.png",
        alt: "Milna Market tote bag with Hindi and English logo on olive and cream canvas"
      },
      {
        src: "/images/milna-carousel/slide-03.png",
        alt: "Vendors behind a product display at Milna Market"
      },
      {
        src: "/images/milna-carousel/slide-04.png",
        alt: "Attendee playing Carrom at Milna Market"
      },
      {
        src: "/images/milna-carousel/slide-05.png",
        alt: "Crowded Milna Market event with paper lanterns and natural light"
      },
      {
        src: "/images/milna-carousel/slide-06.png",
        alt: "Checkout and packaged goods at a Milna Market stall"
      },
      {
        src: "/images/milna-carousel/slide-07.png",
        alt: "Large group photo of the Milna Market community in the venue"
      }
    ],
    detailVideos: [
      {
        label: "Vendor portal",
        src: "/videos/milna-vendor-portal.mp4",
        alt: "Milna Market vendor portal screen recording"
      },
      {
        label: "Admin portal",
        src: "/videos/milna-admin-portal.mp4",
        alt: "Milna Market admin portal screen recording"
      }
    ]
  },
  {
    slug: "sincere-farm",
    title: "Sincere Farm",
    summary:
      "Sincere Farm is an early-stage consumer food brand focused on creating small-batch, no-added-sugar nut butters in unique flavors like ube, matcha, and dark chocolate. The brand blends playful, modern packaging with a health-conscious approach, positioning itself as a premium yet approachable everyday indulgence.",
    dates: "May 2025",
    tools: "Figma, Shopify",
    cardMedia: {
      kind: "image",
      src: "/images/projects/sincere-farm.png",
      alt: "Sincere Farm Matcha cashew and pistachio butter jar with ivy",
      objectPosition: "center 20%"
    },
    links: [
      {
        label: "View Figma Prototype",
        href: "https://www.figma.com/proto/lzBRHbnC5iInozrF4Da8Z6/SF?node-id=212-1303&starting-point-node-id=27%3A78&t=In5M4FFPbPBRk8x1-1"
      },
      { label: "Brand Website", href: "http://sincerefarm.com/" },
      { label: "Brand Instagram", href: "https://www.instagram.com/sincere_farm/" }
    ],
    detailAppVideo: {
      heading: "Mobile App",
      description:
        "Built a Figma proof-of-concept mobile app that explored a social-forward shopping experience through an Instagram-style community feed and a rewards system designed to encourage repeat purchases and brand engagement. Also created social media content and researched Shopify loyalty tools, including Smile, to evaluate how these features could integrate with Sincere Farm's existing Shopify site.",
      video: {
        src: "/videos/sincere-farm-app.mov",
        alt: "Screen recording of the Sincere Farm mobile app prototype",
        poster: "/images/projects/sincere-farm-app-screen.png"
      }
    },
    detailTriptych: {
      heading: "Social Media",
      intro:
        "Created social media content as an extension of the digital user experience, applying the brand's visual language across channels to create a cohesive and engaging presence.",
      left: {
        src: "/images/projects/sincere-farm-triptych-left.png",
        alt: "Sincere Farm stacked nut butter jars — Ube, Matcha, and Dark Chocolate on a white pedestal with ivy"
      },
      centerVideo: {
        src: "/videos/sincere-farm.mov",
        alt: "Sincere Farm product video"
      },
      right: {
        src: "/images/projects/sincere-farm-triptych-right.png",
        alt: "Sincere Farm Matcha cashew and pistachio butter jar with ivy"
      }
    }
  },
  {
    slug: "floqast",
    title: "FloQast",
    summary:
      "Full-stack engineer on an early team building a rule-builder microservice for FloQast's AI Variance Analysis product, integrated with the core reporting platform. Working closely with product and design to shape workflows that help finance teams identify material changes, analyze variance drivers, and streamline collaboration throughout the reporting process.",
    dates: "March 2025 – Present",
    tools: "Figma, React, TypeScript, Express, MongoDB, Mongoose",
    cardMedia: {
      kind: "image",
      src: "/images/projects/floqast.png",
      alt: "FloQast AI Variance Analysis dashboard with AI explanations",
      objectPosition: "top center"
    },
    links: [
      {
        label: "FloQast AI Variance Analysis",
        href: "https://www.floqast.com/integrated-record-to-report/products/variance-analysis"
      }
    ]
  },
  {
    slug: "sales-incentive-platform",
    title: "FTI Consulting",
    summary:
      "Contributed to the development and redesign of sales bonus management platforms for a global hotel company client, building 30+ pages and components, incorporating stakeholder feedback to improve UX and platform performance.",
    dates: "March 2024 – March 2025",
    tools: "Figma, React, TypeScript, Laravel, TanStack",
    cardMedia: {
      kind: "image",
      src: "/images/projects/fti-consulting.png",
      alt: "FTI Consulting logo",
      objectFit: "cover",
      objectPosition: "center"
    },
    links: [{ label: "FTI Consulting", href: "https://www.fticonsulting.com/services/data-and-analytics" }]
  },
  {
    slug: "retro-robotic-cloud-system",
    title: "RETRO: Robotic Cloud System",
    summary:
      "Designed a proof-of-concept for a reliable cloud robotics system that blends individual robot capabilities with coordinated communication over WebSockets and OpenCV, enabling remote experiment control.",
    tools: "Python, OpenCV, WebSockets",
    cardMedia: {
      kind: "image",
      src: "/images/projects/retro-robotic.png",
      alt: "Isometric illustration of the RETRO green mobile robot with camera and onboard computer on a light grey background",
      objectFit: "cover",
      objectPosition: "center"
    },
    links: [
      { label: "Watch Video", href: "https://youtu.be/_XKjZ5PoYlU" },
      { label: "View Poster", href: "/pdfs/gsuposter.pdf" }
    ]
  },
  {
    slug: "cognitive-load-analysis",
    title: "Cognitive Load Analysis",
    summary:
      "Conducted 10+ think-aloud sessions to study how students interacted with adaptive Parsons Problems versus equivalent write-code problems. Synthesized participant behaviors, confusion points, and completion patterns, and used Python scripts to analyze differences in efficiency, cognitive load, and overall learner experience.",
    tools: "Python, Data Analysis",
    cardMedia: {
      kind: "image",
      src: "/images/projects/cognitive-load-analysis.png",
      alt: "Parsons problem with scrambled C code blocks on colored tiles on a yellow background",
      objectFit: "cover",
      objectPosition: "center"
    },
    links: [{ label: "View Poster", href: "/pdfs/urop.pdf" }]
  }
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
