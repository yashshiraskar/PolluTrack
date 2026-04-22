import type { AirQualityData } from "@/services/api";

function statusBadge(status: string) {
  if (status === "Good") return "text-neon-green";
  if (status === "Moderate") return "text-yellow-400";
  return "text-red-500";
}

export default function DataTable({ data }: { data: AirQualityData[] }) {
  return (
    <div className="glass-card neon-border-green overflow-hidden">
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              <th className="text-left p-3 font-display text-xs">Timestamp</th>
              <th className="text-left p-3 font-display text-xs">AQI</th>
              <th className="text-left p-3 font-display text-xs">PM2.5</th>
              <th className="text-left p-3 font-display text-xs">CO₂</th>
              <th className="text-left p-3 font-display text-xs">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.slice(0, 10).map((row, i) => (
              <tr key={i} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                <td className="p-3 text-foreground">{row.timestamp}</td>
                <td className={`p-3 font-semibold ${statusBadge(row.status)}`}>{row.aqi}</td>
                <td className="p-3 text-foreground">{row.pm25}</td>
                <td className="p-3 text-foreground">{row.co2}</td>
                <td className={`p-3 font-semibold ${statusBadge(row.status)}`}>{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
