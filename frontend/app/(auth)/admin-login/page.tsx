'use client';
import React, { useState } from 'react';
import { Icon } from '@shopify/polaris';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { ArrowRightIcon } from '@shopify/polaris-icons';
import Link from 'next/link';
import logo from '@/assets/images/siyafy-logo.png';
import { Button, Input, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { showMessage } from '@/utils';

interface FormValues {
    email: string;
    password: string;
}

const VendorLogin: React.FC = () => {
    const [loader, setLoader] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const validateInputs = () => {
        if (!email) {
            showMessage('Email is required', 'error');
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            showMessage('Please enter a valid email', 'error');
            return false;
        }
        if (!password) {
            showMessage('Password is required', 'error');
            return false;
        }

        return true;
    };

    const onFinish = async (values: FormValues) => {
        if (!validateInputs()) {
            return;
        }
        setLoader(true);
        try {
            const response = await fetch(`/api/Vendor/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            const data = await response.json();

            if (data.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    text: data.message,
                    showConfirmButton: false,
                    timer: 2000,
                });

                document.cookie = `bappaSagartech=${data.token}; path=/; max-age=${data.expiryTime}`;
                setTimeout(() => {
                    window.location.href = '/admin';
                }, 2000);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: data.message,
                });
                setLoader(false);
            }
        } catch (error) {
            console.error('Error:', error);
            setLoader(false);

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred while processing your request.',
            });
        }
    };

    const handleSubmit = () => {
        onFinish({ email, password });
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <>
            <head>
                <title>Login | Siyafy</title>
                <meta name="description" content="Login to your account with Siyafy" />
            </head>
            <div className="relative flex h-screen items-center justify-center overflow-hidden bg-black">
                {/* Gradient Background */}
                <div className="animate-gradientMovement bg-radial-gradient absolute inset-0"></div>
                {/* Noise Layer */}
                <div className="gradient-background__noise"></div>
                {/* Form Container */}
                <div className="relative z-10 w-full space-y-6 rounded-lg bg-white p-8 shadow-lg sm:max-w-md">
                    <div className="mb-4 flex">
                        <img width={180} src={logo.src} alt="Siyafy Logo" />
                    </div>
                    <div className="py-2">
                        <h1 className="text-2xl font-bold text-gray-800">Log In</h1>
                        <p className="text-gray-500">Welcome back to Siyafy</p>
                    </div>
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <Input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onKeyPress={handleKeyPress}
                                type="email"
                                autoComplete="email"
                                placeholder="Enter your email"
                                className="fancy-input h-10 rounded-lg border-2 placeholder:text-gray-400"
                            />
                            <Input.Password
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Enter your password"
                                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                className="fancy-input h-10 rounded-lg border-2"
                            />
                        </div>
                        <div className="mt-4">
                            <Button onClick={handleSubmit} loading={loader} block type="text" className="h-10 bg-black/90 text-white hover:!bg-black/70 hover:!text-white">
                                <div className="group flex items-center justify-center">
                                    <p className="text-xs">Sign In</p>
                                    <div className="transform transition group-hover:translate-x-2">
                                        <Icon source={ArrowRightIcon} />
                                    </div>
                                </div>
                            </Button>
                        </div>
                    </div>
                    <div className="text-right">
                        <Link href="/recoverpassword" className="text-sm text-blue-600 hover:underline">
                            Forgot Password?
                        </Link>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .bg-radial-gradient {
                    background: radial-gradient(circle at bottom left, rgba(142, 123, 255, 0.6), transparent), radial-gradient(circle at top right, rgba(0, 255, 0, 0.4), transparent);
                    filter: blur(150px);
                }

                @keyframes gradientMovement {
                    0% {
                        transform: translate(-30%, 40%) rotate(0deg);
                    }
                    50% {
                        transform: translate(30%, 40%) rotate(50deg);
                    }
                    100% {
                        transform: translate(-30%, 40%) rotate(0deg);
                    }
                }

                .animate-gradientMovement {
                    animation: gradientMovement 32s ease-in-out infinite;
                }

                .gradient-background__noise {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-image: url('https://cdn.shopify.com/shopifycloud/identity/assets/gradient/noise-ae0ab1628dee87591c6f6d3740b6e7e4e5109417e35a0781070d9d737f959e22.png');
                    background-size: 100px;
                    z-index: 1;
                    opacity: 0.5;
                }

                .fancy-input {
                    padding: 16px;
                    font-size: 1.2rem;
                    border: 2px solid #ccc;
                    border-radius: 10px;
                    transition: all 0.3s ease;
                    height: 34px;
                }

                .fancy-input:focus {
                    border-color: #7f5af0;
                    box-shadow: 0 0 8px rgba(127, 90, 240, 0.5);
                    outline: none;
                }

                .fancy-button {
                    padding: 16px;
                    font-size: 1.2rem;
                    border-radius: 10px;
                    transition: transform 0.2s ease, background-color 0.2s ease;
                }

                .fancy-button:hover {
                    transform: scale(1.05);
                    background-color: #333;
                }
            `}</style>
        </>
    );
};

export default VendorLogin;
