import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { YouTubeVideo } from "@/lib/youtube";

interface MusicContextType {
  currentTrack: YouTubeVideo | null;
  queue: YouTubeVideo[];
  isPlaying: boolean;
  playTrack: (track: YouTubeVideo) => void;
  setQueue: (tracks: YouTubeVideo[]) => void;
  playNext: () => void;
  playPrev: () => void;
  togglePlay: () => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider = ({ children }: { children: ReactNode }) => {
  const [currentTrack, setCurrentTrack] = useState<YouTubeVideo | null>(null);
  const [queue, setQueue] = useState<YouTubeVideo[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const playTrack = useCallback((track: YouTubeVideo) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    setQueue((prev) => {
      const exists = prev.findIndex((t) => t.id === track.id);
      if (exists >= 0) {
        setHistoryIndex(exists);
        return prev;
      }
      const newQueue = [...prev, track];
      setHistoryIndex(newQueue.length - 1);
      return newQueue;
    });
  }, []);

  const playNext = useCallback(() => {
    if (queue.length === 0) return;
    const nextIndex = (historyIndex + 1) % queue.length;
    setHistoryIndex(nextIndex);
    setCurrentTrack(queue[nextIndex]);
    setIsPlaying(true);
  }, [queue, historyIndex]);

  const playPrev = useCallback(() => {
    if (queue.length === 0) return;
    const prevIndex = historyIndex <= 0 ? queue.length - 1 : historyIndex - 1;
    setHistoryIndex(prevIndex);
    setCurrentTrack(queue[prevIndex]);
    setIsPlaying(true);
  }, [queue, historyIndex]);

  const togglePlay = useCallback(() => {
    setIsPlaying((p) => !p);
  }, []);

  return (
    <MusicContext.Provider value={{ currentTrack, queue, isPlaying, playTrack, setQueue, playNext, playPrev, togglePlay }}>
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic must be used within MusicProvider");
  return ctx;
};
