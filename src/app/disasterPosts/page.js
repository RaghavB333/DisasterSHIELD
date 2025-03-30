
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

"use client";

import { useEffect, useState } from "react";
import PaymentModal from "@/app/components/PaymentModal";

export default function DisasterPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

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

    return (
        <div className="min-h-screen p-8 bg-gray-100">
            <h1 className="text-3xl font-bold text-center mb-6">Disaster Updates</h1>
            
            {loading ? (
                <p className="text-center text-gray-600">Loading posts...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post) => (
                        <div key={post.id} className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-xl font-semibold">{post.title}</h2>
                            <p className="text-gray-500 text-sm">{post.location} • {new Date(post.date).toLocaleDateString()}</p>
                            <p className="mt-4 text-gray-700">{post.description}</p>

                            {/* 🚀 Donate Button */}
                            <button 
                                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                onClick={() => openPaymentModal(post)}
                            >
                                Donate Now
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* 🚀 Payment Modal Component */}
            <PaymentModal 
                show={showPaymentModal} 
                onClose={() => setShowPaymentModal(false)} 
                post={selectedPost} 
            />
        </div>
    );
}
