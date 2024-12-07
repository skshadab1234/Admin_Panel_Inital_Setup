"use client";
import { Button, Frame } from '@shopify/polaris';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import ShowOtp from './ShowOtp';

const ForgotPassword = () => {
    const route = useRouter();
    const [backloading, setBackloading] = useState(false);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [showotp, setShowOtp] = useState(false);
    const handleSubmit = async () => {
        // Validate email
        if (!email) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Email is required',
            });
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Email is invalid',
            });
            return;
        }
        setEmailError('');
        setBackloading(true);

        try {
            // Send email to backend
            const response = await fetch(`${process.env.ADMINURL}/api/recoverpasswords`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                // Handle successful response
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Reset code sent to your email.',
                }).then(() => {
                    // Redirect after alert is closed
                    // route.push('/vendor-login');
                    setShowOtp(true)
                });
            } else {
                // Handle error response
                const data = await response.json();
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data.error || 'An error occurred',
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'An error occurred',
            });
        } finally {
            setBackloading(false);
        }
    };

    return (
        <Frame>
            <div className="min-h-screen bg-black text-white">
                <div className="grid grid-cols-1 lg:grid-cols-2 h-full place-content-center">
                    <div className="bg-blue-600 max-lg:hidden min-h-screen items-center p-10 lg:flex flex-col justify-center ">
                        <h1 className="text-4xl font-bold mb-4">Reset Your {process.env.WEBSITE_NAME} Password For Account Access</h1>
                       
                        {/* <div className="mt-10 ">
                            <img src="/sales.png" alt="Sales Report" className="w-full h-auto rounded-xl shadow-info-dark-light" />
                        </div> */}
                    </div>
                    <div className="flex flex-col flex-1 justify-center items-center max-lg:h-screen">
                        {
                            showotp ? <ShowOtp email={email} /> : <div className='md:w-1/2 p-2'>
                                <div className="text-center mb-6">
                                    <h2 className="text-2xl font-bold">Forgot Password</h2>
                                    <p className="text-sm text-gray-400">You'll receive an OTP shortly to reset your password.</p>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-400 font-bold mb-2" htmlFor="email">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className={`w-full px-4 py-2 ${emailError ? 'bg-red-200 text-red-600' : 'bg-gray-800'} border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
                                </div>
                                <button
                                    disabled={!email || backloading}
                                    className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition duration-200 mb-4"
                                    onClick={handleSubmit}
                                >
                                    Send OTP
                                </button>
                                <div className='flex justify-center'>
                                    <Button dataPrimaryLink variant='plain' loading={backloading} onClick={() => {
                                        setBackloading(true);
                                        route.push('/admin-login');
                                    }} >
                                        Back to login
                                    </Button>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </Frame>
    );
};

export default ForgotPassword;
