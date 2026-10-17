"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Code2,
  Layers3,
  Sparkles,
} from "lucide-react";

/* =========================================
   PROJECT DATA
========================================= */

const projects = [
  {
    id: 1,
    slug: "bazardor",
    name: "BazarDor",
    category: "Web",
    type: "Full-Stack Web Application",
    description:
      "A grocery-focused web application designed to make browsing and discovering everyday products easier.",
    tags: ["Next.js", "React", "Web Application"],
    github: "https://github.com/Montasir180/Bazar-Dor",
    demo: "https://bazar-dor-bb1k-git-main-montasir2.vercel.app/",
    preview: "/Screenshot 2026-10-16 130628.png",
    number: "01",
  },
  {
    id: 2,
    slug: "nextlearn",
    name: "NextLearn",
    category: "Web",
    type: "Web Development",
    description:
      "A learning-focused web project built to explore modern web development and create a smooth user experience.",
    tags: ["Next.js", "React", "Learning"],
    github: "https://github.com/Montasir180/nextlearn",
    demo: "https://nextlearn-chi-sable.vercel.app/",
    preview: "/Screenshot 2026-10-16 132303.png",
    number: "02",
  },
  {
    id: 3,
    slug: "assignment-06",
    name: "Assignment 06",
    category: "Course Projects",
    type: "Course Project",
    description:
      "A practical development assignment focused on applying web development concepts through hands-on implementation.",
    tags: ["Development", "Practice", "Assignment"],
    github: "https://github.com/Montasir180/assignment-6",
    demo: "",
    preview: "/projects/assignment-6.png",
    number: "03",
  },
  {
    id: 4,
    slug: "assignment-05",
    name: "Assignment 05",
    category: "Course Projects",
    type: "Course Project",
    description:
      "A hands-on project created to strengthen development skills and practice building web interfaces.",
    tags: ["Development", "Practice", "Assignment"],
    github: "https://github.com/Montasir180/assignment-5",
    demo: "",
    preview: "/projects/assignment-5.png",
    number: "04",
  },
];

const filters = ["All", "Web", "Course Projects"];

/* =========================================
   FALLBACK PROJECT ARTWORK
========================================= */

function PreviewArtwork({ project }) {
  const isBazarDor = project.name === "BazarDor";
  const isNextLearn = project.name === "NextLearn";

  return (
    <div
      className={`smw-artwork ${
        isBazarDor
          ? "smw-artwork--bazar"
          : isNextLearn
            ? "smw-artwork--learn"
            : "smw-artwork--course"
      }`}
    >
      <div className="smw-artwork__top">
        <span>{project.name}</span>
        <span>{project.number}</span>
      </div>

      <div className="smw-artwork__center">
        <span className="smw-artwork__icon">
          {isBazarDor ? (
            <Layers3 size={28} />
          ) : isNextLearn ? (
            <Sparkles size={28} />
          ) : (
            <ArrowUpRight size={28} />
          )}
        </span>

        <h3>{project.name}</h3>
        <p>{project.type}</p>
      </div>

      <div className="smw-artwork__bottom">
        <span>SELECTED WORK</span>
        <span>2026</span>
      </div>
    </div>
  );
}

/* =========================================
   PROJECT IMAGE
========================================= */

function ProjectImage({ project }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="smw-card__visual">
      {project.preview && !imageError ? (
        <img
          src={project.preview}
          alt={`${project.name} project preview`}
          className="smw-card__image"
          loading="lazy"
          onError={() => setImageError(true)}
        />
      ) : (
        <PreviewArtwork project={project} />
      )}

      <span className="smw-card__index">
        {project.number}
      </span>
    </div>
  );
}

/* =========================================
   PROJECT CARD
========================================= */

function ProjectCard({ project, position, onOpen }) {
  const isActive = position === 0;
  const isHidden = Math.abs(position) > 1;

  return (
    <article
      className={`smw-card ${
        isActive ? "smw-card--active" : ""
      } ${isHidden ? "smw-card--hidden" : ""}`}
      style={{
        "--card-x": `${position * 70}%`,
        "--card-rotate": `${position * -7}deg`,
        "--card-scale": position === 0 ? 1 : 0.88,
        "--card-depth": `${Math.abs(position) * -90}px`,
        "--card-opacity": isHidden ? 0 : 1,
      }}
      aria-hidden={isHidden}
    >
      <button
        type="button"
        className="smw-card__open"
        onClick={() => onOpen(project)}
        aria-label={`Open ${project.name} project details`}
        tabIndex={isHidden ? -1 : 0}
      >
        <ProjectImage project={project} />

        <div className="smw-card__body">
          <div className="smw-card__meta">
            <span>{project.type}</span>
            <span>2026 / {project.number}</span>
          </div>

          <div className="smw-card__heading">
            <h3>{project.name}</h3>

            <span className="smw-card__heading-icon">
              <ArrowUpRight size={19} />
            </span>
          </div>

          <p className="smw-card__description">
            {project.description}
          </p>

          <div className="smw-card__tags">
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      </button>

      <div className="smw-card__footer">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="smw-card__action smw-card__action--secondary"
          tabIndex={isHidden ? -1 : 0}
        >
          <Code2 size={15} />
          <span>GitHub</span>
          <ArrowUpRight size={14} />
        </a>

        {project.demo ? (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="smw-card__action smw-card__action--primary"
            tabIndex={isHidden ? -1 : 0}
          >
            <span>Live Demo</span>
            <ArrowUpRight size={15} />
          </a>
        ) : (
          <span className="smw-card__demo-unavailable">
            Demo unavailable
          </span>
        )}
      </div>
    </article>
  );
}

/* =========================================
   MAIN PROJECT SECTION
========================================= */

export default function SeeMyWork() {
  const sectionRef = useRef(null);

  const [sectionVisible, setSectionVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeIndex, setActiveIndex] = useState(0);

  /* SECTION SCROLL REVEAL */

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
      const frame = window.requestAnimationFrame(() => {
        setSectionVisible(true);
      });

      return () => window.cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -35px 0px",
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  /* FILTERED PROJECTS */

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") {
      return projects;
    }

    return projects.filter(
      (project) => project.category === activeFilter
    );
  }, [activeFilter]);

  /* CHANGE FILTER */

  const handleFilterChange = (nextFilter) => {
    setActiveFilter(nextFilter);
    setActiveIndex(0);
  };

  /* SLIDER NAVIGATION */

  const move = (direction) => {
    setActiveIndex((current) => {
      const total = filteredProjects.length;

      if (!total) return 0;

      return (current + direction + total) % total;
    });
  };

  /* KEYBOARD NAVIGATION */

  useEffect(() => {
    const handleKeyDown = (event) => {
      const section = sectionRef.current;

      if (!section || !section.contains(document.activeElement)) {
        return;
      }

      const target = event.target;

      if (
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          ["INPUT", "TEXTAREA", "SELECT", "BUTTON", "A"].includes(
            target.tagName
          ))
      ) {
        return;
      }

      if (event.key === "ArrowLeft") {
        move(-1);
      }

      if (event.key === "ArrowRight") {
        move(1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [filteredProjects.length]);

  /* OPEN PROJECT DETAILS */

  const openProject = (project) => {
    window.location.href = `/projects/${project.slug}`;
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className={`smw-section ${
        sectionVisible ? "smw-is-visible" : ""
      }`}
    >
      <div className="smw-container">
        {/* HEADER */}

        <header className="smw-header">
          <div className="smw-header__content">
            <div className="smw-eyebrow">
              <span className="smw-eyebrow__dot" />
              <span>PORTFOLIO / SELECTED WORK</span>
            </div>

            <h2 className="smw-title">
              <span className="smw-title__line">
                <span>See my</span>
              </span>

              <span className="smw-title__line smw-title__accent">
                <span>work.</span>
              </span>
            </h2>

            <p className="smw-subtitle">
              A collection of projects, experiments, and digital
              experiences. Select a card to explore a project.
            </p>
          </div>

          <a
            href="https://github.com/Montasir180"
            target="_blank"
            rel="noopener noreferrer"
            className="smw-github-link"
          >
            <Code2 size={17} />

            <span>More on GitHub</span>

            <ArrowUpRight size={15} />
          </a>
        </header>

        {/* FILTER TOOLBAR */}

        <div className="smw-toolbar">
          <div
            className="smw-filters"
            role="group"
            aria-label="Filter projects"
          >
            {filters.map((filter, index) => (
              <button
                key={filter}
                type="button"
                onClick={() => handleFilterChange(filter)}
                className={`smw-filter ${
                  activeFilter === filter
                    ? "smw-filter--active"
                    : ""
                }`}
                aria-pressed={activeFilter === filter}
                style={{ "--filter-index": index }}
              >
                {filter}
              </button>
            ))}
          </div>

          <span className="smw-project-count">
            <strong>
              {String(filteredProjects.length).padStart(2, "0")}
            </strong>{" "}
            PROJECTS
          </span>
        </div>

        {/* PROJECT SLIDER */}

        <div
          className="smw-slider"
          aria-label="Project coverflow slider"
        >
          <div className="smw-slider__stage">
            {filteredProjects.map((project, index) => {
              let position = index - activeIndex;
              const total = filteredProjects.length;

              if (position > total / 2) {
                position -= total;
              }

              if (position < -total / 2) {
                position += total;
              }

              return (
                <ProjectCard
                  key={project.id}
                  project={project}
                  position={position}
                  onOpen={openProject}
                />
              );
            })}
          </div>

          {/* SLIDER CONTROLS */}

          <div className="smw-slider__controls">
            <button
              type="button"
              className="smw-slider__arrow"
              onClick={() => move(-1)}
              aria-label="Previous project"
              disabled={filteredProjects.length < 2}
            >
              <ArrowLeft size={18} />
            </button>

            <div
              className="smw-slider__pagination"
              aria-label="Choose project"
            >
              {filteredProjects.map((project, index) => (
                <button
                  key={project.id}
                  type="button"
                  className={`smw-slider__dot ${
                    index === activeIndex ? "is-active" : ""
                  }`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Show ${project.name}`}
                  aria-current={
                    index === activeIndex ? "true" : undefined
                  }
                />
              ))}
            </div>

            <button
              type="button"
              className="smw-slider__arrow"
              onClick={() => move(1)}
              aria-label="Next project"
              disabled={filteredProjects.length < 2}
            >
              <ArrowRight size={18} />
            </button>

            <span className="smw-slider__counter">
              {String(activeIndex + 1).padStart(2, "0")}
              <span>/</span>
              {String(filteredProjects.length).padStart(2, "0")}
            </span>
          </div>

          <p className="smw-slider__hint">
            Use the arrows or select a card to explore
          </p>
        </div>

        {/* BOTTOM CTA */}

        <div className="smw-bottom">
          <div className="smw-bottom__content">
            <span className="smw-bottom__label">
              HAVE SOMETHING IN MIND?
            </span>

            <h3>
              Let&apos;s build something
              <br />
              <span>meaningful.</span>
            </h3>
          </div>

          <a href="#contact" className="smw-contact-link">
            <span>Let&apos;s Talk</span>

            <span className="smw-contact-link__icon">
              <ArrowDownRight size={20} />
            </span>
          </a>
        </div>

        {/* FOOTER */}

        <div className="smw-footer">
          <span>DESIGNED &amp; BUILT WITH INTENTION.</span>

          <a
            href="https://github.com/Montasir180"
            target="_blank"
            rel="noopener noreferrer"
          >
            Explore my GitHub
            <ArrowRight size={14} />
          </a>
        </div>
      </div>

      {/* =========================================
          COMPLETE SECTION CSS
      ========================================= */}

      <style >{`
        .smw-section {
          --smw-blue: #2845e8;
          --smw-ink: #21201e;
          --smw-muted: #777771;
          --smw-border: rgba(33, 32, 30, 0.12);

          position: relative;
          isolation: isolate;
          overflow: hidden;

          padding: 100px 0 34px;

          background: #f2f0e8;
          color: var(--smw-ink);
        }

        .smw-section,
        .smw-section * {
          box-sizing: border-box;
        }

        .smw-container {
          width: min(1180px, calc(100% - 64px));
          margin: 0 auto;
        }

        /* =====================================
           HEADER ANIMATION
        ===================================== */

        .smw-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 28px;

          margin-bottom: 38px;

          opacity: 0;
          transform: translateY(35px);

          transition:
            opacity 850ms ease,
            transform 1000ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .smw-is-visible .smw-header {
          opacity: 1;
          transform: translateY(0);
        }

        .smw-header__content {
          min-width: 0;
        }

        .smw-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;

          margin-bottom: 20px;

          color: var(--smw-muted);

          font-size: 10px;
          font-weight: 750;
          letter-spacing: 0.16em;

          opacity: 0;
          transform: translateY(15px);

          transition:
            opacity 700ms ease,
            transform 800ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .smw-is-visible .smw-eyebrow {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 100ms;
        }

        .smw-eyebrow__dot {
          width: 8px;
          height: 8px;
          flex-shrink: 0;

          border-radius: 50%;
          background: var(--smw-blue);

          box-shadow: 0 0 0 4px rgba(40, 69, 232, 0.1);

          animation: smw-dot-pulse 2.5s ease-in-out infinite;
        }

        .smw-title {
          margin: 0;

          font-size: clamp(48px, 6vw, 76px);
          font-weight: 650;
          line-height: 0.98;
          letter-spacing: -0.075em;
        }

        .smw-title__line {
          display: block;
          overflow: hidden;

          padding: 0.035em 0.04em 0.075em 0;
        }

        .smw-title__line > span {
          display: inline-block;

          opacity: 0;
          transform: translateY(110%);

          transition:
            opacity 750ms ease,
            transform 1000ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .smw-is-visible .smw-title__line > span {
          opacity: 1;
          transform: translateY(0);
        }

        .smw-is-visible .smw-title__line:nth-child(1) > span {
          transition-delay: 180ms;
        }

        .smw-is-visible .smw-title__line:nth-child(2) > span {
          transition-delay: 300ms;
        }

        .smw-title__accent {
          color: var(--smw-blue);
        }

        .smw-subtitle {
          max-width: 480px;
          margin: 18px 0 0;

          color: #696963;
          font-size: 14px;
          line-height: 1.8;

          opacity: 0;
          transform: translateY(16px);

          transition:
            opacity 750ms ease,
            transform 850ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .smw-is-visible .smw-subtitle {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 400ms;
        }

        /* GITHUB BUTTON */

        .smw-github-link {
          display: inline-flex;
          flex-shrink: 0;
          align-items: center;
          gap: 9px;

          padding: 13px 16px;

          border: 1px solid var(--smw-border);
          border-radius: 999px;

          color: var(--smw-ink);
          font-size: 12px;
          font-weight: 650;
          text-decoration: none;

          opacity: 0;
          transform: translateY(18px);

          transition:
            opacity 750ms ease,
            transform 850ms cubic-bezier(0.16, 1, 0.3, 1),
            background 220ms ease,
            color 220ms ease,
            border-color 220ms ease;
        }

        .smw-is-visible .smw-github-link {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 450ms;
        }

        .smw-github-link:hover {
          transform: translateY(-3px);
          border-color: var(--smw-blue);
          background: var(--smw-blue);
          color: white;
        }

        /* =====================================
           FILTER TOOLBAR
        ===================================== */

        .smw-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;

          margin-bottom: 10px;
          padding-bottom: 16px;

          border-bottom: 1px solid var(--smw-border);

          opacity: 0;
          transform: translateY(22px);

          transition:
            opacity 800ms ease,
            transform 900ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .smw-is-visible .smw-toolbar {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 180ms;
        }

        .smw-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
        }

        .smw-filter {
          padding: 9px 14px;

          border: 1px solid transparent;
          border-radius: 999px;

          background: transparent;
          color: #777771;

          font-size: 11px;
          font-weight: 650;

          cursor: pointer;
          -webkit-tap-highlight-color: transparent;

          transition:
            color 220ms ease,
            background 220ms ease,
            border-color 220ms ease,
            transform 220ms ease;
        }

        .smw-filter:hover {
          border-color: var(--smw-border);
          color: var(--smw-ink);
          transform: translateY(-2px);
        }

        .smw-filter--active {
          border-color: var(--smw-blue);
          background: var(--smw-blue);
          color: white;
        }

        .smw-filter--active:hover {
          border-color: var(--smw-blue);
          background: var(--smw-blue);
          color: white;
        }

        .smw-project-count {
          flex-shrink: 0;

          color: #888881;
          font-size: 10px;
          letter-spacing: 0.12em;
        }

        .smw-project-count strong {
          color: var(--smw-ink);
        }

        /* =====================================
           SLIDER ENTRANCE
        ===================================== */

        .smw-slider {
          position: relative;
          padding: 12px 0 0;

          perspective: 1400px;

          opacity: 0;
          transform: translateY(30px);

          transition:
            opacity 900ms ease,
            transform 1000ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .smw-is-visible .smw-slider {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 280ms;
        }

        .smw-slider__stage {
          position: relative;

          display: flex;
          align-items: center;
          justify-content: center;

          min-height: 475px;

          transform-style: preserve-3d;
        }

        /* =====================================
           PROJECT CARDS
        ===================================== */

        .smw-card {
          position: absolute;
          top: 50%;
          left: 50%;

          width: min(390px, 34vw);

          overflow: hidden;

          border: 1px solid rgba(33, 32, 30, 0.1);
          border-radius: 17px;

          background: #f8f7f3;

          box-shadow: 0 18px 45px rgba(33, 32, 30, 0.08);

          opacity: var(--card-opacity);

          transform:
            translate(-50%, -50%)
            translateX(var(--card-x))
            translateZ(var(--card-depth))
            rotateY(var(--card-rotate))
            scale(var(--card-scale));

          transform-origin: center center;

          transition:
            transform 700ms cubic-bezier(0.2, 0.72, 0.2, 1),
            opacity 450ms ease,
            box-shadow 350ms ease,
            border-color 350ms ease;

          backface-visibility: hidden;
          will-change: transform, opacity;
        }

        .smw-card--active {
          z-index: 5;

          border-color: rgba(40, 69, 232, 0.22);

          box-shadow: 0 28px 65px rgba(33, 32, 30, 0.13);
        }

        .smw-card--hidden {
          pointer-events: none;
        }

        .smw-card__open {
          display: block;
          width: 100%;
          padding: 0;

          border: 0;
          background: transparent;
          color: inherit;

          text-align: left;
          cursor: pointer;
        }

        /* IMAGE REVEAL */

        .smw-card__visual {
          position: relative;

          aspect-ratio: 1.72 / 1;

          overflow: hidden;

          background: #e7e6e1;
        }

        .smw-card__image {
          display: block;
          width: 100%;
          height: 100%;

          object-fit: cover;

          transform: scale(1.09);
          filter: saturate(0.75);

          transition:
            transform 1000ms cubic-bezier(0.16, 1, 0.3, 1),
            filter 800ms ease;
        }

        .smw-is-visible .smw-card__image {
          transform: scale(1);
          filter: saturate(1);
        }

        .smw-card--active:hover .smw-card__image {
          transform: scale(1.045);
        }

        .smw-card__index {
          position: absolute;
          top: 12px;
          left: 12px;

          display: grid;
          width: 30px;
          height: 30px;
          place-items: center;

          border: 1px solid rgba(255, 255, 255, 0.5);
          border-radius: 50%;

          background: rgba(255, 255, 255, 0.82);
          color: #21201e;

          font-size: 9px;
          font-weight: 800;

          backdrop-filter: blur(10px);

          transition:
            transform 350ms ease,
            background 350ms ease;
        }

        .smw-card--active:hover .smw-card__index {
          transform: rotate(-8deg) scale(1.08);
          background: white;
        }

        /* CARD BODY */

        .smw-card__body {
          padding: 19px 20px 16px;
        }

        .smw-card__meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;

          margin-bottom: 12px;

          color: var(--smw-muted);
          font-size: 9px;
        }

        .smw-card__meta span:first-child {
          color: var(--smw-blue);
          font-weight: 750;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .smw-card__heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .smw-card__heading h3 {
          margin: 0;

          font-size: 27px;
          font-weight: 700;
          line-height: 1.15;
          letter-spacing: -0.06em;

          transition: color 250ms ease;
        }

        .smw-card__heading-icon {
          display: grid;
          flex-shrink: 0;

          width: 32px;
          height: 32px;
          place-items: center;

          border: 1px solid var(--smw-border);
          border-radius: 50%;

          color: var(--smw-blue);

          transition:
            transform 300ms ease,
            background 300ms ease,
            color 300ms ease,
            border-color 300ms ease;
        }

        .smw-card:hover .smw-card__heading-icon {
          transform: translate(3px, -3px);
          border-color: var(--smw-blue);
          background: var(--smw-blue);
          color: white;
        }

        .smw-card__description {
          display: -webkit-box;

          min-height: 44px;
          margin: 12px 0 14px;

          overflow: hidden;

          color: #73736d;
          font-size: 11px;
          line-height: 1.65;

          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }

        /* TAGS */

        .smw-card__tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .smw-card__tags span {
          padding: 6px 8px;

          border: 1px solid rgba(33, 32, 30, 0.09);
          border-radius: 5px;

          background: rgba(255, 255, 255, 0.55);
          color: #5e5e58;

          font-size: 9px;

          transition:
            border-color 250ms ease,
            background 250ms ease,
            color 250ms ease,
            transform 250ms ease;
        }

        .smw-card__tags span:hover {
          transform: translateY(-2px);

          border-color: rgba(40, 69, 232, 0.28);
          background: rgba(40, 69, 232, 0.06);

          color: var(--smw-blue);
        }

        /* CARD FOOTER */

        .smw-card__footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;

          padding: 12px 20px 16px;

          border-top: 1px solid var(--smw-border);
        }

        .smw-card__action {
          display: inline-flex;

          min-height: 35px;
          align-items: center;
          justify-content: center;
          gap: 6px;

          border: 1px solid transparent;
          border-radius: 999px;

          font-size: 10px;
          font-weight: 700;
          text-decoration: none;

          transition:
            transform 220ms ease,
            background 220ms ease,
            color 220ms ease;
        }

        .smw-card__action--secondary {
          color: #4c4c47;
        }

        .smw-card__action--secondary:hover {
          color: var(--smw-blue);
          transform: translateY(-1px);
        }

        .smw-card__action--primary {
          padding: 0 12px;

          background: var(--smw-blue);
          color: white;
        }

        .smw-card__action--primary:hover {
          transform: translateY(-2px);
          background: #1b35c9;
        }

        .smw-card__demo-unavailable {
          color: #92928b;
          font-size: 9px;
        }

        /* =====================================
           SLIDER CONTROLS
        ===================================== */

        .smw-slider__controls {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;

          margin-top: 4px;
        }

        .smw-slider__arrow {
          display: grid;

          width: 42px;
          height: 42px;
          flex-shrink: 0;
          place-items: center;

          border: 1px solid var(--smw-border);
          border-radius: 50%;

          background: transparent;
          color: var(--smw-ink);

          cursor: pointer;
          -webkit-tap-highlight-color: transparent;

          transition:
            border-color 220ms ease,
            background 220ms ease,
            color 220ms ease,
            transform 220ms ease;
        }

        .smw-slider__arrow:hover:not(:disabled) {
          transform: translateY(-2px);

          border-color: var(--smw-blue);
          background: var(--smw-blue);
          color: white;
        }

        .smw-slider__arrow:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }

        .smw-slider__pagination {
          display: flex;
          align-items: center;
          gap: 7px;
        }

        .smw-slider__dot {
          width: 7px;
          height: 7px;
          padding: 0;

          border: 0;
          border-radius: 999px;

          background: #c9c8c2;

          cursor: pointer;
          -webkit-tap-highlight-color: transparent;

          transition:
            width 300ms ease,
            background 300ms ease;
        }

        .smw-slider__dot.is-active {
          width: 23px;
          background: var(--smw-blue);
        }

        .smw-slider__counter {
          margin-left: 4px;

          color: var(--smw-ink);
          font-size: 10px;
          font-weight: 750;
          letter-spacing: 0.08em;
        }

        .smw-slider__counter span {
          padding: 0 3px;
          color: #999992;
        }

        .smw-slider__hint {
          margin: 12px 0 0;

          color: #898981;
          font-size: 10px;
          text-align: center;

          opacity: 0;
          transform: translateY(8px);

          transition:
            opacity 600ms ease,
            transform 600ms ease;
        }

        .smw-is-visible .smw-slider__hint {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 650ms;
        }

        /* =====================================
           FALLBACK ARTWORK
        ===================================== */

        .smw-artwork {
          display: flex;

          width: 100%;
          height: 100%;
          min-height: 200px;

          flex-direction: column;
          justify-content: space-between;

          padding: 18px;

          background: #21201e;
          color: #f2f0e8;
        }

        .smw-artwork--learn {
          background: #2845e8;
          color: white;
        }

        .smw-artwork--course {
          background: #deddd6;
          color: #21201e;
        }

        .smw-artwork__top,
        .smw-artwork__bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;

          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.1em;
        }

        .smw-artwork__center {
          text-align: center;
        }

        .smw-artwork__icon {
          display: grid;

          width: 54px;
          height: 54px;
          place-items: center;

          margin: 0 auto 12px;

          border: 1px solid rgba(255, 255, 255, 0.25);
          border-radius: 17px;

          background: rgba(255, 255, 255, 0.1);

          transition:
            transform 350ms ease,
            border-radius 350ms ease;
        }

        .smw-card--active:hover .smw-artwork__icon {
          transform: translateY(-3px) rotate(-5deg);
          border-radius: 12px;
        }

        .smw-artwork__center h3 {
          margin: 0;

          font-size: 30px;
          font-weight: 750;
          letter-spacing: -0.06em;
        }

        .smw-artwork__center p {
          margin: 6px 0 0;

          font-size: 10px;
          opacity: 0.72;
        }

        /* =====================================
           BOTTOM CTA
        ===================================== */

        .smw-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;

          margin-top: 72px;
          padding: 32px 0;

          border-top: 1px solid var(--smw-border);
          border-bottom: 1px solid var(--smw-border);

          opacity: 0;
          transform: translateY(28px);

          transition:
            opacity 850ms ease,
            transform 950ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .smw-is-visible .smw-bottom {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 350ms;
        }

        .smw-bottom__label {
          color: var(--smw-muted);
          font-size: 9px;
          font-weight: 750;
          letter-spacing: 0.15em;
        }

        .smw-bottom h3 {
          margin: 12px 0 0;

          font-size: clamp(30px, 4.5vw, 48px);
          font-weight: 650;
          line-height: 1.08;
          letter-spacing: -0.065em;
        }

        .smw-bottom h3 span {
          color: var(--smw-blue);
        }

        .smw-contact-link {
          display: inline-flex;
          flex-shrink: 0;
          align-items: center;
          gap: 16px;

          padding: 7px 7px 7px 18px;

          border: 1px solid var(--smw-blue);
          border-radius: 999px;

          background: var(--smw-blue);
          color: white;

          font-size: 11px;
          font-weight: 650;
          text-decoration: none;

          transition:
            transform 250ms ease,
            background 250ms ease,
            color 250ms ease;
        }

        .smw-contact-link:hover {
          transform: translateY(-3px);

          background: transparent;
          color: var(--smw-blue);
        }

        .smw-contact-link__icon {
          display: grid;

          width: 35px;
          height: 35px;
          place-items: center;

          border-radius: 50%;

          background: white;
          color: var(--smw-blue);

          transition:
            transform 300ms ease,
            background 250ms ease,
            color 250ms ease;
        }

        .smw-contact-link:hover .smw-contact-link__icon {
          transform: rotate(-45deg);

          background: var(--smw-blue);
          color: white;
        }

        /* =====================================
           FOOTER
        ===================================== */

        .smw-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;

          padding-top: 22px;

          color: #888881;

          font-size: 9px;
          font-weight: 650;
          letter-spacing: 0.1em;

          opacity: 0;
          transform: translateY(16px);

          transition:
            opacity 750ms ease,
            transform 850ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .smw-is-visible .smw-footer {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 500ms;
        }

        .smw-footer a {
          display: inline-flex;
          align-items: center;
          gap: 7px;

          color: #55554f;

          font-size: 10px;
          letter-spacing: 0;
          text-decoration: none;

          transition:
            color 220ms ease,
            gap 220ms ease;
        }

        .smw-footer a:hover {
          gap: 11px;
          color: var(--smw-blue);
        }

        /* =====================================
           ANIMATIONS
        ===================================== */

        @keyframes smw-dot-pulse {
          0%,
          100% {
            box-shadow: 0 0 0 4px rgba(40, 69, 232, 0.1);
          }

          50% {
            box-shadow: 0 0 0 8px rgba(40, 69, 232, 0);
          }
        }

        /* =====================================
           TABLET
        ===================================== */

        @media (max-width: 1000px) {
          .smw-slider__stage {
            min-height: 455px;
          }

          .smw-card {
            width: min(360px, 42vw);
          }
        }

        /* =====================================
           MOBILE
        ===================================== */

        @media (max-width: 680px) {
          .smw-container {
            width: calc(100% - 32px);
          }

          .smw-section {
            padding-top: 72px;
          }

          .smw-header {
            align-items: flex-start;
            flex-direction: column;
            gap: 24px;
          }

          .smw-title {
            font-size: clamp(44px, 12vw, 62px);
          }

          .smw-subtitle {
            max-width: 100%;
            font-size: 13px;
          }

          .smw-toolbar {
            align-items: flex-start;
            flex-direction: column;
            gap: 12px;
          }

          .smw-filters {
            width: 100%;
            gap: 5px;
          }

          .smw-filter {
            padding: 9px 11px;
            font-size: 10px;
          }

          .smw-slider__stage {
            min-height: 475px;
          }

          .smw-card {
            width: min(340px, 78vw);
          }

          .smw-card__body {
            padding: 17px 16px 15px;
          }

          .smw-card__heading h3 {
            font-size: 24px;
          }

          .smw-card__footer {
            padding: 12px 16px 15px;
          }

          .smw-slider__controls {
            gap: 10px;
          }

          .smw-slider__arrow {
            width: 40px;
            height: 40px;
          }

          .smw-slider__counter {
            font-size: 9px;
          }

          .smw-bottom {
            align-items: flex-start;
            flex-direction: column;
            gap: 24px;

            margin-top: 52px;
          }

          .smw-bottom h3 {
            font-size: clamp(30px, 8vw, 42px);
          }

          .smw-footer {
            align-items: flex-start;
            flex-direction: column;
            gap: 14px;
          }
        }

        /* SMALL MOBILE */

        @media (max-width: 360px) {
          .smw-container {
            width: calc(100% - 24px);
          }

          .smw-card {
            width: 82vw;
          }

          .smw-card__heading h3 {
            font-size: 22px;
          }

          .smw-card__description {
            font-size: 10px;
          }

          .smw-card__action {
            font-size: 9px;
          }

          .smw-slider__controls {
            gap: 8px;
          }
        }

        /* =====================================
           ACCESSIBILITY
        ===================================== */

        .smw-section .smw-card__open:focus-visible,
        .smw-section .smw-filter:focus-visible,
        .smw-section .smw-slider__arrow:focus-visible,
        .smw-section .smw-slider__dot:focus-visible,
        .smw-section .smw-card__action:focus-visible,
        .smw-section .smw-github-link:focus-visible,
        .smw-section .smw-contact-link:focus-visible {
          outline: 2px solid var(--smw-blue);
          outline-offset: 4px;
        }

        @media (hover: hover) and (pointer: fine) {
          .smw-card--active:hover {
            box-shadow: 0 32px 72px rgba(33, 32, 30, 0.15);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .smw-section *,
          .smw-section *::before,
          .smw-section *::after {
            animation: none !important;
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
          }

          .smw-section .smw-header,
          .smw-section .smw-eyebrow,
          .smw-section .smw-title__line > span,
          .smw-section .smw-subtitle,
          .smw-section .smw-github-link,
          .smw-section .smw-toolbar,
          .smw-section .smw-slider,
          .smw-section .smw-slider__hint,
          .smw-section .smw-bottom,
          .smw-section .smw-footer {
            opacity: 1 !important;
            transform: none !important;
          }

          .smw-section .smw-card__image {
            transform: none !important;
            filter: none !important;
          }
        }
      `}</style>
    </section>
  );
}