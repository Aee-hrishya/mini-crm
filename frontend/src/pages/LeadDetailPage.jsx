import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { getLeadDetailsById, updateLeadStatus } from "../services/leadService";
import { getNotes, addNote } from "../services/noteService";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import { statusColors } from "../utils/statusColors";

const LeadDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [editingStatus, setEditingStatus] = useState(false);
    const [loadingStatus, setLoadingStatus] = useState(false);
    const [lead, setLead] = useState(null);
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState("");

    const dropdownRef = useRef(null);

    const fetchLead = async () => {
        const data = await getLeadDetailsById(id);
        setLead(data);
    };

    const fetchNotes = async () => {
        const data = await getNotes(id);
        setNotes(data);
    };

    useEffect(() => {
        fetchLead();
        fetchNotes();
    }, [id]);

    const handleAddNote = async () => {
        try {
            if (!newNote.trim()) return;
            setLoadingStatus(true)
            await addNote(id, newNote);
            setNewNote("");
            fetchNotes();
        } catch (err) {
            console.error(err);
            toast.error("Failed to add note");
        } finally {
            setLoadingStatus(false)
        }

    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setEditingStatus(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    if (!lead) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
                <ClipLoader size={40} color="#2563eb" />
            </div>
        );
    }

    const statusColor =
        statusColors[lead.status] || "bg-gray-100 text-gray-700";

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            {loadingStatus && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
                    <ClipLoader size={40} color="#2563eb" />
                </div>
            )}

            <div className="max-w-7xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800">
                            {lead.name}
                        </h1>
                        <p className="text-md text-gray-500">
                            Lead Details
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/leads")}
                        className="text-blue-600 hover:underline"
                    >
                        ← Back to Leads
                    </button>
                </div>

                {/* Lead Info Card */}
                <div className="bg-white rounded-xl shadow p-6">

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">

                        <DetailItem label="Phone" value={lead.phone} />
                        <DetailItem label="Email" value={lead.email || "-"} />
                        <DetailItem
                            label="Budget"
                            value={
                                lead.budget
                                    ? `₹${Number(lead.budget).toLocaleString()}`
                                    : "-"
                            }
                        />
                        <DetailItem label="Location" value={lead.location || "-"} />
                        <DetailItem label="Source" value={lead.source || "-"} />

                        {/* STATUS */}
                        <div className="relative" ref={dropdownRef}>
                            <p className="text-sm text-gray-500 mb-1">Status</p>

                            <div className="flex items-center gap-2">
                                {/* Badge */}
                                <span
                                    className={`px-3 py-1 text-sm rounded-full font-medium ${statusColor}`}
                                >
                                    {lead.status}
                                </span>

                                {/* Edit Icon */}
                                <FaEdit
                                    size={14}
                                    className="cursor-pointer text-gray-500 hover:text-black"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setEditingStatus(!editingStatus);
                                    }}
                                />
                            </div>

                            {/* Dropdown */}
                            {editingStatus && (
                                <div className="absolute mt-2 w-40 bg-white border rounded shadow-md z-10">
                                    {["New", "Contacted", "Closed", "Site Visit"].map((status) => (
                                        <div
                                            key={status}
                                            className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                                            onClick={async () => {
                                                try {
                                                    setLoadingStatus(true);

                                                    await updateLeadStatus(id, status);

                                                    setLead((prev) => ({
                                                        ...prev,
                                                        status,
                                                    }));

                                                    toast.success("Status updated");
                                                } catch (err) {
                                                    console.error(err);
                                                    toast.error("Failed to update status");
                                                } finally {
                                                    setLoadingStatus(false);
                                                    setEditingStatus(false);
                                                }
                                            }}
                                        >
                                            {status}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                    </div>
                </div>

                {/* Notes Section */}
                <div className="bg-white rounded-xl shadow p-6">

                    <h2 className="text-lg font-semibold mb-4">
                        Notes
                    </h2>

                    {/* Notes List */}
                    <div className="space-y-3 mb-4">
                        {notes.length > 0 ? (
                            notes.map((note) => (
                                <div
                                    key={note._id}
                                    className="p-3 border rounded-lg bg-gray-50 shadow-sm"
                                >
                                    <p className="text-sm text-gray-800">
                                        {note.content}
                                    </p>

                                    {note.createdAt && (
                                        <p className="text-xs text-gray-400 mt-1">
                                            {new Date(note.createdAt).toLocaleString()}
                                        </p>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-sm">
                                No notes available
                            </p>
                        )}
                    </div>

                    {/* Add Note */}
                    <div className="flex gap-2">
                        <input
                            value={newNote}
                            onChange={(e) => setNewNote(e.target.value)}
                            placeholder="Add a note..."
                            className="flex-1 border rounded-md p-2 focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            onClick={handleAddNote}
                            className="bg-blue-600 text-white px-4 rounded-md hover:bg-blue-700"
                        >
                            Add
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

const DetailItem = ({ label, value }) => (
    <div>
        <p className="text-sm text-gray-500 mb-1">{label}</p>
        <p className="text-gray-800 font-medium">{value}</p>
    </div>
);

export default LeadDetailPage;