
import AuthSplitLayout from '../../../../layouts/AuthSplitLayout';
import Link from 'next/link';
import { Mail, Lock, ShieldAlert } from 'lucide-react';

export default function AdminLoginPage() {
    return (
        <AuthSplitLayout
            title="System Administration"
            description="Secure access for system administrators to manage platform settings, users, and configurations."
            userType="admin"
            bgImage="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop"
        >
            <div className="w-full">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Admin Portal</h2>
                <p className="text-gray-500 mb-8">Authorized personnel only.</p>

                <form className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">Admin Email</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                <Mail size={18} />
                            </div>
                            <input
                                type="email"
                                id="email"
                                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-sSecondary focus:border-sSecondary shadow-sm transition-colors text-black placeholder:text-gray-400"
                                placeholder="admin@system.ae"
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

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember"
                                name="remember"
                                type="checkbox"
                                className="h-4 w-4 text-sSecondary focus:ring-sSecondary border-gray-300 rounded"
                            />
                            <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
                                Remember me
                            </label>
                        </div>
                        <Link href="#" className="text-sm font-semibold text-sSecondary hover:text-sSecondary/80">
                            Forgot Password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-sSecondary hover:bg-sSecondary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sSecondary transition-colors"
                    >
                        Access Dashboard
                    </button>
                </form>
            </div>
        </AuthSplitLayout>
    );
}
