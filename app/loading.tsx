export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12 animate-pulse">
        <div className="h-12 bg-gray-200 rounded w-96 mx-auto mb-4" />
        <div className="h-6 bg-gray-200 rounded w-64 mx-auto" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="h-96 bg-gray-200 rounded-2xl" />
          </div>
        ))}
      </div>
    </div>
  )
}