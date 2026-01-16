import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("userToken");
        const storedUser = localStorage.getItem("userUser")
        if (token && storedUser) {
            setIsAuth(true);
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (token, userData) => {
        localStorage.setItem("userToken", token);
        localStorage.setItem("userUser", JSON.stringify(userData));
        setIsAuth(true);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("userToken");
        localStorage.removeItem("userUser");
        setIsAuth(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuth, user , login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
