import React, { useEffect, useState } from "react";
import axiosInstance from "../../services/api.js";
import { User, Mail, Phone } from "lucide-react";

const Admins = () => {
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const fetchAdmins = async () => {
        setLoading(true);
        setMessage("");

        try {
            const response = await axiosInstance.get(`/auth/admin/admins`, {
                withCredentials: true,
            });
            console.log(response.data.data);
            setAdmins(response.data.data ?? []);
        } catch (error) {
            setAdmins([]);

            setMessage(
                error.response?.data?.message || `Failed to fetch Admins.`,
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
        fetchAdmins();
    }, []);

    return (
        <div className="space-y-6 m-5">
            <div className="bg-blue-950 p-3 rounded-lg">
                <h1 className="text-2xl font-bold text-yellow-500">
                    Admins List
                </h1>
                <p className="mt-1 text-sm text-slate-100">
                    View admins on the platform.
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

            {loading ? (
                <p className="p-8 text-center text-slate-500">
                    Loading Admins...
                </p>
            ) : admins.length === 0 ? (
                <p className="p-2 w-fit font-semibold mx-auto text-red-500 text-center border-red-500 border-1 rounded-lg">
                    No Admins found!
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-6">
                    {admins.map((admin) => {
                        return (
                            <div
                                className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
                                key={admin.adminId}
                            >
                                <div className="space-y-3 text-sm font-semibold">
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <User
                                            size={17}
                                            className="text-blue-600 shrink-0"
                                        />
                                        <span>
                                            {admin.firstname} {admin.lastname}
                                        </span>
                                    </div>
                                    <div className="flex items-start gap-3 text-gray-600">
                                        <Mail
                                            size={17}
                                            className="text-red-600 mt-0.5 shrink-0"
                                        />
                                        <span className="break-all">
                                            {admin.email}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-3 text-gray-600">
                                        <Phone
                                            size={17}
                                            className="text-green-600 shrink-0"
                                        />
                                        <span>{admin.contact}</span>
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

export default Admins;
