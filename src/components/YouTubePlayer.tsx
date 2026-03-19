import { useMusic } from "@/contexts/MusicContext";
import { useEffect, useRef } from "react";

const YouTubePlayer = () => {
  const { currentTrack, isPlaying, volume, playerRef } = useMusic();
  const prevTrackId = useRef<string | null>(null);

  // Set volume when iframe loads or volume changes
  useEffect(() => {
    if (!playerRef.current?.contentWindow) return;
    const timer = setTimeout(() => {
      playerRef.current?.contentWindow?.postMessage(
        JSON.stringify({ event: "command", func: "setVolume", args: [volume] }),
        "*"
      );
    }, 1000);
    return () => clearTimeout(timer);
  }, [currentTrack?.id, volume, playerRef]);

  if (!currentTrack) return null;

  const isNewTrack = prevTrackId.current !== currentTrack.id;
  if (isNewTrack) prevTrackId.current = currentTrack.id;

  return (
    <div style={{ width: 1, height: 1, overflow: 'hidden', opacity: 0, pointerEvents: 'none', position: 'fixed', top: -9999, left: -9999 }}>
      <iframe
        ref={playerRef}
        key={currentTrack.id}
        src={`https://www.youtube.com/embed/${currentTrack.id}?autoplay=1&enablejsapi=1&origin=${window.location.origin}`}
        allow="autoplay; encrypted-media"
        title="YouTube audio player"
        width="1"
        height="1"
      />
    </div>
  );
};

export default YouTubePlayer;
