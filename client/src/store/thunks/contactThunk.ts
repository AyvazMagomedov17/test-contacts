import axios from 'axios';
import { useAppDispatch } from './../../hooks/redux';
import { AxiosError } from 'axios';
import { contactsApi } from './../../api/contactsApi';
import { createAsyncThunk } from '@reduxjs/toolkit';
export const getContactThunk = createAsyncThunk(
    'contact/getContact',
    async ({ id }: { id: number }, thunkApi) => {
        try {

            const data = await contactsApi.getContact(id)
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