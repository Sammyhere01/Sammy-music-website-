import { useEffect, useState } from "react";
import { Play, Loader2, TrendingUp, AlertTriangle } from "lucide-react";
import { getTrendingMusic, formatViews, formatDuration, getApiKeyStatus, type YouTubeVideo } from "@/lib/youtube";
import { useMusic } from "@/contexts/MusicContext";

const DiscoverPage = () => {
  const [trending, setTrending] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const { playTrack, setQueue } = useMusic();
  const hasApiKey = getApiKeyStatus();

  useEffect(() => {
    if (!hasApiKey) { setLoading(false); return; }
    getTrendingMusic(12)
      .then((data) => { setTrending(data); setQueue(data); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [hasApiKey, setQueue]);

  return (
    <div className="flex-1 overflow-y-auto scrollbar-cyber p-6">
      <h1 className="text-2xl font-bold font-display neon-glow-green mb-6">DISCOVER</h1>

      {!hasApiKey && (
        <div className="flex items-center gap-3 bg-accent/10 border border-accent/30 rounded-lg p-4 mb-6">
          <AlertTriangle size={20} className="text-accent" />
          <div>
            <p className="text-sm font-semibold font-body text-foreground">API Key Not Set</p>
            <p className="text-xs text-muted-foreground">Add your YouTube API key in src/lib/youtube.ts or set VITE_YOUTUBE_API_KEY in your .env file</p>
          </div>
        </div>
      )}

      <div className="flex items-center gap-2 mb-4">
        <TrendingUp size={20} className="text-primary" />
        <p className="text-sm text-muted-foreground font-body">Trending music right now 🔥</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="animate-spin text-primary" size={32} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {trending.map((video) => (
            <div
              key={video.id}
              onClick={() => playTrack(video)}
              className="group cursor-pointer"
            >
              <div className="relative rounded-xl overflow-hidden aspect-video bg-card border border-border hover:neon-border-green transition-all">
                <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Play size={40} className="text-primary" fill="currentColor" />
                </div>
                {video.duration && (
                  <span className="absolute bottom-2 right-2 bg-background/80 text-foreground text-xs px-1.5 py-0.5 rounded font-mono">
                    {formatDuration(video.duration)}
                  </span>
                )}
              </div>
              <h3 className="mt-2 text-sm font-semibold font-body text-foreground truncate">{video.title}</h3>
              <p className="text-xs text-muted-foreground truncate">{video.channelTitle}</p>
              {video.viewCount && (
                <p className="text-xs text-muted-foreground mt-0.5">{formatViews(video.viewCount)} views</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DiscoverPage;
