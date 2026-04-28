import API from "../api/axios";

export const getNotes = async (leadId) => {
    const res = await API.get(`/leads/${leadId}/notes`);
    return res.data;
};

export const addNote = async (leadId, content) => {
    const res = await API.post(`/leads/${leadId}/notes`, { content });
    return res.data;
};