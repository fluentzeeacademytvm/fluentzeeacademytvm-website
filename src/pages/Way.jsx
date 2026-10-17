import React from "react";
import { ArrowRight, Clock3, Sparkles } from "lucide-react";

export const Way = ({ courses = [] }) => (
    <section className="courses-section section-pad" id="courses">
        <div className="section-wrap">
            <div className="section-kicker">02 / FIND YOUR PATH</div>
            <div className="section-heading-row">
                <div><h2>A course for your<br /><span>next chapter.</span></h2></div>
                <p>Start with where you are. Build towards where you want to be. Explore the course that fits your goals.</p>
            </div>
            <div className="course-grid">
                {courses.map(({ number, icon: Icon, title, level, duration, description, tags }) => (
                    <article className="course-card" key={number}>
                        <div className="course-top"><span className="course-number">{number}</span><span className="course-icon"><Icon size={22} /></span></div>
                        <div className="course-level">{level}</div>
                        <h3>{title}</h3>
                        <p>{description}</p>
                        <div className="course-tags">{tags.map(tag => <span key={tag}>{tag}</span>)}</div>
                        <div className="course-bottom">
                            <span><Clock3 size={14} /> {duration}</span>
                            <a href="#enquiry" aria-label={`Enquire about ${title}`}><ArrowRight size={17} /></a>
                        </div>
                    </article>
                ))}
            </div>
            <p className="course-note"><Sparkles size={15} /> Not sure where to start? Tell us your goal and we’ll help you choose.</p>
        </div>
    </section>
);
