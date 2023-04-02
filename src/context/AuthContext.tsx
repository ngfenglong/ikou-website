import { createContext, useState } from "react";
import { AuthContextData } from "../model/auth";


export const AuthContext = createContext<AuthContextData | undefined>(undefined)

export const AuthProvider = (props: {children: React.ReactNode}) => {
    const [user, setUser] = useState(null);
    const isAuthenticated = !!user;

    const login = async()  => {

    }

    const logout = () => {

    }

    return <AuthContext.Provider value={{user, isAuthenticated,login, logout}}>{props.children}</AuthContext.Provider>
}