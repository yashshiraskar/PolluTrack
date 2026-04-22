import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { searchCityAQI, type AirQualityData } from "@/services/api";

function getStatusColor(status: string) {
  if (status === "Good") return "text-neon-green";
  if (status === "Moderate") return "text-yellow-400";
  return "text-red-500";
}

export default function SearchSection() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<(AirQualityData & { city: string }) | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    const data = await searchCityAQI(query);
    setResult(data);
    setLoading(false);
  };

  return (
    <section className="py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-2xl md:text-3xl font-display text-center mb-8 neon-text-blue"
        >
          Search Air Quality
        </motion.h2>
        <div className="glass-card neon-border-blue p-2 flex gap-2">
          <input
            className="flex-1 bg-transparent px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none font-sans"
            placeholder="Enter city or industry name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button
            onClick={handleSearch}
            className="px-6 py-3 bg-neon-blue/20 hover:bg-neon-blue/30 rounded-lg transition-colors neon-border-blue"
          >
            <Search className="w-5 h-5 text-neon-blue" />
          </button>
        </div>

        {loading && <p className="text-center mt-6 text-muted-foreground">Searching...</p>}

        {result && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card neon-glow-green p-6 mt-6"
          >
            <h3 className="font-display text-lg neon-text-green mb-3">{result.city}</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm text-muted-foreground">AQI</p>
                <p className={`text-2xl font-bold ${getStatusColor(result.status)}`}>{result.aqi}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p className={`text-lg font-semibold ${getStatusColor(result.status)}`}>{result.status}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">CO₂</p>
                <p className="text-2xl font-bold text-neon-blue">{result.co2}</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
