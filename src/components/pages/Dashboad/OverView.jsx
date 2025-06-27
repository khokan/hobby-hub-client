
import { useLoaderData } from "react-router";
import useAuth from "../../../hooks/useAuth";

const Overview = () => {
  const { user } = useAuth();
 const groupsData = useLoaderData();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>
      <div className="mb-6 bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold">Logged in as:</h2>
        <p>Name: {user?.displayName || "N/A"}</p>
        <p>Email: {user?.email}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Items" count={groupsData.length} />
        <StatCard title="My Items" count={5} />
        <StatCard title="Pending Review" count={3} />
      </div>
    </div>
  );
};

const StatCard = ({ title, count }) => (
  <div className="bg-white p-6 rounded shadow text-center">
    <h3 className="text-xl font-bold">{count}</h3>
    <p className="text-gray-600">{title}</p>
  </div>
);

export default Overview;
