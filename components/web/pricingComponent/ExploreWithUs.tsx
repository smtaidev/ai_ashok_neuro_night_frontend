"use client";

import { useState } from "react";
import { LuSend } from "react-icons/lu";

type FormData = {
  fullName: string;
  phone: string;
  email: string;
  companyName: string;
  message: string;
};

const ExploreWithUs = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phone: "",
    email: "",
    companyName: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Form Data:", formData);
  };

  const bulletPoints = [
    "Revolutionize Strategy Development AI-Powered Simplicity",
    "Say Goodbye to Costly Consultants",
    "Unlock Marketplace Reality",
    "Empower Your Team to Confront Challenges Head-On",
    "Shape Your Success Story Today",
  ];

  return (
    <section className="py-16 px-4 sm:px-8 bg-white">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        {/* Left Content */}
        <div>
          <h2 className="text-2xl lg:text-3xl font-semibold mb-4 text-[#111827]">
            Explore the Possibilities With Us
          </h2>
          <p className="text-gray-600 text-lg mt-8 mb-8">
            Sign up for a personalized demo today to see how Clarhet drives
            business growth and to learn about limited time offers
          </p>

          <h3 className="text-2xl font-bold mb-8 text-[#111827d2]">
            Your Custom Demo Will Show You How To
          </h3>
          <ul className="space-y-4">
            {bulletPoints.map((point, index) => (
              <li
                key={index}
                className="flex items-start leading-[40px] text-blue-700 font-medium"
              >
                <span className="text-xl mr-2">✔</span> {point}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Form */}
        <div className="bg-white  shadow-md rounded-md p-6 w-full">
          <h3 className="text-xl font-semibold mb-6 text-[#111827]">
            We’ll be in touch within 24 hours
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                placeholder="Enter Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full border border-gray-400/40 rounded-lg px-4 py-2 "
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="text"
                name="phone"
                placeholder="Enter Your Phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-gray-400/40 rounded-lg px-4 py-2 "
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter Your Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-400/40 rounded-lg px-4 py-2 "
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Company Name
              </label>
              <input
                type="text"
                name="companyName"
                placeholder="Enter Company Name"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full border border-gray-400/40 rounded-lg px-4 py-2 "
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea
                name="message"
                placeholder="Type message..."
                value={formData.message}
                onChange={handleChange}
                className="w-full border border-gray-400/40 rounded-lg px-4 py-2  resize-none"
                rows={4}
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="mt-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded flex items-center gap-2"
              >
                <LuSend />
                Let’s get started
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ExploreWithUs;
