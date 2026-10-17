import React, { useState } from "react";
import {
  ArrowDownRight, ArrowRight, BookOpen, Check, CheckCircle2, ChevronDown,
  Clock3, Globe2, GraduationCap, Headphones, Menu, MessageCircle, Mic2,
  MoveUpRight, Quote, Sparkles, Star, Target, Users, X
} from "lucide-react";

const EMAIL = "fluentzeeacademytvm@gmail.com";
// Replace this with your academy's WhatsApp number in international format,
// digits only (India example: 919876543210). Do not include +, spaces or dashes.
const WHATSAPP_NUMBER = "919778122992";

const courses = [
  {
    number: "01", icon: Mic2, title: "Spoken English",
    level: "Beginner to advanced", duration: "Flexible batches",
    description: "Speak naturally and confidently in everyday conversations, at work and in interviews.",
    tags: ["Speaking practice", "Vocabulary", "Fluency"]
  },
  {
    number: "02", icon: Target, title: "IELTS Academic",
    level: "Study abroad", duration: "Structured preparation",
    description: "Prepare for all four IELTS sections with focused practice, feedback and mock tests.",
    tags: ["Listening", "Reading", "Writing", "Speaking"]
  },
  {
    number: "03", icon: Globe2, title: "IELTS General Training",
    level: "Work & migration", duration: "Structured preparation",
    description: "Build the skills and test strategies needed for the IELTS General Training format.",
    tags: ["Test strategies", "Practice tests", "Feedback"]
  },
  {
    number: "04", icon: BookOpen, title: "Grammar Essentials",
    level: "Build strong foundations", duration: "Learn at your pace",
    description: "Understand grammar clearly and use it to write and speak more accurately.",
    tags: ["Sentence building", "Tenses", "Practical English"]
  },
  {
    number: "05", icon: Users, title: "Communication Skills",
    level: "Personal & professional", duration: "Practical sessions",
    description: "Improve presentations, group discussions, interviews and workplace communication.",
    tags: ["Public speaking", "Interviews", "Confidence"]
  }
];

const benefits = [
  { icon: MessageCircle, title: "Practice that gets you speaking", text: "Build your confidence through useful, real-life English activities." },
  { icon: Users, title: "Supportive learning", text: "Learn in an encouraging environment where questions are welcome." },
  { icon: Target, title: "Clear learning goals", text: "Focus on practical skills and steady progress, one step at a time." },
  { icon: Clock3, title: "A plan that fits you", text: "Ask us about available batches and the right course for your goals." }
];

const puzzles = [
  { word: "confident", scrambled: "DNOIFCNTE", clue: "Feeling sure about yourself and your abilities." },
  { word: "practice", scrambled: "TICEPRAC", clue: "To do something repeatedly so you get better at it." },
  { word: "improve", scrambled: "VPROEMI", clue: "To become better at something." },
  { word: "achieve", scrambled: "VEEHICA", clue: "To succeed in doing or finishing something." },
  { word: "grammar", scrambled: "MARGARM", clue: "The rules for how words are used in a language." }
];

function whatsappLink(message = "Hi Fluentzee Academy! I'd like to know more about your English courses.") {
  const digits = WHATSAPP_NUMBER.replace(/\D/g, "");
  if (!digits || digits.includes("XXXXXXXX")) {
    return `https://wa.me/?text=${encodeURIComponent(message)}`;
  }
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const [puzzleGuess, setPuzzleGuess] = useState("");
  const [puzzleSolved, setPuzzleSolved] = useState(false);
  const [puzzleScore, setPuzzleScore] = useState(0);
  const [puzzleMessage, setPuzzleMessage] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", email: "", course: "Spoken English", message: "" });

  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  const submitEnquiry = (event) => {
    event.preventDefault();
    const message =
      `Hello FluentZee Academy, I'd like to enquire about your courses.\n\n` +
      `Name: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email || "Not provided"}\n` +
      `Course: ${form.course}\nMessage: ${form.message || "No additional message"}\n\n` +
      "Please contact me with more details.";
    setSubmitted(true);
    window.open(
      whatsappLink(message),
      "_blank",
      "noopener,noreferrer"
    );
  };

  const checkPuzzleAnswer = (event) => {
    event.preventDefault();
    if (puzzleGuess.trim().toLowerCase() === puzzles[puzzleIndex].word) {
      setPuzzleSolved(true);
      setPuzzleScore((score) => score + 1);
      setPuzzleMessage("That's right! Great vocabulary work.");
    } else {
      setPuzzleMessage("Not quite—try rearranging the letters and use the clue.");
    }
  };

  const nextPuzzle = () => {
    setPuzzleIndex((index) => (index + 1) % puzzles.length);
    setPuzzleGuess("");
    setPuzzleSolved(false);
    setPuzzleMessage("");
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <><div className="site-shell">
      <div className="announcement">
        <Sparkles size={14} />
        <span>Your next chapter starts with a confident hello.</span>
        <a href="#courses">Explore courses <ArrowRight size={13} /></a>
      </div>

      <header className="header">
        <a className="brand" href="#home" onClick={closeMenu} aria-label="FluentZee Academy home">
          <img className="brand-logo" src="/fluentzee-logo.png" alt="FluentZee Academy logo" />
          <span className="brand-copy"><strong>FluentZee</strong><small>ACADEMY</small></span>
        </a>
        <button className="menu-toggle" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X /> : <Menu />}
        </button>
        <nav className={menuOpen ? "nav nav-open" : "nav"}>
          <a href="#home" onClick={closeMenu}>Home</a>
          <a href="#about" onClick={closeMenu}>About us</a>
          <a href="#courses" onClick={closeMenu}>Courses</a>
          <a href="#why-us" onClick={closeMenu}>Why FluentZee</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
          <a className="nav-cta" href="#enquiry" onClick={closeMenu}>Enquire now <ArrowRight size={16} /></a>
        </nav>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot" /> ENGLISH FOR YOUR NEXT BIG STEP</div>
            <h1>Your voice.<br />Your confidence.<br /><span>Your future.</span></h1>
            <p className="hero-description">English is more than a language. It’s a way to open doors, share ideas and move forward with confidence.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#courses">Explore our courses <ArrowRight size={17} /></a>
              <a className="button button-quiet" href="#about"><span className="play-icon">↗</span> Discover Fluentzee</a>
            </div>
            <div className="hero-proof">
              <div className="proof-icon"><GraduationCap size={21} /></div>
              <div><strong>A learning journey built around you</strong><span>Practical English. Purposeful progress.</span></div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-photo">
             <img src="/hero.png" alt="Student learning English online at home" />
              <div className="photo-shade" />
              <div className="photo-label"><span className="live-dot" /> LEARN WITH PURPOSE</div>
              {/* <div className="photo-caption"><span>Small steps.</span><strong>Big possibilities.</strong></div> */}
            </div>
            <div className="floating-note note-top"><span className="note-icon"><Mic2 size={19} /></span><span><strong>Find your voice</strong><small>Speak with confidence</small></span></div>
            <div className="floating-note note-bottom"><span className="note-icon note-icon-yellow"><Star size={18} /></span><span><strong>Every word counts</strong><small>Grow at your own pace</small></span></div>
            <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
          </div>
          <a className="scroll-cue" href="#about"><span>SCROLL TO EXPLORE</span><ArrowDownRight size={17} /></a>
        </section>

        <section className="intro-strip">
          <div className="section-wrap intro-inner">
            <span>LEARN.</span><i /><span>SPEAK.</span><i /><span>SHINE.</span>
            <p>One language. A world of possibilities.</p>
          </div>
        </section>

        <section className="about section-wrap section-pad" id="about">
          <div className="section-kicker">01 / A LITTLE ABOUT US</div>
          <div className="about-grid">
            <div>
              <h2>Make English<br />feel <span>like yours.</span></h2>
              <div className="about-image">
                <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=85" alt="Students collaborating and learning together" loading="lazy" />
                <div className="image-stamp"><span>F</span><small>YOUR JOURNEY<br />STARTS HERE</small></div>
              </div>
            </div>
            <div className="about-text">
              <p className="lead">At Fluentzee Academy, we believe the best way to learn English is to use it.</p>
              <p>Whether you’re starting from the basics, preparing for IELTS or looking to communicate more confidently at work, your goals matter. Our courses are designed to help you build useful skills through practice and consistent learning.</p>
              <div className="values-list">
                <div><CheckCircle2 /><span><strong>Learn by doing</strong><small>Turn lessons into real-life communication.</small></span></div>
                <div><CheckCircle2 /><span><strong>Progress with purpose</strong><small>Focus on the skills that matter to you.</small></span></div>
                <div><CheckCircle2 /><span><strong>Build lasting confidence</strong><small>Make every practice session count.</small></span></div>
              </div>
              <a className="text-link" href="#courses">Find your course <MoveUpRight size={17} /></a>
            </div>
          </div>
        </section>

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
                  <div className="course-bottom"><span><Clock3 size={14} /> {duration}</span><a href="#enquiry" aria-label={`Enquire about ${title}`}><ArrowUpRightIcon /></a></div>
                </article>
              ))}
            </div>
            <p className="course-note"><Sparkles size={15} /> Not sure where to start? Tell us your goal and we’ll help you choose.</p>
          </div>
        </section>

        <section className="puzzle-section section-pad" id="word-puzzle">
          <div className="section-wrap puzzle-layout">
            <div className="puzzle-intro">
              <div className="section-kicker">A QUICK BRAIN BREAK</div>
              <h2>Play with words.<br /><span>Grow your English.</span></h2>
              <p>Unscramble the letters, use the clue, and build your vocabulary one word at a time.</p>
              <div className="puzzle-score"><Sparkles size={17} /> Words solved <strong>{puzzleScore}</strong></div>
            </div>
            <div className="puzzle-card">
              <div className="puzzle-card-top"><span>WORD SCRAMBLE</span><span>{String(puzzleIndex + 1).padStart(2, "0")} / {String(puzzles.length).padStart(2, "0")}</span></div>
              <div className="puzzle-letters" aria-label={`Scrambled letters: ${puzzles[puzzleIndex].scrambled.split("").join(" ")}`}>
                {puzzles[puzzleIndex].scrambled.split("").map((letter, index) => <span key={`${puzzleIndex}-${index}`}>{letter}</span>)}
              </div>
              <p className="puzzle-clue"><strong>Clue</strong>{puzzles[puzzleIndex].clue}</p>
              <form className="puzzle-form" onSubmit={checkPuzzleAnswer}>
                <label htmlFor="puzzle-answer">Your answer</label>
                <div className="puzzle-answer-row">
                  <input id="puzzle-answer" value={puzzleGuess} onChange={(event) => setPuzzleGuess(event.target.value)} placeholder="Type the word..." autoComplete="off" required disabled={puzzleSolved} />
                  {puzzleSolved ? <button className="button button-primary" type="button" onClick={nextPuzzle}>Next word <ArrowRight size={16} /></button> : <button className="button button-primary" type="submit">Check <ArrowRight size={16} /></button>}
                </div>
              </form>
              <p className={`puzzle-feedback${puzzleSolved ? " puzzle-feedback-correct" : ""}`} aria-live="polite">{puzzleMessage || "Type your answer and press Check."}</p>
            </div>
          </div>
        </section>

        <section className="why-section section-pad" id="why-us">
          <div className="section-wrap why-grid">
            <div className="why-copy">
              <div className="section-kicker section-kicker-light">03 / THE FLUENTZEE WAY</div>
              <h2>More than lessons.<br /><span>A little more you.</span></h2>
              <p>Confidence grows when learning feels practical, supportive and connected to your everyday life.</p>
              <a className="button button-light" href="#enquiry">Let’s talk about your goals <ArrowRight size={16} /></a>
              <div className="why-decoration">F<span>.</span></div>
            </div>
            <div className="benefit-grid">
              {benefits.map(({ icon: Icon, title, text }, index) => (
                <article className="benefit-card" key={title}>
                  <span className="benefit-index">0{index + 1}</span><Icon size={23} />
                  <h3>{title}</h3><p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="quote-section section-wrap">
          <Quote size={28} />
          <p>Every confident conversation begins with a first word.</p>
          <span>YOUR JOURNEY. YOUR PACE. YOUR VOICE.</span>
        </section>

        <section className="contact-section section-pad" id="contact">
          <div className="section-wrap contact-grid">
            <div className="contact-copy">
              <div className="section-kicker">04 / LET’S CONNECT</div>
              <h2>Ready to take<br />the <span>first step?</span></h2>
              <p>Tell us what you want to achieve. We’ll help you explore the next step in your English-learning journey.</p>
              <a className="contact-method" href={`mailto:${EMAIL}`}><span className="contact-method-icon"><MessageCircle size={19} /></span><span><small>EMAIL US</small><strong>{EMAIL}</strong></span><ArrowRight size={17} /></a>
              <a className="contact-method" href={whatsappLink()} target="_blank" rel="noreferrer"><span className="contact-method-icon whatsapp-icon"><MessageCircle size={19} /></span><span><small>CHAT ON WHATSAPP</small><strong>Ask us about our courses</strong></span><ArrowRight size={17} /></a>
              <div className="contact-note"><Check size={15} /> No pressure. Just a conversation about your goals.</div>
            </div>
            <div className="form-card" id="enquiry">
              <div className="form-heading"><span>YOUR NEXT CHAPTER</span><h3>Let’s get you started.</h3><p>Fill in the details and we’ll help you find the right course.</p></div>
              {submitted && <div className="form-notice"><CheckCircle2 size={17} /> WhatsApp should open with your enquiry ready. Tap Send to complete your request.</div>}
              <form onSubmit={submitEnquiry}>
                <label htmlFor="name">Your name <span>*</span></label>
                <input id="name" name="name" value={form.name} onChange={update} placeholder="Enter your full name" required />
                <div className="form-row">
                  <div><label htmlFor="phone">Phone number <span>*</span></label><input id="phone" name="phone" type="tel" value={form.phone} onChange={update} placeholder="+91 ..." required /></div>
                  <div><label htmlFor="email">Email address</label><input id="email" name="email" type="email" value={form.email} onChange={update} placeholder="you@example.com" /></div>
                </div>
                <label htmlFor="course">Course you’re interested in <span>*</span></label>
                <div className="select-wrap"><select id="course" name="course" value={form.course} onChange={update} required>{courses.map(c => <option key={c.title}>{c.title}</option>)}</select><ChevronDown size={17} /></div>
                <label htmlFor="message">Anything you’d like us to know?</label>
                <textarea id="message" name="message" value={form.message} onChange={update} placeholder="Tell us your goals (optional)" rows="3" />
                <button className="button button-primary form-submit" type="submit">Send an enquiry <ArrowRight size={17} /></button>
                <p className="form-privacy">By submitting, WhatsApp will open with these details ready to send to our academy.</p>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="section-wrap footer-main">
          <a className="brand brand-footer" href="#home"><img className="brand-logo" src="/fluentzee-logo.png" alt="FluentZee Academy logo" /><span className="brand-copy"><strong>FluentZee</strong><small>ACADEMY</small></span></a>
          <p>Learn. Speak. Shine.<br /><span>Helping you find confidence, one word at a time.</span></p>
          <div className="footer-links"><a href="#about">About</a><a href="#courses">Courses</a><a href="#contact">Contact</a><a href={`mailto:${EMAIL}`}>Email us</a></div>
        </div>
        <div className="section-wrap footer-bottom"><span>© {new Date().getFullYear()} FluentZee Academy. All rights reserved.</span><a href="#home">Back to top ↑</a></div>
      </footer>

      <a className="floating-whatsapp" href={whatsappLink()} target="_blank" rel="noreferrer" aria-label="Contact FluentZee Academy on WhatsApp"><MessageCircle size={22} /><span>Chat with us</span></a>
    </div></>
  );
}

function ArrowUpRightIcon() {
  return <ArrowRight size={17} />;
}

export default App;
