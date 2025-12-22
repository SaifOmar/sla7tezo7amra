import { getPosts } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import { Post } from '@/types'

export default async function HomePage() {
  const posts = await getPosts() as Post[]
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">Welcome to Our Blog</h1>
        <p className="text-xl text-gray-600">
          Explore our latest articles and insights
        </p>
      </div>
      
      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No posts yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}