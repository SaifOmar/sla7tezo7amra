import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40 backdrop-blur-sm bg-white/90">
      <nav className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-gray-900 hover:text-primary transition-colors">
            <span>📝</span>
            <span>Modern Blog</span>
          </Link>
          
          <div className="flex items-center gap-6">
            <Link href="/" className="text-gray-700 hover:text-primary transition-colors font-medium">
              Home
            </Link>
            <Link href="/#posts" className="text-gray-700 hover:text-primary transition-colors font-medium">
              Articles
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}