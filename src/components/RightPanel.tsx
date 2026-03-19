import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Volume2, VolumeX, Heart } from "lucide-react";
import { useMusic } from "@/contexts/MusicContext";
import YouTubePlayer from "@/components/YouTubePlayer";
import nowPlayingImg from "@/assets/now-playing.jpg";

const QueueItem = ({ track, isActive }: { track: any; isActive: boolean }) => {
  const { playTrack } = useMusic();
  return (
    <div
      onClick={() => playTrack(track)}
      className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all ${
        isActive ? "bg-primary/10 neon-border-green border" : "hover:bg-muted border border-transparent"
      }`}
    >
      <img src={track.thumbnail} alt={track.title} className="w-10 h-10 rounded-md object-cover" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold font-body truncate text-foreground">{track.title}</p>
        <p className="text-xs text-muted-foreground truncate">{track.channelTitle}</p>
      </div>
    </div>
  );
};

const RightPanel = () => {
  const { currentTrack, isPlaying, togglePlay, playNext, playPrev, queue, volume, setVolume } = useMusic();
  const trackTitle = currentTrack?.title || "SONIC BLISS";
  const trackArtist = currentTrack?.channelTitle || "LUNA";
  const trackThumb = currentTrack?.thumbnail || nowPlayingImg;

  return (
    <aside className="w-full lg:w-72 xl:w-80 bg-surface-dark lg:border-l border-border flex flex-col p-4 gap-4 shrink-0 overflow-y-auto scrollbar-cyber">
      <YouTubePlayer />

      {/* Now Playing */}
      <div className="text-center">
        <p className="text-xs text-muted-foreground font-display tracking-widest mb-3">NOW PLAYING</p>
        <div className="relative mx-auto w-48 h-48 rounded-2xl overflow-hidden neon-border-green border">
          <img src={trackThumb} alt={trackTitle} className="w-full h-full object-cover" />
        </div>
        <h3 className="mt-4 text-base font-bold font-display text-foreground truncate neon-glow-green">{trackTitle}</h3>
        <p className="text-sm text-muted-foreground font-body">{trackArtist}</p>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 py-2">
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          <Shuffle size={16} />
        </button>
        <button onClick={playPrev} className="text-muted-foreground hover:text-foreground transition-colors">
          <SkipBack size={20} />
        </button>
        <button
          onClick={togglePlay}
          className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:scale-105 transition-transform shadow-[0_0_15px_hsl(145_100%_50%/0.4)]"
        >
          {isPlaying ? <Pause size={22} fill="currentColor" /> : <Play size={22} fill="currentColor" />}
        </button>
        <button onClick={playNext} className="text-muted-foreground hover:text-foreground transition-colors">
          <SkipForward size={20} />
        </button>
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          <Repeat size={16} />
        </button>
      </div>

      {/* Volume */}
      <div className="flex items-center gap-3 px-2">
        <button onClick={() => setVolume(volume > 0 ? 0 : 75)} className="text-muted-foreground hover:text-foreground transition-colors">
          {volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
        <input
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="flex-1 h-1 accent-primary cursor-pointer"
        />
        <span className="text-xs text-muted-foreground w-7 text-right">{volume}</span>
        <Heart size={16} className="text-accent cursor-pointer hover:scale-110 transition-transform" />
      </div>

      {/* Queue */}
      {queue.length > 0 && (
        <div className="mt-2">
          <p className="text-xs text-muted-foreground font-display tracking-widest mb-2">QUEUE</p>
          <div className="flex flex-col gap-1">
            {queue.slice(0, 8).map((track) => (
              <QueueItem key={track.id} track={track} isActive={currentTrack?.id === track.id} />
            ))}
          </div>
        </div>
      )}
    </aside>
  );
};

export default RightPanel;
