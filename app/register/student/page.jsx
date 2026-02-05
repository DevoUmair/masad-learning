
import AuthSplitLayout from '@/layouts/AuthSplitLayout';
import RegisterTabs from '@/components/custom/RegisterTabs';
import Link from 'next/link';
import { Mail, Lock, User, Phone } from 'lucide-react';
import NavBar from '@/app/_components/NavBar';

export default function StudentRegisterPage() {
    return (
        <>
            <NavBar />
            <AuthSplitLayout
                title="Join the Learning Revolution"
                description="Create your student account to access thousands of courses and shape your future."
                bgImage="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2000&auto=format&fit=crop"
            >
                <div className="w-full">
                    <RegisterTabs defaultValue="student" />
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Create Account</h2>
                    <p className="text-gray-500 mb-8">Please fill in your details to get started.</p>

                    <form className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-bold text-gray-700 mb-2">First Name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                        <User size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        id="firstName"
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-sSecondary focus:border-sSecondary shadow-sm transition-colors text-black placeholder:text-gray-400"
                                        placeholder="John"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-bold text-gray-700 mb-2">Last Name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                        <User size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        id="lastName"
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-sSecondary focus:border-sSecondary shadow-sm transition-colors text-black placeholder:text-gray-400"
                                        placeholder="Doe"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <Mail size={18} />
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-sSecondary focus:border-sSecondary shadow-sm transition-colors text-black placeholder:text-gray-400"
                                    placeholder="name@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <Phone size={18} />
                                </div>
                                <input
                                    type="tel"
                                    id="phone"
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-sSecondary focus:border-sSecondary shadow-sm transition-colors text-black placeholder:text-gray-400"
                                    placeholder="+971 50 123 4567"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-2">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type="password"
                                    id="password"
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-sSecondary focus:border-sSecondary shadow-sm transition-colors text-black placeholder:text-gray-400"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="flex items-center">
                            <input
                                id="terms"
                                name="terms"
                                type="checkbox"
                                className="h-4 w-4 text-sSecondary focus:ring-sSecondary border-gray-300 rounded"
                            />
                            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                                I agree to the <Link href="#" className="font-bold text-sSecondary hover:text-sSecondary/80">Terms of Service</Link> and <Link href="#" className="font-bold text-sSecondary hover:text-sSecondary/80">Privacy Policy</Link>
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-sSecondary hover:bg-sSecondary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sSecondary transition-colors"
                        >
                            Create Account
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account? {' '}
                            <Link href="/login" className="font-bold text-sSecondary hover:text-sSecondary/80">
                                Sign In
                            </Link>
                        </p>
                    </div>

                </div>
            </AuthSplitLayout>
        </>

    );
}
