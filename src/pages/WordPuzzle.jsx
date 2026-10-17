import React, { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

const puzzles = [
  { word: "confident", scrambled: "DNOIFCNTE", clue: "Feeling sure about yourself and your abilities." },
  { word: "practice", scrambled: "TICEPRAC", clue: "To do something repeatedly so you get better at it." },
  { word: "improve", scrambled: "VPROEMI", clue: "To become better at something." },
  { word: "achieve", scrambled: "VEEHICA", clue: "To succeed in doing or finishing something." },
  { word: "grammar", scrambled: "MARGARM", clue: "The rules for how words are used in a language." }
];

export default function WordPuzzle() {
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const [puzzleGuess, setPuzzleGuess] = useState("");
  const [puzzleSolved, setPuzzleSolved] = useState(false);
  const [puzzleScore, setPuzzleScore] = useState(0);
  const [puzzleMessage, setPuzzleMessage] = useState("");
  const currentPuzzle = puzzles[puzzleIndex];

  const checkPuzzleAnswer = (event) => {
    event.preventDefault();
    if (puzzleGuess.trim().toLowerCase() === currentPuzzle.word) {
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

  return (
    <section className="puzzle-section section-pad" id="word-puzzle">
      <div className="section-wrap puzzle-layout">
        <div className="puzzle-intro">
          <div className="section-kicker">A QUICK BRAIN BREAK</div>
          <h2>Play with words.<br /><span>Grow your English.</span></h2>
          <p>Unscramble the letters, use the clue, and build your vocabulary one word at a time.</p>
          <div className="puzzle-score"><Sparkles size={17} /> Words solved <strong>{puzzleScore}</strong></div>
        </div>
        <div className="puzzle-card">
          <div className="puzzle-card-top">
            <span>WORD SCRAMBLE</span>
            <span>{String(puzzleIndex + 1).padStart(2, "0")} / {String(puzzles.length).padStart(2, "0")}</span>
          </div>
          <div className="puzzle-letters" aria-label={`Scrambled letters: ${currentPuzzle.scrambled.split("").join(" ")}`}>
            {currentPuzzle.scrambled.split("").map((letter, index) => (
              <span key={`${puzzleIndex}-${index}`}>{letter}</span>
            ))}
          </div>
          <p className="puzzle-clue"><strong>Clue</strong>{currentPuzzle.clue}</p>
          <form className="puzzle-form" onSubmit={checkPuzzleAnswer}>
            <label htmlFor="puzzle-answer">Your answer</label>
            <div className="puzzle-answer-row">
              <input
                id="puzzle-answer"
                value={puzzleGuess}
                onChange={(event) => setPuzzleGuess(event.target.value)}
                placeholder="Type the word..."
                autoComplete="off"
                required
                disabled={puzzleSolved}
              />
              {puzzleSolved ? (
                <button className="button button-primary" type="button" onClick={nextPuzzle}>
                  Next word <ArrowRight size={16} />
                </button>
              ) : (
                <button className="button button-primary" type="submit">
                  Check <ArrowRight size={16} />
                </button>
              )}
            </div>
          </form>
          <p className={`puzzle-feedback${puzzleSolved ? " puzzle-feedback-correct" : ""}`} aria-live="polite">
            {puzzleMessage || "Type your answer and press Check."}
          </p>
        </div>
      </div>
    </section>
  );
}
