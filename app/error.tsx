'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-center">
      <h2 className="text-4xl font-bold mb-4">Something went wrong!</h2>
      <p className="text-gray-600 mb-8">{error.message}</p>
      <button
        onClick={reset}
        className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
      >
        Try again
      </button>
    </div>
  )
}