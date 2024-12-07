import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const generatedSignature = (
    razorpayOrderId: string,
    razorpayPaymentId: string,
    razorpay_secret: string
) => {
    if (!razorpay_secret) {
        throw new Error(
            "Razorpay key secret is not defined in environment variables."
        );
    }
    const sig = crypto
        .createHmac("sha256", razorpay_secret)
        .update(razorpayOrderId + "|" + razorpayPaymentId)
        .digest("hex");
    return sig;
};

export async function POST(request: NextRequest) {
    const { orderCreationId, razorpayPaymentId, razorpaySignature, razorpay_secret } =
        await request.json();

    const signature = generatedSignature(orderCreationId, razorpayPaymentId, razorpay_secret);
    if (signature !== razorpaySignature) {
        return NextResponse.json(
            { message: "payment verification failed", isOk: false },
            { status: 400 }
        );
    }
    return NextResponse.json(
        { message: "payment verified successfully", isOk: true },
        { status: 200 }
    );
}
