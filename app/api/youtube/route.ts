import { NextResponse } from 'next/server';

export async function GET() {
  const channelId = process.env.YOUTUBE_CHANNEL_ID;
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!channelId || !apiKey) {
    return NextResponse.json(
      { error: 'YouTube credentials are not configured' },
      { status: 500 }
    );
  }

  try {
    // 1. Get latest 5 videos from channel
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=5&order=date&type=video&key=${apiKey}`;
    const searchRes = await fetch(searchUrl, { next: { revalidate: 3600 } });
    
    if (!searchRes.ok) {
      throw new Error(`YouTube API Error: ${searchRes.status}`);
    }

    const searchData = await searchRes.json();
    const videoIds = searchData.items?.map((item: any) => item.id.videoId).join(',') || '';

    if (!videoIds) {
      return NextResponse.json({ items: [] });
    }

    // 2. Get video details (views, duration, tags, etc.)
    const statsUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoIds}&key=${apiKey}`;
    const statsRes = await fetch(statsUrl, { next: { revalidate: 3600 } });
    
    if (!statsRes.ok) {
      throw new Error(`YouTube API Error: ${statsRes.status}`);
    }

    const statsData = await statsRes.json();
    return NextResponse.json({ items: statsData.items || [] });
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch videos' },
      { status: 500 }
    );
  }
}
