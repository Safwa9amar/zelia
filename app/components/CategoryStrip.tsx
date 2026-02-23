"use client";
import { useState, useRef } from "react";
import Link from "next/link";

import {
  IoShirtOutline,
  IoBagOutline,
  IoSparklesOutline,
  IoLayersOutline,
  IoWomanOutline,
  IoStarOutline,
  IoWalkOutline,
  IoJournalOutline,
} from "react-icons/io5";
import {
  GiDress,
  GiSkirt,
  GiTrousers,
  GiHighHeel,
  GiDiamondRing,
} from "react-icons/gi";
import { HiOutlineSparkles } from "react-icons/hi2";

const CATEGORIES = [
  { id: "all", name: "الكل", icon: <HiOutlineSparkles /> },
  { id: "فساتين", name: "فساتين", icon: <GiDress /> },
  { id: "بلوزات", name: "بلوزات", icon: <IoShirtOutline /> },
  { id: "تنانير", name: "تنانير", icon: <GiSkirt /> },
  { id: "بناطيل", name: "بناطيل", icon: <GiTrousers /> },
  { id: "معاطف", name: "معاطف", icon: <IoShirtOutline /> },
  { id: "جاكيتات", name: "جاكيتات", icon: <IoShirtOutline /> },
  { id: "عبايات", name: "عبايات", icon: <GiDress /> },
  { id: "حقائب", name: "حقائب", icon: <IoBagOutline /> },
  { id: "أحذية", name: "أحذية", icon: <GiHighHeel /> },
  { id: "إكسسوارات", name: "إكسسوارات", icon: <GiDiamondRing /> },
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
                  <span className="cat-icon">{cat.icon}</span>
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
                <span className="cat-icon">{cat.icon}</span>
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
        .cat-icon {
          font-size: 18px;
          display: flex;
          align-items: center;
        }
        .cat-label {
        }
      `}</style>
    </section>
  );
}
