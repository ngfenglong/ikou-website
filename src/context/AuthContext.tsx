import { createContext, useState } from "react";
import { AuthContextData, User } from "../model/auth";


export const AuthContext = createContext<AuthContextData | undefined>(undefined)

export const AuthProvider = (props: {children: React.ReactNode}) => {
    const [user, setUser] = useState< User | null>(null);
    const isAuthenticated = !!user;

    const login = async()  => {
        setUser({});
    }

    const logout = () => {

    }

    return <AuthContext.Provider value={{user, isAuthenticated,login, logout}}>{props.children}</AuthContext.Provider>
}