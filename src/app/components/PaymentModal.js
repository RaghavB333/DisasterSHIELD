"use client";

import React from "react";
import DonateButton from "./DonateButton"; 

const PaymentModal = ({ show, onClose, post }) => {
    if (!show || !post) return null; // Ensures modal is only rendered when `show` is true

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4">Donate to {post.title}</h2>
                <p className="text-gray-600 mb-4">{post.description}</p>

                {/* Payment Methods */}
                <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition mb-2">
                    Pay with Crypto (MetaMask)
                </button>

                <div className="p-6">
            <h1 className="text-2xl font-bold">Disaster Relief Fund</h1>
            <DonateButton />
        </div>

                <button className="w-full px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition" 
                    onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default PaymentModal;