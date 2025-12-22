import { Comment } from '@/types'

interface CommentListProps {
  comments: Comment[]
}

export default function CommentList({ comments }: CommentListProps) {
  if (comments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No comments yet. Be the first to comment!</p>
      </div>
    )
  }
  
  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <div key={comment.id} className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
              {comment.metadata.author_name.charAt(0).toUpperCase()}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold text-gray-900">
                  {comment.metadata.author_name}
                </span>
                {comment.metadata.created_at && (
                  <span className="text-sm text-gray-500">
                    {new Date(comment.metadata.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                )}
              </div>
              
              <p className="text-gray-700 leading-relaxed">
                {comment.metadata.comment_text}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}