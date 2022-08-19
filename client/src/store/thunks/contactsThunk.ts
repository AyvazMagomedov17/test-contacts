import axios, { AxiosError } from 'axios';
import { contactsApi, getContactsType, addContactType, deleteContactType, changeContactType } from './../../api/contactsApi';
import { createAsyncThunk } from '@reduxjs/toolkit';
export const addContactThunk = createAsyncThunk(
    'contacts/addContact',
    async ({ name, description, phoneNumber, token }: addContactType, thunkApi) => {
        try {
            const data = await contactsApi.addContact({ name, description, phoneNumber, token })
            return data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const err = error as AxiosError<{ message: string }>
                return thunkApi.rejectWithValue(err.response?.data.message)
            } else {
                const err = error as Error
                return thunkApi.rejectWithValue(err.message)

            }

        }
    }
)
export const deleteContactThunk = createAsyncThunk(
    'contacts/deleteContact',
    async ({ id, token }: deleteContactType, thunkApi) => {
        try {
            const data = await contactsApi.deleteContact({ id, token })
            return data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const err = error as AxiosError<{ message: string }>
                return thunkApi.rejectWithValue(err.response?.data.message)
            } else {
                const err = error as Error
                return thunkApi.rejectWithValue(err.message)

            }

        }
    }
)
export const getContactsThunk = createAsyncThunk(
    'contacts/getContacts',
    async ({ page, name, token }: getContactsType, thunkApi) => {
        try {
            const data = await contactsApi.getContacts({ page, name, token })
            return data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const err = error as AxiosError<{ message: string }>
                return thunkApi.rejectWithValue(err.response?.data.message)
            } else {
                const err = error as Error
                return thunkApi.rejectWithValue(err.message)

            }

        }
    }
)

export const changeContactThunk = createAsyncThunk(
    'contacts/changeContact',
    async ({ id, description, name, phoneNumber, token }: changeContactType, thunkApi) => {
        try {
            const data = await contactsApi.changeContact({ id, description, name, phoneNumber, token })
            return data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const err = error as AxiosError<{ message: string }>
                return thunkApi.rejectWithValue(err.response?.data.message)
            } else {
                const err = error as Error
                return thunkApi.rejectWithValue(err.message)

            }

        }
    }
)