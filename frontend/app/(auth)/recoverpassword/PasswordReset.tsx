import React, { useState } from 'react';
import { LegacyStack, Toast } from '@shopify/polaris';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

const CustomInput: React.FC<{
    label: string;
    type: string;
    value: string;
    onChange: (value: string) => void;
    autoComplete?: string;
    togglePasswordVisibility?: () => void;
    isPasswordVisible?: boolean;
}> = ({
    label,
    type,
    value,
    onChange,
    autoComplete,
    togglePasswordVisibility,
    isPasswordVisible,
}) => {
        return (
            <div className="mb-4 relative">
                <label className="block text-white text-sm font-bold mb-2">{label}</label>
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    autoComplete={autoComplete}
                    className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={label}
                />
                {togglePasswordVisibility && (
                    <div
                        className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center cursor-pointer"
                        onClick={togglePasswordVisibility}
                    >
                        {isPasswordVisible ? (
                            <EyeOffIcon className="h-5 w-5 text-gray-400" />
                        ) : (
                            <EyeIcon className="h-5 w-5 text-gray-400" />
                        )}
                    </div>
                )}
            </div>
        );
    };

const PasswordReset: React.FC<{ email: string }> = ({ email }) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [toastActive, setToastActive] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'error'>('success');
    const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [passwordRequirements, setPasswordRequirements] = useState({
        length: false,
        number: false,
        uppercase: false,
        lowercase: false,
        special: false,
    });
    const router = useRouter();

    const handleNewPasswordChange = (value: string) => {
        setNewPassword(value);
        setPasswordRequirements({
            length: value.length >= 8,
            number: /[0-9]/.test(value),
            uppercase: /[A-Z]/.test(value),
            lowercase: /[a-z]/.test(value),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(value),
        });
    };

    const handleConfirmPasswordChange = (value: string) => setConfirmPassword(value);

    const handlePasswordUpdate = async () => {
        if (newPassword !== confirmPassword) {
            setToastMessage('Passwords do not match.');
            setToastType('error');
            setToastActive(true);
            return;
        }
        setLoading(true);

        try {
            const response = await fetch(`${process.env.ADMINURL}/api/update_password_vendor`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ newPassword, email })
            });

            const data = await response.json();

            if (response.ok) {
                setToastMessage(data.message || 'Password updated successfully.');
                setToastType('success');
                setToastActive(true);

                // Clear fields after successful update
                setNewPassword('');
                setConfirmPassword('');

                // Redirect to /vendor-login after a short delay
                setTimeout(() => {
                    router.push('/admin-login');
                }, 2000);
            } else {
                setToastMessage(data.error || 'Failed to update password.');
                setToastType('error');
                setToastActive(true);
                setLoading(false);
            }
        } catch (error) {
            console.error('An error occurred:', error);
            setToastMessage('Failed to update password.');
            setToastType('error');
            setToastActive(true);
            setLoading(false);
        }
    };

    const toggleToastActive = () => setToastActive(!toastActive);
    const toggleNewPasswordVisibility = () => setIsNewPasswordVisible(!isNewPasswordVisible);
    const toggleConfirmPasswordVisibility = () => setIsConfirmPasswordVisible(!isConfirmPasswordVisible);

    return (
        <>
            <div className="min-h-screen bg-black text-white flex flex-col justify-center p-6">
                <div className="max-w-lg mx-auto w-full">
                    <h1 className="text-2xl font-bold text-white mb-2">Reset Your Password</h1>
                    <p className="text-sm text-gray-400 mb-6">Please enter and confirm your new password below.</p>
                    <LegacyStack vertical>
                        <CustomInput
                            label="New Password"
                            type={isNewPasswordVisible ? 'text' : 'password'}
                            value={newPassword}
                            onChange={handleNewPasswordChange}
                            autoComplete="new-password"
                            togglePasswordVisibility={toggleNewPasswordVisibility}
                            isPasswordVisible={isNewPasswordVisible}
                        />
                        <CustomInput
                            label="Confirm Password"
                            type={isConfirmPasswordVisible ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            autoComplete="new-password"
                            togglePasswordVisibility={toggleConfirmPasswordVisibility}
                            isPasswordVisible={isConfirmPasswordVisible}
                        />
                        <button
                            disabled={loading || !Object.values(passwordRequirements).every(Boolean) || newPassword.length < 8 || confirmPassword.length < 8}
                            className={`w-full ${loading ? 'bg-gray-600' : 'bg-blue-600'} text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition duration-200`}
                            onClick={handlePasswordUpdate}
                        >
                            {loading ? 'Updating...' : 'Update Password'}
                        </button>
                    </LegacyStack>
                    <div className="mt-6 text-sm text-gray-400">
                        <h2 className="font-semibold text-white">Password Requirements:</h2>
                        <ul className="list-disc ml-5 mt-2">
                            <li className={passwordRequirements.length ? 'text-green-400' : 'text-red-400'}>
                                Minimum 8 characters
                            </li>
                            <li className={passwordRequirements.number ? 'text-green-400' : 'text-red-400'}>
                                At least one number
                            </li>
                            <li className={passwordRequirements.uppercase ? 'text-green-400' : 'text-red-400'}>
                                At least one uppercase letter
                            </li>
                            <li className={passwordRequirements.lowercase ? 'text-green-400' : 'text-red-400'}>
                                At least one lowercase letter
                            </li>
                            <li className={passwordRequirements.special ? 'text-green-400' : 'text-red-400'}>
                                At least one special character
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {toastActive && (
                <Toast
                    content={toastMessage}
                    onDismiss={toggleToastActive}
                    duration={5000}
                    error={toastType === 'error'}
                />
            )}
        </>
    );
};

export default PasswordReset;
