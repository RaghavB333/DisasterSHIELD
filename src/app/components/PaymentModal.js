"use client";

import { useEffect } from "react";

export default function PaymentModal({ show, onClose, post }) {
    if (!show) return null; // Hide modal if `show` is false

    // 🚀 Function to load Razorpay script
    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            if (window.Razorpay) {
                resolve(true);
                return;
            }
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {
        try {
            const razorpayLoaded = await loadRazorpayScript();
            if (!razorpayLoaded) {
                alert("Failed to load Razorpay SDK. Check your internet connection.");
                return;
            }

            const res = await fetch("/api/razorpay", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: 500 }), // Set donation amount
            });

            const data = await res.json();
            if (!data.success) throw new Error("Order creation failed!");

            const options = {
                key: data.key_id,
                amount: data.order.amount,
                currency: "INR",
                name: "Disaster Relief Fund",
                description: `Donation for ${post?.title}`,
                order_id: data.order.id,
                handler: function (response) {
                    alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
                    onClose(); // Close modal after payment
                },
                prefill: { email: "user@example.com", contact: "9999999999" },
                theme: { color: "#3399cc" },
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error) {
            console.error("Payment Error:", error);
            alert("Payment failed! Try again.");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold">Donate to {post?.title}</h2>
                <p>Amount: ₹500</p>
                <button className="bg-blue-600 text-white px-4 py-2 mt-4 rounded" onClick={handlePayment}>
                    Pay Now
                </button>
                <button className="text-red-500 ml-4" onClick={onClose}>
                    Cancel
                </button>
            </div>
        </div>
    );
}
