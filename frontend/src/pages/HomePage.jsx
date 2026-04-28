import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaUsers, FaPlus, FaChartBar } from "react-icons/fa";
import { getLeads } from "../services/leadService";

const HomePage = () => {
    const navigate = useNavigate();

    const [stats, setStats] = useState({
        total: 0,
        new: 0,
        contacted: 0,
        closed: 0,
        site_visit: 0,
    });

    const [recentLeads, setRecentLeads] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getLeads();

                setStats({
                    total: data.length,
                    new: data.filter((l) => l.status === "New").length,
                    contacted: data.filter((l) => l.status === "Contacted").length,
                    closed: data.filter((l) => l.status === "Closed").length,
                    site_visit: data.filter((l) => l.status === "Site Visit").length,
                });

                setRecentLeads(data.slice(0, 5));
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            Mini CRM Dashboard
                        </h1>
                        <p className="text-gray-500 mt-2">
                            Manage your leads, track progress, and stay organized.
                        </p>
                    </div>

                    {/*Primary Action */}
                    <button
                        onClick={() => navigate("/create")}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition"
                    >
                        + Add Lead
                    </button>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <StatCard title="Total Leads" value={stats.total} color="text-gray-800" />
                    <StatCard title="New" value={stats.new} color="text-blue-600" />
                    <StatCard title="Contacted" value={stats.contacted} color="text-yellow-600" />
                    <StatCard title="Site Visit" value={stats.site_visit} color="text-purple-600" />
                </div>

                {/* Recent Leads */}
                <div className="bg-white rounded-xl shadow p-6 mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Recent Leads</h2>
                        <Link to="/leads" className="text-blue-600 text-sm hover:underline">
                            View All
                        </Link>
                    </div>

                    <div className="space-y-3">
                        {recentLeads.length > 0 ? (
                            recentLeads.map((lead) => (
                                <div
                                    key={lead._id}
                                    onClick={() => navigate(`/lead/${lead._id}`)}
                                    className="flex justify-between items-center border-b pb-2 cursor-pointer hover:bg-gray-50 transition px-2 py-1 rounded"
                                >
                                    <div>
                                        <p className="font-medium text-gray-800">{lead.name}</p>
                                        <p className="text-sm text-gray-500">{lead.location}</p>
                                    </div>

                                    <span className="text-sm text-gray-500">
                                        ₹{lead.budget ? Number(lead.budget).toLocaleString() : "-"}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500">No recent leads</p>
                        )}
                    </div>
                </div>

                {/* Navigation Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Link
                        to="/dashboard"
                        className="bg-white p-6 rounded-xl shadow hover:shadow-md transition flex flex-col items-center text-center"
                    >
                        <FaChartBar className="text-blue-600 text-3xl mb-3" />
                        <h2 className="text-lg font-semibold text-gray-800">Dashboard</h2>
                        <p className="text-sm text-gray-500">
                            View insights and lead statistics
                        </p>
                    </Link>

                    <Link
                        to="/leads"
                        className="bg-white p-6 rounded-xl shadow hover:shadow-md transition flex flex-col items-center text-center"
                    >
                        <FaUsers className="text-green-600 text-3xl mb-3" />
                        <h2 className="text-lg font-semibold text-gray-800">Leads</h2>
                        <p className="text-sm text-gray-500">
                            View and manage all leads
                        </p>
                    </Link>

                    <Link
                        to="/create"
                        className="bg-white p-6 rounded-xl shadow hover:shadow-md transition flex flex-col items-center text-center"
                    >
                        <FaPlus className="text-purple-600 text-3xl mb-3" />
                        <h2 className="text-lg font-semibold text-gray-800">Add Lead</h2>
                        <p className="text-sm text-gray-500">
                            Create a new lead entry
                        </p>
                    </Link>
                </div>

            </div>
        </div>
    );
};

/*Stat Card */
const StatCard = ({ title, value, color }) => (
    <div className="bg-white p-5 rounded-xl shadow text-center">
        <p className="text-sm text-gray-500">{title}</p>
        <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
);

export default HomePage;