import { IUser } from "../interfaces/IUser"
import { instanse } from "./instanse"

export const userApi = {
    registration: async (email: string, password: string) => {
        const resp = await instanse.post('users/register', { email, password })
        const data: IUser = resp.data
        return data
    },
    login: async (email: string, password: string) => {
        const resp = await instanse.post('users/login', { email, password })
        const data: IUser = resp.data
        return data
    },
    auth: async () => {
        const resp = await instanse.get('users/auth')
        const data: IUser = resp.data
        return data
    }
}