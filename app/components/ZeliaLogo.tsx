export default function ZeliaLogo({ size = 120 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size * 0.38}
      viewBox="0 0 300 114"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="زيليا"
    >
      {/* Woman silhouette + hat — simplified brand mark */}
      <g fill="#6B4453">
        {/* Hat brim */}
        <ellipse cx="85" cy="32" rx="52" ry="12" />
        {/* Hat crown */}
        <ellipse cx="80" cy="22" rx="32" ry="16" />
        {/* Face silhouette */}
        <path d="M68 38 Q75 52 72 60 Q80 62 84 55 Q88 48 85 38 Q80 35 68 38Z" />
        {/* Wave underline */}
        <path
          d="M30 80 Q80 70 130 78 Q160 83 200 76"
          stroke="#6B4453"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Brand name - Zelia text */}
        <text
          x="118"
          y="68"
          fontFamily="Georgia, serif"
          fontSize="42"
          fontWeight="400"
          fill="#6B4453"
          letterSpacing="1"
        >
          elia
        </text>
        {/* Z letter integrated with hat */}
        <text
          x="100"
          y="68"
          fontFamily="Georgia, serif"
          fontSize="42"
          fontWeight="700"
          fill="#6B4453"
        >
          Z
        </text>
      </g>
    </svg>
  );
}
