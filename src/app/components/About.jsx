"use client";

import { useEffect, useRef, useState } from "react";

/* =========================================
   DATA
========================================= */

const capabilities = [
  "JavaScript",
  "Web Development",
  "React & Next.js",
  "Frontend Development",
  "Responsive Websites",
  "Creative Development",
];

const details = [
  {
    number: "01",
    title: "Node.js & Backend Development",
    description:
      "Building reliable backend systems, developing APIs, and understanding how modern web applications work behind the scenes.",
    direction: "left",
  },
  {
    number: "02",
    title: "React & Next.js",
    description:
      "Creating modern, responsive web applications with React and Next.js, focusing on performance, usability, and clean architecture.",
    direction: "bottom",
  },
  {
    number: "03",
    title: "Mastering JavaScript",
    description:
      "Strengthening my JavaScript fundamentals, exploring advanced concepts, and writing cleaner, more efficient code.",
    direction: "right",
  },
];
/* =========================================
   SCROLL REVEAL TEXT
========================================= */

function renderScrollRevealText(text) {
  return text.trim().split(/\s+/).map((word, index, words) => (
    <span
      key={`${index}-${word}`}
      className="about-reveal-word"
      data-reveal-word
    >
      {word}
      {index < words.length - 1 ? " " : ""}
    </span>
  ));
}

/* =========================================
   ABOUT COMPONENT
========================================= */

export default function About() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  /* Reveal section when it enters the viewport */
  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (
      reducedMotion ||
      typeof IntersectionObserver === "undefined"
    ) {
      const frame = window.requestAnimationFrame(() => setVisible(true));
      return () => window.cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  /* Word-by-word scroll color reveal */
  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const words = Array.from(
      section.querySelectorAll("[data-reveal-word]")
    );

    if (!words.length) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let frameId = null;

    const clamp = (value, min = 0, max = 1) =>
      Math.min(max, Math.max(min, value));

    const updateWords = () => {
      frameId = null;

      const viewportHeight = window.innerHeight || 1;
      const readingLine = viewportHeight * 0.76;
      const transitionDistance = Math.max(
        45,
        Math.min(80, viewportHeight * 0.09)
      );

      words.forEach((word) => {
        if (reducedMotion) {
          word.style.color = "#111111";
          word.style.backgroundColor = "transparent";
          return;
        }

        const rect = word.getBoundingClientRect();

        const progress = clamp(
          (readingLine - rect.top) / transitionDistance
        );

        const eased = progress * progress * (3 - 2 * progress);

        const start = [155, 155, 155];
        const end = [17, 17, 17];

        const r = Math.round(
          start[0] + (end[0] - start[0]) * eased
        );

        const g = Math.round(
          start[1] + (end[1] - start[1]) * eased
        );

        const b = Math.round(
          start[2] + (end[2] - start[2]) * eased
        );

        word.style.color = `rgb(${r}, ${g}, ${b})`;

        word.style.backgroundColor =
          `rgba(40, 69, 232, ${0.13 * eased})`;
      });
    };

    const scheduleUpdate = () => {
      if (frameId === null) {
        frameId = window.requestAnimationFrame(updateWords);
      }
    };

    updateWords();

    window.addEventListener("scroll", scheduleUpdate, {
      passive: true,
    });

    window.addEventListener("resize", scheduleUpdate, {
      passive: true,
    });

    document.fonts?.ready?.then(scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return (
    <>
      <section
        id="about"
        ref={sectionRef}
        className={`montasir-about ${visible ? "is-visible" : ""}`}
      >
        <div className="montasir-about__container">

          {/* TOP HEADER */}

          <div className="about-entrance about-from-left montasir-about__top">
            <span className="montasir-about__eyebrow">
              <span className="montasir-about__dot" />
              ABOUT ME
            </span>

            <span className="montasir-about__index">
              GET TO KNOW ME <span>/ 01</span>
            </span>
          </div>

          {/* INTRODUCTION */}

          <div className="montasir-about__intro">

            <div className="montasir-about__heading-wrap about-entrance about-from-left">
              <span className="about-heading-label">
                A LITTLE INTRODUCTION
              </span>

              <h2 className="montasir-about__heading">
                A little
                <br />
                about
                <br />
                <span>who I am.</span>
              </h2>

              <div className="about-heading-decoration">
                <span />
                <span />
                <span />
              </div>
            </div>

            <div className="montasir-about__biography about-entrance about-from-right">
              <p className="montasir-about__lead">
                Hi, I&apos;m Montasir Islam — a developer interested in
                building thoughtful digital experiences.
              </p>

              <p className="montasir-about__paragraph montasir-about__scroll-text">
                {renderScrollRevealText(
                  "I work on web development, exploring modern frontend technologies and creating responsive interfaces. I enjoy understanding how things work, solving problems through code, and improving the details that make a website feel intuitive and easy to use."
                )}
              </p>

              <p className="montasir-about__paragraph montasir-about__scroll-text">
                {renderScrollRevealText(
                  "I believe good development is more than writing code. It’s about bringing design, functionality, and usability together to create something meaningful."
                )}
              </p>

              <a href="#projects" className="montasir-about__link">
                <span>Explore my work</span>

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M5 12h14m-6-6 6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>

              <div className="about-bio-signature">
                <span className="about-signature-line" />
                <span>CURIOUS BY NATURE</span>
              </div>
            </div>
          </div>

          {/* DIVIDER */}

          <div className="montasir-about__divider">
            <span />
          </div>

          {/* CAPABILITIES */}

          <div className="montasir-about__capabilities">

            <div className="montasir-about__capabilities-heading about-entrance about-from-left">
              <span className="montasir-about__eyebrow">
                WHAT I&apos;M INTO
              </span>

              <h3>
                Things I enjoy
                <br />
                <span>building.</span>
              </h3>

              <p className="about-capabilities-description">
                Technologies, ideas, and creative challenges that keep
                me learning and building.
              </p>
            </div>

            <div className="montasir-about__tags">
              {capabilities.map((item, index) => (
                <span
                  key={item}
                  className="montasir-about__tag"
                  style={{ "--item-index": index }}
                >
                  <span className="montasir-about__tag-dot" />
                  {item}
                  <span className="about-tag-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </span>
              ))}
            </div>
          </div>

          {/* CURRENT FOCUS HEADER */}
<div className="about-focus-header about-enter from-bottom">
  <span className="about-eyebrow">MY CURRENT FOCUS</span>

  <span className="about-focus-note">
    A FEW THINGS I'M WORKING ON
  </span>
</div>

{/* PREMIUM FOCUS CARDS */}
<div className="about-focus">
  {details.map((item, index) => (
    <article
      key={item.number}
      className={`about-focus-card card-${item.direction}`}
      style={{ "--i": index }}
    >
      <div className="about-card-top">
        <span className="about-card-number">{item.number}</span>

        <span className="about-card-index">
          0{index + 1} / 03
        </span>
      </div>

      <div className="about-card-content">
        <h4>{item.title}</h4>
        <p>{item.description}</p>
      </div>

      <div className="about-card-bottom">
        <span>MY FOCUS</span>

        <span className="about-progress">
          <span />
        </span>
      </div>
    </article>
  ))}
</div>

          {/* BOTTOM STATEMENT */}

          <div className="montasir-about__bottom about-entrance about-from-bottom">
            <span>CURIOUS BY NATURE.</span>
            <span>ALWAYS LEARNING.</span>
            <span>ALWAYS BUILDING.</span>
          </div>
        </div>
      </section>

      {/* =========================================
          COMPLETE COMPONENT STYLES
      ========================================= */}

      <style >{`
        .montasir-about {
          --about-bg: #efeeeb;
          --about-text: #111111;
          --about-muted: #696969;
          --about-blue: #2845e8;
          --about-border: rgba(17, 17, 17, 0.14);

          position: relative;
          width: 100%;
          padding: 110px 5.1% 35px;
          overflow: hidden;
          isolation: isolate;
          background: var(--about-bg);
          color: var(--about-text);
          font-family: Arial, Helvetica, sans-serif;
        }

        .montasir-about,
        .montasir-about * {
          box-sizing: border-box;
        }

        .montasir-about__container {
          width: 100%;
          max-width: 1500px;
          margin: 0 auto;
        }

        /* HEADER */

        .montasir-about__top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding-bottom: 25px;
          border-bottom: 1px solid var(--about-border);
        }

        .montasir-about__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.7px;
        }

        .montasir-about__dot {
          width: 8px;
          height: 8px;
          flex-shrink: 0;
          border-radius: 50%;
          background: var(--about-blue);
          animation: about-pulse 2s ease-in-out infinite;
        }

        .montasir-about__index {
          color: var(--about-muted);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 1px;
        }

        .montasir-about__index span {
          color: var(--about-blue);
        }

        /* INTRO */

        .montasir-about__intro {
          display: grid;
          grid-template-columns: 1.05fr 0.75fr;
          gap: 9%;
          align-items: start;
          padding: 85px 0 90px;
        }

        .about-heading-label {
          display: inline-block;
          margin-bottom: 24px;
          color: var(--about-muted);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2px;
        }

        .montasir-about__heading {
          margin: 0;
          font-size: clamp(65px, 8vw, 112px);
          font-weight: 750;
          line-height: 0.94;
          letter-spacing: -0.085em;
        }

        .montasir-about__heading > span {
          display: inline-block;
          color: var(--about-blue);
          transition: color 250ms ease;
        }

        .montasir-about__heading:hover > span {
          color: #111111;
        }

        .about-heading-decoration {
          display: flex;
          gap: 7px;
          margin-top: 35px;
        }

        .about-heading-decoration span {
          display: block;
          width: 28px;
          height: 4px;
          background: var(--about-blue);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 500ms ease;
        }

        .is-visible .about-heading-decoration span {
          transform: scaleX(1);
          transition-delay: 450ms;
        }

        .about-heading-decoration span:nth-child(2) {
          width: 14px;
          transition-delay: 550ms;
        }

        .about-heading-decoration span:nth-child(3) {
          width: 7px;
          transition-delay: 650ms;
        }

        .montasir-about__biography {
          padding-top: 32px;
        }

        .montasir-about__lead {
          margin: 0 0 25px;
          font-size: clamp(20px, 2vw, 27px);
          font-weight: 600;
          line-height: 1.5;
          letter-spacing: -0.8px;
        }

        .montasir-about__paragraph {
          margin: 0 0 18px;
          color: var(--about-muted);
          font-size: 14px;
          line-height: 1.95;
        }

        .about-reveal-word {
          display: inline;
          border-radius: 3px;
          box-decoration-break: clone;
          -webkit-box-decoration-break: clone;
          transition:
            color 70ms linear,
            background-color 70ms linear;
        }

        /* LINK */

        .montasir-about__link {
          display: inline-flex;
          align-items: center;
          gap: 13px;
          margin-top: 15px;
          padding-bottom: 8px;
          border-bottom: 1px solid var(--about-text);
          color: var(--about-text);
          text-decoration: none;
          font-size: 12px;
          font-weight: 700;
          transition:
            color 250ms ease,
            border-color 250ms ease;
        }

        .montasir-about__link svg {
          width: 17px;
          height: 17px;
          transition: transform 250ms ease;
        }

        .montasir-about__link:hover {
          color: var(--about-blue);
          border-color: var(--about-blue);
        }

        .montasir-about__link:hover svg {
          transform: translateX(6px);
        }

        .montasir-about__link:focus-visible {
          outline: 2px solid var(--about-blue);
          outline-offset: 5px;
        }

        .about-bio-signature {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 38px;
          color: var(--about-muted);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 1.5px;
        }

        .about-signature-line {
          width: 28px;
          height: 1px;
          background: var(--about-blue);
        }

        /* DIVIDER */

        .montasir-about__divider {
          position: relative;
          width: 100%;
          height: 1px;
          overflow: hidden;
          background: var(--about-border);
        }

        .montasir-about__divider > span {
          display: block;
          width: 100%;
          height: 100%;
          background: var(--about-blue);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 1200ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .is-visible .montasir-about__divider > span {
          transform: scaleX(1);
          transition-delay: 350ms;
        }

        /* CAPABILITIES */

        .montasir-about__capabilities {
          display: grid;
          grid-template-columns: 0.8fr 1fr;
          gap: 10%;
          align-items: center;
          padding: 80px 0;
        }

        .montasir-about__capabilities-heading h3 {
          margin: 22px 0 0;
          font-size: clamp(38px, 4.3vw, 57px);
          font-weight: 750;
          line-height: 1.06;
          letter-spacing: -0.07em;
        }

        .montasir-about__capabilities-heading h3 span {
          color: var(--about-blue);
        }

        .about-capabilities-description {
          max-width: 360px;
          margin-top: 20px;
          color: var(--about-muted);
          font-size: 13px;
          line-height: 1.8;
        }

        .montasir-about__tags {
          display: flex;
          flex-wrap: wrap;
          align-content: center;
          gap: 12px;
        }

        .montasir-about__tag {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          min-height: 43px;
          padding: 0 14px;
          border: 1px solid var(--about-border);
          border-radius: 40px;
          background: rgba(255, 255, 255, 0.24);
          font-size: 11px;
          font-weight: 500;
          opacity: 0;
          transform: translate3d(45px, 0, 0);
          transition:
            opacity 700ms ease,
            transform 800ms cubic-bezier(0.16, 1, 0.3, 1),
            background 220ms ease,
            color 220ms ease,
            border-color 220ms ease;
        }

        .is-visible .montasir-about__tag {
          opacity: 1;
          transform: translate3d(0, 0, 0);
          transition-delay: calc(300ms + var(--item-index, 0) * 100ms);
        }

        .montasir-about__tag-dot {
          width: 5px;
          height: 5px;
          flex-shrink: 0;
          border-radius: 50%;
          background: var(--about-blue);
        }

        .about-tag-index {
          margin-left: 5px;
          color: var(--about-blue);
          font-size: 9px;
          opacity: 0.7;
        }

        .montasir-about__tag:hover {
          border-color: var(--about-blue);
          background: var(--about-blue);
          color: white;
        }

        .montasir-about__tag:hover .montasir-about__tag-dot,
        .montasir-about__tag:hover .about-tag-index {
          background: white;
          color: white;
        }

        /* FOCUS HEADER */

        .about-focus-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          padding: 0 0 23px;
        }

        .about-focus-note {
          color: var(--about-muted);
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 1.2px;
        }

      /* =========================================
   CURRENT FOCUS — PREMIUM CARDS
   Existing Blue: #2845e8
========================================= */

.about-focus-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding-bottom: 24px;
}

.about-focus-note {
  color: #696969;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 1.3px;
}

/* CARD GRID */

.about-focus {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  align-items: stretch;
}

/* CARD DESIGN */

.about-focus-card {
  position: relative;
  isolation: isolate;

  display: flex;
  flex-direction: column;

  min-width: 0;
  min-height: 300px;

  padding: 27px 25px 23px;

  overflow: hidden;

  /* Original blue border */
  border: 1px solid rgba(40, 69, 232, 0.15);

  /* Slightly rounded corners */
  border-radius: 12px;

  /* Keep the existing background */
  background: rgba(255, 255, 255, 0.25);

  box-shadow: 0 5px 22px rgba(17, 17, 17, 0.025);

  opacity: 0;

  transition:
    opacity 800ms ease,
    transform 900ms cubic-bezier(0.16, 1, 0.3, 1),
    background 350ms ease,
    border-color 350ms ease,
    box-shadow 350ms ease;

  transition-delay: calc(200ms + var(--i, 0) * 150ms);
}

/* ENTRANCE ANIMATIONS */

.card-left {
  transform: translate3d(-45px, 20px, 0);
}

.card-bottom {
  transform: translate3d(0, 45px, 0);
}

.card-right {
  transform: translate3d(45px, 20px, 0);
}

.is-visible .about-focus-card {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}

/* TOP ROW */

.about-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.about-card-number {
  color: #2845e8;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1px;
}

.about-card-index {
  color: #696969;
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 1px;
}

/* CARD CONTENT */

.about-card-content {
  margin-top: auto;
  padding-top: 60px;
}

.about-card-content h4 {
  max-width: 340px;
  margin: 0 0 14px;

  color: #111111;

  font-size: clamp(19px, 1.7vw, 24px);
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: -0.7px;

  transition: color 300ms ease;
}

.about-card-content p {
  max-width: 360px;
  margin: 0;

  color: #696969;

  font-size: 13px;
  line-height: 1.9;
}

/* BOTTOM ROW */

.about-card-bottom {
  display: flex;
  align-items: center;
  gap: 14px;

  margin-top: 28px;

  color: #111111;

  font-size: 9px;
  font-weight: 700;
  letter-spacing: 1.4px;
}

/* PROGRESS LINE */

.about-progress {
  position: relative;

  display: block;

  width: 45px;
  height: 2px;

  overflow: hidden;

  background: rgba(17, 17, 17, 0.14);
}

.about-progress > span {
  display: block;

  width: 100%;
  height: 100%;

  background: #2845e8;

  transform: scaleX(0);
  transform-origin: left;

  transition: transform 500ms ease;
}

/* HOVER EFFECTS */

.about-focus-card:hover {
  background: rgba(255, 255, 255, 0.55);

  border-color: rgba(40, 69, 232, 0.45);

  box-shadow: 0 16px 38px rgba(17, 17, 17, 0.07);

  transform: translateY(-6px) !important;
}

.about-focus-card:hover .about-card-content h4 {
  color: #2845e8;
}

.about-focus-card:hover .about-progress > span {
  transform: scaleX(1);
}

/* KEYBOARD ACCESSIBILITY */

.about-focus-card:focus-visible {
  outline: 2px solid #2845e8;
  outline-offset: 4px;
}

/* =========================================
   TABLET
========================================= */

@media (max-width: 900px) {
  .about-focus {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
  }

  .about-focus-card {
    min-height: 280px;
    padding: 24px 20px;
  }

  .about-card-content {
    padding-top: 48px;
  }

  .about-card-content h4 {
    font-size: 21px;
  }
}

/* =========================================
   MOBILE
========================================= */

@media (max-width: 600px) {
  .about-focus-header {
    align-items: flex-start;
    flex-direction: column;
    gap: 10px;
  }

  .about-focus-note {
    font-size: 9px;
  }

  .about-focus {
    grid-template-columns: minmax(0, 1fr);
    gap: 14px;
  }

  .about-focus-card {
    min-height: 240px;
    padding: 23px 20px;

    border-radius: 12px;
  }

  .card-left {
    transform: translate3d(-30px, 15px, 0);
  }

  .card-bottom {
    transform: translate3d(30px, 15px, 0);
  }

  .card-right {
    transform: translate3d(-30px, 15px, 0);
  }

  .about-card-content {
    padding-top: 45px;
  }

  .about-card-content h4 {
    font-size: 22px;
  }

  .about-card-content p {
    font-size: 13px;
    line-height: 1.85;
  }

  .about-focus-card:hover {
    transform: translateY(-3px) !important;
  }
}

/* SMALL MOBILE */

@media (max-width: 360px) {
  .about-focus-card {
    padding: 20px 16px;
  }

  .about-card-content h4 {
    font-size: 20px;
  }
}

/* REDUCED MOTION */

@media (prefers-reduced-motion: reduce) {
  .about-focus-card {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .about-focus-card:hover {
    transform: none !important;
  }
}
        /* BOTTOM STATEMENT */

        .montasir-about__bottom {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 15px;
          padding-top: 26px;
          color: var(--about-muted);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 1.5px;
        }

        /* =====================================
           ENTRANCE ANIMATIONS
        ===================================== */

        .about-entrance {
          opacity: 0;
          transition:
            opacity 900ms ease,
            transform 1000ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .about-from-left {
          transform: translate3d(-70px, 0, 0);
        }

        .about-from-right {
          transform: translate3d(70px, 0, 0);
        }

        .about-from-bottom {
          transform: translate3d(0, 35px, 0);
        }

        .is-visible .about-entrance {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }

        .is-visible .montasir-about__top {
          transition-delay: 0ms;
        }

        .is-visible .montasir-about__heading-wrap {
          transition-delay: 120ms;
        }

        .is-visible .montasir-about__biography {
          transition-delay: 260ms;
        }

        .is-visible .montasir-about__capabilities-heading {
          transition-delay: 100ms;
        }

        .is-visible .about-focus-header {
          transition-delay: 150ms;
        }

        .is-visible .montasir-about__bottom {
          transition-delay: 550ms;
        }

        /* PULSE */

        @keyframes about-pulse {
          0%,
          100% {
            box-shadow: 0 0 0 0 rgba(40, 69, 232, 0.25);
          }

          50% {
            box-shadow: 0 0 0 7px rgba(40, 69, 232, 0);
          }
        }

        /* =====================================
           TABLET
        ===================================== */

        @media (max-width: 900px) {
          .montasir-about {
            padding: 85px 5% 28px;
          }

          .montasir-about__intro {
            grid-template-columns: 1fr;
            gap: 25px;
            padding: 65px 0 70px;
          }

          .montasir-about__heading {
            font-size: clamp(65px, 11vw, 95px);
          }

          .montasir-about__biography {
            max-width: 650px;
            padding-top: 10px;
          }

          .montasir-about__capabilities {
            grid-template-columns: 1fr;
            gap: 30px;
            padding: 60px 0;
          }

          .montasir-about__focus-card {
            min-height: 250px;
            padding: 23px 17px;
          }

          .montasir-about__focus-card:first-child {
            padding-left: 0;
          }

          .montasir-about__focus-content h4 {
            font-size: 18px;
          }

          .montasir-about__focus-content p {
            font-size: 12px;
          }
        }

        /* =====================================
           MOBILE
        ===================================== */

        @media (max-width: 600px) {
          .montasir-about {
            padding: 65px 6% 24px;
          }

          .montasir-about__top {
            padding-bottom: 19px;
          }

          .montasir-about__eyebrow {
            font-size: 10px;
            letter-spacing: 1.2px;
          }

          .montasir-about__index {
            font-size: 9px;
            letter-spacing: 0.2px;
          }

          .montasir-about__intro {
            gap: 25px;
            padding: 48px 0 52px;
          }

          .about-heading-label {
            margin-bottom: 20px;
            font-size: 9px;
          }

          .montasir-about__heading {
            font-size: clamp(52px, 12vw, 74px);
            line-height: 0.98;
            letter-spacing: -0.075em;
          }

          .about-heading-decoration {
            margin-top: 25px;
          }

          .montasir-about__lead {
            font-size: 20px;
            line-height: 1.5;
          }

          .montasir-about__paragraph {
            font-size: 13px;
            line-height: 1.9;
          }

          .about-bio-signature {
            margin-top: 28px;
          }

          .montasir-about__capabilities {
            gap: 25px;
            padding: 48px 0;
          }

          .montasir-about__capabilities-heading h3 {
            font-size: 42px;
            letter-spacing: -2px;
          }

          .about-capabilities-description {
            font-size: 12px;
          }

          .montasir-about__tags {
            gap: 9px;
          }

          .montasir-about__tag {
            min-height: 38px;
            padding: 0 11px;
            gap: 7px;
            font-size: 10px;
          }

          .about-tag-index {
            font-size: 8px;
          }

          .about-focus-header {
            align-items: flex-start;
            flex-direction: column;
            gap: 10px;
          }

          .about-focus-note {
            font-size: 8px;
          }

          .montasir-about__focus {
            grid-template-columns: 1fr;
          }

          .montasir-about__focus-card,
          .montasir-about__focus-card:first-child,
          .montasir-about__focus-card:nth-child(2),
          .montasir-about__focus-card:nth-child(3) {
            min-height: 190px;
            padding: 23px 0;
            border-right: none;
            border-bottom: 1px solid var(--about-border);
          }

          .montasir-about__focus-card:first-child {
            transform: translate3d(-45px, 0, 0);
          }

          .montasir-about__focus-card:nth-child(2) {
            transform: translate3d(45px, 0, 0);
          }

          .montasir-about__focus-card:nth-child(3) {
            transform: translate3d(-45px, 0, 0);
          }

          .is-visible .montasir-about__focus-card {
            transform: translate3d(0, 0, 0);
          }

          .montasir-about__focus-card:last-child {
            border-bottom: none;
          }

          .montasir-about__focus-content {
            padding-top: 35px;
            padding-right: 20px;
          }

          .montasir-about__focus-content h4 {
            font-size: 20px;
          }

          .montasir-about__focus-content p {
            max-width: 100%;
            font-size: 13px;
          }

          .montasir-about__bottom {
            justify-content: flex-start;
            gap: 11px 17px;
            font-size: 8px;
            line-height: 1.5;
          }

          .about-from-left {
            transform: translate3d(-35px, 0, 0);
          }

          .about-from-right {
            transform: translate3d(35px, 0, 0);
          }

          .about-from-bottom {
            transform: translate3d(0, 25px, 0);
          }
        }

        @media (max-width: 360px) {
          .montasir-about {
            padding-right: 5%;
            padding-left: 5%;
          }

          .montasir-about__heading {
            font-size: 49px;
          }

          .montasir-about__index {
            letter-spacing: 0;
          }

          .montasir-about__tag {
            padding: 0 9px;
            font-size: 9px;
          }
        }

        /* =====================================
           ACCESSIBILITY
        ===================================== */

        @media (prefers-reduced-motion: reduce) {
          .montasir-about *,
          .montasir-about *::before,
          .montasir-about *::after {
            animation: none !important;
            transition: none !important;
            scroll-behavior: auto !important;
          }

          .montasir-about .about-entrance,
          .montasir-about .montasir-about__tag,
          .montasir-about .montasir-about__focus-card,
          .montasir-about .about-heading-decoration span,
          .montasir-about .montasir-about__divider > span {
            opacity: 1 !important;
            transform: none !important;
          }

          .montasir-about .about-reveal-word {
            color: #111111 !important;
            background-color: transparent !important;
          }
        }
      `}</style>
    </>
  );
}