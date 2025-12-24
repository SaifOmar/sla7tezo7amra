import { NextRequest, NextResponse } from 'next/server'
import { cosmic } from '@/lib/cosmic'

export async function POST(request: NextRequest) {
  try {
    const { postId, author_name, email, comment_text } = await request.json()

    // Validation
    if (!postId || !author_name || !email || !comment_text) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Fetch the post to verify it exists
    const post = await cosmic.objects.findOne({
      type: 'posts',
      id: postId,
    }).props(['id']).depth(1)

    if (!post.object) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    // Create a new comment object
    const comment = await cosmic.objects.insertOne({
      type: 'comments',
      title: `${author_name}'s comment`,
      slug: `comment-${Date.now()}`,
      metadata: {
        post: postId,
        author_name,
        email,
        comment_text,
      },
    })

    return NextResponse.json(
      {
        success: true,
        comment: comment.object,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error submitting comment:', error)
    return NextResponse.json(
      { error: 'Failed to submit comment' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const postId = request.nextUrl.searchParams.get('postId')

    if (!postId) {
      return NextResponse.json(
        { error: 'Post ID is required' },
        { status: 400 }
      )
    }

    // Fetch comments for the post
    const response = await cosmic.objects.find({
      type: 'comments',
      'metadata.post': postId,
    }).props(['id', 'title', 'metadata']).depth(1)

    const comments = response.objects || []

    // Sort by created_at (newest first)
    const sortedComments = comments.sort((a: any, b: any) => {
      const dateA = new Date(a.metadata?.created_at || '').getTime()
      const dateB = new Date(b.metadata?.created_at || '').getTime()
      return dateB - dateA
    })

    return NextResponse.json({ comments: sortedComments }, { status: 200 })
  } catch (error) {
    console.error('Error fetching comments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch comments' },
      { status: 500 }
    )
  }
}
