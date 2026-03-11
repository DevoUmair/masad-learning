'use client';
import { Provider } from "react-redux";
import { store } from "./store/store";
import { AuthWrapper } from "./AuthWrapper";

export function StoreProvider({ children }) {
    return (
        <Provider store={store}>
            <AuthWrapper>
                {children}
            </AuthWrapper>
        </Provider>
    );
}
