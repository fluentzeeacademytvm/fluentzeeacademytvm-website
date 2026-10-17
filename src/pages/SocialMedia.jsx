import React, { useState } from "react";
import { ArrowUpRight, Instagram, Link2, MessageCircle, Share2 } from "lucide-react";

export default function SocialMedia() {
  const [copyMessage, setCopyMessage] = useState("");
  const pageUrl = typeof window === "undefined" ? "" : window.location.href.split("#")[0];
  const encodedUrl = encodeURIComponent(pageUrl);
  const shareText = encodeURIComponent("Discover FluentZee Academy and grow your English confidence.");

  const shareLinks = [
    {
      name: "WhatsApp",
      mark: <MessageCircle size={20} />,
      className: "social-mark-whatsapp",
      href: `https://wa.me/?text=${shareText}%20${encodedUrl}`
    },
    {
      name: "Facebook",
      mark: <span aria-hidden="true">f</span>,
      className: "social-mark-facebook",
      href: `https://www.facebook.com/people/FluentZee/61595697472057`
    },
    {
      name: "Instagram",
      mark: <Instagram size={20}/>,
      className: "social-mark-instagram",
      href: `https://www.instagram.com/fluentzee_?rpxt=MWlsM2pzbzQwemVpMg%3D%3D`
    }
  ];

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      setCopyMessage("Link copied—share it with someone who’s learning English.");
    } catch {
      setCopyMessage("Copy isn’t available here. Choose one of the share buttons instead.");
    }
  };

  return (
    <section className="social-section section-pad" id="share">
      <div className="social-letter-cloud" aria-hidden="true">
        <span className="social-letter social-letter-one">A</span>
        <span className="social-letter social-letter-two">e</span>
        <span className="social-letter social-letter-three">Z</span>
        <span className="social-letter social-letter-four">F</span>
      </div>
      <div className="section-wrap social-layout">
        <div>
          <div className="section-kicker"><Share2 size={14} /> SPREAD THE WORD</div>
          <h2>Help someone find<br /><span>their voice.</span></h2>
          <p>Know someone working on their English? Share FluentZee Academy with them.</p>
        </div>
        <div className="social-share-card">
          <strong>Share FluentZee Academy</strong>
          <div className="social-share-actions">
            {shareLinks.map(({ name, mark, className, href }) => (
              <a className="social-share-link" href={href} key={name} target="_blank" rel="noreferrer" aria-label={`Share FluentZee Academy on ${name}`}>
                <span className={`social-mark ${className}`}>{mark}</span>
                <span>{name}</span>
                <ArrowUpRight size={15} />
              </a>
            ))}
            <button className="social-share-link social-copy-button" type="button" onClick={copyLink}>
              <span className="social-mark social-mark-copy"><Link2 size={18} /></span>
              <span>Copy link</span>
              <ArrowUpRight size={15} />
            </button>
          </div>
          <p className="social-copy-feedback" aria-live="polite">{copyMessage || "Choose a platform or copy the page link."}</p>
        </div>
      </div>
    </section>
  );
}
