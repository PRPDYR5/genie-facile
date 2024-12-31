import { Layout } from "@/components/Layout";
import { SearchBar } from "@/components/SearchBar";

export default function Search() {
  return (
    <Layout>
      <div className="space-y-8">
        <h1 className="text-4xl font-bold gradient-text">Recherche avancée</h1>
        <SearchBar />
        <div className="glass p-6 rounded-xl">
          <p className="text-[#9b87f5]/70">
            Utilisez la barre de recherche ci-dessus pour trouver rapidement vos cours par nom, niveau ou matière.
            Cliquez sur un résultat pour accéder directement au cours correspondant.
          </p>
        </div>
      </div>
    </Layout>
  );
}