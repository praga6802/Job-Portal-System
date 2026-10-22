import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import CompanySidebar from "../pages/company/CompanySidebar";
import CompanyNavbar from "../pages/company/CompanyNavbar";
import axiosInstance from "../services/api.js";

const CompanyLayout = () => {
    const [company, setCompany] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchCompany = async () => {
            try {
                const response = await axiosInstance.get(
                    "/auth/company/current",
                );
                setCompany(response.data.data);
            } catch (err) {
                const status = err.response?.status;

                if (status === 401) {
                    setMessage("Session expired. Please login again.");
                } else if (status === 403) {
                    setMessage("Access denied. Check your permissions.");
                } else {
                    setMessage("Unable to fetch company details.");
                }

                console.error("Company fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCompany();
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <CompanyNavbar company={company} />

            <div className="flex flex-1 min-w-0">
                <CompanySidebar />

                <main className="flex-1 min-w-0 bg-gray-200">
                    {loading ? (
                        <p className="m-5">Loading company details...</p>
                    ) : message ? (
                        <p className="m-5 w-fit rounded-lg border border-red-500 p-3 font-semibold text-red-600">
                            {message}
                        </p>
                    ) : (
                        <Outlet context={{ company }} />
                    )}
                </main>
            </div>
        </div>
    );
};

export default CompanyLayout;
