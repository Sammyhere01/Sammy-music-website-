import { useState } from "react";
import { Search as SearchIcon, Play, Loader2, AlertTriangle } from "lucide-react";
import { searchVideos, formatViews, getApiKeyStatus, type YouTubeVideo } from "@/lib/youtube";
import { useMusic } from "@/contexts/MusicContext";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const { playTrack, setQueue } = useMusic();
  const hasApiKey = getApiKeyStatus();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setSearched(true);
    try {
      const data = await searchVideos(query);
      setResults(data);
      setQueue(data);
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto scrollbar-cyber p-6">
      <h1 className="text-2xl font-bold font-display neon-glow-green mb-6">SEARCH</h1>

      {!hasApiKey && (
        <div className="flex items-center gap-3 bg-accent/10 border border-accent/30 rounded-lg p-4 mb-6">
          <AlertTriangle size={20} className="text-accent" />
          <div>
            <p className="text-sm font-semibold font-body text-foreground">API Key Not Set</p>
            <p className="text-xs text-muted-foreground">Add your YouTube API key in src/lib/youtube.ts or set VITE_YOUTUBE_API_KEY in your .env file</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSearch} className="flex gap-3 mb-8">
        <div className="relative flex-1">
          <SearchIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for music..."
            className="w-full pl-10 pr-4 py-2.5 bg-muted border border-border rounded-lg text-sm text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
          />
        </div>
        <button type="submit" className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-display text-sm font-bold hover:scale-105 transition-transform">
          {loading ? <Loader2 size={18} className="animate-spin" /> : "SEARCH"}
        </button>
      </form>

      {loading && (
        <div className="flex justify-center py-12">
          <Loader2 className="animate-spin text-primary" size={32} />
        </div>
      )}

      {!loading && results.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((video) => (
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

      {!loading && searched && results.length === 0 && (
        <p className="text-center text-muted-foreground py-12 font-body">No results found. Try a different search.</p>
      )}

      {!searched && !loading && (
        <p className="text-center text-muted-foreground py-12 font-body">Search for your favorite music on YouTube</p>
      )}
    </div>
  );
};

export default SearchPage;
