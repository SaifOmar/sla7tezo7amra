import { NextRequest, NextResponse } from 'next/server'
import { cosmic } from '@/lib/cosmic'

export async function POST(request: NextRequest) {
  try {
    const { postId } = await request.json()

    if (!postId) {
      return NextResponse.json(
        { error: 'Post ID is required' },
        { status: 400 }
      )
    }

    // Fetch the post to get current likes count
    const post = await cosmic.objects.findOne({
      type: 'posts',
      id: postId,
    }).props(['id', 'metadata']).depth(1)

    if (!post.object) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    // Increment likes count - only update this single field
    const currentLikes = post.object.metadata?.likes_count || 0
    const newLikeCount = currentLikes + 1

    // Update using updateOne with only the field we want to change
    await cosmic.objects.updateOne(postId, {
      metadata: {
        likes_count: newLikeCount,
      },
    })

    return NextResponse.json(
      { success: true, likes: newLikeCount },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error liking post:', error)
    return NextResponse.json(
      { error: 'Failed to like post' },
      { status: 500 }
    )
  }
}
