import React from "react";
import { ArrowRight, Check, CheckCircle2, ChevronDown, MessageCircle } from "lucide-react";

export default function Connect({ courses = [], email, whatsappLink, submitted, form, update, submitEnquiry }) {
  return (
    <section className="contact-section section-pad" id="contact">
      <div className="section-wrap contact-grid">
        <div className="contact-copy">
          <div className="section-kicker">04 / LET’S CONNECT</div>
          <h2>Ready to take<br />the <span>first step?</span></h2>
          <p>Tell us what you want to achieve. We’ll help you explore the next step in your English-learning journey.</p>
          <a className="contact-method" href={`mailto:${email}`}>
            <span className="contact-method-icon"><MessageCircle size={19} /></span>
            <span><small>EMAIL US</small><strong>{email}</strong></span>
            <ArrowRight size={17} />
          </a>
          <a className="contact-method" href={whatsappLink()} target="_blank" rel="noreferrer">
            <span className="contact-method-icon whatsapp-icon"><MessageCircle size={19} /></span>
            <span><small>CHAT ON WHATSAPP</small><strong>Ask us about our courses</strong></span>
            <ArrowRight size={17} />
          </a>
          <div className="contact-note"><Check size={15} /> No pressure. Just a conversation about your goals.</div>
        </div>
        <div className="form-card" id="enquiry">
          <div className="form-heading">
            <span>YOUR NEXT CHAPTER</span>
            <h3>Let’s get you started.</h3>
            <p>Fill in the details and we’ll help you find the right course.</p>
          </div>
          {submitted && (
            <div className="form-notice">
              <CheckCircle2 size={17} /> WhatsApp should open with your enquiry ready. Tap Send to complete your request.
            </div>
          )}
          <form onSubmit={submitEnquiry}>
            <label htmlFor="name">Your name <span>*</span></label>
            <input id="name" name="name" value={form.name} onChange={update} placeholder="Enter your full name" required />
            <div className="form-row">
              <div>
                <label htmlFor="phone">Phone number <span>*</span></label>
                <input id="phone" name="phone" type="tel" value={form.phone} onChange={update} placeholder="+91 ..." required />
              </div>
              <div>
                <label htmlFor="email">Email address</label>
                <input id="email" name="email" type="email" value={form.email} onChange={update} placeholder="you@example.com" />
              </div>
            </div>
            <label htmlFor="course">Course you’re interested in <span>*</span></label>
            <div className="select-wrap">
              <select id="course" name="course" value={form.course} onChange={update} required>
                {courses.map((course) => <option key={course.title}>{course.title}</option>)}
              </select>
              <ChevronDown size={17} />
            </div>
            <label htmlFor="message">Anything you’d like us to know?</label>
            <textarea id="message" name="message" value={form.message} onChange={update} placeholder="Tell us your goals (optional)" rows="3" />
            <button className="button button-primary form-submit" type="submit">Send an enquiry <ArrowRight size={17} /></button>
            <p className="form-privacy">By submitting, WhatsApp will open with these details ready to send to our academy.</p>
          </form>
        </div>
      </div>
    </section>
  );
}