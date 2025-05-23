import { createContext, useState, useContext, useEffect } from "react";
import { signupRequest, loginRequest, verifyTokenRequest, profileRequest, userRequest } from '../api/auth';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const useAuth = () => {

    const context = useContext(AuthContext);

    if (!context) throw new Error("useAuth must be used within an AuthProvider");

    return context;
}

export const AuthProvider = ({ children }) => {
    
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    const signup = async user => {
        
        try {
            
            const res = await signupRequest(user);
            setUser(res.data);
            setIsAuthenticated(true);

        } catch (error) { setErrors(error.response.data); }

    }

    const signin = async user => {
        
        try {
            
            const res = await loginRequest(user);
            
            document.cookie = "token=" + res.data.cookie;

            setUser(res.data);
            setIsAuthenticated(true);

        } catch (error) { 

            if(Array.isArray(error.response.data)) return setErrors(error.response.data); 

            setErrors([error.response.data.message]);
        }

    }

    const updateUser = async (id, user) => {

        try {

            const res = await profileRequest(id, user);
            setUser(res.data);
            setIsAuthenticated(true);

            return res.data;
            
        } catch (error) {
            
            if(Array.isArray(error.response.data)) return setErrors(error.response.data); 

            setErrors([error.response.data.message]);
        }

    }

    const getUser = async id => {

        try {

            const res = await userRequest(id);
            return res.data;

        } catch (error) {
            return { username : "Usuario desconocido" };
        }

    }

    const logout = () => {

        Cookies.remove("token");
        setIsAuthenticated(false);
        setUser(null);

    }

    useEffect(() => {

        if (errors.length > 0) {

            const timer = setTimeout(() => {

                setErrors([])

            }, 10000)

            return () => clearTimeout(timer);
        }

    }, [errors]);

    useEffect(() => {

        async function checkLogin() {
            
            const cookies = Cookies.get();

            try {

                const res = await verifyTokenRequest(cookies.token);
                setIsAuthenticated(true);
                setUser(res.data);

            } catch (error) {

                setIsAuthenticated(false);
                setUser(null);
                
            }
            setLoading(false);
            
            /*
            if (!cookies.token) {
                setIsAuthenticated(false);
                setLoading(false);
                return setUser(null);
            }

            try {
                
                const res = await verifyTokenRequest(cookies.token);
                if (!res.data) {
                    setIsAuthenticated(false);
                    setLoading(false);
                    return;
                }

                setIsAuthenticated(true);
                setUser(res.data);
                setLoading(false);

            } catch (error) {

                setIsAuthenticated(false);
                setUser(null);
                setLoading(false);
                
            }*/

            
        }

        checkLogin();
    }, [])

    return (
        <AuthContext.Provider value={{ signup, signin, logout, updateUser, getUser, user, isAuthenticated, errors, loading }}>
            { children }
        </AuthContext.Provider>
    );
}
