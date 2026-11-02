import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const VerifyOTP = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const email = location.state?.email;
    const purpose = location.state?.purpose;

    const [otp, setOtp] = useState("");
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [timeLeft, setTimeLeft] = useState(300);

    useEffect(() => {
        if (timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => Math.max(prev - 1, 0));
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    const handleVerify = async (e) => {
        e.preventDefault();

        if (isSubmitting || timeLeft === 0) return;

        setIsSubmitting(true);
        setMessage("");

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
            setMessage(err?.response?.data?.message || "Invalid OTP!");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center w-full bg-gray-100 px-4">
            <form
                onSubmit={handleVerify}
                className="bg-white p-8 w-full max-w-md rounded-xl shadow-lg"
            >
                <h2 className="text-2xl font-bold text-center mb-3">
                    Verify Your Email
                </h2>

                <p className="text-green-600 text-sm px-3 py-2 border border-green-200 bg-green-50 mb-4 rounded-lg break-all">
                    Enter OTP sent to: {email}
                </p>

                <input
                    type="text"
                    value={otp}
                    onChange={(e) => {
                        const value = e.target.value;

                        if (/^[0-9]{0,6}$/.test(value)) {
                            setOtp(value);
                        }
                    }}
                    placeholder="Enter 6-digit OTP"
                    maxLength={6}
                    inputMode="numeric"
                    required
                    disabled={timeLeft === 0}
                    className="w-full border border-gray-300 rounded-lg p-3 mb-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
                />

                <div className="flex flex-col items-center">
                    <button
                        type="submit"
                        disabled={isSubmitting || timeLeft === 0}
                        className="text-center cursor-pointer px-5 bg-blue-600 text-white w-fit font-semibold py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? "Verifying..." : "Verify OTP"}
                    </button>

                    {/* Countdown */}

                    <p className="mt-3 text-sm font-medium border border-red-400 px-2 py-1 rounded-lg text-red-500 bg-red-50">
                        {timeLeft === 0
                            ? "OTP expired. Please resend OTP."
                            : `OTP expires in ${formattedTime}`}
                    </p>
                </div>

                {/* Message */}

                {message && (
                    <p
                        className={`text-center mt-4 p-3 rounded-lg text-sm border ${
                            message.toLowerCase().includes("success")
                                ? "bg-green-50 text-green-600 border-green-200"
                                : "bg-red-50 text-red-600 border-red-200"
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
