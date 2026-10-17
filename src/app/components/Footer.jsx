"use client";

import { useEffect, useRef, useState } from "react";

import {
  ArrowUpRight,
  ArrowRight,
  Check,
  Copy,
  Mail,
  MessageCircle,
} from "lucide-react";

import { FaGithub, FaLinkedinIn } from "react-icons/fa";

const EMAIL = "montasir.dev@gmail.com";

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/Montasir180",
    icon: FaGithub,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
    icon: FaLinkedinIn,
  },
  {
    label: "Gmail",
    href: `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}`,
    icon: Mail,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/8801616581120",
    icon: MessageCircle,
  },
];

const FOOTER_LINKS = {
  Explore: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
  ],

  More: [
    { label: "Certifications", href: "#certifications" },
    { label: "Contact", href: "#contact" },
  ],
};

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const footerRef = useRef(null);

  // Scroll reveal animation
  useEffect(() => {
    const footer = footerRef.current;

    if (!footer) return;

    const elements = footer.querySelectorAll(".footer-reveal");

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => {
        element.classList.add("footer-visible");
      });

      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("footer-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Copy email
  async function handleCopyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  }

  return (
    <footer
      ref={footerRef}
      className="portfolio-footer"
    >
      {/* ANIMATED BACKGROUND */}

      <div
        className="footer-background"
        aria-hidden="true"
      >
        <div className="footer-orb footer-orb-one" />
        <div className="footer-orb footer-orb-two" />

        <div className="footer-background-grid" />
      </div>

      <div className="footer-container">

        {/* =====================================
            CTA SECTION
        ===================================== */}

        <section className="footer-cta">
          <div className="footer-cta-top footer-reveal">
            <span className="footer-eyebrow">
              <span className="footer-status-dot" />
              AVAILABLE FOR SELECT PROJECTS
            </span>

            <span className="footer-cta-index">
              LET&apos;S CONNECT / 2026
            </span>
          </div>

          <div className="footer-heading-wrapper footer-reveal">
            <h2 className="footer-heading">
              <span className="footer-heading-line">
                Have an idea?
              </span>

              <span className="footer-heading-line footer-heading-accent">
                Let&apos;s make it happen.
              </span>
            </h2>
          </div>

          <p className="footer-description footer-reveal">
            Have a project in mind, need a developer, or
            just want to exchange ideas? My inbox is always
            open.
          </p>

          <div className="footer-cta-actions footer-reveal">
            <a
              href="#contact"
              className="footer-cta-button"
            >
              <span>Start a conversation</span>

              <span className="footer-button-icon">
                <ArrowUpRight size={18} />
              </span>

              <span
                className="footer-button-shine"
                aria-hidden="true"
              />
            </a>

            <span className="footer-cta-caption">
              HAVE SOMETHING IN MIND?
            </span>
          </div>
        </section>

        {/* =====================================
            MAIN FOOTER
        ===================================== */}

        <div className="footer-main">

          {/* BRAND */}

          <div
            className="footer-brand footer-reveal"
            style={{ "--footer-delay": "0ms" }}
          >
            <a
              href="#home"
              className="footer-logo"
              aria-label="Montasir Islam - Back to home"
            >
              <span className="footer-logo-frame">
                <img
                  src="/Abstract%20Black%20Arc%20Emblem.png"
                  alt="Montasir Islam logo"
                  className="footer-logo-image"
                />
              </span>

              <span className="footer-logo-name">
                Montasir Islam
              </span>
            </a>

            <p className="footer-brand-description">
              Web developer, writer, and lifelong learner.
              <br />
              Building meaningful things for the web.
            </p>

            <button
              type="button"
              onClick={handleCopyEmail}
              className={`footer-email-button ${
                copied ? "footer-email-copied" : ""
              }`}
              aria-label="Copy email address"
            >
              <span className="footer-email-icon">
                <Mail size={16} />
              </span>

              <span className="footer-email-text">
                {EMAIL}
              </span>

              <span className="footer-copy-icon">
                {copied ? (
                  <Check size={15} />
                ) : (
                  <Copy size={15} />
                )}
              </span>

              {copied && (
                <span className="footer-copy-feedback">
                  Copied!
                </span>
              )}
            </button>
          </div>

          {/* NAVIGATION */}

          {Object.entries(FOOTER_LINKS).map(
            ([title, links], index) => (
              <div
                className="footer-nav-column footer-reveal"
                key={title}
                style={{
                  "--footer-delay": `${120 + index * 100}ms`,
                }}
              >
                <h3 className="footer-column-heading">
                  <span className="footer-heading-marker" />
                  {title}
                </h3>

                <ul>
                  {links.map((link, linkIndex) => (
                    <li
                      key={link.label}
                      style={{
                        "--footer-link-delay": `${linkIndex * 60}ms`,
                      }}
                    >
                      <a href={link.href}>
                        <span>{link.label}</span>

                        <ArrowUpRight size={14} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}

          {/* SOCIAL LINKS */}

          <div
            className="footer-social-column footer-reveal"
            style={{ "--footer-delay": "320ms" }}
          >
            <h3 className="footer-column-heading">
              <span className="footer-heading-marker" />
              Find me online
            </h3>

            <div className="footer-socials">
              {SOCIAL_LINKS.map(
                ({ label, href, icon: Icon }, index) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-link"
                    aria-label={label}
                    title={label}
                    style={{
                      "--footer-social-delay": `${index * 70}ms`,
                    }}
                  >
                    <Icon size={18} />

                    <ArrowUpRight
                      size={12}
                      className="footer-social-arrow"
                    />
                  </a>
                )
              )}
            </div>

            <p className="footer-social-note">
              Good things happen when
              <br />
              creative minds connect.
            </p>
          </div>
        </div>

        {/* =====================================
            COPYRIGHT
        ===================================== */}

        <div className="footer-bottom footer-reveal">
          <p className="footer-copyright">
            © 2026 Montasir Islam.
            <span> Made with intention.</span>
          </p>

          <a
            href="#home"
            className="footer-back-to-top"
          >
            <span>Back to top</span>

            <span className="footer-top-icon">
              <ArrowRight size={15} />
            </span>
          </a>

          <p className="footer-location">
            <span className="footer-location-dot" />
            Designed &amp; built with care
          </p>
        </div>

        {/* BOTTOM SIGNATURE */}

        <div className="footer-signature footer-reveal">
          <span>DESIGNED WITH INTENTION.</span>

          <span className="footer-signature-center">
            <span />
            MONTASIR ISLAM
            <span />
          </span>

          <span>BUILT TO CONNECT.</span>
        </div>
      </div>

      {/* =====================================
          COMPONENT CSS
      ===================================== */}

      <style>{`
        .portfolio-footer {
          --footer-bg: #efeeeb;
          --footer-ink: #171717;
          --footer-muted: #77756f;
          --footer-accent: #2845e8;

          position: relative;
          isolation: isolate;
          overflow: hidden;
          background: var(--footer-bg);
          color: var(--footer-ink);
          font-family: inherit;
        }

        .portfolio-footer *,
        .portfolio-footer *::before,
        .portfolio-footer *::after {
          box-sizing: border-box;
        }

        /* =====================================
           BACKGROUND
        ===================================== */

        .footer-background {
          position: absolute;
          z-index: -1;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .footer-background-grid {
          position: absolute;
          inset: 0;
          opacity: 0.19;
          background-image:
            linear-gradient(
              rgba(23, 23, 23, 0.035) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(23, 23, 23, 0.035) 1px,
              transparent 1px
            );
          background-size: 46px 46px;
          mask-image: linear-gradient(
            to bottom,
            transparent,
            black 25%,
            black 75%,
            transparent
          );
        }

        .footer-orb {
          position: absolute;
          width: 350px;
          aspect-ratio: 1;
          border-radius: 50%;
          background: rgba(40, 69, 232, 0.055);
          filter: blur(75px);
          will-change: transform;
        }

        .footer-orb-one {
          top: -130px;
          right: -130px;
          animation: footer-orb-float 15s ease-in-out infinite;
        }

        .footer-orb-two {
          top: 40%;
          left: -220px;
          animation: footer-orb-float 18s ease-in-out infinite reverse;
        }

        /* =====================================
           CONTAINER
        ===================================== */

        .footer-container {
          position: relative;
          width: min(100% - 64px, 1440px);
          margin-inline: auto;
        }

        /* =====================================
           SCROLL REVEAL
        ===================================== */

        .footer-reveal {
          opacity: 0;
          transform: translate3d(0, 28px, 0);
          transition:
            opacity 850ms cubic-bezier(0.16, 1, 0.3, 1),
            transform 850ms cubic-bezier(0.16, 1, 0.3, 1);
          transition-delay: var(--footer-delay, 0ms);
        }

        .footer-reveal.footer-visible {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }

        /* =====================================
           CTA SECTION
        ===================================== */

        .footer-cta {
          position: relative;
          padding: 76px 0 78px;
          border-bottom: 1px solid rgba(23, 23, 23, 0.14);
        }

        .footer-cta-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 45px;
        }

        .footer-eyebrow,
        .footer-cta-index {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: var(--footer-muted);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.5px;
        }

        .footer-status-dot,
        .footer-location-dot {
          display: inline-block;
          width: 8px;
          height: 8px;
          flex-shrink: 0;
          border-radius: 50%;
          background: var(--footer-accent);
        }

        .footer-status-dot {
          box-shadow: 0 0 0 4px rgba(40, 69, 232, 0.08);
          animation: footer-pulse 2.2s ease-in-out infinite;
        }

        /* =====================================
           HEADING
        ===================================== */

        .footer-heading-wrapper {
          position: relative;
        }

        .footer-heading {
          position: relative;
          z-index: 1;
          max-width: 1050px;
          margin: 0;
          font-size: clamp(46px, 8vw, 112px);
          font-weight: 650;
          line-height: 0.99;
          letter-spacing: -0.075em;
        }

        .footer-heading-line {
          display: block;
          width: fit-content;
          max-width: 100%;
          animation: footer-title-enter 1.05s both;
        }

        .footer-heading-accent {
          color: var(--footer-accent);
          animation-delay: 120ms;
        }

        .footer-heading-accent::after {
          display: block;
          width: 100%;
          height: 2px;
          margin-top: 9px;
          background: var(--footer-accent);
          content: "";
          transform: scaleX(0);
          transform-origin: left;
          animation: footer-underline 1s 850ms forwards;
        }

        /* =====================================
           DESCRIPTION
        ===================================== */

        .footer-description {
          max-width: 470px;
          margin: 30px 0 28px;
          color: #686760;
          font-size: 14px;
          line-height: 1.9;
        }

        /* =====================================
           CTA BUTTON
        ===================================== */

        .footer-cta-actions {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 23px;
        }

        .footer-cta-button {
          position: relative;
          display: inline-flex;
          min-height: 54px;
          align-items: center;
          justify-content: space-between;
          gap: 22px;
          overflow: hidden;
          padding: 7px 8px 7px 20px;
          border: 1px solid var(--footer-accent);
          border-radius: 5px;
          background: var(--footer-accent);
          color: #ffffff;
          font-size: 12px;
          font-weight: 650;
          text-decoration: none;
          isolation: isolate;
          transition:
            transform 350ms cubic-bezier(0.2, 0.8, 0.2, 1),
            background 300ms ease,
            color 300ms ease,
            box-shadow 300ms ease;
        }

        .footer-cta-button:hover {
          transform: translateY(-4px);
          background: var(--footer-bg);
          color: var(--footer-accent);
          box-shadow: 0 12px 30px rgba(40, 69, 232, 0.12);
        }

        .footer-cta-button:active {
          transform: translateY(-1px);
        }

        .footer-cta-button:focus-visible {
          outline: 2px solid var(--footer-accent);
          outline-offset: 4px;
        }

        .footer-button-icon {
          position: relative;
          z-index: 2;
          display: grid;
          width: 38px;
          height: 38px;
          flex-shrink: 0;
          place-items: center;
          border-radius: 3px;
          background: var(--footer-bg);
          color: var(--footer-accent);
          transition:
            transform 350ms ease,
            border-radius 350ms ease;
        }

        .footer-cta-button:hover .footer-button-icon {
          transform: rotate(45deg);
          border-radius: 50%;
        }

        .footer-button-shine {
          position: absolute;
          z-index: 1;
          top: -100%;
          left: -60%;
          width: 35%;
          height: 300%;
          background: rgba(255, 255, 255, 0.17);
          transform: rotate(25deg);
          pointer-events: none;
        }

        .footer-cta-button:hover .footer-button-shine {
          animation: footer-button-shine 750ms ease;
        }

        .footer-cta-caption {
          color: var(--footer-muted);
          font-size: 9px;
          font-weight: 750;
          letter-spacing: 1.3px;
        }

        /* =====================================
           MAIN FOOTER GRID
        ===================================== */

        .footer-main {
          display: grid;
          grid-template-columns: 1.7fr 0.75fr 0.9fr 0.9fr;
          gap: 42px;
          padding: 58px 0 55px;
        }

        .footer-brand,
        .footer-nav-column,
        .footer-social-column {
          min-width: 0;
        }

        /* =====================================
           BRAND
        ===================================== */

        .footer-logo {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          color: var(--footer-ink);
          text-decoration: none;
        }

        .footer-logo-frame {
          display: grid;
          width: 46px;
          height: 46px;
          flex-shrink: 0;
          place-items: center;
          overflow: hidden;
          border: 1px solid rgba(23, 23, 23, 0.1);
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.38);
          transition:
            border-color 300ms ease,
            background 300ms ease,
            transform 400ms cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .footer-logo-image {
          display: block;
          width: 35px;
          height: 35px;
          object-fit: contain;
          transition: transform 450ms ease;
        }

        .footer-logo:hover .footer-logo-frame {
          transform: translateY(-3px) rotate(-4deg);
          border-color: var(--footer-accent);
          background: rgba(40, 69, 232, 0.055);
        }

        .footer-logo:hover .footer-logo-image {
          transform: scale(1.08);
        }

        .footer-logo-name {
          font-size: 15px;
          font-weight: 750;
          letter-spacing: -0.4px;
          transition: color 250ms ease;
        }

        .footer-logo:hover .footer-logo-name {
          color: var(--footer-accent);
        }

        .footer-brand-description {
          margin: 21px 0;
          color: var(--footer-muted);
          font-size: 12px;
          line-height: 1.9;
        }

        /* =====================================
           EMAIL BUTTON
        ===================================== */

        .footer-email-button {
          position: relative;
          display: inline-flex;
          max-width: 100%;
          align-items: center;
          gap: 9px;
          padding: 8px 0;
          border: 0;
          background: transparent;
          color: var(--footer-ink);
          font-family: inherit;
          font-size: 11px;
          text-align: left;
          cursor: pointer;
        }

        .footer-email-icon,
        .footer-copy-icon {
          display: grid;
          flex-shrink: 0;
          place-items: center;
          color: var(--footer-accent);
          transition: transform 250ms ease;
        }

        .footer-email-button:hover .footer-email-icon {
          transform: translateY(-2px);
        }

        .footer-email-text {
          overflow-wrap: anywhere;
          transition: color 250ms ease;
        }

        .footer-email-button:hover .footer-email-text {
          color: var(--footer-accent);
        }

        .footer-copy-icon {
          margin-left: 3px;
        }

        .footer-email-button:hover .footer-copy-icon {
          transform: scale(1.12);
        }

        .footer-email-copied .footer-copy-icon {
          animation: footer-copy-success 350ms ease;
        }

        .footer-copy-feedback {
          position: absolute;
          top: -15px;
          right: 0;
          color: var(--footer-accent);
          font-size: 10px;
          animation: footer-feedback-enter 300ms ease both;
        }

        /* =====================================
           NAVIGATION HEADINGS
        ===================================== */

        .footer-column-heading {
          display: flex;
          align-items: center;
          gap: 9px;
          margin: 4px 0 24px;
          font-size: 11px;
          font-weight: 750;
          letter-spacing: 0.7px;
          text-transform: uppercase;
        }

        .footer-heading-marker {
          display: block;
          width: 6px;
          height: 6px;
          flex-shrink: 0;
          border-radius: 50%;
          background: var(--footer-accent);
          transition:
            transform 300ms ease,
            box-shadow 300ms ease;
        }

        .footer-nav-column:hover .footer-heading-marker,
        .footer-social-column:hover .footer-heading-marker {
          transform: scale(1.35);
          box-shadow: 0 0 0 4px rgba(40, 69, 232, 0.09);
        }

        /* =====================================
           NAVIGATION LINKS
        ===================================== */

        .footer-nav-column ul {
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .footer-nav-column li {
          opacity: 0;
          transform: translateY(8px);
          animation: footer-link-enter 550ms forwards;
          animation-delay: var(--footer-link-delay, 0ms);
        }

        .footer-visible .footer-nav-column li {
          animation-delay: calc(
            var(--footer-delay, 0ms) + var(--footer-link-delay, 0ms)
          );
        }

        .footer-nav-column a {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--footer-muted);
          font-size: 12px;
          text-decoration: none;
          transition:
            color 250ms ease,
            transform 300ms ease;
        }

        .footer-nav-column a svg {
          flex-shrink: 0;
          opacity: 0;
          transform: translate(-4px, 4px);
          transition:
            opacity 250ms ease,
            transform 300ms ease;
        }

        .footer-nav-column a:hover {
          transform: translateX(4px);
          color: var(--footer-accent);
        }

        .footer-nav-column a:hover svg {
          opacity: 1;
          transform: translate(0, 0);
        }

        /* =====================================
           SOCIAL LINKS
        ===================================== */

        .footer-socials {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .footer-social-link {
          position: relative;
          display: grid;
          width: 43px;
          height: 43px;
          flex-shrink: 0;
          place-items: center;
          overflow: hidden;
          border: 1px solid rgba(23, 23, 23, 0.17);
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          color: var(--footer-ink);
          text-decoration: none;
          transition:
            background 300ms ease,
            border-color 300ms ease,
            color 300ms ease,
            transform 350ms cubic-bezier(0.2, 0.8, 0.2, 1),
            box-shadow 300ms ease;
        }

        .footer-social-link:hover {
          transform: translateY(-5px) rotate(-5deg);
          border-color: var(--footer-accent);
          background: var(--footer-accent);
          color: #ffffff;
          box-shadow: 0 8px 20px rgba(40, 69, 232, 0.16);
        }

        .footer-social-link > svg:first-child {
          transition: transform 300ms ease;
        }

        .footer-social-link:hover > svg:first-child {
          transform: scale(1.13);
        }

        .footer-social-arrow {
          position: absolute;
          top: 5px;
          right: 4px;
          opacity: 0;
          transform: translate(-3px, 3px);
          transition:
            opacity 250ms ease,
            transform 250ms ease;
        }

        .footer-social-link:hover .footer-social-arrow {
          opacity: 1;
          transform: translate(0, 0);
        }

        .footer-social-note {
          margin-top: 20px;
          color: var(--footer-muted);
          font-size: 11px;
          line-height: 1.9;
        }

        /* =====================================
           BOTTOM BAR
        ===================================== */

        .footer-bottom {
          display: flex;
          min-height: 72px;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          border-top: 1px solid rgba(23, 23, 23, 0.14);
        }

        .footer-bottom p {
          margin: 0;
          color: var(--footer-muted);
          font-size: 10px;
          line-height: 1.8;
        }

        .footer-copyright span {
          color: var(--footer-ink);
        }

        .footer-back-to-top {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          color: var(--footer-ink);
          font-size: 11px;
          font-weight: 600;
          text-decoration: none;
          transition:
            color 250ms ease,
            gap 250ms ease;
        }

        .footer-back-to-top:hover {
          gap: 13px;
          color: var(--footer-accent);
        }

        .footer-top-icon {
          display: grid;
          width: 28px;
          height: 28px;
          flex-shrink: 0;
          place-items: center;
          border: 1px solid rgba(23, 23, 23, 0.15);
          border-radius: 50%;
          color: var(--footer-accent);
          transition:
            background 300ms ease,
            border-color 300ms ease,
            transform 300ms ease;
        }

        .footer-back-to-top:hover .footer-top-icon {
          transform: translateX(3px);
          border-color: var(--footer-accent);
          background: rgba(40, 69, 232, 0.06);
        }

        .footer-location {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .footer-location-dot {
          width: 6px;
          height: 6px;
          animation: footer-pulse 2.2s ease-in-out infinite;
        }

        /* =====================================
           SIGNATURE
        ===================================== */

        .footer-signature {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          padding: 25px 0 28px;
          color: var(--footer-muted);
          font-size: 8px;
          font-weight: 750;
          letter-spacing: 1.1px;
        }

        .footer-signature-center {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          color: var(--footer-ink);
          white-space: nowrap;
        }

        .footer-signature-center span {
          display: block;
          width: 15px;
          height: 1px;
          background: var(--footer-accent);
          transition: width 300ms ease;
        }

        .footer-signature:hover .footer-signature-center span {
          width: 28px;
        }

        /* =====================================
           KEYFRAMES
        ===================================== */

        @keyframes footer-title-enter {
          from {
            opacity: 0;
            transform: translateY(38px);
            filter: blur(8px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        @keyframes footer-underline {
          to {
            transform: scaleX(1);
          }
        }

        @keyframes footer-pulse {
          0%,
          100% {
            box-shadow: 0 0 0 0 rgba(40, 69, 232, 0.2);
          }

          50% {
            box-shadow: 0 0 0 6px rgba(40, 69, 232, 0);
          }
        }

        @keyframes footer-orb-float {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }

          35% {
            transform: translate3d(-30px, 25px, 0) scale(1.08);
          }

          70% {
            transform: translate3d(20px, -20px, 0) scale(0.95);
          }
        }

        @keyframes footer-button-shine {
          from {
            left: -60%;
          }

          to {
            left: 150%;
          }
        }

        @keyframes footer-copy-success {
          0% {
            transform: scale(0.8);
          }

          65% {
            transform: scale(1.2);
          }

          100% {
            transform: scale(1);
          }
        }

        @keyframes footer-feedback-enter {
          from {
            opacity: 0;
            transform: translateY(5px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes footer-link-enter {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* =====================================
           TABLET
        ===================================== */

        @media (max-width: 1000px) {
          .footer-main {
            grid-template-columns: 1.4fr 1fr 1fr;
            gap: 40px 30px;
          }

          .footer-brand {
            grid-column: 1 / -1;
          }
        }

        /* =====================================
           MOBILE
        ===================================== */

        @media (max-width: 600px) {
          .footer-container {
            width: calc(100% - 36px);
          }

          .footer-cta {
            padding: 48px 0 48px;
          }

          .footer-cta-top {
            align-items: flex-start;
            flex-direction: column;
            gap: 13px;
            margin-bottom: 38px;
          }

          .footer-eyebrow,
          .footer-cta-index {
            font-size: 9px;
            letter-spacing: 1px;
          }

          .footer-heading {
            font-size: clamp(43px, 12vw, 68px);
            line-height: 1.02;
            letter-spacing: -0.07em;
          }

          .footer-heading-accent::after {
            margin-top: 5px;
          }

          .footer-description {
            max-width: 350px;
            margin: 23px 0;
            font-size: 13px;
            line-height: 1.85;
          }

          .footer-cta-actions {
            align-items: flex-start;
            flex-direction: column;
            gap: 15px;
          }

          .footer-cta-button {
            min-height: 49px;
            gap: 15px;
            padding: 6px 7px 6px 15px;
            font-size: 12px;
          }

          .footer-button-icon {
            width: 35px;
            height: 35px;
          }

          .footer-cta-caption {
            font-size: 8px;
          }

          .footer-main {
            grid-template-columns: 1fr 1fr;
            gap: 35px 22px;
            padding: 38px 0;
          }

          .footer-brand,
          .footer-social-column {
            grid-column: 1 / -1;
          }

          .footer-brand-description {
            font-size: 12px;
          }

          .footer-email-button {
            font-size: 11px;
          }

          .footer-column-heading {
            margin-bottom: 19px;
            font-size: 10px;
          }

          .footer-nav-column ul {
            gap: 15px;
          }

          .footer-nav-column a {
            font-size: 12px;
          }

          .footer-nav-column a svg {
            opacity: 1;
            transform: none;
          }

          .footer-social-note {
            margin-top: 15px;
          }

          .footer-bottom {
            align-items: flex-start;
            flex-direction: column;
            gap: 17px;
            padding: 22px 0;
          }

          .footer-bottom p,
          .footer-back-to-top {
            font-size: 10px;
          }

          .footer-signature {
            flex-wrap: wrap;
            justify-content: center;
            gap: 13px;
            padding: 23px 0;
            font-size: 7px;
            letter-spacing: 0.6px;
          }

          .footer-signature-center {
            order: -1;
            width: 100%;
          }

          .footer-orb {
            width: 230px;
            filter: blur(55px);
          }

          .footer-background-grid {
            background-size: 34px 34px;
          }
        }

        /* =====================================
           SMALL MOBILE
        ===================================== */

        @media (max-width: 380px) {
          .footer-container {
            width: calc(100% - 28px);
          }

          .footer-heading {
            font-size: 40px;
          }

          .footer-main {
            gap: 32px 16px;
          }

          .footer-social-link {
            width: 40px;
            height: 40px;
          }

          .footer-signature {
            font-size: 6px;
          }
        }

        /* =====================================
           ACCESSIBILITY
        ===================================== */

        @media (prefers-reduced-motion: reduce) {
          .portfolio-footer *,
          .portfolio-footer *::before,
          .portfolio-footer *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }

          .footer-reveal {
            opacity: 1;
            transform: none;
          }

          .footer-nav-column li {
            opacity: 1;
            transform: none;
            animation: none;
          }
        }
      `}</style>
    </footer>
  );
}