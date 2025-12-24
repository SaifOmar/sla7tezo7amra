import { createBucketClient } from '@cosmicjs/sdk'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Fetch all posts
export async function getPosts() {
  try {
    const response = await cosmic.objects
      .find({ type: 'posts' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);

    console.log("response: ", response);
    const posts = response.objects;
    console.log("posts: ", posts);

    // Manual sorting by published_date (newest first)
    return posts.sort((a: any, b: any) => {
      const dateA = new Date(a.metadata?.published_date || '').getTime();
      const dateB = new Date(b.metadata?.published_date || '').getTime();
      return dateB - dateA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch posts');
  }
}

// Fetch single post by slug
export async function getPost(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'posts',
        slug,
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);

    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw error;
  }
}

// Fetch comments for a specific post
export async function getCommentsByPost(postId: string) {
  try {
    const response = await cosmic.objects
      .find({
        type: 'comments',
        'metadata.post': postId
      })
      .props(['id', 'title', 'metadata'])
      .depth(1);

    const comments = response.objects;

    // Manual sorting by created_at (newest first)
    return comments.sort((a: any, b: any) => {
      const dateA = new Date(a.metadata?.created_at || '').getTime();
      const dateB = new Date(b.metadata?.created_at || '').getTime();
      return dateB - dateA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch comments');
  }
}
