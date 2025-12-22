# Modern Blog Platform

![App Preview](https://imgix.cosmicjs.com/b0790220-df55-11f0-ad1f-f32054a81beb-photo-1517694712202-14dd9538aa97-1766421957123.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, responsive blog platform built with Next.js 16 and Cosmic CMS. Features beautiful image overlay cards, comments, likes, and view tracking.

## Features

- 📝 Beautiful blog post cards with text overlays on featured images
- 💬 Interactive comment system for each post
- ❤️ Like and view count tracking
- 👤 Single author system with bio and avatar
- 📱 Fully responsive design
- 🎨 Modern UI with Tailwind CSS
- ⚡ Server-side rendering for optimal performance
- 🖼️ Automatic image optimization with imgix

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6949728dfc036000e89797fb&clone_repository=69497680fc036000e8979875)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a content model for a blog with posts, only one author, likes, comments, and view count, and posts show up as preview cards with the text layed on top of the image (if images were to be found)"

### Code Generation Prompt

> "Based on the content model I created for 'Create a content model for a blog with posts, only one author, likes, comments, and view count, and posts show up as preview cards with the text layed on top of the image (if images were to be found)', now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Next.js 16**: React framework with App Router
- **Cosmic CMS**: Headless CMS for content management
- **Tailwind CSS**: Utility-first CSS framework
- **TypeScript**: Type-safe development
- **React Markdown**: Markdown rendering for blog content

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account and bucket

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   bun install
   ```

3. Create a `.env.local` file with your Cosmic credentials:
   ```env
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```

4. Run the development server:
   ```bash
   bun dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

## Cosmic SDK Examples

### Fetching Posts
```typescript
const { objects: posts } = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching Comments for a Post
```typescript
const { objects: comments } = await cosmic.objects
  .find({ 
    type: 'comments',
    'metadata.post': postId 
  })
  .props(['id', 'title', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

This application uses Cosmic CMS for content management:

- **Posts**: Main blog content with featured images, author info, likes, and views
- **Comments**: User comments linked to specific posts
- **Author Information**: Embedded in each post (name, bio, avatar)
- **Engagement Metrics**: Likes and view counts tracked per post

All content is fetched server-side for optimal SEO and performance.

## Deployment Options

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Click the deploy button
2. Connect your repository
3. Add environment variables (COSMIC_BUCKET_SLUG, COSMIC_READ_KEY, COSMIC_WRITE_KEY)
4. Deploy

### Deploy to Netlify

1. Connect your repository
2. Build command: `bun run build`
3. Publish directory: `.next`
4. Add environment variables

## Environment Variables

Set these in your deployment platform:

- `COSMIC_BUCKET_SLUG`: Your Cosmic bucket slug
- `COSMIC_READ_KEY`: Your Cosmic read key
- `COSMIC_WRITE_KEY`: Your Cosmic write key

<!-- README_END -->