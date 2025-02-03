import { Layout } from "@/components/Layout";
import { UserDashboard } from "@/components/UserDashboard";
import { StudyScheduler } from "@/components/StudyScheduler";
import { StudyScheduleList } from "@/components/StudyScheduleList";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";

const Index = () => {
  console.log("Rendering Index page");
  const isMobile = useIsMobile();
  
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2
      }
    }
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };
  
  return (
    <Layout>
      <div className="space-y-4 sm:space-y-16 animate-fade-in mx-auto w-full max-w-7xl px-4">
        {/* Hero Section */}
        <div className="text-center space-y-4 sm:space-y-8 max-w-4xl mx-auto py-4 sm:py-16">
          <motion.h1 
            initial="hidden"
            animate="visible"
            variants={titleVariants}
            className={`${isMobile ? 'text-3xl px-2' : 'text-4xl sm:text-6xl'} font-bold font-poppins gradient-text leading-tight flex flex-wrap justify-center gap-2`}
          >
            {["Un", "apprentissage", "simplifié,", "pour", "un", "futur", "brillant"].map((word, index) => (
              <motion.span
                key={index}
                variants={wordVariants}
                className="inline-block hover:scale-110 transition-transform duration-200"
                whileHover={{
                  scale: 1.1,
                  color: "#9b87f5",
                  transition: { duration: 0.2 }
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className={`${isMobile ? 'text-base px-2' : 'text-lg sm:text-2xl px-4'} text-[#9b87f5]/80 font-roboto leading-relaxed max-w-2xl mx-auto`}
          >
            Génie Facile est votre professeur virtuel, prêt à vous accompagner dans vos études techniques de la série F1 / F2 / F3 / F4 ET TI
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-4 sm:pt-8 px-4"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/courses/summaries"
              className={`${isMobile ? 'text-base w-full' : ''} px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-[#9b87f5] to-[#6E59A5] text-white rounded-xl transition-all duration-300 font-medium shadow-lg shadow-[#9b87f5]/20 text-center`}
            >
              Voir les résumés
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/courses/qa"
              className={`${isMobile ? 'text-base w-full' : ''} px-6 py-3 sm:px-8 sm:py-4 bg-[#9b87f5]/10 border border-[#9b87f5]/20 text-[#9b87f5] rounded-xl transition-all duration-300 font-medium backdrop-blur-sm text-center`}
            >
              Questions-réponses
            </motion.a>
          </motion.div>
        </div>

        {/* Dashboard Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="space-y-6 w-full"
        >
          <UserDashboard />
          <StudyScheduler />
          <StudyScheduleList />
        </motion.div>
      </div>
    </Layout>
  );
};

export default Index;