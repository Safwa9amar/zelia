export interface Product {
  id: number;
  name: string;
  nameEn: string;
  description: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  images: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  isNew?: boolean;
  isSale?: boolean;
  isFeatured?: boolean;
  tags: string[];
}

export const products: Product[] = [
  {
    id: 1,
    name: "جبة قطيفة موديل 03",
    nameEn: "Jebba Katifa Model 03",
    description:
      "فستان راقٍ مصنوع من الحرير الطبيعي الفاخر، بتصميم كلاسيكي يُبرز أنوثتك بأسلوب عصري. مثالي للمناسبات الخاصة والسهرات الراقية.",
    category: "فساتين",
    price: 6000,
    originalPrice: 7200,
    rating: 4.9,
    reviewCount: 76,
    image: "/products/jebba-03-black.png",
    images: [
      "/products/jebba-03-black.png",
      "/products/jebba-03-blue.png",
      "/products/jebba-03-green.png",
      "/products/jebba-03-purple.png",
      "/products/jebba-03-red.png",
    ],
    colors: [
      { name: "أزرق", hex: "#160094" },
      { name: "أحمر", hex: "#720303" },
      { name: "بنفسجي", hex: "#5a0075" },
      { name: "أخضر غامق", hex: "#00521b" },
      { name: "أحمر برقندي", hex: "#810424" },
      { name: "أسود", hex: "#050505" },
    ],
    sizes: ["L", "XL", "2XL"],
    isNew: false,
    isSale: true,
    isFeatured: true,
    tags: ["فساتين", "سهرة", "حرير"],
  },
  {
    id: 2,
    name: "قفطان موديل 02",
    nameEn: "Kaftan Model 02",
    description:
      "فستان راقٍ مصنوع من الحرير الطبيعي الفاخر، بتصميم كلاسيكي يُبرز أنوثتك بأسلوب عصري. مثالي للمناسبات الخاصة والسهرات الراقية.",
    category: "فساتين",
    price: 8500,
    originalPrice: 9200,
    rating: 4.9,
    reviewCount: 76,
    image: "/products/kaftan-02-red.png",
    images: [
      "/products/kaftan-02-red.png",
      "/products/kaftan-02-emerald.png",
      "/products/kaftan-02-mint.png",
      "/products/kaftan-02-blue.png",
      "/products/kaftan-02-lightblue.png",
    ],
    colors: [
      { name: "أزرق كحلي فاخر", hex: "#1B2A52" },
      { name: "أحمر فاقع", hex: "#C8102E" },
      { name: "أخضر نعناعي", hex: "#B2D8B2" },
      { name: "أخضر زمردي", hex: "#046307" },
      { name: "أزرق فاتح", hex: "#AEC6CF" },
      { name: "أزرق ملكي", hex: "#4169E1" },
      { name: " وردي فاتح", hex: "#E8B7B9" },
      { name: " أزرق زمردي", hex: "#1d58d6" },
    ],
    sizes: ["L", "XL", "2XL"],
    isNew: false,
    isSale: true,
    isFeatured: true,
    tags: ["فساتين", "سهرة", "حرير"],
  },
  {
    id: 3,
    name: "قفطان موديل 03",
    nameEn: "Kaftan Model 03",
    description:
      "فستان راقٍ مصنوع من الحرير الطبيعي الفاخر، بتصميم كلاسيكي يُبرز أنوثتك بأسلوب عصري. مثالي للمناسبات الخاصة والسهرات الراقية.",
    category: "فساتين",
    price: 8500,
    originalPrice: 9200,
    rating: 4.9,
    reviewCount: 76,
    image: "/products/kaftan-03-orange.png",
    images: [
      "/products/kaftan-03-orange.png",
      "/products/kaftan-03-navy.png",
      "/products/kaftan-03-olive.png",
      "/products/kaftan-03-black.png",
      "/products/kaftan-03-sage.png",
    ],
    colors: [
      { name: "برتقالي مرجاني محروق", hex: "#E84A1C" },
      { name: "أسود فحمي داكن", hex: "#0B0B0D" },
      { name: "أخضر زيتوني كلاسيكي", hex: "#8FA63A" },
      { name: "وردي فوشيا ملكي", hex: "#D63A7A" },
      { name: "أزرق كحلي كلاسيكي", hex: "#243A6B" },
      { name: "أخضر سيج ضبابي", hex: "#7E9C95" },
    ],
    sizes: ["L", "XL", "2XL"],
    isNew: false,
    isSale: true,
    isFeatured: true,
    tags: ["فساتين", "سهرة", "حرير"],
  },
  {
    id: 4,
    name: "قفطان موديل 04",
    nameEn: "Kaftan Model 04",
    description:
      "فستان راقٍ مصنوع من الحرير الطبيعي الفاخر، بتصميم كلاسيكي يُبرز أنوثتك بأسلوب عصري. مثالي للمناسبات الخاصة والسهرات الراقية.",
    category: "فساتين",
    price: 7000,
    originalPrice: 8200,
    rating: 4.9,
    reviewCount: 76,
    image: "/products/kaftan-04-lightblue.png",
    images: [
      "/products/kaftan-04-lightblue.png",
      "/products/kaftan-04-cream.png",
      "/products/kaftan-04-mint.png",
      "/products/kaftan-04-coral.png",
      "/products/kaftan-04-navy.png",
    ],
    colors: [
      { name: "أزرق كحلي فاخر", hex: "#002896" },
      { name: "أخضر نعناعي", hex: "#B2D8B2" },
      { name: "أزرق فاتح", hex: "#AEC6CF" },
      { name: "وردي فاتح", hex: "#E8B7B9" },
      { name: "برتقالي مرجاني", hex: "#E84A1C" },
      { name: "أوف وايت (كريمي فاتح)", hex: "#F2EFE6" },
    ],
    sizes: ["L", "XL", "2XL"],
    isNew: false,
    isSale: true,
    isFeatured: true,
    tags: ["فساتين", "سهرة", "حرير"],
  },
  {
    id: 5,
    name: "جبة قطيفة موديل 01",
    nameEn: "Jebba Katifa Model 01",
    description:
      "فستان راقٍ مصنوع من الحرير الطبيعي الفاخر، بتصميم كلاسيكي يُبرز أنوثتك بأسلوب عصري. مثالي للمناسبات الخاصة والسهرات الراقية.",
    category: "فساتين",
    price: 6000,
    originalPrice: 7200,
    rating: 4.9,
    reviewCount: 76,
    image: "/products/jebba-01-black.png",
    images: [
      "/products/jebba-01-black.png",
      "/products/jebba-01-blue.png",
      "/products/jebba-01-green.png",
      "/products/jebba-01-purple.png",
      "/products/jebba-01-red.png",
    ],
    colors: [
      { name: "أزرق", hex: "#160094" },
      { name: "أحمر", hex: "#720303" },
      { name: "بنفسجي", hex: "#5a0075" },
      { name: "أخضر غامق", hex: "#00521b" },
      { name: "أحمر برقندي", hex: "#810424" },
      { name: "أسود", hex: "#050505" },
    ],
    sizes: ["L", "XL", "2XL"],
    isNew: false,
    isSale: true,
    isFeatured: true,
    tags: ["فساتين", "سهرة", "حرير"],
  },
  {
    id: 6,
    name: "جبة قطيفة موديل 02",
    nameEn: "Jebba Katifa Model 02",
    description:
      "فستان راقٍ مصنوع من الحرير الطبيعي الفاخر، بتصميم كلاسيكي يُبرز أنوثتك بأسلوب عصري. مثالي للمناسبات الخاصة والسهرات الراقية.",
    category: "فساتين",
    price: 6000,
    originalPrice: 7200,
    rating: 4.9,
    reviewCount: 76,
    image: "/products/jebba-02-blue.png",
    images: [
      "/products/jebba-02-blue.png",
      "/products/jebba-02-green.png",
      "/products/jebba-02-purple.png",
      "/products/jebba-02-red.png",
      "/products/jebba-02-black.png",
    ],
    colors: [
      { name: "أزرق", hex: "#160094" },
      { name: "أحمر", hex: "#720303" },
      { name: "بنفسجي", hex: "#5a0075" },
      { name: "أخضر غامق", hex: "#00521b" },
      { name: "أسود", hex: "#050505" },
    ],
    sizes: ["L", "XL", "2XL"],
    isNew: false,
    isSale: true,
    isFeatured: true,
    tags: ["فساتين", "سهرة", "حرير"],
  },
  {
    id: 7,
    name: "قفطان موديل 01",
    nameEn: "Kaftan Model 01",
    description:
      "فستان راقٍ مصنوع من الحرير الطبيعي الفاخر، بتصميم كلاسيكي يُبرز أنوثتك بأسلوب عصري. مثالي للمناسبات الخاصة والسهرات الراقية.",
    category: "فساتين",
    price: 7000,
    originalPrice: 8200,
    rating: 4.8,
    reviewCount: 76,
    image: "/products/kaftan-01-orange.png",
    images: [
      "/products/kaftan-01-orange.png",
      "/products/kaftan-01-black.png",
      "/products/kaftan-01-offwhite.png",
      "/products/kaftan-01-lime.png",
      "/products/kaftan-01-pink.png",
    ],
    colors: [
      { name: "برتقالي ساطع", hex: "#F47C20" },
      { name: "وردي فاقع", hex: "#E63E7C" },
      { name: "أوف وايت (كريمي فاتح)", hex: "#F2EFE6" },
      { name: "أسود", hex: "#0B0B0D" },
      { name: "وردي فاتح", hex: "#E8B7B9" },
      { name: "أخضر ليموني فاتح", hex: "#C7D94A" },
      { name: "أزرق فاتح مائل للبنفسجي", hex: "#B7B9D9" },
      { name: "أخضر فاتح باهت", hex: "#D6E2C8" },
    ],
    sizes: ["L", "XL", "2XL"],
    isNew: false,
    isSale: true,
    isFeatured: true,
    tags: ["فساتين", "سهرة", "حرير"],
  },
];

export const categories = [
  "الكل",
  "فساتين",
  "بلوزات",
  "تنانير",
  "بناطيل",
  "معاطف",
  "جاكيتات",
  "عبايات",
  "حقائب",
  "أحذية",
  "إكسسوارات",
];

export function getProductById(id: number): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getRelatedProducts(product: Product, count = 4): Product[] {
  return products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, count);
}

export function getFeaturedProducts(count = 4): Product[] {
  return products.filter((p) => p.isFeatured).slice(0, count);
}

export function getNewProducts(count = 4): Product[] {
  return products.filter((p) => p.isNew).slice(0, count);
}

export function getSaleProducts(): Product[] {
  return products.filter((p) => p.isSale);
}
