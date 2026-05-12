
import { LandingHeader } from "@/components/landing/header"
import { LandingFooter } from "@/components/landing/footer"
import { Calendar, User, Tag, ChevronLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getPostBySlug, getPosts, fixWordPressLinks } from "@/lib/wordpress"
import { notFound } from "next/navigation"

export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await getPosts(100); // Pre-render up to 100 recent posts
  return posts.map((post: any) => ({
    slug: post.slug,
  }));
}

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  const category = post._embedded?.['wp:term']?.[0]?.[0]?.name || 'Uncategorized';
  const date = new Date(post.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
  const author = post._embedded?.['author']?.[0]?.name || 'Anokhi Team';

  return (
    <div className="flex flex-col min-h-screen font-sans bg-white">
      <LandingHeader />

      <main className="flex-grow pt-32 pb-24 bg-slate-50/50">
        <article className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12">
          {/* Breadcrumb / Back Link */}
          <div className="mb-12">
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#C08C4C] transition-colors group">
              <div className="size-8 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-[#C08C4C] group-hover:bg-[#C08C4C]/5 transition-all">
                <ChevronLeft className="size-4" />
              </div>
              Back to Blog
            </Link>
          </div>


          {/* Main Content Column */}
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Post Header */}
            <header className="space-y-8">
              <div className="flex items-center gap-3">
                <span className="bg-[#C08C4C]/10 text-[#C08C4C] text-[11px] font-bold px-4 py-1.5 rounded-full uppercase tracking-[0.2em]">
                  {category}
                </span>
              </div>
              <h1
                className="text-4xl md:text-6xl font-heading font-bold text-gray-900 leading-[1.1] tracking-tight"
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              />

              <div className="flex flex-wrap items-center gap-8 text-sm text-gray-500 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
                    <User className="size-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Written by</p>
                    <p className="font-semibold text-gray-900">{author}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
                    <Calendar className="size-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Published on</p>
                    <p className="font-semibold text-gray-900">{date}</p>
                  </div>
                </div>
              </div>
            </header>

            {/* Featured Image */}
            {featuredImage && (
              <div className="relative aspect-[16/9] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-gray-200/50">
                <Image
                  src={featuredImage}
                  alt={post.title.rendered}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Content */}
            <div
              className="prose prose-xl max-w-none 
                  prose-headings:font-heading prose-headings:font-bold prose-headings:text-gray-900
                  prose-p:text-gray-600 prose-p:leading-[1.8] prose-p:mb-[1.8em]
                  prose-img:rounded-3xl prose-img:shadow-lg
                  prose-a:text-[#C08C4C] prose-a:font-bold prose-a:no-underline hover:prose-a:underline
                  prose-blockquote:border-l-4 prose-blockquote:border-[#C08C4C] prose-blockquote:bg-[#C08C4C]/5 prose-blockquote:py-4 prose-blockquote:px-8 prose-blockquote:rounded-r-2xl prose-blockquote:italic
                  prose-li:text-gray-600 prose-li:mb-2"
              dangerouslySetInnerHTML={{ __html: fixWordPressLinks(post.content.rendered) }}
            />
          </div>





        </article>
      </main>

      <LandingFooter />
    </div>
  )
}
