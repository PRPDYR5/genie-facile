import { Layout } from "@/components/Layout";

export default function Terms() {
  console.log("Rendering Terms page");
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 gradient-text">Conditions Générales d'Utilisation</h1>
        <div className="w-full aspect-video max-w-4xl mx-auto">
          <iframe 
            src="https://gamma.app/embed/49crz4pv9962p79" 
            className="w-full h-full rounded-xl shadow-lg"
            allow="fullscreen" 
            title="Conditions Générales d'Utilisation (CGU)"
          />
        </div>
      </div>
    </Layout>
  );
}