import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-gray-600 mb-8">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <Link
        href="/"
        className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors inline-block"
      >
        Go back home
      </Link>
    </div>
  )
}