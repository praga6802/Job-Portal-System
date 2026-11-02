import axios from "axios";
import React, { useState } from "react";
import "../styles/AdminRegister.css";

const AdminRegister = () => {
    const initialFormState = {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        contact: "",
    };

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState(initialFormState);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

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
        setMessageType("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSubmitting) return;

        setIsSubmitting(true);
        setMessage("");
        setMessageType("");

        try {
            const response = await axios.post(
                "http://localhost:8080/auth/admin/register",
                formData,
            );

            setMessage(
                response?.data?.message ||
                    "Admin account created successfully!",
            );

            setMessageType("success");

            setTimeout(() => {
                handleReset();
            }, 2000);
        } catch (err) {
            setMessage(
                err?.response?.data?.message ||
                    "Admin registration failed. Please try again.",
            );

            setMessageType("error");

            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="admin-register-page">
            <div className="admin-register-container">
                <div className="admin-register-header">
                    <h1>Admin SignUp</h1>

                    <p>Create your administrator account</p>
                </div>

                <form className="admin-register-form" onSubmit={handleSubmit}>
                    {/* First Name and Last Name */}

                    <div className="admin-register-name-row">
                        <div className="admin-register-field">
                            <label htmlFor="firstname">First Name</label>

                            <input
                                type="text"
                                placeholder="Enter your first name"
                                id="firstname"
                                name="firstname"
                                value={formData.firstname}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="admin-register-field">
                            <label htmlFor="lastname">Last Name</label>

                            <input
                                type="text"
                                placeholder="Enter your last name"
                                id="lastname"
                                name="lastname"
                                value={formData.lastname}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    {/* Email */}

                    <div className="admin-register-field">
                        <label htmlFor="email">Email Address</label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Password */}

                    <div className="admin-register-field">
                        <label htmlFor="password">Password</label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Contact Number */}

                    <div className="admin-register-field">
                        <label htmlFor="contact">Contact Number</label>

                        <input
                            type="tel"
                            placeholder="Enter 10-digit number"
                            id="contact"
                            name="contact"
                            value={formData.contact}
                            onChange={(e) => {
                                const value = e.target.value;

                                if (/^[0-9]{0,10}$/.test(value)) {
                                    handleChange(e);
                                }
                            }}
                            pattern="[0-9]{10}"
                            maxLength={10}
                            inputMode="numeric"
                            required
                        />
                    </div>

                    {/* Buttons */}

                    <div className="admin-register-buttons">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="admin-register-submit-btn"
                        >
                            {isSubmitting
                                ? "Creating Account..."
                                : "Create Account"}
                        </button>

                        <button
                            type="button"
                            onClick={handleReset}
                            className="admin-register-reset-btn"
                            disabled={isSubmitting}
                        >
                            Reset
                        </button>
                    </div>
                </form>

                {/* Message */}

                {message && (
                    <p className={`admin-register-message ${messageType}`}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
};

export default AdminRegister;
