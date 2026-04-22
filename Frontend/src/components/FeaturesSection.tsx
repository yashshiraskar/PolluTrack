import { motion } from "framer-motion";
import { Shield, Brain, Leaf, Activity } from "lucide-react";

const features = [
  { icon: Shield, title: "Blockchain Security", desc: "Immutable, tamper-proof air quality records on-chain.", color: "neon-green" },
  { icon: Brain, title: "AI Prediction", desc: "ML models forecast pollution spikes before they happen.", color: "neon-blue" },
  { icon: Leaf, title: "Carbon Tracking", desc: "Monitor and report carbon emissions in real-time.", color: "neon-green" },
  { icon: Activity, title: "Real-Time Monitoring", desc: "Live sensor data streamed to your dashboard 24/7.", color: "neon-blue" },
];

export default function FeaturesSection() {
  return (
    <section className="py-20 px-6">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-2xl md:text-3xl font-display text-center mb-12 neon-text-green"
      >
        Core Features
      </motion.h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className={`glass-card p-6 text-center cursor-default ${f.color === "neon-green" ? "neon-glow-green" : "neon-glow-blue"}`}
          >
            <f.icon className={`w-10 h-10 mx-auto mb-4 ${f.color === "neon-green" ? "text-neon-green" : "text-neon-blue"}`} />
            <h3 className="font-display text-sm mb-2 text-foreground">{f.title}</h3>
            <p className="text-xs text-muted-foreground">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
