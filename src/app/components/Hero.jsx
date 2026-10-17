"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const roles = [
  "Full-Stack",
  "Web Developer",
  "Frontend Developer",
  "Learner",
  "A Man",
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [started, setStarted] = useState(false);

  // Initial entrance
  useEffect(() => {
    const timer = setTimeout(() => {
      setStarted(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Typing animation
  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout;

    if (!deleting && displayedRole === currentRole) {
      timeout = setTimeout(() => {
        setDeleting(true);
      }, 1800);
    } else if (deleting && displayedRole === "") {
      timeout = setTimeout(() => {
        setDeleting(false);
        setRoleIndex((previous) => (previous + 1) % roles.length);
      }, 100);
    } else {
      timeout = setTimeout(() => {
        setDisplayedRole(
          deleting
            ? currentRole.substring(0, displayedRole.length - 1)
            : currentRole.substring(0, displayedRole.length + 1)
        );
      }, deleting ? 45 : 95);
    }

    return () => clearTimeout(timeout);
  }, [displayedRole, deleting, roleIndex]);

  return (
    <>
      <section
        id="home"
        className={`montasir-hero ${started ? "hero-started" : ""}`}
      >
        {/* Background decorations */}
        <div className="hero-bg-glow hero-bg-glow--one" />
        <div className="hero-bg-glow hero-bg-glow--two" />
        <div className="hero-background-grid" />

        <div className="montasir-hero__container">
          {/* =========================
              LEFT CONTENT
          ========================= */}
          <div className="montasir-hero__content">
            {/* Eyebrow */}
            <div className="montasir-hero__eyebrow">
              <span className="montasir-hero__status-dot" />

              <span>
                Developer
                <span className="hero-separator">·</span>
                Building digital experiences
              </span>
            </div>

            {/* Main heading */}
            <h1 className="montasir-hero__title">
              <span className="hero-title-line hero-title-line--one">
                Montasir
              </span>

              <span className="hero-title-line hero-title-line--two">
                Islam<span className="hero-title-dot">.</span>
              </span>
            </h1>

            {/* Animated role */}
            <div className="montasir-hero__description">
              <div
                className="montasir-hero__animated-role"
                aria-label={displayedRole}
              >
                <span key={roleIndex} className="hero-role-text">
                  {displayedRole}
                </span>

                <span className="hero-cursor" aria-hidden="true">
                  |
                </span>
              </div>

              <p>Building thoughtful experiences for the web.</p>
            </div>

            {/* Action buttons */}
            <div className="montasir-hero__actions">
              <Link
                href="#contact"
                className="montasir-hero__primary-button"
              >
                <span>Start a project</span>

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M5 12h14m-6-6 6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <span className="hero-button-shine" />
              </Link>

              <Link
                href="#projects"
                className="montasir-hero__secondary-button"
              >
                <span>See my work</span>

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M12 4v16m-6-6 6 6 6-6"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>

            {/* Small details */}
            <div className="hero-bottom-note">
              <span className="hero-bottom-note__line" />
              <span>DESIGN · DEVELOP · CREATE</span>
            </div>
          </div>

          {/* =========================
              RIGHT PORTRAIT
          ========================= */}
          <div className="montasir-hero__visual">
            {/* Orbit rings */}
            <div className="hero-orbit hero-orbit--one" />
            <div className="hero-orbit hero-orbit--two" />

            {/* Floating circle */}
            <div className="hero-decoration hero-decoration--circle">
              <span />
            </div>

            {/* Floating square */}
            <div className="hero-decoration hero-decoration--square" />

            {/* Small star */}
            <div className="hero-decoration hero-decoration--star">
              ✳
            </div>

            {/* Floating label */}
            <div className="hero-floating-label">
              <span className="hero-floating-label__icon">✳</span>

              <span>Creative Developer</span>
            </div>

            {/* Blue frame */}
            <div className="montasir-hero__blue-frame" />

            {/* Portrait frame */}
            <div className="montasir-hero__portrait-frame">
              <img
                src="/Studio Portrait of a Young Man in Hoodie.png"
                alt="Montasir Islam"
                className="montasir-hero__portrait"
                fetchPriority="high"
              />

              <div className="hero-image-overlay" />
            </div>

            {/* Image glow */}
            <div className="hero-image-glow" />

            {/* Availability badge */}
            <div className="montasir-hero__availability">
              <span className="availability-indicator" />

              <span>Open to opportunities</span>
            </div>

            {/* Image number */}
            <div className="hero-image-number">
              <span>01</span>
              <span className="hero-image-number__line" />
              <span>2026</span>
            </div>
          </div>
        </div>

        {/* Bottom divider */}
        <div className="montasir-hero__bottom-line">
          <span />
        </div>
      </section>

      <style>{`
        /* =========================================
           BASE
        ========================================= */

        .montasir-hero {
          --hero-bg: #efeeeb;
          --hero-text: #111111;
          --hero-muted: #626262;
          --hero-blue: #2845e8;

          position: relative;
          isolation: isolate;
          width: 100%;
          min-height: 680px;

          display: flex;
          align-items: center;

          overflow: hidden;

          background: var(--hero-bg);
          color: var(--hero-text);

          font-family: Arial, Helvetica, sans-serif;
        }

        .montasir-hero,
        .montasir-hero * {
          box-sizing: border-box;
        }

        .montasir-hero a {
          -webkit-tap-highlight-color: transparent;
        }

        .montasir-hero__container {
          position: relative;
          z-index: 2;

          width: 100%;
          max-width: 1720px;
          min-height: 680px;

          margin: 0 auto;
          padding: 80px 5.1% 90px;

          display: grid;
          grid-template-columns:
            minmax(0, 1.35fr)
            minmax(340px, 0.85fr);

          align-items: center;
          gap: 45px;
        }

        /* =========================================
           ANIMATED BACKGROUND
        ========================================= */

        .hero-bg-glow {
          position: absolute;
          z-index: -1;

          border-radius: 50%;
          pointer-events: none;

          filter: blur(75px);
          will-change: transform;
        }

        .hero-bg-glow--one {
          width: 430px;
          height: 430px;

          top: -230px;
          left: -150px;

          background: rgba(40, 69, 232, 0.09);

          animation:
            hero-background-drift-one
            12s ease-in-out infinite alternate;
        }

        .hero-bg-glow--two {
          width: 380px;
          height: 380px;

          right: -180px;
          bottom: -170px;

          background: rgba(40, 69, 232, 0.075);

          animation:
            hero-background-drift-two
            15s ease-in-out infinite alternate;
        }

        .hero-background-grid {
          position: absolute;
          z-index: -1;
          inset: 0;

          opacity: 0.13;

          background-image:
            linear-gradient(
              rgba(17, 17, 17, 0.035) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(17, 17, 17, 0.035) 1px,
              transparent 1px
            );

          background-size: 55px 55px;

          mask-image: linear-gradient(
            90deg,
            transparent,
            black 25%,
            black 75%,
            transparent
          );

          pointer-events: none;
        }

        @keyframes hero-background-drift-one {
          from {
            transform: translate3d(0, 0, 0) scale(1);
          }

          to {
            transform: translate3d(100px, 60px, 0) scale(1.2);
          }
        }

        @keyframes hero-background-drift-two {
          from {
            transform: translate3d(0, 0, 0) scale(0.9);
          }

          to {
            transform: translate3d(-80px, -60px, 0) scale(1.2);
          }
        }

        /* =========================================
           LEFT CONTENT
        ========================================= */

        .montasir-hero__content {
          position: relative;
          z-index: 2;

          min-width: 0;

          opacity: 0;
          transform: translateY(35px);

          transition:
            opacity 800ms ease,
            transform 900ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .hero-started .montasir-hero__content {
          opacity: 1;
          transform: translateY(0);
        }

        /* =========================================
           EYEBROW
        ========================================= */

        .montasir-hero__eyebrow {
          display: flex;
          align-items: center;
          gap: 12px;

          margin-bottom: 28px;

          color: var(--hero-muted);

          font-size: clamp(13px, 1.15vw, 19px);
          line-height: 1.5;
          font-weight: 400;

          opacity: 0;
          transform: translateY(20px);
        }

        .hero-started .montasir-hero__eyebrow {
          animation:
            hero-reveal-up
            850ms
            cubic-bezier(0.16, 1, 0.3, 1)
            100ms forwards;
        }

        .montasir-hero__status-dot {
          position: relative;
          flex-shrink: 0;

          width: 9px;
          height: 9px;

          border-radius: 50%;
          background: var(--hero-blue);

          box-shadow: 0 0 0 4px rgba(40, 69, 232, 0.08);

          animation: hero-status-pulse 2s ease-in-out infinite;
        }

        .montasir-hero__status-dot::after {
          content: "";

          position: absolute;
          inset: -5px;

          border: 1px solid var(--hero-blue);
          border-radius: 50%;

          animation: hero-status-ring 2s ease-out infinite;
        }

        .hero-separator {
          margin: 0 5px;
          color: var(--hero-blue);
        }

        @keyframes hero-status-pulse {
          0%,
          100% {
            box-shadow: 0 0 0 4px rgba(40, 69, 232, 0.08);
          }

          50% {
            box-shadow: 0 0 0 8px rgba(40, 69, 232, 0.025);
          }
        }

        @keyframes hero-status-ring {
          0% {
            opacity: 0.7;
            transform: scale(0.8);
          }

          100% {
            opacity: 0;
            transform: scale(1.8);
          }
        }

        /* =========================================
           MAIN TITLE
        ========================================= */

        .montasir-hero__title {
          margin: 0;

          color: var(--hero-text);

          font-size: clamp(72px, 7.15vw, 124px);
          font-weight: 750;

          line-height: 0.99;
          letter-spacing: -0.075em;

          perspective: 1000px;
        }

        .hero-title-line {
          display: block;
          width: fit-content;

          white-space: nowrap;

          opacity: 0;
          transform: translateY(65px) rotateX(-15deg);
          transform-origin: left bottom;

          filter: blur(8px);
        }

        .hero-started .hero-title-line--one {
          animation:
            hero-title-reveal
            1000ms
            cubic-bezier(0.16, 1, 0.3, 1)
            180ms forwards;
        }

        .hero-started .hero-title-line--two {
          animation:
            hero-title-reveal
            1100ms
            cubic-bezier(0.16, 1, 0.3, 1)
            330ms forwards;
        }

        @keyframes hero-title-reveal {
          0% {
            opacity: 0;
            transform: translateY(65px) rotateX(-15deg);
            filter: blur(8px);
          }

          100% {
            opacity: 1;
            transform: translateY(0) rotateX(0);
            filter: blur(0);
          }
        }

        .montasir-hero__title:hover .hero-title-line--one {
          transform: translateX(8px);
        }

        .montasir-hero__title:hover .hero-title-line--two {
          transform: translateX(17px);
        }

        .hero-title-line {
          transition: transform 450ms cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .hero-title-dot {
          display: inline-block;
          color: var(--hero-blue);

          animation: hero-dot-pulse 2.5s ease-in-out infinite;
        }

        @keyframes hero-dot-pulse {
          0%,
          100% {
            transform: scale(1);
          }

          50% {
            transform: scale(1.2);
          }
        }

        /* =========================================
           DESCRIPTION
        ========================================= */

        .montasir-hero__description {
          margin-top: 35px;

          opacity: 0;
          transform: translateY(25px);
        }

        .hero-started .montasir-hero__description {
          animation:
            hero-reveal-up
            850ms
            cubic-bezier(0.16, 1, 0.3, 1)
            550ms forwards;
        }

        .montasir-hero__animated-role {
          min-height: 35px;

          display: flex;
          align-items: center;

          color: var(--hero-blue);

          font-size: clamp(19px, 1.5vw, 25px);
          font-weight: 600;
          line-height: 1.4;
        }

        .hero-role-text {
          display: inline-block;
          animation: hero-role-enter 300ms ease;
        }

        @keyframes hero-role-enter {
          from {
            opacity: 0;
            transform: translateY(8px);
            filter: blur(4px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        .hero-cursor {
          display: inline-block;
          margin-left: 3px;

          font-weight: 400;

          animation: hero-cursor-blink 0.8s steps(2, start) infinite;
        }

        @keyframes hero-cursor-blink {
          to {
            visibility: hidden;
          }
        }

        .montasir-hero__description p {
          margin: 5px 0 0;

          color: var(--hero-text);

          font-size: clamp(16px, 1.35vw, 23px);
          line-height: 1.6;
          font-weight: 400;
        }

        /* =========================================
           BUTTONS
        ========================================= */

        .montasir-hero__actions {
          display: flex;
          align-items: center;
          flex-wrap: wrap;

          gap: 27px;
          margin-top: 40px;

          opacity: 0;
          transform: translateY(25px);
        }

        .hero-started .montasir-hero__actions {
          animation:
            hero-reveal-up
            850ms
            cubic-bezier(0.16, 1, 0.3, 1)
            700ms forwards;
        }

        .montasir-hero__primary-button {
          position: relative;
          isolation: isolate;
          overflow: hidden;

          min-height: 57px;

          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 18px;

          padding: 0 25px;

          background: var(--hero-blue);
          color: #ffffff;

          border: 1px solid var(--hero-blue);
          border-radius: 0;

          text-decoration: none;

          font-size: 15px;
          font-weight: 600;

          box-shadow: 0 13px 28px rgba(40, 69, 232, 0.19);

          transition:
            background 250ms ease,
            border-color 250ms ease,
            transform 350ms cubic-bezier(0.2, 0.8, 0.2, 1),
            box-shadow 350ms ease;
        }

        .montasir-hero__primary-button > span:first-child {
          position: relative;
          z-index: 2;
        }

        .montasir-hero__primary-button svg {
          position: relative;
          z-index: 2;

          width: 20px;
          height: 20px;

          transition: transform 350ms ease;
        }

        .hero-button-shine {
          position: absolute;
          z-index: 1;

          top: -100%;
          left: -80%;

          width: 45%;
          height: 300%;

          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.32),
            transparent
          );

          transform: rotate(25deg);
          transition: left 700ms cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .montasir-hero__primary-button:hover {
          background: #111111;
          border-color: #111111;

          transform: translateY(-5px) scale(1.02);

          box-shadow: 0 20px 45px rgba(40, 69, 232, 0.2);
        }

        .montasir-hero__primary-button:hover .hero-button-shine {
          left: 140%;
        }

        .montasir-hero__primary-button:hover svg {
          transform: translateX(6px);
        }

        .montasir-hero__primary-button:active {
          transform: translateY(-1px) scale(0.98);
        }

        .montasir-hero__secondary-button {
          position: relative;

          display: inline-flex;
          align-items: center;
          gap: 12px;

          padding: 12px 0;

          color: var(--hero-text);
          text-decoration: none;

          font-size: 15px;
          font-weight: 500;

          transition: color 250ms ease;
        }

        .montasir-hero__secondary-button::after {
          content: "";

          position: absolute;
          bottom: 4px;
          left: 0;

          width: 0;
          height: 1px;

          background: var(--hero-blue);

          transition: width 350ms ease;
        }

        .montasir-hero__secondary-button svg {
          width: 17px;
          height: 17px;

          transition: transform 300ms ease;
        }

        .montasir-hero__secondary-button:hover {
          color: var(--hero-blue);
        }

        .montasir-hero__secondary-button:hover::after {
          width: calc(100% - 28px);
        }

        .montasir-hero__secondary-button:hover svg {
          transform: translateY(4px);
        }

        /* =========================================
           BOTTOM NOTE
        ========================================= */

        .hero-bottom-note {
          display: flex;
          align-items: center;
          gap: 12px;

          margin-top: 65px;

          color: #777777;

          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.18em;

          opacity: 0;
          transform: translateY(12px);
        }

        .hero-started .hero-bottom-note {
          animation:
            hero-reveal-up
            700ms
            ease
            900ms forwards;
        }

        .hero-bottom-note__line {
          display: inline-block;

          width: 34px;
          height: 1px;

          background: var(--hero-blue);
        }

        /* =========================================
           RIGHT VISUAL
        ========================================= */

        .montasir-hero__visual {
          position: relative;

          width: 100%;
          max-width: 490px;
          aspect-ratio: 0.91 / 1;

          justify-self: center;

          opacity: 0;
          transform: translate(35px, 25px) scale(0.94);

          transform-style: preserve-3d;
        }

        .hero-started .montasir-hero__visual {
          animation:
            hero-visual-enter
            1200ms
            cubic-bezier(0.16, 1, 0.3, 1)
            250ms forwards,
            hero-visual-float
            6s
            ease-in-out
            1.5s
            infinite;
        }

        @keyframes hero-visual-enter {
          0% {
            opacity: 0;
            transform: translate(35px, 25px) scale(0.94);
            filter: blur(7px);
          }

          100% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
            filter: blur(0);
          }
        }

        @keyframes hero-visual-float {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-9px);
          }
        }

        /* =========================================
           BLUE FRAME
        ========================================= */

        .montasir-hero__blue-frame {
          position: absolute;
          z-index: 1;

          inset: 3% 1% 2% 5%;

          background: var(--hero-blue);

          transform: rotate(-5deg);

          animation:
            hero-frame-reveal
            1200ms
            cubic-bezier(0.16, 1, 0.3, 1)
            500ms both;

          transition: transform 500ms ease;
        }

        @keyframes hero-frame-reveal {
          0% {
            opacity: 0;
            transform: rotate(-12deg) scale(0.82);
          }

          100% {
            opacity: 1;
            transform: rotate(-5deg) scale(1);
          }
        }

        .montasir-hero__visual:hover .montasir-hero__blue-frame {
          transform: rotate(-2deg) translateY(-4px);
        }

        /* =========================================
           PORTRAIT FRAME
        ========================================= */

        .montasir-hero__portrait-frame {
          position: absolute;
          z-index: 2;

          inset: 4% 4% 4% 6%;

          padding: 12px;

          overflow: hidden;

          background: #ffffff;

          transform: rotate(2.5deg);

          box-shadow: 0 24px 45px rgba(22, 32, 85, 0.16);

          transition:
            transform 600ms cubic-bezier(0.2, 0.8, 0.2, 1),
            box-shadow 600ms ease;
        }

        .montasir-hero__portrait {
          display: block;

          width: 100%;
          height: 100%;

          object-fit: cover;
          object-position: center top;

          background: #e1dfdc;

          transform: scale(1.025);

          transition:
            transform 1000ms cubic-bezier(0.2, 0.8, 0.2, 1),
            filter 600ms ease;
        }

        .montasir-hero__visual:hover .montasir-hero__portrait-frame {
          transform: rotate(0deg) translateY(-4px);

          box-shadow: 0 35px 65px rgba(22, 32, 85, 0.2);
        }

        .montasir-hero__visual:hover .montasir-hero__portrait {
          transform: scale(1.075);
          filter: contrast(1.04);
        }

        .hero-image-overlay {
          position: absolute;
          inset: 12px;

          pointer-events: none;

          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.02) 45%,
            rgba(0, 0, 0, 0.15)
          );

          opacity: 0.45;

          transition: opacity 500ms ease;
        }

        .montasir-hero__visual:hover .hero-image-overlay {
          opacity: 0.15;
        }

        /* =========================================
           IMAGE GLOW
        ========================================= */

        .hero-image-glow {
          position: absolute;
          z-index: 0;

          inset: 12%;

          border-radius: 50%;

          background: rgba(40, 69, 232, 0.2);

          filter: blur(65px);

          pointer-events: none;

          animation: hero-glow-breathe 5s ease-in-out infinite alternate;
        }

        @keyframes hero-glow-breathe {
          from {
            opacity: 0.35;
            transform: scale(0.85);
          }

          to {
            opacity: 0.8;
            transform: scale(1.12);
          }
        }

        /* =========================================
           ORBIT RINGS
        ========================================= */

        .hero-orbit {
          position: absolute;
          z-index: 0;

          border: 1px solid rgba(40, 69, 232, 0.14);
          border-radius: 50%;

          pointer-events: none;
        }

        .hero-orbit--one {
          width: 110%;
          height: 110%;

          top: -5%;
          left: -5%;

          animation: hero-orbit-rotate 32s linear infinite;
        }

        .hero-orbit--two {
          width: 125%;
          height: 125%;

          top: -12.5%;
          left: -12.5%;

          border-style: dashed;
          border-color: rgba(40, 69, 232, 0.1);

          animation: hero-orbit-rotate 48s linear infinite reverse;
        }

        @keyframes hero-orbit-rotate {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        /* =========================================
           DECORATIVE CIRCLE
        ========================================= */

        .hero-decoration {
          position: absolute;
          z-index: 4;

          pointer-events: none;
        }

        .hero-decoration--circle {
          top: 4%;
          right: -3%;

          width: 58px;
          height: 58px;

          border: 1px solid rgba(40, 69, 232, 0.65);
          border-radius: 50%;

          animation: hero-decoration-float 5s ease-in-out infinite;
        }

        .hero-decoration--circle span {
          position: absolute;

          width: 10px;
          height: 10px;

          top: 50%;
          left: 50%;

          border-radius: 50%;

          background: var(--hero-blue);

          transform: translate(-50%, -50%);

          box-shadow: 0 0 20px rgba(40, 69, 232, 0.35);
        }

        @keyframes hero-decoration-float {
          0%,
          100% {
            translate: 0 0;
          }

          50% {
            translate: 0 -14px;
          }
        }

        /* =========================================
           DECORATIVE SQUARE
        ========================================= */

        .hero-decoration--square {
          left: -5%;
          top: 35%;

          width: 17px;
          height: 17px;

          border: 2px solid var(--hero-blue);

          transform: rotate(45deg);

          animation: hero-square-rotate 8s linear infinite;
        }

        @keyframes hero-square-rotate {
          from {
            rotate: 0deg;
          }

          to {
            rotate: 360deg;
          }
        }

        /* =========================================
           DECORATIVE STAR
        ========================================= */

        .hero-decoration--star {
          right: 3%;
          bottom: 4%;

          color: var(--hero-blue);

          font-size: 34px;

          animation: hero-star-animation 5s ease-in-out infinite;
        }

        @keyframes hero-star-animation {
          0%,
          100% {
            transform: rotate(0deg) scale(1);
            opacity: 0.75;
          }

          50% {
            transform: rotate(90deg) scale(1.15);
            opacity: 1;
          }
        }

        /* =========================================
           FLOATING LABEL
        ========================================= */

        .hero-floating-label {
          position: absolute;
          z-index: 5;

          top: 19%;
          right: -13%;

          display: inline-flex;
          align-items: center;
          gap: 9px;

          padding: 12px 16px;

          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.95);

          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.07);

          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);

          color: #111111;

          font-size: 12px;
          font-weight: 600;
          white-space: nowrap;

          animation: hero-label-float 5s ease-in-out infinite;
        }

        .hero-floating-label__icon {
          display: inline-block;

          color: var(--hero-blue);
          font-size: 20px;

          animation: hero-icon-spin 8s linear infinite;
        }

        @keyframes hero-label-float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }

          50% {
            transform: translateY(-10px) rotate(-1deg);
          }
        }

        @keyframes hero-icon-spin {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        /* =========================================
           AVAILABILITY BADGE
        ========================================= */

        .montasir-hero__availability {
          position: absolute;
          z-index: 6;

          left: 0;
          bottom: 11%;

          min-height: 45px;

          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;

          padding: 0 18px;

          background: #111111;
          color: #ffffff;

          border-radius: 40px;

          font-size: 13px;
          font-weight: 600;
          white-space: nowrap;

          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);

          animation: hero-badge-float 4s ease-in-out infinite;

          transition:
            box-shadow 350ms ease,
            background 350ms ease;
        }

        .montasir-hero__visual:hover .montasir-hero__availability {
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.17);
        }

        .availability-indicator {
          width: 9px;
          height: 9px;

          flex-shrink: 0;

          border-radius: 50%;

          background: #72e3a2;

          box-shadow: 0 0 0 4px rgba(114, 227, 162, 0.1);

          animation: hero-availability-pulse 2s ease-in-out infinite;
        }

        @keyframes hero-availability-pulse {
          0%,
          100% {
            box-shadow: 0 0 0 4px rgba(114, 227, 162, 0.1);
          }

          50% {
            box-shadow: 0 0 0 8px rgba(114, 227, 162, 0.07);
          }
        }

        @keyframes hero-badge-float {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-5px);
          }
        }

        /* =========================================
           IMAGE NUMBER
        ========================================= */

        .hero-image-number {
          position: absolute;
          z-index: 4;

          right: 0;
          bottom: -5%;

          display: flex;
          align-items: center;
          gap: 10px;

          color: #777777;

          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.12em;
        }

        .hero-image-number__line {
          width: 35px;
          height: 1px;

          background: var(--hero-blue);
        }

        /* =========================================
           BOTTOM DIVIDER
        ========================================= */

        .montasir-hero__bottom-line {
          position: absolute;
          z-index: 5;

          left: 0;
          right: 0;
          bottom: 0;

          height: 1px;

          overflow: hidden;

          background: rgba(17, 17, 17, 0.12);
        }

        .montasir-hero__bottom-line span {
          display: block;

          width: 100%;
          height: 100%;

          background: var(--hero-blue);

          transform: scaleX(0);
          transform-origin: left;

          transition: transform 1.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .hero-started .montasir-hero__bottom-line span {
          transform: scaleX(1);
          transition-delay: 800ms;
        }

        /* =========================================
           SHARED REVEAL ANIMATION
        ========================================= */

        @keyframes hero-reveal-up {
          from {
            opacity: 0;
            transform: translateY(25px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* =========================================
           TABLET
        ========================================= */

        @media (max-width: 1100px) {
          .montasir-hero {
            min-height: 600px;
          }

          .montasir-hero__container {
            min-height: 600px;

            grid-template-columns:
              minmax(0, 1.2fr)
              minmax(280px, 0.8fr);

            gap: 25px;

            padding: 75px 5% 85px;
          }

          .montasir-hero__title {
            font-size: clamp(64px, 7.3vw, 84px);
          }

          .montasir-hero__eyebrow {
            font-size: 14px;
            gap: 9px;
          }

          .montasir-hero__visual {
            max-width: 390px;
          }

          .montasir-hero__portrait-frame {
            padding: 9px;
          }

          .montasir-hero__actions {
            gap: 20px;
            margin-top: 32px;
          }

          .hero-floating-label {
            right: -5%;
          }

          .hero-decoration--circle {
            right: 0;
          }

          .hero-orbit--two {
            width: 115%;
            height: 115%;

            top: -7.5%;
            left: -7.5%;
          }

          .hero-bottom-note {
            margin-top: 48px;
          }
        }

        /* =========================================
           MOBILE
        ========================================= */

        @media (max-width: 700px) {
          .montasir-hero {
            min-height: auto;
            align-items: stretch;
          }

          .montasir-hero__container {
            min-height: auto;

            display: flex;
            flex-direction: column;
            align-items: stretch;

            gap: 0;

            padding: 65px 6% 75px;
          }

          .montasir-hero__content {
            width: 100%;
          }

          .montasir-hero__eyebrow {
            margin-bottom: 24px;

            font-size: 13px;
            line-height: 1.6;
          }

          .montasir-hero__title {
            font-size: clamp(58px, 12.5vw, 84px);

            line-height: 1.02;
            letter-spacing: -0.075em;
          }

          .montasir-hero__description {
            margin-top: 25px;
          }

          .montasir-hero__animated-role {
            min-height: 29px;
            font-size: 21px;
          }

          .montasir-hero__description p {
            font-size: 17px;
          }

          .montasir-hero__actions {
            gap: 20px;
            margin-top: 28px;
          }

          .montasir-hero__primary-button {
            min-height: 52px;

            padding: 0 17px;
            gap: 12px;

            font-size: 13px;
          }

          .montasir-hero__secondary-button {
            gap: 8px;
            font-size: 13px;
          }

          .hero-bottom-note {
            margin-top: 38px;
            font-size: 9px;
          }

          /* Portrait below content */

          .montasir-hero__visual {
            width: min(82%, 360px);
            max-width: 360px;

            margin: 70px auto 10px;

            aspect-ratio: 0.91 / 1;

            align-self: center;
          }

          .montasir-hero__portrait-frame {
            padding: 9px;
          }

          .montasir-hero__availability {
            min-height: 39px;

            bottom: 10%;

            gap: 8px;
            padding: 0 13px;

            font-size: 11px;
          }

          .availability-indicator {
            width: 8px;
            height: 8px;
          }

          .hero-decoration--circle {
            width: 38px;
            height: 38px;

            top: 2%;
            right: 0;
          }

          .hero-decoration--square {
            left: -4%;
            top: 28%;

            width: 12px;
            height: 12px;
          }

          .hero-decoration--star {
            right: 0;
            bottom: 5%;

            font-size: 25px;
          }

          .hero-floating-label {
            top: 17%;
            right: -5%;

            padding: 9px 11px;

            font-size: 10px;
          }

          .hero-floating-label__icon {
            font-size: 16px;
          }

          .hero-orbit--one {
            width: 108%;
            height: 108%;

            top: -4%;
            left: -4%;
          }

          .hero-orbit--two {
            width: 118%;
            height: 118%;

            top: -9%;
            left: -9%;
          }

          .hero-image-glow {
            filter: blur(45px);
          }

          .hero-image-number {
            bottom: -7%;
          }

          .hero-background-grid {
            background-size: 35px 35px;
          }

          .hero-bg-glow--one {
            width: 280px;
            height: 280px;

            top: -100px;
            left: -130px;
          }

          .hero-bg-glow--two {
            width: 250px;
            height: 250px;

            right: -130px;
            bottom: 10%;
          }

          .montasir-hero__title:hover .hero-title-line--one,
          .montasir-hero__title:hover .hero-title-line--two {
            transform: none;
          }
        }

        /* =========================================
           SMALL MOBILE
        ========================================= */

        @media (max-width: 380px) {
          .montasir-hero__container {
            padding: 50px 5% 60px;
          }

          .montasir-hero__title {
            font-size: clamp(48px, 12vw, 60px);
          }

          .montasir-hero__eyebrow {
            font-size: 11px;
          }

          .montasir-hero__description {
            margin-top: 21px;
          }

          .montasir-hero__animated-role {
            font-size: 19px;
          }

          .montasir-hero__description p {
            font-size: 15px;
          }

          .montasir-hero__actions {
            gap: 15px;
          }

          .montasir-hero__primary-button {
            min-height: 48px;

            padding: 0 12px;
            gap: 8px;

            font-size: 12px;
          }

          .montasir-hero__secondary-button {
            gap: 6px;
            font-size: 12px;
          }

          .montasir-hero__visual {
            width: 86%;
            margin-top: 60px;
          }

          .hero-floating-label {
            right: -3%;
          }
        }

        /* =========================================
           ACCESSIBILITY
        ========================================= */

        .montasir-hero a:focus-visible {
          outline: 2px solid var(--hero-blue);
          outline-offset: 5px;
        }

        @media (prefers-reduced-motion: reduce) {
          .montasir-hero *,
          .montasir-hero *::before,
          .montasir-hero *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }

          .montasir-hero__content,
          .montasir-hero__visual,
          .montasir-hero__eyebrow,
          .montasir-hero__description,
          .montasir-hero__actions,
          .hero-title-line,
          .hero-bottom-note {
            opacity: 1;
            transform: none;
            filter: none;
          }
        }
      `}</style>
    </>
  );
}