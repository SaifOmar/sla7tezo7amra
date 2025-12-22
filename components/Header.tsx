import Link from 'next/link'
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-[var(--color-header)] border-b border-gray-200 sticky top-0 z-40 backdrop-blur-sm">
      <nav className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl font-bold text-white transition-colors"
          >
            <Image
              src="/images/logo1.svg"
              alt="logo"
              width={32}
              height={32}
              priority
            />
            <span>Khairy13</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-white-700  transition-colors font-medium">
              Home
            </Link>
            <Link href="/#posts" className="text-white-700  transition-colors font-medium">
              Articles
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
