"use client";
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { donate, getDonations } from "./utils/blockchain";
import { motion } from 'framer-motion';
import { MapPin, AlertCircle, MessageSquare, Heart } from 'lucide-react';

export default function Home() {

  const [amount, setAmount] = useState("");
    const [donations, setDonations] = useState([]);

    return (
        <div className="min-h-screen bg-red-100 text-gray-900">
            {/* Hero Section */}
            <div className="relative h-screen flex flex-col justify-center items-center text-center bg-red-600 text-white p-6">
                <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-5xl font-bold mb-4">
                    Disaster Response & Relief Coordination
                </motion.h1>
                <p className="text-lg mb-6">Real-time alerts, emergency support, and transparent donations.</p>
                <button className="bg-white text-red-600 px-6 py-3 rounded-lg shadow-lg hover:bg-gray-200">Get Help Now</button>
            </div>
            
            {/* Features Section */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 px-6 py-12">
                <FeatureCard icon={AlertCircle} link="/" title="AI Disaster Alerts" description="Stay updated with real-time alerts powered by AI." />
                <FeatureCard icon={MapPin} link="/" title="Emergency Shelter Map" description="Find the nearest shelter, hospital, and aid center." />
                <FeatureCard icon={Heart} link="/disasterPosts" title="Secure Donations" description="Donate safely with blockchain-powered transparency." />
                <FeatureCard icon={MessageSquare} link="/chatbot" title="24/7 Chatbot Support" description="Get instant help and guidance during emergencies." />
            </div>
        </div>
    );
}

function FeatureCard({ icon: Icon, title, description ,link}) {
  const router = useRouter();
    return (
        <motion.div onClick={()=>router.push(link)}  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-2xl shadow-lg text-center flex flex-col items-center">
            <Icon className="w-12 h-12 text-red-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </motion.div>
    );
}