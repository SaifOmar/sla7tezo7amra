// app/posts/[slug]/page.tsx
import { getPost, getCommentsByPost } from '@/lib/cosmic'
import { Post, Comment } from '@/types'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import CommentList from '@/components/CommentList'
import { notFound } from 'next/navigation'

export default async function PostPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params
  const post = await getPost(slug) as Post | null
  
  if (!post) {
    notFound()
  }
  
  const comments = await getCommentsByPost(post.id) as Comment[]
  
  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      {/* Hero Section with Featured Image */}
      <div className="relative h-96 rounded-2xl overflow-hidden mb-8">
        <img
          src={`${post.metadata.featured_image.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`}
          alt={post.metadata.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <h1 className="text-5xl font-bold mb-4">{post.metadata.title}</h1>
          {post.metadata.excerpt && (
            <p className="text-xl text-gray-200">{post.metadata.excerpt}</p>
          )}
        </div>
      </div>
      
      {/* Author Info and Meta */}
      <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-200">
        {post.metadata.author_avatar && (
          <img
            src={`${post.metadata.author_avatar.imgix_url}?w=120&h=120&fit=crop&auto=format,compress`}
            alt={post.metadata.author_name}
            className="w-16 h-16 rounded-full object-cover"
          />
        )}
        <div className="flex-1">
          <div className="font-semibold text-lg">{post.metadata.author_name}</div>
          {post.metadata.author_bio && (
            <div className="text-gray-600 text-sm">{post.metadata.author_bio}</div>
          )}
        </div>
        <div className="flex gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span>❤️</span>
            <span>{post.metadata.likes_count} likes</span>
          </div>
          <div className="flex items-center gap-2">
            <span>👁️</span>
            <span>{post.metadata.views_count} views</span>
          </div>
        </div>
      </div>
      
      {/* Post Content */}
      <div className="prose prose-lg max-w-none mb-12">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.metadata.content}
        </ReactMarkdown>
      </div>
      
      {/* Comments Section */}
      <div className="border-t border-gray-200 pt-12">
        <h2 className="text-3xl font-bold mb-8">
          Comments ({comments.length})
        </h2>
        <CommentList comments={comments} />
      </div>
    </article>
  )
}