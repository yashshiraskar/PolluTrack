import { motion } from "framer-motion";

interface AqiCardProps {
  aqi: number;
  status: string;
  carbonEmission: number;
}

function getStatusClasses(status: string) {
  if (status === "Good") return { text: "neon-text-green", glow: "neon-glow-green" };
  if (status === "Moderate") return { text: "text-yellow-400", glow: "" };
  return { text: "text-red-500", glow: "" };
}

export default function AqiCard({ aqi, status, carbonEmission }: AqiCardProps) {
  const styles = getStatusClasses(status);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass-card p-6 neon-border-green ${styles.glow}`}
    >
      <h3 className="font-display text-sm text-muted-foreground mb-2">Air Quality Index</h3>
      <p className={`text-6xl font-bold font-display ${styles.text}`}>{aqi}</p>
      <p className={`text-lg font-semibold mt-1 ${styles.text}`}>{status}</p>
      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground">Carbon Emission</p>
        <p className="text-xl font-display text-neon-blue">{carbonEmission} <span className="text-xs text-muted-foreground">tons/day</span></p>
      </div>
    </motion.div>
  );
}
