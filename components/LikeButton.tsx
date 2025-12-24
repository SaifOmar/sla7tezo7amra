'use client'

import { useState, useEffect } from 'react'
import { Heart } from 'lucide-react'

interface LikeButtonProps {
  postId: string
  initialLikes: number
}

export default function LikeButton({ postId, initialLikes }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes)
  const [isLoading, setIsLoading] = useState(false)
  const [hasLiked, setHasLiked] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Check localStorage on mount to see if user already liked this post
  useEffect(() => {
    setIsClient(true)
    const likeKey = `post-${postId}-liked`
    const userHasLiked = localStorage.getItem(likeKey) === 'true'
    setHasLiked(userHasLiked)
  }, [postId])

  const handleLike = async () => {
    if (isLoading || hasLiked) return

    setIsLoading(true)
    try {
      const response = await fetch('/api/posts/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId }),
      })

      if (response.ok) {
        const data = await response.json()
        const newLikeCount = data.likes
        setLikes(newLikeCount)
        setHasLiked(true)
        
        // Store in localStorage to prevent duplicate likes
        const likeKey = `post-${postId}-liked`
        localStorage.setItem(likeKey, 'true')
      } else {
        console.error('Failed to like post')
      }
    } catch (error) {
      console.error('Error liking post:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Don't render until client-side hydration is complete
  if (!isClient) {
    return null
  }

  return (
    <button
      onClick={handleLike}
      disabled={isLoading || hasLiked}
      className={`flex items-center gap-3 px-6 py-3 rounded-lg font-semibold transition-all ${
        hasLiked
          ? 'bg-rose-100 text-rose-700 cursor-not-allowed'
          : 'bg-gray-800 text-white hover:bg-gray-700'
      } disabled:opacity-50`}
      title={hasLiked ? 'You already liked this post' : 'Like this post'}
    >
      <Heart className={`w-5 h-5 ${hasLiked ? 'fill-current' : ''}`} />
      <span>{likes} {likes === 1 ? 'Like' : 'Likes'}</span>
    </button>
  )
}
