import React, { PropsWithChildren, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"

const updateAuthAxios = axios.create();

updateAuthAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    config.headers!.Authorization = `Bearer ${token}`
    return config
})

type Props = PropsWithChildren<{
    text: string
  }>

export interface IUserInput {
    username: string;
    password?: string;
    ageRange?: string;
}

export interface IAuthContext {
    login: (userInput: IUserInput, newUser: boolean) => void,
    logout: () => void,
    update: (id: string, userInput: IUserInput) => void,
    authState: {
        user: {username: string, ageRange: string, _id: string},
        token: string
    },
    errObj: {
        errMessage: string,
        clearErrMessage: () => void,
    }
}

export const AuthContext = React.createContext<IAuthContext | null>(null);

export default function AuthProvider({children}: Props) {

    const navigate = useNavigate();
    const [authState, setAuthState] = useState({
        user: JSON.parse(localStorage.getItem("user") || "{}"), 
        token: localStorage.getItem("token") || ""
    });
    const [errMessage, setErrMessage] = useState("")

    function clearErrMessage(): void {
        setErrMessage("")
    }

    function login(userInput: IUserInput, newUser: boolean): void {

        const endpoint = newUser ? 'signup' : 'login';
        axios.post(`/auth/${endpoint}`, userInput)
            .then(resp => {
                const {user, token} = resp.data
                localStorage.setItem("token", token)
                localStorage.setItem("user", JSON.stringify(user))
                setAuthState(() => {
                    return {user, token}
                })
                navigate("/tasks")
            })
            .catch(err => setErrMessage('*' + err.response.data.message))
    }

    function logout(): void {
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        setAuthState({
            user: {},
            token: ""
        })
        navigate("/")
    }

    function update(id: string, userInput: IUserInput): void {
        updateAuthAxios.put(`/api/auth/${id}`, userInput)
            .then(resp => {
                const { username, ageRange, _id} = resp.data
                const updatedUser = {username: username, ageRange: ageRange, _id: _id}
                localStorage.setItem("user", JSON.stringify(updatedUser))
                setAuthState((prevAuthState) => {
                    return {...prevAuthState, updatedUser}
                })
                alert("Info saved successfully!")
            })
            .catch(err => setErrMessage('*' + err.response.data.message))
    }

    return (
        <AuthContext.Provider value={{login, logout, update, authState, errObj: {errMessage, clearErrMessage}}}>
            {children}
        </AuthContext.Provider>
    )
}