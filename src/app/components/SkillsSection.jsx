"use client";

import { useEffect, useRef, useState } from "react";
import Marquee from "react-fast-marquee";
import {
  Code2,
  Layers3,
  Palette,
  Sparkles,
  Database,
  GitBranch,
  Globe,
  Monitor,
  Workflow,
  BrainCircuit,
  Cpu,
  Zap,
  Terminal,
} from "lucide-react";

const technologies = [
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "Next.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  },
  {
    name: "Tailwind CSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  },
  {
    name: "MongoDB",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  {
    name: "Node.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "Express.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  },
  {
    name: "HTML5",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  },
  {
    name: "CSS3",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  },
  {
    name: "Git",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  {
    name: "GitHub",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  },
  {
    name: "Figma",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  },
];

const capabilities = [
  { name: "Responsive UI", icon: Monitor, number: "01" },
  { name: "API Integration", icon: Workflow, number: "02" },
  { name: "Authentication", icon: Code2, number: "03" },
  { name: "Database Integration", icon: Database, number: "04" },
  { name: "Design to Code", icon: Palette, number: "05" },
  { name: "AI-Assisted Development", icon: BrainCircuit, number: "06" },
  { name: "Deployment", icon: Globe, number: "07" },
  { name: "Version Control", icon: GitBranch, number: "08" },
];

function TechLogo({ tech }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div className="skill-logo-item">
      <div className="skill-logo-icon">
        {!imageFailed ? (
          <img
            src={tech.icon}
            alt={`${tech.name} logo`}
            loading="lazy"
            draggable="false"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <Code2 size={27} strokeWidth={1.5} />
        )}
      </div>

      <span>{tech.name}</span>

      <span className="skill-logo-indicator" />
    </div>
  );
}

function CapabilityItem({ item, index }) {
  const Icon = item.icon;
  const cardRef = useRef(null);

  const handleMove = (event) => {
    const card = cardRef.current;

    if (!card || window.matchMedia("(hover: none)").matches) {
      return;
    }

    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);

    const rotateX = ((y / rect.height) - 0.5) * -6;
    const rotateY = ((x / rect.width) - 0.5) * 6;

    card.style.setProperty("--rotate-x", `${rotateX}deg`);
    card.style.setProperty("--rotate-y", `${rotateY}deg`);
  };

  const resetMove = () => {
    if (!cardRef.current) return;

    cardRef.current.style.setProperty("--rotate-x", "0deg");
    cardRef.current.style.setProperty("--rotate-y", "0deg");
  };

  return (
    <div
      ref={cardRef}
      className="skill-capability-item reveal-item"
      style={{ "--item-index": index }}
      onMouseMove={handleMove}
      onMouseLeave={resetMove}
    >
      <span className="skill-card-number">{item.number}</span>

      <span className="skill-capability-icon">
        <Icon size={20} strokeWidth={1.6} />
      </span>

      <span className="skill-capability-name">{item.name}</span>

      <span className="skill-capability-arrow" aria-hidden="true">
        ↗
      </span>
    </div>
  );
}

export default function SkillsSection() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(section);
        }
      },
      {
        threshold: 0.04,
        rootMargin: "0px 0px -35px 0px",
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className={`skills-section ${
        visible ? "skills-is-visible" : ""
      }`}
    >
      {/* Animated background */}

      <div className="skills-background" aria-hidden="true">
        <div className="skills-orb skills-orb-one" />
        <div className="skills-orb skills-orb-two" />
        <div className="skills-grid-pattern" />
      </div>

      <div className="skills-container">
        {/* Heading */}

        <header className="skills-heading">
          <div className="skills-eyebrow reveal-item">
            <span className="skills-eyebrow-dot" />
            <span>MY TOOLKIT</span>
            <span className="skills-eyebrow-line" />
            <span className="skills-eyebrow-year">
              2026 / PRESENT
            </span>
          </div>

          <div className="skills-heading-layout">
            <div className="skills-heading-copy">
              <h2 className="skills-title">
                <span className="skills-title-line reveal-item">
                  Tools I use.
                </span>

                <span className="skills-title-line skills-title-accent reveal-item">
                  Things I build
                  <span className="skills-title-period">.</span>
                </span>
              </h2>

              <p className="skills-intro reveal-item">
                The technologies I work with and the capabilities I
                use to transform ideas into functional, thoughtful
                digital experiences.
              </p>

              <div className="skills-heading-meta reveal-item">
                <span className="skills-live-dot" />
                <span>BUILDING WITH PURPOSE</span>
                <span className="skills-meta-divider">/</span>
                <span>LEARNING EVERY DAY</span>
              </div>
            </div>

            {/* Orbital illustration */}

            <div
              className="skills-heading-visual reveal-item"
              aria-hidden="true"
            >
              <div className="skills-visual-orbit skills-visual-orbit-one" />

              <div className="skills-visual-orbit skills-visual-orbit-two" />

              <div className="skills-visual-core">
                <Layers3 size={34} strokeWidth={1.2} />
              </div>

              <div className="skills-float-icon skills-float-icon-one">
                <Code2 size={18} />
              </div>

              <div className="skills-float-icon skills-float-icon-two">
                <Cpu size={18} />
              </div>

              <div className="skills-float-icon skills-float-icon-three">
                <Zap size={17} />
              </div>

              <span className="skills-visual-caption">
                IDEAS → REALITY
              </span>
            </div>
          </div>
        </header>

        {/* Technologies */}

        <div className="skills-logo-section">
          <div className="skills-section-label reveal-item">
            <span className="skills-section-number">01</span>
            <h3>Technologies &amp; Tools</h3>
            <span className="skills-label-line" />
            <span className="skills-label-note">THE STACK</span>
          </div>

          <div className="skills-marquee-shell reveal-item">
            <div className="skills-marquee-edge skills-marquee-edge-left" />

            <div className="skills-marquee-edge skills-marquee-edge-right" />

            <Marquee
              direction="left"
              speed={32}
              gradient={false}
              pauseOnHover={false}
              autoFill
            >
              {technologies.map((tech) => (
                <TechLogo
                  key={`first-${tech.name}`}
                  tech={tech}
                />
              ))}
            </Marquee>
          </div>

          <div className="skills-marquee-shell skills-marquee-shell-second reveal-item">
            <div className="skills-marquee-edge skills-marquee-edge-left" />

            <div className="skills-marquee-edge skills-marquee-edge-right" />

            <Marquee
              direction="right"
              speed={25}
              gradient={false}
              pauseOnHover={false}
              autoFill
            >
              {[...technologies].reverse().map((tech) => (
                <TechLogo
                  key={`second-${tech.name}`}
                  tech={tech}
                />
              ))}
            </Marquee>
          </div>

          <div className="skills-marquee-caption reveal-item">
            <span>MY DIGITAL WORKBENCH</span>
            <span className="skills-caption-dot" />
            <span>12 TECHNOLOGIES</span>
          </div>
        </div>

        {/* Capabilities */}

        <div className="skills-capabilities-section">
          <div className="skills-section-label reveal-item">
            <span className="skills-section-number">02</span>
            <h3>What I Can Do</h3>
            <span className="skills-label-line" />
            <span className="skills-label-note">CAPABILITIES</span>
          </div>

          <div className="skills-capabilities-intro reveal-item">
            <p>
              More than tools. A practical approach to turning ideas
              into working digital products.
            </p>

            <span className="skills-capabilities-mark">
              <Terminal size={15} />
              <span>AVAILABLE TO BUILD</span>
            </span>
          </div>

          <div className="skills-capabilities-grid">
            {capabilities.map((item, index) => (
              <CapabilityItem
                key={item.name}
                item={item}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Design implementation */}

        <div className="skills-design-card reveal-item">
          <div
            className="skills-design-decoration"
            aria-hidden="true"
          >
            <div className="skills-design-ring skills-design-ring-one" />
            <div className="skills-design-ring skills-design-ring-two" />
            <div className="skills-design-cross">+</div>
          </div>

          <div className="skills-design-icon">
            <Palette size={25} strokeWidth={1.5} />
          </div>

          <div className="skills-design-content">
            <div className="skills-design-topline">
              <span className="skills-design-label">
                DESIGN IMPLEMENTATION &amp; AI
              </span>

              <span className="skills-design-index">
                03 / WORKFLOW
              </span>
            </div>

            <h3>
              From visual inspiration
              <br className="skills-desktop-break" /> to{" "}
              <span>working code.</span>
            </h3>

            <p>
              I study Figma designs, screenshots, and visual references
              to recreate them as responsive web interfaces. I also use
              AI tools to assist with coding, debugging, and exploring
              better solutions.
            </p>

            <div className="skills-design-tags">
              <span>
                <Code2 size={14} />
                Figma to Code
              </span>

              <span>
                <Sparkles size={14} />
                AI-Assisted Workflow
              </span>

              <span>
                <Monitor size={14} />
                Responsive Design
              </span>
            </div>
          </div>

          {/* Text only: unnecessary arrow icon removed */}

          <div className="skills-design-side" aria-hidden="true">
            <span>THINK.</span>
            <span>DESIGN.</span>
            <span>BUILD.</span>
          </div>
        </div>

        {/* Footer */}

        <footer className="skills-footer reveal-item">
          <div className="skills-footer-left">
            <span className="skills-footer-dot" />
            <p>Always learning. Always building.</p>
          </div>

          <div className="skills-footer-center">
            MADE WITH CURIOSITY <span>✳</span>
          </div>

          <span className="skills-footer-index">
            SKILLS / 2026
          </span>
        </footer>
      </div>

      <style >{`
        .skills-section {
          --skill-bg: #f2f0e8;
          --skill-ink: #21201e;
          --skill-muted: #77766d;
          --skill-blue: #315eea;
          --skill-blue-soft: rgba(49, 94, 234, 0.11);
          --skill-border: rgba(33, 32, 30, 0.13);

          position: relative;
          isolation: isolate;
          overflow: hidden;
          padding: 115px 0 36px;
          background: var(--skill-bg);
          color: var(--skill-ink);
          font-family: inherit;
        }

        .skills-section *,
        .skills-section *::before,
        .skills-section *::after {
          box-sizing: border-box;
        }

        .skills-container {
          position: relative;
          z-index: 2;
          width: min(1180px, calc(100% - 64px));
          margin-inline: auto;
        }

        /* Background */

        .skills-background {
          position: absolute;
          z-index: -1;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .skills-grid-pattern {
          position: absolute;
          inset: 0;
          opacity: 0.2;
          background-image: radial-gradient(
            rgba(33, 32, 30, 0.19) 0.65px,
            transparent 0.65px
          );
          background-size: 22px 22px;
          mask-image: linear-gradient(
            to bottom,
            transparent,
            black 18%,
            black 75%,
            transparent
          );
        }

        .skills-orb {
          position: absolute;
          width: 380px;
          aspect-ratio: 1;
          border-radius: 50%;
          filter: blur(85px);
          opacity: 0.13;
          pointer-events: none;
        }

        .skills-orb-one {
          top: 80px;
          right: -220px;
          background: #315eea;
          animation: skillsOrbFloat 12s ease-in-out infinite alternate;
        }

        .skills-orb-two {
          top: 850px;
          left: -280px;
          background: #c7c5a9;
          animation: skillsOrbFloat 15s ease-in-out infinite alternate-reverse;
        }

        /* Entrance animations */

        .skills-section .reveal-item {
          opacity: 0;
          transform: translate3d(0, 28px, 0);
          transition:
            opacity 850ms cubic-bezier(0.16, 1, 0.3, 1),
            transform 850ms cubic-bezier(0.16, 1, 0.3, 1);
          transition-delay: calc(var(--item-index, 0) * 65ms);
        }

        .skills-section.skills-is-visible .reveal-item {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }

        .skills-section .skills-heading-copy .skills-title-line:first-child {
          transition-delay: 80ms;
        }

        .skills-section .skills-heading-copy .skills-title-line:nth-child(2) {
          transition-delay: 190ms;
        }

        .skills-section .skills-heading-visual {
          transition-delay: 250ms;
        }

        /* Eyebrow */

        .skills-eyebrow {
          display: flex;
          align-items: center;
          gap: 11px;
          margin-bottom: 28px;
          color: var(--skill-muted);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.17em;
        }

        .skills-eyebrow-dot {
          position: relative;
          width: 8px;
          height: 8px;
          flex-shrink: 0;
          border-radius: 50%;
          background: var(--skill-blue);
          box-shadow: 0 0 0 4px rgba(49, 94, 234, 0.12);
        }

        .skills-eyebrow-dot::after {
          position: absolute;
          inset: -4px;
          border: 1px solid rgba(49, 94, 234, 0.45);
          border-radius: inherit;
          content: "";
          animation: skillsDotPulse 2.4s ease-out infinite;
        }

        .skills-eyebrow-line {
          width: 36px;
          height: 1px;
          background: var(--skill-border);
        }

        .skills-eyebrow-year {
          color: #98978d;
          font-size: 9px;
        }

        /* Heading */

        .skills-heading {
          margin-bottom: 78px;
        }

        .skills-heading-layout {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 300px;
          align-items: center;
          gap: 50px;
        }

        .skills-heading-copy {
          min-width: 0;
        }

        .skills-title {
          margin: 0;
          font-size: clamp(54px, 7.2vw, 91px);
          font-weight: 680;
          line-height: 0.99;
          letter-spacing: -0.085em;
        }

        .skills-title-line {
          display: block;
        }

        .skills-title-accent {
          margin-top: 8px;
          color: #77766d;
        }

        .skills-title-period {
          color: var(--skill-ink);
        }

        .skills-intro {
          max-width: 490px;
          margin: 26px 0 0;
          color: var(--skill-muted);
          font-size: 14px;
          line-height: 1.95;
        }

        .skills-heading-meta {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 10px;
          margin-top: 24px;
          color: #79786f;
          font-size: 9px;
          font-weight: 750;
          letter-spacing: 0.09em;
        }

        .skills-live-dot {
          width: 7px;
          height: 7px;
          flex-shrink: 0;
          border-radius: 50%;
          background: var(--skill-blue);
          box-shadow: 0 0 0 4px rgba(49, 94, 234, 0.1);
          animation: skillsLivePulse 2s ease-in-out infinite;
        }

        .skills-meta-divider {
          color: #b0afa5;
        }

        /* Orbital illustration */

        .skills-heading-visual {
          position: relative;
          display: grid;
          width: 285px;
          max-width: 100%;
          aspect-ratio: 1;
          justify-self: end;
          place-items: center;
          isolation: isolate;
        }

        .skills-visual-orbit {
          position: absolute;
          inset: 14%;
          border: 1px solid rgba(33, 32, 30, 0.13);
          border-radius: 50%;
        }

        .skills-visual-orbit-one {
          animation: skillsOrbit 22s linear infinite;
        }

        .skills-visual-orbit-one::before {
          position: absolute;
          top: 11%;
          left: 15%;
          width: 9px;
          height: 9px;
          border: 2px solid var(--skill-bg);
          border-radius: 50%;
          background: var(--skill-blue);
          box-shadow: 0 0 0 1px var(--skill-ink);
          content: "";
        }

        .skills-visual-orbit-two {
          inset: 28%;
          border-style: dashed;
          border-color: rgba(33, 32, 30, 0.2);
          animation: skillsOrbit 30s linear infinite reverse;
        }

        .skills-visual-core {
          position: relative;
          display: grid;
          width: 100px;
          height: 100px;
          place-items: center;
          border: 1px solid rgba(33, 32, 30, 0.13);
          border-radius: 31px;
          background: rgba(255, 255, 255, 0.48);
          color: var(--skill-blue);
          box-shadow:
            0 20px 65px rgba(33, 32, 30, 0.08),
            inset 0 1px 0 rgba(255, 255, 255, 0.85);
          transform: rotate(-8deg);
          animation: skillsCoreFloat 5s ease-in-out infinite;
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }

        .skills-float-icon {
          position: absolute;
          z-index: 2;
          display: grid;
          width: 47px;
          height: 47px;
          place-items: center;
          border: 1px solid rgba(33, 32, 30, 0.12);
          border-radius: 15px;
          background: rgba(255, 255, 255, 0.7);
          color: var(--skill-ink);
          box-shadow: 0 12px 28px rgba(33, 32, 30, 0.07);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .skills-float-icon-one {
          top: 12%;
          right: 12%;
          animation: skillsFloatOne 5s ease-in-out infinite;
        }

        .skills-float-icon-two {
          bottom: 23%;
          left: 5%;
          animation: skillsFloatTwo 6s ease-in-out infinite;
        }

        .skills-float-icon-three {
          right: 9%;
          bottom: 13%;
          background: var(--skill-blue);
          color: white;
          animation: skillsFloatOne 4.5s ease-in-out infinite reverse;
        }

        .skills-visual-caption {
          position: absolute;
          bottom: 0;
          color: var(--skill-muted);
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.18em;
        }

        /* Section labels */

        .skills-section-label {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 23px;
        }

        .skills-section-number {
          color: var(--skill-blue);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.1em;
        }

        .skills-section-label h3 {
          margin: 0;
          font-size: 17px;
          font-weight: 700;
          letter-spacing: -0.045em;
        }

        .skills-label-line {
          height: 1px;
          flex: 1;
          background: var(--skill-border);
        }

        .skills-label-note {
          color: #8c8b81;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.1em;
        }

        /* Technology marquee */

        .skills-logo-section {
          margin-bottom: 80px;
        }

        .skills-marquee-shell {
          position: relative;
          overflow: hidden;
          border-top: 1px solid var(--skill-border);
          border-bottom: 1px solid var(--skill-border);
        }

        .skills-marquee-shell-second {
          border-top: 0;
        }

        .skills-marquee-edge {
          position: absolute;
          z-index: 3;
          top: 0;
          bottom: 0;
          width: 55px;
          pointer-events: none;
        }

        .skills-marquee-edge-left {
          left: 0;
          background: linear-gradient(
            90deg,
            var(--skill-bg),
            rgba(242, 240, 232, 0)
          );
        }

        .skills-marquee-edge-right {
          right: 0;
          background: linear-gradient(
            270deg,
            var(--skill-bg),
            rgba(242, 240, 232, 0)
          );
        }

        .skill-logo-item {
          position: relative;
          display: flex;
          min-width: 153px;
          min-height: 112px;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 11px;
          margin-right: 10px;
          padding: 12px 18px;
          border-right: 1px solid rgba(33, 32, 30, 0.07);
          transition:
            background 300ms ease,
            transform 350ms cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .skill-logo-item:hover {
          background: rgba(255, 255, 255, 0.5);
          transform: translateY(-3px);
        }

        .skill-logo-icon {
          display: grid;
          width: 44px;
          height: 44px;
          place-items: center;
          transition: transform 350ms cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .skill-logo-icon img {
          display: block;
          width: 36px;
          height: 36px;
          object-fit: contain;
          transition:
            transform 350ms cubic-bezier(0.2, 0.8, 0.2, 1),
            filter 300ms ease;
        }

        .skill-logo-item:hover .skill-logo-icon {
          transform: translateY(-3px) rotate(-5deg);
        }

        .skill-logo-item:hover .skill-logo-icon img {
          transform: scale(1.13);
        }

        .skill-logo-item > span:not(.skill-logo-indicator) {
          color: #57564e;
          font-size: 11px;
          font-weight: 700;
          white-space: nowrap;
        }

        .skill-logo-indicator {
          width: 0;
          height: 2px;
          border-radius: 10px;
          background: var(--skill-blue);
          transition: width 300ms ease;
        }

        .skill-logo-item:hover .skill-logo-indicator {
          width: 22px;
        }

        .skills-marquee-caption {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 15px;
          color: #8b8a80;
          font-size: 9px;
          font-weight: 750;
          letter-spacing: 0.12em;
        }

        .skills-caption-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--skill-blue);
        }

        /* Capabilities */

        .skills-capabilities-section {
          margin-bottom: 76px;
        }

        .skills-capabilities-intro {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          margin: 0 0 25px;
        }

        .skills-capabilities-intro > p {
          max-width: 540px;
          margin: 0;
          color: var(--skill-muted);
          font-size: 13px;
          line-height: 1.8;
        }

        .skills-capabilities-mark {
          display: inline-flex;
          flex-shrink: 0;
          align-items: center;
          gap: 8px;
          color: #77766d;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.08em;
        }

        .skills-capabilities-mark svg {
          color: var(--skill-blue);
        }

        .skills-capabilities-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 13px;
          perspective: 1000px;
        }

        .skill-capability-item {
          --mouse-x: 50%;
          --mouse-y: 50%;
          --rotate-x: 0deg;
          --rotate-y: 0deg;

          position: relative;
          display: flex;
          min-width: 0;
          min-height: 156px;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-end;
          gap: 15px;
          overflow: hidden;
          padding: 19px;
          border: 1px solid rgba(33, 32, 30, 0.12);
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.35);
          transform: perspective(900px) rotateX(var(--rotate-x))
            rotateY(var(--rotate-y));
          transform-style: preserve-3d;
          transition:
            transform 180ms ease,
            border-color 300ms ease,
            background 300ms ease,
            box-shadow 300ms ease;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .skill-capability-item::before {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            190px circle at var(--mouse-x) var(--mouse-y),
            rgba(49, 94, 234, 0.15),
            transparent 70%
          );
          opacity: 0;
          content: "";
          pointer-events: none;
          transition: opacity 300ms ease;
        }

        .skill-capability-item::after {
          position: absolute;
          right: 0;
          bottom: 0;
          left: 0;
          height: 2px;
          background: var(--skill-blue);
          transform: scaleX(0);
          transform-origin: left;
          content: "";
          transition: transform 350ms cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .skill-card-number {
          position: absolute;
          top: 15px;
          right: 16px;
          color: rgba(33, 32, 30, 0.42);
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.08em;
          transition: color 250ms ease;
        }

        .skill-capability-icon {
          position: relative;
          display: grid;
          width: 43px;
          height: 43px;
          flex-shrink: 0;
          place-items: center;
          border: 1px solid rgba(33, 32, 30, 0.1);
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.65);
          color: var(--skill-blue);
          transition:
            transform 350ms cubic-bezier(0.2, 0.8, 0.2, 1),
            background 300ms ease,
            border-color 300ms ease;
        }

        .skill-capability-name {
          position: relative;
          z-index: 1;
          padding-right: 3px;
          color: #393831;
          font-size: 12px;
          font-weight: 700;
          line-height: 1.55;
        }

        .skill-capability-arrow {
          position: absolute;
          right: 14px;
          bottom: 17px;
          display: grid;
          width: 29px;
          height: 29px;
          place-items: center;
          border: 1px solid rgba(33, 32, 30, 0.11);
          border-radius: 50%;
          color: #77766d;
          opacity: 0;
          transform: translate(-4px, 4px);
          transition:
            opacity 250ms ease,
            transform 250ms ease,
            background 250ms ease,
            color 250ms ease;
        }

        .skill-capability-item:hover {
          border-color: rgba(49, 94, 234, 0.32);
          background: rgba(255, 255, 255, 0.7);
          box-shadow: 0 16px 36px rgba(33, 32, 30, 0.07);
        }

        .skill-capability-item:hover::before {
          opacity: 1;
        }

        .skill-capability-item:hover::after {
          transform: scaleX(1);
        }

        .skill-capability-item:hover .skill-capability-icon {
          transform: translateY(-4px) rotate(-5deg);
          border-color: rgba(49, 94, 234, 0.22);
          background: var(--skill-blue-soft);
        }

        .skill-capability-item:hover .skill-card-number {
          color: var(--skill-blue);
        }

        .skill-capability-item:hover .skill-capability-arrow {
          opacity: 1;
          transform: translate(0, 0);
          background: var(--skill-blue);
          color: white;
        }

        /* Design implementation card */

        .skills-design-card {
          position: relative;
          display: grid;
          grid-template-columns: 54px minmax(0, 1fr) 78px;
          align-items: start;
          gap: 23px;
          overflow: hidden;
          padding: 35px;
          border: 1px solid rgba(33, 32, 30, 0.13);
          border-radius: 20px;
          background: linear-gradient(
            125deg,
            rgba(255, 255, 255, 0.72),
            rgba(255, 255, 255, 0.23)
          );
          box-shadow: 0 18px 55px rgba(33, 32, 30, 0.035);
          isolation: isolate;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        .skills-design-card::before {
          position: absolute;
          z-index: -1;
          top: -120px;
          right: -80px;
          width: 290px;
          height: 290px;
          border: 1px solid rgba(33, 32, 30, 0.09);
          border-radius: 50%;
          content: "";
          transition:
            transform 900ms cubic-bezier(0.2, 0.8, 0.2, 1),
            border-color 500ms ease;
        }

        .skills-design-card::after {
          position: absolute;
          z-index: -1;
          top: -50%;
          bottom: -50%;
          left: -35%;
          width: 24%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(49, 94, 234, 0.08),
            transparent
          );
          content: "";
          transform: skewX(-20deg);
          transition: left 1000ms cubic-bezier(0.2, 0.8, 0.2, 1);
          pointer-events: none;
        }

        .skills-design-card:hover::before {
          transform: scale(1.12);
          border-color: rgba(33, 32, 30, 0.16);
        }

        .skills-design-card:hover::after {
          left: 120%;
        }

        .skills-design-icon {
          position: relative;
          display: grid;
          width: 52px;
          height: 52px;
          place-items: center;
          border: 1px solid rgba(33, 32, 30, 0.1);
          border-radius: 16px;
          background: var(--skill-blue);
          color: white;
          box-shadow: 0 8px 22px rgba(33, 32, 30, 0.07);
          transition:
            transform 350ms ease,
            border-radius 350ms ease;
        }

        .skills-design-card:hover .skills-design-icon {
          transform: rotate(-8deg) scale(1.06);
          border-radius: 19px;
        }

        .skills-design-content {
          position: relative;
          min-width: 0;
        }

        .skills-design-topline {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .skills-design-label {
          color: #66655c;
          font-size: 9px;
          font-weight: 850;
          letter-spacing: 0.13em;
        }

        .skills-design-index {
          color: #9b9a90;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.08em;
        }

        .skills-design-content h3 {
          margin: 17px 0 0;
          font-size: clamp(29px, 4vw, 43px);
          font-weight: 700;
          line-height: 1.13;
          letter-spacing: -0.065em;
        }

        .skills-design-content h3 > span {
          position: relative;
          display: inline-block;
        }

        .skills-design-content h3 > span::after {
          position: absolute;
          right: 0;
          bottom: 1px;
          left: 0;
          z-index: -1;
          height: 35%;
          background: rgba(49, 94, 234, 0.2);
          content: "";
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 650ms cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .skills-design-card:hover .skills-design-content h3 > span::after {
          transform: scaleX(1);
        }

        .skills-design-content > p {
          max-width: 710px;
          margin: 17px 0 0;
          color: var(--skill-muted);
          font-size: 12px;
          line-height: 1.95;
        }

        .skills-design-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 9px;
          margin-top: 22px;
        }

        .skills-design-tags > span {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 9px 11px;
          border: 1px solid rgba(33, 32, 30, 0.11);
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.4);
          color: #4e4d45;
          font-size: 10px;
          font-weight: 650;
          transition:
            transform 250ms ease,
            border-color 250ms ease,
            background 250ms ease;
        }

        .skills-design-tags > span svg {
          color: var(--skill-blue);
          transition: transform 250ms ease;
        }

        .skills-design-tags > span:hover {
          transform: translateY(-3px);
          border-color: rgba(49, 94, 234, 0.28);
          background: var(--skill-blue-soft);
        }

        .skills-design-tags > span:hover svg {
          transform: rotate(-8deg);
        }

        /* Right-side text only: no arrow icon */

        .skills-design-side {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 8px;
          padding-top: 5px;
          color: #85847a;
          font-size: 9px;
          font-weight: 850;
          letter-spacing: 0.1em;
        }

        .skills-design-decoration {
          position: absolute;
          top: -50px;
          right: -25px;
          width: 240px;
          height: 240px;
          pointer-events: none;
        }

        .skills-design-ring {
          position: absolute;
          inset: 0;
          border: 1px solid rgba(33, 32, 30, 0.07);
          border-radius: 50%;
        }

        .skills-design-ring-one {
          animation: skillsOrbit 30s linear infinite;
        }

        .skills-design-ring-two {
          inset: 30px;
          border-style: dashed;
          animation: skillsOrbit 35s linear infinite reverse;
        }

        .skills-design-cross {
          position: absolute;
          top: 55px;
          right: 48px;
          color: rgba(33, 32, 30, 0.3);
          font-size: 24px;
          font-weight: 300;
        }

        /* Footer */

        .skills-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          margin-top: 30px;
          padding-top: 22px;
          border-top: 1px solid var(--skill-border);
        }

        .skills-footer-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .skills-footer-dot {
          width: 7px;
          height: 7px;
          flex-shrink: 0;
          border-radius: 50%;
          background: var(--skill-blue);
          box-shadow: 0 0 0 3px rgba(49, 94, 234, 0.1);
        }

        .skills-footer p {
          margin: 0;
          color: #66655d;
          font-size: 11px;
          font-weight: 600;
        }

        .skills-footer-center {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #8c8b81;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.1em;
        }

        .skills-footer-center span {
          color: var(--skill-blue);
          font-size: 15px;
          animation: skillsFooterSpin 8s linear infinite;
        }

        .skills-footer-index {
          color: #8c8b81;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.1em;
        }

        /* Keyframes */

        @keyframes skillsDotPulse {
          0% {
            transform: scale(0.8);
            opacity: 0.8;
          }
          100% {
            transform: scale(1.9);
            opacity: 0;
          }
        }

        @keyframes skillsLivePulse {
          0%,
          100% {
            box-shadow: 0 0 0 3px rgba(49, 94, 234, 0.1);
          }
          50% {
            box-shadow: 0 0 0 6px rgba(49, 94, 234, 0.035);
          }
        }

        @keyframes skillsOrbit {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes skillsCoreFloat {
          0%,
          100% {
            transform: translateY(0) rotate(-8deg);
          }
          50% {
            transform: translateY(-9px) rotate(-4deg);
          }
        }

        @keyframes skillsFloatOne {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-9px);
          }
        }

        @keyframes skillsFloatTwo {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(9px);
          }
        }

        @keyframes skillsOrbFloat {
          from {
            transform: translate3d(0, 0, 0) scale(1);
          }
          to {
            transform: translate3d(-25px, 35px, 0) scale(1.12);
          }
        }

        @keyframes skillsFooterSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        /* Tablet */

        @media (max-width: 1000px) {
          .skills-heading-layout {
            grid-template-columns: minmax(0, 1fr) 230px;
            gap: 25px;
          }

          .skills-heading-visual {
            width: 230px;
          }

          .skills-title {
            font-size: clamp(52px, 7vw, 75px);
          }

          .skills-capabilities-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .skill-capability-item {
            min-height: 145px;
          }

          .skills-design-card {
            grid-template-columns: 48px minmax(0, 1fr) 65px;
            gap: 18px;
            padding: 27px;
          }

          .skills-design-side {
            font-size: 8px;
          }
        }

        /* Mobile */

        @media (max-width: 650px) {
          .skills-section {
            padding: 76px 0 28px;
          }

          .skills-container {
            width: calc(100% - 36px);
          }

          .skills-eyebrow {
            gap: 8px;
            margin-bottom: 24px;
            font-size: 9px;
          }

          .skills-eyebrow-year {
            margin-left: auto;
            font-size: 8px;
          }

          .skills-heading {
            margin-bottom: 53px;
          }

          .skills-heading-layout {
            grid-template-columns: minmax(0, 1fr);
            gap: 0;
          }

          .skills-title {
            font-size: clamp(43px, 10.7vw, 66px);
            line-height: 1.02;
          }

          .skills-title-accent {
            margin-top: 7px;
          }

          .skills-intro {
            max-width: 430px;
            margin-top: 19px;
            font-size: 12px;
            line-height: 1.9;
          }

          .skills-heading-meta {
            gap: 8px;
            margin-top: 20px;
            font-size: 8px;
          }

          .skills-heading-visual {
            width: 160px;
            margin: 24px auto 0;
            justify-self: center;
          }

          .skills-visual-core {
            width: 68px;
            height: 68px;
            border-radius: 22px;
          }

          .skills-visual-core svg {
            width: 27px;
            height: 27px;
          }

          .skills-float-icon {
            width: 35px;
            height: 35px;
            border-radius: 11px;
          }

          .skills-float-icon svg {
            width: 15px;
            height: 15px;
          }

          .skills-visual-caption {
            font-size: 8px;
          }

          .skills-logo-section {
            margin-bottom: 55px;
          }

          .skills-section-label {
            gap: 10px;
            margin-bottom: 20px;
          }

          .skills-section-label h3 {
            font-size: 14px;
          }

          .skills-label-note {
            font-size: 8px;
          }

          .skills-marquee-edge {
            width: 25px;
          }

          .skill-logo-item {
            min-width: 112px;
            min-height: 91px;
            gap: 7px;
            margin-right: 5px;
            padding: 9px;
          }

          .skill-logo-icon {
            width: 34px;
            height: 34px;
          }

          .skill-logo-icon img {
            width: 29px;
            height: 29px;
          }

          .skill-logo-item > span:not(.skill-logo-indicator) {
            font-size: 10px;
          }

          .skills-marquee-caption {
            gap: 7px;
            font-size: 8px;
          }

          .skills-capabilities-section {
            margin-bottom: 53px;
          }

          .skills-capabilities-intro {
            align-items: flex-start;
            flex-direction: column;
            gap: 12px;
            margin-bottom: 20px;
          }

          .skills-capabilities-intro > p {
            font-size: 12px;
          }

          .skills-capabilities-mark {
            font-size: 8px;
          }

          .skills-capabilities-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 9px;
          }

          .skill-capability-item {
            min-height: 129px;
            gap: 12px;
            padding: 14px 11px;
            border-radius: 11px;
            transform: none;
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
          }

          .skill-capability-icon {
            width: 35px;
            height: 35px;
            border-radius: 10px;
          }

          .skill-capability-icon svg {
            width: 18px;
            height: 18px;
          }

          .skill-capability-name {
            padding-right: 0;
            font-size: 10px;
            line-height: 1.5;
          }

          .skill-card-number {
            top: 12px;
            right: 11px;
            font-size: 8px;
          }

          .skill-capability-arrow {
            display: none;
          }

          .skills-design-card {
            grid-template-columns: minmax(0, 1fr);
            gap: 18px;
            padding: 23px 18px;
            border-radius: 15px;
          }

          .skills-design-icon {
            width: 43px;
            height: 43px;
            border-radius: 13px;
          }

          .skills-design-icon svg {
            width: 22px;
          }

          .skills-design-topline {
            align-items: flex-start;
            flex-direction: column;
            gap: 9px;
          }

          .skills-design-label {
            font-size: 8px;
            line-height: 1.6;
          }

          .skills-design-index {
            font-size: 8px;
          }

          .skills-design-content h3 {
            margin-top: 15px;
            font-size: clamp(27px, 7.5vw, 36px);
            line-height: 1.17;
          }

          .skills-design-content > p {
            margin-top: 13px;
            font-size: 11px;
            line-height: 1.9;
          }

          .skills-design-tags {
            gap: 7px;
            margin-top: 18px;
          }

          .skills-design-tags > span {
            gap: 6px;
            padding: 8px 9px;
            font-size: 9px;
          }

          .skills-design-tags > span svg {
            width: 13px;
            height: 13px;
          }

          .skills-design-side {
            align-items: center;
            flex-direction: row;
            gap: 10px;
            padding-top: 3px;
            font-size: 8px;
          }

          .skills-design-decoration {
            top: auto;
            right: -95px;
            bottom: -110px;
            width: 200px;
            height: 200px;
          }

          .skills-footer {
            flex-wrap: wrap;
            gap: 14px;
            margin-top: 23px;
            padding-top: 18px;
          }

          .skills-footer-left {
            flex: 1;
            min-width: 180px;
          }

          .skills-footer p {
            font-size: 10px;
          }

          .skills-footer-center {
            display: none;
          }

          .skills-footer-index {
            font-size: 8px;
          }
        }

        /* Very small phones */

        @media (max-width: 360px) {
          .skills-container {
            width: calc(100% - 28px);
          }

          .skills-title {
            font-size: 41px;
          }

          .skills-capabilities-grid {
            gap: 7px;
          }

          .skill-capability-item {
            padding: 12px 9px;
          }

          .skills-design-card {
            padding: 20px 14px;
          }

          .skills-design-tags > span {
            font-size: 8px;
          }
        }

        /* Accessibility */

        @media (prefers-reduced-motion: reduce) {
          .skills-section *,
          .skills-section *::before,
          .skills-section *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
            transition-delay: 0ms !important;
          }

          .skills-section .reveal-item {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}