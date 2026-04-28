import { useEffect, useState } from "react";
import { getDashboard } from "../services/dashboardService";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";
import { FaUsers, FaChartLine } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const COLORS = ["#3b82f6", "#facc15", "#a855f7", "#22c55e"];

const DashboardPage = () => {
    const [data, setData] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {
        const res = await getDashboard();
        setData(res);
    };

    if (!data) {
        return <div className="p-6">Loading...</div>;
    }

    const statusData = data?.statusDistribution?.map((i) => ({
        name: i._id,
        value: i.count,
    }));

    const sourceData = data?.leadsBySource?.map((i) => ({
        name: i._id || "Unknown",
        value: i.count,
    }));

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* HEADER */}
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800">
                            Dashboard
                        </h1>
                        <p className="text-gray-500">
                            Welcome back, here’s your performance overview
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/")}
                        className="text-sm font-medium text-blue-600 hover:text-blue-800 transition"
                    >
                        ← Back to Home
                    </button>
                </div>

                {/* METRIC CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <Card
                        title="Total Leads"
                        value={data.totalLeads}
                        icon={<FaUsers />}
                        color="blue"
                    />

                    <Card
                        title="Conversion Rate"
                        value={`${data.conversionRate}%`}
                        icon={<FaChartLine />}
                        color="green"
                    />

                </div>

                {/* CHARTS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* PIE */}
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        <h2 className="font-semibold mb-4 text-gray-700">
                            Status Distribution
                        </h2>

                        <ResponsiveContainer width="100%" height={280}>
                            <PieChart>
                                <Pie
                                    data={statusData}
                                    dataKey="value"
                                    nameKey="name"
                                    outerRadius={100}
                                    label
                                >
                                    {statusData.map((_, i) => (
                                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* BAR */}
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        <h2 className="font-semibold mb-4 text-gray-700">
                            Leads by Source
                        </h2>

                        <ResponsiveContainer width="100%" height={280}>
                            <BarChart data={sourceData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                </div>

                {/* STATUS CARDS */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                    <h2 className="font-semibold mb-4 text-gray-700">
                        Leads by Status
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {data.statusDistribution.map((item) => (
                            <div
                                key={item._id}
                                className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition"
                            >
                                <p className="text-sm text-gray-500">
                                    {item._id}
                                </p>
                                <p className="text-xl font-semibold text-gray-800">
                                    {item.count}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

const Card = ({ title, value, icon, color }) => {
    const colors = {
        blue: "bg-blue-50 text-blue-600",
        green: "bg-green-50 text-green-600",
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm p-5 flex items-center justify-between">
            <div>
                <p className="text-sm text-gray-500">{title}</p>
                <p className="text-2xl font-semibold text-gray-800">{value}</p>
            </div>

            <div className={`p-3 rounded-lg ${colors[color]}`}>
                {icon}
            </div>
        </div>
    );
};

export default DashboardPage;