import axios from "axios";
import React, { useState } from "react";
import "../CandidateRegister.css";

const CandidateRegister = () => {
    const initialFormState = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        contact: "",
        dob: "",
        skills: "",
        experience: "",
    };

    const [formData, setFormData] = useState(initialFormState);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
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
                "http://localhost:8080/auth/candidate/register",
                formData,
            );

            setMessage(
                response?.data?.message || "Candidate registered successfully!",
            );

            setTimeout(() => {
                setFormData({ ...initialFormState });
            }, 2000);
        } catch (err) {
            setMessage(
                err.response?.data?.message || "Candidate registration failed!",
            );

            console.error(err);
        }
    };

    return (
        <div className="candidate-register-page">
            <div className="candidate-register-card">
                <div className="candidate-register-header">
                    <h1>Candidate SignUp</h1>
                    <p className="font-bold">
                        Create your account and take the next step toward your
                        dream career!
                    </p>
                </div>

                <form
                    className="candidate-register-form"
                    onSubmit={handleSubmit}
                >
                    <div className="candidate-form-field">
                        <label htmlFor="firstname">First Name</label>
                        <input
                            type="text"
                            id="firstname"
                            name="firstName"
                            placeholder="Enter your first name"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="candidate-form-field">
                        <label htmlFor="lastname">Last Name</label>
                        <input
                            type="text"
                            id="lastname"
                            name="lastName"
                            placeholder="Enter your last name"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="candidate-form-field">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="candidate-form-field">
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

                    <div className="candidate-form-field">
                        <label htmlFor="contact">Contact Number</label>
                        <input
                            type="tel"
                            id="contact"
                            name="contact"
                            placeholder="Enter 10-digit number"
                            value={formData.contact}
                            onChange={(e) => {
                                if (/^[0-9]{0,10}$/.test(e.target.value)) {
                                    handleChange(e);
                                }
                            }}
                            pattern="[0-9]{10}"
                            maxLength={10}
                            inputMode="numeric"
                            required
                        />
                    </div>

                    <div className="candidate-form-field">
                        <label htmlFor="dob">Date of Birth</label>
                        <input
                            type="date"
                            id="dob"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="candidate-form-field">
                        <label htmlFor="skills">Skills</label>
                        <input
                            type="text"
                            id="skills"
                            name="skills"
                            placeholder="e.g. Java, React, Spring Boot"
                            value={formData.skills}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="candidate-form-field">
                        <label htmlFor="experience">Experience</label>
                        <input
                            type="text"
                            id="experience"
                            name="experience"
                            placeholder="e.g. Fresher or 2 Years"
                            value={formData.experience}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="candidate-form-actions">
                        <button
                            type="button"
                            className="candidate-reset-btn"
                            onClick={handleReset}
                        >
                            Reset
                        </button>

                        <button type="submit" className="candidate-submit-btn">
                            Create Account
                        </button>
                    </div>
                </form>

                {message && (
                    <p
                        className="candidate-register-message"
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

export default CandidateRegister;
