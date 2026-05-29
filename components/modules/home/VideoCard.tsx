import React from 'react';
import Image from 'next/image';

export interface YouTubeVideo {
  id: string;
  snippet: {
    title: string;
    publishedAt: string;
    thumbnails: {
      high: { url: string };
      maxres?: { url: string };
    };
    tags?: string[];
  };
  statistics?: {
    viewCount: string;
  };
}

interface VideoProps {
  video: YouTubeVideo;
  featured?: boolean;
}

function formatViews(viewCount?: string) {
  if (!viewCount) return '0 views';
  const views = parseInt(viewCount, 10);
  if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M views`;
  if (views >= 1000) return `${(views / 1000).toFixed(1)}K views`;
  return `${views} views`;
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC'
  });
}

export default function VideoCard({ video, featured }: VideoProps) {
  const { snippet, statistics } = video;
  
  // Use actual YouTube thumbnail domains directly to ensure they load properly
  const thumbnailUrl = `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`;
    
  const videoUrl = `https://www.youtube.com/watch?v=${video.id}`;
  const viewsText = formatViews(statistics?.viewCount);
  const dateObj = new Date(snippet.publishedAt);
  const diffTime = Math.abs(new Date().getTime() - dateObj.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const timeAgo = diffDays > 7 ? `${Math.floor(diffDays/7)} week${Math.floor(diffDays/7) > 1 ? 's' : ''} ago` : `${diffDays} days ago`;
  
  const tags = snippet.tags?.slice(0, 1) || ['Islam'];
  const tag = tags[0];

  return (
    <div className={`flex flex-col h-full bg-white group rounded-2xl transition-all duration-300 ${featured ? '' : 'hover:-translate-y-1 border border-gray-100 p-3'}`}>
      {featured ? (
        <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-slate-900 shadow-sm mb-4 border border-gray-100">
          {/* Functional Iframe for Featured Video */}
          <iframe
            src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1`}
            title={snippet.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0 absolute inset-0"
          ></iframe>
        </div>
      ) : (
        <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-slate-900 shadow-inner mb-3 border border-gray-100/50">
          <iframe
            src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1`}
            title={snippet.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            className="w-full h-full border-0 absolute inset-0"
          ></iframe>
        </div>
      )}
      
      <div className="flex flex-col flex-1 px-1">
        {featured ? (
          <h3 className="font-extrabold text-slate-900 text-xl md:text-2xl leading-tight mb-2 tracking-tight">
            {snippet.title}
          </h3>
        ) : (
          <a href={videoUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-slate-800 text-sm leading-snug mb-1.5 hover:text-emerald-600 transition-colors line-clamp-2">
            {snippet.title}
          </a>
        )}
        
        <div className={`flex flex-col text-[11px] text-slate-500 mb-3 ${featured ? 'gap-1' : ''}`}>
          <div className="flex items-center gap-1.5 font-medium">
            <span className="text-slate-700">AlMuslims</span>
            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
            <span>{viewsText}</span>
            {featured && (
              <>
                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                <span>{timeAgo}</span>
              </>
            )}
          </div>
          {!featured && (
            <div className="mt-0.5 font-medium">{timeAgo}</div>
          )}
        </div>
        
        <div className="mt-auto pt-2">
          {featured ? (
            <span className="inline-block px-3 py-1 text-[11px] font-bold text-white bg-gradient-to-r from-emerald-700 to-emerald-600 rounded-lg shadow-sm border border-emerald-800">
              Featured Video
            </span>
          ) : (
            <span className="inline-block px-2.5 py-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 rounded-md border border-emerald-100/80 shadow-sm transition-colors group-hover:bg-emerald-100 group-hover:border-emerald-200">
              {tag}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}