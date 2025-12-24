'use client'

import { useState } from 'react'
import { MessageCircle, Loader } from 'lucide-react'

interface CommentFormProps {
  postId: string
  onCommentAdded?: () => void
}

export default function CommentForm({ postId, onCommentAdded }: CommentFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [comment, setComment] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    if (!name.trim() || !email.trim() || !comment.trim()) {
      setError('Please fill in all fields')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/posts/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId,
          author_name: name,
          email,
          comment_text: comment,
        }),
      })

      if (response.ok) {
        setSuccess(true)
        setName('')
        setEmail('')
        setComment('')
        onCommentAdded?.()
        // Reset success message after 3 seconds
        setTimeout(() => setSuccess(false), 3000)
      } else {
        const data = await response.json()
        setError(data.error || 'Failed to submit comment')
      }
    } catch (err) {
      setError('Error submitting comment. Please try again.')
      console.error('Error submitting comment:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-900 rounded-lg p-8 border border-gray-800 space-y-4">
      <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <MessageCircle className="w-6 h-6" />
        Leave a Comment
      </h3>

      {error && (
        <div className="p-4 bg-red-900/20 border border-red-700 rounded-lg text-red-300 text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="p-4 bg-green-900/20 border border-green-700 rounded-lg text-green-300 text-sm">
          Comment submitted successfully! It will appear after moderation.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
            Name *
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isLoading}
            placeholder="Your name"
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all disabled:opacity-50"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
            Email *
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            placeholder="your@email.com"
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all disabled:opacity-50"
          />
        </div>
      </div>

      <div>
        <label htmlFor="comment" className="block text-sm font-medium text-gray-300 mb-2">
          Comment *
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          disabled={isLoading}
          placeholder="Share your thoughts..."
          rows={5}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none disabled:opacity-50"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader className="w-5 h-5 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <MessageCircle className="w-5 h-5" />
            Submit Comment
          </>
        )}
      </button>
    </form>
  )
}
