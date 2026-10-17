import React from "react";
import { MoveUpRight, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "The lessons helped me practise everyday English in a friendly, encouraging way.",
    name: "Spoken English learner",
    course: "Spoken English"
  },
  {
    quote: "Having a clear plan made my IELTS preparation feel more manageable.",
    name: "IELTS learner",
    course: "IELTS preparation"
  },
  {
    quote: "I enjoyed learning practical skills I could use in conversations and interviews.",
    name: "Communication skills learner",
    course: "Communication Skills"
  }
];

export default function Testimonials() {
  return (
    <section className="testimonials-section section-pad" id="testimonials">
      <div className="section-wrap">
        <div className="section-kicker">STUDENT STORIES</div>
        <div className="testimonials-heading">
          <div>
            <h2>Small steps.<br /><span>Real confidence.</span></h2>
            <p className="testimonials-note">
              Sample testimonial copy — replace with approved feedback from your students before publishing.
            </p>
          </div>
          <a className="text-link" href="#enquiry">
            Start your journey <MoveUpRight size={17} />
          </a>
        </div>
        <div className="testimonial-grid">
          {testimonials.map(({ quote, name, course }) => (
            <article className="testimonial-card" key={name}>
              <Quote className="testimonial-quote-icon" size={23} />
              <p>“{quote}”</p>
              <div className="testimonial-author">
                <span className="testimonial-avatar" aria-hidden="true">{name.charAt(0)}</span>
                <span><strong>{name}</strong><small>{course}</small></span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
