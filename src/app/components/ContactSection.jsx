"use client";

import { useEffect, useRef, useState } from "react";

import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  Copy,
  Mail,
  MessageCircle,
  Send,
  Sparkles,
  ExternalLink,
} from "lucide-react";

import { FaGithub, FaLinkedinIn } from "react-icons/fa";

const CONTACT = {
  email: "montasir.dev@gmail.com",
  whatsapp: "8801616581120",
  github: "https://github.com/Montasir180",
  linkedin: "https://www.linkedin.com/",
};

const INITIAL_FORM = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);

  const sectionRef = useRef(null);

  // Reveal elements when they enter the viewport.
  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const elements = section.querySelectorAll(
      ".contact-reveal"
    );

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => {
        element.classList.add("contact-visible");
      });

      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("contact-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px",
      }
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Copy email.
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      window.location.href = `mailto:${CONTACT.email}`;
    }
  }

  // Update form fields.
  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  }

  // Validate form.
  function validateForm() {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email.trim()
      )
    ) {
      newErrors.email = "Please enter a valid email.";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Please enter a subject.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please write a message.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  // Submit through the visitor's email application.
  function handleSubmit(event) {
    event.preventDefault();

    if (sending || !validateForm()) return;

    setSending(true);

    const subject = encodeURIComponent(
      formData.subject.trim()
    );

    const body = encodeURIComponent(
      `Name: ${formData.name.trim()}\n` +
        `Email: ${formData.email.trim()}\n\n` +
        `Message:\n${formData.message.trim()}`
    );

    const mailtoURL =
      `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;

    window.location.href = mailtoURL;

    window.setTimeout(() => {
      setSending(false);
    }, 1000);
  }

  return (
    <section
      id="contact"
      className="contact-section"
      ref={sectionRef}
    >
      {/* Animated background */}

      <div
        className="contact-background"
        aria-hidden="true"
      >
        <div className="contact-orb contact-orb-one" />
        <div className="contact-orb contact-orb-two" />

        <div className="contact-grid-pattern" />

        <div className="contact-background-ring contact-ring-one" />
        <div className="contact-background-ring contact-ring-two" />
      </div>

      <div className="contact-container">
        {/* HEADER */}

        <header className="contact-header contact-reveal">
          <div className="contact-eyebrow">
            <span className="contact-eyebrow-dot" />

            <span>CONTACT / COLLABORATION</span>

            <span className="contact-eyebrow-line" />
          </div>

          <h2 className="contact-heading">
            <span className="contact-heading-line">
              Have an idea?
            </span>

            <span className="contact-heading-line contact-heading-accent">
              Let&apos;s make it real.
            </span>
          </h2>

          <p className="contact-header-description">
            Have a project in mind, need a developer, or
            just want to connect? My inbox is always open.
          </p>

          <div className="contact-header-decoration">
            <span />
            <span />
            <span />
          </div>
        </header>

        {/* MAIN CONTENT */}

        <div className="contact-layout">
          {/* LEFT CONTACT CARD */}

          <div className="contact-info contact-reveal">
            <div className="contact-card-glow" />

            <div className="contact-info-top">
              <div className="contact-availability">
                <span className="contact-live-dot" />

                <span>OPEN TO OPPORTUNITIES</span>
              </div>

              <div
                className="contact-decoration"
                aria-hidden="true"
              >
                <Sparkles size={21} strokeWidth={1.5} />
              </div>
            </div>

            <div className="contact-info-content">
              <span className="contact-mini-label">
                LET&apos;S CONNECT
              </span>

              <h3 className="contact-info-heading">
                Let&apos;s build
                <br />
                something
                <br />
                <span>meaningful.</span>
              </h3>

              <p className="contact-info-description">
                I enjoy building web experiences, solving
                problems, and collaborating on ideas that
                make a difference.
              </p>
            </div>

            {/* EMAIL */}

            <div className="contact-method">
              <div className="contact-method-icon">
                <Mail size={19} />
              </div>

              <div className="contact-method-content">
                <span className="contact-method-label">
                  EMAIL ME
                </span>

                <a href={`mailto:${CONTACT.email}`}>
                  {CONTACT.email}
                </a>
              </div>

              <button
                type="button"
                className={`contact-copy-button ${
                  copied ? "contact-copied" : ""
                }`}
                onClick={copyEmail}
                aria-label="Copy email address"
                title={copied ? "Copied!" : "Copy email"}
              >
                {copied ? (
                  <Check size={17} />
                ) : (
                  <Copy size={16} />
                )}
              </button>
            </div>

            {/* WHATSAPP */}

            <a
              href={`https://wa.me/${CONTACT.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-method contact-method-link"
            >
              <div className="contact-method-icon">
                <MessageCircle size={19} />
              </div>

              <div className="contact-method-content">
                <span className="contact-method-label">
                  WHATSAPP
                </span>

                <span>+880 1616-581120</span>
              </div>

              <ArrowUpRight
                size={18}
                className="contact-method-arrow"
              />
            </a>

            {/* SOCIAL LINKS */}

            <div className="contact-socials">
              <span className="contact-socials-label">
                FIND ME ELSEWHERE
              </span>

              <div className="contact-social-links">
                <a
                  href={CONTACT.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-social-link"
                  aria-label="Visit GitHub profile"
                >
                  <FaGithub size={17} />

                  <span>GitHub</span>

                  <ArrowUpRight size={13} />
                </a>

                <a
                  href={CONTACT.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-social-link"
                  aria-label="Visit LinkedIn profile"
                >
                  <FaLinkedinIn size={16} />

                  <span>LinkedIn</span>

                  <ArrowUpRight size={13} />
                </a>

                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-social-link"
                  aria-label="Contact through Gmail"
                >
                  <Mail size={16} />

                  <span>Gmail</span>

                  <ArrowUpRight size={13} />
                </a>
              </div>
            </div>

            <span className="contact-card-index">
              01 / CONNECT
            </span>
          </div>

          {/* RIGHT CONTACT FORM */}

          <div className="contact-form-card contact-reveal">
            <div className="contact-form-card-glow" />

            <div className="contact-form-header">
              <div>
                <span className="contact-form-eyebrow">
                  START A CONVERSATION
                </span>

                <h3>Send me a message.</h3>

                <p className="contact-form-subtitle">
                  Tell me what you have in mind.
                </p>
              </div>

              <div className="contact-form-icon">
                <Send size={21} />
              </div>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              {/* NAME + EMAIL */}

              <div className="contact-form-grid">
                <div className="contact-field">
                  <label htmlFor="contact-name">
                    YOUR NAME
                  </label>

                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={
                      errors.name
                        ? "contact-name-error"
                        : undefined
                    }
                  />

                  {errors.name && (
                    <span
                      id="contact-name-error"
                      className="contact-error"
                    >
                      {errors.name}
                    </span>
                  )}
                </div>

                <div className="contact-field">
                  <label htmlFor="contact-email">
                    YOUR EMAIL
                  </label>

                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={
                      errors.email
                        ? "contact-email-error"
                        : undefined
                    }
                  />

                  {errors.email && (
                    <span
                      id="contact-email-error"
                      className="contact-error"
                    >
                      {errors.email}
                    </span>
                  )}
                </div>
              </div>

              {/* SUBJECT */}

              <div className="contact-field">
                <label htmlFor="contact-subject">
                  SUBJECT
                </label>

                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  placeholder="What would you like to discuss?"
                  value={formData.subject}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.subject)}
                  aria-describedby={
                    errors.subject
                      ? "contact-subject-error"
                      : undefined
                  }
                />

                {errors.subject && (
                  <span
                    id="contact-subject-error"
                    className="contact-error"
                  >
                    {errors.subject}
                  </span>
                )}
              </div>

              {/* MESSAGE */}

              <div className="contact-field">
                <label htmlFor="contact-message">
                  YOUR MESSAGE
                </label>

                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  placeholder="Tell me a little about your idea..."
                  value={formData.message}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={
                    errors.message
                      ? "contact-message-error"
                      : undefined
                  }
                />

                {errors.message && (
                  <span
                    id="contact-message-error"
                    className="contact-error"
                  >
                    {errors.message}
                  </span>
                )}
              </div>

              {/* SUBMIT BUTTON */}

              <button
                type="submit"
                className="contact-submit"
                disabled={sending}
              >
                <span className="contact-submit-text">
                  {sending
                    ? "Opening email..."
                    : "Let's Talk"}
                </span>

                <span className="contact-submit-icon">
                  <ArrowUpRight size={19} />
                </span>

                <span
                  className="contact-submit-shine"
                  aria-hidden="true"
                />
              </button>

              <p className="contact-form-note">
                Your message will open in your default
                email application.
              </p>
            </form>

            <span className="contact-form-index">
              02 / SAY HELLO
            </span>
          </div>
        </div>

        {/* BOTTOM BAR */}

        <div className="contact-bottom contact-reveal">
          <div className="contact-bottom-left">
            <span className="contact-bottom-dot" />

            <span>
              Have a good idea? Let&apos;s talk.
            </span>
          </div>

          <a
            href={`mailto:${CONTACT.email}`}
            className="contact-bottom-link"
          >
            Get in touch

            <ArrowDownRight size={17} />
          </a>
        </div>

        {/* FOOTER SIGNATURE */}

        <div className="contact-signature contact-reveal">
          <span>DESIGNED WITH INTENTION.</span>

          <span className="contact-signature-center">
            <span />
            MONTASIR ISLAM
            <span />
          </span>

          <span>BUILT TO CONNECT.</span>
        </div>
      </div>

      {/* COMPONENT CSS */}

      <style>{`
        /* =========================================
           CONTACT SECTION
        ========================================= */

        .contact-section {
          --contact-bg: #efeeeb;
          --contact-blue: #2845e8;
          --contact-ink: #171717;
          --contact-muted: #777771;
          --contact-border: rgba(23, 23, 23, 0.12);

          position: relative;
          isolation: isolate;
          overflow: hidden;
          padding: 110px 0 35px;
          background: var(--contact-bg);
          color: var(--contact-ink);
          font-family: inherit;
        }

        .contact-section *,
        .contact-section *::before,
        .contact-section *::after {
          box-sizing: border-box;
        }

        .contact-container {
          position: relative;
          z-index: 2;
          width: min(1180px, calc(100% - 64px));
          margin: 0 auto;
        }

        /* =========================================
           ANIMATED BACKGROUND
        ========================================= */

        .contact-background {
          position: absolute;
          inset: 0;
          z-index: -1;
          overflow: hidden;
          pointer-events: none;
        }

        .contact-orb {
          position: absolute;
          width: 360px;
          aspect-ratio: 1;
          border-radius: 50%;
          background: rgba(40, 69, 232, 0.045);
          filter: blur(65px);
          will-change: transform;
        }

        .contact-orb-one {
          top: 2%;
          right: -170px;
          animation: contact-orb-float 13s ease-in-out infinite;
        }

        .contact-orb-two {
          bottom: 4%;
          left: -190px;
          animation: contact-orb-float 16s ease-in-out infinite reverse;
        }

        .contact-grid-pattern {
          position: absolute;
          inset: 0;
          opacity: 0.15;
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
          background-size: 48px 48px;
          mask-image: linear-gradient(
            to bottom,
            transparent,
            black 15%,
            black 80%,
            transparent
          );
        }

        .contact-background-ring {
          position: absolute;
          width: 480px;
          aspect-ratio: 1;
          border: 1px solid rgba(40, 69, 232, 0.07);
          border-radius: 50%;
        }

        .contact-ring-one {
          top: -270px;
          left: 12%;
          animation: contact-ring-rotate 35s linear infinite;
        }

        .contact-ring-two {
          right: -300px;
          bottom: -320px;
          width: 600px;
          animation: contact-ring-rotate 45s linear infinite reverse;
        }

        /* =========================================
           SCROLL REVEAL
        ========================================= */

        .contact-reveal {
          opacity: 0;
          transform: translate3d(0, 35px, 0);
          transition:
            opacity 900ms cubic-bezier(0.16, 1, 0.3, 1),
            transform 900ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .contact-reveal.contact-visible {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }

        .contact-layout .contact-reveal:nth-child(2) {
          transition-delay: 140ms;
        }

        .contact-bottom.contact-reveal {
          transition-delay: 100ms;
        }

        .contact-signature.contact-reveal {
          transition-delay: 160ms;
        }

        /* =========================================
           HEADER
        ========================================= */

        .contact-header {
          position: relative;
          margin-bottom: 60px;
        }

        .contact-eyebrow {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 25px;
          color: var(--contact-muted);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.17em;
        }

        .contact-eyebrow-dot {
          width: 8px;
          height: 8px;
          flex-shrink: 0;
          border-radius: 50%;
          background: var(--contact-blue);
          box-shadow: 0 0 0 4px rgba(40, 69, 232, 0.1);
          animation: contact-dot-pulse 2s ease-in-out infinite;
        }

        .contact-eyebrow-line {
          display: block;
          width: 45px;
          height: 1px;
          background: var(--contact-blue);
          transform-origin: left;
          animation: contact-line-grow 1.2s 0.3s both;
        }

        .contact-heading {
          margin: 0;
          font-size: clamp(45px, 6.5vw, 79px);
          font-weight: 650;
          line-height: 1.03;
          letter-spacing: -0.075em;
        }

        .contact-heading-line {
          display: block;
          width: fit-content;
          max-width: 100%;
          animation: contact-title-enter 1s both;
        }

        .contact-heading-line:nth-child(2) {
          color: var(--contact-blue);
          animation-delay: 130ms;
        }

        .contact-heading-accent {
          position: relative;
        }

        .contact-heading-accent::after {
          position: absolute;
          right: 0;
          bottom: -8px;
          left: 0;
          height: 2px;
          background: var(--contact-blue);
          content: "";
          transform: scaleX(0);
          transform-origin: left;
          animation: contact-underline 1.1s 0.75s forwards;
        }

        .contact-header-description {
          max-width: 510px;
          margin: 26px 0 0;
          color: var(--contact-muted);
          font-size: 14px;
          line-height: 1.9;
          animation: contact-fade-up 900ms 350ms both;
        }

        .contact-header-decoration {
          display: flex;
          align-items: center;
          gap: 5px;
          margin-top: 24px;
        }

        .contact-header-decoration span {
          display: block;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--contact-blue);
          animation: contact-decoration-bounce 1.4s ease-in-out infinite;
        }

        .contact-header-decoration span:nth-child(2) {
          animation-delay: 150ms;
        }

        .contact-header-decoration span:nth-child(3) {
          animation-delay: 300ms;
        }

        /* =========================================
           MAIN GRID
        ========================================= */

        .contact-layout {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          align-items: stretch;
          gap: 28px;
        }

        /* =========================================
           SHARED CARD EFFECTS
        ========================================= */

        .contact-info,
        .contact-form-card {
          position: relative;
          min-width: 0;
          overflow: hidden;
          border: 1px solid var(--contact-border);
          border-radius: 20px;
          isolation: isolate;
          transition:
            border-color 450ms ease,
            box-shadow 450ms ease,
            transform 450ms cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .contact-info::before,
        .contact-form-card::before {
          position: absolute;
          z-index: -1;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.75),
            rgba(255, 255, 255, 0.15) 60%,
            rgba(40, 69, 232, 0.035)
          );
          content: "";
          pointer-events: none;
        }

        .contact-info::after,
        .contact-form-card::after {
          position: absolute;
          top: 0;
          left: -120%;
          width: 70%;
          height: 100%;
          background: linear-gradient(
            100deg,
            transparent,
            rgba(255, 255, 255, 0.38),
            transparent
          );
          content: "";
          pointer-events: none;
          transition: left 850ms cubic-bezier(0.2, 0.7, 0.3, 1);
        }

        .contact-info:hover::after,
        .contact-form-card:hover::after {
          left: 150%;
        }

        .contact-info:hover,
        .contact-form-card:hover {
          transform: translateY(-5px);
          border-color: rgba(40, 69, 232, 0.27);
          box-shadow:
            0 25px 65px rgba(23, 23, 23, 0.055),
            0 0 0 1px rgba(40, 69, 232, 0.035);
        }

        .contact-card-glow,
        .contact-form-card-glow {
          position: absolute;
          top: -100px;
          right: -100px;
          width: 240px;
          aspect-ratio: 1;
          border-radius: 50%;
          background: rgba(40, 69, 232, 0.07);
          filter: blur(60px);
          pointer-events: none;
          transition:
            transform 700ms ease,
            opacity 700ms ease;
        }

        .contact-info:hover .contact-card-glow,
        .contact-form-card:hover .contact-form-card-glow {
          transform: scale(1.45);
        }

        /* =========================================
           LEFT CARD
        ========================================= */

        .contact-info {
          display: flex;
          flex-direction: column;
          padding: 31px;
          background: rgba(255, 255, 255, 0.4);
        }

        .contact-info-top {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .contact-availability {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          color: #55554f;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.1em;
        }

        .contact-live-dot {
          position: relative;
          width: 7px;
          height: 7px;
          flex-shrink: 0;
          border-radius: 50%;
          background: #3a9c65;
          box-shadow: 0 0 0 4px rgba(58, 156, 101, 0.1);
          animation: contact-dot-pulse 2s ease-in-out infinite;
        }

        .contact-decoration {
          display: grid;
          width: 44px;
          height: 44px;
          flex-shrink: 0;
          place-items: center;
          border: 1px solid var(--contact-border);
          border-radius: 13px;
          background: rgba(255, 255, 255, 0.45);
          color: var(--contact-blue);
          animation: contact-icon-float 4s ease-in-out infinite;
          transition:
            color 300ms ease,
            background 300ms ease,
            border-color 300ms ease,
            transform 450ms cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .contact-decoration:hover {
          transform: rotate(12deg) scale(1.08);
        }

        .contact-info:hover .contact-decoration {
          transform: rotate(12deg) scale(1.05);
          border-color: var(--contact-blue);
          background: var(--contact-blue);
          color: #fff;
        }

        .contact-info-content {
          position: relative;
          z-index: 1;
        }

        .contact-mini-label {
          display: inline-block;
          margin-top: 34px;
          color: var(--contact-muted);
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.17em;
        }

        .contact-info-heading {
          margin: 15px 0 0;
          font-size: clamp(34px, 3.5vw, 45px);
          font-weight: 650;
          line-height: 1.12;
          letter-spacing: -0.065em;
        }

        .contact-info-heading span {
          display: inline-block;
          color: var(--contact-blue);
          transition: letter-spacing 400ms ease;
        }

        .contact-info:hover .contact-info-heading span {
          letter-spacing: -0.035em;
        }

        .contact-info-description {
          max-width: 350px;
          margin: 19px 0 30px;
          color: var(--contact-muted);
          font-size: 12px;
          line-height: 1.9;
        }

        /* =========================================
           CONTACT METHODS
        ========================================= */

        .contact-method {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 13px;
          min-width: 0;
          padding: 17px 0;
          border-top: 1px solid var(--contact-border);
          color: inherit;
          text-decoration: none;
          transition:
            padding-left 300ms ease,
            border-color 300ms ease;
        }

        .contact-method:hover {
          padding-left: 5px;
          border-color: rgba(40, 69, 232, 0.25);
        }

        .contact-method-icon {
          display: grid;
          width: 43px;
          height: 43px;
          flex-shrink: 0;
          place-items: center;
          border: 1px solid var(--contact-border);
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.5);
          color: var(--contact-blue);
          transition:
            background 300ms ease,
            color 300ms ease,
            border-color 300ms ease,
            transform 350ms cubic-bezier(0.2, 0.8, 0.2, 1),
            box-shadow 300ms ease;
        }

        .contact-method:hover .contact-method-icon {
          transform: translateY(-3px) rotate(-5deg);
          border-color: var(--contact-blue);
          background: var(--contact-blue);
          color: white;
          box-shadow: 0 8px 20px rgba(40, 69, 232, 0.16);
        }

        .contact-method-content {
          display: flex;
          min-width: 0;
          flex: 1;
          flex-direction: column;
          gap: 7px;
        }

        .contact-method-label {
          color: var(--contact-muted);
          font-size: 8px;
          font-weight: 800;
          letter-spacing: 0.13em;
        }

        .contact-method-content > a,
        .contact-method-content > span:not(.contact-method-label) {
          overflow-wrap: anywhere;
          color: var(--contact-ink);
          font-size: 12px;
          font-weight: 600;
          text-decoration: none;
          transition: color 250ms ease;
        }

        .contact-method-content > a:hover {
          color: var(--contact-blue);
        }

        .contact-method-link {
          cursor: pointer;
        }

        .contact-method-arrow {
          flex-shrink: 0;
          color: var(--contact-muted);
          transition:
            color 250ms ease,
            transform 350ms cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .contact-method-link:hover .contact-method-arrow {
          transform: translate(4px, -4px);
          color: var(--contact-blue);
        }

        /* COPY BUTTON */

        .contact-copy-button {
          display: grid;
          width: 36px;
          height: 36px;
          flex-shrink: 0;
          place-items: center;
          border: 1px solid var(--contact-border);
          border-radius: 10px;
          background: transparent;
          color: var(--contact-muted);
          cursor: pointer;
          transition:
            background 250ms ease,
            color 250ms ease,
            border-color 250ms ease,
            transform 250ms ease;
        }

        .contact-copy-button:hover {
          transform: translateY(-2px) rotate(-5deg);
          border-color: var(--contact-blue);
          background: var(--contact-blue);
          color: #fff;
        }

        .contact-copy-button.contact-copied {
          border-color: var(--contact-blue);
          background: var(--contact-blue);
          color: white;
          animation: contact-copy-success 350ms ease;
        }

        /* =========================================
           SOCIAL LINKS
        ========================================= */

        .contact-socials {
          position: relative;
          z-index: 1;
          margin-top: auto;
          padding-top: 29px;
        }

        .contact-socials-label {
          color: var(--contact-muted);
          font-size: 8px;
          font-weight: 800;
          letter-spacing: 0.14em;
        }

        .contact-social-links {
          display: flex;
          flex-wrap: wrap;
          gap: 9px;
          margin-top: 14px;
        }

        .contact-social-link {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 11px 12px;
          border: 1px solid var(--contact-border);
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.45);
          color: #454540;
          font-size: 10px;
          font-weight: 650;
          text-decoration: none;
          transition:
            background 300ms ease,
            border-color 300ms ease,
            color 300ms ease,
            transform 350ms cubic-bezier(0.2, 0.8, 0.2, 1),
            box-shadow 300ms ease;
        }

        .contact-social-link:hover {
          transform: translateY(-4px);
          border-color: var(--contact-blue);
          background: var(--contact-blue);
          color: white;
          box-shadow: 0 8px 20px rgba(40, 69, 232, 0.14);
        }

        .contact-social-link svg {
          flex-shrink: 0;
          transition: transform 300ms ease;
        }

        .contact-social-link:hover svg:last-child {
          transform: translate(3px, -3px);
        }

        .contact-card-index,
        .contact-form-index {
          position: absolute;
          right: 18px;
          bottom: 12px;
          color: rgba(23, 23, 23, 0.28);
          font-size: 7px;
          font-weight: 800;
          letter-spacing: 0.13em;
          pointer-events: none;
        }

        /* =========================================
           FORM CARD
        ========================================= */

        .contact-form-card {
          padding: 32px;
          background: rgba(255, 255, 255, 0.6);
        }

        .contact-form-header {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          margin-bottom: 31px;
        }

        .contact-form-eyebrow {
          color: var(--contact-blue);
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.13em;
        }

        .contact-form-header h3 {
          margin: 12px 0 0;
          font-size: clamp(24px, 3vw, 31px);
          font-weight: 650;
          letter-spacing: -0.055em;
        }

        .contact-form-subtitle {
          margin: 8px 0 0;
          color: var(--contact-muted);
          font-size: 11px;
          line-height: 1.7;
        }

        .contact-form-icon {
          position: relative;
          display: grid;
          width: 49px;
          height: 49px;
          flex-shrink: 0;
          place-items: center;
          overflow: hidden;
          border: 1px solid var(--contact-blue);
          border-radius: 15px;
          background: var(--contact-blue);
          color: white;
          transform: rotate(-8deg);
          transition:
            transform 450ms cubic-bezier(0.2, 0.8, 0.2, 1),
            box-shadow 350ms ease;
          animation: contact-form-icon-float 4s ease-in-out infinite;
        }

        .contact-form-icon::before {
          position: absolute;
          top: -50%;
          left: -100%;
          width: 60%;
          height: 200%;
          background: rgba(255, 255, 255, 0.25);
          content: "";
          transform: rotate(25deg);
          animation: contact-icon-shine 4s ease-in-out infinite;
        }

        .contact-form-card:hover .contact-form-icon {
          transform: rotate(0deg) scale(1.07);
          box-shadow: 0 10px 25px rgba(40, 69, 232, 0.2);
        }

        .contact-form-icon svg {
          position: relative;
          z-index: 1;
          transition: transform 300ms ease;
        }

        .contact-form-card:hover .contact-form-icon svg {
          transform: translate(2px, -2px);
        }

        /* =========================================
           FORM FIELDS
        ========================================= */

        .contact-form-card form {
          position: relative;
          z-index: 1;
        }

        .contact-form-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
        }

        .contact-field {
          display: flex;
          min-width: 0;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 20px;
        }

        .contact-field label {
          color: #55554f;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.1em;
          transition: color 250ms ease;
        }

        .contact-field:focus-within label {
          color: var(--contact-blue);
        }

        .contact-field input,
        .contact-field textarea {
          display: block;
          box-sizing: border-box;
          width: 100%;
          min-width: 0;
          border: 1px solid rgba(23, 23, 23, 0.13);
          border-radius: 10px;
          outline: none;
          background: rgba(255, 255, 255, 0.7);
          color: var(--contact-ink);
          font-family: inherit;
          font-size: 12px;
          transition:
            border-color 300ms ease,
            box-shadow 300ms ease,
            background 300ms ease,
            transform 300ms ease;
        }

        .contact-field input {
          min-height: 48px;
          padding: 0 13px;
        }

        .contact-field textarea {
          min-height: 135px;
          padding: 14px 13px;
          resize: vertical;
          line-height: 1.8;
        }

        .contact-field input::placeholder,
        .contact-field textarea::placeholder {
          color: #aaa9a2;
          transition: opacity 250ms ease;
        }

        .contact-field input:focus::placeholder,
        .contact-field textarea:focus::placeholder {
          opacity: 0.55;
        }

        .contact-field input:focus,
        .contact-field textarea:focus {
          border-color: var(--contact-blue);
          background: #fff;
          box-shadow:
            0 0 0 3px rgba(40, 69, 232, 0.08),
            0 5px 18px rgba(40, 69, 232, 0.045);
          transform: translateY(-1px);
        }

        .contact-field input[aria-invalid="true"],
        .contact-field textarea[aria-invalid="true"] {
          border-color: #d43f3f;
        }

        .contact-error {
          color: #c33131;
          font-size: 10px;
          line-height: 1.5;
          animation: contact-error-enter 300ms ease both;
        }

        /* =========================================
           SUBMIT BUTTON
        ========================================= */

        .contact-submit {
          position: relative;
          display: flex;
          width: 100%;
          min-height: 56px;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          overflow: hidden;
          padding: 7px 8px 7px 19px;
          border: 1px solid var(--contact-blue);
          border-radius: 11px;
          background: var(--contact-blue);
          color: #fff;
          font-family: inherit;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          isolation: isolate;
          transition:
            transform 300ms cubic-bezier(0.2, 0.8, 0.2, 1),
            box-shadow 300ms ease,
            background 300ms ease;
        }

        .contact-submit:hover:not(:disabled) {
          transform: translateY(-3px);
          background: #203bd1;
          box-shadow: 0 12px 28px rgba(40, 69, 232, 0.2);
        }

        .contact-submit:active:not(:disabled) {
          transform: translateY(-1px) scale(0.995);
        }

        .contact-submit:focus-visible {
          outline: 3px solid rgba(40, 69, 232, 0.3);
          outline-offset: 4px;
        }

        .contact-submit:disabled {
          cursor: wait;
          opacity: 0.7;
        }

        .contact-submit-text,
        .contact-submit-icon {
          position: relative;
          z-index: 2;
        }

        .contact-submit-icon {
          display: grid;
          width: 40px;
          height: 40px;
          flex-shrink: 0;
          place-items: center;
          border-radius: 9px;
          background: #efeeeb;
          color: var(--contact-blue);
          transition:
            transform 400ms cubic-bezier(0.2, 0.8, 0.2, 1),
            border-radius 300ms ease;
        }

        .contact-submit:hover:not(:disabled) .contact-submit-icon {
          transform: rotate(45deg);
          border-radius: 50%;
        }

        .contact-submit-shine {
          position: absolute;
          z-index: 1;
          top: -100%;
          left: -50%;
          width: 35%;
          height: 300%;
          background: rgba(255, 255, 255, 0.15);
          transform: rotate(25deg);
          pointer-events: none;
        }

        .contact-submit:hover:not(:disabled) .contact-submit-shine {
          animation: contact-button-shine 750ms ease;
        }

        .contact-form-note {
          margin: 13px 0 0;
          color: var(--contact-muted);
          font-size: 10px;
          line-height: 1.7;
          text-align: center;
        }

        /* =========================================
           BOTTOM BAR
        ========================================= */

        .contact-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          margin-top: 70px;
          padding: 25px 0;
          border-top: 1px solid var(--contact-border);
          border-bottom: 1px solid var(--contact-border);
        }

        .contact-bottom-left {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--contact-muted);
          font-size: 11px;
        }

        .contact-bottom-dot {
          width: 7px;
          height: 7px;
          flex-shrink: 0;
          border-radius: 50%;
          background: var(--contact-blue);
          box-shadow: 0 0 0 4px rgba(40, 69, 232, 0.08);
          animation: contact-dot-pulse 2s ease-in-out infinite;
        }

        .contact-bottom-link {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          color: var(--contact-ink);
          font-size: 11px;
          font-weight: 700;
          text-decoration: none;
          transition:
            color 250ms ease,
            gap 250ms ease;
        }

        .contact-bottom-link:hover {
          gap: 14px;
          color: var(--contact-blue);
        }

        .contact-bottom-link svg {
          transition: transform 300ms ease;
        }

        .contact-bottom-link:hover svg {
          transform: translate(3px, 3px);
        }

        /* =========================================
           SIGNATURE
        ========================================= */

        .contact-signature {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          padding-top: 28px;
          color: var(--contact-muted);
          font-size: 8px;
          font-weight: 800;
          letter-spacing: 0.12em;
        }

        .contact-signature-center {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          color: var(--contact-ink);
          white-space: nowrap;
        }

        .contact-signature-center span {
          display: block;
          width: 15px;
          height: 1px;
          background: var(--contact-blue);
          transition: width 300ms ease;
        }

        .contact-signature:hover .contact-signature-center span {
          width: 25px;
        }

        /* =========================================
           KEYFRAMES
        ========================================= */

        @keyframes contact-title-enter {
          from {
            opacity: 0;
            transform: translate3d(0, 35px, 0);
            filter: blur(8px);
          }

          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
            filter: blur(0);
          }
        }

        @keyframes contact-fade-up {
          from {
            opacity: 0;
            transform: translateY(18px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes contact-underline {
          to {
            transform: scaleX(1);
          }
        }

        @keyframes contact-line-grow {
          from {
            transform: scaleX(0);
          }

          to {
            transform: scaleX(1);
          }
        }

        @keyframes contact-dot-pulse {
          0%,
          100% {
            box-shadow: 0 0 0 0 rgba(40, 69, 232, 0.15);
          }

          50% {
            box-shadow: 0 0 0 6px rgba(40, 69, 232, 0);
          }
        }

        @keyframes contact-decoration-bounce {
          0%,
          100% {
            transform: translateY(0);
            opacity: 0.5;
          }

          50% {
            transform: translateY(-5px);
            opacity: 1;
          }
        }

        @keyframes contact-orb-float {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }

          33% {
            transform: translate3d(-35px, 25px, 0) scale(1.08);
          }

          66% {
            transform: translate3d(25px, -20px, 0) scale(0.94);
          }
        }

        @keyframes contact-ring-rotate {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        @keyframes contact-icon-float {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes contact-form-icon-float {
          0%,
          100% {
            translate: 0 0;
          }

          50% {
            translate: 0 -4px;
          }
        }

        @keyframes contact-icon-shine {
          0%,
          65%,
          100% {
            left: -100%;
          }

          35% {
            left: 150%;
          }
        }

        @keyframes contact-button-shine {
          from {
            left: -50%;
          }

          to {
            left: 150%;
          }
        }

        @keyframes contact-copy-success {
          0% {
            transform: scale(0.85);
          }

          65% {
            transform: scale(1.12);
          }

          100% {
            transform: scale(1);
          }
        }

        @keyframes contact-error-enter {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* =========================================
           TABLET
        ========================================= */

        @media (max-width: 900px) {
          .contact-container {
            width: calc(100% - 48px);
          }

          .contact-layout {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .contact-info {
            min-height: auto;
          }

          .contact-info-heading {
            font-size: 43px;
          }

          .contact-socials {
            margin-top: 25px;
          }

          .contact-form-card {
            padding: 30px;
          }

          .contact-bottom {
            margin-top: 50px;
          }
        }

        /* =========================================
           MOBILE
        ========================================= */

        @media (max-width: 600px) {
          .contact-section {
            padding: 72px 0 28px;
          }

          .contact-container {
            width: calc(100% - 36px);
          }

          .contact-header {
            margin-bottom: 36px;
          }

          .contact-eyebrow {
            gap: 9px;
            margin-bottom: 20px;
            font-size: 8px;
          }

          .contact-eyebrow-line {
            width: 25px;
          }

          .contact-heading {
            font-size: clamp(36px, 9.2vw, 53px);
            letter-spacing: -0.065em;
          }

          .contact-heading-accent::after {
            bottom: -5px;
          }

          .contact-header-description {
            margin-top: 22px;
            font-size: 12px;
            line-height: 1.85;
          }

          .contact-layout {
            gap: 18px;
          }

          .contact-info,
          .contact-form-card {
            padding: 23px 18px;
            border-radius: 15px;
          }

          .contact-info-heading {
            margin-top: 13px;
            font-size: clamp(34px, 9vw, 40px);
          }

          .contact-mini-label {
            margin-top: 26px;
          }

          .contact-info-description {
            margin: 16px 0 23px;
            font-size: 12px;
          }

          .contact-decoration {
            width: 39px;
            height: 39px;
          }

          .contact-availability {
            font-size: 8px;
          }

          .contact-method {
            gap: 10px;
            padding: 15px 0;
          }

          .contact-method-icon {
            width: 38px;
            height: 38px;
            border-radius: 10px;
          }

          .contact-method-content > a,
          .contact-method-content > span:not(.contact-method-label) {
            font-size: 11px;
          }

          .contact-copy-button {
            width: 33px;
            height: 33px;
          }

          .contact-social-links {
            gap: 7px;
          }

          .contact-social-link {
            gap: 7px;
            padding: 10px;
            font-size: 10px;
          }

          .contact-form-header {
            gap: 10px;
            margin-bottom: 25px;
          }

          .contact-form-header h3 {
            font-size: 24px;
          }

          .contact-form-subtitle {
            font-size: 10px;
          }

          .contact-form-icon {
            width: 41px;
            height: 41px;
            border-radius: 12px;
          }

          .contact-form-grid {
            grid-template-columns: 1fr;
            gap: 0;
          }

          .contact-field {
            margin-bottom: 18px;
          }

          .contact-field input {
            min-height: 46px;
          }

          .contact-field textarea {
            min-height: 120px;
          }

          .contact-submit {
            min-height: 53px;
          }

          .contact-submit-icon {
            width: 37px;
            height: 37px;
          }

          .contact-bottom {
            align-items: flex-start;
            flex-direction: column;
            gap: 16px;
            margin-top: 38px;
            padding: 22px 0;
          }

          .contact-signature {
            flex-wrap: wrap;
            justify-content: center;
            gap: 14px;
            padding-top: 24px;
            font-size: 7px;
          }

          .contact-signature-center {
            order: -1;
            width: 100%;
          }

          .contact-orb {
            width: 240px;
            filter: blur(50px);
          }

          .contact-background-ring {
            width: 300px;
          }

          .contact-ring-one {
            top: -160px;
          }

          .contact-ring-two {
            right: -200px;
            bottom: -180px;
          }

          .contact-grid-pattern {
            background-size: 34px 34px;
          }

          .contact-card-index,
          .contact-form-index {
            right: 12px;
            bottom: 8px;
          }
        }

        /* =========================================
           SMALL MOBILE
        ========================================= */

        @media (max-width: 380px) {
          .contact-container {
            width: calc(100% - 28px);
          }

          .contact-heading {
            font-size: 34px;
          }

          .contact-info,
          .contact-form-card {
            padding: 20px 15px;
          }

          .contact-info-heading {
            font-size: 33px;
          }

          .contact-social-link {
            gap: 6px;
            padding: 9px 8px;
          }

          .contact-social-link svg {
            width: 14px;
            height: 14px;
          }

          .contact-signature {
            letter-spacing: 0.07em;
          }
        }

        /* =========================================
           ACCESSIBILITY
        ========================================= */

        @media (prefers-reduced-motion: reduce) {
          .contact-section *,
          .contact-section *::before,
          .contact-section *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }

          .contact-reveal {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}