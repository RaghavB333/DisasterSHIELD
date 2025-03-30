import Razorpay from "razorpay";

export async function POST(req) {
    try {
        const { amount } = await req.json(); // Get amount from request body

        // Initialize Razorpay
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        // Create order
        const options = {
            amount: amount * 100, // Convert to paisa
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);
        return Response.json({ success: true, order, key_id: process.env.RAZORPAY_KEY_ID });
    } catch (error) {
        console.error("Razorpay Order Error:", error);
        return Response.json({ success: false, message: "Order creation failed" }, { status: 500 });
    }
}
