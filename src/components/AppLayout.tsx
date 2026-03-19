import Sidebar from "@/components/Sidebar";
import RightPanel from "@/components/RightPanel";
import MobileNav from "@/components/MobileNav";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { useMusic } from "@/contexts/MusicContext";
import { Play, Pause, Music } from "lucide-react";
import nowPlayingImg from "@/assets/now-playing.jpg";

const MobilePlayer = () => {
  const { currentTrack, isPlaying, togglePlay } = useMusic();
  const [showRight, setShowRight] = useState(false);

  if (showRight) {
    return (
      <div className="fixed inset-0 z-50 bg-background md:hidden">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <span className="text-sm font-display text-foreground">NOW PLAYING</span>
          <button onClick={() => setShowRight(false)} className="text-primary text-sm font-body">Close</button>
        </div>
        <div className="overflow-y-auto h-[calc(100%-56px)]">
          <RightPanel />
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => setShowRight(true)}
      className="fixed bottom-16 left-0 right-0 z-40 md:hidden bg-card border-t border-border px-4 py-2 flex items-center gap-3 cursor-pointer"
    >
      <img
        src={currentTrack?.thumbnail || nowPlayingImg}
        alt="Now playing"
        className="w-10 h-10 rounded-lg object-cover border border-border"
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-body font-semibold text-foreground truncate">
          {currentTrack?.title || "No track playing"}
        </p>
        <p className="text-xs text-muted-foreground truncate">
          {currentTrack?.channelTitle || "Tap to open player"}
        </p>
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); togglePlay(); }}
        className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0"
      >
        {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
      </button>
    </div>
  );
};

const AppLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop sidebar */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      <Outlet />

      {/* Desktop right panel */}
      <div className="hidden lg:flex">
        <RightPanel />
      </div>

      {/* Mobile mini player */}
      <MobilePlayer />

      {/* Mobile bottom nav */}
      <MobileNav />
    </div>
  );
};

export default AppLayout;
