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

// Using curated Unsplash photo IDs (fashion / lifestyle)
const UNSPLASH = (id: string, w = 600, h = 750) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

export const products: Product[] = [
  {
    id: 1,
    name: "فستان أوريليا الحريري",
    nameEn: "Aurelia Silk Dress",
    description:
      "فستان راقٍ مصنوع من الحرير الطبيعي الفاخر، بتصميم كلاسيكي يُبرز أنوثتك بأسلوب عصري. مثالي للمناسبات الخاصة والسهرات الراقية.",
    category: "فساتين",
    price: 489,
    originalPrice: 650,
    rating: 4.8,
    reviewCount: 124,
    image: UNSPLASH("1568252542512-9fe8fe9c87bb"),
    images: [
      UNSPLASH("1568252542512-9fe8fe9c87bb"),
      UNSPLASH("1515886657613-9f3515b0c78f"),
      UNSPLASH("1529139574466-a303027f1573"),
    ],
    colors: [
      { name: "كريمي", hex: "#F5ECE0" },
      { name: "وردي غامق", hex: "#C47B8A" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    isNew: false,
    isSale: true,
    isFeatured: true,
    tags: ["فساتين", "سهرة", "حرير"],
  },
  {
    id: 2,
    name: "بلوزة لالا الساتان",
    nameEn: "Lala Satin Blouse",
    description:
      "بلوزة من الساتان الناعم بقصة مريحة وعصرية، تُناسب مختلف المناسبات من الكاجوال إلى السهرات.",
    category: "بلوزات",
    price: 195,
    rating: 4.6,
    reviewCount: 87,
    image: UNSPLASH("1585487000160-6ebcfceb0d03"),
    images: [
      UNSPLASH("1585487000160-6ebcfceb0d03"),
      UNSPLASH("1490481651871-ab68de25d43d"),
    ],
    colors: [
      { name: "سكري", hex: "#E8C4C4" },
      { name: "كريمي", hex: "#F5ECE0" },
      { name: "رمادي فاتح", hex: "#D0C8C8" },
    ],
    sizes: ["XS", "S", "M", "L"],
    isNew: true,
    isFeatured: true,
    tags: ["بلوزات", "ساتان"],
  },
  {
    id: 3,
    name: "تنورة ميدي البيج",
    nameEn: "Beige Midi Skirt",
    description:
      "تنورة ميدي بقصة مستقيمة أنيقة من قماش الساتان، تُمنحك إطلالة راقية وأنيقة طوال اليوم.",
    category: "تنانير",
    price: 220,
    rating: 4.5,
    reviewCount: 63,
    image: UNSPLASH("1594938298603-e776d3e31a4"),
    images: [
      UNSPLASH("1594938298603-e776d3e31a4"),
      UNSPLASH("1509631179647-0177331693ae"),
    ],
    colors: [
      { name: "بيج", hex: "#C8B09A" },
      { name: "بني", hex: "#7D5A4F" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    isNew: false,
    isFeatured: true,
    tags: ["تنانير", "ميدي"],
  },
  {
    id: 4,
    name: "معطف نوفا الكاشمير",
    nameEn: "Nova Cashmere Coat",
    description:
      "معطف أنيق من الكاشمير الفاخر يُوفر دفئاً مطلقاً مع الحفاظ على أناقتك في أشد الأيام برودةً.",
    category: "معاطف",
    price: 780,
    originalPrice: 950,
    rating: 4.9,
    reviewCount: 201,
    image: UNSPLASH("1539109136881-3be0616acf4b"),
    images: [
      UNSPLASH("1539109136881-3be0616acf4b"),
      UNSPLASH("1548624149-f9b3c0f2e3e3"),
    ],
    colors: [
      { name: "كاميل", hex: "#C19A6B" },
      { name: "رمادي", hex: "#9E9E9E" },
      { name: "أسود", hex: "#1C1C1C" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    isNew: false,
    isSale: true,
    isFeatured: true,
    tags: ["معاطف", "كاشمير", "شتاء"],
  },
  {
    id: 5,
    name: "حقيبة بيرلا اليدوية",
    nameEn: "Perla Hand Bag",
    description:
      "حقيبة يدوية فاخرة من الجلد الطبيعي بتصميم بسيط وأنيق. مثالية لإضفاء لمسة راقية على أي إطلالة.",
    category: "حقائب",
    price: 350,
    rating: 4.7,
    reviewCount: 156,
    image: UNSPLASH("1590874103328-eac38a683ce7"),
    images: [
      UNSPLASH("1590874103328-eac38a683ce7"),
      UNSPLASH("1584917865442-de89df76afd3"),
    ],
    colors: [
      { name: "بيج", hex: "#C8B09A" },
      { name: "أسود", hex: "#1C1C1C" },
      { name: "بني", hex: "#7D5A4F" },
    ],
    sizes: ["واحد"],
    isNew: false,
    isFeatured: false,
    tags: ["حقائب", "جلد"],
  },
  {
    id: 6,
    name: "حذاء ستيلار الجلدي",
    nameEn: "Stellar Leather Heels",
    description:
      "حذاء بكعب مريح من الجلد الطبيعي، بتصميم عصري يُناسب كل المناسبات من العمل إلى السهرات.",
    category: "أحذية",
    price: 280,
    originalPrice: 340,
    rating: 4.4,
    reviewCount: 92,
    image: UNSPLASH("1543163521-1bf539c55dd2"),
    images: [UNSPLASH("1543163521-1bf539c55dd2")],
    colors: [
      { name: "بيج", hex: "#C8B09A" },
      { name: "أسود", hex: "#1C1C1C" },
    ],
    sizes: ["36", "37", "38", "39", "40", "41"],
    isNew: false,
    isSale: true,
    tags: ["أحذية", "كعب"],
  },
  {
    id: 7,
    name: "طقم مجوهرات لونا",
    nameEn: "Luna Jewelry Set",
    description:
      "طقم مجوهرات ذهبي فاخر يشمل قلادة وأقراطاً مطابقة، مثالي لإتمام أي إطلالة.",
    category: "إكسسوارات",
    price: 165,
    rating: 4.8,
    reviewCount: 73,
    image: UNSPLASH("1535632066-55c2b8b6ba80"),
    images: [UNSPLASH("1535632066-55c2b8b6ba80")],
    colors: [{ name: "ذهبي", hex: "#D4AF37" }],
    sizes: ["واحد"],
    isNew: true,
    isFeatured: false,
    tags: ["إكسسوارات", "مجوهرات", "ذهب"],
  },
  {
    id: 8,
    name: "عباءة سارة المطرزة",
    nameEn: "Sara Embroidered Abaya",
    description:
      "عباءة فاخرة بتطريز يدوي دقيق على الأطراف، مصنوعة من قماش العباءة الفاخر الخفيف والمريح.",
    category: "عبايات",
    price: 420,
    rating: 4.9,
    reviewCount: 315,
    image: UNSPLASH("1558769132-cb1aea458c5e"),
    images: [UNSPLASH("1558769132-cb1aea458c5e")],
    colors: [
      { name: "أسود", hex: "#1C1C1C" },
      { name: "كحلي", hex: "#2C3E6B" },
      { name: "رمادي غامق", hex: "#4A4A4A" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    isNew: false,
    isFeatured: true,
    tags: ["عبايات", "تطريز"],
  },
  {
    id: 9,
    name: "فستان صيفي نادين",
    nameEn: "Nadine Summer Dress",
    description:
      "فستان صيفي خفيف ومريح من قماش الكتان، مثالي للنزهات والمناسبات الكاجوال في فصل الصيف.",
    category: "فساتين",
    price: 175,
    rating: 4.3,
    reviewCount: 48,
    image: UNSPLASH("1496217590455-aa63a8350eea"),
    images: [UNSPLASH("1496217590455-aa63a8350eea")],
    colors: [
      { name: "وردي فاتح", hex: "#F4C2C2" },
      { name: "أبيض", hex: "#FAFAFA" },
    ],
    sizes: ["XS", "S", "M", "L"],
    isNew: true,
    tags: ["فساتين", "صيف", "كتان"],
  },
  {
    id: 10,
    name: "بنطال ريم الواسع",
    nameEn: "Reem Wide-Leg Pants",
    description:
      "بنطال بقصة واسعة أنيقة، يُضفي مظهراً راقياً وعصرياً — سهل التنسيق مع مختلف القطع.",
    category: "بناطيل",
    price: 210,
    rating: 4.6,
    reviewCount: 59,
    image: UNSPLASH("1506629082955-511b1aa562c8"),
    images: [UNSPLASH("1506629082955-511b1aa562c8")],
    colors: [
      { name: "أبيض", hex: "#FAFAFA" },
      { name: "بيج", hex: "#C8B09A" },
      { name: "أسود", hex: "#1C1C1C" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    isNew: false,
    tags: ["بناطيل", "كاجوال"],
  },
  {
    id: 11,
    name: "سكارف شيماء الحريري",
    nameEn: "Shaimaa Silk Scarf",
    description:
      "وشاح من الحرير الطبيعي بطبعات مستوحاة من فن الشرق، متعدد الاستخدامات وأنيق في كل المناسبات.",
    category: "إكسسوارات",
    price: 120,
    rating: 4.5,
    reviewCount: 44,
    image: UNSPLASH("1601924994987-69e26d50dc26"),
    images: [UNSPLASH("1601924994987-69e26d50dc26")],
    colors: [
      { name: "وردي وذهبي", hex: "#D4AF37" },
    ],
    sizes: ["واحد"],
    isNew: false,
    tags: ["إكسسوارات", "حرير", "وشاح"],
  },
  {
    id: 12,
    name: "كارديجان أميرة الصوف",
    nameEn: "Amira Wool Cardigan",
    description:
      "كارديجان دافئ من صوف مرينو الفاخر، بقصة مريحة تُناسب الأيام الباردة مع الحفاظ على الأناقة.",
    category: "بلوزات",
    price: 260,
    rating: 4.7,
    reviewCount: 82,
    image: UNSPLASH("1434389677669-e08b4cac3105"),
    images: [UNSPLASH("1434389677669-e08b4cac3105")],
    colors: [
      { name: "كريمي", hex: "#F5ECE0" },
      { name: "وردي غامق", hex: "#C47B8A" },
      { name: "بيج", hex: "#C8B09A" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    isNew: false,
    isFeatured: true,
    tags: ["بلوزات", "كارديجان", "صوف"],
  },
  {
    id: 13,
    name: "حزام نورة الجلدي",
    nameEn: "Noura Leather Belt",
    description:
      "حزام من الجلد الطبيعي بإبزيم ذهبي أنيق، يُضيف لمسة راقية لأي إطلالة.",
    category: "إكسسوارات",
    price: 95,
    rating: 4.4,
    reviewCount: 31,
    image: UNSPLASH("1553062407-98eeb64c6a62"),
    images: [UNSPLASH("1553062407-98eeb64c6a62")],
    colors: [
      { name: "بني", hex: "#7D5A4F" },
      { name: "أسود", hex: "#1C1C1C" },
    ],
    sizes: ["S", "M", "L"],
    isNew: false,
    tags: ["إكسسوارات", "حزام", "جلد"],
  },
  {
    id: 14,
    name: "فستان دانا المطرز",
    nameEn: "Dana Embroidered Dress",
    description:
      "فستان ماكسي مطرز بزهور دقيقة، مستوحى من الفن العربي الأصيل، مثالي للحفلات والمناسبات الخاصة.",
    category: "فساتين",
    price: 540,
    originalPrice: 680,
    rating: 4.8,
    reviewCount: 97,
    image: UNSPLASH("1518611012118-696072aa579a"),
    images: [UNSPLASH("1518611012118-696072aa579a")],
    colors: [
      { name: "وردي", hex: "#C47B8A" },
      { name: "أزرق", hex: "#6B8CAE" },
    ],
    sizes: ["XS", "S", "M", "L"],
    isNew: false,
    isSale: true,
    tags: ["فساتين", "تطريز", "سهرة"],
  },
  {
    id: 15,
    name: "نظارة شمسية آيا",
    nameEn: "Aya Sunglasses",
    description:
      "نظارة شمسية بإطار من الأسيتات الفاخرة، تُوفر حماية UV400 مع تصميم أنيق وعصري.",
    category: "إكسسوارات",
    price: 145,
    rating: 4.3,
    reviewCount: 56,
    image: UNSPLASH("1508296695146-257a814ea21a"),
    images: [UNSPLASH("1508296695146-257a814ea21a")],
    colors: [
      { name: "عسلي", hex: "#C19A6B" },
      { name: "أسود", hex: "#1C1C1C" },
    ],
    sizes: ["واحد"],
    isNew: true,
    tags: ["إكسسوارات", "نظارات"],
  },
  {
    id: 16,
    name: "تنورة ليلى المطوية",
    nameEn: "Layla Pleated Skirt",
    description:
      "تنورة مطوية أنيقة بطول ميدي، تتحرك بخفة وأناقة، مثالية للمكتب والمناسبات اليومية.",
    category: "تنانير",
    price: 185,
    rating: 4.5,
    reviewCount: 41,
    image: UNSPLASH("1509631179647-0177331693ae"),
    images: [UNSPLASH("1509631179647-0177331693ae")],
    colors: [
      { name: "بودر", hex: "#F4C2C2" },
      { name: "أخضر سيج", hex: "#8FAF8A" },
      { name: "بيج", hex: "#C8B09A" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    isNew: false,
    tags: ["تنانير", "بليسيه"],
  },
  {
    id: 17,
    name: "بيجامة فلة الحريرية",
    nameEn: "Fulla Silk Pajama Set",
    description:
      "طقم بيجامة فاخر من الحرير الطبيعي للراحة المطلقة في المنزل مع الحفاظ على الأناقة.",
    category: "ملابس المنزل",
    price: 320,
    rating: 4.7,
    reviewCount: 68,
    image: UNSPLASH("1571513800374-df1abb650a4",600,750),
    images: [UNSPLASH("1571513800374-df1abb650a4")],
    colors: [
      { name: "سكري", hex: "#E8C4C4" },
      { name: "أزرق فاتح", hex: "#B8D0E8" },
    ],
    sizes: ["XS", "S", "M", "L"],
    isNew: false,
    tags: ["ملابس المنزل", "حرير", "بيجامة"],
  },
  {
    id: 18,
    name: "قفازات هيفاء الجلدية",
    nameEn: "Hifaa Leather Gloves",
    description:
      "قفازات من الجلد الطبيعي المبطن لإضافة دفء وأناقة خلال فصل الشتاء.",
    category: "إكسسوارات",
    price: 85,
    rating: 4.2,
    reviewCount: 29,
    image: UNSPLASH("1605408499391-65e5bcce4f2", 600, 750),
    images: [UNSPLASH("1605408499391-65e5bcce4f2")],
    colors: [
      { name: "أسود", hex: "#1C1C1C" },
      { name: "بني غامق", hex: "#4A3020" },
    ],
    sizes: ["S/M", "L/XL"],
    isNew: false,
    tags: ["إكسسوارات", "قفازات", "جلد"],
  },
  {
    id: 19,
    name: "جاكيت زهرة التويد",
    nameEn: "Zahra Tweed Jacket",
    description:
      "جاكيت بقصة كلاسيكية من قماش التويد الفاخر، يُضيف طابعاً راقياً وأصيلاً لأي إطلالة.",
    category: "جاكيتات",
    price: 480,
    rating: 4.8,
    reviewCount: 113,
    image: UNSPLASH("1591047139829-d91aecb6caea"),
    images: [UNSPLASH("1591047139829-d91aecb6caea")],
    colors: [
      { name: "كريمي وذهبي", hex: "#F5ECE0" },
    ],
    sizes: ["XS", "S", "M", "L"],
    isNew: false,
    isFeatured: true,
    tags: ["جاكيتات", "تويد", "كلاسيك"],
  },
  {
    id: 20,
    name: "صندل سلمى الصيفي",
    nameEn: "Salma Summer Sandal",
    description:
      "صندل صيفي خفيف وأنيق من الجلد الطبيعي، يُناسب مختلف المناسبات الكاجوال والرسمية.",
    category: "أحذية",
    price: 160,
    rating: 4.4,
    reviewCount: 77,
    image: UNSPLASH("1543163521-1bf539c55dd2",600,750),
    images: [UNSPLASH("1543163521-1bf539c55dd2")],
    colors: [
      { name: "ذهبي", hex: "#D4AF37" },
      { name: "بيج", hex: "#C8B09A" },
    ],
    sizes: ["36", "37", "38", "39", "40"],
    isNew: true,
    tags: ["أحذية", "صندل", "صيف"],
  },
];

export const categories = [
  { id: "all", name: "الكل", icon: "✦" },
  { id: "فساتين", name: "فساتين", icon: "👗" },
  { id: "بلوزات", name: "بلوزات", icon: "👚" },
  { id: "تنانير", name: "تنانير", icon: "🩱" },
  { id: "بناطيل", name: "بناطيل", icon: "👖" },
  { id: "معاطف", name: "معاطف", icon: "🧥" },
  { id: "جاكيتات", name: "جاكيتات", icon: "🥻" },
  { id: "عبايات", name: "عبايات", icon: "🌙" },
  { id: "حقائب", name: "حقائب", icon: "👜" },
  { id: "أحذية", name: "أحذية", icon: "👠" },
  { id: "إكسسوارات", name: "إكسسوارات", icon: "💎" },
  { id: "ملابس المنزل", name: "ملابس المنزل", icon: "🏡" },
];

export function getProductById(id: number): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.isFeatured);
}

export function getProductsByCategory(cat: string): Product[] {
  if (cat === "all") return products;
  return products.filter((p) => p.category === cat);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.includes(q) ||
      p.nameEn.toLowerCase().includes(q) ||
      p.category.includes(q) ||
      p.tags.some((t) => t.includes(q))
  );
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, limit);
}
