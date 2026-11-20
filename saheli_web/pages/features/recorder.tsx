import React, { useState, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import { ArrowLeft, Mic, Camera, Square, Download, Play, ShieldAlert, Circle } from "lucide-react";

export default function RecorderPage() {
  const [mode, setMode] = useState<"audio" | "video">("audio");
  const [isRecording, setIsRecording] = useState(false);
  const [recordedUrl, setRecordedUrl] = useState<string | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const videoPreviewRef = useRef<HTMLVideoElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = async () => {
    try {
      chunksRef.current = [];
      setRecordedUrl(null);
      setRecordingTime(0);

      const constraints = mode === "video" ? { video: true, audio: true } : { audio: true };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (mode === "video" && videoPreviewRef.current) {
        videoPreviewRef.current.srcObject = stream;
        videoPreviewRef.current.play();
      }

      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, {
          type: mode === "video" ? "video/webm" : "audio/webm",
        });
        const url = URL.createObjectURL(blob);
        setRecordedUrl(url);

        // Stop all tracks
        stream.getTracks().forEach((track) => track.stop());
        if (videoPreviewRef.current) {
          videoPreviewRef.current.srcObject = null;
        }
      };

      recorder.start();
      setIsRecording(true);

      timerRef.current = setInterval(() => {
        setRecordingTime((t) => t + 1);
      }, 1000);
    } catch (err: any) {
      alert("Microphone / Camera access error: " + err.message);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <Head>
        <title>Audio &amp; Video Evidence Recorder | SafeHer</title>
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-[#FD6978]/5 via-[#F7F4F1] to-[#FD6978]/10 p-4 sm:p-8">
        <div className="max-w-2xl mx-auto">
          <Link
            href="/dashboard"
            className="inline-flex items-center space-x-2 text-sm text-neutral-600 hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft size={18} />
            <span>Back to Dashboard</span>
          </Link>

          <div className="bg-white rounded-3xl shadow-xl border border-neutral-100 p-6 sm:p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-600 flex items-center justify-center">
                {mode === "audio" ? <Mic size={24} /> : <Camera size={24} />}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-neutral-800">Evidence Recorder</h1>
                <p className="text-xs text-neutral-500">Capture encrypted audio or video recordings for safety and evidence</p>
              </div>
            </div>

            {/* Mode switch */}
            <div className="flex bg-neutral-100 p-1 rounded-2xl mb-6">
              <button
                type="button"
                disabled={isRecording}
                onClick={() => { setMode("audio"); setRecordedUrl(null); }}
                className={`flex-1 py-2 rounded-xl text-xs font-semibold flex items-center justify-center space-x-2 transition-all ${
                  mode === "audio" ? "bg-white text-teal-600 shadow-sm" : "text-neutral-500"
                }`}
              >
                <Mic size={14} />
                <span>Audio Recording</span>
              </button>
              <button
                type="button"
                disabled={isRecording}
                onClick={() => { setMode("video"); setRecordedUrl(null); }}
                className={`flex-1 py-2 rounded-xl text-xs font-semibold flex items-center justify-center space-x-2 transition-all ${
                  mode === "video" ? "bg-white text-teal-600 shadow-sm" : "text-neutral-500"
                }`}
              >
                <Camera size={14} />
                <span>Video Recording</span>
              </button>
            </div>

            {/* Viewfinder / Status */}
            <div className="bg-neutral-900 rounded-2xl p-6 text-center text-white mb-6 relative overflow-hidden min-h-[220px] flex flex-col justify-center items-center">
              {mode === "video" && (
                <video
                  ref={videoPreviewRef}
                  muted
                  playsInline
                  className={`w-full max-h-60 rounded-xl object-cover mb-2 ${isRecording ? "block" : "hidden"}`}
                />
              )}

              {isRecording ? (
                <div className="space-y-3 z-10">
                  <div className="flex items-center justify-center space-x-2 text-red-500 animate-pulse">
                    <Circle fill="currentColor" size={14} />
                    <span className="text-xs font-bold uppercase tracking-wider">RECORDING IN PROGRESS</span>
                  </div>
                  <span className="text-4xl font-mono font-bold">{formatTime(recordingTime)}</span>
                </div>
              ) : recordedUrl ? (
                <div className="space-y-3 w-full max-w-md">
                  <p className="text-xs text-green-400 font-semibold">✓ Recording Captured</p>
                  {mode === "video" ? (
                    <video src={recordedUrl} controls className="w-full rounded-xl max-h-52 bg-black" />
                  ) : (
                    <audio src={recordedUrl} controls className="w-full mt-2" />
                  )}
                  <a
                    href={recordedUrl}
                    download={`safeher-evidence-${Date.now()}.${mode === "video" ? "webm" : "webm"}`}
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold shadow-md transition-all mt-2"
                  >
                    <Download size={14} />
                    <span>Download Evidence File</span>
                  </a>
                </div>
              ) : (
                <div className="space-y-2 text-neutral-400">
                  <p className="text-sm">Ready to record {mode}</p>
                  <p className="text-xs text-neutral-500">Tap the button below to initiate</p>
                </div>
              )}
            </div>

            {/* Controls */}
            {isRecording ? (
              <button
                onClick={stopRecording}
                className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-xl flex items-center justify-center space-x-2 shadow-lg transition-all"
              >
                <Square size={16} />
                <span>Stop Recording</span>
              </button>
            ) : (
              <button
                onClick={startRecording}
                className="w-full py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm rounded-xl flex items-center justify-center space-x-2 shadow-lg transition-all"
              >
                <Circle size={16} fill="currentColor" />
                <span>Start {mode === "video" ? "Video" : "Audio"} Recording</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
