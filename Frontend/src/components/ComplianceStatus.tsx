import { motion } from "framer-motion";
import { ShieldCheck, AlertTriangle } from "lucide-react";

interface Props {
  aqi: number;
}

export default function ComplianceStatus({ aqi }: Props) {
  const isCompliant = aqi < 150;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`glass-card p-5 ${isCompliant ? "neon-glow-green" : ""}`}
    >
      <h3 className="font-display text-sm text-muted-foreground mb-3">Compliance Status</h3>
      <div className="flex items-center gap-3">
        {isCompliant ? (
          <ShieldCheck className="w-8 h-8 text-neon-green" />
        ) : (
          <AlertTriangle className="w-8 h-8 text-red-500" />
        )}
        <div>
          <p className={`font-display text-lg ${isCompliant ? "neon-text-green" : "text-red-500"}`}>
            {isCompliant ? "Compliant" : "Violation Risk"}
          </p>
          <p className="text-xs text-muted-foreground">AI Prediction: {isCompliant ? "Stable" : "Deteriorating"}</p>
        </div>
      </div>
    </motion.div>
  );
}
