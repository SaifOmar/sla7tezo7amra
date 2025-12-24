"use client";

import { useState } from "react";
import Link from "next/link";
import { Post } from "@/types";

interface FeaturedCarouselProps {
  posts: Post[];
}

export default function FeaturedCarousel({ posts }: FeaturedCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % posts?.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + posts?.length) % posts?.length);
  };

  // Get 5 visible posts with the center one highlighted
  const getVisiblePosts = () => {
    const visible = [];
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + posts?.length) % posts?.length;
      visible.push({ post: posts[index], isCenter: i === 0 });
    }
    return visible;
  };

  const visiblePosts = getVisiblePosts();

  return (
    <div className="relative w-full">
      <div className="max-w-[1800px] mx-auto px-20">
        {/* Carousel Container */}
        <div className="relative h-[550px] flex items-center justify-center">
          <div className="flex items-center justify-center gap-6 w-full transition-all duration-1000 ease-out">
            {visiblePosts.map(({ post, isCenter }, idx) => (
              <Link key={`${post?.id}-${idx}`} href={`/posts/${post?.slug}`} className={`group transition-all duration-1000 ease-out ${isCenter ? "flex-shrink-0 w-[28%]" : "flex-shrink-0 w-[18%] opacity-75"}`}>
                <div className={`relative rounded-xl overflow-hidden shadow-2xl transition-all duration-1000 ease-out ${isCenter ? "h-[500px]" : "h-[400px]"}`}>
                  <img src={`${post?.metadata.featured_image.imgix_url}?w=700&h=700&fit=crop&auto=format,compress`} alt={post?.metadata.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className={`absolute bottom-0 left-0 right-0 p-6 transition-all duration-1000 ease-out ${isCenter ? "opacity-100" : "opacity-90"}`}>
                    <h3 className={`font-bold text-white mb-2 line-clamp-2 transition-all duration-1000 ease-out ${isCenter ? "text-2xl" : "text-lg"}`}>{post?.metadata.title}</h3>
                    <div className={`transition-all duration-1000 ease-out overflow-hidden ${isCenter ? "max-h-20 opacity-100" : "max-h-0 opacity-0"}`}>{post?.metadata.excerpt && <p className="text-sm text-gray-200 line-clamp-2 mb-3">{post?.metadata.excerpt}</p>}</div>
                    <div className="flex items-center gap-3 text-sm text-gray-300">
                      <span className="flex items-center gap-1">❤️ {post?.metadata.likes_count}</span>
                      <span className="flex items-center gap-1">👁️ {post?.metadata.views_count}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Left Arrow */}
        <button onClick={goToPrev} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-xl transition-all z-20 hover:scale-110" aria-label="Previous">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Right Arrow */}
        <button onClick={goToNext} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-xl transition-all z-20 hover:scale-110" aria-label="Next">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
