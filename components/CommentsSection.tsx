'use client'

import { useState, useCallback } from 'react'
import { Comment } from '@/types'
import CommentList from '@/components/CommentList'
import CommentForm from '@/components/CommentForm'

interface CommentsSection {
  postId: string
  initialComments: Comment[]
}

export default function CommentsSection({ postId, initialComments }: CommentsSection) {
  const [comments, setComments] = useState<Comment[]>(initialComments)

  const handleCommentAdded = useCallback(async () => {
    try {
      // Fetch updated comments from the API
      const response = await fetch(`/api/posts/comments?postId=${postId}`)
      if (response.ok) {
        const data = await response.json()
        setComments(data.comments)
      }
    } catch (error) {
      console.error('Failed to refresh comments:', error)
    }
  }, [postId])

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-gray-100 text-center">Comments ({comments.length})</h2>
      
      {/* Comment Form */}
      <div className="mb-12">
        <CommentForm postId={postId} onCommentAdded={handleCommentAdded} />
      </div>

      {/* Comments List */}
      <CommentList comments={comments} />
    </div>
  )
}
