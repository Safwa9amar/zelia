"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Initial delay for the logo pulse
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      // Wait for the fade-out CSS transition before notifying parent
      setTimeout(onComplete, 800);
    }, 1500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`loading-overlay ${isFadingOut ? "fade-out" : ""}`}>
      <div className="loader-content">
        <div className="logo-wrapper">
          <Image
            src="/logo.png"
            alt="Zelia"
            width={120}
            height={55}
            priority
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className="loading-bar-container">
          <div className="loading-bar"></div>
        </div>
      </div>

      <style jsx>{`
        .loading-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: #faf5f0; /* var(--cream) */
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 99999;
          transition:
            opacity 0.8s ease-in-out,
            visibility 0.8s;
          visibility: visible;
        }

        .loading-overlay.fade-out {
          opacity: 0;
          visibility: hidden;
        }

        .loader-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
        }

        .logo-wrapper {
          animation: pulse 2s infinite ease-in-out;
        }

        .loading-bar-container {
          width: 140px;
          height: 2px;
          background: #e8ddd5; /* var(--gray-light) */
          border-radius: 2px;
          overflow: hidden;
          position: relative;
        }

        .loading-bar {
          position: absolute;
          width: 60%;
          height: 100%;
          background: #6b4453; /* var(--mauve) */
          border-radius: 2px;
          animation: loading 1.5s infinite ease-in-out;
        }

        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.05);
            opacity: 1;
          }
        }

        @keyframes loading {
          0% {
            left: -60%;
          }
          50% {
            left: 50%;
          }
          100% {
            left: 110%;
          }
        }
      `}</style>
    </div>
  );
}
