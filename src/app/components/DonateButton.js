"use client";

import { useState } from "react";
import PaymentModal from "@/components/PaymentModal";

const DonateButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
            >
                Donate Now
            </button>

            <PaymentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                amount={500} // Donation amount
            />
        </>
    );
};

export default DonateButton;
