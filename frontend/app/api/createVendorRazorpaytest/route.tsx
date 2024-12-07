import Razorpay from "razorpay";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {

    const { amount, currency, credentials } = (await request.json()) as {
        amount: string;
        currency: string;
        credentials: any
    };

    const razorpay = new Razorpay({
        key_id: credentials?.key,
        key_secret: credentials?.secret,
    });

    var options = {
        amount: amount,
        currency: currency,
        receipt: "rcp1",
    };
    const order = await razorpay.orders.create(options);
    console.log(order);
    return NextResponse.json({ orderId: order.id }, { status: 200 });
}
