import { NextRequest, NextResponse } from 'next/server';
import CryptoJS from 'crypto-js';

// POST request to initiate a PayU order
export async function POST(request: NextRequest) {
    // Extracting the required data from the request body
    const { amount, currency, store, credentials, customerDetails } = await request.json();

    // Extracting PayU merchant credentials
    const apiKey = credentials?.key;
    const salt = credentials?.salt;

    // Generating a random transaction ID
    const txnId = `txn_${Math.floor(Math.random() * 1000000000)}`;

    // Customer and product information
    const productInfo = 'Test Product';
    const firstName = customerDetails.firstname;
    const email = customerDetails.email;
    const phone = customerDetails.phone;

    // Success and failure URLs
    const surl = `${process.env.FRONTEND_URL}/vendor/${store}/settings/payments/payu`; // Update with your success URL
    const furl = `${process.env.FRONTEND_URL}/vendor/${store}/settings/payments/payu`; // Update with your failure URL

    // Generate hash string for security
    const hashString = `${apiKey}|${txnId}|${amount}|${productInfo}|${firstName}|${email}|||||||||||${salt}`;
    const hash = CryptoJS.SHA512(hashString).toString(CryptoJS.enc.Hex);

    // Prepare the payment request data
    const paymentData = {
        key: apiKey,
        txnid: txnId,
        amount: amount,
        productinfo: productInfo,
        firstname: firstName,
        email: email,
        phone: phone,
        surl: surl,
        furl: furl,
        hash: hash,
        currency: currency, // Include currency in the payment data
    };

    // Send the payment data and URL back to the frontend
    return NextResponse.json({ paymentData, paymentUrl: 'https://test.payu.in/_payment' }, { status: 200 });
}
