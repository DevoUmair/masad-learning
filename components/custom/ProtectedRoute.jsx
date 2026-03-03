'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { Loader2 } from 'lucide-react';

export default function ProtectedRoute({ children, allowedRoles }) {
    const { user, loading } = useSelector((state) => state.auth);
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push('/login');
            } else if (allowedRoles && !allowedRoles.includes(user.role)) {
                // If user doesn't have the right role, redirect to their own dashboard
                router.push(`/dashboard/${user.role || 'student'}`);
            } else {
                setIsAuthorized(true);
            }
        }
    }, [user, loading, router, allowedRoles]);

    if (loading || !isAuthorized) {
        return (
            <div className="flex h-screen w-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-sSecondary" />
            </div>
        );
    }

    return <>{children}</>;
}
