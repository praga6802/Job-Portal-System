import React, { useState } from "react";
import axiosInstance from "../services/api.js";

const Contact = () => {
    const [openFaq, setOpenFaq] = useState(null);

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        contact: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            const response = await axiosInstance.post(
                "/auth/contact",
                formData,
            );

            alert(response.data.message || "Query submitted successfully!");

            setFormData({
                fullName: "",
                email: "",
                contact: "",
                message: "",
            });
        } catch (error) {
            console.error("Error submitting query:", error);

            alert(
                error.response?.data?.message ||
                    "Failed to submit your query. Please try again.",
            );
        } finally {
            setLoading(false);
        }
    };

    const faqs = [
        {
            question: "How can I apply for a job?",
            answer: "Create a candidate account, log in, browse available jobs, and click Apply on the job you are interested in.",
        },
        {
            question: "How can a company post a job?",
            answer: "Register as a company, log in to your account, and use the job management section to post job openings.",
        },
        {
            question: "How can I track my job applications?",
            answer: "Log in to your candidate account and visit the My Applications section to check your application status.",
        },
        {
            question: "How can I contact support?",
            answer: "Use the contact form on this page to send your questions or concerns to our support team.",
        },
    ];

    return (
        <section className="min-h-screen bg-gray-100 px-5 py-12">
            <div className="mx-auto max-w-6xl">
                <div className="mb-10 text-center">
                    <h1 className="mb-3 text-5xl font-bold text-blue-800">
                        CONTACT US
                    </h1>
                    <p className="text-yellow-600 font-bold text-xl">
                        We're here to help. Get in touch with our team.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <div className="rounded-xl bg-white p-8 shadow-md">
                        <h2 className="mb-6 text-2xl font-semibold text-blue-950 text-center">
                            Any Help?
                        </h2>

                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <div>
                                <label className="mb-2 block font-medium text-gray-700">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    placeholder="Enter your name"
                                    required
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-950"
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label className="mb-2 block font-medium text-gray-700">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    placeholder="Enter your email"
                                    required
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-950"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block font-medium text-gray-700">
                                    Mobile Number
                                </label>
                                <input
                                    type="tel"
                                    name="contact"
                                    value={formData.contact}
                                    placeholder="Enter 10-digit Number"
                                    required
                                    pattern="[0-9]{10}"
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-950"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block font-medium text-gray-700">
                                    Message
                                </label>
                                <textarea
                                    rows="4"
                                    name="message"
                                    value={formData.message}
                                    placeholder="Write your message..."
                                    required
                                    onChange={handleChange}
                                    className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-950"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full rounded-lg bg-blue-950 py-3 font-semibold text-white transition hover:bg-blue-800"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="overflow-hidden rounded-xl bg-white shadow-md">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.1290722222284!2d79.37206317570465!3d10.953621455898942!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baacd4a1cdda709%3A0x5a54def42e9a8e26!2sSowrashtra%20Middle%20St%2C%20Valayapettai%20Agraharam%2C%20Kumbakonam%2C%20Tamil%20Nadu%20612001!5e0!3m2!1sen!2sin!4v1791796093754!5m2!1sen!2sin"
                                width="100%"
                                height="350"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="strict-origin-when-cross-origin"
                                title="Google Maps - Kumbakonam"
                            />
                        </div>

                        <div className="rounded-xl bg-blue-950 p-6 text-white shadow-md flex flex-col items-center">
                            <h2 className="mb-4 text-2xl font-semibold text-yellow-500">
                                Contact Information
                            </h2>

                            <p className="mb-3">📧 support@jobportal.com</p>

                            <p className="mb-3">📞 +91 82203 09750</p>

                            <p>📍 Kumbakonam, Tamil Nadu, India</p>
                        </div>
                    </div>
                </div>

                <div className="mt-10 rounded-xl bg-white p-8 shadow-md">
                    <div className="mb-8 text-center">
                        <h2 className="text-2xl font-bold text-blue-950">
                            Frequently Asked Questions
                        </h2>
                        <p className="mt-2 text-gray-600">
                            Find answers to common questions about our job
                            portal.
                        </p>
                    </div>

                    <div className="mx-auto max-w-4xl space-y-4">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="overflow-hidden rounded-lg border border-gray-200"
                            >
                                <button
                                    type="button"
                                    onClick={() =>
                                        setOpenFaq(
                                            openFaq === index ? null : index,
                                        )
                                    }
                                    className="flex w-full items-center justify-between gap-4 bg-gray-50 px-5 py-4 text-left font-semibold text-blue-950 transition hover:bg-blue-50"
                                >
                                    <span>{faq.question}</span>
                                    <span className="text-xl">
                                        {openFaq === index ? "−" : "+"}
                                    </span>
                                </button>

                                {openFaq === index && (
                                    <div className="px-5 py-4 leading-7 text-gray-600">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
