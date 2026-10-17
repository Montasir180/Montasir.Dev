"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigationLinks = [
    { label: "Home", href: "#home" },
    { label: "About Me", href: "#about" },
    { label: "See My Work", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Certification", href: "#certifications" },
    { label: "Contact", href: "#contact" },
  ];

  const closeMenu = () => setMenuOpen(false);

  // Close mobile menu with Escape
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // Prevent background scrolling while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close menu if viewport changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <style >{`
        :root {
          --navbar-bg: #efeeeb;
          --navbar-text: #111111;
          --navbar-muted: #666666;
          --navbar-accent: #2845e8;
          --navbar-border: rgba(17, 17, 17, 0.12);
        }

        html {
          scroll-behavior: smooth;
          scroll-padding-top: 100px;
        }

        .montasir-navbar,
        .montasir-navbar * {
          box-sizing: border-box;
        }

        .montasir-navbar {
          position: sticky;
          top: 0;
          z-index: 1000;
          width: 100%;
          background: var(--navbar-bg);
          color: var(--navbar-text);
          border-bottom: 1px solid var(--navbar-border);
          font-family: Arial, Helvetica, sans-serif;
        }

        /* NAVBAR LAYOUT */

        .montasir-navbar__inner {
          width: 100%;
          max-width: 1720px;
          min-height: 76px;
          padding: 0 5.1%;
          margin: 0 auto;

          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 24px;
        }

        /* BRAND */

        .montasir-navbar__brand {
          display: inline-flex;
          align-items: center;
          justify-self: start;
          gap: 9px;

          color: var(--navbar-text);
          text-decoration: none;
          white-space: nowrap;
        }

        .montasir-navbar__logo {
          width: 34px;
          height: 34px;
          object-fit: contain;
          display: block;
          flex-shrink: 0;

          transition: transform 300ms ease;
        }

        .montasir-navbar__brand:hover .montasir-navbar__logo {
          transform: rotate(-8deg) scale(1.06);
        }

        .montasir-navbar__brand-name {
          font-size: 17px;
          line-height: 1;
          font-weight: 800;
          letter-spacing: 1.4px;
        }

        .montasir-navbar__brand-dot {
          color: var(--navbar-accent);
        }

        /* DESKTOP LINKS */

        .montasir-navbar__links {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(18px, 2.5vw, 38px);
        }

        .montasir-navbar__link {
          position: relative;
          display: inline-flex;
          align-items: center;
          padding: 10px 0;

          color: var(--navbar-muted);
          text-decoration: none;
          white-space: nowrap;

          font-size: 14px;
          font-weight: 500;

          transition: color 200ms ease;
        }

        .montasir-navbar__link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 3px;
          width: 100%;
          height: 1.5px;

          background: var(--navbar-accent);
          transform: scaleX(0);
          transform-origin: right;

          transition: transform 250ms ease;
        }

        .montasir-navbar__link:hover,
        .montasir-navbar__link:focus-visible {
          color: var(--navbar-text);
        }

        .montasir-navbar__link:hover::after,
        .montasir-navbar__link:focus-visible::after {
          transform: scaleX(1);
          transform-origin: left;
        }

        /* RESUME BUTTON */

        .montasir-navbar__actions {
          display: flex;
          align-items: center;
          justify-self: end;
        }

        .montasir-navbar__resume {
          position: relative;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          gap: 10px;

          min-height: 42px;
          padding: 0 19px;

          background: var(--navbar-accent);
          color: #ffffff;

          border: 1px solid var(--navbar-accent);
          border-radius: 0;

          text-decoration: none;
          white-space: nowrap;

          font-family: inherit;
          font-size: 13px;
          font-weight: 600;

          cursor: pointer;
          overflow: hidden;

          transition:
            background 220ms ease,
            color 220ms ease,
            border-color 220ms ease,
            transform 220ms ease;
        }

        .montasir-navbar__resume:hover {
          background: var(--navbar-text);
          border-color: var(--navbar-text);
          color: #ffffff;
          transform: translateY(-2px);
        }

        .montasir-navbar__resume:active {
          transform: translateY(0);
        }

        .montasir-navbar__resume:focus-visible {
          outline: 2px solid var(--navbar-text);
          outline-offset: 4px;
        }

        .montasir-navbar__download-icon {
          width: 15px;
          height: 15px;
          flex-shrink: 0;

          transition: transform 220ms ease;
        }

        .montasir-navbar__resume:hover
          .montasir-navbar__download-icon {
          transform: translateY(3px);
        }

        /* MOBILE MENU BUTTON */

        .montasir-navbar__menu-button {
          display: none;
          position: relative;

          width: 40px;
          height: 40px;
          padding: 0;

          align-items: center;
          justify-content: center;

          background: transparent;
          border: none;
          color: var(--navbar-text);

          cursor: pointer;
        }

        .montasir-navbar__hamburger {
          position: relative;
          display: block;
          width: 23px;
          height: 18px;
        }

        .montasir-navbar__hamburger span {
          position: absolute;
          left: 0;
          width: 23px;
          height: 1.5px;

          background: currentColor;
          transform-origin: center;

          transition:
            top 250ms ease,
            transform 250ms ease,
            width 250ms ease;
        }

        .montasir-navbar__hamburger span:nth-child(1) {
          top: 4px;
        }

        .montasir-navbar__hamburger span:nth-child(2) {
          top: 13px;
          width: 16px;
          left: auto;
          right: 0;
        }

        .montasir-navbar__menu-button:hover
          .montasir-navbar__hamburger span:nth-child(2) {
          width: 23px;
        }

        .montasir-navbar__menu-button.is-open
          .montasir-navbar__hamburger span:nth-child(1) {
          top: 9px;
          transform: rotate(45deg);
        }

        .montasir-navbar__menu-button.is-open
          .montasir-navbar__hamburger span:nth-child(2) {
          top: 9px;
          width: 23px;
          transform: rotate(-45deg);
        }

        /* MOBILE DRAWER */

        .montasir-navbar__mobile-menu {
          display: none;
        }

        .montasir-navbar a:focus-visible,
        .montasir-navbar button:focus-visible {
          outline: 2px solid var(--navbar-accent);
          outline-offset: 4px;
        }

        /* TABLET AND MOBILE */

        @media (max-width: 900px) {
          .montasir-navbar__inner {
            min-height: 70px;
            grid-template-columns: 1fr auto auto;
            gap: 12px;
            padding: 0 5%;
          }

          .montasir-navbar__menu-button {
            display: inline-flex;
            grid-column: 1;
            grid-row: 1;
            justify-self: start;
            margin-left: -8px;
          }

          .montasir-navbar__brand {
            grid-column: 1;
            grid-row: 1;
            margin-left: 34px;
          }

          .montasir-navbar__links {
            display: none;
          }

          .montasir-navbar__actions {
            grid-column: 3;
            grid-row: 1;
          }

          .montasir-navbar__resume {
            min-height: 39px;
            padding: 0 14px;
            font-size: 12px;
          }

          .montasir-navbar__mobile-menu {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;

            display: block;
            padding: 0 5%;

            background: var(--navbar-bg);
            border-bottom: 1px solid var(--navbar-border);

            visibility: hidden;
            opacity: 0;
            pointer-events: none;

            transform: translateY(-10px);

            transition:
              opacity 220ms ease,
              transform 220ms ease,
              visibility 220ms ease;
          }

          .montasir-navbar__mobile-menu.is-open {
            visibility: visible;
            opacity: 1;
            pointer-events: auto;
            transform: translateY(0);
          }

          .montasir-navbar__mobile-menu-inner {
            max-width: 600px;
            margin: 0 auto;
            padding: 16px 0 25px;
          }

          .montasir-navbar__mobile-link {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;

            padding: 17px 0;

            color: var(--navbar-text);
            border-bottom: 1px solid var(--navbar-border);

            text-decoration: none;
            font-size: clamp(17px, 4vw, 21px);
            font-weight: 500;

            opacity: 0;
            transform: translateY(8px);

            transition:
              color 180ms ease,
              padding-left 180ms ease,
              opacity 250ms ease,
              transform 250ms ease;
          }

          .montasir-navbar__mobile-menu.is-open
            .montasir-navbar__mobile-link {
            opacity: 1;
            transform: translateY(0);
          }

          .montasir-navbar__mobile-link:hover {
            color: var(--navbar-accent);
            padding-left: 5px;
          }

          .montasir-navbar__mobile-link svg {
            width: 18px;
            height: 18px;
            flex-shrink: 0;
          }
        }

        /* SMALL MOBILE */

        @media (max-width: 380px) {
          .montasir-navbar__inner {
            min-height: 64px;
            padding: 0 4%;
            gap: 5px;
          }

          .montasir-navbar__brand {
            gap: 5px;
            margin-left: 30px;
          }

          .montasir-navbar__logo {
            width: 29px;
            height: 29px;
          }

          .montasir-navbar__brand-name {
            font-size: 14px;
            letter-spacing: 1px;
          }

          .montasir-navbar__menu-button {
            width: 35px;
          }

          .montasir-navbar__resume {
            min-height: 36px;
            padding: 0 9px;
            gap: 6px;
            font-size: 11px;
          }

          .montasir-navbar__download-icon {
            width: 13px;
            height: 13px;
          }
        }

        /* ACCESSIBILITY */

        @media (prefers-reduced-motion: reduce) {
          .montasir-navbar *,
          .montasir-navbar *::before,
          .montasir-navbar *::after {
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
            animation-duration: 0.01ms !important;
          }
        }
      `}</style>

      <header className="montasir-navbar">
        <nav
          className="montasir-navbar__inner"
          aria-label="Main navigation"
        >
          {/* MOBILE HAMBURGER */}

          <button
            type="button"
            className={`montasir-navbar__menu-button ${
              menuOpen ? "is-open" : ""
            }`}
            onClick={() => setMenuOpen((previous) => !previous)}
            aria-label={
              menuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={menuOpen}
            aria-controls="montasir-mobile-menu"
          >
            <span
              className="montasir-navbar__hamburger"
              aria-hidden="true"
            >
              <span />
              <span />
            </span>
          </button>

          {/* LOGO */}

          <Link
            href="/"
            className="montasir-navbar__brand"
            onClick={closeMenu}
            aria-label="Montasir homepage"
          >
            <img
              src="/Abstract%20Black%20Arc%20Emblem.png"
              alt="Montasir Logo"
              className="montasir-navbar__logo"
            />

            <span className="montasir-navbar__brand-name">
              MONTASIR
              <span className="montasir-navbar__brand-dot">.</span>
            </span>
          </Link>

          {/* DESKTOP NAVIGATION */}

          <div className="montasir-navbar__links">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="montasir-navbar__link"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* RESUME DOWNLOAD */}

          <div className="montasir-navbar__actions">
            <a
              href="/Montasir_Islam_Job_Market_Resume(1).pdf"
              download="Montasir_Islam_Resume.pdf"
              className="montasir-navbar__resume"
              aria-label="Download my resume"
            >
              Resume

              <svg
                className="montasir-navbar__download-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <path d="m7 10 5 5 5-5" />
                <path d="M12 15V3" />
              </svg>
            </a>
          </div>
        </nav>

        {/* MOBILE MENU */}

        <div
          id="montasir-mobile-menu"
          className={`montasir-navbar__mobile-menu ${
            menuOpen ? "is-open" : ""
          }`}
          aria-hidden={!menuOpen}
          inert={!menuOpen}
        >
          <div className="montasir-navbar__mobile-menu-inner">
            {navigationLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className="montasir-navbar__mobile-link"
                onClick={closeMenu}
                tabIndex={menuOpen ? 0 : -1}
                style={{
                  transitionDelay: menuOpen
                    ? `${index * 45}ms`
                    : "0ms",
                }}
              >
                <span>{link.label}</span>

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M7 17 17 7" />
                  <path d="M7 7h10v10" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </header>
    </>
  );
}