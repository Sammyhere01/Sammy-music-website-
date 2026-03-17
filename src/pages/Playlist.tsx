import { Music, Play, Clock, MoreHorizontal } from "lucide-react";
import album1 from "@/assets/album-1.jpg";
import album2 from "@/assets/album-2.jpg";
import album3 from "@/assets/album-3.jpg";

const playlists = [
  { name: "Neon Nights", tracks: 24, duration: "1h 32m", img: album1 },
  { name: "Lunar Vibes", tracks: 18, duration: "58m", img: album2 },
  { name: "Midnight Lo-Fi", tracks: 32, duration: "2h 10m", img: album3 },
];

const tracks = [
  { title: "Cyberfunk Chaos", artist: "Neon Riot", duration: "3:24", img: album1 },
  { title: "Lunar Dreams", artist: "Astrid", duration: "4:12", img: album2 },
  { title: "Midnight Rain", artist: "Lo Fi Lovers", duration: "2:58", img: album3 },
  { title: "Digital Pulse", artist: "Neon Riot", duration: "3:45", img: album1 },
  { title: "Starlight", artist: "Astrid", duration: "5:01", img: album2 },
];

const PlaylistPage = () => {
  return (
    <div className="flex-1 overflow-y-auto scrollbar-cyber p-6">
      <h1 className="text-2xl font-bold font-display neon-glow-green mb-6">PLAYLISTS</h1>

      {/* Playlist cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {playlists.map((pl) => (
          <div key={pl.name} className="bg-card rounded-xl border border-border overflow-hidden hover:neon-border-green transition-all cursor-pointer group">
            <img src={pl.img} alt={pl.name} className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300" />
            <div className="p-3">
              <p className="font-bold font-body text-foreground">{pl.name}</p>
              <p className="text-xs text-muted-foreground">{pl.tracks} tracks · {pl.duration}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Track list */}
      <div>
        <h2 className="text-lg font-bold font-display mb-4">RECENTLY PLAYED</h2>
        {tracks.map((track, i) => (
          <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted transition-all cursor-pointer group">
            <span className="text-xs text-muted-foreground w-6 text-right font-mono">{i + 1}</span>
            <img src={track.img} alt={track.title} className="w-10 h-10 rounded-md object-cover" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold font-body text-foreground truncate">{track.title}</p>
              <p className="text-xs text-muted-foreground">{track.artist}</p>
            </div>
            <span className="text-xs text-muted-foreground font-mono">{track.duration}</span>
            <MoreHorizontal size={16} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaylistPage;
