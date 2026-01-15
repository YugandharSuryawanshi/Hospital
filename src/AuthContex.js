import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("userToken");
        setIsAuth(!!token);
    }, []);

    const login = (token) => {
        localStorage.setItem("userToken", token);
        setIsAuth(true);
    };

    const logout = () => {
        localStorage.removeItem("userToken");
        localStorage.removeItem("userUser");
        setIsAuth(false);
    };

    return (
        <AuthContext.Provider value={{ isAuth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
