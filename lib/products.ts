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
    name: "قفطان موديل 01",
    nameEn: "Kaftan Model 01",
    description:
      "فستان راقٍ مصنوع من الحرير الطبيعي الفاخر، بتصميم كلاسيكي يُبرز أنوثتك بأسلوب عصري. مثالي للمناسبات الخاصة والسهرات الراقية.",
    category: "فساتين",
    price: 7000,
    originalPrice: 8200,
    rating: 4.8,
    reviewCount: 76,
    image: "/products/kaftan-01-green.png",
    images: [
      "/products/kaftan-01-green.png",
      "/products/kaftan-01-black.png",
      "/products/kaftan-01-white.png",
      "/products/kaftan-01-orange.png",
      "/products/kaftan-01-pink.png",
      "/products/kaftan-01-pink2.png",
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
