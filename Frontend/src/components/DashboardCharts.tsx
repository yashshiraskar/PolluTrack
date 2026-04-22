import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import type { AirQualityData } from "@/services/api";

const NEON_GREEN = "#00e676";
const NEON_BLUE = "#00bcd4";
const COLORS = [NEON_GREEN, NEON_BLUE, "#ffc107", "#ff5722", "#9c27b0"];

const tooltipStyle = {
  backgroundColor: "hsl(220 25% 10%)",
  border: "1px solid hsl(220 20% 20%)",
  borderRadius: "8px",
  color: "#e0e0e0",
};

export function AqiLineChart({ data }: { data: AirQualityData[] }) {
  return (
    <div className="glass-card neon-border-blue p-4 h-[300px]">
      <h3 className="font-display text-sm neon-text-blue mb-3">AQI Over Time</h3>
      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 20% 15%)" />
          <XAxis dataKey="timestamp" stroke="#666" tick={{ fontSize: 10 }} />
          <YAxis stroke="#666" tick={{ fontSize: 10 }} />
          <Tooltip contentStyle={tooltipStyle} />
          <Line type="monotone" dataKey="aqi" stroke={NEON_GREEN} strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function PollutantsBarChart({ data }: { data: AirQualityData }) {
  const chartData = [
    { name: "PM2.5", value: data.pm25 },
    { name: "PM10", value: data.pm10 },
    { name: "CO₂", value: data.co2 },
    { name: "NOx", value: data.nox },
    { name: "SO₂", value: data.so2 },
  ];

  return (
    <div className="glass-card neon-border-green p-4 h-[300px]">
      <h3 className="font-display text-sm neon-text-green mb-3">Pollutant Levels</h3>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 20% 15%)" />
          <XAxis dataKey="name" stroke="#666" tick={{ fontSize: 10 }} />
          <YAxis stroke="#666" tick={{ fontSize: 10 }} />
          <Tooltip contentStyle={tooltipStyle} />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {chartData.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function CompositionPieChart({ data }: { data: AirQualityData }) {
  const pieData = [
    { name: "PM2.5", value: data.pm25 },
    { name: "PM10", value: data.pm10 },
    { name: "NOx", value: data.nox },
    { name: "SO₂", value: data.so2 },
  ];

  return (
    <div className="glass-card neon-border-blue p-4 h-[300px]">
      <h3 className="font-display text-sm neon-text-blue mb-3">Composition</h3>
      <ResponsiveContainer width="100%" height="85%">
        <PieChart>
          <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={4} dataKey="value">
            {pieData.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={tooltipStyle} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
