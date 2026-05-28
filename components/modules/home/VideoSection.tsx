import React from 'react';
import VideoCard from './VideoCard';

// Demo data for layout testing
const mockVideos = [
  { id: { videoId: '1' }, snippet: { title: 'Understanding Islam: The Basics', thumbnails: { high: { url: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?q=80&w=600' } }, publishedAt: '2026-05-20' } },
  { id: { videoId: '2' }, snippet: { title: 'Daily Prayer Guide', thumbnails: { high: { url: 'https://images.unsplash.com/photo-1585060544812-6b45742d149f?q=80&w=600' } }, publishedAt: '2026-05-22' } },
  { id: { videoId: '3' }, snippet: { title: 'The Beauty of Quran', thumbnails: { high: { url: 'https://images.unsplash.com/photo-1609599006353-e129aaab9c6c?q=80&w=600' } }, publishedAt: '2026-05-24' } },
  { id: { videoId: '4' }, snippet: { title: 'Hadith of the Day', thumbnails: { high: { url: 'https://images.unsplash.com/photo-1591928080277-2b7336582a89?q=80&w=600' } }, publishedAt: '2026-05-25' } },
  { id: { videoId: '5' }, snippet: { title: 'Seerah: Life of the Prophet', thumbnails: { high: { url: 'https://images.unsplash.com/photo-1584551400236-791f9b33a0cc?q=80&w=600' } }, publishedAt: '2026-05-26' } },
];

export default function VideoSection() {
  // Demo mode: direct map use karenge
  const items = mockVideos;

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Latest Videos</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Featured Video (Large) */}
        <div className="md:col-span-2">
          <VideoCard video={items[0]} featured />
        </div>
        
        {/* Other 4 Videos (Grid) */}
        <div className="flex flex-col gap-4">
          {items.slice(1).map((video) => (
            <VideoCard key={video.id.videoId} video={video} />
          ))}
        </div>
      </div>
    </section>
  );
}