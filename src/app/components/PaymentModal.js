// "use client";

// import { useEffect,useState } from "react";

// export default function PaymentModal({ show, onClose, post }) {
//     if (!show) return null; // Hide modal if `show` is false

//     const [amount, setAmount] = useState("");

//     // 🚀 Function to load Razorpay script
//     const loadRazorpayScript = () => {
//         return new Promise((resolve) => {
//             if (window.Razorpay) {
//                 resolve(true);
//                 return;
//             }
//             const script = document.createElement("script");
//             script.src = "https://checkout.razorpay.com/v1/checkout.js";
//             script.onload = () => resolve(true);
//             script.onerror = () => resolve(false);
//             document.body.appendChild(script);
//         });
//     };

//     const handlePayment = async () => {
//         try {
//             const razorpayLoaded = await loadRazorpayScript();
//             if (!razorpayLoaded) {
//                 alert("Failed to load Razorpay SDK. Check your internet connection.");
//                 return;
//             }

//             const res = await fetch("/api/razorpay", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ amount: amount }), // Set donation amount
//             });

//             const data = await res.json();
//             if (!data.success) throw new Error("Order creation failed!");

//             const options = {
//                 key: data.key_id,
//                 amount: data.order.amount,
//                 currency: "INR",
//                 name: "Disaster Relief Fund",
//                 description: `Donation for ${post?.title}`,
//                 order_id: data.order.id,
//                 handler: function (response) {
//                     alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
//                     onClose(); // Close modal after payment
//                 },
//                 prefill: { email: "user@example.com", contact: "9999999999" },
//                 theme: { color: "#3399cc" },
//             };

//             const razorpay = new window.Razorpay(options);
//             razorpay.open();
//         } catch (error) {
//             console.error("Payment Error:", error);
//             alert("Payment failed! Try again.");
//         }
//     };

//     return (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//             <div className="bg-white p-6 rounded-lg shadow-lg">
//                 <h2 className="text-xl font-bold">Donate to {post?.title}</h2>
//                 <form>
//                     <input onChange={(e)=>setAmount(e.target.value)} value={amount} type="number" className="px-4"/>
//                 </form>
//                 <button className="bg-blue-600 text-white px-4 py-2 mt-4 rounded" onClick={handlePayment}>
//                     Pay Now
//                 </button>
//                 <button className="text-red-500 ml-4" onClick={onClose}>
//                     Cancel
//                 </button>
//             </div>
//         </div>
//     );
// }



"use client";
import { useState } from "react";

export default function PaymentModal({ show, onClose, post }) {
  if (!show) return null;
  
  const [amount, setAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Function to load Razorpay script
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
    if (!amount || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    
    try {
      setIsProcessing(true);
      
      const razorpayLoaded = await loadRazorpayScript();
      if (!razorpayLoaded) {
        alert("Failed to load Razorpay SDK. Check your internet connection.");
        setIsProcessing(false);
        return;
      }
      
      const res = await fetch("/api/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amount }),
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
          alert("Payment Successful! ID: " + response.razorpay_payment_id);
          setIsProcessing(false);
          onClose();
        },
        prefill: { email: "user@example.com", contact: "9999999999" },
        theme: { color: "#4F46E5" },
      };
      
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment failed! Try again.");
      setIsProcessing(false);
    }
  };
  
  // Event handler for clicking outside to close
  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60" onClick={handleOutsideClick}>
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-2xl" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Support {post?.title}</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            ×
          </button>
        </div>
        
        {/* Donation description */}
        <p className="text-gray-600 mb-6">
          Your contribution helps provide immediate relief and support to those affected.
        </p>
        
        {/* Amount input */}
        <div className="mb-6">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
            Donation Amount (₹)
          </label>
          <div className="relative mt-1 rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">₹</span>
            </div>
            <input
              type="number"
              name="amount"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="1000"
            />
          </div>
        </div>
        
        {/* Suggested amounts */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[500, 1000, 2000, 5000].map((amt) => (
            <button
              key={amt}
              type="button"
              onClick={() => setAmount(amt)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${Number(amount) === amt 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
            >
              ₹{amt}
            </button>
          ))}
        </div>
        
        {/* Action buttons */}
        <div className="flex space-x-3">
          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 font-medium disabled:opacity-50 transition-colors"
          >
            {isProcessing ? 'Processing...' : 'Donate Now'}
          </button>
        </div>
        
        {/* Secure payment note */}
        <p className="mt-4 text-center text-xs text-gray-500">
          Secure payment powered by Razorpay
        </p>
      </div>
    </div>
  );
}
