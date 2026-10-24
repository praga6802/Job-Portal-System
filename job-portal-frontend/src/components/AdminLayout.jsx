import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axiosInstance from "../services/api.js";
import AdminNavbar from "../pages/admin/AdminNavbar.jsx";
import AdminSidebar from "../pages/admin/AdminSidebar.jsx";

const AdminLayout = () => {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                const response = await axiosInstance.get(
                    "/auth/admin/current",
                );
                setAdmin(response.data.data);
            } catch (err) {
                const status = err.response?.status;

                if (status === 401) {
                    setMessage("Session expired. Please login again.");
                } else if (status === 403) {
                    setMessage("Access denied. Check your permissions.");
                } else {
                    setMessage("Unable to fetch admin details.");
                }

                console.error("Admin fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAdmin();
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <AdminNavbar admin={admin} />

            <div className="flex flex-1 min-w-0">
                <AdminSidebar />

                <main className="flex-1 min-w-0 bg-gray-200">
                    {loading ? (
                        <p className="m-5">Loading admin details...</p>
                    ) : message ? (
                        <p className="m-5 w-fit rounded-lg border border-red-500 p-3 font-semibold text-red-600">
                            {message}
                        </p>
                    ) : (
                        <Outlet context={{ admin }} />
                    )}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
