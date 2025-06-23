"use client"
import React, { useState, useEffect } from "react";
import { Shield } from "lucide-react";
import Link from "next/link";


const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed w-full z-[100] transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto flex justify-between items-center px-6">
                <div className="flex items-center">
                    <Shield className="h-8 w-8 text-red-600 mr-2" />
                    <span className="font-bold text-xl text-red-600"><Link href="/">DisasterShield</Link></span>
                </div>
                <div className="hidden md:flex space-x-8">
                    <Link href="/prediction">Alerts</Link>
                    <Link href="/mapping">Emergency Map</Link>
                    <Link href="/disasterPosts">Donate</Link>
                    {/* <NavLink href="/chatbot">Get Help</NavLink> */}
                </div>
                <Link href="/chatbot" className="bg-red-600 text-white px-4 py-2 rounded-full font-medium hover:bg-red-700 transition-colors">
                    Get Help
                </Link>
            </div>
        </nav>
    )
}
export default Navbar;
