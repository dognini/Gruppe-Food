import { createContext, useContext, ReactNode, useState } from "react";

interface AuthContextData {
    isAuthenticated: boolean
    login: () => void
    logout: () => void
}

interface AuthProviderProps {
    children: ReactNode
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = () => {
        const localUser = localStorage.getItem('usuario');
        const user = localUser ? JSON.parse(localUser) : null

        if (user) {
            setIsAuthenticated(true);
        }
    }

    const logout = () => {
        localStorage.removeItem('usuario');

        setIsAuthenticated(false);
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider')
    }

    return context
}