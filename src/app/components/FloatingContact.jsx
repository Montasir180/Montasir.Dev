"use client";

import { useState } from "react";
import { Copy, Check, X, Mail, MessageCircle, ExternalLink } from "lucide-react";

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState("");

  // নিজের তথ্য এখানে বসাও
  const EMAIL = "montasir.dev@gmail.com";
  const WHATSAPP = "+8801616581120";

  const copyText = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(""), 1800);
    } catch {
      const input = document.createElement("textarea");
      input.value = text;
      input.style.position = "fixed";
      input.style.opacity = "0";
      document.body.appendChild(input);
      input.select();

      try {
        document.execCommand("copy");
        setCopied(type);
        setTimeout(() => setCopied(""), 1800);
      } finally {
        input.remove();
      }
    }
  };

  return (
    <>
      <div className="fc-widget">
        {/* CONTACT BUTTON */}
        <button
          type="button"
          className={`fc-trigger ${isOpen ? "fc-trigger-open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close contact menu" : "Open contact menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <X size={25} strokeWidth={1.8} />
          ) : (
            <span className="fc-dots">
              <span />
              <span />
              <span />
            </span>
          )}
        </button>

        {/* CONTACT MENU */}
        {isOpen && (
          <div className="fc-panel">
            <div className="fc-header">
              <div>
                <span className="fc-eyebrow">GET IN TOUCH</span>
                <h3>Let&apos;s Talk.</h3>
                <p>Choose your preferred way to contact me.</p>
              </div>

              <button
                type="button"
                className="fc-close"
                onClick={() => setIsOpen(false)}
                aria-label="Close contact menu"
              >
                <X size={17} />
              </button>
            </div>

            {/* GMAIL */}
            <div className="fc-contact-item">
              <div className="fc-contact-icon">
                <Mail size={19} />
              </div>

              <div className="fc-contact-info">
                <span>Email</span>
                <p title={EMAIL}>{EMAIL}</p>
              </div>

              <button
                type="button"
                className="fc-copy"
                onClick={() => copyText(EMAIL, "email")}
                aria-label="Copy email address"
                title="Copy email"
              >
                {copied === "email" ? (
                  <Check size={17} />
                ) : (
                  <Copy size={16} />
                )}
              </button>
            </div>

            <a
              className="fc-primary-link"
              href={`mailto:${EMAIL}`}
            >
              <Mail size={16} />
              Send an Email
              <ExternalLink size={14} />
            </a>

            {/* WHATSAPP */}
            <div className="fc-contact-item">
              <div className="fc-contact-icon fc-whatsapp-icon">
                <MessageCircle size={19} />
              </div>

              <div className="fc-contact-info">
                <span>WhatsApp</span>
                <p>+{WHATSAPP}</p>
              </div>

              <button
                type="button"
                className="fc-copy"
                onClick={() => copyText(`+${WHATSAPP}`, "phone")}
                aria-label="Copy WhatsApp number"
                title="Copy phone number"
              >
                {copied === "phone" ? (
                  <Check size={17} />
                ) : (
                  <Copy size={16} />
                )}
              </button>
            </div>

            <a
              className="fc-primary-link fc-whatsapp-link"
              href={`https://wa.me/${WHATSAPP}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={16} />
              Chat on WhatsApp
              <ExternalLink size={14} />
            </a>

            {copied && (
              <div className="fc-copy-message" role="status">
                <Check size={14} />
                {copied === "email"
                  ? "Email copied successfully!"
                  : "Phone number copied successfully!"}
              </div>
            )}

            <div className="fc-footer">
              <span className="fc-status-dot" />
              Available for conversations
            </div>
          </div>
        )}
      </div>

      <style >{`
        .fc-widget {
          position: fixed;
          right: 25px;
          bottom: 25px;
          z-index: 99999;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 15px;
          font-family: inherit;
        }

        /* SAME GENERAL SHAPE AS YOUR REFERENCE IMAGE */
        .fc-trigger {
          width: 80px;
          height: 80px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          border: 1.5px solid rgba(255, 255, 255, 0.82);
          border-radius: 50%;
          border-bottom-right-radius: 5px;
          background: linear-gradient(
            145deg,
            rgba(135, 135, 135, 0.96),
            rgba(78, 78, 78, 0.96)
          );
          color: #171717;
          cursor: pointer;
          box-shadow:
            inset 0 1px 1px rgba(255, 255, 255, 0.3),
            0 5px 20px rgba(0, 0, 0, 0.12);
          transition:
            transform 250ms ease,
            border-radius 250ms ease,
            background 250ms ease;
          -webkit-tap-highlight-color: transparent;
        }

        .fc-trigger:hover {
          transform: translateY(-3px);
        }

        .fc-trigger-open {
          border-radius: 50%;
        }

        .fc-dots {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
        }

        .fc-dots span {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #171717;
          animation: fc-typing 1s ease-in-out infinite;
        }

        .fc-dots span:nth-child(2) {
          animation-delay: 0.15s;
        }

        .fc-dots span:nth-child(3) {
          animation-delay: 0.3s;
        }

        /* CONTACT PANEL */
        .fc-panel {
          width: 330px;
          max-width: calc(100vw - 32px);
          padding: 21px;
          color: #21201e;
          background: #f2f0e8;
          border: 1px solid rgba(33, 32, 30, 0.12);
          border-radius: 20px;
          box-shadow: 0 16px 55px rgba(0, 0, 0, 0.18);
          animation: fc-panel-enter 220ms ease both;
          overflow-wrap: anywhere;
        }

        .fc-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 22px;
        }

        .fc-eyebrow {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 2.5px;
          opacity: 0.55;
        }

        .fc-header h3 {
          margin: 7px 0 5px;
          font-size: 27px;
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -1.2px;
        }

        .fc-header p {
          margin: 0;
          font-size: 11px;
          line-height: 1.6;
          opacity: 0.65;
        }

        .fc-close {
          width: 32px;
          height: 32px;
          flex-shrink: 0;
          display: grid;
          place-items: center;
          border: 1px solid rgba(33, 32, 30, 0.12);
          border-radius: 50%;
          background: transparent;
          color: inherit;
          cursor: pointer;
        }

        .fc-contact-item {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 0;
          padding: 12px 0;
          border-top: 1px solid rgba(33, 32, 30, 0.1);
        }

        .fc-contact-icon {
          width: 38px;
          height: 38px;
          flex-shrink: 0;
          display: grid;
          place-items: center;
          border-radius: 12px;
          background: #21201e;
          color: #f2f0e8;
        }

        .fc-whatsapp-icon {
          background: #d9e8c6;
          color: #263c1c;
        }

        .fc-contact-info {
          flex: 1;
          min-width: 0;
        }

        .fc-contact-info > span {
          display: block;
          margin-bottom: 4px;
          font-size: 11px;
          font-weight: 700;
        }

        .fc-contact-info p {
          margin: 0;
          font-size: 11px;
          opacity: 0.65;
          overflow-wrap: anywhere;
        }

        .fc-copy {
          width: 36px;
          height: 36px;
          flex-shrink: 0;
          display: grid;
          place-items: center;
          border: 1px solid rgba(33, 32, 30, 0.13);
          border-radius: 10px;
          background: transparent;
          color: #21201e;
          cursor: pointer;
          transition:
            background 180ms ease,
            color 180ms ease;
        }

        .fc-copy:hover {
          background: #21201e;
          color: #f2f0e8;
        }

        .fc-primary-link {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          min-height: 42px;
          margin: 2px 0 14px;
          padding: 10px 12px;
          border-radius: 11px;
          background: #21201e;
          color: #f2f0e8;
          font-size: 11px;
          font-weight: 650;
          text-decoration: none;
          transition:
            transform 180ms ease,
            background 180ms ease;
        }

        .fc-primary-link svg:last-child {
          margin-left: auto;
          opacity: 0.7;
        }

        .fc-primary-link:hover {
          transform: translateY(-1px);
          background: #383732;
        }

        .fc-whatsapp-link {
          margin-bottom: 0;
          background: #d9e8c6;
          color: #263c1c;
        }

        .fc-whatsapp-link:hover {
          background: #c8ddb0;
        }

        .fc-copy-message {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 13px;
          font-size: 11px;
          color: #42652b;
        }

        .fc-footer {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          margin-top: 19px;
          padding-top: 14px;
          border-top: 1px solid rgba(33, 32, 30, 0.1);
          font-size: 10px;
          opacity: 0.65;
        }

        .fc-status-dot {
          width: 7px;
          height: 7px;
          flex-shrink: 0;
          border-radius: 50%;
          background: #6c9a44;
        }

        @keyframes fc-typing {
          0%,
          60%,
          100% {
            transform: translateY(0);
          }

          30% {
            transform: translateY(-6px);
          }
        }

        @keyframes fc-panel-enter {
          from {
            opacity: 0;
            transform: translateY(9px) scale(0.98);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @media (max-width: 480px) {
          .fc-widget {
            right: 14px;
            bottom: 16px;
            gap: 12px;
          }

          .fc-trigger {
            width: 62px;
            height: 62px;
          }

          .fc-dots {
            gap: 7px;
          }

          .fc-dots span {
            width: 8px;
            height: 8px;
          }

          .fc-panel {
            width: 310px;
            padding: 17px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .fc-dots span {
            animation: none;
          }

          .fc-panel {
            animation: none;
          }

          .fc-trigger,
          .fc-primary-link,
          .fc-copy {
            transition: none;
          }
        }
      `}</style>
    </>
  );
}