import { Layout } from "@/components/Layout";

export default function Privacy() {
  console.log("Rendering Privacy page");
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 gradient-text">Politique de Confidentialité</h1>
        <div className="w-full aspect-video max-w-4xl mx-auto">
          <iframe 
            src="https://gamma.app/embed/ljo7vu2h0oemz7i" 
            className="w-full h-full rounded-xl shadow-lg"
            allow="fullscreen" 
            title="Politique de Confidentialité de GenieFacile"
          />
        </div>
      </div>
    </Layout>
  );
}