import { IContact } from './../interfaces/IContact';
import { instanse } from './instanse';


export type getContactsType = {
    page: number
    name: string
    token: string | null
}
export type addContactType = {
    name: string,
    description: string,
    phoneNumber: string,
    token: string | null
}
export type deleteContactType = {
    id: number,
    token: string | null
}
export type changeContactType = {
    id: number, name: string, description: string, phoneNumber: string, token: string | null
}
export type getContactsRespType = { totalPages: number, items: IContact[] }
export type addDeleteChangeContType = { item: IContact }
export const contactsApi = {
    getContacts: async ({ page, name, token }: getContactsType) => {
        const resp = await instanse.get(`/contacts/get?page=${page}&name=${name}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const data: getContactsRespType = resp.data
        return data
    },
    addContact: async ({ name, description, phoneNumber, token }: addContactType) => {
        const resp = await instanse.post('/contacts/add', { name, description, phoneNumber }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const data: addDeleteChangeContType = resp.data
        return data
    },
    deleteContact: async ({ id, token }: deleteContactType) => {
        const resp = await instanse.delete(`/contacts/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const data: addDeleteChangeContType = resp.data
        return data
    },
    changeContact: async ({ id, name, description, phoneNumber, token }: changeContactType) => {
        const resp = await instanse.put('/contacts/put', { id, name, description, phoneNumber }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const data: addDeleteChangeContType = resp.data
        return data
    },
    getContact: async (id: number) => {

        const resp = await instanse.get(`/contacts/getone/${id}`)
        const data: addDeleteChangeContType = resp.data
        return data
    }
}