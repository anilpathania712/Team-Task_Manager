import { useEffect, useState } from "react";
import { getDashboard } from "../services/api";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await getDashboard();
      console.log("Dashboard API response:", res); // 👈 ADD THIS
      setData(res);
    } catch (err) {
      console.log("Dashboard error:", err);
    }
  };

  fetchData();
}, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {!data ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          
          <div className="bg-blue-100 p-4 rounded">
            <h2 className="text-lg font-bold">Total</h2>
            <p className="text-2xl">{data.total}</p>
          </div>

          <div className="bg-green-100 p-4 rounded">
            <h2 className="text-lg font-bold">Completed</h2>
            <p className="text-2xl">{data.completed}</p>
          </div>

          <div className="bg-yellow-100 p-4 rounded">
            <h2 className="text-lg font-bold">Pending</h2>
            <p className="text-2xl">{data.pending}</p>
          </div>

          <div className="bg-red-100 p-4 rounded">
            <h2 className="text-lg font-bold">Overdue</h2>
            <p className="text-2xl">{data.overdue}</p>
          </div>

        </div>
      )}
    </div>
  );
}