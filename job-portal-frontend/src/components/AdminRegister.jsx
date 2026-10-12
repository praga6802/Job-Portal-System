import axios from "axios";
import React, { useState } from "react";

const AdminRegister = () => {
    const initialFormState = {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        contact: "",
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:8080/auth/admin/register",
                formData,
            );
            setMessage(response?.data?.message);
            setTimeout(() => {
                handleReset();
            }, 2000);
            console.log("SignUp Successfully!");
        } catch (err) {
            setMessage(err.response?.data?.message);
            console.error(err);
        }
    };

    return (
        <div>
            <h1>Admin SignUp</h1>
            <form>
                <div>
                    <div style={{ marginBottom: "15px" }}>
                        <label htmlFor="firstname">First Name</label>
                        <br />
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

                    <div style={{ marginBottom: "15px" }}>
                        <label htmlFor="lastname">Last Name</label>
                        <br />
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

                    <div style={{ marginBottom: "15px" }}>
                        <label htmlFor="email">Email</label>
                        <br />
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

                    <div style={{ marginBottom: "15px" }}>
                        <label htmlFor="password">Password</label>
                        <br />
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

                    <div style={{ marginBottom: "15px" }}>
                        <label htmlFor="contact">Contact Number</label>
                        <br />
                        <input
                            type="tel"
                            placeholder="Enter your contact number"
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

                    <div>
                        <button type="button" onClick={handleSubmit}>
                            SUBMIT
                        </button>
                        <button type="button" onClick={handleReset}>
                            RESET
                        </button>
                    </div>
                </div>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AdminRegister;
