import React from 'react';
import Image from 'next/image';

interface VideoProps {
  video: {
    snippet: {
      title: string;
      thumbnails: { high: { url: string } };
      publishedAt: string;
    };
  };
  featured?: boolean;
}

export default function VideoCard({ video, featured }: VideoProps) {
  const { snippet } = video;

  return (
    <div className={`group rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all bg-white border border-gray-100 ${featured ? 'h-full' : 'flex gap-4'}`}>
      <div className={`relative overflow-hidden ${featured ? 'h-80' : 'h-24 w-40 shrink-0'}`}>
        <Image 
          src={snippet.thumbnails.high.url} 
          alt={snippet.title} 
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className={`p-4 ${featured ? '' : 'flex flex-col justify-center'}`}>
        <h3 className={`font-semibold text-gray-900 line-clamp-2 ${featured ? 'text-2xl mt-4' : 'text-sm'}`}>
          {snippet.title}
        </h3>
        <p className="text-xs text-gray-500 mt-2">
          {new Date(snippet.publishedAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}