"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [wishlisted, setWishlisted] = useState(false);
  const [imgError, setImgError] = useState(false);

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;

  const fallback = `https://placehold.co/480x600/FAF5F0/6B4453?text=${encodeURIComponent(product.name)}`;

  return (
    <article className="product-card card-shadow">
      <Link
        href={`/product/${product.id}`}
        className="card-image-link"
        tabIndex={-1}
      >
        <div className="card-image-wrapper">
          <Image
            src={imgError ? fallback : product.image}
            alt={product.name}
            fill
            sizes="(max-width:640px) 45vw, (max-width:1024px) 30vw, 22vw"
            className="card-image"
            onError={() => setImgError(true)}
          />

          {/* Badges */}
          <div className="card-badges">
            {product.isNew && <span className="badge badge-new">جديد</span>}
            {product.isSale && discount > 0 && (
              <span className="badge badge-sale">-{discount}%</span>
            )}
          </div>

          {/* Quick add overlay */}
          <div className="card-overlay">
            <button
              className="quick-add-btn"
              onClick={(e) => {
                e.preventDefault();
                // Cart logic would go here
              }}
            >
              <svg
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              أضف للسلة
            </button>
          </div>
        </div>
      </Link>

      {/* Wishlist */}
      <button
        className={`wishlist-btn ${wishlisted ? "wishlisted" : ""}`}
        onClick={() => setWishlisted(!wishlisted)}
        aria-label={wishlisted ? "إزالة من المفضلة" : "أضف للمفضلة"}
      >
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill={wishlisted ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </button>

      {/* Card Body */}
      <div className="card-body">
        <p className="card-category">{product.category}</p>
        <Link href={`/product/${product.id}`} className="card-name">
          {product.name}
        </Link>

        {/* Rating */}
        <div className="card-rating">
          <div className="stars">
            {[1, 2, 3, 4, 5].map((s) => (
              <svg
                key={s}
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill={s <= Math.round(product.rating) ? "#C4A882" : "none"}
                stroke="#C4A882"
                strokeWidth="1.5"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ))}
          </div>
          <span className="rating-count">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="card-price">
          <span className="price-current">
            {product.price.toLocaleString("ar-SA")} ر.س
          </span>
          {product.originalPrice && (
            <span className="price-original">
              {product.originalPrice.toLocaleString("ar-SA")} ر.س
            </span>
          )}
        </div>

        {/* Colors */}
        {product.colors.length > 1 && (
          <div className="card-colors">
            {product.colors.slice(0, 4).map((c) => (
              <span
                key={c.hex}
                className="color-dot"
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="color-more">+{product.colors.length - 4}</span>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        .product-card {
          background: white;
          border-radius: var(--radius-lg);
          overflow: hidden;
          position: relative;
          cursor: pointer;
        }
        .card-image-link {
          display: block;
          text-decoration: none;
        }
        .card-image-wrapper {
          position: relative;
          aspect-ratio: 3/4;
          overflow: hidden;
          background: var(--cream-dark);
        }
        .card-image {
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .product-card:hover .card-image {
          transform: scale(1.05);
        }
        .card-badges {
          position: absolute;
          top: 12px;
          right: 12px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .card-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 16px;
          background: linear-gradient(
            to top,
            rgba(44, 26, 34, 0.75) 0%,
            transparent 100%
          );
          transform: translateY(100%);
          transition: transform 0.3s ease;
          display: flex;
          justify-content: center;
        }
        .product-card:hover .card-overlay {
          transform: translateY(0);
        }
        .quick-add-btn {
          background: white;
          color: var(--mauve);
          border: none;
          border-radius: var(--radius-full);
          padding: 10px 20px;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 13px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition:
            background 0.2s,
            color 0.2s;
        }
        .quick-add-btn:hover {
          background: var(--mauve);
          color: white;
        }
        .wishlist-btn {
          position: absolute;
          top: 12px;
          left: 12px;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: white;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--gray-warm);
          transition:
            color 0.2s,
            transform 0.2s;
          box-shadow: 0 1px 8px rgba(0, 0, 0, 0.1);
        }
        .wishlist-btn:hover,
        .wishlist-btn.wishlisted {
          color: var(--mauve);
          transform: scale(1.1);
        }
        .card-body {
          padding: 14px 16px 18px;
        }
        .card-category {
          font-size: 11px;
          font-weight: 600;
          font-family: var(--font-heading);
          color: var(--warm-tan);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 4px;
        }
        .card-name {
          font-family: var(--font-heading);
          font-size: 15px;
          font-weight: 700;
          color: var(--dark);
          text-decoration: none;
          display: block;
          margin-bottom: 8px;
          transition: color 0.2s;
          line-height: 1.4;
        }
        .card-name:hover {
          color: var(--mauve);
        }
        .card-rating {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 10px;
        }
        .stars {
          display: flex;
          gap: 2px;
        }
        .rating-count {
          font-size: 12px;
          color: var(--gray-warm);
        }
        .card-price {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 10px;
        }
        .price-current {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 16px;
          color: var(--mauve);
        }
        .price-original {
          font-size: 13px;
          color: var(--gray-warm);
          text-decoration: line-through;
        }
        .card-colors {
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .color-dot {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          border: 1.5px solid rgba(0, 0, 0, 0.12);
          display: block;
        }
        .color-more {
          font-size: 11px;
          color: var(--gray-warm);
        }
      `}</style>
    </article>
  );
}
