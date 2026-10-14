import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import apiInstance from "../services/api.js";

const Login = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const initialFormState = {
        email: "",
        password: "",
    };

    const [formData, setFormData] = useState(initialFormState);
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (searchParams.get("sessionExpired") === "true") {
            setMessage("Session expired. Please log in again.");
            setIsError(true);
            setSearchParams({}, { replace: true });
        }
    }, [searchParams, setSearchParams]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleReset = () => {
        setFormData(initialFormState);
        setMessage("");
        setIsError(false);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage("");
        setIsError(false);
        setIsSubmitting(true);

        try {
            const response = await apiInstance.post("/auth/login", formData);

            const result = response.data.data ?? response.data;
            const token = result.token;
            const role = result.role;

            if (!token || !role) {
                setMessage("Login response is missing the token or role.");
                setIsError(true);
                return;
            }

            localStorage.setItem("token", token);
            localStorage.setItem("role", role);

            setFormData(initialFormState);

            if (role === "ADMIN") {
                navigate("/admin/dashboard", { replace: true });
            } else if (role === "COMPANY") {
                navigate("/company/dashboard", { replace: true });
            } else if (role === "CANDIDATE") {
                navigate("/", { replace: true });
            } else {
                localStorage.removeItem("token");
                localStorage.removeItem("role");
                setMessage("Unknown user role. Please contact support.");
                setIsError(true);
            }
        } catch (err) {
            setMessage(
                err.response?.data?.message ||
                    err.response?.data?.data?.message ||
                    "Login failed. Please check your credentials.",
            );
            setIsError(true);
            console.error("Login error:", err.response?.data || err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex min-h-screen items-start justify-around bg-gradient-to-r from-[#0f172a] to-[#1e3a8a] px-6 py-12">
            <div className="mt-20 w-1/2 pr-12 text-center">
                <h1 className="text-7xl font-bold text-yellow-300">
                    Welcome Back!
                </h1>

                <p className="mt-4 text-lg font-bold text-slate-300">
                    Login to continue to your Job Portal account.
                </p>

                <p className="mt-6 text-slate-100">
                    Find your dream job and take the next step in your career.
                </p>
            </div>

            <div className="mt-20 w-1/2 max-w-md rounded-2xl bg-white p-8 shadow-xl sm:p-10">
                <form onSubmit={handleLogin} className="space-y-5">
                    <h1 className="text-center text-2xl font-bold">LOGIN</h1>

                    <div>
                        <label
                            htmlFor="email"
                            className="mb-2 block text-sm font-semibold text-slate-700"
                        >
                            Email Address
                        </label>

                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            autoComplete="email"
                            required
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-800 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="mb-2 block text-sm font-semibold text-slate-700"
                        >
                            Password
                        </label>

                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            autoComplete="current-password"
                            required
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-800 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    <div className="flex justify-center gap-4 pt-2">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isSubmitting ? "Logging in..." : "Login"}
                        </button>

                        <button
                            type="button"
                            onClick={handleReset}
                            className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-yellow-500"
                        >
                            Reset
                        </button>
                    </div>
                </form>

                {message && (
                    <p
                        role="alert"
                        className={`mt-5 mx-auto w-fit max-w-full rounded-lg border p-3 text-center text-sm ${
                            isError
                                ? "border-red-300 bg-red-50 text-red-700"
                                : "border-green-300 bg-green-50 text-green-700"
                        }`}
                    >
                        {message}
                    </p>
                )}

                <p className="mt-6 text-center text-sm text-slate-600">
                    Don't have an account?{" "}
                    <Link
                        to="/candidate/signup"
                        className="font-semibold text-blue-800 hover:text-yellow-600"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
