import BlogHero from "@/components/blog/blog-hero"
import BlogSection from "@/components/blog/blog-section"

const BlogPage = () => {
    return (
        <div className="w-full relative flex flex-col pt-16">
            <BlogHero />
            <BlogSection />
        </div>
    )
};

export default BlogPage 