import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, AudioLines, Mic, RotateCcw, Sparkles, Square } from "lucide-react";

const RECORDING_LENGTH_SECONDS = 30;

export default function SpeakChallenge() {
  const [mode, setMode] = useState("idle");
  const [secondsLeft, setSecondsLeft] = useState(RECORDING_LENGTH_SECONDS);
  const [recordingUrl, setRecordingUrl] = useState("");
  const [message, setMessage] = useState("");
  const recorderRef = useRef(null);
  const streamRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);
  const recordingUrlRef = useRef("");
  const mountedRef = useRef(true);
  const secondsLeftRef = useRef(RECORDING_LENGTH_SECONDS);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      window.clearInterval(timerRef.current);
      streamRef.current?.getTracks().forEach((track) => track.stop());
      if (recorderRef.current?.state === "recording") recorderRef.current.stop();
      if (recordingUrlRef.current) URL.revokeObjectURL(recordingUrlRef.current);
    };
  }, []);

  const stopRecording = () => {
    window.clearInterval(timerRef.current);
    if (recorderRef.current?.state === "recording") recorderRef.current.stop();
  };

  const startRecording = async () => {
    if (!navigator.mediaDevices?.getUserMedia || typeof window.MediaRecorder === "undefined") {
      setMessage("Recording isn’t supported in this browser. Try a recent version of Chrome, Edge, or Firefox.");
      return;
    }

    setMode("requesting");
    setMessage("");
    if (recordingUrlRef.current) URL.revokeObjectURL(recordingUrlRef.current);
    recordingUrlRef.current = "";
    setRecordingUrl("");
    secondsLeftRef.current = RECORDING_LENGTH_SECONDS;
    setSecondsLeft(RECORDING_LENGTH_SECONDS);

    let stream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (!mountedRef.current) {
        stream.getTracks().forEach((track) => track.stop());
        return;
      }
      streamRef.current = stream;

      const preferredType = "audio/webm;codecs=opus";
      const options = window.MediaRecorder.isTypeSupported(preferredType)
        ? { mimeType: preferredType }
        : undefined;
      const recorder = new window.MediaRecorder(stream, options);
      recorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data);
      };
      recorder.onerror = () => {
        window.clearInterval(timerRef.current);
        stream.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
        recorderRef.current = null;
        if (mountedRef.current) {
          setMode("idle");
          setMessage("The recording could not be completed. Please try again.");
        }
      };
      recorder.onstop = () => {
        window.clearInterval(timerRef.current);
        stream.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
        recorderRef.current = null;
        if (!mountedRef.current) return;

        if (chunksRef.current.length > 0) {
          const blob = new Blob(chunksRef.current, { type: recorder.mimeType || "audio/webm" });
          if (recordingUrlRef.current) URL.revokeObjectURL(recordingUrlRef.current);
          const url = URL.createObjectURL(blob);
          recordingUrlRef.current = url;
          setRecordingUrl(url);
          setMessage("Nice work! Listen back to your 30-second practice.");
        }
        setMode("ready");
      };

      recorder.start();
      setMode("recording");
      timerRef.current = window.setInterval(() => {
        secondsLeftRef.current = Math.max(0, secondsLeftRef.current - 1);
        setSecondsLeft(secondsLeftRef.current);
        if (secondsLeftRef.current === 0) stopRecording();
      }, 1000);
    } catch (error) {
      stream?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
      recorderRef.current = null;
      if (mountedRef.current) {
        setMode("idle");
        if (error?.name === "NotAllowedError" || error?.name === "PermissionDeniedError") {
          setMessage("Microphone access was blocked. Allow microphone access in your browser settings, then try again.");
        } else if (error?.name === "NotFoundError" || error?.name === "DevicesNotFoundError") {
          setMessage("No microphone was found. Connect a microphone and try again.");
        } else {
          setMessage("We couldn’t start the recording. Check your microphone and try again.");
        }
      }
    }
  };

  const resetRecording = () => {
    if (recordingUrlRef.current) URL.revokeObjectURL(recordingUrlRef.current);
    recordingUrlRef.current = "";
    setRecordingUrl("");
    secondsLeftRef.current = RECORDING_LENGTH_SECONDS;
    setSecondsLeft(RECORDING_LENGTH_SECONDS);
    setMessage("");
    setMode("idle");
  };

  const isBusy = mode === "requesting" || mode === "recording";

  return (
    <section className="speak-challenge-section section-pad" id="speak-for-30-seconds">
      <div className="section-wrap speak-challenge-layout">
        <div className="speak-challenge-intro">
          <div className="section-kicker"><AudioLines size={15} /> SPEAKING PRACTICE</div>
          <h2>Speak for<br /><span>30 seconds.</span></h2>
          <p>A little speaking practice goes a long way. Use the sample to get started, then introduce yourself in your own words.</p>
          <div className="speak-challenge-tip"><Sparkles size={17} /><span><strong>There’s no perfect answer.</strong><small>Speak at your own pace. Your recording stays in this browser.</small></span></div>
        </div>

        <div className="speak-challenge-card">
          <div className="speak-challenge-card-top">
            <span className="speak-challenge-label">YOUR 30-SECOND PROMPT</span>
            <span className="speak-challenge-time">00:{String(secondsLeft).padStart(2, "0")}</span>
          </div>
          <h3>Introduce yourself in English.</h3>
          <p className="speak-challenge-hint">You could share your name, where you’re from, what you do, and one thing you enjoy.</p>

          <div className="speak-samples">
            <p>Sample answers to get you started</p>
            <blockquote>“Hi, I’m Asha. I’m from Chennai, and I’m learning English to feel more confident at work.”</blockquote>
            <blockquote>“Hello! My name is Rahul. I enjoy cricket and meeting new people. I’m happy to be here.”</blockquote>
          </div>

          <div className="speak-record-controls">
            {mode === "recording" ? (
              <button className="button speak-stop-button" type="button" onClick={stopRecording}>
                <Square size={15} fill="currentColor" /> Stop recording
              </button>
            ) : (
              <button className="button button-primary" type="button" onClick={startRecording} disabled={mode === "requesting"}>
                <Mic size={17} /> {mode === "requesting" ? "Waiting for microphone…" : recordingUrl ? "Record again" : "Start recording"}
                {mode !== "requesting" && <ArrowRight size={16} />}
              </button>
            )}
            {recordingUrl && mode !== "recording" && (
              <button className="speak-reset-button" type="button" onClick={resetRecording}>
                <RotateCcw size={14} /> Clear
              </button>
            )}
          </div>

          {mode === "recording" && (
            <div className="speak-recording-indicator" role="status">
              <span /> Recording in progress — speak now
            </div>
          )}
          {recordingUrl && mode !== "recording" && (
            <div className="speak-playback">
              <label htmlFor="speak-playback-audio">Your recording</label>
              <audio id="speak-playback-audio" controls src={recordingUrl}>Your browser does not support audio playback.</audio>
            </div>
          )}
          {message && <p className="speak-feedback" role="status">{message}</p>}
        </div>
      </div>
    </section>
  );
}
