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
    User,
    Calendar,
    Settings,
} from "lucide-react";

const Candidates = () => {
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const fetchCandidates = async () => {
        setLoading(true);
        setMessage("");

        try {
            const response = await axiosInstance.get(`/auth/admin/candidates`, {
                withCredentials: true,
            });
            console.log(response.data.data);
            setCandidates(response.data.data ?? []);
        } catch (error) {
            setCandidates([]);

            setMessage(
                error.response?.data?.message || `Failed to fetch Candidates.`,
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
        fetchCandidates();
    }, []);

    return (
        <div className="space-y-6 m-5">
            <div className="bg-blue-950 p-3 rounded-lg">
                <h1 className="text-2xl font-bold text-yellow-500">
                    Candidates List
                </h1>
                <p className="mt-1 text-sm text-slate-100">
                    View and manage all registered candidates on the platform.
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
                    Loading Candidates...
                </p>
            ) : candidates.length === 0 ? (
                <p className="p-2 w-fit font-semibold mx-auto text-red-500 text-center border-red-500 border-1 rounded-lg">
                    No Candidates found!
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-6">
                    {candidates.map((candidate) => {
                        return (
                            <div
                                className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
                                key={candidate.candidateId}
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12  rounded-full border-1 border-blue-300 bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                                        <User size={25} />
                                    </div>

                                    <h2 className="text-lg font-bold text-gray-800">
                                        {candidate.firstname}{" "}
                                        {candidate.lastname}
                                    </h2>

                                    <p
                                        className={`border-1 font-semibold rounded-full px-2 ${
                                            candidate.experience === "Fresher"
                                                ? "border-green-500 text-green-500"
                                                : "border-blue-500 text-blue-500"
                                        }`}
                                    >
                                        {candidate.experience !== "Fresher"
                                            ? candidate.experience + " years"
                                            : candidate.experience}
                                    </p>
                                </div>

                                <div className="space-y-3 text-sm">
                                    <div className="flex items-start gap-3 text-gray-600">
                                        <Mail
                                            size={17}
                                            className="text-red-600 mt-0.5 shrink-0"
                                        />
                                        <span className="break-all">
                                            {candidate.email}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-3 text-gray-600">
                                        <Phone
                                            size={17}
                                            className="text-green-600 shrink-0"
                                        />
                                        <span>{candidate.contact}</span>
                                    </div>

                                    <div className="flex items-start gap-3 text-gray-600">
                                        <Calendar
                                            size={17}
                                            className="text-purple-600 mt-0.5 shrink-0"
                                        />
                                        <span>
                                            {new Date(candidate.dob)
                                                .toLocaleDateString("en-IN")
                                                .replaceAll("/", "-")}
                                        </span>
                                    </div>

                                    <div className="flex items-start gap-3 text-gray-600">
                                        <Settings
                                            size={17}
                                            className="text-blue-600 mt-0.5 shrink-0"
                                        />
                                        <span>{candidate.skills}</span>
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

export default Candidates;
