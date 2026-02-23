"use client";
import Image from "next/image";

interface ZeliaLogoProps {
  size?: number;
  className?: string;
}

export default function ZeliaLogo({
  size = 100,
  className = "",
}: ZeliaLogoProps) {
  // Maintaining the aspect ratio from the provided PNG
  const height = Math.round(size * 0.83); // Approx aspect ratio from the uploaded image

  return (
    <div
      className={`logo-container ${className}`}
      style={{ width: size, height: "auto", maxHeight: "100%" }}
    >
      <Image
        src="/logo.png"
        alt="Zelia Logo"
        width={size}
        height={height}
        priority
        style={{ objectFit: "contain", width: "100%", height: "auto" }}
      />

      <style jsx>{`
        .logo-container {
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
