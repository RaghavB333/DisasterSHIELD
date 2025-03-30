
// "use client";

// import { useEffect, useState } from "react";

// export default function DisasterPosts() {
//     const [posts, setPosts] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         // Mock disaster posts data (replace with real API)
//         const fetchData = async () => {
//             try {
//                 const response = await fetch("/api/disaster-posts"); // Replace with actual API
//                 const data = await response.json();
//                 setPosts(data);
//             } catch (error) {
//                 console.error("Error fetching disaster posts:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);

//     return (
//         <div className="min-h-screen p-8 bg-gray-100">
//             <h1 className="text-3xl font-bold text-center mb-6">Disaster Updates</h1>
            
//             {loading ? (
//                 <p className="text-center text-gray-600">Loading posts...</p>
//             ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {posts.map((post) => (
//                         <div key={post.id} className="bg-white p-6 rounded-lg shadow-lg">
//                             <h2 className="text-xl font-semibold">{post.title}</h2>
//                             <p className="text-gray-500 text-sm">{post.location} • {new Date(post.date).toLocaleDateString()}</p>
//                             <p className={`mt-2 px-3 py-1 inline-block rounded-full text-sm font-semibold ${
//                                 post.severity === "High" ? "bg-red-500 text-white" :
//                                 post.severity === "Medium" ? "bg-yellow-500 text-white" :
//                                 "bg-green-500 text-white"
//                             }`}>
//                                 {post.severity} Severity
//                             </p>
//                             <p className="mt-4 text-gray-700">{post.description}</p>
//                             <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200">Donate</button>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// }


// "use client";

// import { useEffect, useState } from "react";
// import { ethers } from "ethers";

// export default function DisasterPosts() {
//     const [posts, setPosts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [showPaymentModal, setShowPaymentModal] = useState(false);
//     const [selectedPost, setSelectedPost] = useState(null);
//     const [paymentMethod, setPaymentMethod] = useState("crypto");

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch("/api/disaster-posts");
//                 const data = await response.json();
//                 setPosts(data);
//             } catch (error) {
//                 console.error("Error fetching disaster posts:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);

//     // 🛠️ Handle Crypto Payment (MetaMask)
//     const handleCryptoDonate = async (amount) => {
//         if (!window.ethereum) {
//             alert("MetaMask is required to donate!");
//             return;
//         }

//         try {
//             const provider = new ethers.BrowserProvider(window.ethereum);
//             const signer = await provider.getSigner();
            
//             const reliefFundAddress = "3661ebfa779ffc14cbdb1b0bb5e079732b1787698384fdaa6051e683de0f00d0"; // Replace with actual address

//             const transaction = await signer.sendTransaction({
//                 to: reliefFundAddress,
//                 value: ethers.parseEther(amount.toString()),
//             });

//             alert("Transaction sent! Waiting for confirmation...");
//             await transaction.wait();
//             alert("Donation Successful! Transaction Confirmed ✅");

//         } catch (error) {
//             console.error("Donation failed:", error);
//             alert("Donation Failed ❌");
//         }
//     };

//     // 🛠️ Handle Payment Modal
//     const openPaymentModal = (post) => {
//         setSelectedPost(post);
//         setShowPaymentModal(true);
//     };

//     // 🛠️ Handle UPI Payment (Redirect to QR Code)
//     const handleUPIPayment = () => {
//         alert("Redirecting to UPI Payment...");
//         window.open("https://pay.google.com/about/", "_blank"); // Replace with actual UPI link
//     };

//     // 🛠️ Handle Card Payment (Stripe)
//     const handleCardPayment = () => {
//         alert("Redirecting to Stripe Payment...");
//         window.open("https://stripe.com/", "_blank"); // Replace with actual Stripe integration
//     };

//     return (
//         <div className="min-h-screen p-8 bg-gray-100">
//             <h1 className="text-3xl font-bold text-center mb-6">Disaster Updates</h1>
            
//             {loading ? (
//                 <p className="text-center text-gray-600">Loading posts...</p>
//             ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {posts.map((post) => (
//                         <div key={post.id} className="bg-white p-6 rounded-lg shadow-lg">
//                             <h2 className="text-xl font-semibold">{post.title}</h2>
//                             <p className="text-gray-500 text-sm">{post.location} • {new Date(post.date).toLocaleDateString()}</p>
//                             <p className={`mt-2 px-3 py-1 inline-block rounded-full text-sm font-semibold ${
//                                 post.severity === "High" ? "bg-red-500 text-white" :
//                                 post.severity === "Medium" ? "bg-yellow-500 text-white" :
//                                 "bg-green-500 text-white"
//                             }`}>
//                                 {post.severity} Severity
//                             </p>
//                             <p className="mt-4 text-gray-700">{post.description}</p>

//                             {/* 🚀 Donate Button */}
//                             <button 
//                                 className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//                                 onClick={() => openPaymentModal(post)}
//                             >
//                                 Donate Now
//                             </button>
//                         </div>
//                     ))}
//                 </div>
//             )}

//             {/* 🚀 Payment Modal */}
//             {showPaymentModal && selectedPost && (
//                 <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//                     <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//                         <h2 className="text-xl font-semibold mb-4">Donate to {selectedPost.title}</h2>

//                         {/* Payment Method Selection */}
//                         <select 
//                             className="w-full p-2 border rounded mb-4"
//                             value={paymentMethod}
//                             onChange={(e) => setPaymentMethod(e.target.value)}
//                         >
//                             <option value="crypto">Crypto (MetaMask)</option>
//                             <option value="upi">UPI / QR Code</option>
//                             <option value="card">Credit/Debit Card (Stripe)</option>
//                         </select>

//                         {/* Payment Buttons */}
//                         <button
//                             className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition mb-2"
//                             onClick={() => {
//                                 if (paymentMethod === "crypto") handleCryptoDonate(0.01);
//                                 if (paymentMethod === "upi") handleUPIPayment();
//                                 if (paymentMethod === "card") handleCardPayment();
//                             }}
//                         >
//                             Proceed to Pay
//                         </button>

//                         <button 
//                             className="w-full px-4 py-2 mt-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
//                             onClick={() => setShowPaymentModal(false)}
//                         >
//                             Cancel
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// "use client";

// import { useEffect, useState } from "react";
// import PaymentModal from "@/app/components/PaymentModal";

// export default function DisasterPosts() {
//     const [posts, setPosts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [showPaymentModal, setShowPaymentModal] = useState(false);
//     const [selectedPost, setSelectedPost] = useState(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch("/api/disaster-posts");
//                 const data = await response.json();
//                 setPosts(data);
//             } catch (error) {
//                 console.error("Error fetching disaster posts:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchData();
//     }, []);

//     const openPaymentModal = (post) => {
//         setSelectedPost(post);
//         setShowPaymentModal(true);
//     };

//     return (
//         <div className="min-h-screen p-8 bg-gray-100">
//             <h1 className="text-3xl font-bold text-center mb-6">Disaster Updates</h1>
            
//             {loading ? (
//                 <p className="text-center text-gray-600">Loading posts...</p>
//             ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {posts.map((post) => (
//                         <div key={post.id} className="bg-white p-6 rounded-lg shadow-lg">
//                             <h2 className="text-xl font-semibold">{post.title}</h2>
//                             <p className="text-gray-500 text-sm">{post.location} • {new Date(post.date).toLocaleDateString()}</p>
//                             <p className="mt-4 text-gray-700">{post.description}</p>

//                             {/* 🚀 Donate Button */}
//                             <button 
//                                 className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//                                 onClick={() => openPaymentModal(post)}
//                             >
//                                 Donate Now
//                             </button>
//                         </div>
//                     ))}
//                 </div>
//             )}

//             {/* 🚀 Payment Modal Component */}
//             <PaymentModal 
//                 show={showPaymentModal} 
//                 onClose={() => setShowPaymentModal(false)} 
//                 post={selectedPost} 
//             />
//         </div>
//     );
// }

"use client";

import { useEffect, useState } from "react";
import PaymentModal from "@/app/components/PaymentModal";
import { AlertTriangle, Calendar, MapPin, Heart, DollarSign, Users, ArrowRight, Search } from "lucide-react";

export default function DisasterPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/disaster-posts");
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error("Error fetching disaster posts:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const openPaymentModal = (post) => {
        setSelectedPost(post);
        setShowPaymentModal(true);
    };

    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            post.location.toLowerCase().includes(searchTerm.toLowerCase());
        
        if (activeCategory === "All") return matchesSearch;
        return matchesSearch && post.category === activeCategory;
    });

    const categories = ["All", "Earthquake", "Flood", "Wildfire", "Hurricane", "Drought"];

    // Helper function to determine urgency level styling
    const getUrgencyStyle = (urgency) => {
        const levels = {
            high: { bg: "bg-red-100", text: "text-red-700", border: "border-red-300" },
            medium: { bg: "bg-orange-100", text: "text-orange-700", border: "border-orange-300" },
            low: { bg: "bg-blue-100", text: "text-blue-700", border: "border-blue-300" }
        };
        return levels[urgency || "medium"];
    };

    // Helper to format donation amounts
    const formatDonation = (amount) => {
        return new Intl.NumberFormat('en-US', { 
            style: 'currency', 
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(amount);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4">
                        Disaster Relief & Support Center
                    </h1>
                    <p className="text-lg text-center max-w-3xl mx-auto opacity-90">
                        Help communities recover from natural disasters with direct support and transparent donations
                    </p>

                    {/* Search Bar */}
                    <div className="mt-8 max-w-2xl mx-auto relative">
                        <div className="flex items-center bg-white rounded-full shadow-lg overflow-hidden">
                            <Search className="ml-4 h-5 w-5 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search disasters by location or type..."
                                className="w-full py-3 px-4 focus:outline-none text-gray-800"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Category Filters */}
                    <div className="mt-6 flex flex-wrap justify-center gap-2">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                    activeCategory === category 
                                        ? "bg-white text-indigo-700 shadow" 
                                        : "bg-indigo-800/30 text-white hover:bg-indigo-800/50"
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="bg-white py-8 shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div className="p-4">
                            <p className="text-gray-500 text-sm">Ongoing Relief Efforts</p>
                            <p className="text-3xl font-bold text-indigo-600">42</p>
                        </div>
                        <div className="p-4">
                            <p className="text-gray-500 text-sm">Donors This Month</p>
                            <p className="text-3xl font-bold text-indigo-600">1,238</p>
                        </div>
                        <div className="p-4">
                            <p className="text-gray-500 text-sm">Funds Raised</p>
                            <p className="text-3xl font-bold text-indigo-600">$1.24M</p>
                        </div>
                        <div className="p-4">
                            <p className="text-gray-500 text-sm">People Assisted</p>
                            <p className="text-3xl font-bold text-indigo-600">15,742</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Posts Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                    </div>
                ) : filteredPosts.length === 0 ? (
                    <div className="text-center py-12">
                        <AlertTriangle className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-lg font-medium text-gray-900">No disasters found</h3>
                        <p className="mt-1 text-gray-500">Try adjusting your search or filter criteria</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPosts.map((post) => {
                            const urgencyStyle = getUrgencyStyle(post.urgency);
                            return (
                                <div key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
                                    {/* Post Image */}
                                    <div className="relative h-48 bg-gray-200">
                                        {post.imageUrl ? (
                                            <img 
                                                src={post.imageUrl} 
                                                alt={post.title} 
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600">
                                                <AlertTriangle className="h-16 w-16 text-white opacity-50" />
                                            </div>
                                        )}
                                        
                                        {/* Urgency Badge */}
                                        {post.urgency && (
                                            <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${urgencyStyle.bg} ${urgencyStyle.text} ${urgencyStyle.border} border`}>
                                                {post.urgency === "high" ? "URGENT" : post.urgency === "medium" ? "IMPORTANT" : "ONGOING"}
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className="p-6 flex-1 flex flex-col">
                                        {/* Category Tag */}
                                        {post.category && (
                                            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 mb-2">
                                                {post.category}
                                            </span>
                                        )}
                                        
                                        <h2 className="text-xl font-bold text-gray-900 mb-2 leading-tight">{post.title}</h2>
                                        
                                        <div className="flex items-center text-gray-500 text-sm mb-4">
                                            <MapPin className="h-4 w-4 mr-1" />
                                            <span className="mr-3">{post.location}</span>
                                            <Calendar className="h-4 w-4 mr-1" />
                                            <span>{new Date(post.date).toLocaleDateString()}</span>
                                        </div>
                                        
                                        <p className="text-gray-600 mb-4 flex-1">{post.description}</p>
                                        
                                        {/* Stats */}
                                        <div className="flex justify-between text-sm text-gray-500 mb-4 border-t border-gray-100 pt-4">
                                            <div className="flex items-center">
                                                <DollarSign className="h-4 w-4 mr-1 text-green-500" />
                                                <span>{formatDonation(post.raised || 0)} raised</span>
                                            </div>
                                            <div className="flex items-center">
                                                <Users className="h-4 w-4 mr-1 text-blue-500" />
                                                <span>{post.donors || 0} donors</span>
                                            </div>
                                        </div>
                                        
                                        {/* Action Button */}
                                        <button 
                                            className="w-full flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-4 rounded-lg shadow-md transition-all duration-300 transform hover:scale-[1.02]"
                                            onClick={() => openPaymentModal(post)}
                                        >
                                            <Heart className="h-5 w-5 mr-2" />
                                            Support This Cause
                                            <ArrowRight className="h-4 w-4 ml-2" />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* How it Works Section */}
            <div className="bg-indigo-50 py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How Your Donations Help</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                                <span className="text-xl font-bold">1</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Transparent Funding</h3>
                            <p className="text-gray-600">
                                Every donation is recorded on a secure blockchain, ensuring 100% transparency in how funds are distributed.
                            </p>
                        </div>
                        
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                                <span className="text-xl font-bold">2</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Direct Impact</h3>
                            <p className="text-gray-600">
                                Funds go directly to affected communities without intermediaries, maximizing the impact of each contribution.
                            </p>
                        </div>
                        
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                                <span className="text-xl font-bold">3</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Real-Time Updates</h3>
                            <p className="text-gray-600">
                                Receive updates about how your donation is being used with photos and reports from the ground.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Payment Modal Component */}
            <PaymentModal 
                show={showPaymentModal} 
                onClose={() => setShowPaymentModal(false)} 
                post={selectedPost} 
            />
        </div>
    );
}