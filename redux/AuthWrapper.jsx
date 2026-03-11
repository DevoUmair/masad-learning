'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authApi } from './auth/AuthApi';
import { setCredentials, setLoading } from './auth/AuthSlice';

export function AuthWrapper({ children }) {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.auth.loading);
    const [refreshToken] = authApi.useRefreshTokenMutation();

    useEffect(() => {
        const initAuth = async () => {
            try {
                const data = await refreshToken().unwrap();
                if (data) {
                    dispatch(setCredentials({ user: data.user, accessToken: data.accessToken }));
                }
            } catch (error) {
                console.log('Not logged in at startup');
            } finally {
                dispatch(setLoading(false));
            }
        };

        if (loading) {
            initAuth();
        }
    }, [dispatch, refreshToken, loading]);

    return children;
}
