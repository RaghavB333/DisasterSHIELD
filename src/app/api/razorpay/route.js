import Razorpay from "razorpay";

export async function POST(req) {
    try {
        const { amount } = await req.json();

        // ✅ Initialize Razorpay
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,  // Add to .env.local
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        // ✅ Create an order
        const options = {
            amount: amount * 100, // Convert to paise (₹1 = 100 paise)
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);
        return Response.json(order);

    } catch (error) {
        console.error("Razorpay Order Error:", error);
        return Response.json({ error: "Failed to create order" }, { status: 500 });
    }
}
