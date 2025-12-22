// app/posts/[slug]/loading.tsx
export default function PostLoading() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-pulse">
      <div className="h-96 bg-gray-200 rounded-2xl mb-8" />
      
      <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-200">
        <div className="w-16 h-16 bg-gray-200 rounded-full" />
        <div className="flex-1">
          <div className="h-6 bg-gray-200 rounded w-48 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-96" />
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-3/4" />
      </div>
    </div>
  )
}