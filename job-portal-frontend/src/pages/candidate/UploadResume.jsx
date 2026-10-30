import React, { useState, useEffect } from "react";
import axiosInstance from "../../services/api.js";

const UploadResume = () => {
    const [resume, setResume] = useState(null);
    const [existingResume, setExistingResume] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    const fetchExistingResume = async () => {
        try {
            const response = await axiosInstance.get(
                "/auth/candidate/current-resume",
            );

            setExistingResume(response.data.data);
        } catch (error) {
            console.error("Failed to fetch resume:", error);
            setExistingResume(null);
        } finally {
            setFetching(false);
        }
    };

    useEffect(() => {
        fetchExistingResume();
    }, []);

    // Upload Resume
    const handleUploadResume = async () => {
        if (!resume) {
            alert("Please select a resume first");
            return;
        }

        const formData = new FormData();
        formData.append("file", resume);

        try {
            setLoading(true);

            const response = await axiosInstance.post(
                "/auth/candidate/upload-resume",
                formData,
            );

            alert(response.data.message || "Resume uploaded successfully!");

            setResume(null);

            // Fetch uploaded resume details
            await fetchExistingResume();
        } catch (error) {
            console.error("Resume upload failed:", error);

            alert(error.response?.data?.message || "Failed to upload resume");
        } finally {
            setLoading(false);
        }
    };

    // File Validation
    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        const allowedTypes = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];

        if (!allowedTypes.includes(file.type)) {
            alert("Please upload PDF or DOC/DOCX files");
            e.target.value = "";
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert("File size should not exceed 5MB");
            e.target.value = "";
            return;
        }

        setResume(file);
    };

    // View Resume
    const handleViewResume = async () => {
        try {
            const response = await axiosInstance.get(
                "/auth/candidate/view-resume",
                { responseType: "blob" },
            );

            const fileURL = window.URL.createObjectURL(response.data);

            window.open(fileURL, "_blank");
        } catch (error) {
            console.error("View resume failed:", error);
            alert("Unable to view resume");
        }
    };

    // Download Resume
    const handleDownloadResume = async () => {
        try {
            const response = await axiosInstance.get(
                "/auth/candidate/download-resume",
                { responseType: "blob" },
            );

            const fileURL = window.URL.createObjectURL(response.data);

            const link = document.createElement("a");

            link.href = fileURL;
            link.download = existingResume.fileName || "Resume";

            document.body.appendChild(link);
            link.click();
            link.remove();

            window.URL.revokeObjectURL(fileURL);
        } catch (error) {
            console.error("Download resume failed:", error);
            alert("Unable to download resume");
        }
    };

    // Delete Resume
    const handleDeleteResume = async () => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete your resume?",
        );

        if (!confirmDelete) return;

        try {
            setLoading(true);

            const response = await axiosInstance.delete(
                "/auth/candidate/delete-resume",
            );

            alert(response.data.message || "Resume deleted successfully!");

            setExistingResume(null);
        } catch (error) {
            console.error("Delete resume failed:", error);

            alert(error.response?.data?.message || "Failed to delete resume");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen py-2 px-3">
            <div className="bg-white rounded-lg min-h-screen py-10">
                <div className="max-w-3xl border-1 rounded-lg border-gray-400 mx-auto bg-white py-14 px-10">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-800">
                            RESUME
                        </h2>

                        <p className="text-blue-600 mt-2 mb-8">
                            Upload your latest resume to help employers discover
                            your profile.
                        </p>
                    </div>

                    {fetching ? (
                        <div className="bg-white rounded-xl shadow-sm border p-10 text-center">
                            <i className="fa-solid fa-spinner fa-spin text-3xl text-blue-600"></i>

                            <p className="text-gray-500 mt-3">
                                Loading resume details...
                            </p>
                        </div>
                    ) : existingResume ? (
                        // Existing Resume UI

                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
                                    <i className="fa-solid fa-file-pdf text-3xl text-blue-600"></i>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-gray-800 break-all">
                                        {existingResume.fileName}
                                    </h3>

                                    <p className="text-sm text-green-600 mt-1">
                                        <i className="fa-solid fa-circle-check mr-1"></i>
                                        Resume uploaded successfully
                                    </p>
                                </div>
                            </div>

                            <div className="border-t border-gray-100 mt-6 pt-5">
                                <h3 className="text-sm font-semibold text-gray-700 mb-4">
                                    Manage Your Resume
                                </h3>

                                <div className="flex flex-wrap gap-3">
                                    <button
                                        type="button"
                                        onClick={handleViewResume}
                                        className="flex-1 min-w-24 bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-3 rounded-lg font-semibold transition  cursor-pointer"
                                    >
                                        <i class="fa-solid fa-eye"></i> View
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleDownloadResume}
                                        className="flex-1 min-w-24 bg-green-50 text-green-600 hover:bg-green-100 px-4 py-3 rounded-lg font-semibold transition  cursor-pointer"
                                    >
                                        <i className="fa-solid fa-download mr-2"></i>
                                        Download
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleDeleteResume}
                                        disabled={loading}
                                        className="flex-1 min-w-24 bg-red-50 text-red-600 hover:bg-red-100 px-4 py-3 rounded-lg font-semibold transition  cursor-pointer disabled:opacity-50"
                                    >
                                        <i className="fa-solid fa-trash mr-2"></i>
                                        {loading ? "Deleting..." : "Delete"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        // No Resume - Upload UI

                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                            <div className="text-center mb-6">
                                <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                                    <i className="fa-solid fa-file-arrow-up text-3xl text-green-600"></i>
                                </div>

                                <h3 className="text-lg font-semibold mt-4">
                                    Upload your resume
                                </h3>

                                <p className="text-sm text-gray-500 mt-1">
                                    Drag and drop your file here or browse
                                </p>
                            </div>

                            {/* File Selection */}

                            <label className="flex flex-col items-center justify-center border-2 border-dashed border-blue-300 rounded-xl p-10 cursor-pointer hover:bg-blue-50 transition">
                                <i className="fa-solid fa-cloud-arrow-up text-4xl text-blue-500 mb-4"></i>

                                <span className="font-semibold text-gray-700">
                                    Click to browse files
                                </span>

                                <span className="text-sm text-gray-400 mt-2">
                                    PDF, DOC, DOCX (Maximum 5MB)
                                </span>

                                <input
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                            </label>

                            {/* Selected Resume */}

                            {resume && (
                                <div className="flex items-center justify-between border border-gray-200 rounded-lg p-4 mt-5">
                                    <div className="flex items-center gap-3">
                                        <i className="fa-solid fa-file-lines text-3xl text-green-600"></i>

                                        <div>
                                            <p className="font-semibold text-gray-700 text-sm break-all">
                                                {resume.name}
                                            </p>

                                            <p className="text-xs text-gray-400">
                                                {(resume.size / 1024).toFixed(
                                                    1,
                                                )}{" "}
                                                KB
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => setResume(null)}
                                        disabled={loading}
                                        className="text-red-500 hover:text-red-600 cursor-pointer border border-red-300 px-3 py-2 rounded-lg font-semibold disabled:opacity-50"
                                    >
                                        <i className="fa-solid fa-trash mr-1"></i>
                                        Remove
                                    </button>
                                </div>
                            )}

                            {/* Upload Button */}

                            <button
                                type="button"
                                disabled={!resume || loading}
                                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg mt-6 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
                                onClick={handleUploadResume}
                            >
                                {loading ? (
                                    <>
                                        <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                                        Uploading...
                                    </>
                                ) : (
                                    <>
                                        <i className="fa-solid fa-upload mr-2"></i>
                                        Upload Resume
                                    </>
                                )}
                            </button>
                        </div>
                    )}

                    <div className="mt-6 bg-green-100 border border-green-100 rounded-lg p-4 flex gap-2 items-center">
                        <span>
                            <i className="fa-solid fa-circle-info text-blue-600 mt-1"></i>
                        </span>
                        <p className="text-sm text-green-800 text-center">
                            Keep your resume updated to improve your chances of
                            getting hired.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UploadResume;
