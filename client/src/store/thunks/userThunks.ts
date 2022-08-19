import axios from 'axios';
import { userApi } from '../../api/userApi';
import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from 'axios';
import { IUser } from '../../interfaces/IUser';

export const registrationThunk = createAsyncThunk(
    'user/registration',
    async ({ email, password }: { email: string, password: string }, thunkApi) => {
        try {
            const data = await userApi.registration(email, password)
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
export const loginThunk: AsyncThunk<IUser, {
    email: string;
    password: string;
}, {}> = createAsyncThunk(
    'user/login',
    async ({ email, password }: { email: string, password: string }, thunkApi) => {
        try {
            const data = await userApi.login(email, password)
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
export const authThunk = createAsyncThunk(
    'user/auth',
    async (_, thunkApi) => {
        try {
            const data = await userApi.auth()
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
