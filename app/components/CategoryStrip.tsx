"use client";
import { useState, useRef } from "react";
import Link from "next/link";

const CATEGORIES = [
  { id: "all", name: "الكل", emoji: "✦" },
  { id: "فساتين", name: "فساتين", emoji: "👗" },
  { id: "بلوزات", name: "بلوزات", emoji: "👚" },
  { id: "تنانير", name: "تنانير", emoji: "🩱" },
  { id: "بناطيل", name: "بناطيل", emoji: "👖" },
  { id: "معاطف", name: "معاطف", emoji: "🧥" },
  { id: "جاكيتات", name: "جاكيتات", emoji: "🥻" },
  { id: "عبايات", name: "عبايات", emoji: "🌙" },
  { id: "حقائب", name: "حقائب", emoji: "👜" },
  { id: "أحذية", name: "أحذية", emoji: "👠" },
  { id: "إكسسوارات", name: "إكسسوارات", emoji: "💎" },
];

interface CategoryStripProps {
  activeCategory?: string;
  onSelect?: (id: string) => void;
  linkMode?: boolean;
}

export default function CategoryStrip({
  activeCategory = "all",
  onSelect,
  linkMode = false,
}: CategoryStripProps) {
  const [active, setActive] = useState(activeCategory);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSelect = (id: string) => {
    setActive(id);
    onSelect?.(id);
  };

  return (
    <section className="cat-strip-section">
      <div className="container">
        <div className="cat-scroll" ref={scrollRef}>
          {CATEGORIES.map((cat) => {
            const isActive = active === cat.id;
            if (linkMode) {
              return (
                <Link
                  key={cat.id}
                  href={
                    cat.id === "all"
                      ? "/catalog"
                      : `/catalog?category=${encodeURIComponent(cat.id)}`
                  }
                  className={`cat-pill ${isActive ? "active" : ""}`}
                >
                  <span className="cat-emoji">{cat.emoji}</span>
                  <span className="cat-label">{cat.name}</span>
                </Link>
              );
            }
            return (
              <button
                key={cat.id}
                className={`cat-pill ${isActive ? "active" : ""}`}
                onClick={() => handleSelect(cat.id)}
              >
                <span className="cat-emoji">{cat.emoji}</span>
                <span className="cat-label">{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .cat-strip-section {
          padding: 32px 0;
          background: var(--cream);
        }
        .cat-scroll {
          display: flex;
          gap: 10px;
          overflow-x: auto;
          padding-bottom: 4px;
          scrollbar-width: none;
        }
        .cat-scroll::-webkit-scrollbar {
          display: none;
        }
        .cat-pill {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: white;
          border: 1.5px solid var(--gray-light);
          color: var(--dark-medium);
          font-family: var(--font-heading);
          font-size: 14px;
          font-weight: 600;
          padding: 9px 18px;
          border-radius: var(--radius-full);
          white-space: nowrap;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }
        .cat-pill:hover {
          border-color: var(--mauve);
          color: var(--mauve);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(107, 68, 83, 0.12);
        }
        .cat-pill.active {
          background: var(--mauve);
          border-color: var(--mauve);
          color: white;
          box-shadow: 0 4px 16px rgba(107, 68, 83, 0.3);
        }
        .cat-emoji {
          font-size: 16px;
        }
        .cat-label {
        }
      `}</style>
    </section>
  );
}
