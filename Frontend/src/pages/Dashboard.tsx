import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BarChart3, Home, LogOut, Menu, X, Activity, Shield, Leaf } from "lucide-react";
import axios from "axios";

import AqiCard from "@/components/AqiCard";
import PollutantCard from "@/components/PollutantCard";
import ComplianceStatus from "@/components/ComplianceStatus";
import DataTable from "@/components/DataTable";
import { AqiLineChart, PollutantsBarChart, CompositionPieChart } from "@/components/DashboardCharts";

type AirQualityData = {
  aqi: number;
  pm25: number;
  pm10: number;
  co: number;
  no2: number;
  so2: number;
  o3: number;
  predicted_aqi: number;
  category: string;
  timestamp: string;
  ai_suggestions: string;
};

const sidebarLinks = [
  { icon: BarChart3, label: "Dashboard" },
  { icon: Activity, label: "Monitoring" },
  { icon: Shield, label: "Compliance" },
  { icon: Leaf, label: "Carbon" },
];

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [current, setCurrent] = useState<AirQualityData | null>(null);
  const [history, setHistory] = useState<AirQualityData[]>([]);
  const navigate = useNavigate();

  // ✅ FORMAT FUNCTION (NEW)
  const formatSuggestions = (text: string) => {
    if (!text) return [];

    return text
      .split("\n")
      .filter((line) => line.trim() !== "")
      .map((line) => line.trim());
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await axios.get("http://localhost:4000/aqi");

        setCurrent(res.data);

        setHistory((prev) => [...prev.slice(-20), res.data]);
      } catch (err) {
        console.error("API error:", err);
      }
    };

    loadData();

    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!current)
    return (
      <div className="gradient-bg min-h-screen flex items-center justify-center text-foreground">
        Loading...
      </div>
    );

  const pollutants = [
    { name: "PM2.5", value: current.pm25, unit: "µg/m³", color: "green" as const },
    { name: "PM10", value: current.pm10, unit: "µg/m³", color: "blue" as const },
    { name: "CO", value: current.co, unit: "ppm", color: "green" as const },
    { name: "NO₂", value: current.no2, unit: "ppb", color: "blue" as const },
    { name: "SO₂", value: current.so2, unit: "ppb", color: "green" as const },
  ];

  return (
    <div className="gradient-bg min-h-screen flex">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: sidebarOpen ? 220 : 64 }}
        className="h-screen sticky top-0 glass-card border-r border-border flex flex-col overflow-hidden"
      >
        <div className="p-4 flex items-center justify-between border-b border-border">
          {sidebarOpen && <span className="font-display text-sm neon-text-green">AirChain</span>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X /> : <Menu />}
          </button>
        </div>

        <nav className="flex-1 py-4">
          {sidebarLinks.map((link) => (
            <button key={link.label} className="w-full flex items-center gap-3 px-4 py-3">
              <link.icon className="w-5 h-5" />
              {sidebarOpen && <span>{link.label}</span>}
            </button>
          ))}
        </nav>

        <button onClick={() => navigate("/")} className="flex items-center gap-3 px-4 py-3 border-t">
          <Home className="w-5 h-5" />
          {sidebarOpen && <span>Home</span>}
        </button>
      </motion.aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="sticky top-0 glass-card border-b px-6 py-3 flex justify-between">
          <h1>Dashboard</h1>
          <button onClick={() => navigate("/auth")}>
            <LogOut />
          </button>
        </header>

        {/* Content */}
        <main className="p-6 space-y-6">
          {/* AQI + Pollutants */}
          <div className="grid lg:grid-cols-3 gap-6">
            <AqiCard
              aqi={current.aqi}
              status={current.category}
              carbonEmission={current.predicted_aqi}
            />

            <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {pollutants.map((p) => (
                <PollutantCard key={p.name} {...p} />
              ))}
            </div>
          </div>

          {/* Charts */}
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <AqiLineChart data={history} />
            </div>
            <CompositionPieChart data={current} />
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <PollutantsBarChart data={current} />
            </div>
            <ComplianceStatus aqi={current.aqi} />
          </div>

          {/* ✅ FORMATTED AI Suggestions */}
          <div className="glass-card p-4">
            <h2 className="text-sm mb-3 font-semibold">Suggestions</h2>

            <div className="text-sm space-y-3">
              {formatSuggestions(current.ai_suggestions).map((line, index) => {
                const [title, ...rest] = line.split(":");

                return (
                  <div key={index}>
                    <span className="font-semibold text-white">{title}:</span>
                    <span className="text-muted-foreground"> {rest.join(":")}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Table */}
          <DataTable data={history} />
        </main>
      </div>
    </div>
  );
}