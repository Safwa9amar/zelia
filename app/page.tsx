"use client";
import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import CategoryStrip from "./components/CategoryStrip";
import ProductCard from "./components/ProductCard";
import { getFeaturedProducts, products } from "@/lib/products";

export default function HomePage() {
  const featured = getFeaturedProducts();
  const newArrivals = products.filter((p) => p.isNew).slice(0, 4);
  const saleProducts = products.filter((p) => p.isSale).slice(0, 4);

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <HeroSection />

        {/* Category Strip */}
        <CategoryStrip linkMode />

        <div className="divider" />

        {/* Featured Products */}
        <section className="section">
          <div className="container">
            <div className="section-header">
              <div>
                <span className="section-eyebrow">اختيارات المحررة</span>
                <h2 className="section-title">الأكثر مبيعاً</h2>
              </div>
              <Link href="/catalog" className="btn-outline see-all-btn">
                عرض الكل
                <svg
                  width="14"
                  height="14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </Link>
            </div>
            <div className="product-grid">
              {featured.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Promo Banner */}
        <section className="promo-banner">
          <div className="container">
            <div className="promo-inner">
              <div className="promo-content">
                <span className="promo-eyebrow">✦ عروض حصرية</span>
                <h2 className="promo-title">
                  موسم جديد
                  <br />
                  أناقة متجددة
                </h2>
                <p className="promo-text">
                  تخفيضات تصل إلى 40% على تشكيلة الصيف
                </p>
                <Link
                  href="/catalog?sale=true"
                  className="btn-outline promo-btn"
                >
                  اكتشفي المجموعة
                </Link>
              </div>
              <div className="promo-visual" aria-hidden="true">
                <img
                  src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&h=400&q=80"
                  alt="عروض زيليا"
                  className="promo-img"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="newsletter-cta">
          <div className="container">
            <div className="newsletter-inner">
              <h2 className="newsletter-title">انضمي إلى مجتمع زيليا</h2>
              <p className="newsletter-desc">
                اشتركي في نشرتنا البريدية وكوني أول من تعرف عن التشكيلات والعروض
                الجديدة
              </p>
              <form
                className="newsletter-form-big"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  placeholder="بريدكِ الإلكتروني"
                  className="newsletter-input-big"
                />
                <button type="submit" className="btn-primary">
                  اشتراك مجاني
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style jsx>{`
        .section-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 32px;
        }
        .section-eyebrow {
          display: block;
          font-family: var(--font-heading);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1.5px;
          color: var(--warm-tan);
          margin-bottom: 6px;
          text-transform: uppercase;
        }
        .section-title {
          font-size: clamp(24px, 3vw, 36px);
          color: var(--dark);
        }
        .see-all-btn {
          font-size: 14px;
          padding: 10px 20px;
        }
        .product-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        /* Promo Banner */
        .promo-banner {
          background: var(--dark);
          padding: 0;
          overflow: hidden;
          margin: 0;
        }
        .promo-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          min-height: 380px;
        }
        .promo-content {
          padding: 60px;
        }
        .promo-eyebrow {
          display: block;
          font-family: var(--font-heading);
          font-size: 13px;
          font-weight: 700;
          color: var(--warm-tan);
          letter-spacing: 1.5px;
          margin-bottom: 16px;
        }
        .promo-title {
          font-size: clamp(36px, 4vw, 56px);
          color: white;
          line-height: 1.2;
          margin-bottom: 16px;
        }
        .promo-text {
          font-size: 16px;
          color: var(--gray-warm);
          margin-bottom: 32px;
        }
        .promo-btn {
          border-color: var(--warm-tan);
          color: var(--warm-tan);
        }
        .promo-btn:hover {
          background: var(--warm-tan);
          color: white;
        }
        .promo-visual {
          height: 100%;
        }
        .promo-img {
          width: 100%;
          height: 380px;
          object-fit: cover;
          display: block;
        }

        /* Features */
        .features-strip {
          background: white;
          padding: 56px 0;
          border-top: 1px solid var(--gray-light);
          border-bottom: 1px solid var(--gray-light);
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
          text-align: center;
        }
        .feature-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }
        .feature-icon {
          font-size: 32px;
        }
        .feature-title {
          font-family: var(--font-heading);
          font-size: 15px;
          font-weight: 700;
          color: var(--dark);
        }
        .feature-desc {
          font-size: 13px;
          color: var(--gray-warm);
        }

        /* Newsletter CTA */
        .newsletter-cta {
          padding: 80px 0;
          background: var(--mauve-pale);
        }
        .newsletter-inner {
          text-align: center;
          max-width: 540px;
          margin: 0 auto;
        }
        .newsletter-title {
          font-size: clamp(24px, 3vw, 36px);
          color: var(--mauve-dark);
          margin-bottom: 12px;
        }
        .newsletter-desc {
          font-size: 15px;
          color: var(--mauve-light);
          margin-bottom: 28px;
          line-height: 1.7;
        }
        .newsletter-form-big {
          display: flex;
          gap: 10px;
          justify-content: center;
        }
        .newsletter-input-big {
          flex: 1;
          max-width: 300px;
          background: white;
          border: 1.5px solid var(--gray-light);
          border-radius: var(--radius-full);
          padding: 14px 20px;
          font-family: var(--font-body);
          font-size: 14px;
          color: var(--dark);
          outline: none;
          text-align: right;
        }
        .newsletter-input-big:focus {
          border-color: var(--mauve);
        }

        @media (max-width: 1024px) {
          .product-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          .features-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 768px) {
          .product-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
          .section-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
          .promo-inner {
            grid-template-columns: 1fr;
          }
          .promo-visual {
            display: none;
          }
          .promo-content {
            padding: 40px 24px;
          }
          .newsletter-form-big {
            flex-direction: column;
            align-items: center;
          }
          .newsletter-input-big {
            max-width: 100%;
          }
        }
        @media (max-width: 480px) {
          .features-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
        }
      `}</style>
    </>
  );
}
