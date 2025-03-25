export function SitePerformanceTable() {
  const sites = ["A", "B", "C", "D"];

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-muted/50">
            <th className="p-3 text-left font-medium">Site</th>
            <th className="p-3 text-left font-medium">Production (Tons)</th>
            <th className="p-3 text-left font-medium">Safety Score</th>
            <th className="p-3 text-left font-medium">Efficiency</th>
            <th className="p-3 text-left font-medium">Operating Cost</th>
          </tr>
        </thead>
        <tbody>
          {sites.map((site) => (
            <tr key={site} className="border-b border-muted hover:bg-muted/30">
              <td className="p-3">Site {site}</td>
              <td className="p-3">Site {site}</td>
              <td className="p-3">Site {site}</td>
              <td className="p-3">Site {site}</td>
              <td className="p-3">Site {site}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
