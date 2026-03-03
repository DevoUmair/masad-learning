'use client';

import AuthSplitLayout from '@/layouts/AuthSplitLayout';
import RegisterTabs from '@/components/custom/RegisterTabs';
import Link from 'next/link';
import { Mail, Lock, User, Briefcase, FileText } from 'lucide-react';
import NavBar from '@/app/_components/NavBar';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRegisterMutation } from '@/redux/auth/AuthApi';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/redux/auth/AuthSlice';

export default function TeacherRegisterPage() {
    const router = useRouter();
    const [registerUser] = useRegisterMutation();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        expertise: '',
        password: ''
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const data = await registerUser({
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                instructorProfile: {
                    areaOfExpertise: formData.expertise
                },
                password: formData.password,
                role: 'instructor'
            }).unwrap();
            dispatch(setCredentials({ user: data.user, accessToken: data.accessToken }));
            router.push('/dashboard/instructor');
        } catch (err) {
            setError(err.data?.message || 'Registration failed');
        }
    };

    return (
        <>
            <NavBar />
            <AuthSplitLayout
                title="Become an Instructor"
                description="Share your expertise with a global audience and impact the future of education."
                userType="teacher"
                bgImage="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2000&auto=format&fit=crop"
            >
                <div className="w-full">
                    <RegisterTabs defaultValue="instructor" />
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Instructor Application</h2>
                    <p className="text-gray-500 mb-8">Join our faculty of world-class educators.</p>

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <form className="space-y-4" onSubmit={handleSubmit}>
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
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-sSecondary focus:border-sSecondary shadow-sm transition-colors text-black placeholder:text-gray-400"
                                        placeholder="Jane"
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
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-sSecondary focus:border-sSecondary shadow-sm transition-colors text-black placeholder:text-gray-400"
                                        placeholder="Smith"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">Work Email</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <Mail size={18} />
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-sSecondary focus:border-sSecondary shadow-sm transition-colors text-black placeholder:text-gray-400"
                                    placeholder="name@university.edu"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="expertise" className="block text-sm font-bold text-gray-700 mb-2">Area of Expertise</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <Briefcase size={18} />
                                </div>
                                <input
                                    type="text"
                                    id="expertise"
                                    value={formData.expertise}
                                    onChange={handleChange}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-sSecondary focus:border-sSecondary shadow-sm transition-colors text-black placeholder:text-gray-400"
                                    placeholder="e.g. Computer Science, Business Management"
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
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-sSecondary focus:border-sSecondary shadow-sm transition-colors text-black placeholder:text-gray-400"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-sSecondary hover:bg-sSecondary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sSecondary transition-colors"
                        >
                            Submit Application
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-600">
                            Already have an instructor account? {' '}
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