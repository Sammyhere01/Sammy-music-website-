import { useEffect, useState } from "react";
import heroBanner from "@/assets/hero-banner.jpg";
import { Play, Loader2 } from "lucide-react";
import { getTrendingMusic, formatViews, getApiKeyStatus, type YouTubeVideo } from "@/lib/youtube";
import { useMusic } from "@/contexts/MusicContext";

import album1 from "@/assets/album-1.jpg";
import album2 from "@/assets/album-2.jpg";
import album3 from "@/assets/album-3.jpg";

const fallbackDrops = [
  { id: "1", title: "Cyberfunk Chaos", channelTitle: "Neon Riot", thumbnail: album1, thumbnailHigh: album1, publishedAt: "" },
  { id: "2", title: "Lunar Dreams", channelTitle: "Astrid", thumbnail: album2, thumbnailHigh: album2, publishedAt: "" },
  { id: "3", title: "Midnight Rain", channelTitle: "Lo Fi Lovers", thumbnail: album3, thumbnailHigh: album3, publishedAt: "" },
];

const MainContent = () => {
  const [trending, setTrending] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const { playTrack, setQueue } = useMusic();
  const hasApiKey = getApiKeyStatus();

  useEffect(() => {
    if (!hasApiKey) {
      setTrending(fallbackDrops as YouTubeVideo[]);
      setLoading(false);
      return;
    }
    getTrendingMusic(6)
      .then((data) => { setTrending(data); setQueue(data); })
      .catch(() => setTrending(fallbackDrops as YouTubeVideo[]))
      .finally(() => setLoading(false));
  }, [hasApiKey, setQueue]);

  return (
    <div className="flex-1 overflow-y-auto scrollbar-cyber p-6">
      {/* Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden mb-8 h-64">
        <img src={heroBanner} alt="Hyperdrive" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute bottom-6 left-6">
          <h1 className="text-4xl font-bold font-display neon-glow-green">HYPERDRIVE</h1>
          <p className="text-muted-foreground font-body text-lg mt-1">YOUR SONIC UNIVERSE</p>
          <button className="mt-3 px-6 py-2 bg-primary text-primary-foreground rounded-lg font-display text-sm font-bold hover:scale-105 transition-transform shadow-[0_0_15px_hsl(145_100%_50%/0.3)]">
            DIVE IN
          </button>
        </div>
      </div>

      {/* Fresh Drops / Trending */}
      <div>
        <h2 className="text-xl font-bold font-display mb-4 neon-glow-green">
          {hasApiKey ? "TRENDING NOW 🔥" : "FRESH DROPS 🚀"}
        </h2>
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="animate-spin text-primary" size={32} />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {trending.map((track) => (
              <div
                key={track.id}
                onClick={() => playTrack(track)}
                className="group cursor-pointer"
              >
                <div className="relative rounded-xl overflow-hidden aspect-video bg-card border border-border hover:neon-border-green transition-all">
                  <img src={track.thumbnail} alt={track.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Play size={40} className="text-primary" fill="currentColor" />
                  </div>
                </div>
                <h3 className="mt-2 text-sm font-semibold font-body text-foreground truncate">{track.title}</h3>
                <p className="text-xs text-muted-foreground truncate">{track.channelTitle}</p>
                {track.viewCount && (
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {formatViews(track.viewCount)} views
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MainContent;
