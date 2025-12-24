'use client'

import { useState } from 'react'

interface PostStatsProps {
  postId: string
  initialLikes: number
  views_count: number
  onLikesUpdate?: (newCount: number) => void
}

export default function PostStats({ postId, initialLikes, views_count, onLikesUpdate }: PostStatsProps) {
  const [likes, setLikes] = useState(initialLikes)

  const handleLikesUpdate = (newCount: number) => {
    setLikes(newCount)
    onLikesUpdate?.(newCount)
  }

  return (
    <div className="flex justify-between items-center mb-8 p-4 bg-gradient-to-r from-white to-gray-100 rounded-xl border border-gray-200 shadow-sm">
      {/* Likes */}
      <div className="flex items-center gap-3">
        <span className="text-2xl">❤️</span>
        <div>
          <div className="text-sm text-gray-600">Likes</div>
          <div className="text-xl font-bold text-rose-600">{likes}</div>
        </div>
      </div>

      {/* Views */}
      <div className="flex items-center gap-3">
        <span className="text-2xl">👁️</span>
        <div>
          <div className="text-sm text-gray-600">Views</div>
          <div className="text-xl font-bold text-blue-600">{views_count}</div>
        </div>
      </div>
    </div>
  )
}
