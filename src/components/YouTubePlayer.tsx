import { useMusic } from "@/contexts/MusicContext";

const YouTubePlayer = () => {
  const { currentTrack, isPlaying } = useMusic();

  if (!currentTrack) return null;

  // Hidden player — audio only, no visible video
  return (
    <div className="fixed" style={{ width: 1, height: 1, overflow: 'hidden', opacity: 0, pointerEvents: 'none', position: 'fixed', top: -9999, left: -9999 }}>
      <iframe
        src={`https://www.youtube.com/embed/${currentTrack.id}?autoplay=${isPlaying ? 1 : 0}&enablejsapi=1`}
        allow="autoplay; encrypted-media"
        title="YouTube audio player"
        width="1"
        height="1"
      />
    </div>
  );
};

export default YouTubePlayer;
