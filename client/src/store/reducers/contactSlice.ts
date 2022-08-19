import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { addDeleteChangeContType } from '../../api/contactsApi';
import { getContactThunk } from '../thunks/contactThunk';
import { IContact } from './../../interfaces/IContact';
const initialState = {
    contact: {} as IContact,
    error: '',
    isLoading: false
}


const contactSlice = createSlice({
    name: 'contactReducer',
    initialState,
    reducers: {
        resetContact(state) {
            state.contact = {
                id: 0,
                description: '',
                name: '',
                phoneNumber: '',
                userId: 0
            }
            state.error = ''
            state.isLoading = false
        }
    },
    extraReducers: {
        [getContactThunk.fulfilled.type]: (state, action: PayloadAction<addDeleteChangeContType>) => {

            state.contact = action.payload.item
            state.isLoading = false
            state.error = ''
        },
        [getContactThunk.pending.type]: (state, action) => {
            state.error = ''
            state.isLoading = true
        },
        [getContactThunk.rejected.type]: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
    }
})
export const contactSliceReducer = contactSlice.reducer
export const contactSliceActions = contactSlice.actions
export const contactSliceName = contactSlice.name