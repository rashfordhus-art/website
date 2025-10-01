import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Calendar, ArrowLeft, Share2, Clock, Tag, Award, TrendingUp, Building, ChevronRight } from 'lucide-react';
import { loadNewsArticle, getRecentNews, NewsArticle as NewsArticleType } from '../utils/newsLoader';
import SEOHead from '../components/SEOHead';

const NewsArticle: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<NewsArticleType | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<NewsArticleType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadArticleData = async () => {
      if (!slug) {
        setError('No article slug provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const [articleData, recentArticles] = await Promise.all([
          loadNewsArticle(slug),
          getRecentNews(4)
        ]);

        if (!articleData) {
          setError('Article not found');
          setLoading(false);
          return;
        }

        setArticle(articleData);

        const related = recentArticles.filter(a => a.slug !== slug).slice(0, 3);
        setRelatedArticles(related);

      } catch (err) {
        console.error('Error loading article:', err);
        setError('Failed to load article');
      } finally {
        setLoading(false);
      }
    };

    loadArticleData();
  }, [slug]);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = 'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=800';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Customer Validation':
        return <Award className="w-5 h-5" />;
      case 'Technology':
        return <TrendingUp className="w-5 h-5" />;
      case 'Company News':
        return <Building className="w-5 h-5" />;
      default:
        return <Tag className="w-5 h-5" />;
    }
  };

  const shareArticle = async () => {
    if (!article) return;

    const shareUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: shareUrl
        });
      } catch (err) {
        console.log('Share was cancelled');
      }
    } else {
      navigator.clipboard.writeText(shareUrl);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 pt-20">
        <div className="text-center">
          <div className="animate-pulse">
            <div className="w-16 h-16 bg-navy-600 rounded-full mx-auto mb-4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-48 mx-auto mb-2"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-32 mx-auto"></div>
          </div>
          <p className="text-navy-600 dark:text-white font-medium mt-4">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 pt-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {error || 'Article not found'}
          </h2>
          <button
            onClick={() => navigate('/news')}
            className="inline-flex items-center gap-2 bg-navy-600 text-white px-6 py-3 rounded-lg hover:bg-navy-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to News
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title={`${article.title} | Saher Flow Solutions News`}
        description={article.excerpt}
        keywords={`${article.category}, Saher Flow Solutions, multiphase flow meter, oil gas technology`}
        url={`/news/${article.slug}`}
        image={article.image}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          "headline": article.title,
          "description": article.excerpt,
          "image": article.image,
          "datePublished": article.date,
          "author": {
            "@type": "Organization",
            "name": "Saher Flow Solutions"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Saher Flow Solutions",
            "logo": {
              "@type": "ImageObject",
              "url": "https://saherflow.com/logo.png"
            }
          }
        }}
      />

      <article className="pt-20 bg-white dark:bg-gray-900 min-h-screen">
        {/* Back Button - Sticky */}
        <div className="sticky top-20 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="max-w-[1600px] mx-auto px-8 lg:px-20 xl:px-32 py-4">
            <button
              onClick={() => navigate('/news')}
              className="flex items-center gap-2 text-navy-600 dark:text-yellow-400 hover:text-navy-700 dark:hover:text-yellow-300 transition-colors font-medium text-lg"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to News
            </button>
          </div>
        </div>

        {/* Hero Image - Full Width */}
        <div className="w-full bg-gray-50 dark:bg-gray-800 py-8 lg:py-12">
          <div className="max-w-[1600px] mx-auto px-8 lg:px-20 xl:px-32">
            <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl">
              <div className="aspect-[16/9] lg:aspect-[21/9]">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-contain bg-gray-100 dark:bg-gray-800"
                  onError={handleImageError}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Article Header */}
        <div className="max-w-[1200px] mx-auto px-8 lg:px-20 xl:px-32 py-12 lg:py-16">
          {/* Category & Meta */}
          <div className="flex flex-wrap items-center gap-6 mb-10">
            <div className="flex items-center gap-2 bg-navy-600 dark:bg-yellow-500 text-white dark:text-navy-900 px-5 py-2.5 rounded-full font-semibold text-base">
              {getCategoryIcon(article.category)}
              {article.category}
            </div>
            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400 text-lg">
              <Calendar className="w-5 h-5" />
              <time dateTime={article.date}>
                {formatDate(article.date)}
              </time>
            </div>
            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400 text-lg">
              <Clock className="w-5 h-5" />
              {Math.ceil(article.content.length / 1000)} min read
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-navy-900 dark:text-white leading-[1.1] mb-10 tracking-tight">
            {article.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl lg:text-2xl xl:text-3xl text-gray-700 dark:text-gray-300 leading-relaxed font-light mb-12">
            {article.excerpt}
          </p>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent mb-12"></div>
        </div>

        {/* Article Content */}
        <div className="max-w-[900px] mx-auto px-8 lg:px-16 pb-16">
          <div
            className="prose prose-xl dark:prose-invert max-w-none
            prose-headings:text-navy-900 dark:prose-headings:text-white
            prose-a:text-navy-600 dark:prose-a:text-yellow-400
            prose-strong:text-navy-900 dark:prose-strong:text-white
            prose-p:text-gray-800 dark:prose-p:text-gray-200"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          <style jsx>{`
            .prose {
              line-height: 2;
              font-size: 1.25rem;
            }
            .prose h1 {
              font-size: 3rem;
              font-weight: 800;
              margin-top: 4rem;
              margin-bottom: 2rem;
              color: #1a3a5c;
              letter-spacing: -0.02em;
            }
            .prose h2 {
              font-size: 2.5rem;
              font-weight: 700;
              margin-top: 4rem;
              margin-bottom: 2rem;
              color: #1a3a5c;
              border-bottom: 3px solid #ffd500;
              padding-bottom: 1rem;
              letter-spacing: -0.01em;
            }
            .prose h3 {
              font-size: 2rem;
              font-weight: 600;
              margin-top: 3rem;
              margin-bottom: 1.5rem;
              color: #1a3a5c;
            }
            .prose p {
              margin-bottom: 2.5rem;
              font-size: 1.25rem;
              line-height: 2;
              color: #1f2937 !important;
              font-weight: 400;
            }
            .dark .prose p {
              color: #e5e7eb !important;
            }
            .prose ul, .prose ol {
              margin: 2.5rem 0;
              padding-left: 3rem;
            }
            .prose li {
              margin-bottom: 1.25rem;
              font-size: 1.25rem;
              line-height: 1.9;
              color: #1f2937 !important;
            }
            .dark .prose li {
              color: #e5e7eb !important;
            }
            .prose blockquote {
              border-left: 5px solid #ffd500;
              background: #f9fafb;
              padding: 2.5rem 3rem;
              margin: 4rem 0;
              font-style: italic;
              font-size: 1.5rem;
              color: #1a3a5c;
              line-height: 1.8;
            }
            .prose table {
              width: 100%;
              margin: 3rem 0;
              border-collapse: collapse;
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
              border-radius: 0.75rem;
              overflow: hidden;
            }
            .prose th {
              background: #1a3a5c;
              color: white;
              padding: 1.25rem;
              text-align: left;
              font-weight: 600;
              font-size: 1.125rem;
            }
            .prose td {
              padding: 1.25rem;
              border-bottom: 1px solid #e5e7eb;
              font-size: 1.125rem;
            }
            .prose tr:nth-child(even) {
              background: #f9fafb;
            }
            .prose code {
              background: #f3f4f6;
              padding: 0.375rem 0.625rem;
              border-radius: 0.375rem;
              font-family: 'Monaco', 'Menlo', monospace;
              font-size: 1rem;
              color: #1a3a5c;
            }
            .prose pre {
              background: #1f2937;
              color: #f9fafb;
              padding: 2rem;
              border-radius: 0.75rem;
              overflow-x: auto;
              margin: 3rem 0;
            }
            .prose img {
              border-radius: 1rem;
              box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
              margin: 4rem auto;
              max-width: 100%;
              height: auto;
              display: block;
            }
            .prose a {
              color: #1a3a5c;
              text-decoration: underline;
              text-decoration-color: #ffd500;
              text-underline-offset: 4px;
              text-decoration-thickness: 2px;
              font-weight: 500;
              transition: all 0.2s;
            }
            .prose a:hover {
              color: #ffd500;
              text-decoration-color: #1a3a5c;
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
          <div className="flex items-center justify-center pt-16 mt-16 border-t-2 border-gray-200 dark:border-gray-700">
            <button
              onClick={shareArticle}
              className="flex items-center gap-3 bg-navy-600 dark:bg-yellow-500 text-white dark:text-navy-900 px-8 py-4 rounded-xl hover:bg-navy-700 dark:hover:bg-yellow-400 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105"
            >
              <Share2 className="w-6 h-6" />
              Share Article
            </button>
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="bg-gray-50 dark:bg-gray-800 py-20 lg:py-24">
            <div className="max-w-[1600px] mx-auto px-8 lg:px-20 xl:px-32">
              <h2 className="text-4xl lg:text-5xl font-bold text-navy-900 dark:text-white mb-14">
                Related Articles
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
                {relatedArticles.map((relatedArticle) => (
                  <Link
                    key={relatedArticle.slug}
                    to={`/news/${relatedArticle.slug}`}
                    className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                  >
                    <div className="aspect-video overflow-hidden relative">
                      <img
                        src={relatedArticle.image}
                        alt={relatedArticle.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={handleImageError}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      <div className="absolute top-4 left-4">
                        <div className="flex items-center gap-2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm text-navy-900 dark:text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                          {getCategoryIcon(relatedArticle.category)}
                          {relatedArticle.category}
                        </div>
                      </div>
                    </div>
                    <div className="p-8">
                      <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-4">
                        <Calendar className="w-4 h-4" />
                        {formatDate(relatedArticle.date)}
                        <span className="text-gray-300 dark:text-gray-600">•</span>
                        <Clock className="w-4 h-4" />
                        {Math.ceil(relatedArticle.content.length / 1000)} min
                      </div>
                      <h3 className="text-2xl font-bold text-navy-900 dark:text-white group-hover:text-navy-700 dark:group-hover:text-yellow-400 transition-colors line-clamp-2 mb-4 leading-tight">
                        {relatedArticle.title}
                      </h3>
                      <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3 mb-6">
                        {relatedArticle.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-navy-600 dark:text-yellow-400 font-semibold transition-all duration-200 group-hover:gap-4">
                        Read Full Article <ChevronRight className="w-5 h-5" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </article>
    </>
  );
};

export default NewsArticle;
