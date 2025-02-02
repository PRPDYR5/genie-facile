import { Layout } from "@/components/Layout";

export default function About() {
  console.log("Rendering About page");
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 gradient-text">À propos de nous</h1>
        <div className="w-full aspect-video max-w-4xl mx-auto">
          <iframe 
            src="https://gamma.app/embed/2y674212knl540p" 
            className="w-full h-full rounded-xl shadow-lg"
            allow="fullscreen" 
            title="À propos de Génie Facile"
          />
        </div>
      </div>
    </Layout>
  );
}