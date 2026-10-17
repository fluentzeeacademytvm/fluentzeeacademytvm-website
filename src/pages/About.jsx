import React from "react";
import { CheckCircle2, MoveUpRight } from "lucide-react";

export default function About() {
  return (
    <section className="about section-wrap section-pad" id="about">
      <div className="section-kicker">01 / A LITTLE ABOUT US</div>
      <div className="about-grid">
        <div>
          <h2>Make English<br />feel <span>like yours.</span></h2>
          <div className="about-image">
            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=85"
              alt="Students collaborating and learning together"
              loading="lazy"
            />
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
  );
}

       