import { useNavigate } from "react-router-dom";
import LeadTable from "../components/LeadTable";

const LeadsPage = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="w-full px-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-semibold text-gray-800">
                        Leads List
                    </h1>

                    <button
                        onClick={() => navigate("/")}
                        className="text-blue-600 hover:underline"
                    >
                        ← Back to Home
                    </button>
                </div>

                {/* Table Card */}
                <div className="bg-white rounded-xl shadow p-4">
                    <LeadTable />
                </div>
            </div>
        </div>
    );
};

export default LeadsPage;