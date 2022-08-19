import { createSlice, PayloadAction } from '@reduxjs/toolkit';
const initialState = {
    path: ''
}

const redirectPathSlice = createSlice({
    name: 'redirectReducer',
    initialState,
    reducers: {
        handleChangeRedirectPath(state, action: PayloadAction<string>) {
            state.path = action.payload
        }
    }
})

export const redirectPathSliceReducer = redirectPathSlice.reducer
export const redirectPathSliceName = redirectPathSlice.name
export const redirectPathSliceActions = redirectPathSlice.actions