import React from "react";
import { ArrowUpRight, Facebook, Instagram, MessageCircle } from "lucide-react";

const FACEBOOK_PAGE_URL = "https://www.facebook.com/people/FluentZee/61595697472057";
const FACEBOOK_PAGE_PLUGIN = `https://www.facebook.com/plugins/page.php?${new URLSearchParams({
  href: FACEBOOK_PAGE_URL,
  tabs: "timeline",
  width: "500",
  height: "560",
  small_header: "true",
  adapt_container_width: "true",
  hide_cover: "false",
  show_facepile: "false"
}).toString()}`;
const INSTAGRAM_PROFILE_URL = "https://www.instagram.com/fluentzee_?rpxt=MWlsM2pzbzQwemVpMg%3D%3D";

export default function SocialFeed() {
  return (
    <section className="social-feed-section section-pad" id="social-posts">
      <div className="section-wrap">
        <div className="section-kicker">FROM OUR SOCIALS</div>
        <div className="social-feed-heading">
          <div>
            <h2>More ways to <span>stay connected.</span></h2>
            <p>View our Facebook timeline and find the FluentZee Academy profile on Instagram.</p>
          </div>
          <a className="text-link" href={INSTAGRAM_PROFILE_URL} target="_blank" rel="noreferrer">
            Follow on Instagram <ArrowUpRight size={16} />
          </a>
        </div>

        <div className="social-feed-grid">
          <article className="social-feed-card">
            <div className="social-feed-card-heading">
              <span className="social-feed-brand social-feed-facebook"><Facebook size={20} /></span>
              <span><strong>FluentZee on Facebook</strong><small>Page timeline</small></span>
              <a href={FACEBOOK_PAGE_URL} target="_blank" rel="noreferrer" aria-label="Open FluentZee on Facebook"><ArrowUpRight size={17} /></a>
            </div>
            <iframe
              className="facebook-timeline"
              src={FACEBOOK_PAGE_URL}
              title="FluentZee Academy Facebook timeline"
              loading="lazy"
              scrolling="no"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              allowFullScreen
            />
          </article>

          <article className="social-feed-card">
            <div className="social-feed-card-heading">
              <span className="social-feed-brand social-feed-facebook"><Instagram size={20} /></span>
              <span><strong>FluentZee on Instagram</strong><small>Page timeline</small></span>
              <a href={INSTAGRAM_PROFILE_URL} target="_blank" rel="noreferrer" aria-label="Open FluentZee on Instagram"><ArrowUpRight size={17} /></a>
            </div>
            <iframe
              className="facebook-timeline"
              src={INSTAGRAM_PROFILE_URL}
              title="FluentZee Academy Instagram profile"
              loading="lazy"
              scrolling="no"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              allowFullScreen
            />
          </article>
        </div>
        <p className="social-feed-note"><MessageCircle size={14} /> Instagram does not allow profile pages to be embedded directly, so its profile card opens the official page.</p>
      </div>
    </section>
  );
}
