import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const authorizationToken = `Bearer ${token}`;

    // hosting api 
    // const API = import.meta.env.API_URI;
    const API = "http://localhost:8000";

    const storeTokenInLS = (serverToken) => {
        setToken(serverToken)
        return localStorage.setItem('token', serverToken);
    }

    let isLoggedIn = !!token;

    const LogoutUser = () => {
        setToken('');
        return localStorage.removeItem('token');
    }

    const userAuthentication = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`${API}/api/auth/user`, {
                method: 'GET',
                headers: {
                    Authorization: authorizationToken
                }
            })
            if (response.ok) {
                const data = await response.json();
                setUser(data.userData);
                setIsLoading(false);
            } else {
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        userAuthentication();
    }, [token]);

    useEffect(() => {
        userAuthentication();
    }, [])

    return <AuthContext.Provider value={{ storeTokenInLS, isLoggedIn, LogoutUser, user, authorizationToken, API, isLoading }}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);

    if (!authContextValue) {
        throw new Error("useAuth used outside of AuthProvider");
    }
    return authContextValue;
}