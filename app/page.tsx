import { getPosts } from "@/lib/cosmic";
import FeaturedCarousel from "@/components/FeaturedCarousel";
import { Post } from "@/types";

export default async function HomePage() {
  const posts = (await getPosts()) as Post[];

  return (
    <div className="w-full">
      {/* Hero Section /}
      <div className="max-w-[1600px] mx-auto px-4 pt-12 pb-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-white">Welcome to Our Blog</h1>
          <p className="text-xl text-gray-300">Explore our latest articles and insights</p>
        </div>
      </div>

      {/ Featured Carousel - Full width */}
      {posts.length > 0 ? (
        <div className="w-full py-8">
          <div className="max-w-[1600px] mx-auto px-4 mb-8">
            <h2 className="text-3xl font-bold text-white text-center">Featured Posts</h2>
          </div>
          <FeaturedCarousel posts={posts} />
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No posts yet. Check back soon!</p>
        </div>
      )}
    </div>
  );
}
