import { motion } from "framer-motion";
import { Database, Server, Link, Brain, BarChart3 } from "lucide-react";

const steps = [
  { icon: Database, label: "Data" },
  { icon: Server, label: "Backend" },
  { icon: Link, label: "Blockchain" },
  { icon: Brain, label: "AI" },
  { icon: BarChart3, label: "Dashboard" },
];

export default function HowItWorks() {
  return (
    <section className="py-20 px-6">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-2xl md:text-3xl font-display text-center mb-12 neon-text-blue"
      >
        How It Works
      </motion.h2>
      <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-4">
        {steps.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.15 }}
            className="flex items-center gap-4"
          >
            <div className="glass-card neon-border-green p-4 flex flex-col items-center min-w-[80px]">
              <s.icon className="w-6 h-6 text-neon-green mb-2" />
              <span className="text-xs font-display text-foreground">{s.label}</span>
            </div>
            {i < steps.length - 1 && (
              <span className="text-neon-blue text-xl font-bold">→</span>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
