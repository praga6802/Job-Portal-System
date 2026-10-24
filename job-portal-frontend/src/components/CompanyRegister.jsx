import axios from "axios";
import React, { useState } from "react";
import "../styles/CompanyRegister.css";

const CompanyRegister = () => {
    const initialFormState = {
        name: "",
        description: "",
        email: "",
        contact: "",
        password: "",
        url: "",
        size: "",
        type: "",
        location: "",
        gst: "",
    };

    const [formData, setFormData] = useState(initialFormState);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleReset = () => {
        setFormData({ ...initialFormState });
        setMessage("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            const response = await axios.post(
                "http://localhost:8080/auth/company/register",
                formData,
            );

            setMessage(
                response?.data?.message || "Company registered successfully!",
            );

            setTimeout(() => {
                setFormData({ ...initialFormState });
            }, 2000);
        } catch (err) {
            setMessage(
                err.response?.data?.message || "Company registration failed!",
            );
            console.error(err);
        }
    };

    return (
        <div className="company-register-page">
            <div className="company-register-card">
                <div className="company-register-header">
                    <h1>Company Registration</h1>
                    <p>
                        Register your company and start connecting with talented
                        candidates.
                    </p>
                </div>

                <form className="company-register-form" onSubmit={handleSubmit}>
                    <div className="company-form-field">
                        <label htmlFor="company-name">Company Name</label>
                        <input
                            type="text"
                            id="company-name"
                            name="name"
                            placeholder="Enter company name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="company-form-field">
                        <label htmlFor="description">Company Description</label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            placeholder="Enter company description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="company-form-field">
                        <label htmlFor="email">Company Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="company@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="company-form-field">
                        <label htmlFor="contact">Contact Number</label>
                        <input
                            type="tel"
                            id="contact"
                            name="contact"
                            placeholder="Enter 10-digit number"
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

                    <div className="company-form-field">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="company-form-field">
                        <label htmlFor="url">Company Website</label>
                        <input
                            type="url"
                            id="url"
                            name="url"
                            placeholder="https://example.com"
                            value={formData.url}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="company-form-field">
                        <label htmlFor="size">Company Size</label>
                        <input
                            type="text"
                            id="size"
                            name="size"
                            placeholder="e.g. 50-100 employees"
                            value={formData.size}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="company-form-field">
                        <label htmlFor="type">Company Type</label>
                        <input
                            type="text"
                            id="type"
                            name="type"
                            placeholder="e.g. IT Services"
                            value={formData.type}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="company-form-field">
                        <label htmlFor="location">Location</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            placeholder="e.g. Chennai"
                            value={formData.location}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="company-form-field">
                        <label htmlFor="gst">GST Number</label>
                        <input
                            type="text"
                            id="gst"
                            name="gst"
                            placeholder="Enter 15-character GSTIN"
                            value={formData.gst}
                            maxLength={15}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="company-form-actions">
                        <button
                            type="button"
                            className="company-reset-btn"
                            onClick={handleReset}
                        >
                            Reset
                        </button>

                        <button type="submit" className="company-submit-btn">
                            Register
                        </button>
                    </div>
                </form>

                {message && (
                    <p
                        className="company-register-message"
                        role="status"
                        aria-live="polite"
                    >
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
};

export default CompanyRegister;
