"use client";
import { useState, useEffect, Suspense } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useSearchParams } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FilterSidebar from "../components/FilterSidebar";
import ProductCard from "../components/ProductCard";
import { products } from "@/lib/products";
import type { Product } from "@/lib/products";

function CatalogContent() {
  const searchParams = useSearchParams();
  const initCategory = searchParams.get("category") || "all";
  const initQuery = searchParams.get("q") || "";
  const initSort = searchParams.get("sort") || "newest";
  const initSale = searchParams.get("sale") === "true";

  const [query, setQuery] = useState(initQuery);
  const [selectedCategory, setSelectedCategory] = useState(initCategory);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState(initSort);

  const filtered: Product[] = products
    .filter((p) => {
      if (initSale && !p.isSale) return false;
      if (selectedCategory !== "all" && p.category !== selectedCategory)
        return false;
      if (p.price > maxPrice) return false;
      if (p.rating < minRating) return false;
      if (query) {
        const q = query.toLowerCase();
        return (
          p.name.includes(query) ||
          p.nameEn.toLowerCase().includes(q) ||
          p.category.includes(query) ||
          p.tags.some((t) => t.includes(query))
        );
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return b.id - a.id; // newest
    });

  return (
    <main>
      <div className="container">
        {/* Page header */}
        <div className="page-header">
          <h1 className="page-title">
            {initSale
              ? "العروض الحصرية"
              : selectedCategory !== "all"
                ? selectedCategory
                : "متجر زيليا"}
          </h1>
          <p className="page-subtitle">اكتشفي أرقى التصاميم العصرية</p>
        </div>

        {/* Search bar */}
        <div className="catalog-search">
          <div className="search-icon">
            <svg
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحثي عن فستان، حقيبة، أو إكسسوار..."
            className="catalog-search-input"
            aria-label="البحث في المنتجات"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="clear-query"
              aria-label="مسح البحث"
            >
              ✕
            </button>
          )}
        </div>

        {/* Layout */}
        <div className="catalog-layout">
          <FilterSidebar
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            maxPrice={maxPrice}
            onMaxPriceChange={setMaxPrice}
            minRating={minRating}
            onMinRatingChange={setMinRating}
            sortBy={sortBy}
            onSortChange={setSortBy}
            totalResults={filtered.length}
          />

          <div className="catalog-results">
            {filtered.length === 0 ? (
              <div className="empty-state">
                <span className="empty-icon">
                  <IoSearchOutline />
                </span>
                <h2 className="empty-title">لا توجد نتائج</h2>
                <p className="empty-desc">
                  حاولي تغيير الفلاتر أو البحث بكلمات مختلفة
                </p>
                <button
                  className="btn-primary"
                  onClick={() => {
                    setQuery("");
                    setSelectedCategory("all");
                    setMaxPrice(1000);
                    setMinRating(0);
                  }}
                >
                  إعادة تعيين الفلاتر
                </button>
              </div>
            ) : (
              <div className="results-grid">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .page-header {
          padding: 48px 0 24px;
          text-align: center;
        }
        .page-title {
          font-size: clamp(28px, 4vw, 44px);
          color: var(--dark);
          margin-bottom: 8px;
        }
        .page-subtitle {
          font-size: 15px;
          color: var(--gray-warm);
        }
        .catalog-search {
          position: relative;
          display: flex;
          align-items: center;
          margin-bottom: 40px;
          background: white;
          border: 1.5px solid var(--gray-light);
          border-radius: var(--radius-full);
          padding: 0 20px;
          transition: border-color 0.2s;
          box-shadow: 0 2px 12px rgba(107, 68, 83, 0.06);
        }
        .catalog-search:focus-within {
          border-color: var(--mauve);
        }
        .search-icon {
          color: var(--gray-warm);
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }
        .catalog-search-input {
          flex: 1;
          border: none;
          outline: none;
          padding: 16px 14px;
          font-family: var(--font-body);
          font-size: 16px;
          color: var(--dark);
          background: transparent;
          text-align: right;
        }
        .catalog-search-input::placeholder {
          color: var(--gray-warm);
        }
        .clear-query {
          background: none;
          border: none;
          color: var(--gray-warm);
          cursor: pointer;
          font-size: 16px;
          padding: 4px 8px;
          border-radius: 50%;
          transition:
            background 0.2s,
            color 0.2s;
          flex-shrink: 0;
        }
        .clear-query:hover {
          background: var(--mauve-pale);
          color: var(--mauve);
        }
        .catalog-layout {
          display: grid;
          grid-template-columns: 260px 1fr;
          gap: 32px;
          align-items: start;
          padding-bottom: 80px;
        }
        .catalog-results {
        }
        .results-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .empty-state {
          text-align: center;
          padding: 80px 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }
        .empty-icon {
          font-size: 56px;
        }
        .empty-title {
          font-size: 24px;
          color: var(--dark);
        }
        .empty-desc {
          font-size: 15px;
          color: var(--gray-warm);
        }

        @media (max-width: 900px) {
          .catalog-layout {
            grid-template-columns: 1fr;
          }
          .results-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 480px) {
          .results-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }
        }
      `}</style>
    </main>
  );
}

export default function CatalogPage() {
  return (
    <>
      <Header />
      <Suspense
        fallback={
          <div
            style={{
              padding: "120px",
              textAlign: "center",
              fontFamily: "var(--font-heading)",
              color: "var(--mauve)",
            }}
          >
            جاري التحميل...
          </div>
        }
      >
        <CatalogContent />
      </Suspense>
      <Footer />
    </>
  );
}
