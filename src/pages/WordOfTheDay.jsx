import React from "react";
import { ArrowUpRight, BookOpen, Play, Sparkles } from "lucide-react";

const WORD_OF_THE_DAY_REEL = "https://www.instagram.com/reel/DeZZpXTSguN/embed";
const WORD_OF_THE_DAY_URL = "https://www.instagram.com/reel/DeZZpXTSguN/";

export default function WordOfTheDay() {
  return (
    <section className="word-of-day-section section-pad" id="word-of-the-day">
      <div className="section-wrap word-of-day-layout">
        <div className="word-of-day-copy">
          <div className="section-kicker"><Sparkles size={14} /> WORD OF THE DAY</div>
          <h2>A new word.<br /><span>A little more confidence.</span></h2>
          <p>Watch today’s quick video lesson and pick up a useful English phrase you can use in everyday conversations.</p>
          <a className="word-of-day-link" href={WORD_OF_THE_DAY_URL} target="_blank" rel="noreferrer">
            <BookOpen size={17} />
            <span>Keep building your vocabulary</span>
            <ArrowUpRight size={16} />
          </a>
        </div>

        <div className="word-of-day-video-card">
          <div className="word-of-day-video-heading">
            <span className="word-of-day-play"><Play size={14} fill="currentColor" /></span>
            <span><strong>Today’s mini lesson</strong><small>Watch on Instagram</small></span>
            <a href={WORD_OF_THE_DAY_URL} target="_blank" rel="noreferrer" aria-label="Open the Word of the Day video on Instagram">
              <ArrowUpRight size={17} />
            </a>
          </div>
          <div className="word-of-day-video">
            <iframe
              title="FluentZee Academy Word of the Day video"
              src={WORD_OF_THE_DAY_REEL}
              loading="lazy"
              allow="encrypted-media; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
