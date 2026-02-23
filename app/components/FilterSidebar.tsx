"use client";
import { useState } from "react";

interface FilterSidebarProps {
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  maxPrice: number;
  onMaxPriceChange: (price: number) => void;
  minRating: number;
  onMinRatingChange: (rating: number) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  totalResults: number;
}

const ALL_CATEGORIES = [
  { id: "all", name: "الكل" },
  { id: "فساتين", name: "فساتين" },
  { id: "بلوزات", name: "بلوزات" },
  { id: "تنانير", name: "تنانير" },
  { id: "بناطيل", name: "بناطيل" },
  { id: "معاطف", name: "معاطف" },
  { id: "جاكيتات", name: "جاكيتات" },
  { id: "عبايات", name: "عبايات" },
  { id: "حقائب", name: "حقائب" },
  { id: "أحذية", name: "أحذية" },
  { id: "إكسسوارات", name: "إكسسوارات" },
  { id: "ملابس المنزل", name: "ملابس المنزل" },
];

export default function FilterSidebar({
  selectedCategory,
  onCategoryChange,
  maxPrice,
  onMaxPriceChange,
  minRating,
  onMinRatingChange,
  sortBy,
  onSortChange,
  totalResults,
}: FilterSidebarProps) {
  const [open, setOpen] = useState(false);

  const handleClear = () => {
    onCategoryChange("all");
    onMaxPriceChange(1000);
    onMinRatingChange(0);
    onSortChange("newest");
  };

  const SidebarContent = () => (
    <div className="sidebar-content">
      {/* Results count */}
      <div className="results-count">
        <span className="results-num">{totalResults}</span>
        <span className="results-label"> منتج</span>
      </div>

      {/* Sort */}
      <div className="filter-group">
        <h3 className="filter-heading">الترتيب</h3>
        <select
          className="sort-select"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          aria-label="ترتيب المنتجات"
        >
          <option value="newest">الأحدث</option>
          <option value="price-asc">السعر: الأقل أولاً</option>
          <option value="price-desc">السعر: الأعلى أولاً</option>
          <option value="rating">الأعلى تقييماً</option>
        </select>
      </div>

      {/* Category */}
      <div className="filter-group">
        <h3 className="filter-heading">الفئة</h3>
        <ul className="cat-list">
          {ALL_CATEGORIES.map((cat) => (
            <li key={cat.id}>
              <button
                className={`cat-filter-btn ${selectedCategory === cat.id ? "active" : ""}`}
                onClick={() => onCategoryChange(cat.id)}
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Price Range */}
      <div className="filter-group">
        <h3 className="filter-heading">
          السعر الأقصى
          <span className="price-badge">
            {maxPrice.toLocaleString("ar-DZ")} د.ج
          </span>
        </h3>
        <input
          type="range"
          min="50"
          max="1000"
          step="50"
          value={maxPrice}
          onChange={(e) => onMaxPriceChange(Number(e.target.value))}
          className="price-range"
          aria-label="السعر الأقصى"
        />
        <div className="range-labels">
          <span>٥٠ د.ج</span>
          <span>١٠٠٠ د.ج</span>
        </div>
      </div>

      {/* Rating */}
      <div className="filter-group">
        <h3 className="filter-heading">الحد الأدنى للتقييم</h3>
        <div className="rating-filters">
          {[0, 3, 4, 4.5].map((r) => (
            <button
              key={r}
              className={`rating-filter-btn ${minRating === r ? "active" : ""}`}
              onClick={() => onMinRatingChange(r)}
            >
              {r === 0 ? (
                "الكل"
              ) : (
                <>
                  {r}
                  <span>★</span>
                  {" فأكثر"}
                </>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Clear */}
      <button className="clear-btn" onClick={handleClear}>
        <svg
          width="14"
          height="14"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M3 6h18M19 6l-1 14H6L5 6M10 11v6M14 11v6M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" />
        </svg>
        مسح الفلاتر
      </button>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        className="mobile-filter-toggle"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <svg
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>
        فلترة وترتيب
        {open && " ✕"}
      </button>

      {/* Desktop sidebar */}
      <aside className="sidebar desktop-sidebar" aria-label="فلتر المنتجات">
        <SidebarContent />
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="mobile-drawer">
          <div className="mobile-drawer-header">
            <span>الفلاتر</span>
            <button onClick={() => setOpen(false)} className="close-drawer">
              ✕
            </button>
          </div>
          <SidebarContent />
        </div>
      )}

      <style jsx>{`
        .sidebar {
          background: white;
          border-radius: var(--radius-lg);
          border: 1px solid var(--gray-light);
          overflow: hidden;
          position: sticky;
          top: 90px;
          self-align: start;
        }
        .sidebar-content {
          padding: 24px;
        }
        .results-count {
          margin-bottom: 20px;
          padding-bottom: 18px;
          border-bottom: 1px solid var(--gray-light);
        }
        .results-num {
          font-family: var(--font-heading);
          font-size: 22px;
          font-weight: 800;
          color: var(--mauve);
        }
        .results-label {
          font-size: 14px;
          color: var(--gray-warm);
        }
        .filter-group {
          margin-bottom: 24px;
          padding-bottom: 24px;
          border-bottom: 1px solid var(--gray-light);
        }
        .filter-group:last-of-type {
          border-bottom: none;
        }
        .filter-heading {
          font-family: var(--font-heading);
          font-size: 14px;
          font-weight: 700;
          color: var(--dark);
          margin-bottom: 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .price-badge {
          background: var(--mauve-pale);
          color: var(--mauve);
          padding: 3px 10px;
          border-radius: var(--radius-full);
          font-size: 12px;
        }
        .sort-select {
          width: 100%;
          background: var(--cream);
          border: 1.5px solid var(--gray-light);
          border-radius: var(--radius-md);
          padding: 10px 14px;
          font-family: var(--font-body);
          font-size: 14px;
          color: var(--dark);
          cursor: pointer;
          outline: none;
          text-align: right;
          direction: rtl;
        }
        .sort-select:focus {
          border-color: var(--mauve);
        }
        .cat-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .cat-filter-btn {
          width: 100%;
          text-align: right;
          background: none;
          border: none;
          padding: 8px 12px;
          border-radius: var(--radius-md);
          font-family: var(--font-heading);
          font-size: 14px;
          font-weight: 500;
          color: var(--dark-medium);
          cursor: pointer;
          transition: all 0.2s;
        }
        .cat-filter-btn:hover {
          background: var(--mauve-pale);
          color: var(--mauve);
        }
        .cat-filter-btn.active {
          background: var(--mauve-pale);
          color: var(--mauve);
          font-weight: 700;
        }
        .price-range {
          width: 100%;
          -webkit-appearance: none;
          height: 4px;
          background: linear-gradient(
            to left,
            var(--mauve) 0%,
            var(--gray-light) 0%
          );
          border-radius: 2px;
          outline: none;
          cursor: pointer;
          margin-bottom: 8px;
        }
        .price-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: var(--mauve);
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(107, 68, 83, 0.3);
          cursor: pointer;
        }
        .range-labels {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: var(--gray-warm);
        }
        .rating-filters {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .rating-filter-btn {
          text-align: right;
          background: none;
          border: 1.5px solid var(--gray-light);
          border-radius: var(--radius-md);
          padding: 8px 12px;
          font-family: var(--font-heading);
          font-size: 13px;
          font-weight: 600;
          color: var(--dark-medium);
          cursor: pointer;
          transition: all 0.2s;
        }
        .rating-filter-btn:hover {
          border-color: var(--warm-tan);
          color: var(--warm-tan);
        }
        .rating-filter-btn.active {
          border-color: var(--mauve);
          color: var(--mauve);
          background: var(--mauve-pale);
        }
        .clear-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: none;
          border: 1.5px dashed var(--gray-light);
          border-radius: var(--radius-md);
          padding: 10px 14px;
          font-family: var(--font-heading);
          font-size: 13px;
          font-weight: 600;
          color: var(--gray-warm);
          cursor: pointer;
          width: 100%;
          transition: all 0.2s;
          margin-top: 4px;
        }
        .clear-btn:hover {
          border-color: var(--mauve);
          color: var(--mauve);
          background: var(--mauve-pale);
        }

        /* Mobile */
        .mobile-filter-toggle {
          display: none;
          align-items: center;
          gap: 8px;
          background: var(--mauve);
          color: white;
          border: none;
          border-radius: var(--radius-full);
          padding: 10px 20px;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          margin-bottom: 16px;
        }
        .mobile-drawer {
          display: none;
          position: fixed;
          inset: 0;
          background: white;
          z-index: 200;
          overflow-y: auto;
          padding: 0 0 40px;
        }
        .mobile-drawer-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px 16px;
          border-bottom: 1px solid var(--gray-light);
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 18px;
        }
        .close-drawer {
          background: none;
          border: none;
          font-size: 20px;
          cursor: pointer;
          color: var(--dark);
        }
        .desktop-sidebar {
        }

        @media (max-width: 768px) {
          .desktop-sidebar {
            display: none;
          }
          .mobile-filter-toggle {
            display: flex;
          }
          .mobile-drawer {
            display: block;
          }
        }
      `}</style>
    </>
  );
}
