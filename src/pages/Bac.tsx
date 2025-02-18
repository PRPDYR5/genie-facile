
import { Layout } from "@/components/Layout";
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Bac() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-[#9b87f5]">
          Examens du BAC
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card 
            onClick={() => navigate("/bac/bac1")}
            className="glass transition-all duration-300 hover:shadow-lg cursor-pointer hover:scale-105"
          >
            <CardHeader className={`flex items-center justify-center ${isMobile ? 'p-6' : 'p-12'}`}>
              <h2 className="text-xl font-semibold text-[#9b87f5]">BAC I</h2>
              <p className="text-center text-gray-500 mt-2">
                Accéder aux exercices et examens du BAC I
              </p>
            </CardHeader>
          </Card>

          <Card
            onClick={() => navigate("/bac/bac2")}
            className="glass transition-all duration-300 hover:shadow-lg cursor-pointer hover:scale-105"
          >
            <CardHeader className={`flex items-center justify-center ${isMobile ? 'p-6' : 'p-12'}`}>
              <h2 className="text-xl font-semibold text-[#9b87f5]">BAC II</h2>
              <p className="text-center text-gray-500 mt-2">
                Accéder aux exercices et examens du BAC II
              </p>
            </CardHeader>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
