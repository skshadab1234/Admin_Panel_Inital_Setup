import React, { useRef, useEffect, ChangeEvent, KeyboardEvent, FocusEvent, useState } from 'react';
import PasswordReset from './PasswordReset';
import Swal from 'sweetalert2';

const ShowOtp: React.FC<{ email: string }> = ({ email }) => {
    const inputRefs = useRef(Array.from({ length: 4 }, () => React.createRef<HTMLInputElement>()));
    const [isResendEnabled, setIsResendEnabled] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const [timeLeft, setTimeLeft] = useState(20);
    const [passwordReset, setPasswordReset] = useState(false);

    useEffect(() => {
        inputRefs.current[0].current?.focus();

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev === 1) {
                    clearInterval(timer);
                    setIsResendEnabled(true);
                    return 20;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
        const value = event.target.value;
        if (/^\d$/.test(value) && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].current?.focus();
        }
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>, index: number) => {
        if (event.key === 'Backspace' && index > 0) {
            inputRefs.current[index - 1].current?.focus();
        }
    };

    const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
        const input = event.target;
        input.setSelectionRange(input.value.length, input.value.length);
    };

    const handleSubmit = async () => {
        const otp = inputRefs.current.map(ref => ref.current?.value).join('');
        if (otp.length === 4) {
            try {
                const response = await fetch(`${process.env.ADMINURL}/api/verify_otp_vendor`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ otp, email }),
                });

                const result = await response.json();

                if (response.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: 'OTP Verified',
                        text: 'Your OTP has been verified successfully!',
                        confirmButtonText: 'OK'
                    });
                    setPasswordReset(true);
                    inputRefs.current.forEach(ref => ref.current && (ref.current.value = ''));
                } else {
                    handleOtpError(result.error);
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'An error occurred while verifying OTP. Please try again.',
                    confirmButtonText: 'OK'
                });
            }
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Invalid OTP',
                text: 'Please enter a valid 4-digit OTP.',
                confirmButtonText: 'OK'
            });
        }
    };

    const handleOtpError = (error: string) => {
        if (error === 'Invalid OTP') {
            Swal.fire({
                icon: 'error',
                title: 'Invalid OTP',
                text: 'The OTP you entered is invalid. Please try again.',
                confirmButtonText: 'Retry'
            });
        } else if (error === 'OTP Expired') {
            Swal.fire({
                icon: 'error',
                title: 'OTP Expired',
                text: 'The OTP has expired. Please request a new one.',
                confirmButtonText: 'Resend OTP'
            }).then((result) => {
                if (result.isConfirmed) {
                    handleResendOtp();
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Verification Failed',
                text: error || 'Failed to verify OTP.',
                confirmButtonText: 'OK'
            });
        }
    };

    const handleResendOtp = async () => {
        setResendLoading(true);
        try {
            const response = await fetch(`${process.env.ADMINURL}/api/recoverpasswords`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                throw new Error('Failed to resend OTP');
            }

            resetResendTimer();
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred while resending the OTP. Please try again.',
                confirmButtonText: 'OK'
            });
        } finally {
            setResendLoading(false);
        }
    };

    const resetResendTimer = () => {
        setIsResendEnabled(false);
        setTimeLeft(20);

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev === 1) {
                    clearInterval(timer);
                    setIsResendEnabled(true);
                    return 20;
                }
                return prev - 1;
            });
        }, 1000);
    };

    return (
        passwordReset ? <PasswordReset email={email} /> : <div className="min-h-screen bg-black text-white flex flex-col justify-center p-6">
            <div className="text-center mb-6">
                <h2 className="text-3xl font-bold mb-2">
                    {passwordReset ? 'Set New Password' : 'Enter Your OTP'}
                </h2>
                {!passwordReset && (
                    <p className="text-lg text-gray-400">
                        Please enter the 4-digit code sent to {email}.
                    </p>
                )}
            </div>
            <div className="flex  justify-center mb-6">
                {
                    inputRefs.current.map((ref, index) => (
                        <input
                            key={index}
                            ref={ref}
                            type="text"
                            maxLength={1}
                            className="w-16 h-16 text-center text-2xl bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => handleInputChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            onFocus={handleFocus}
                            placeholder="-"
                        />
                    ))
                }
            </div>

            <div className="flex flex-col items-center mb-6">
                {resendLoading ? (
                    <p className="text-gray-500">Sending email...</p>
                ) : isResendEnabled ? (
                    <button
                        className="text-blue-500 font-semibold"
                        onClick={handleResendOtp}
                    >
                        Resend Code
                    </button>
                ) : (
                    <p className="text-gray-500">
                        Resend code in {timeLeft} seconds
                    </p>
                )}
            </div>
            <button
                className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                onClick={handleSubmit}
            >
                Verify
            </button>
        </div>
    );
};

export default ShowOtp;
