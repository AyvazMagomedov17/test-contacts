import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IUser } from "../../interfaces/IUser"
import { authThunk, loginThunk, registrationThunk } from "../thunks/userThunks"

const initialState = {
    user: {
        id: null as null | number,
        email: '',
    },
    isAuth: false,
    authIsLoading: false,
    loginRegistrationIsLoading: false,
    error: ''
}

const userSlice = createSlice({
    name: 'userReducer',
    initialState,
    reducers: {
        logout(state) {
            state.error = ''
            state.user.id = null
            state.user.email = ''
            state.isAuth = false
            localStorage.removeItem('token')
        },
        resetError(state) {
            state.error = ''
        }
    },
    extraReducers: {
        [registrationThunk.fulfilled.type]: (state, action: PayloadAction<IUser>) => {

            localStorage.setItem('token', action.payload.token)
            state.user.email = action.payload.user.email
            state.user.id = action.payload.user.id
            state.loginRegistrationIsLoading = false
            state.isAuth = true
            state.error = ''

        },
        [registrationThunk.pending.type]: (state, action) => {
            state.error = ''
            state.loginRegistrationIsLoading = true
        },
        [registrationThunk.rejected.type]: (state, action) => {

            state.loginRegistrationIsLoading = false
            state.error = action.payload
            state.isAuth = false

            localStorage.removeItem('token')
        },
        [loginThunk.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
            localStorage.setItem('token', action.payload.token)
            state.user.email = action.payload.user.email
            state.user.id = action.payload.user.id
            state.loginRegistrationIsLoading = false
            state.isAuth = true
            state.error = ''

        },
        [loginThunk.pending.type]: (state, action) => {
            state.error = ''
            state.loginRegistrationIsLoading = true
        },
        [loginThunk.rejected.type]: (state, action) => {

            state.loginRegistrationIsLoading = false
            state.error = action.payload
            state.isAuth = false
            localStorage.removeItem('token')
        },
        [authThunk.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
            localStorage.setItem('token', action.payload.token)
            state.user.email = action.payload.user.email
            state.user.id = action.payload.user.id
            state.authIsLoading = false
            state.isAuth = true
            state.error = ''

        },
        [authThunk.pending.type]: (state, action) => {
            state.error = ''
            state.authIsLoading = true
        },
        [authThunk.rejected.type]: (state, action) => {
            state.authIsLoading = false
            state.isAuth = false
            localStorage.removeItem('token')
        },

    }
})


export const userSliceReducer = userSlice.reducer
export const userSliceName = userSlice.name
export const userSliceActions = userSlice.actions