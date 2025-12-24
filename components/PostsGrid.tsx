'use client'

import { useState, useMemo } from 'react'
import { Post } from '@/types'
import PostCard from '@/components/PostCard'
import SearchBar from '@/components/SearchBar'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PostsGridProps {
  initialPosts: Post[]
  postsPerPage?: number
}

export default function PostsGrid({ initialPosts, postsPerPage = 9 }: PostsGridProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  // Filter posts based on search query
  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return initialPosts

    const query = searchQuery.toLowerCase()
    return initialPosts.filter(post =>
      post.metadata.title.toLowerCase().includes(query) ||
      post.metadata.excerpt?.toLowerCase().includes(query) ||
      post.metadata.author_name.toLowerCase().includes(query)
    )
  }, [initialPosts, searchQuery])

  // Calculate pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  const currentPosts = filteredPosts.slice(startIndex, endIndex)

  // Reset to page 1 when search query changes
  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }

  const goToPreviousPage = () => {
    setCurrentPage(prev => Math.max(1, prev - 1))
  }

  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(totalPages, prev + 1))
  }

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(totalPages, page)))
  }

  return (
    <div className="w-full">
      {/* Search Bar */}
      <div className="max-w-[1600px] mx-auto px-4 py-8">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Results info */}
      {searchQuery && (
        <div className="max-w-[1600px] mx-auto px-4 mb-6">
          <p className="text-gray-400">
            Found <span className="text-white font-semibold">{filteredPosts.length}</span> post{filteredPosts.length !== 1 ? 's' : ''} matching "{searchQuery}"
          </p>
        </div>
      )}

      {/* Posts Grid */}
      {currentPosts.length > 0 ? (
        <>
          <div className="max-w-[1600px] mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentPosts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="max-w-[1600px] mx-auto px-4 py-12">
              <div className="flex items-center justify-center gap-2">
                {/* Previous Button */}
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Page Numbers */}
                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                    // Show first page, last page, current page, and neighbors
                    const isVisible =
                      page === 1 ||
                      page === totalPages ||
                      page === currentPage ||
                      Math.abs(page - currentPage) <= 1

                    if (!isVisible && page !== 2 && page !== totalPages - 1) {
                      return null
                    }

                    if (!isVisible) {
                      return <span key={`ellipsis-${page}`} className="px-2 text-gray-500">...</span>
                    }

                    return (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                          currentPage === page
                            ? 'bg-blue-600 text-white'
                            : 'border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500'
                        }`}
                      >
                        {page}
                      </button>
                    )
                  })}
                </div>

                {/* Next Button */}
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Next page"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Page Info */}
              <div className="text-center mt-4 text-gray-500 text-sm">
                Page {currentPage} of {totalPages} • Showing {currentPosts.length} of {filteredPosts.length} posts
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">
            {searchQuery ? `No posts found matching "${searchQuery}". Try a different search.` : 'No posts yet. Check back soon!'}
          </p>
        </div>
      )}
    </div>
  )
}
