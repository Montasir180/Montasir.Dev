"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function LoadingScreen({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Respect users who prefer reduced motion.
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const loadingTimer = setTimeout(
      () => setIsLoading(false),
      reducedMotion ? 0 : 1000
    );

    const exitTimer = setTimeout(
      () => setIsVisible(false),
      reducedMotion ? 0 : 1450
    );

    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(exitTimer);
    };
  }, []);

  return (
    <>
      {children}

      {isVisible && (
        <div
          className={`site-loader ${
            isLoading ? "site-loader--active" : "site-loader--exit"
          }`}
          role="status"
          aria-label="Loading website"
          aria-live="polite"
        >
          <div className="loader-content">
            <div className="loader-logo">
              <Image
                src="/Abstract%20Black%20Arc%20Emblem.png"
                alt="Montasir logo"
                width={100}
                height={100}
                priority
              />
            </div>

            <h1 className="loader-name">Montasir Islam</h1>

            <div className="loader-progress">
              <span />
            </div>

            <p className="loader-caption">WELCOME TO MY Portfolio</p>
          </div>
        </div>
      )}

      <style >{`
        .site-loader {
          position: fixed;
          inset: 0;
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #f2f0e8;
          color: #21201e;
          opacity: 1;
          visibility: visible;
          transition:
            opacity 450ms ease,
            visibility 450ms ease;
        }

        .site-loader--exit {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }

        .loader-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 24px;
        }

        .loader-logo {
          width: 86px;
          height: 86px;
          display: grid;
          place-items: center;
          opacity: 0;
          transform: scale(0.45) rotate(-12deg);
          animation: loader-logo-enter 650ms
            cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .loader-logo img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .loader-name {
          margin: 22px 0 0;
          font-size: clamp(24px, 5vw, 36px);
          font-weight: 700;
          letter-spacing: -1.5px;
          opacity: 0;
          transform: translateY(16px);
          animation: loader-text-enter 500ms 180ms ease forwards;
        }

        .loader-progress {
          width: 120px;
          height: 3px;
          margin-top: 25px;
          overflow: hidden;
          border-radius: 999px;
          background: rgba(33, 32, 30, 0.12);
        }

        .loader-progress span {
          display: block;
          width: 100%;
          height: 100%;
          background: #21201e;
          transform: scaleX(0);
          transform-origin: left;
          animation: loader-progress-fill 800ms 100ms ease forwards;
        }

        .loader-caption {
          margin-top: 14px;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 3px;
          color: rgba(33, 32, 30, 0.58);
          opacity: 0;
          animation: loader-caption-enter 400ms 350ms ease forwards;
        }

        .site-loader--exit .loader-content {
          transform: translateY(-12px) scale(0.98);
          transition: transform 400ms ease;
        }

        @keyframes loader-logo-enter {
          0% {
            opacity: 0;
            transform: scale(0.45) rotate(-12deg);
          }
          70% {
            opacity: 1;
            transform: scale(1.08) rotate(2deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0);
          }
        }

        @keyframes loader-text-enter {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes loader-progress-fill {
          to {
            transform: scaleX(1);
          }
        }

        @keyframes loader-caption-enter {
          to {
            opacity: 1;
          }
        }

        @media (max-width: 480px) {
          .loader-logo {
            width: 72px;
            height: 72px;
          }

          .loader-name {
            letter-spacing: -1px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .loader-logo,
          .loader-name,
          .loader-progress span,
          .loader-caption {
            animation: none;
            opacity: 1;
            transform: none;
          }

          .site-loader,
          .site-loader--exit .loader-content {
            transition: none;
          }
        }
      `}</style>
    </>
  );
}