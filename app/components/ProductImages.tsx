"use client";
import { useState } from "react";
import Image from "next/image";

interface ProductImagesProps {
  images: string[];
  productName: string;
}

export default function ProductImages({
  images,
  productName,
}: ProductImagesProps) {
  const [selected, setSelected] = useState(0);
  const [imgErrors, setImgErrors] = useState<boolean[]>(
    new Array(images.length).fill(false),
  );

  const fallback = (i: number) =>
    `https://placehold.co/600x750/FAF5F0/6B4453?text=${encodeURIComponent(productName)}`;

  const handleImgError = (i: number) => {
    const errs = [...imgErrors];
    errs[i] = true;
    setImgErrors(errs);
  };

  return (
    <div className="product-images">
      {/* Main image */}
      <div className="main-image-container">
        <Image
          src={imgErrors[selected] ? fallback(selected) : images[selected]}
          alt={`${productName} - صورة ${selected + 1}`}
          fill
          sizes="(max-width:768px) 100vw, 50vw"
          className="main-image"
          onError={() => handleImgError(selected)}
          priority
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="thumbnails">
          {images.map((img, i) => (
            <button
              key={i}
              className={`thumb-btn ${selected === i ? "active" : ""}`}
              onClick={() => setSelected(i)}
              aria-label={`صورة ${i + 1}`}
            >
              <Image
                src={imgErrors[i] ? fallback(i) : img}
                alt={`مصغرة ${i + 1}`}
                fill
                sizes="80px"
                className="thumb-image"
                onError={() => handleImgError(i)}
              />
            </button>
          ))}
        </div>
      )}

      <style jsx>{`
        .product-images {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .main-image-container {
          position: relative;
          aspect-ratio: 3/4;
          background: var(--cream-dark);
          border-radius: var(--radius-xl);
          overflow: hidden;
        }
        .main-image {
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .main-image-container:hover .main-image {
          transform: scale(1.04);
        }
        .thumbnails {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          padding-bottom: 8px;
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE/Edge */
        }
        .thumbnails::-webkit-scrollbar {
          display: none; /* Chrome/Safari */
        }
        .thumb-btn {
          position: relative;
          width: 80px;
          height: 100px;
          border-radius: var(--radius-md);
          overflow: hidden;
          border: 2px solid transparent;
          cursor: pointer;
          background: var(--cream-dark);
          transition: all 0.2s;
          flex-shrink: 0;
        }
        .thumb-btn:hover {
          border-color: var(--warm-tan);
        }
        .thumb-btn.active {
          border-color: var(--mauve);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(107, 68, 83, 0.15);
        }
        .thumb-image {
          object-fit: cover;
        }

        @media (max-width: 480px) {
          .product-images {
            gap: 12px;
          }
          .thumb-btn {
            width: 70px;
            height: 88px;
          }
        }
      `}</style>
    </div>
  );
}
