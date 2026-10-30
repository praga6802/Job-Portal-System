import React, { useEffect, useState } from "react";
import axiosInstance from "../../services/api.js";

const Queries = () => {
    const [queries, setQueries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchQueries();
    }, []);

    const fetchQueries = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await axiosInstance.get("/auth/admin/queries");

            setQueries(response.data.data || []);
        } catch (error) {
            console.error("Error fetching queries:", error);
            setError(
                error.response?.data?.message || "Failed to fetch queries",
            );
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (date) => {
        if (!date) return "N/A";

        return new Date(date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Contact Queries
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        View and manage queries submitted by users.
                    </p>
                </div>

                <button
                    onClick={fetchQueries}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                    <i className="fa-solid fa-rotate-right"></i>
                    Refresh
                </button>
            </div>

            {/* Query Count */}
            <div className="bg-white border border-gray-200 rounded-xl  w-fit p-5 mb-6 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                        <i className="fa-solid fa-envelope text-xl"></i>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Total Queries</p>
                        <h2 className="text-2xl font-bold text-gray-800">
                            {queries.length}
                        </h2>
                    </div>
                </div>
            </div>

            {loading && (
                <div className="text-center py-12">
                    <i className="fa-solid fa-spinner fa-spin text-3xl text-blue-600"></i>
                    <p className="text-gray-500 mt-3">Loading queries...</p>
                </div>
            )}

            {!loading && error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg">
                    {error}
                </div>
            )}

            {!loading && !error && queries.length === 0 && (
                <div className="bg-white rounded-xl border border-gray-200 text-center py-16">
                    <i className="fa-solid fa-inbox text-5xl text-red-500"></i>
                    <h3 className="text-lg font-semibold text-red-500 mt-4">
                        No Queries Found
                    </h3>
                </div>
            )}

            {/* Query Cards */}
            {!loading && !error && queries.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {queries.map((query) => (
                        <div
                            key={query.queryId}
                            className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <div>
                                    <span className="text-lg bg-blue-100 px-2 py-1 rounded-lg font-semibold text-blue-600">
                                        Query #{query.queryId}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between py-2 w-fit px-3 rounded-lg bg-red-100">
                                    <span className="text-xs text-red-500 font-semibold">
                                        <i className="fa-regular fa-calendar mr-2"></i>
                                        {formatDate(query.createdAt)}
                                    </span>
                                </div>
                            </div>

                            <div className="p-4 mb-2 rounded-lg bg-gray-200">
                                <div className="space-y-3 mb-5 bg-yellow-100 py-2 px-3">
                                    <div className="flex items-center gap-3">
                                        <i className="fa-solid fa-user text-blue-400 w-4"></i>
                                        <span className="text-sm font-medium text-gray-800">
                                            {query.fullName}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <i className="fa-solid fa-envelope text-red-400 w-4"></i>
                                        <span className="text-sm text-black break-all">
                                            {query.email}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <i className="fa-solid fa-phone text-green-400 w-4"></i>
                                        <span className="text-sm text-black">
                                            {query.contact}
                                        </span>
                                    </div>
                                </div>

                                <div className="bg-white rounded-lg p-4 mb-4">
                                    <h3 className="text-normal font-semibold text-blue-700 mb-2">
                                        Query Message
                                    </h3>

                                    <p className="text-sm text-gray-600 leading-relaxed break-words">
                                        {query.message}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Queries;
