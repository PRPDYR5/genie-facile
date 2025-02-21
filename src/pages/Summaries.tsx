
import { Layout } from "@/components/Layout";

export default function Summaries() {
  return (
    <Layout>
      <div className="space-y-8">
        <h1 className="text-4xl font-bold text-center gradient-text mb-8">
          Bienvenue sur Génie Facile
        </h1>
        
        <div className="text-center mb-8">
          <p className="text-lg text-[#9b87f5]/80 mb-4">
            Découvrez comment Génie Facile révolutionne l'apprentissage technique
          </p>
        </div>

        <div className="w-full h-[80vh]">
          <iframe 
            src="https://genie-facile-simplifier--418b53w.gamma.site" 
            style={{ width: '100%', height: '100%' }}
            allow="fullscreen" 
            title="Génie Facile: Simplifier l'éducation technique en Afrique"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </Layout>
  );
}
