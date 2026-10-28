import React, { useEffect, useState } from "react";
import axiosInstance from "../../services/api";
const AdminProfile = () => {
    const initialAdmin = {
        userId: "",
        firstname: "",
        lastname: "",
        email: "",
        contact: "",
    };
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [admin, setAdmin] = useState(initialAdmin);

    useEffect(() => {
        setIsLoading(true);
        setMessage("");

        const fetchAdmin = async () => {
            try {
                const response = await axiosInstance.get(`/auth/admin/current`);
                const data = response?.data?.data;
                console.log(data);

                if (data) {
                    setAdmin({
                        userId: data.userId ?? "",
                        firstname: data.firstname ?? "",
                        lastname: data.lastname ?? "",
                        email: data.email ?? "",
                        contact: data.contact ?? "",
                    });
                }
            } catch (err) {
                console.error(err);
                setMessage(err?.response?.data?.message);
                console.error(
                    "Unable to fetch admin: ",
                    err?.response?.data?.message,
                );
            } finally {
                setIsLoading(false);
            }
        };
        fetchAdmin();
    }, []);

    const handleChange = (e) => {
        setAdmin({
            ...admin,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setIsLoading(true);

        try {
            const response = await axiosInstance.put(
                "/auth/admin/update",
                {
                    ...admin,
                },
                {
                    withCredentials: true,
                },
            );
            console.log("update api response", response.data);
            const data = response.data?.data;

            if (data && typeof data === "object") {
                setAdmin({
                    userId: data.userId ?? data.userId ?? admin.adminId,
                    firstname: data.firstname ?? admin.firstname,
                    lastname: data.lastname ?? admin.lastname,
                    email: data.email ?? admin.email,
                    contact: data.contact ?? admin.contact,
                });
            }
            setMessage("Admin profile updated successfully.");

            setTimeout(() => {
                setMessage("");
            }, 2000);
        } catch (err) {
            console.error("Failed to update admin", err);
            setMessage(
                err?.response?.data?.message ||
                    "Failed to update admin profile.",
            );
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <p className="text-slate-600">Loading admin profile...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 p-2 md:p-5">
            <div className="bg-blue-950 p-2 rounded-lg mb-8">
                <h1 className="text-2xl font-bold text-yellow-500">
                    Admin Profile
                </h1>
                <p className="text-sm text-slate-200 mt-2">
                    View and manage your administrator information.
                </p>
            </div>

            {message && (
                <div
                    className={`mx-4 my-4 w-fit mx-auto rounded-lg border p-3 text-sm ${
                        message.toLowerCase().includes("success")
                            ? "border-green-300 bg-green-50 text-green-700"
                            : "border-red-300 bg-red-50 text-red-600"
                    }`}
                >
                    {message}
                </div>
            )}

            <div className="bg-white mx-auto max-w-150 rounded-xl border border-slate-500 shadow-sm overflow-hidden">
                <div className="bg-blue-800 p-3">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-white text-blue-600 flex items-center justify-center text-2xl font-bold">
                            {admin.firstname.charAt(0) || ""}
                            {admin.lastname.charAt(0) || ""}
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-white">
                                {admin.firstname} {admin.lastname}
                            </h2>
                            <p className="text-sm text-blue-100">
                                Administrator
                            </p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-6 md:p-8">
                    <div className="mb-2">
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Admin ID
                        </label>
                        <input
                            type="text"
                            name="adminId"
                            value={admin.userId}
                            readOnly
                            className="w-full rounded-lg border border-slate-200 bg-slate-100 px-4 py-3 text-slate-500 outline-none cursor-not-allowed"
                        />
                    </div>

                    <div className="mb-2">
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            First Name
                        </label>
                        <input
                            type="text"
                            name="firstname"
                            value={admin.firstname}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    <div className="mb-2">
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Last Name
                        </label>
                        <input
                            type="text"
                            name="lastname"
                            value={admin.lastname}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    <div className="mb-2">
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={admin.email}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Contact Number
                        </label>
                        <input
                            type="tel"
                            name="contact"
                            value={admin.contact}
                            onChange={handleChange}
                            pattern="[0-9]{10}"
                            maxLength={10}
                            required
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    <div className="flex justify-center gap-3 mt-8 pt-6 border-t border-slate-100">
                        <button
                            type="reset"
                            onClick={() => window.location.reload()}
                            className="px-5 py-2.5 bg-gray-200 rounded-lg hover:bg-gray-300 text-slate-700 font-medium"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminProfile;
