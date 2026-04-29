import { useNavigate } from "react-router-dom";
import LeadForm from "../components/LeadForm";

const CreateLeadPage = () => {
    const navigate = useNavigate()
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">

            <div className="w-full max-w-2xl">
                <div className="flex justify-end mb-3">
                    <button
                        onClick={() => navigate("/")}
                        className="text-sm font-medium text-blue-600 hover:text-blue-800 transition"
                    >
                        ← Back to Home
                    </button>
                </div>

                {/* FORM CARD */}
                <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="mb-3">
                        <h1 className="text-xl font-semibold text-gray-800">
                            Lead Information
                        </h1>
                        <p className="text-sm text-gray-500">
                            Enter details of the new lead
                        </p>
                    </div>

                    <LeadForm />
                </div>

            </div>

        </div>
    );
};

export default CreateLeadPage;