import React, { useEffect, useState } from "react";
import axiosInstance from "../../services/api";

const CandidateProfile = () => {
    const [candidate, setCandidate] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        contact: "",
        location: "",
        dob: "",
        skills: "",
        experience: "",
    });

    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCandidate();
    }, []);

    const fetchCandidate = async () => {
        try {
            const response = await axiosInstance.get("/auth/candidate/current");

            const data = response.data.data;

            setCandidate({
                firstname: data.firstname || "",
                lastname: data.lastname || "",
                email: data.email || "",
                password: "",
                contact: data.contact || "",
                location: data.location || "",
                dob: data.dob || "",
                skills: data.skills || "",
                experience: data.experience || "",
            });
        } catch (error) {
            setMessage("Unable to load candidate profile.");
            setIsSuccess(false);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setCandidate((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            const updatedCandidate = { ...candidate };

            const response = await axiosInstance.put(
                "/auth/candidate/update",
                updatedCandidate,
            );

            setMessage(
                response?.data?.message || "Profile updated successfully!",
            );
            setIsSuccess(true);

            setCandidate((prev) => ({
                ...prev,
            }));

            setTimeout(() => {
                setMessage("");
            }, 2000);
        } catch (error) {
            setMessage(
                error.response?.data?.message || "Failed to update profile.",
            );
            setIsSuccess(false);
        }
    };

    if (loading) {
        return (
            <div className="p-8 text-center text-gray-600">
                Loading candidate profile...
            </div>
        );
    }

    const fields = [
        { name: "firstname", label: "First Name", type: "text" },
        { name: "lastname", label: "Last Name", type: "text" },
        { name: "email", label: "Email Address", type: "email" },
        { name: "contact", label: "Contact Number", type: "tel" },
        { name: "location", label: "Location", type: "text" },
        { name: "dob", label: "Date of Birth", type: "date" },
        { name: "skills", label: "Skills", type: "text" },
        {
            name: "experience",
            label: "Experience",
            type: "text",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100 px-4 py-10">
            <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-lg sm:p-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Candidate Profile
                    </h1>
                    <p className="mt-2 text-gray-500">
                        Manage and update your personal information.
                    </p>
                </div>

                {message && (
                    <div
                        className={`mb-6 rounded-lg border p-3 text-center text-sm ${
                            isSuccess
                                ? "border-green-300 bg-green-50 text-green-700"
                                : "border-red-300 bg-red-50 text-red-700"
                        }`}
                    >
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        {fields.map((field) => (
                            <div
                                key={field.name}
                                className={
                                    field.name === "skills"
                                        ? "sm:col-span-2"
                                        : ""
                                }
                            >
                                <label
                                    htmlFor={field.name}
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    {field.label}
                                </label>

                                <input
                                    id={field.name}
                                    name={field.name}
                                    type={field.type}
                                    value={candidate[field.name]}
                                    onChange={handleChange}
                                    placeholder={`Enter ${field.label.toLowerCase()}`}
                                    required={field.name !== "password"}
                                    autoComplete={
                                        field.name === "password"
                                            ? "new-password"
                                            : field.name === "email"
                                              ? "email"
                                              : "off"
                                    }
                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 flex flex-wrap gap-4">
                        <button
                            type="submit"
                            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                        >
                            Update Profile
                        </button>

                        <button
                            type="button"
                            onClick={fetchCandidate}
                            className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
                        >
                            Reset
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CandidateProfile;
