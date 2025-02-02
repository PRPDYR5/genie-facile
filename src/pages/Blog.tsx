import { Layout } from "@/components/Layout";

export default function Blog() {
  console.log("Rendering Blog page");
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 gradient-text">Blog</h1>
        <div className="w-full aspect-video max-w-4xl mx-auto">
          <iframe 
            src="https://gamma.app/embed/1t4x88xc0mdga4l" 
            className="w-full h-full rounded-xl shadow-lg"
            allow="fullscreen" 
            title="Blog Génie Facile"
          />
        </div>
      </div>
    </Layout>
  );
}