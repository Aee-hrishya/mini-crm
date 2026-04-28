import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { getLeads } from "../services/leadService";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { statusColors } from "../utils/statusColors";

const LeadTable = () => {
    const [rowData, setRowData] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const fetchLeads = async () => {
        try {
            setLoading(true);
            const data = await getLeads();
            setRowData(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeads();
    }, []);

    const ActionRenderer = (params) => {
        const navigate = useNavigate();

        if (!params.data) return null;

        return (
            <div className="flex justify-center items-center h-full">
                <FaEye
                    className="text-blue-600 cursor-pointer hover:text-blue-800"
                />
            </div>
        );
    };

    const columnDefs = [
        { headerName: "Name", field: "name", flex: 1, },
        { headerName: "Phone", field: "phone", flex: 1 },
        {
            headerName: "Budget",
            field: "budget",
            flex: 1,
            valueFormatter: (p) => `₹${Number(p.value).toLocaleString()}`,
            cellClass: "text-right",
        },
        { headerName: "Location", field: "location", flex: 1 },
        { headerName: "Source", field: "source", flex: 1 },
        {
            headerName: "Status",
            field: "status",
            flex: 1,
            cellRenderer: (params) => {
                const status = params.value;

                return (
                    <span
                        className={`px-2 py-1 text-xs rounded-full font-medium ${statusColors[status] || "bg-gray-100 text-gray-700"
                            }`}
                    >
                        {status}
                    </span>
                );
            },
        },
        {
            headerName: "Actions",
            field: "actions",
            cellRenderer: ActionRenderer,
            flex: 1
        }
    ];

    return (
        <div className="bg-white rounded-xl shadow p-4">

            <div className="ag-theme-alpine w-full cursor-pointer">
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    domLayout="autoHeight"
                    pagination={true}
                    paginationPageSize={10}
                    paginationPageSizeSelector={[10, 20, 50]}
                    rowHeight={50}
                    loading={loading}
                    defaultColDef={{
                        sortable: true,
                        filter: true,
                        floatingFilter: true,
                        resizable: true,
                    }}
                    theme="legacy"
                    overlayNoRowsTemplate={
                        '<span class="text-gray-500 text-sm">No data available</span>'
                    }
                    onRowClicked={(params) => {
                        if (!params.data) return;
                        navigate(`/lead/${params.data._id}`);
                    }}
                />
            </div>
        </div >
    );
};

export default LeadTable;