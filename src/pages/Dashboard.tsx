import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BarChart3, Home, LogOut, Menu, X, Activity, Shield, Leaf } from "lucide-react";
import { fetchAirQuality, fetchHistoricalData, type AirQualityData } from "@/services/api";
import AqiCard from "@/components/AqiCard";
import PollutantCard from "@/components/PollutantCard";
import ComplianceStatus from "@/components/ComplianceStatus";
import DataTable from "@/components/DataTable";
import { AqiLineChart, PollutantsBarChart, CompositionPieChart } from "@/components/DashboardCharts";

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

  useEffect(() => {
    fetchAirQuality().then(setCurrent);
    fetchHistoricalData().then(setHistory);
  }, []);

  if (!current) return <div className="gradient-bg min-h-screen flex items-center justify-center text-foreground">Loading...</div>;

  const pollutants = [
    { name: "PM2.5", value: current.pm25, unit: "µg/m³", color: "green" as const },
    { name: "PM10", value: current.pm10, unit: "µg/m³", color: "blue" as const },
    { name: "CO₂", value: current.co2, unit: "ppm", color: "green" as const },
    { name: "NOx", value: current.nox, unit: "ppb", color: "blue" as const },
    { name: "SO₂", value: current.so2, unit: "ppb", color: "green" as const },
  ];

  return (
    <div className="gradient-bg min-h-screen flex">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: sidebarOpen ? 220 : 64 }}
        className="h-screen sticky top-0 glass-card rounded-none border-r border-border flex flex-col overflow-hidden"
      >
        <div className="p-4 flex items-center justify-between border-b border-border">
          {sidebarOpen && <span className="font-display text-sm neon-text-green">PolluTrack</span>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-muted-foreground hover:text-foreground">
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        <nav className="flex-1 py-4">
          {sidebarLinks.map((link) => (
            <button
              key={link.label}
              className="w-full flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-neon-green hover:bg-muted/20 transition-colors"
            >
              <link.icon className="w-5 h-5 shrink-0" />
              {sidebarOpen && <span className="text-sm">{link.label}</span>}
            </button>
          ))}
        </nav>
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-foreground border-t border-border"
        >
          <Home className="w-5 h-5 shrink-0" />
          {sidebarOpen && <span className="text-sm">Home</span>}
        </button>
      </motion.aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen overflow-auto">
        {/* Navbar */}
        <header className="sticky top-0 z-10 glass-card rounded-none border-b border-border px-6 py-3 flex items-center justify-between">
          <h1 className="font-display text-sm neon-text-blue">Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">admin@PolluTrack.io</span>
            <button onClick={() => navigate("/auth")} className="text-muted-foreground hover:text-red-400 transition-colors">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 space-y-6">
          {/* Top row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <AqiCard aqi={current.aqi} status={current.status} carbonEmission={current.carbonEmission} />
            <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {pollutants.map((p) => (
                <PollutantCard key={p.name} {...p} />
              ))}
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <AqiLineChart data={history} />
            </div>
            <CompositionPieChart data={current} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <PollutantsBarChart data={current} />
            </div>
            <ComplianceStatus aqi={current.aqi} />
          </div>

          {/* Table */}
          <DataTable data={history} />
        </main>
      </div>
    </div>
  );
}
