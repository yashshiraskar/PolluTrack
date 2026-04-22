import { motion } from "framer-motion";

interface PollutantCardProps {
  name: string;
  value: number;
  unit: string;
  color: "green" | "blue";
}

export default function PollutantCard({ name, value, unit, color }: PollutantCardProps) {
  const isGreen = color === "green";
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`glass-card p-4 text-center ${isGreen ? "neon-glow-green" : "neon-glow-blue"}`}
    >
      <p className="text-xs text-muted-foreground mb-1">{name}</p>
      <p className={`text-2xl font-bold font-display ${isGreen ? "neon-text-green" : "neon-text-blue"}`}>
        {value}
      </p>
      <p className="text-xs text-muted-foreground">{unit}</p>
    </motion.div>
  );
}
