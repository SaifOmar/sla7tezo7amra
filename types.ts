// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Post type with complete metadata structure
export interface Post extends CosmicObject {
  type: 'posts';
  metadata: {
    title: string;
    excerpt?: string;
    content: string;
    featured_image: {
      url: string;
      imgix_url: string;
    };
    author_name: string;
    author_bio?: string;
    author_avatar?: {
      url: string;
      imgix_url: string;
    };
    likes_count: number;
    views_count: number;
    published_date?: string;
  };
}

// Comment type with post relationship
export interface Comment extends CosmicObject {
  type: 'comments';
  metadata: {
    post: Post;
    author_name: string;
    comment_text: string;
    email?: string;
    created_at?: string;
  };
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip?: number;
}

// Type guards for runtime validation
export function isPost(obj: CosmicObject): obj is Post {
  return obj.type === 'posts';
}

export function isComment(obj: CosmicObject): obj is Comment {
  return obj.type === 'comments';
}