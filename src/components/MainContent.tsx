import { useEffect, useState, useRef, useCallback } from "react";
import heroBanner from "@/assets/hero-banner.jpg";
import { Play, Loader2 } from "lucide-react";
import { getTrendingMusic, searchVideos, formatViews, getApiKeyStatus, type YouTubeVideo } from "@/lib/youtube";
import { useMusic } from "@/contexts/MusicContext";

import album1 from "@/assets/album-1.jpg";
import album2 from "@/assets/album-2.jpg";
import album3 from "@/assets/album-3.jpg";

const fallbackDrops = [
  { id: "1", title: "Cyberfunk Chaos", channelTitle: "Neon Riot", thumbnail: album1, thumbnailHigh: album1, publishedAt: "" },
  { id: "2", title: "Lunar Dreams", channelTitle: "Astrid", thumbnail: album2, thumbnailHigh: album2, publishedAt: "" },
  { id: "3", title: "Midnight Rain", channelTitle: "Lo Fi Lovers", thumbnail: album3, thumbnailHigh: album3, publishedAt: "" },
];

const moreSections = [
  { title: "CHILL VIBES 🌊", query: "chill lofi music" },
  { title: "HIP HOP HITS 🔥", query: "hip hop music 2024" },
  { title: "ELECTRONIC PULSE ⚡", query: "electronic music mix" },
  { title: "R&B SOUL 💜", query: "r&b soul music" },
  { title: "ROCK ANTHEMS 🎸", query: "rock music hits" },
  { title: "POP BANGERS 🎤", query: "pop music trending" },
  { title: "JAZZ & BLUES 🎷", query: "jazz blues music" },
  { title: "INDIE GEMS 💎", query: "indie music 2024" },
];

const MainContent = () => {
  const [trending, setTrending] = useState<YouTubeVideo[]>([]);
  const [loadedSections, setLoadedSections] = useState<{ title: string; tracks: YouTubeVideo[] }[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [sectionIndex, setSectionIndex] = useState(0);
  const { playTrack, setQueue } = useMusic();
  const hasApiKey = getApiKeyStatus();
  const observerRef = useRef<HTMLDivElement | null>(null);

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

  const loadMore = useCallback(async () => {
    if (!hasApiKey || loadingMore || sectionIndex >= moreSections.length) return;
    setLoadingMore(true);
    try {
      const section = moreSections[sectionIndex];
      const tracks = await searchVideos(section.query, 6);
      setLoadedSections((prev) => [...prev, { title: section.title, tracks }]);
      setSectionIndex((i) => i + 1);
    } catch (e) {
      console.error("Failed to load more:", e);
    } finally {
      setLoadingMore(false);
    }
  }, [hasApiKey, loadingMore, sectionIndex]);

  // Intersection observer for infinite scroll
  useEffect(() => {
    const el = observerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [loadMore]);

  const TrackCard = ({ track }: { track: YouTubeVideo }) => (
    <div onClick={() => playTrack(track)} className="group cursor-pointer">
      <div className="relative rounded-xl overflow-hidden aspect-video bg-card border border-border hover:neon-border-green transition-all">
        <img src={track.thumbnail} alt={track.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Play size={40} className="text-primary" fill="currentColor" />
        </div>
      </div>
      <h3 className="mt-2 text-sm font-semibold font-body text-foreground truncate">{track.title}</h3>
      <p className="text-xs text-muted-foreground truncate">{track.channelTitle}</p>
      {track.viewCount && (
        <p className="text-xs text-muted-foreground mt-0.5">{formatViews(track.viewCount)} views</p>
      )}
    </div>
  );

  return (
    <div className="flex-1 overflow-y-auto scrollbar-cyber p-4 sm:p-6 pb-32 md:pb-6">
      {/* Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden mb-6 sm:mb-8 h-44 sm:h-64">
        <img src={heroBanner} alt="Hyperdrive" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
          <h1 className="text-2xl sm:text-4xl font-bold font-display neon-glow-green">HYPERDRIVE</h1>
          <p className="text-muted-foreground font-body text-sm sm:text-lg mt-1">YOUR SONIC UNIVERSE</p>
          <button className="mt-2 sm:mt-3 px-4 sm:px-6 py-2 bg-primary text-primary-foreground rounded-lg font-display text-xs sm:text-sm font-bold hover:scale-105 transition-transform shadow-[0_0_15px_hsl(145_100%_50%/0.3)]">
            DIVE IN
          </button>
        </div>
      </div>

      {/* Trending */}
      <div className="mb-8">
        <h2 className="text-xl font-bold font-display mb-4 neon-glow-green">
          {hasApiKey ? "TRENDING NOW 🔥" : "FRESH DROPS 🚀"}
        </h2>
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="animate-spin text-primary" size={32} />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {trending.map((track) => (
              <TrackCard key={track.id} track={track} />
            ))}
          </div>
        )}
      </div>

      {/* Dynamically loaded sections */}
      {loadedSections.map((section, i) => (
        <div key={i} className="mb-8">
          <h2 className="text-xl font-bold font-display mb-4 neon-glow-green">{section.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {section.tracks.map((track) => (
              <TrackCard key={track.id} track={track} />
            ))}
          </div>
        </div>
      ))}

      {/* Loading more indicator */}
      {loadingMore && (
        <div className="flex justify-center py-8">
          <Loader2 className="animate-spin text-primary" size={28} />
        </div>
      )}

      {/* Scroll sentinel */}
      {hasApiKey && sectionIndex < moreSections.length && (
        <div ref={observerRef} className="h-20" />
      )}

      {sectionIndex >= moreSections.length && hasApiKey && (
        <p className="text-center text-muted-foreground font-body py-8 text-sm">You've reached the end 🎵</p>
      )}
    </div>
  );
};

export default MainContent;
