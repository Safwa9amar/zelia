"use client";
import Link from "next/link";
import { HiSparkles } from "react-icons/hi2";

export default function HeroSection() {
  return (
    <section className="hero">
      {/* Background gradient blobs */}
      <div className="hero-blob blob-1" aria-hidden="true" />
      <div className="hero-blob blob-2" aria-hidden="true" />

      <div className="container hero-inner">
        <div className="hero-content">
          <span className="hero-eyebrow">موسم الأناقة الجديد</span>
          <h1 className="hero-title">
            أناقة
            <br />
            <span className="hero-title-accent">في كل تفصيل</span>
          </h1>
          <p className="hero-subtitle">
            اكتشفي أرقى التصاميم العصرية مع لمسة عربية أصيلة. كل قطعة حكاية من
            الفخامة.
          </p>
          <div className="hero-actions">
            <Link href="/catalog" className="btn-primary hero-btn">
              تسوقي الآن
              <svg
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </Link>
            <Link href="/catalog?sale=true" className="btn-outline hero-btn">
              العروض الحصرية
            </Link>
          </div>

          {/* Stats */}
          <div className="hero-stats">
            {[
              { value: "+٢٠٠", label: "منتج فاخر" },
              { value: "+٥٠٠٠", label: "عميلة سعيدة" },
              { value: "١٠٠%", label: "ضمان الجودة" },
            ].map((s) => (
              <div key={s.label} className="stat">
                <span className="stat-value">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="hero-img-frame">
            {/* Decorative frame */}
            <div className="frame-dot dot-tl" />
            <div className="frame-dot dot-br" />
            <div className="hero-img-placeholder">
              <img
                src="https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?auto=format&fit=crop&w=600&h=750&q=80"
                alt="تشكيلة زيليا"
                className="hero-img"
              />
            </div>
          </div>
          {/* Floating card */}
          <div className="floating-card">
            <span className="fc-icon">
              <HiSparkles />
            </span>
            <span className="fc-label">التشكيلة الجديدة</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero {
          position: relative;
          overflow: hidden;
          padding: 80px 0 96px;
          background: var(--cream);
        }
        .hero-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.35;
          pointer-events: none;
        }
        .blob-1 {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, #c4a882 0%, transparent 70%);
          top: -120px;
          right: -100px;
        }
        .blob-2 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, #6b4453 0%, transparent 70%);
          bottom: -80px;
          left: -80px;
        }
        .hero-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 60px;
          position: relative;
          z-index: 1;
        }
        .hero-eyebrow {
          display: inline-block;
          font-family: var(--font-heading);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 1.5px;
          color: var(--warm-tan);
          background: var(--mauve-pale);
          padding: 5px 14px;
          border-radius: var(--radius-full);
          margin-bottom: 20px;
        }
        .hero-title {
          font-size: clamp(42px, 5.5vw, 72px);
          line-height: 1.15;
          color: var(--dark);
          margin-bottom: 20px;
        }
        .hero-title-accent {
          background: linear-gradient(
            135deg,
            var(--mauve) 0%,
            var(--warm-tan) 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-subtitle {
          font-size: 16px;
          color: var(--dark-medium);
          line-height: 1.8;
          max-width: 400px;
          margin-bottom: 36px;
        }
        .hero-actions {
          display: flex;
          gap: 14px;
          margin-bottom: 48px;
          flex-wrap: wrap;
        }
        .hero-btn {
          font-size: 15px;
        }
        .hero-stats {
          display: flex;
          gap: 40px;
        }
        .stat {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .stat-value {
          font-family: var(--font-heading);
          font-size: 24px;
          font-weight: 800;
          color: var(--mauve);
        }
        .stat-label {
          font-size: 13px;
          color: var(--gray-warm);
        }

        /* Visual */
        .hero-visual {
          position: relative;
        }
        .hero-img-frame {
          position: relative;
          border-radius: var(--radius-xl);
          overflow: hidden;
        }
        .hero-img-placeholder {
          aspect-ratio: 4/5;
          background: var(--cream-dark);
          border-radius: var(--radius-xl);
          overflow: hidden;
        }
        .hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          border-radius: var(--radius-xl);
        }
        .frame-dot {
          position: absolute;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: var(--warm-tan);
          z-index: 2;
        }
        .dot-tl {
          top: 16px;
          right: 16px;
        }
        .dot-br {
          bottom: 16px;
          left: 16px;
        }
        .floating-card {
          position: absolute;
          bottom: 40px;
          right: -20px;
          background: white;
          border-radius: var(--radius-md);
          padding: 12px 18px;
          display: flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 8px 32px rgba(107, 68, 83, 0.18);
          animation: float 3s ease-in-out infinite;
        }
        .fc-icon {
          font-size: 18px;
          color: var(--warm-tan);
          display: flex;
          align-items: center;
        }
        .fc-label {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 14px;
          color: var(--dark);
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @media (max-width: 900px) {
          .hero-inner {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .hero-visual {
            display: none;
          }
          .hero-subtitle,
          .hero-stats {
            margin-inline: auto;
          }
          .hero-actions {
            justify-content: center;
          }
          .hero-stats {
            justify-content: center;
          }
          .hero-subtitle {
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
}
