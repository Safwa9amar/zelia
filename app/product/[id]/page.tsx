"use client";
import { useState, use } from "react";
import { IoSearchOutline } from "react-icons/io5";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ProductCard from "@/app/components/ProductCard";
import ProductImages from "@/app/components/ProductImages";
import OrderForm from "@/app/components/OrderForm";
import { getProductById, getRelatedProducts } from "@/lib/products";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const product = getProductById(Number(id));
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string>("details");

  if (!product) {
    return (
      <>
        <Header />
        <div className="not-found">
          <span className="nf-icon">
            <IoSearchOutline />
          </span>
          <h1 className="nf-title">المنتج غير موجود</h1>
          <p className="nf-desc">
            لا يمكن إيجاد المنتج المطلوب. يرجى العودة للمتجر.
          </p>
          <Link href="/catalog" className="btn-primary">
            العودة للمتجر
          </Link>
        </div>
        <Footer />
        <style jsx>{`
          .not-found {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 60vh;
            gap: 16px;
            text-align: center;
            padding: 40px;
          }
          .nf-icon {
            font-size: 56px;
          }
          .nf-title {
            font-size: 28px;
            color: var(--dark);
          }
          .nf-desc {
            font-size: 15px;
            color: var(--gray-warm);
          }
        `}</style>
      </>
    );
  }

  const related = getRelatedProducts(product, 4);

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const accordions = [
    {
      id: "details",
      label: "تفاصيل المنتج",
      content: product.description,
    },
    {
      id: "sizing",
      label: "دليل المقاسات",
      content:
        "XS: مقاس 34-36 | S: مقاس 36-38 | M: مقاس 38-40 | L: مقاس 40-42 | XL: مقاس 42-44",
    },
    {
      id: "shipping",
      label: "الشحن والإرجاع",
      content: "يُسلَّم خلال 3-5 أيام عمل.",
    },
  ];

  return (
    <>
      <Header />
      <main>
        {/* Breadcrumb */}
        <nav className="breadcrumb container" aria-label="مسار التنقل">
          <Link href="/" className="bc-link">
            الرئيسية
          </Link>
          <span className="bc-sep">›</span>
          <Link href="/catalog" className="bc-link">
            المتجر
          </Link>
          <span className="bc-sep">›</span>
          <Link
            href={`/catalog?category=${encodeURIComponent(product.category)}`}
            className="bc-link"
          >
            {product.category}
          </Link>
          <span className="bc-sep">›</span>
          <span className="bc-current">{product.name}</span>
        </nav>

        <div className="product-layout container">
          {/* Images */}
          <div className="product-images-col">
            <ProductImages images={product.images} productName={product.name} />
          </div>

          {/* Info */}
          <div className="product-info-col">
            <p className="pd-category">{product.category}</p>
            <h1 className="pd-name">{product.name}</h1>
            {/* Description */}
            <p className="pd-description">{product.description}</p>

            {/* Rating */}
            {/* <div className="pd-rating">
              <div className="stars">
                {[1, 2, 3, 4, 5].map((s) => (
                  <svg
                    key={s}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill={s <= Math.round(product.rating) ? "#C4A882" : "none"}
                    stroke="#C4A882"
                    strokeWidth="1.5"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <span className="pd-rating-num">{product.rating}</span>
              <span className="pd-rating-count">
                ({product.reviewCount} تقييم)
              </span>
            </div> */}

            {/* Price */}
            <div className="pd-price-row">
              <span className="pd-price">
                {product.price.toLocaleString("ar-DZ")} د.ج
              </span>
              {product.originalPrice && (
                <>
                  <span className="pd-original-price">
                    {product.originalPrice.toLocaleString("ar-DZ")} د.ج
                  </span>
                  <span className="pd-discount-badge">وفري {discount}%</span>
                </>
              )}
            </div>

            {/* Unified Order Form (color, size, quantity + delivery form) */}
            <OrderForm
              productName={product.name}
              basePrice={product.price}
              originalPrice={product.originalPrice}
              colors={product.colors}
              sizes={product.sizes}
            />

            {/* Accordions */}
            <div className="pd-accordions">
              {accordions.map((acc) => (
                <div key={acc.id} className="accordion">
                  <button
                    className="acc-header"
                    onClick={() =>
                      setOpenAccordion(openAccordion === acc.id ? "" : acc.id)
                    }
                    aria-expanded={openAccordion === acc.id}
                  >
                    <span>{acc.label}</span>
                    <svg
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      style={{
                        transform:
                          openAccordion === acc.id ? "rotate(180deg)" : "none",
                        transition: "transform 0.2s",
                      }}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  {openAccordion === acc.id && (
                    <div className="acc-body">{acc.content}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="related-section">
            <div className="container">
              <div className="related-header">
                <h2 className="related-title">قطع مشابهة</h2>
              </div>
              <div className="related-grid">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />

      <style jsx>{`
        .breadcrumb {
          display: flex;
          align-items: center;
          gap: 8px;
          padding-top: 16px;
          padding-bottom: 8px;
          font-size: 13px;
          flex-wrap: wrap;
        }
        .bc-link {
          color: var(--gray-warm);
          text-decoration: none;
          transition: color 0.2s;
        }
        .bc-link:hover {
          color: var(--mauve);
        }
        .bc-sep {
          color: var(--gray-light);
        }
        .bc-current {
          color: var(--dark);
          font-weight: 600;
        }

        .product-layout {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 48px;
          padding-top: 16px;
          padding-bottom: 80px;
          align-items: start;
        }
        .product-images-col {
        }
        .product-info-col {
          position: sticky;
          top: 90px;
        }

        .pd-badges {
          display: flex;
          gap: 8px;
          margin-bottom: 12px;
        }
        .pd-category {
          font-size: 11px;
          font-weight: 700;
          font-family: var(--font-heading);
          color: var(--warm-tan);
          letter-spacing: 1px;
          margin-bottom: 8px;
        }
        .pd-name {
          font-size: clamp(24px, 3.5vw, 40px);
          color: var(--dark);
          margin-bottom: 16px;
          line-height: 1.2;
        }
        .pd-rating {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 20px;
        }
        .stars {
          display: flex;
          gap: 2px;
        }
        .pd-rating-num {
          font-weight: 700;
          color: var(--dark);
          font-family: var(--font-heading);
        }
        .pd-rating-count {
          font-size: 13px;
          color: var(--gray-warm);
        }

        .pd-price-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 28px;
          flex-wrap: wrap;
        }
        .pd-price {
          font-family: var(--font-heading);
          font-size: 32px;
          font-weight: 800;
          color: var(--mauve);
        }
        .pd-original-price {
          font-size: 18px;
          color: var(--gray-warm);
          text-decoration: line-through;
        }
        .pd-discount-badge {
          background: var(--mauve-pale);
          color: var(--mauve);
          padding: 4px 12px;
          border-radius: var(--radius-full);
          font-family: var(--font-heading);
          font-size: 13px;
          font-weight: 700;
        }

        .pd-accordions {
          border-top: 1px solid var(--gray-light);
          margin-top: 16px;
        }
        .accordion {
          border-bottom: 1px solid var(--gray-light);
        }
        .acc-header {
          width: 100%;
          background: none;
          border: none;
          padding: 16px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: var(--font-heading);
          font-size: 15px;
          font-weight: 600;
          color: var(--dark);
          cursor: pointer;
          text-align: right;
        }
        .acc-body {
          padding: 0 0 16px;
          font-size: 14px;
          color: var(--dark-medium);
          line-height: 1.8;
        }

        .related-section {
          padding: 80px 0;
          background: var(--cream-dark);
        }
        .related-header {
          margin-bottom: 32px;
        }
        .related-title {
          font-size: clamp(22px, 2.5vw, 32px);
          color: var(--dark);
        }
        .related-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        @media (max-width: 1024px) {
          .product-layout {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .product-info-col {
            position: static;
          }
          .pd-name {
            font-size: 28px;
          }
          .related-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .product-layout {
            padding-bottom: 48px;
          }
          .related-section {
            padding: 48px 0;
          }
          .related-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
        }

        @media (max-width: 480px) {
          .breadcrumb {
            padding-top: 12px;
            font-size: 12px;
          }
          .pd-price {
            font-size: 28px;
          }
          .related-grid {
            gap: 12px;
          }
        }
      `}</style>
    </>
  );
}
