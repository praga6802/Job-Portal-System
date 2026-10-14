import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import "../../styles/company-dashboard.css";
import CompanyMain from "./CompanyMain";
import CompanySidebar from "./CompanySidebar";
import CompanyNavbar from "./CompanyNavbar";
import axios from "axios";
import axiosInstance from "../../services/api.js";

const CompanyDashboard = () => {
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

    return (
        <div className="min-h-screen m-0">
            <section className="bg-gray-200 min-h-screen flex">
                {loading ? (
                    <p>Loading Company Details</p>
                ) : message ? (
                    <p className="m-5 w-fit mx-auto p-2 rounded-lg text-center border border-1 border-red-500 text-red-600 font-semibold">
                        {message}
                    </p>
                ) : company ? (
                    <>
                        <CompanySidebar />
                        <div>
                            <CompanyNavbar company={company} />
                            <CompanyMain company={company} />
                        </div>
                    </>
                ) : null}
            </section>
        </div>
    );
};

export default CompanyDashboard;
