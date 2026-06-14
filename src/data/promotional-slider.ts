export interface PromotionalSliderType {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  bgGradient: string;
  borderColor: string;
  textColor: string;
  descColor: string;
  accentColor: string;
  badge?: string;
  badgeBg?: string;
}

export const PromotionalSlider: PromotionalSliderType[] = [
  {
    id: 1,
    title: "Sweet Watermelon",
    description: "100% organic, sweet, and seedless. Perfect for refreshing summer days.",
    image: "https://res.cloudinary.com/smtanimur/image/upload/v1700109998/samples/Watermelon_4_jbgrdz.png",
    link: "/products",
    bgGradient: "from-rose-50 to-rose-100/60 dark:from-rose-950/20 dark:to-rose-900/10",
    borderColor: "border-rose-100 dark:border-rose-900/30",
    textColor: "text-rose-900 dark:text-rose-100",
    descColor: "text-rose-700/80 dark:text-rose-300/80",
    accentColor: "text-rose-600 dark:text-rose-400",
    badge: "15% OFF",
    badgeBg: "bg-rose-100/80 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300",
  },
  {
    id: 2,
    title: "Zesty Kiwi Pack",
    description: "Packed with vitamin C and antioxidants. Freshly imported organic kiwis.",
    image: "https://res.cloudinary.com/smtanimur/image/upload/v1700109998/samples/Kiwi_4_ehlq5l.png",
    link: "/products",
    bgGradient: "from-lime-50 to-emerald-100/60 dark:from-emerald-950/20 dark:to-lime-950/10",
    borderColor: "border-emerald-100 dark:border-emerald-900/30",
    textColor: "text-emerald-900 dark:text-emerald-100",
    descColor: "text-emerald-700/80 dark:text-emerald-300/80",
    accentColor: "text-emerald-600 dark:text-emerald-400",
    badge: "Superfood",
    badgeBg: "bg-emerald-100/80 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300",
  },
  {
    id: 3,
    title: "Golden Pumpkins",
    description: "Rich in fiber and vitamins. Perfect for roasting, soups, or baked treats.",
    image: "https://res.cloudinary.com/smtanimur/image/upload/v1700109998/samples/Pumpkin_3_lfdflh.png",
    link: "/products",
    bgGradient: "from-orange-50 to-amber-100/60 dark:from-orange-950/20 dark:to-amber-950/10",
    borderColor: "border-orange-100 dark:border-orange-900/30",
    textColor: "text-orange-900 dark:text-orange-100",
    descColor: "text-orange-700/80 dark:text-orange-300/80",
    accentColor: "text-orange-600 dark:text-orange-400",
    badge: "Best Seller",
    badgeBg: "bg-orange-100/80 dark:bg-orange-950/80 text-orange-700 dark:text-orange-300",
  },
  {
    id: 4,
    title: "Sweet Green Peas",
    description: "Crisp, sweet, and bursting with garden-fresh flavor from local fields.",
    image: "https://res.cloudinary.com/smtanimur/image/upload/v1700109997/samples/Pea_1_bcwnxy.png",
    link: "/products",
    bgGradient: "from-green-50 to-emerald-100/60 dark:from-green-950/20 dark:to-emerald-950/10",
    borderColor: "border-green-100 dark:border-green-900/30",
    textColor: "text-green-900 dark:text-green-100",
    descColor: "text-green-700/80 dark:text-green-300/80",
    accentColor: "text-green-600 dark:text-green-400",
    badge: "Farm Fresh",
    badgeBg: "bg-green-100/80 dark:bg-green-950/80 text-green-700 dark:text-green-300",
  },
  {
    id: 5,
    title: "Vibrant Capsicums",
    description: "Crisp and colorful bell peppers. Perfect for salads, fajitas, and stir-fry.",
    image: "https://res.cloudinary.com/smtanimur/image/upload/v1700111234/samples/Capsicum_1_izuiyc.png",
    link: "/products",
    bgGradient: "from-yellow-50 to-amber-100/60 dark:from-yellow-950/20 dark:to-amber-950/10",
    borderColor: "border-yellow-200/50 dark:border-yellow-900/30",
    textColor: "text-amber-900 dark:text-yellow-100",
    descColor: "text-amber-700/80 dark:text-yellow-300/80",
    accentColor: "text-amber-600 dark:text-amber-400",
    badge: "20% OFF",
    badgeBg: "bg-yellow-100/80 dark:bg-yellow-950/80 text-amber-700 dark:text-yellow-300",
  },
];
