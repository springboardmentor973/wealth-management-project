import React, { createContext, useContext, useState, useEffect } from "react";
import { login as authLogin, logout as authLogout, getToken, getCurrentUser } from "../services/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for existing token
        const token = getToken();
        const storedUser = getCurrentUser();
        if (token && storedUser) {
            setUser(storedUser);
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const data = await authLogin(email, password);
        setUser(data.user);
        return data;
    };

    const logout = () => {
        authLogout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, IsLocked: !user && !loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}