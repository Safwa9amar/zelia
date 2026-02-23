"use client";

import { useState } from "react";
import LoadingScreen from "./LoadingScreen";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  return (
    <>
      {isInitialLoading && (
        <LoadingScreen onComplete={() => setIsInitialLoading(false)} />
      )}
      {!isInitialLoading && <div className="fade-in">{children}</div>}

      <style jsx>{`
        .fade-in {
          animation: fadeIn 0.5s ease-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
