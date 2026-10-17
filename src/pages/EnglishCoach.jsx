import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, Bot, CheckCircle2, LoaderCircle, Send, Sparkles } from "lucide-react";

const LANGUAGE_TOOL_URL = "https://api.languagetool.org/v2/check";

function applyCorrections(text, matches) {
  const orderedMatches = [...matches].sort((a, b) => b.offset - a.offset);
  let corrected = text;
  let lastStart = text.length;

  for (const match of orderedMatches) {
    const replacement = match.replacements?.[0]?.value;
    if (replacement === undefined || match.offset + match.length > lastStart) continue;

    corrected = `${corrected.slice(0, match.offset)}${replacement}${corrected.slice(match.offset + match.length)}`;
    lastStart = match.offset;
  }

  return corrected;
}

export default function EnglishCoach() {
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const messagesRef = useRef(null);
  const [messages, setMessages] = useState([
    { role: "coach", text: "Hi! Paste a sentence or a short message, and I’ll check its English and suggest corrections." }
  ]);

  useEffect(() => {
    const container = messagesRef.current;
    if (container) container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);

  const checkText = async (event) => {
    event.preventDefault();
    const text = draft.trim();
    if (!text || busy) return;

    setDraft("");
    setBusy(true);
    setMessages((current) => [...current, { role: "you", text }]);

    try {
      const body = new URLSearchParams({ text, language: "en-US" });
      const response = await fetch(LANGUAGE_TOOL_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body
      });
      if (!response.ok) throw new Error("The grammar checker is temporarily unavailable.");

      const result = await response.json();
      const matches = result.matches ?? [];
      const correction = applyCorrections(text, matches);
      const findings = matches.slice(0, 3).map((match) => ({
        message: match.message,
        suggestion: match.replacements?.[0]?.value
      }));

      setMessages((current) => [
        ...current,
        {
          role: "coach",
          text: matches.length
            ? "I found a few places you could improve. Here’s a suggested version:"
            : "Your sentence looks good to me—no grammar or spelling issues found.",
          correction: matches.length ? correction : null,
          findings
        }
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        { role: "coach", text: "Sorry, I couldn’t reach the grammar checker. Please check your connection and try again." }
      ]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="english-coach-section section-pad" id="english-coach">
      <div className="section-wrap english-coach-layout">
        <div className="english-coach-intro">
          <div className="section-kicker"><Sparkles size={14} /> YOUR PERSONAL ENGLISH PRACTICE</div>
          <h2>Write it out.<br /><span>Grow with every word.</span></h2>
          <p>Chat with our English grammar coach. Get quick spelling and grammar feedback, plus a suggested correction you can learn from.</p>
          <div className="coach-benefit"><CheckCircle2 size={18} /> Friendly feedback for everyday English</div>
        </div>

        <div className="coach-chat" aria-label="English grammar chat">
          <div className="coach-chat-header">
            <span className="coach-avatar"><Bot size={20} /></span>
            <span><strong>FluentZee English Coach</strong><small><i /> Grammar &amp; writing practice</small></span>
          </div>
          <div className="coach-messages" ref={messagesRef} aria-live="polite" aria-relevant="additions">
            {messages.map((message, index) => (
              <div className={`coach-message coach-message-${message.role}`} key={`${message.role}-${index}`}>
                {message.role === "coach" && <span className="coach-message-avatar"><Bot size={16} /></span>}
                <div className="coach-bubble">
                  <p>{message.text}</p>
                  {message.correction && <div className="coach-correction"><small>Suggested correction</small><strong>{message.correction}</strong></div>}
                  {message.findings?.length > 0 && (
                    <ul className="coach-findings">
                      {message.findings.map((finding, findingIndex) => (
                        <li key={`${finding.message}-${findingIndex}`}>
                          {finding.message}{finding.suggestion && <span> Try: “{finding.suggestion}”</span>}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
            {busy && <div className="coach-loading"><LoaderCircle size={16} /> Checking your writing…</div>}
          </div>
          <form className="coach-form" onSubmit={checkText}>
            <label className="visually-hidden" htmlFor="coach-text">Enter a sentence to check</label>
            <textarea
              id="coach-text"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Write a sentence to check…"
              rows="2"
              maxLength={2000}
              required
              disabled={busy}
            />
            <button className="button button-primary" type="submit" disabled={busy || !draft.trim()} aria-label="Check grammar">
              {busy ? <LoaderCircle size={17} /> : <Send size={17} />}
              <span>Check my English</span>
              {!busy && <ArrowRight size={16} />}
            </button>
          </form>
          <p className="coach-privacy">Your text is sent to LanguageTool for grammar checking. Please don’t enter private or sensitive information.</p>
        </div>
      </div>
    </section>
  );
}
