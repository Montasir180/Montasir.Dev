"use client";

import { useEffect, useRef, useState } from "react";
import {
  Award,
  ArrowDownRight,
  ArrowUpRight,
  BadgeCheck,
  Clock3,
  ExternalLink,
  Sparkles,
} from "lucide-react";

const certifications = [
  {
    id: 1,
    status: "COMPLETED",
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    date: "October 14, 2026",
    duration: "Approximately 300 hours",
    description:
      "Completed the Responsive Web Design Developer Certification, demonstrating practical work with responsive layouts and modern web design fundamentals.",
    image: "/Screenshot 2026-10-14 100656.png",
    credential:
      "https://freecodecamp.org/certification/montasirislam/responsive-web-design-v9",
  },
];

function useScrollReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (!("IntersectionObserver" in window)) {
      const fallbackTimer = window.setTimeout(() => setVisible(true), 0);
      return () => window.clearTimeout(fallbackTimer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

function CertificationCard({ certification, index }) {
  const [cardRef, visible] = useScrollReveal();
  const [imageError, setImageError] = useState(false);

  return (
    <article
      ref={cardRef}
      className={`cert-card ${visible ? "cert-card--visible" : ""}`}
      style={{ "--card-delay": `${index * 120}ms` }}
    >
      <a
        href={certification.credential}
        target="_blank"
        rel="noopener noreferrer"
        className="cert-preview"
        aria-label={`View ${certification.title} certificate`}
      >
        {!imageError ? (
          <img
            src={certification.image}
            alt={`${certification.issuer} ${certification.title} certificate`}
            className="cert-preview__image"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="cert-placeholder">
            <span className="cert-placeholder__brand">
              freeCodeCamp
            </span>

            <Award size={42} />

            <span className="cert-placeholder__eyebrow">
              CERTIFICATE OF ACHIEVEMENT
            </span>

            <h3>Responsive Web Design</h3>

            <p>Montasir Islam</p>

            <span className="cert-placeholder__bottom">
              DEVELOPER CERTIFICATION · 2026
            </span>
          </div>
        )}

        <span className="cert-preview__badge">
          <BadgeCheck size={15} />
          Verified
        </span>

        <span className="cert-preview__open">
          <ArrowUpRight size={20} />
        </span>
      </a>

      <div className="cert-card__body">
        <div className="cert-card__topline">
          <span className="cert-status">
            <span className="cert-status__dot" />
            {certification.status}
          </span>

          <span className="cert-card__number">
            01 / CERTIFICATION
          </span>
        </div>

        <h3 className="cert-card__title">
          {certification.title}
        </h3>

        <p className="cert-card__issuer">
          <Award size={17} />
          {certification.issuer}
        </p>

        <p className="cert-card__description">
          {certification.description}
        </p>

        <div className="cert-card__meta">
          <div>
            <span className="cert-meta__label">
              COMPLETED ON
            </span>

            <span className="cert-meta__value">
              {certification.date}
            </span>
          </div>

          <div>
            <span className="cert-meta__label">
              LEARNING HOURS
            </span>

            <span className="cert-meta__value">
              {certification.duration}
            </span>
          </div>
        </div>

        <a
          href={certification.credential}
          target="_blank"
          rel="noopener noreferrer"
          className="cert-credential-link"
        >
          <span>View Credential</span>
          <ExternalLink size={16} />
        </a>
      </div>
    </article>
  );
}

function UpcomingCard() {
  const [cardRef, visible] = useScrollReveal();
  const [imageError, setImageError] = useState(false);

  return (
    <article
      ref={cardRef}
      className={`cert-upcoming ${
        visible ? "cert-upcoming--visible" : ""
      }`}
    >
      {/* Programming Hero image */}
      <div className="cert-upcoming__visual">
        {!imageError ? (
          <img
            src="/course-thumbnail.webp"
            alt="Programming Hero course preview"
            className="cert-upcoming__image"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="cert-upcoming__fallback">
            <div className="cert-upcoming__grid" />

            <div className="cert-upcoming__fallback-center">
              <div className="cert-upcoming__orbit cert-upcoming__orbit--one" />
              <div className="cert-upcoming__orbit cert-upcoming__orbit--two" />

              <div className="cert-upcoming__symbol">
                <Award size={43} strokeWidth={1.3} />
              </div>

              <span>LEARNING IN PROGRESS</span>
            </div>
          </div>
        )}

        <div className="cert-upcoming__overlay" />

        <div className="cert-upcoming__top">
          <span className="cert-upcoming__label">
            NEXT MILESTONE
          </span>

          <span className="cert-upcoming__icon">
            <Sparkles size={19} />
          </span>
        </div>

        <div className="cert-upcoming__bottom">
          <span>02</span>
          <span>COMING SOON</span>
        </div>
      </div>

      {/* Details */}
      <div className="cert-upcoming__body">
        <div className="cert-upcoming__status">
          <Clock3 size={14} />
          <span>UPCOMING CERTIFICATION</span>
        </div>

        <h3>Programming Hero</h3>

        <p className="cert-upcoming__category">
          Web Development
        </p>

        <p className="cert-upcoming__description">
          Another milestone in my development journey. I&apos;m working
          toward expanding my skills and building more practical projects.
        </p>

        <div className="cert-upcoming__progress">
          <span className="cert-upcoming__progress-line">
            <span />
          </span>

          <span className="cert-upcoming__progress-text">
            THE JOURNEY CONTINUES
          </span>
        </div>

        <div className="cert-upcoming__footer">
          <span>
            <span className="cert-upcoming__live-dot" />
            In Progress
          </span>

          <ArrowUpRight size={19} />
        </div>
      </div>
    </article>
  );
}

export default function CertificationSection() {
  const [headingRef, headingVisible] = useScrollReveal();

  return (
    <section id="certifications" className="cert-section">
      <div className="cert-container">
        {/* Header */}
        <div
          ref={headingRef}
          className={`cert-header ${
            headingVisible ? "cert-header--visible" : ""
          }`}
        >
          <div className="cert-header__main">
            <div className="cert-eyebrow">
              <span className="cert-eyebrow__dot" />
              <span>LEARNING / ACHIEVEMENTS</span>
            </div>

            <h2>
              Proof of work.
              <br />
              <span>Progress in motion.</span>
            </h2>

            <p>
              Every certification represents another step in my journey
              as a developer. Here&apos;s what I&apos;ve achieved and
              what&apos;s coming next.
            </p>
          </div>

          <div className="cert-header__side">
            <div className="cert-header__icon">
              <Award size={29} strokeWidth={1.4} />
            </div>

            <span>LEARN. BUILD. REPEAT.</span>
          </div>
        </div>

        {/* Statistics */}
        <div className="cert-stats">
          <div className="cert-stat">
            <span className="cert-stat__number">01</span>
            <span className="cert-stat__label">COMPLETED</span>
          </div>

          <span className="cert-stats__divider" />

          <div className="cert-stat">
            <span className="cert-stat__number">01</span>
            <span className="cert-stat__label">UPCOMING</span>
          </div>

          <span className="cert-stats__divider" />

          <div className="cert-stat cert-stat--message">
            <span className="cert-stat__message">
              Just getting started.
            </span>
          </div>
        </div>

        {/* Certification cards */}
        <div className="cert-grid">
          {certifications.map((certification, index) => (
            <CertificationCard
              key={certification.id}
              certification={certification}
              index={index}
            />
          ))}

          <UpcomingCard />
        </div>

        {/* Bottom CTA */}
        <div className="cert-bottom">
          <div className="cert-bottom__text">
            <span className="cert-bottom__eyebrow">
              THE NEXT CHAPTER
            </span>

            <h3>
              Still learning.
              <br />
              <span>Still becoming.</span>
            </h3>
          </div>

          <a href="#skills" className="cert-bottom__link">
            <span>Explore My Skills</span>

            <span className="cert-bottom__link-icon">
              <ArrowDownRight size={20} />
            </span>
          </a>
        </div>

        <div className="cert-footer">
          <span>CONTINUOUS LEARNING / 2026</span>
          <span>BUILT WITH CURIOSITY.</span>
        </div>
      </div>

      <style >{`
        .cert-section {
          --cert-bg: #171717;
          --cert-blue: #2845e8;
          --cert-white: #efeeeb;
          --cert-muted: #a2a29b;
          --cert-border: rgba(239, 238, 235, 0.12);

          position: relative;
          overflow: hidden;
          padding: 110px 0 35px;
          background: var(--cert-bg);
          color: var(--cert-white);
          font-family: inherit;
          isolation: isolate;
        }

        .cert-section::before {
          position: absolute;
          top: -270px;
          right: -200px;
          z-index: -1;
          width: 650px;
          height: 650px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(40, 69, 232, 0.2),
            transparent 68%
          );
          content: "";
          pointer-events: none;
        }

        .cert-section::after {
          position: absolute;
          bottom: 100px;
          left: -250px;
          z-index: -1;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(40, 69, 232, 0.08),
            transparent 70%
          );
          content: "";
          pointer-events: none;
        }

        .cert-container {
          width: min(1180px, calc(100% - 64px));
          margin: 0 auto;
        }

        /* Header */

        .cert-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 30px;
          margin-bottom: 48px;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 750ms ease, transform 750ms ease;
        }

        .cert-header--visible {
          opacity: 1;
          transform: translateY(0);
        }

        .cert-eyebrow {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 23px;
          color: var(--cert-muted);
          font-size: 10px;
          font-weight: 750;
          letter-spacing: 0.15em;
        }

        .cert-eyebrow__dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #7790ff;
          box-shadow: 0 0 0 4px rgba(40, 69, 232, 0.2);
        }

        .cert-header h2 {
          margin: 0;
          font-size: clamp(43px, 6vw, 76px);
          font-weight: 650;
          line-height: 1.03;
          letter-spacing: -0.075em;
        }

        .cert-header h2 span,
        .cert-bottom__text h3 span {
          color: #8194ff;
        }

        .cert-header__main > p {
          max-width: 510px;
          margin: 23px 0 0;
          color: var(--cert-muted);
          font-size: 14px;
          line-height: 1.9;
        }

        .cert-header__side {
          display: flex;
          flex-shrink: 0;
          flex-direction: column;
          align-items: center;
          gap: 13px;
        }

        .cert-header__icon {
          display: grid;
          width: 66px;
          height: 66px;
          place-items: center;
          border: 1px solid var(--cert-border);
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.04);
          color: #8194ff;
          transform: rotate(-8deg);
        }

        .cert-header__side > span {
          color: #777770;
          font-size: 8px;
          font-weight: 750;
          letter-spacing: 0.12em;
        }

        /* Statistics */

        .cert-stats {
          display: flex;
          align-items: center;
          gap: 30px;
          margin-bottom: 26px;
          padding: 20px 0;
          border-top: 1px solid var(--cert-border);
          border-bottom: 1px solid var(--cert-border);
        }

        .cert-stat {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .cert-stat__number {
          color: var(--cert-white);
          font-size: 28px;
          font-weight: 650;
          letter-spacing: -0.06em;
        }

        .cert-stat__label {
          color: var(--cert-muted);
          font-size: 9px;
          font-weight: 750;
          letter-spacing: 0.12em;
        }

        .cert-stats__divider {
          width: 1px;
          height: 27px;
          background: var(--cert-border);
        }

        .cert-stat__message {
          color: #8e9eff;
          font-size: 12px;
          font-weight: 550;
        }

        /* Cards */

        .cert-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          align-items: stretch;
          gap: 24px;
        }

        .cert-card,
        .cert-upcoming {
          min-width: 0;
          overflow: hidden;
          border: 1px solid var(--cert-border);
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.025);
          opacity: 0;
          transform: translateY(28px);
          transition:
            opacity 700ms ease,
            transform 700ms ease,
            border-color 250ms ease,
            box-shadow 300ms ease;
        }

        .cert-card {
          transition-delay: var(--card-delay, 0ms);
        }

        .cert-card--visible,
        .cert-upcoming--visible {
          opacity: 1;
          transform: translateY(0);
        }

        .cert-card--visible:hover,
        .cert-upcoming--visible:hover {
          transform: translateY(-5px);
          border-color: rgba(129, 148, 255, 0.4);
          box-shadow: 0 22px 60px rgba(0, 0, 0, 0.2);
        }

        /* Completed certificate */

        .cert-preview {
          position: relative;
          display: block;
          overflow: hidden;
          aspect-ratio: 1.48 / 1;
          background: #fff;
          text-decoration: none;
        }

        .cert-preview__image {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: contain;
          background: #fff;
          transition: transform 500ms ease;
        }

        .cert-card:hover .cert-preview__image {
          transform: scale(1.025);
        }

        .cert-preview__badge {
          position: absolute;
          top: 13px;
          left: 13px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 9px 12px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 999px;
          background: rgba(23, 23, 23, 0.84);
          color: #fff;
          font-size: 10px;
          font-weight: 650;
          backdrop-filter: blur(12px);
        }

        .cert-preview__badge svg {
          color: #9aabff;
        }

        .cert-preview__open {
          position: absolute;
          right: 13px;
          bottom: 13px;
          display: grid;
          width: 42px;
          height: 42px;
          place-items: center;
          border-radius: 50%;
          background: var(--cert-blue);
          color: #fff;
          transition: transform 250ms ease, background 250ms ease;
        }

        .cert-card:hover .cert-preview__open {
          transform: rotate(45deg);
          background: #3b57f1;
        }

        .cert-placeholder {
          display: flex;
          width: 100%;
          height: 100%;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 14px;
          padding: 23px;
          background: #fff;
          color: #121226;
          text-align: center;
        }

        .cert-placeholder__brand {
          font-size: 17px;
          font-weight: 700;
        }

        .cert-placeholder__eyebrow,
        .cert-placeholder__bottom {
          font-size: 8px;
          font-weight: 750;
          letter-spacing: 0.1em;
        }

        .cert-placeholder h3 {
          margin: 0;
          font-size: clamp(20px, 3vw, 31px);
        }

        .cert-placeholder p {
          margin: 0;
          font-weight: 650;
        }

        .cert-placeholder__bottom {
          color: #666;
        }

        /* Completed details */

        .cert-card__body {
          padding: 25px;
        }

        .cert-card__topline {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 19px;
        }

        .cert-status {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #a4b1ff;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.12em;
        }

        .cert-status__dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #8296ff;
          box-shadow: 0 0 0 4px rgba(40, 69, 232, 0.18);
        }

        .cert-card__number {
          color: #777770;
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 0.1em;
        }

        .cert-card__title {
          margin: 0;
          font-size: clamp(24px, 3vw, 32px);
          font-weight: 650;
          line-height: 1.2;
          letter-spacing: -0.055em;
        }

        .cert-card__issuer {
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 12px 0 0;
          color: #a2a29b;
          font-size: 12px;
        }

        .cert-card__issuer svg {
          color: #8e9eff;
        }

        .cert-card__description {
          min-height: 72px;
          margin: 19px 0;
          color: var(--cert-muted);
          font-size: 12px;
          line-height: 1.9;
        }

        .cert-card__meta {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          padding: 18px 0;
          border-top: 1px solid var(--cert-border);
          border-bottom: 1px solid var(--cert-border);
        }

        .cert-card__meta > div {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .cert-meta__label {
          color: #777770;
          font-size: 8px;
          font-weight: 750;
          letter-spacing: 0.1em;
        }

        .cert-meta__value {
          color: #e3e3dd;
          font-size: 10px;
          line-height: 1.5;
        }

        .cert-credential-link {
          display: flex;
          min-height: 48px;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-top: 20px;
          padding: 0 16px;
          border: 1px solid rgba(129, 148, 255, 0.35);
          border-radius: 8px;
          background: rgba(40, 69, 232, 0.12);
          color: #dce1ff;
          font-size: 11px;
          font-weight: 650;
          text-decoration: none;
          transition: background 220ms ease, border-color 220ms ease;
        }

        .cert-credential-link:hover {
          border-color: var(--cert-blue);
          background: var(--cert-blue);
        }

        /* Programming Hero preview */

        .cert-upcoming__visual {
          position: relative;
          display: flex;
          min-height: 260px;
          flex-direction: column;
          justify-content: space-between;
          overflow: hidden;
          padding: 22px;
          background: #202126;
        }

        .cert-upcoming__image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform 500ms ease;
        }

        .cert-upcoming:hover .cert-upcoming__image {
          transform: scale(1.04);
        }

        .cert-upcoming__overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: linear-gradient(
            180deg,
            rgba(15, 15, 20, 0.68) 0%,
            rgba(15, 15, 20, 0.08) 45%,
            rgba(15, 15, 20, 0.72) 100%
          );
          pointer-events: none;
        }

        .cert-upcoming__top,
        .cert-upcoming__bottom {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .cert-upcoming__label {
          color: #fff;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.13em;
        }

        .cert-upcoming__icon {
          display: grid;
          width: 35px;
          height: 35px;
          place-items: center;
          border: 1px solid rgba(255, 255, 255, 0.35);
          border-radius: 50%;
          background: rgba(20, 20, 25, 0.3);
          color: #fff;
          backdrop-filter: blur(12px);
        }

        .cert-upcoming__bottom {
          color: #fff;
          font-size: 9px;
          font-weight: 750;
          letter-spacing: 0.1em;
        }

        /* Fallback if image is missing */

        .cert-upcoming__fallback {
          position: absolute;
          inset: 0;
          display: grid;
          place-items: center;
          overflow: hidden;
          background:
            radial-gradient(
              circle at 50% 50%,
              rgba(40, 69, 232, 0.25),
              transparent 55%
            ),
            #202126;
        }

        .cert-upcoming__grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(
              rgba(255, 255, 255, 0.035) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.035) 1px,
              transparent 1px
            );
          background-size: 32px 32px;
        }

        .cert-upcoming__fallback-center {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          color: #a5b2ff;
        }

        .cert-upcoming__fallback-center > span {
          font-size: 8px;
          font-weight: 750;
          letter-spacing: 0.15em;
        }

        .cert-upcoming__orbit {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 145px;
          height: 145px;
          border: 1px solid rgba(129, 148, 255, 0.22);
          border-radius: 50%;
          animation: cert-orbit 16s linear infinite;
          transform: translate(-50%, -65%);
        }

        .cert-upcoming__orbit--two {
          width: 190px;
          height: 190px;
          border-color: rgba(129, 148, 255, 0.12);
          animation-direction: reverse;
          animation-duration: 24s;
        }

        .cert-upcoming__symbol {
          position: relative;
          z-index: 1;
          display: grid;
          width: 85px;
          height: 85px;
          place-items: center;
          border: 1px solid rgba(129, 148, 255, 0.4);
          border-radius: 24px;
          background: rgba(40, 69, 232, 0.18);
          color: #a6b3ff;
          box-shadow: 0 0 55px rgba(40, 69, 232, 0.16);
          backdrop-filter: blur(12px);
        }

        /* Upcoming details */

        .cert-upcoming__body {
          padding: 25px;
        }

        .cert-upcoming__status {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #a5b2ff;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.1em;
        }

        .cert-upcoming__body h3 {
          margin: 18px 0 0;
          font-size: clamp(26px, 3vw, 34px);
          font-weight: 650;
          letter-spacing: -0.06em;
        }

        .cert-upcoming__category {
          margin: 10px 0 0;
          color: #a3a3a0;
          font-size: 12px;
        }

        .cert-upcoming__description {
          min-height: 72px;
          margin: 19px 0;
          color: var(--cert-muted);
          font-size: 12px;
          line-height: 1.9;
        }

        .cert-upcoming__progress {
          padding: 18px 0;
          border-top: 1px solid var(--cert-border);
          border-bottom: 1px solid var(--cert-border);
        }

        .cert-upcoming__progress-line {
          display: block;
          height: 3px;
          overflow: hidden;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.09);
        }

        .cert-upcoming__progress-line span {
          display: block;
          width: 35%;
          height: 100%;
          border-radius: inherit;
          background: #6f87ff;
        }

        .cert-upcoming__progress-text {
          display: block;
          margin-top: 11px;
          color: #777770;
          font-size: 8px;
          font-weight: 750;
          letter-spacing: 0.12em;
        }

        .cert-upcoming__footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 20px;
          color: #aab5ff;
        }

        .cert-upcoming__footer > span {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 650;
        }

        .cert-upcoming__live-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #8da0ff;
          box-shadow: 0 0 0 4px rgba(40, 69, 232, 0.18);
        }

        /* Bottom CTA */

        .cert-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 25px;
          margin-top: 90px;
          padding: 38px 0;
          border-top: 1px solid var(--cert-border);
          border-bottom: 1px solid var(--cert-border);
        }

        .cert-bottom__eyebrow {
          color: var(--cert-muted);
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.15em;
        }

        .cert-bottom__text h3 {
          margin: 14px 0 0;
          font-size: clamp(32px, 5vw, 52px);
          font-weight: 650;
          line-height: 1.08;
          letter-spacing: -0.065em;
        }

        .cert-bottom__link {
          display: inline-flex;
          flex-shrink: 0;
          align-items: center;
          gap: 18px;
          padding: 8px 8px 8px 19px;
          border: 1px solid rgba(129, 148, 255, 0.45);
          border-radius: 999px;
          background: rgba(40, 69, 232, 0.12);
          color: #e0e4ff;
          font-size: 11px;
          font-weight: 650;
          text-decoration: none;
          transition: background 220ms ease, border-color 220ms ease;
        }

        .cert-bottom__link:hover {
          border-color: var(--cert-blue);
          background: var(--cert-blue);
        }

        .cert-bottom__link-icon {
          display: grid;
          width: 37px;
          height: 37px;
          place-items: center;
          border-radius: 50%;
          background: #efeeeb;
          color: #171717;
          transition: transform 220ms ease;
        }

        .cert-bottom__link:hover .cert-bottom__link-icon {
          transform: rotate(-45deg);
        }

        .cert-footer {
          display: flex;
          justify-content: space-between;
          gap: 15px;
          padding-top: 23px;
          color: #74746f;
          font-size: 8px;
          font-weight: 750;
          letter-spacing: 0.12em;
        }

        @keyframes cert-orbit {
          from {
            transform: translate(-50%, -65%) rotate(0deg);
          }

          to {
            transform: translate(-50%, -65%) rotate(360deg);
          }
        }

        /* Tablet */

        @media (max-width: 900px) {
          .cert-container {
            width: calc(100% - 48px);
          }

          .cert-header {
            align-items: flex-start;
          }

          .cert-header__side {
            padding-top: 25px;
          }

          .cert-grid {
            gap: 18px;
          }

          .cert-card__body,
          .cert-upcoming__body {
            padding: 20px;
          }

          .cert-card__description,
          .cert-upcoming__description {
            min-height: 0;
          }
        }

        /* Mobile */

        @media (max-width: 600px) {
          .cert-section {
            padding: 72px 0 28px;
          }

          .cert-container {
            width: calc(100% - 36px);
          }

          .cert-header {
            flex-direction: column;
            gap: 22px;
            margin-bottom: 35px;
          }

          .cert-eyebrow {
            margin-bottom: 18px;
            font-size: 8px;
          }

          .cert-header h2 {
            font-size: clamp(39px, 10vw, 52px);
          }

          .cert-header__main > p {
            margin-top: 17px;
            font-size: 12px;
          }

          .cert-header__side {
            flex-direction: row;
            gap: 12px;
            padding-top: 0;
          }

          .cert-header__icon {
            width: 43px;
            height: 43px;
            border-radius: 12px;
          }

          .cert-header__icon svg {
            width: 21px;
          }

          .cert-stats {
            flex-wrap: wrap;
            gap: 13px;
            padding: 16px 0;
          }

          .cert-stat {
            gap: 7px;
          }

          .cert-stat__number {
            font-size: 22px;
          }

          .cert-stat__label {
            font-size: 8px;
          }

          .cert-stats__divider {
            height: 22px;
          }

          .cert-stat--message {
            width: 100%;
          }

          .cert-grid {
            grid-template-columns: minmax(0, 1fr);
            gap: 20px;
          }

          .cert-preview {
            aspect-ratio: 1.32 / 1;
          }

          .cert-card__body,
          .cert-upcoming__body {
            padding: 21px 18px;
          }

          .cert-card__title,
          .cert-upcoming__body h3 {
            font-size: 27px;
          }

          .cert-card__description,
          .cert-upcoming__description {
            font-size: 12px;
          }

          .cert-card__meta {
            grid-template-columns: 1fr 1fr;
            gap: 12px;
          }

          .cert-meta__value {
            font-size: 9px;
          }

          .cert-upcoming__visual {
            min-height: 250px;
          }

          .cert-bottom {
            align-items: flex-start;
            flex-direction: column;
            gap: 23px;
            margin-top: 65px;
            padding: 30px 0;
          }

          .cert-bottom__text h3 {
            font-size: 37px;
          }

          .cert-footer {
            flex-direction: column;
            gap: 12px;
            font-size: 8px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .cert-section *,
          .cert-section *::before,
          .cert-section *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }

          .cert-header,
          .cert-card,
          .cert-upcoming {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}