"use client";

import { useState, FormEvent } from "react";

export default function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(""); 

  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMessage(null);

    const formData = {
      Name: name,
      "Phone Number": phone,
      email: email,
      des: message,
    };

    try {
      const response = await fetch("/api/postcontact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Something went wrong!");

      setName("");
      setPhone("");
      setEmail("");
      setMessage("");
      setStatusMessage({ text: "Message sent successfully! ✅", type: "success" });
    } catch (error: any) {
      setStatusMessage({ text: error.message || "Failed to send message. ❌", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center min-h-screen py-16 px-4 sm:px-8">
      <div className="w-full max-w-2xl">
        
        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

        {statusMessage && (
          <div className={`mb-4 p-3 border rounded text-sm ${
            statusMessage.type === 'success' ? 'border-green-500 text-green-700 bg-green-50' : 'border-red-500 text-red-700 bg-red-50'
          }`}>
            {statusMessage.text}
          </div>
        )}

        {/* 2. The exact grid layout from your mentor (labels on left, inputs on right) */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          {/* Name Row */}
          <div className="grid grid-cols-12 gap-4 items-center">
            <label className="col-span-4 text-sm font-medium">Enter your name</label>
            <div className="col-span-8">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Your Name"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Email Row */}
          <div className="grid grid-cols-12 gap-4 items-start">
            <label className="col-span-4 text-sm font-medium pt-2">Email address</label>
            <div className="col-span-8 flex flex-col">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="your.email@example.com"
                required
                disabled={isLoading}
              />
              <p className="text-xs mt-1">We'll never share your email with anyone else.</p>
            </div>
          </div>

          {/* Phone Row (Removed Password and fixed the label) */}
          <div className="grid grid-cols-12 gap-4 items-center">
            <label className="col-span-4 text-sm font-medium">Phone Number</label>
            <div className="col-span-8">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="0301 8976341"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Message Row */}
          <div className="grid grid-cols-12 gap-4 items-start">
            <label className="col-span-4 text-sm font-medium pt-2">Elaborate your concern</label>
            <div className="col-span-8">
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
                placeholder="Write your concern here..."
                required
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="grid grid-cols-12 gap-4 mt-2">
            <div className="col-span-4"></div>
            <div className="col-span-8">
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 border border-gray-300 rounded text-sm font-medium hover:bg-gray-300 transition-colors disabled:opacity-50"
              >
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}