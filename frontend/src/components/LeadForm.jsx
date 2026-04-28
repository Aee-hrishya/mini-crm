import { useFormik } from "formik";
import * as Yup from "yup";
import { createLead } from "../services/leadService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const LeadForm = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: "",
            phone: "",
            email: "",
            budget: "",
            location: "",
            propertyType: "",
            source: "",
        },

        // ✅ REMOVE validateOnChange/Blur (default is true)

        validationSchema: Yup.object({
            name: Yup.string().required("Name is required"),
            phone: Yup.string()
                .matches(/^\d+$/, "Phone must contain only digits")
                .min(10, "Phone must be at least 10 digits")
                .max(10, "Phone cannot exceed 10 digits")
                .required("Phone is required"),
            email: Yup.string().email("Invalid email"),
            budget: Yup.number()
                .typeError("Budget must be a number")
                .positive("Budget must be a positive number")
                .required("Budget is required"),
            propertyType: Yup.string().required("Property type is required"),
            source: Yup.string().required("Source is required"),
        }),

        onSubmit: async (values, { resetForm }) => {
            try {
                setLoading(true);
                await createLead(values);
                resetForm();
                toast.success("Lead created successfully");
                navigate("/leads");
            } catch (err) {
                console.error(err);
                toast.error("Failed to create lead");
            } finally {
                setLoading(false);
            }
        },
    });

    const inputClass =
        "w-full border rounded-md p-2 focus:outline-none focus:ring-2";

    const getInputClass = (field) =>
        `${inputClass} ${formik.touched[field] && formik.errors[field]
            ? "border-red-400 focus:ring-red-400"
            : "border-gray-300 focus:ring-blue-500"
        }`;

    const phoneChangeHandler = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            formik.setFieldValue("phone", value, true);
        }
    };

    return (
        <form onSubmit={formik.handleSubmit} className="space-y-4">

            {/* Name */}
            <div>
                <input
                    name="name"
                    placeholder="Full Name *"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    className={getInputClass("name")}
                />
                {formik.touched.name && formik.errors.name && (
                    <p className="text-red-500 text-sm">{formik.errors.name}</p>
                )}
            </div>

            {/* Phone */}
            <div>
                <input
                    name="phone"
                    placeholder="Phone Number *"
                    onChange={phoneChangeHandler}
                    onBlur={formik.handleBlur}
                    value={formik.values.phone}
                    className={getInputClass("phone")}
                />
                {formik.touched.phone && formik.errors.phone && (
                    <p className="text-red-500 text-sm">{formik.errors.phone}</p>
                )}
            </div>

            {/* Email */}
            <div>
                <input
                    name="email"
                    placeholder="Email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    className={getInputClass("email")}
                />
                {formik.touched.email && formik.errors.email && (
                    <p className="text-red-500 text-sm">{formik.errors.email}</p>
                )}
            </div>

            {/* Budget */}
            <div>
                <input
                    name="budget"
                    type="number"
                    placeholder="Budget *"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.budget}
                    className={getInputClass("budget")}
                />
                {formik.touched.budget && formik.errors.budget && (
                    <p className="text-red-500 text-sm">{formik.errors.budget}</p>
                )}
            </div>

            {/* Location */}
            <div>
                <input
                    name="location"
                    placeholder="Location"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.location}
                    className={getInputClass("location")}
                />
            </div>

            {/* Property Type */}
            <div>
                <select
                    name="propertyType"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.propertyType}
                    className={getInputClass("propertyType")}
                >
                    <option value="">Select Property Type</option>
                    <option value="1BHK">1BHK</option>
                    <option value="2BHK">2BHK</option>
                    <option value="3BHK">3BHK</option>
                    <option value="Plot">Plot</option>
                </select>
                {formik.touched.propertyType && formik.errors.propertyType && (
                    <p className="text-red-500 text-sm">
                        {formik.errors.propertyType}
                    </p>
                )}
            </div>

            {/* Source */}
            <div>
                <select
                    name="source"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.source}
                    className={getInputClass("source")}
                >
                    <option value="">Select Source</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Google">Google</option>
                    <option value="Referral">Referral</option>
                </select>
                {formik.touched.source && formik.errors.source && (
                    <p className="text-red-500 text-sm">
                        {formik.errors.source}
                    </p>
                )}
            </div>

            {/* Submit */}
            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-60"
            >
                {loading ? "Creating..." : "Create Lead"}
            </button>
        </form>
    );
};

export default LeadForm;