import type { FooterItem, MainNavItem } from "@/types"


import { slugify } from "@/lib/utils"

export type SiteConfig = typeof siteConfig

const links = {
  twitter: "https://twitter.com/SMTanimur",
  github: "https://github.com/SMTanimur/Zazila-bazar",
  githubAccount: "https://github.com/SMTanimur",
}

export const siteConfig = {
  name: "Zazila-bazar",
  description:
    "An open source e-commerce jazila-bazar build with everything new in Next.js 13.",
  url: "https://jazila-bazar.vercel.app",
  ogImage: "https://jazila-bazar.vercel.app/opengraph-image.png",
  mainNav: [
    {
      title: "Lobby",
      items: [
        {
          title: "Products",
          href: "/products",
          description: "All the products we have to offer.",
          items: [],
        },
        {
          title: "Build a Board",
          href: "/build-a-board",
          description: "Build your own custom skateboard.",
          items: [],
        },
        {
          title: "Blog",
          href: "/blog",
          description: "Read our latest blog posts.",
          items: [],
        },
      ],
    },
    // ...productCategories.map((category) => ({
    //   title: category.title,
    //   items: [
    //     {
    //       title: "All",
    //       href: `/categories/${slugify(category.title)}`,
    //       description: `All ${category.title}.`,
    //       items: [],
    //     },
    //     ...category.subcategories.map((subcategory) => ({
    //       title: subcategory.title,
    //       href: `/categories/${slugify(category.title)}/${subcategory.slug}`,
    //       description: subcategory.description,
    //       items: [],
    //     })),
    //   ],
    // })),
  ] satisfies MainNavItem[],
  links,
  footerNav: [
    {
      title: "Credits",
      items: [
        {
          title: "Acme Corp",
          href: "https://acme-corp.jumr.dev",
          external: true,
        },
       
        {
          title: "Taxonomy",
          href: "https://tx.shadcn.com/",
          external: true,
        },
        {
          title: "shadcn/ui",
          href: "https://ui.shadcn.com",
          external: true,
        },
      ],
    },
    {
      title: "Help",
      items: [
        {
          title: "About",
          href: "/about",
          external: false,
        },
        {
          title: "Contact",
          href: "/contact",
          external: false,
        },
        {
          title: "Terms",
          href: "/terms",
          external: false,
        },
        {
          title: "Privacy",
          href: "/privacy",
          external: false,
        },
      ],
    },
    {
      title: "Social",
      items: [
        {
          title: "Twitter",
          href: links.twitter,
          external: true,
        },
        {
          title: "GitHub",
          href: links.githubAccount,
          external: true,
        },
        
      ],
    },
  ] satisfies FooterItem[],
}
