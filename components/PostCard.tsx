import Link from 'next/link'
import { Post } from '@/types'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/posts/${post.slug}`} className="group block">
      <article className="relative h-96 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
        {/* Featured Image */}
        <img
          src={`${post.metadata.featured_image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
          alt={post.metadata.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        
        {/* Content Overlay */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
          <h2 className="text-2xl font-bold mb-2 group-hover:text-primary-foreground transition-colors">
            {post.metadata.title}
          </h2>
          
          {post.metadata.excerpt && (
            <p className="text-gray-200 mb-4 line-clamp-2">
              {post.metadata.excerpt}
            </p>
          )}
          
          <div className="flex items-center justify-between text-sm text-gray-300">
            <div className="flex items-center gap-2">
              {post.metadata.author_avatar && (
                <img
                  src={`${post.metadata.author_avatar.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                  alt={post.metadata.author_name}
                  className="w-8 h-8 rounded-full object-cover border-2 border-white/20"
                />
              )}
              <span className="font-medium">{post.metadata.author_name}</span>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <span>❤️</span>
                <span>{post.metadata.likes_count}</span>
              </span>
              <span className="flex items-center gap-1">
                <span>👁️</span>
                <span>{post.metadata.views_count}</span>
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}