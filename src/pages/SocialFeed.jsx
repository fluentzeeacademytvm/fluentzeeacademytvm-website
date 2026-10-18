import React, { useEffect, useState } from "react";
import { ArrowUpRight, Facebook, Instagram, LoaderCircle, MessageCircle } from "lucide-react";

const FACEBOOK_PAGE_URL = "https://www.facebook.com/people/FluentZee/61595697472057";
const INSTAGRAM_PROFILE_URL = "https://www.instagram.com/fluentzee_/";

export default function SocialFeed() {
  const [instagramPosts, setInstagramPosts] = useState([]);
  const [instagramCursor, setInstagramCursor] = useState(null);
  const [instagramHasMore, setInstagramHasMore] = useState(false);
  const [instagramStatus, setInstagramStatus] = useState("loading");
  const [instagramError, setInstagramError] = useState("");
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const loadInstagramPosts = async () => {
      try {
        const response = await fetch("/api/instagram", { signal: controller.signal });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Could not load Instagram posts.");

        setInstagramPosts(Array.isArray(result.posts) ? result.posts : []);
        setInstagramCursor(result.nextCursor || null);
        setInstagramHasMore(Boolean(result.hasMore));
        setInstagramStatus("ready");
      } catch (error) {
        if (error.name === "AbortError") return;
        setInstagramError(error.message || "Could not load Instagram posts.");
        setInstagramStatus("error");
      }
    };

    loadInstagramPosts();
    return () => controller.abort();
  }, []);

  const loadMoreInstagramPosts = async () => {
    if (!instagramCursor || loadingMore) return;
    setLoadingMore(true);
    setInstagramError("");

    try {
      const response = await fetch(`/api/instagram?after=${encodeURIComponent(instagramCursor)}`);
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not load more Instagram posts.");

      setInstagramPosts((posts) => [...posts, ...(Array.isArray(result.posts) ? result.posts : [])]);
      setInstagramCursor(result.nextCursor || null);
      setInstagramHasMore(Boolean(result.hasMore));
    } catch (error) {
      setInstagramError(error.message || "Could not load more Instagram posts.");
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <section className="social-feed-section section-pad" id="social-posts">
      <div className="social-feed-decoration" aria-hidden="true">
        <span className="social-feed-decoration-two">e</span>
      </div>
      <div className="section-wrap">
        <div className="section-kicker">FROM OUR SOCIALS</div>
        <div className="social-feed-heading">
          <div>
            <h2>More ways to <span>stay connected.</span></h2>
            <p>Find us on Facebook and Instagram for academy news, community stories, and updates.</p>
          </div>
          <a className="text-link" href={INSTAGRAM_PROFILE_URL} target="_blank" rel="noreferrer">
            Follow on Instagram <ArrowUpRight size={16} />
          </a>
        </div>

        <div className="social-feed-grid">
          <article className="social-feed-card">
            <div className="social-feed-card-heading">
              <span className="social-feed-brand social-feed-facebook"><Facebook size={20} /></span>
              <span><strong>FluentZee on Facebook</strong><small>Official page</small></span>
              <a href={FACEBOOK_PAGE_URL} target="_blank" rel="noreferrer" aria-label="Open FluentZee on Facebook"><ArrowUpRight size={17} /></a>
            </div>

            <a
              className="social-profile-preview social-profile-facebook-preview"
              href={FACEBOOK_PAGE_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Open FluentZee Facebook page"
            >
              <span className="social-profile-avatar"><Facebook size={36} aria-hidden="true" /></span>
              <strong>FluentZee on Facebook</strong>
              <span>Official page</span>
              <p>Follow the latest updates, community stories, and upcoming events.</p>
              <span className="button">Open Facebook page</span>
            </a>
          </article>

          <article className="social-feed-card">
            <div className="social-feed-card-heading">
              <span className="social-feed-brand social-feed-instagram"><Instagram size={20} /></span>
              <span><strong>FluentZee on Instagram</strong><small>Official profile</small></span>
              <a href={INSTAGRAM_PROFILE_URL} target="_blank" rel="noreferrer" aria-label="Open FluentZee on Instagram"><ArrowUpRight size={17} /></a>
            </div>
            {instagramStatus === "loading" && (
              <div className="instagram-feed-message" role="status">
                <LoaderCircle size={22} className="instagram-feed-spinner" />
                <span>Loading the latest posts…</span>
              </div>
            )}
            {instagramStatus === "error" && (
              <div className="instagram-feed-message instagram-feed-error" role="status">
                <Instagram size={24} />
                <strong>Instagram posts aren’t available right now.</strong>
                <span>{instagramError}</span>
                <a href={INSTAGRAM_PROFILE_URL} target="_blank" rel="noreferrer">Visit the Instagram profile <ArrowUpRight size={14} /></a>
              </div>
            )}
            {instagramStatus === "ready" && instagramPosts.length === 0 && (
              <div className="instagram-feed-message">
                <Instagram size={24} />
                <strong>No posts to show yet.</strong>
                <a href={INSTAGRAM_PROFILE_URL} target="_blank" rel="noreferrer">Visit the Instagram profile <ArrowUpRight size={14} /></a>
              </div>
            )}
            {instagramPosts.length > 0 && (
              <>
                <div className="instagram-post-grid">
                  {instagramPosts.map((post) => {
                    const preview = post.media_type === "VIDEO"
                      ? post.thumbnail_url || post.media_url
                      : post.children?.data?.[0]?.media_url || post.media_url || post.thumbnail_url;
                    const caption = post.caption?.trim() || "View this FluentZee Academy post on Instagram.";

                    return (
                      <a
                        className="instagram-post"
                        href={post.permalink || INSTAGRAM_PROFILE_URL}
                        key={post.id}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={caption}
                      >
                        {preview ? (
                          <img src={preview} alt={caption} loading="lazy" />
                        ) : (
                          <span className="instagram-post-placeholder"><Instagram size={28} /></span>
                        )}
                        <span className="instagram-post-overlay">
                          <span>{caption}</span>
                          <ArrowUpRight size={18} />
                        </span>
                        {post.media_type !== "IMAGE" && (
                          <span className="instagram-post-type">{post.media_type === "VIDEO" ? "VIDEO" : "ALBUM"}</span>
                        )}
                      </a>
                    );
                  })}
                </div>
                {instagramError && <p className="instagram-feed-inline-error" role="status">{instagramError}</p>}
                {instagramHasMore && (
                  <button className="instagram-load-more" type="button" onClick={loadMoreInstagramPosts} disabled={loadingMore}>
                    {loadingMore ? <><LoaderCircle size={15} className="instagram-feed-spinner" /> Loading…</> : <>Load more posts <ArrowUpRight size={15} /></>}
                  </button>
                )}
              </>
            )}
          </article>
        </div>
        <p className="social-feed-note"><MessageCircle size={14} /> Posts are loaded from FluentZee Academy’s official Instagram account. Select any post to view it on Instagram.</p>
      </div>
    </section>
  );
}
