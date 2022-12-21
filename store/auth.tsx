import { NextRouter } from "next/router";
import { proxy } from "valtio";
import { User } from '../interfaces/index';

export interface UserStore {
    token: string | null
    user: User | null
    getUser: () => User | null
    setUser: (user: User) => void
    getToken: () => string | null
    setToken: (token: string) => void
    logOut: (router: NextRouter) => void
}

export const userStore = proxy<UserStore>({
    user: null,
    token: null,
    getUser: (): User | null => {
        const userString = localStorage.getItem("user")
        return userString ? JSON.parse(userString) as User : null
    },
    setUser: (user: User) => {
        userStore.user = user;
        localStorage.setItem("user", JSON.stringify(user))
    },
    getToken: (): string | null => {
        typeof window !== "undefined" ? userStore.token = localStorage.getItem("token") : null;
        return userStore.token
    },
    setToken: (token) => {
        localStorage.setItem("token", token);
    },
    logOut: (router: NextRouter) => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/login")
    },
});