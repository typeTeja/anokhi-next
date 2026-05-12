import { LandingHeader } from "@/components/landing/header"
import { LandingFooter } from "@/components/landing/footer"
import { Calendar, User, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getPosts, fixWordPressLinks } from "@/lib/wordpress"

export const revalidate = 3600;

export default async function BlogPage() {
  const posts = await getPosts(50); // Fetch up to 50 posts to ensure all 28 are displayed

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <LandingHeader />
      <main className="flex-grow">
        <section className="bg-gray-900 text-white py-24 px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-5xl font-heading font-bold">Our Blog</h1>
            <p className="text-gray-400 text-lg">Stay updated with the latest news and trends in real estate.</p>
          </div>
        </section>

        <section className="py-24 px-4 md:px-10 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {posts.map((post: any) => {
              const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder-blog.jpg';
              const category = post._embedded?.['wp:term']?.[0]?.[0]?.name || 'Uncategorized';
              const date = new Date(post.date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              });
              const author = post._embedded?.['author']?.[0]?.name || 'Anokhi Team';

              return (
                <div key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-50 flex flex-col group">
                  <div className="h-56 bg-gray-200 relative overflow-hidden">
                    <Image 
                      src={featuredImage} 
                      alt={post.title.rendered} 
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <span className="absolute bottom-4 left-4 bg-[#C08C4C] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                      {category}
                    </span>
                  </div>
                  <div className="p-8 flex-grow space-y-4">
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <div className="flex items-center gap-1"><Calendar className="size-3" /> {date}</div>
                      <div className="flex items-center gap-1"><User className="size-3" /> {author}</div>
                    </div>
                    <h3 
                      className="text-xl font-bold text-gray-900 group-hover:text-[#C08C4C] transition-colors line-clamp-2"
                      dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    />
                    <div 
                      className="text-gray-500 text-sm leading-relaxed line-clamp-3"
                      dangerouslySetInnerHTML={{ __html: fixWordPressLinks(post.excerpt.rendered) }}
                    />
                    <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-[#C08C4C] font-bold text-xs uppercase tracking-widest pt-4 group/btn">
                      Read More <ArrowRight className="size-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  )
}
