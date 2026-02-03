import AuthSplitLayout from '../../../../layouts/AuthSplitLayout';
import Link from 'next/link';
import { Mail, Lock, Building, Key } from 'lucide-react';

export default function TeacherLoginPage() {
  return (
    <AuthSplitLayout
      title="Inspire the Next Generation"
      description="Access your dashboard to manage courses, track student progress, and deliver world-class education."
      userType="teacher"
      bgImage="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2000&auto=format&fit=crop"
    >
      <div className="w-full">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Teacher Login</h2>
        <p className="text-gray-500 mb-8">Welcome back, please sign in to continue.</p>

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
                placeholder="teacher@institution.ae"
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
            <span className="px-4 bg-gray-50/50 text-gray-500 font-bold tracking-widest uppercase text-xs">Organization Access</span>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            New Instructor? {' '}
            <Link href="/teacher/register" className="font-bold text-sSecondary hover:text-sSecondary/80">
              Apply to Teach
            </Link>
          </p>
        </div>

      </div>
    </AuthSplitLayout>
  );
}
