
import { Layout } from "@/components/Layout";

export default function Summaries() {
  return (
    <Layout>
      <div className="space-y-8 p-4">
        <h1 className="text-4xl font-bold text-center gradient-text mb-8">
          Bienvenue sur Génie Facile
        </h1>
        
        <div className="text-center mb-8">
          <p className="text-lg text-[#9b87f5]/80 mb-4">
            Découvrez comment Génie Facile révolutionne l'apprentissage technique
          </p>
        </div>

        <div className="w-full">
          <iframe 
            src="https://gamma.app/embed/bxvteliose13vur" 
            style={{ width: '100%', height: '600px' }}
            allow="fullscreen" 
            title="Génie Facile: Simplifier l'éducation technique en Afrique"
            className="rounded-lg shadow-lg"
          />
        </div>

        <div className="grid gap-6 mt-8 max-w-4xl mx-auto">
          <div className="bg-[#9b87f5]/10 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-[#9b87f5] mb-4">
              Nos Fonctionnalités Principales
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-[#9b87f5]">Sessions d'Étude Personnalisées</h3>
                <p className="text-muted-foreground">
                  Planifiez vos sessions d'étude avec des rappels automatiques pour maintenir votre rythme d'apprentissage.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-[#9b87f5]">Assistant IA Personnalisé</h3>
                <p className="text-muted-foreground">
                  Obtenez des réponses instantanées à vos questions grâce à notre assistant alimenté par l'IA.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-[#9b87f5]">Ressources Pédagogiques</h3>
                <p className="text-muted-foreground">
                  Accédez à une bibliothèque de ressources adaptées à votre niveau et à vos besoins.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
