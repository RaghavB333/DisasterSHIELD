// "use client";
// import { useState, useEffect } from 'react';
// import { useRouter } from "next/navigation";
// import { donate, getDonations } from "./utils/blockchain";
// import { motion } from 'framer-motion';
// import { MapPin, AlertCircle, MessageSquare, Heart } from 'lucide-react';

// export default function Home() {

//   const [amount, setAmount] = useState("");
//     const [donations, setDonations] = useState([]);

//     return (
//         <div className="min-h-screen bg-red-100 text-gray-900">
//             {/* Hero Section */}
//             <div className="relative h-screen flex flex-col justify-center items-center text-center bg-red-600 text-white p-6">
//                 <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-5xl font-bold mb-4">
//                     Disaster Response & Relief Coordination
//                 </motion.h1>
//                 <p className="text-lg mb-6">Real-time alerts, emergency support, and transparent donations.</p>
//                 <button className="bg-white text-red-600 px-6 py-3 rounded-lg shadow-lg hover:bg-gray-200">Get Help Now</button>
//             </div>
            
//             {/* Features Section */}
//             <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 px-6 py-12">
//                 <FeatureCard icon={AlertCircle} link="prediction" title="AI Disaster Alerts" description="Stay updated with real-time alerts powered by AI." />
//                 <FeatureCard icon={MapPin} link="/mapping" title="Emergency Shelter Map" description="Find the nearest shelter, hospital, and aid center." />
//                 <FeatureCard icon={Heart} link="/disasterPosts" title="Secure Donations" description="Donate safely with blockchain-powered transparency." />
//                 <FeatureCard icon={MessageSquare} link="/chatbot" title="24/7 Chatbot Support" description="Get instant help and guidance during emergencies." />
//             </div>
//         </div>
//     );
// }

// function FeatureCard({ icon: Icon, title, description ,link}) {
//   const router = useRouter();
//     return (
//         <motion.div onClick={()=>router.push(link)}  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
//             className="bg-white p-6 rounded-2xl shadow-lg text-center flex flex-col items-center">
//             <Icon className="w-12 h-12 text-red-600 mb-4" />
//             <h3 className="text-xl font-semibold mb-2">{title}</h3>
//             <p className="text-gray-600">{description}</p>
//         </motion.div>
//     );
// }

"use client";
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { donate, getDonations } from "./utils/blockchain";
import { motion } from 'framer-motion';
import Link from "next/link";
import { MapPin, AlertCircle, MessageSquare, Heart, ArrowRight, Shield } from 'lucide-react';

export default function Home() {
  const [amount, setAmount] = useState("");
  const [donations, setDonations] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white text-gray-900">
      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto flex justify-between items-center px-6">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-red-600 mr-2" />
            <span className="font-bold text-xl text-red-600">DisasterShield</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <NavLink href="/prediction">Alerts</NavLink>
            <NavLink href="/mapping">Emergency Map</NavLink>
            <NavLink href="/disasterPosts">Donate</NavLink>
            {/* <NavLink href="/chatbot">Get Help</NavLink> */}
          </div>
          <Link href="/chatbot" className="bg-red-600 text-white px-4 py-2 rounded-full font-medium hover:bg-red-700 transition-colors">
            Get Help
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col justify-center items-center text-center">
        <div className="absolute inset-0 bg-cover bg-center z-0" style={{ 
          backgroundImage: "url('/api/placeholder/1920/1080')",
          filter: "brightness(0.3)"
        }}></div>
        <div className="container mx-auto px-6 relative z-10 text-white">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-black leading-tight">
              Rapid Response When <span className="text-red-400">Every Second Counts</span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-gray-800">
              AI-powered disaster alerts, emergency coordination, and transparent relief funding.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-10 left-0 right-0 flex justify-center">
          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ArrowRight className="w-10 h-10 text-white transform rotate-90" />
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <StatCard number="5,280+" label="People Helped" />
            <StatCard number="$1.2M+" label="Funds Raised" />
            <StatCard number="348" label="Active Volunteers" />
            <StatCard number="24/7" label="Emergency Support" />
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div id="features" className="py-20 bg-gradient-to-b from-white to-red-50">
        <div className="container mx-auto px-6">
          <SectionHeading
            title="Critical Services"
            subtitle="Comprehensive disaster response and relief coordination"
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            <FeatureCard 
              icon={AlertCircle} 
              link="/prediction" 
              title="AI Disaster Alerts" 
              description="Get proactive warnings and real-time updates powered by predictive AI." 
              color="bg-orange-500"
            />
            <FeatureCard 
              icon={MapPin} 
              link="/mapping" 
              title="Interactive Relief Map" 
              description="Locate shelters, hospitals, food stations and evacuation routes instantly." 
              color="bg-blue-500"
            />
            <FeatureCard 
              icon={Heart} 
              link="/disasterPosts" 
              title="Donations" 
              description="Fully transparent fund allocation with real-time tracking of every contribution." 
              color="bg-green-500"
            />
            <FeatureCard 
              icon={MessageSquare} 
              link="/chatbot" 
              title="AI Response Assistant" 
              description="Get immediate answers, emergency protocols and personalized guidance." 
              color="bg-purple-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function NavLink({ href, children }) {
  return (
    <a href={href} className="text-gray-800 hover:text-red-600 transition-colors font-medium">
      {children}
    </a>
  );
}

function SectionHeading({ title, subtitle }) {
  return (
    <div className="text-center max-w-3xl mx-auto">
      <h2 className="text-4xl font-bold mb-4 text-gray-900">{title}</h2>
      <p className="text-xl text-gray-600">{subtitle}</p>
    </div>
  );
}

function StatCard({ number, label }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <h3 className="text-4xl font-bold text-red-600 mb-2">{number}</h3>
      <p className="text-gray-600 text-lg">{label}</p>
    </motion.div>
  );
}

function FeatureCard({ icon: Icon, title, description, link, color }) {
  const router = useRouter();
  
  return (
    <motion.div 
      onClick={() => router.push(link)}
      whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300"
    >
      <div className={`${color} p-6 flex justify-center`}>
        <Icon className="w-12 h-12 text-white" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
        <div className="mt-4 flex items-center text-red-600 font-medium">
          <span>Learn more</span>
          <ArrowRight className="w-4 h-4 ml-1" />
        </div>
      </div>
    </motion.div>
  );
}