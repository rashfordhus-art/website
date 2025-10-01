to px-6 lg:px-12 xl:px-24">
            <div className="max-w-5xl mx-auto">
              {/* Article Body */}
              <div
                className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-navy-900 dark:prose-headings:text-white prose-a:text-navy-600 dark:prose-a:text-yellow-400 prose-strong:text-navy-900 dark:prose-strong:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              <style jsx>{`
                .prose {
                  line-height: 1.8;
                }
                .prose h1 {
                  font-size: 2.5rem;
                  font-weight: 800;
                  margin-top: 2rem;
                  margin-bottom: 1.5rem;
                  color: #1a3a5c;
                }
                .prose h2 {
                  font-size: 2rem;
                  font-weight: 700;
                  margin-top: 2rem;
                  margin-bottom: 1rem;
                  color: #1a3a5c;
                  border-bottom: 2px solid #ffd500;
                  padding-bottom: 0.5rem;
                }
                .prose h3 {
                  font-size: 1.5rem;
                  font-weight: 600;
                  margin-top: 1.5rem;
                  margin-bottom: 0.75rem;
                  color: #1a3a5c;
                }
                .prose p {
                  margin-bottom: 1.5rem;
                  font-size: 1.1rem;
                  line-height: 1.8;
                  color: #374151 !important;
                }
                .dark .prose p {
                  color: #d1d5db !important;
                }
                .prose ul, .prose ol {
                  margin: 1.5rem 0;
                  padding-left: 2rem;
                }
                .prose li {
                  margin-bottom: 0.75rem;
                  font-size: 1.1rem;
                  line-height: 1.7;
                  color: #374151 !important;
                }
                .dark .prose li {
                  color: #d1d5db !important;
                }
                .prose blockquote {
                  border-left: 4px solid #ffd500;
                  background: #f9fafb;
                  padding: 1.5rem 2rem;
                  margin: 2rem 0;
                  font-style: italic;
                  font-size: 1.2rem;
                  color: #1a3a5c;
                }
                .prose table {
                  width: 100%;
                  margin: 2rem 0;
                  border-collapse: collapse;
                  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                  border-radius: 0.5rem;
                  overflow: hidden;
                }
                .prose th {
                  background: #1a3a5c;
                  color: white;
                  padding: 1rem;
                  text-align: left;
                  font-weight: 600;
                }
                .prose td {
                  padding: 1rem;
                  border-bottom: 1px solid #e5e7eb;
                }
                .prose tr:nth-child(even) {
                  background: #f9fafb;
                }
                .prose code {
                  background: #f3f4f6;
                  padding: 0.25rem 0.5rem;
                  border-radius: 0.25rem;
                  font-family: 'Monaco', 'Menlo', monospace;
                  font-size: 0.9rem;
                  color: #1a3a5c;
                }
                .prose pre {
                  background: #1f2937;
                  color: #f9fafb;
                  padding: 1.5rem;
                  border-radius: 0.5rem;
                  overflow-x: auto;
                  margin: 2rem 0;
                }
                .prose img {
                  border-radius: 0.5rem;
                  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
                  margin: 2rem 0;
                  max-width: 100%;
                  height: auto;
                }
                .prose a {
                  color: #1a3a5c;
                  text-decoration: underline;
                  text-decoration-color: #ffd500;
                  text-underline-offset: 3px;
                  font-weight: 500;
                }
                .prose a:hover {
                  color: #ffd500;
                }
                .prose strong {
                  font-weight: 700;
                  color: #1a3a5c;
                }
                .prose em {
                  font-style: italic;
                  color: #374151;
                }
                .dark .prose h1,
                .dark .prose h2,
                .dark .prose h3 {
                  color: white !important;
                }
                .dark .prose strong {
                  color: #ffd500 !important;
                }
                .dark .prose em {
                  color: #d1d5db !important;
                }
                .dark .prose blockquote {
                  background: #374151;
                  color: #f9fafb !important;
                }
                .dark .prose th {
                  background: #374151;
                }
                .dark .prose tr:nth-child(even) {
                  background: #374151;
                }
                .dark .prose td {
                  color: #d1d5db !important;
                }
                .dark .prose code {
                  background: #374151;
                  color: #ffd500;
                }
              `}</style>

              {/* Share Section */}
              <div className="flex items-center justify-between pt-8 mt-8 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={shareArticle}
                  className="flex items-center gap-2 text-navy-600 dark:text-yellow-400 hover:text-navy-700 dark:hover:text-yellow-300 transition-colors font-medium"
                >
                  <Share2 className="w-5 h-5" />
                  Share Article
                </button>

                <button
                  onClick={() => navigate('/news')}
                  className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 text-navy-900 dark:text-white px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back to News
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="bg-gray-50 dark:bg-gray-900 py-16">
            <div className="container mx-auto px-6 lg:px-12 xl:px-24">
              <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl lg:text-4xl font-bold text-navy-900 dark:text-white mb-10">
                  Related Articles
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                {relatedArticles.map((relatedArticle) => (
                  <Link
                    key={relatedArticle.slug}
                    to={`/news/${relatedArticle.slug}`}
                    className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:transform hover:scale-[1.02]"
                  >
                    <div className="aspect-video overflow-hidden relative">
                      <img
                        src={relatedArticle.image}
                        alt={relatedArticle.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={handleImageError}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      <div className="absolute top-4 left-4">
                        <div className="flex items-center gap-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-navy-900 dark:text-white px-3 py-1.5 rounded-full text-sm font-medium">
                          {getCategoryIcon(relatedArticle.category)}
                          {relatedArticle.category}
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                        <Calendar className="w-4 h-4" />
                        {formatDate(relatedArticle.date)}
                      </div>
                      <h3 className="text-xl font-bold text-navy-900 dark:text-white group-hover:text-navy-700 dark:group-hover:text-yellow-400 transition-colors line-clamp-2 mb-3">
                        {relatedArticle.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3 mb-4">
                        {relatedArticle.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-navy-600 dark:text-yellow-400 font-semibold text-sm transition-colors duration-200 group-hover:gap-3">
                          Read Article <ChevronRight className="w-4 h-4" />
                        </div>
                        <div className="text-xs text-gray-400 dark:text-gray-500">
                          {Math.ceil(relatedArticle.content.length / 1000)} min read
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </article>
    </>
  );
};

export default NewsArticle;
