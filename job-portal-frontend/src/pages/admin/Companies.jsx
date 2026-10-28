import React, { useEffect, useState } from "react";
import axiosInstance from "../../services/api.js";
import {
    Building2,
    Mail,
    Phone,
    Globe,
    MapPin,
    Users,
    BriefcaseBusiness,
    ReceiptText,
} from "lucide-react";

const Companies = () => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const fetchCompanies = async () => {
        setLoading(true);
        setMessage("");

        try {
            const response = await axiosInstance.get(`/auth/admin/companies`, {
                withCredentials: true,
            });
            console.log(response.data.data);
            setCompanies(response.data.data ?? []);
        } catch (error) {
            setCompanies([]);

            setMessage(
                error.response?.data?.message || `Failed to fetch Companies.`,
            );

            console.error(
                "Fetch Error:",
                error.response?.status,
                error.response?.data,
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCompanies();
    }, []);

    return (
        <div className="space-y-6 m-5">
            <div className="bg-blue-950 p-3 rounded-lg">
                <h1 className="text-2xl font-bold text-yellow-500">
                    Company Management
                </h1>
                <p className="mt-1 text-sm text-slate-100">
                    View and manage all registered companies on the platform.
                </p>
            </div>

            {message && (
                <div
                    className="rounded-lg border border-red-400 text-center bg-red-50 font-semibold
                                p-2 text-sm text-red-600"
                >
                    {message}
                </div>
            )}

            {/* fetch companies table */}

            {loading ? (
                <p className="p-8 text-center text-slate-500">
                    Loading Companies...
                </p>
            ) : companies.length === 0 ? (
                <p className="p-2 w-fit font-semibold mx-auto text-red-500 text-center border-red-500 border-1 rounded-lg">
                    No Companies found!
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-6">
                    {companies.map((company) => {
                        return (
                            <div
                                className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
                                key={company.companyId}
                            >
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                                        <Building2 size={25} />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h2 className="text-lg font-bold text-gray-800">
                                            {company.companyName}
                                        </h2>
                                        <p className="text-sm text-black mt-1 flex gap-3 items-center font-semibold">
                                            <span>
                                                Company ID: {company.companyId}
                                            </span>

                                            <span className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full">
                                                {company.industry}
                                            </span>
                                        </p>
                                    </div>

                                    <span className="text-xs font-semibold bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                                        {company.type}
                                    </span>
                                </div>

                                <p className="text-sm text-gray-600 leading-6 mb-5">
                                    {company.description}
                                </p>

                                <div className="space-y-3 text-sm">
                                    <div className="flex items-start gap-3 text-gray-600">
                                        <Mail
                                            size={17}
                                            className="text-blue-600 mt-0.5 shrink-0"
                                        />
                                        <span className="break-all">
                                            {company.email}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-3 text-gray-600">
                                        <Phone
                                            size={17}
                                            className="text-blue-600 shrink-0"
                                        />
                                        <span>{company.contact}</span>
                                    </div>

                                    <div className="flex items-start gap-3 text-gray-600">
                                        <Globe
                                            size={17}
                                            className="text-blue-600 mt-0.5 shrink-0"
                                        />
                                        <a
                                            href={company.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline break-all"
                                        >
                                            {company.url}
                                        </a>
                                    </div>

                                    <div className="flex items-start gap-3 text-gray-600">
                                        <MapPin
                                            size={17}
                                            className="text-blue-600 mt-0.5 shrink-0"
                                        />
                                        <span>{company.location}</span>
                                    </div>

                                    <div className="flex items-center gap-3 text-gray-600">
                                        <Users
                                            size={17}
                                            className="text-blue-600 shrink-0"
                                        />
                                        <span>
                                            <span className="font-semibold text-gray-800">
                                                Company Size:
                                            </span>{" "}
                                            {company.size} employees
                                        </span>
                                    </div>

                                    <div className="flex items-start gap-3 text-gray-600">
                                        <ReceiptText
                                            size={17}
                                            className="text-blue-600 mt-0.5 shrink-0"
                                        />
                                        <span className="break-all">
                                            <span className="font-semibold text-gray-800">
                                                GST:
                                            </span>{" "}
                                            {company.gst}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Companies;
