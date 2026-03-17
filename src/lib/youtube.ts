// YouTube Data API v3 Service
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY || "AIzaSyD9tlE0TAJ33cvphorT7lG9yHuTGWoaK4A";
const BASE_URL = "https://www.googleapis.com/youtube/v3";

export interface YouTubeVideo {
  id: string;
  title: string;
  channelTitle: string;
  thumbnail: string;
  thumbnailHigh: string;
  publishedAt: string;
  viewCount?: string;
  duration?: string;
}

interface YouTubeSearchItem {
  id: { videoId?: string; kind: string };
  snippet: {
    title: string;
    channelTitle: string;
    publishedAt: string;
    thumbnails: {
      default: { url: string };
      medium: { url: string };
      high: { url: string };
    };
  };
}

interface YouTubeVideoItem {
  id: string;
  snippet: {
    title: string;
    channelTitle: string;
    publishedAt: string;
    thumbnails: {
      default: { url: string };
      medium: { url: string };
      high: { url: string };
    };
  };
  contentDetails?: { duration: string };
  statistics?: { viewCount: string };
}

function parseItem(item: YouTubeSearchItem): YouTubeVideo {
  return {
    id: item.id.videoId || "",
    title: item.snippet.title,
    channelTitle: item.snippet.channelTitle,
    thumbnail: item.snippet.thumbnails.medium.url,
    thumbnailHigh: item.snippet.thumbnails.high.url,
    publishedAt: item.snippet.publishedAt,
  };
}

function parseVideoItem(item: YouTubeVideoItem): YouTubeVideo {
  return {
    id: item.id,
    title: item.snippet.title,
    channelTitle: item.snippet.channelTitle,
    thumbnail: item.snippet.thumbnails.medium.url,
    thumbnailHigh: item.snippet.thumbnails.high.url,
    publishedAt: item.snippet.publishedAt,
    viewCount: item.statistics?.viewCount,
    duration: item.contentDetails?.duration,
  };
}

export function formatDuration(iso: string | undefined): string {
  if (!iso) return "0:00";
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return "0:00";
  const h = parseInt(match[1] || "0");
  const m = parseInt(match[2] || "0");
  const s = parseInt(match[3] || "0");
  if (h > 0) return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function formatViews(count: string | undefined): string {
  if (!count) return "0";
  const n = parseInt(count);
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return count;
}

export async function searchVideos(query: string, maxResults = 12): Promise<YouTubeVideo[]> {
  const url = `${BASE_URL}/search?part=snippet&type=video&videoCategoryId=10&q=${encodeURIComponent(query)}&maxResults=${maxResults}&key=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`YouTube API error: ${res.status}`);
  const data = await res.json();
  return (data.items || []).filter((i: YouTubeSearchItem) => i.id.videoId).map(parseItem);
}

export async function getTrendingMusic(maxResults = 12, regionCode = "US"): Promise<YouTubeVideo[]> {
  const url = `${BASE_URL}/videos?part=snippet,contentDetails,statistics&chart=mostPopular&videoCategoryId=10&maxResults=${maxResults}&regionCode=${regionCode}&key=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`YouTube API error: ${res.status}`);
  const data = await res.json();
  return (data.items || []).map(parseVideoItem);
}

export async function getVideoDetails(ids: string[]): Promise<YouTubeVideo[]> {
  const url = `${BASE_URL}/videos?part=snippet,contentDetails,statistics&id=${ids.join(",")}&key=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`YouTube API error: ${res.status}`);
  const data = await res.json();
  return (data.items || []).map(parseVideoItem);
}

export async function getRelatedVideos(videoId: string, maxResults = 10): Promise<YouTubeVideo[]> {
  const url = `${BASE_URL}/search?part=snippet&type=video&videoCategoryId=10&relatedToVideoId=${videoId}&maxResults=${maxResults}&key=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`YouTube API error: ${res.status}`);
  const data = await res.json();
  return (data.items || []).filter((i: YouTubeSearchItem) => i.id.videoId).map(parseItem);
}

export function getApiKeyStatus(): boolean {
  return API_KEY !== "YOUR_YOUTUBE_API_KEY_HERE" && API_KEY.length > 10;
}
