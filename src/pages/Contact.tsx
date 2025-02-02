import { Layout } from "@/components/Layout";

export default function Contact() {
  console.log("Rendering Contact page");
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 gradient-text">Contactez-nous</h1>
        <div className="w-full aspect-video max-w-4xl mx-auto">
          <iframe 
            src="https://gamma.app/embed/ia84u4p52jpdkeb" 
            className="w-full h-full rounded-xl shadow-lg"
            allow="fullscreen" 
            title="Contactez-nous : Une équipe à votre écoute"
          />
        </div>
      </div>
    </Layout>
  );
}