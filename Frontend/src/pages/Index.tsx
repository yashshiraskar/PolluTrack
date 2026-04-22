import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Globe from "@/components/Globe";
import SearchSection from "@/components/SearchSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="gradient-bg min-h-screen overflow-x-hidden">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center">
        <Globe className="absolute inset-0 w-full h-full opacity-60" />
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl lg:text-6xl font-display font-bold leading-tight neon-text-green mb-4"
          >
            Blockchain-Based Air Quality Monitoring
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground font-sans mb-8"
          >
            Secure • Transparent • AI Powered
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <button
              onClick={() => navigate("/auth")}
              className="px-8 py-3 rounded-lg font-display text-sm bg-neon-green/20 neon-border-green text-neon-green hover:bg-neon-green/30 transition-all"
            >
              Get Started
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="px-8 py-3 rounded-lg font-display text-sm bg-neon-blue/20 neon-border-blue text-neon-blue hover:bg-neon-blue/30 transition-all"
            >
              View Dashboard
            </button>
          </motion.div>
        </div>
      </section>

      <SearchSection />
      <FeaturesSection />
      <HowItWorks />
      <Footer />
    </div>
  );
}
