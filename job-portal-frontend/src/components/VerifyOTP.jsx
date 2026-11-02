import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const VerifyOTP = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const email = location.state?.email;
    const purpose = location.state?.purpose;

    const [otp, setOtp] = useState("");
    const [message, setMessage] = useState("");

    const handleVerify = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:8080/auth/candidate/verify-otp",
                {
                    email,
                    otp,
                    purpose,
                },
            );

            setMessage(response?.data?.message || "OTP verified successfully!");

            setTimeout(() => {
                navigate("/login");
            }, 1500);
        } catch (err) {
            setMessage(err.response?.data?.message || "Invalid OTP!");
        }
    };

    return (
        <div className="min-h-screen flex justify-center w-full bg-gray-100">
            <form
                onSubmit={handleVerify}
                className="bg-white p-8 w-fit mt-30 rounded-xl h-fit shadow-lg"
            >
                <h2 className="text-2xl font-bold text-center mb-3">
                    Verify Your Email
                </h2>

                <p className="text-green-500 text-sm px-2 py-1 border-1 mb-3 rounded-lg">
                    Enter OTP sent to: {email}
                </p>

                <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter 6-digit OTP"
                    maxLength={6}
                    required
                    className="w-full border rounded-lg p-3 mb-4"
                />
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="text-center cursor-pointer px-3 bg-blue-600 text-white w-fit font-semibold py-2 rounded-lg hover:bg-blue-700"
                    >
                        Verify OTP
                    </button>
                </div>

                {message && (
                    <p
                        className={`text-center mt-4 text-normal border-1  ${
                            message.toLowerCase().includes("success")
                                ? "bg-green-50 text-green-500"
                                : "bg-red-50 text-red-500"
                        }`}
                    >
                        {message}
                    </p>
                )}
            </form>
        </div>
    );
};

export default VerifyOTP;
