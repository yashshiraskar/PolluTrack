import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ParticleBackground from "@/components/ParticleBackground";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [industry, setIndustry] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="gradient-bg min-h-screen flex items-center justify-center relative">
      <ParticleBackground />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card neon-glow-green p-8 w-full max-w-md mx-4 relative z-10"
      >
        <h1 className="font-display text-2xl text-center neon-text-green mb-2">AirChain</h1>
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setIsLogin(true)}
            className={`font-display text-sm px-4 py-2 rounded-lg transition-all ${isLogin ? "bg-neon-green/20 text-neon-green neon-border-green" : "text-muted-foreground"}`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`font-display text-sm px-4 py-2 rounded-lg transition-all ${!isLogin ? "bg-neon-blue/20 text-neon-blue neon-border-blue" : "text-muted-foreground"}`}
          >
            Signup
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.form
            key={isLogin ? "login" : "signup"}
            initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div>
              <label className="text-xs text-muted-foreground font-sans mb-1 block">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 text-foreground outline-none focus:border-neon-green/50 transition-colors"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground font-sans mb-1 block">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 text-foreground outline-none focus:border-neon-green/50 transition-colors"
                placeholder="••••••••"
              />
            </div>
            {!isLogin && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                <label className="text-xs text-muted-foreground font-sans mb-1 block">Industry Name</label>
                <input
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 text-foreground outline-none focus:border-neon-blue/50 transition-colors"
                  placeholder="Your Industry"
                />
              </motion.div>
            )}
            <button
              type="submit"
              className="w-full py-3 rounded-lg font-display text-sm bg-neon-green/20 neon-border-green text-neon-green hover:bg-neon-green/30 transition-all mt-2"
            >
              {isLogin ? "Login" : "Create Account"}
            </button>
          </motion.form>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
