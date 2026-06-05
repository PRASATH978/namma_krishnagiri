import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/dashboard/"
    );

    setStats(response.data);
  };

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto py-10">

        <h1 className="text-4xl font-bold mb-8">
          Dashboard
        </h1>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white shadow p-6 rounded-xl">
            <h3>Total Issues</h3>
            <p className="text-4xl font-bold">
              {stats.total_issues}
            </p>
          </div>

          <div className="bg-white shadow p-6 rounded-xl">
            <h3>Total Votes</h3>
            <p className="text-4xl font-bold">
              {stats.total_votes}
            </p>
          </div>

          <div className="bg-white shadow p-6 rounded-xl">
            <h3>Total Comments</h3>
            <p className="text-4xl font-bold">
              {stats.total_comments}
            </p>
          </div>

        </div>

      </div>
    </>
  );
}

export default Dashboard;