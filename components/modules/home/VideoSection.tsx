import React from 'react';
import VideoCard, { YouTubeVideo } from './VideoCard';

async function getVideos(): Promise<YouTubeVideo[]> {
  const channelId = process.env.YOUTUBE_CHANNEL_ID;
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!channelId || !apiKey) {
    console.warn('YouTube credentials missing. Showing mock videos.');
    return getMockVideos();
  }

  try {
    // 1. Get latest 5 videos from channel
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=5&order=date&type=video&key=${apiKey}`;
    const searchRes = await fetch(searchUrl, { next: { revalidate: 3600 } });
    
    if (!searchRes.ok) {
      console.warn(`YouTube API Error: ${searchRes.status}. Falling back to mock videos.`);
      return getMockVideos();
    }

    const searchData = await searchRes.json();
    const videoIds = searchData.items?.map((item: any) => item.id.videoId).join(',') || '';

    if (!videoIds) {
      return getMockVideos();
    }

    // 2. Get video details (views, duration, tags, etc.)
    const statsUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoIds}&key=${apiKey}`;
    const statsRes = await fetch(statsUrl, { next: { revalidate: 3600 } });
    
    if (!statsRes.ok) {
      console.warn(`YouTube API Error: ${statsRes.status}. Falling back to mock videos.`);
      return getMockVideos();
    }

    const statsData = await statsRes.json();
    return statsData.items || getMockVideos();
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    return getMockVideos();
  }
}

function getMockVideos(): YouTubeVideo[] {
  // Using valid Islamic YouTube IDs so the iframes actually work
  return [
    { id: 'VYGfTuAk9dM', snippet: { title: 'The Beauty of Tawakkul (Complete Trust in Allah)', tags: ['Featured Video'], thumbnails: { high: { url: 'https://i.ytimg.com/vi/VYGfTuAk9dM/hqdefault.jpg' } }, publishedAt: new Date(Date.now() - 3*24*60*60*1000).toISOString() }, statistics: { viewCount: '15000' } },
    { id: 'qpO_WAtTQyA', snippet: { title: 'Lessons from the Life of Prophet Muhammad ﷺ', tags: ['Seerah Series'], thumbnails: { high: { url: 'https://i.ytimg.com/vi/qpO_WAtTQyA/hqdefault.jpg' } }, publishedAt: new Date(Date.now() - 7*24*60*60*1000).toISOString() }, statistics: { viewCount: '9200' } },
    { id: 'tQHAwV9B8hQ', snippet: { title: 'Beautiful Quran Recitation that Soothes the Heart', tags: ['Quran Recitation'], thumbnails: { high: { url: 'https://i.ytimg.com/vi/tQHAwV9B8hQ/hqdefault.jpg' } }, publishedAt: new Date(Date.now() - 8*24*60*60*1000).toISOString() }, statistics: { viewCount: '7100' } },
    { id: 'R4-oMxCK4x8', snippet: { title: 'Power of Istighfar in Difficult Times', tags: ['Daily Reminders'], thumbnails: { high: { url: 'https://i.ytimg.com/vi/R4-oMxCK4x8/hqdefault.jpg' } }, publishedAt: new Date(Date.now() - 14*24*60*60*1000).toISOString() }, statistics: { viewCount: '6300' } },
    { id: 'ah5BPSZBEdU', snippet: { title: 'How to Improve Your Salah (Prayer)', tags: ['Fiqh Series'], thumbnails: { high: { url: 'https://i.ytimg.com/vi/ah5BPSZBEdU/hqdefault.jpg' } }, publishedAt: new Date(Date.now() - 15*24*60*60*1000).toISOString() }, statistics: { viewCount: '5800' } },
  ];
}

export default async function VideoSection() {
  const videos = await getVideos();

  if (!videos || videos.length === 0) {
    return null;
  }

  const featuredVideo = videos[0];
  const gridVideos = videos.slice(1, 4); // Only 3 small videos to give them more breathing room

  return (
    <section className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 mt-10 relative z-20 pb-10">
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-4 border-b border-gray-100">
          <h2 className="text-xl md:text-2xl font-serif font-bold text-slate-800 tracking-wide uppercase">
            LEARN THROUGH VIDEO
          </h2>
          <a 
            href={`https://www.youtube.com/channel/${process.env.YOUTUBE_CHANNEL_ID || ''}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-emerald-800 hover:text-emerald-600 transition-colors flex items-center gap-2 mt-3 sm:mt-0"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
            </svg>
            Visit Our YouTube Channel
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {/* Featured Video (Large) spans 2 cols */}
          <div className="lg:col-span-2">
            <VideoCard video={featuredVideo} featured />
          </div>
          
          {/* Other 3 Videos (Grid) span 1 col each */}
          {gridVideos.map((video) => (
            <div key={video.id} className="lg:col-span-1">
              <VideoCard video={video} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}