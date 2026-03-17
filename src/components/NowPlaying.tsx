import { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";

interface Track {
  title: string;
  artist: string;
  coverArt: string;
  audioSrc: string;
}

const TRACKS: Track[] = [
  {
    title: "Midnight Reverie",
    artist: "Lo-fi Collective",
    coverArt: "",
    audioSrc: "",
  },
  {
    title: "Drifting Clouds",
    artist: "Ambient Works",
    coverArt: "",
    audioSrc: "",
  },
  {
    title: "Quiet Hours",
    artist: "Still Motion",
    coverArt: "",
    audioSrc: "",
  },
];

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function NowPlaying() {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(180);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  const track = TRACKS[currentTrack];

  // Simulate playback
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev >= duration) {
          handleNext();
          return 0;
        }
        return prev + 0.25;
      });
    }, 250);
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  useEffect(() => {
    setProgress(duration > 0 ? (currentTime / duration) * 100 : 0);
  }, [currentTime, duration]);

  const handleNext = useCallback(() => {
    setCurrentTrack((prev) => (prev + 1) % TRACKS.length);
    setCurrentTime(0);
    setProgress(0);
  }, []);

  const handlePrev = () => {
    if (currentTime > 3) {
      setCurrentTime(0);
    } else {
      setCurrentTrack((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
      setCurrentTime(0);
    }
    setProgress(0);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setCurrentTime(pct * duration);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-svh bg-background select-none">
      {/* Branding */}
      <span className="absolute top-6 left-6 text-sm font-medium tracking-tight text-foreground/60">
        HEY BUDDY
      </span>

      {/* Volume toggle */}
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="absolute top-6 right-6 p-2 rounded-full control-hover text-muted-foreground"
      >
        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>

      {/* Album Art Container */}
      <div
        className="relative group w-64 h-64 md:w-80 md:h-80 rounded-[32px] p-4 bg-[hsl(var(--surface-glass))] player-shadow cursor-pointer"
        onMouseEnter={() => setControlsVisible(true)}
        onMouseLeave={() => setControlsVisible(false)}
        onClick={() => setIsPlaying(!isPlaying)}
      >
        {/* Placeholder art */}
        <div className="w-full h-full rounded-[20px] bg-secondary flex items-center justify-center overflow-hidden shadow-2xl">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-muted flex items-center justify-center">
              <span className="text-2xl">🎵</span>
            </div>
            <p className="text-xs text-muted-foreground">{track.artist}</p>
          </div>
        </div>

        {/* Overlay Controls */}
        <div
          className={`absolute inset-0 flex items-center justify-center rounded-[32px] bg-[hsl(var(--overlay))] transition-opacity duration-200 ${
            controlsVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionTimingFunction: "cubic-bezier(0.2, 0, 0, 1)" }}
        >
          <div className="flex items-center gap-6">
            <button
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              className="p-2 rounded-full control-hover text-foreground"
            >
              <SkipBack size={20} fill="currentColor" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setIsPlaying(!isPlaying); }}
              className="p-4 rounded-full bg-foreground/10 control-hover text-foreground"
            >
              {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" />}
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="p-2 rounded-full control-hover text-foreground"
            >
              <SkipForward size={20} fill="currentColor" />
            </button>
          </div>
        </div>
      </div>

      {/* Metadata */}
      <div className="mt-8 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground text-balance">
          {track.title}
        </h1>
        <p className="text-base font-medium text-muted-foreground mt-1">
          {track.artist}
        </p>
      </div>

      {/* Progress bar */}
      <div className="mt-6 w-64 md:w-80">
        <div
          ref={progressRef}
          onClick={handleProgressClick}
          className="group/bar relative w-full h-1 rounded-full bg-foreground/10 cursor-pointer hover:h-1.5 transition-all duration-200"
          style={{ transitionTimingFunction: "cubic-bezier(0.2, 0, 0, 1)" }}
        >
          <div
            className="absolute left-0 top-0 h-full rounded-full bg-foreground transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="font-mono tabular-nums text-xs text-muted-foreground">
            {formatTime(currentTime)}
          </span>
          <span className="font-mono tabular-nums text-xs text-muted-foreground">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* Track list dots */}
      <div className="mt-8 flex gap-2">
        {TRACKS.map((_, i) => (
          <button
            key={i}
            onClick={() => { setCurrentTrack(i); setCurrentTime(0); }}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
              i === currentTrack ? "bg-foreground w-4" : "bg-foreground/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
