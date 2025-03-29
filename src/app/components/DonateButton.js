"use client";

import { useState } from "react";

const DonateButton = () => {
    const [loading, setLoading] = useState(false);

    const handleDonate = async () => {
        setLoading(true);
        const amount = 500; // Amount in INR

        // ✅ Step 1: Create Order via Next.js API Route
        const orderRes = await fetch("/api/razorpay", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount }),
        });

        const order = await orderRes.json();
        setLoading(false);

        if (!order || !order.id) {
            alert("Order creation failed! Try again.");
            return;
        }

        // ✅ Step 2: Open Razorpay Checkout
        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Public key
            amount: order.amount,
            currency: "INR",
            name: "Disaster Relief Fund",
            description: "Donate to help disaster victims",
            order_id: order.id,
            handler: function (response) {
                alert("Payment Successful! 🎉 Transaction ID: " + response.razorpay_payment_id);
            },
            prefill: {
                name: "John Doe",
                email: "johndoe@example.com",
                contact: "9876543210",
            },
            theme: { color: "#f37254" },
        };

        const razor = new window.Razorpay(options);
        razor.open();
    };

    return (
        <button 
            onClick={handleDonate} 
            disabled={loading} 
            className="bg-red-500 text-white px-4 py-2 rounded-md"
        >
            {loading ? "Processing..." : "Donate Now"}
        </button>
    );
};

export default DonateButton;
