import AuthSplitLayout from '../../../../layouts/AuthSplitLayout';
import Link from 'next/link';
import { Mail, Lock, Building, Key } from 'lucide-react';

export default function StudentLoginPage() {
    return (
        <AuthSplitLayout
            title="Empowering UAE's Future Leaders"
            description="Access our unified Enterprise Learning Management System designed for excellence in professional development."
            bgImage="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2000&auto=format&fit=crop"
        >
            <div className="w-full">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Welcome Back</h2>
                <p className="text-gray-500 mb-8">Please enter your credentials to access your dashboard.</p>

                <form className="space-y-6">
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
                                placeholder="name@organization.ae"
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
                            <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">
                                {/* Eye icon would go here for toggle */}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-end">
                        <Link href="#" className="text-sm font-semibold text-sSecondary hover:text-sSecondary/80">
                            Forgot Password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-sSecondary hover:bg-sSecondary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sSecondary transition-colors"
                    >
                        Sign In
                    </button>
                </form>

                <div className="mt-8 relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-gray-50/50 text-gray-500 font-bold tracking-widest uppercase text-xs">Enterprise Login</span>
                    </div>
                </div>


                <div className="mt-8 text-center">
                    <div className="flex items-center justify-center mb-2">
                        <Building size={18} className="mr-2 text-sSecondary" />
                        <p className="text-sm text-gray-600">
                            Don't have an account? {' '}
                            <Link href="/student/register" className="font-bold text-sSecondary hover:text-sSecondary/80">
                                Register Now
                            </Link>
                        </p>
                    </div>
                </div>

            </div>
        </AuthSplitLayout>
    );
}
