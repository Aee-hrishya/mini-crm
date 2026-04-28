import API from "../api/axios";

// Get all leads
export const getLeads = async () => {
    const res = await API.get("/leads");
    return res.data;
};

// Create lead
export const createLead = async (data) => {
    const res = await API.post("/leads", data);
    return res.data;
};

//Get lead details
export const getLeadDetailsById = async (id) => {
    const res = await API.get(`/leads/${id}`);
    return res.data;
}

//Update lead status
export const updateLeadStatus = async (id, status) => {
    const res = await API.put(`/leads/${id}/status`, { status });
    return res.data;
}