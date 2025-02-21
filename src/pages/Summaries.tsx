
import { Layout } from "@/components/Layout";

export default function Summaries() {
  return (
    <Layout>
      <div className="h-screen w-full -mt-16 pt-16"> {/* Ajusté pour prendre toute la hauteur */}
        <iframe 
          src="https://genie-facile-simplifier--418b53w.gamma.site" 
          style={{ width: '100%', height: '100%' }}
          allow="fullscreen" 
          title="Génie Facile: Simplifier l'éducation technique en Afrique"
          className="rounded-lg shadow-lg"
        />
      </div>
    </Layout>
  );
}
