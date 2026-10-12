import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginbg from "../assets/login.jpg";

const Login = () => {
    const navigate = useNavigate();

    const initialFormState = {
        email: "",
        password: "",
    };

    const [formData, setFormData] = useState(initialFormState);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleReset = () => {
        setFormData(initialFormState);
        setMessage("");
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:8080/auth/login",
                formData,
            );

            setMessage(response?.data?.message || "Login successful!");

            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
            }

            setFormData(initialFormState);
            navigate("/");

            console.log("Login successful!");
        } catch (err) {
            setMessage(
                err.response?.data?.message ||
                    "Login failed. Please try again.",
            );
            console.error(err);
        }
    };

    return (
        <div className="flex min-h-screen items-start justify-around bg-gradient-to-r from-[#0f172a] to-[#1e3a8a]">
            <div className="text-center w-1/2 pr-12 mt-30">
                <h1 className="text-7xl font-bold text-yellow-300">Welcome Back!</h1>
                <p className="mt-4 text-lg font-bold text-slate-300">
                    Login to continue to your Job Portal account.
                </p>
                <p className="mt-6 text-normal text-slate-100">
                    Find your dream job and take the next step in your career.
                </p>
            </div>
            <div className="w-1/2 mt-30 max-w-md rounded-2xl bg-white p-8 shadow-xl sm:p-10">
                <form onSubmit={handleLogin} className="space-y-5">
                    <h1 className="font-bold text-2xl text-center">LOGIN</h1>
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

                    <div className="flex gap-4 pt-2 justify-center">
                        <button
                            type="submit"
                            className=" rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Login
                        </button>

                        <button
                            type="button"
                            onClick={handleReset}
                            className="rounded-lg border border-slate-300 px-4 py-3 font-semibold text-white transition bg-blue-600
                            hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-slate-300"
                        >
                            Reset
                        </button>
                    </div>
                </form>

                {message && (
                    <p
                        role="status"
                        className={`mt-5 rounded-lg p-3 text-center text-sm ${
                            message.toLowerCase().includes("fail") ||
                            message.toLowerCase().includes("invalid") ||
                            message.toLowerCase().includes("error")
                                ? "bg-red-50 text-red-700"
                                : "bg-green-50 text-green-700"
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
