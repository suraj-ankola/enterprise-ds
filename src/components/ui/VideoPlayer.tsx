import React, { useEffect, useRef, useState } from 'react';
import {
  PlayIcon, PauseIcon, SpeakerHighIcon, SpeakerSlashIcon,
  ArrowsOutIcon, ArrowClockwiseIcon,
} from '@phosphor-icons/react';
import { Spinner } from './Spinner';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface VideoPlayerProps {
  src:             string;
  poster?:         string;
  title?:          string;
  autoPlay?:       boolean;
  muted?:          boolean;
  loop?:           boolean;
  /** Show branding / title overlay */
  showTitle?:      boolean;
  className?:      string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatTime(s: number): string {
  if (isNaN(s)) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${String(sec).padStart(2, '0')}`;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function VideoPlayer({
  src,
  poster,
  title,
  autoPlay     = false,
  muted:       initMuted = false,
  loop         = false,
  showTitle    = false,
  className    = '',
}: VideoPlayerProps) {
  const videoRef      = useRef<HTMLVideoElement>(null);
  const progressRef   = useRef<HTMLDivElement>(null);
  const controlsTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [playing,    setPlaying]    = useState(false);
  const [muted,      setMuted]      = useState(initMuted);
  const [volume,     setVolume]     = useState(1);
  const [current,    setCurrent]    = useState(0);
  const [duration,   setDuration]   = useState(0);
  const [loading,    setLoading]    = useState(true);
  const [ended,      setEnded]      = useState(false);
  const [showControls, setShow]     = useState(true);

  // Sync muted into video element
  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted;
  }, [muted]);

  // Auto-hide controls during playback
  function resetHideTimer() {
    setShow(true);
    if (controlsTimer.current) clearTimeout(controlsTimer.current);
    controlsTimer.current = setTimeout(() => {
      if (videoRef.current && !videoRef.current.paused) setShow(false);
    }, 2500);
  }

  useEffect(() => () => { if (controlsTimer.current) clearTimeout(controlsTimer.current); }, []);

  function togglePlay() {
    const v = videoRef.current;
    if (!v) return;
    if (ended) {
      v.currentTime = 0;
      setEnded(false);
    }
    if (v.paused) { v.play(); setPlaying(true); }
    else          { v.pause(); setPlaying(false); setShow(true); if (controlsTimer.current) clearTimeout(controlsTimer.current); }
  }

  function toggleMute() { setMuted(m => !m); }

  function handleVolumeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = Number(e.target.value);
    setVolume(v);
    setMuted(v === 0);
    if (videoRef.current) videoRef.current.volume = v;
  }

  function seekTo(e: React.MouseEvent<HTMLDivElement>) {
    const rect = progressRef.current?.getBoundingClientRect();
    if (!rect || !videoRef.current) return;
    const ratio = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = ratio * duration;
  }

  function requestFullscreen() {
    const container = videoRef.current?.parentElement?.parentElement;
    if (container?.requestFullscreen) container.requestFullscreen();
  }

  const progressPct = duration ? (current / duration) * 100 : 0;

  return (
    <div
      className={['group relative overflow-hidden rounded-xl bg-black', className].join(' ')}
      onMouseMove={resetHideTimer}
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        loop={loop}
        playsInline
        className="w-full h-full object-cover"
        onLoadedMetadata={e => { setDuration((e.target as HTMLVideoElement).duration); setLoading(false); }}
        onTimeUpdate={e => setCurrent((e.target as HTMLVideoElement).currentTime)}
        onPlay={() => { setPlaying(true); setEnded(false); resetHideTimer(); }}
        onPause={() => { setPlaying(false); setShow(true); }}
        onWaiting={() => setLoading(true)}
        onCanPlay={() => setLoading(false)}
        onEnded={() => { setPlaying(false); setEnded(true); setShow(true); }}
        autoPlay={autoPlay}
        muted={muted}
      />

      {/* Loading spinner */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <Spinner size="lg" variant="white" />
        </div>
      )}

      {/* Title */}
      {showTitle && title && (
        <div className="absolute top-0 inset-x-0 px-4 pt-4 pb-8 bg-gradient-to-b from-black/60 to-transparent pointer-events-none">
          <p className="text-sm font-semibold text-white">{title}</p>
        </div>
      )}

      {/* Big play button (centre, shown when paused) */}
      {!playing && !loading && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="h-14 w-14 flex items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm">
            {ended ? <ArrowClockwiseIcon size={24} /> : <PlayIcon size={24} weight="fill" />}
          </div>
        </div>
      )}

      {/* Controls bar */}
      <div
        onClick={e => e.stopPropagation()}
        className={[
          'absolute bottom-0 inset-x-0 px-3 pb-2 pt-8',
          'bg-gradient-to-t from-black/70 to-transparent',
          'transition-opacity duration-200',
          showControls ? 'opacity-100' : 'opacity-0',
        ].join(' ')}
      >
        {/* Progress */}
        <div
          ref={progressRef}
          onClick={seekTo}
          className="w-full h-1 rounded-full bg-white/30 mb-2 cursor-pointer group/prog"
        >
          <div
            className="h-full rounded-full bg-white relative group-hover/prog:bg-[var(--ds-brand-400)] transition-colors"
            style={{ width: `${progressPct}%` }}
          >
            <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 h-3 w-3 rounded-full bg-white opacity-0 group-hover/prog:opacity-100 transition-opacity" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Play/pause */}
          <button
            type="button"
            aria-label={playing ? 'Pause' : 'Play'}
            onClick={togglePlay}
            className="text-white hover:text-white/80 focus-visible:outline-none transition-colors"
          >
            {playing ? <PauseIcon size={18} weight="fill" /> : <PlayIcon size={18} weight="fill" />}
          </button>

          {/* Time */}
          <span className="text-[11px] tabular-nums text-white/80 mr-1">
            {formatTime(current)} / {formatTime(duration)}
          </span>

          <div className="flex-1" />

          {/* Volume */}
          <button
            type="button"
            aria-label={muted ? 'Unmute' : 'Mute'}
            onClick={toggleMute}
            className="text-white hover:text-white/80 focus-visible:outline-none transition-colors"
          >
            {muted || volume === 0 ? <SpeakerSlashIcon size={16} /> : <SpeakerHighIcon size={16} />}
          </button>
          <input
            type="range" min={0} max={1} step={0.05}
            value={muted ? 0 : volume}
            onChange={handleVolumeChange}
            aria-label="Volume"
            className="w-16 h-1 accent-white cursor-pointer"
          />

          {/* Fullscreen */}
          <button
            type="button"
            aria-label="Fullscreen"
            onClick={requestFullscreen}
            className="text-white hover:text-white/80 focus-visible:outline-none transition-colors"
          >
            <ArrowsOutIcon size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
