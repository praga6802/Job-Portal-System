import React, { useEffect, useState } from "react";
import axios from "axios";
import CompanySidebar from "./CompanySidebar";
import Button from "../../components/Button";
import axiosInstance from "../../services/api.js";

const CompanyUpdate = () => {
    const [company, setCompany] = useState({
        name: "",
        description: "",
        email: "",
        contact: "",
        url: "",
        size: "",
        type: "",
        location: "",
        gst: "",
    });

    const [originalData, setOriginalData] = useState(null);

    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchCompany = async () => {
            try {
                const response = await axiosInstance.get(
                    "/auth/company/current"
                );
                const companyData = response.data.data ?? response.data;
                setCompany(companyData);
                setOriginalData(companyData);
            } catch (err) {
                const status = err.response?.status;
                if (status === 401) {
                    setMessage("Session Expired. Please login again.");
                } else if (status === 403) {
                    setMessage(
                        "Access Denied. Please check your login and permissions.",
                    );
                } else {
                    setMessage(
                        "Unable to fetch company details. Please try again.",
                    );
                }
                console.error(
                    "Company fetch error",
                    err.response?.data?.message,
                );
            } finally {
                setLoading(false);
            }
        };

        fetchCompany();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setCompany((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleReset = () => {
        if (originalData) {
            setCompany({ ...originalData });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            const response = await axiosInstance.put(
                "/auth/company/update",
                company,
            );

            setMessage(
                response?.data?.message ||
                    "Company profile updated successfully!",
            );
        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                    "Failed to update company profile.",
            );
            console.error("Update company error:", {
                message: error.message,
                status: error.response?.status,
                response: error.response?.data,
            });
        }
    };

    if (loading) {
        return <p className="p-6 text-center">Loading company details...</p>;
    }

    const fields = [
        { name: "name", label: "Company Name", type: "text" },
        { name: "email", label: "Email Address", type: "email" },
        { name: "contact", label: "Contact Number", type: "tel" },
        { name: "url", label: "Company Website", type: "text" },
        { name: "size", label: "Company Size", type: "text" },
        { name: "type", label: "Company Type", type: "text" },
        { name: "location", label: "Location", type: "text" },
        { name: "gst", label: "GST Number", type: "text" },
        { name: "description", label: "Company Description", type: "textarea" },
    ];

    return (
        <div className="min-h-screen bg-slate-100 flex justify-between">
            {loading ? (
                <p>Loading Company Details..</p>
            ) : message ? (
                <p className="m-5 w-fit mx-auto p-2 rounded-lg text-center border border-1 border-red-500 text-red-600 font-semibold h-fit">
                    {message}
                </p>
            ) : company ? (
                <>
                    <CompanySidebar />
                    <div className="mt-16 mx-auto mb-8 w-full max-w-3xl rounded-xl bg-white p-6 shadow-md md:p-7 h-fit">
                        <h1 className="mb-6 text-2xl font-bold text-blue-950 text-center mb-5">
                            UPDATE COMPANY PROFILE
                        </h1>

                        {message && (
                            <p
                                role="status"
                                className={`mb-5 rounded-md p-3 text-sm ${
                                    message.toLowerCase().includes("success")
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                }`}
                            >
                                {message}
                            </p>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                {fields.map((field) => (
                                    <div
                                        key={field.name}
                                        className={
                                            field.name === "description"
                                                ? "md:col-span-2"
                                                : ""
                                        }
                                    >
                                        <label
                                            htmlFor={field.name}
                                            className="mb-2 block text-sm font-medium text-gray-700"
                                        >
                                            {field.label}
                                        </label>

                                        {field.name === "description" ? (
                                            <textarea
                                                id={field.name}
                                                name={field.name}
                                                value={
                                                    company[field.name] ?? ""
                                                }
                                                onChange={handleChange}
                                                required
                                                rows={4}
                                                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                                            />
                                        ) : (
                                            <input
                                                id={field.name}
                                                name={field.name}
                                                type={field.type}
                                                value={
                                                    company[field.name] ?? ""
                                                }
                                                onChange={handleChange}
                                                required
                                                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>

                            <Button name="Save" />
                        </form>
                    </div>
                </>
            ) : null}
        </div>
    );
};

export default CompanyUpdate;
