import { addContactThunk, deleteContactThunk, changeContactThunk } from './../thunks/contactsThunk';
import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { addDeleteChangeContType, getContactsRespType } from '../../api/contactsApi';
import { IContact } from "../../interfaces/IContact"
import { getContactsThunk } from '../thunks/contactsThunk';

const initialState = {
    users: [] as IContact[],
    error: '',
    isLoading: false,
    totalPages: 0,
    changeContactIsLoading: false,
    deleteContactIsLoading: false
}

const contactsSlice = createSlice({
    name: 'contactsSlice',
    initialState,
    reducers: {},
    extraReducers: {
        [getContactsThunk.fulfilled.type]: (state, { payload }: PayloadAction<getContactsRespType>) => {
            state.totalPages = payload.totalPages
            state.users = payload.items
            state.isLoading = false
            state.error = ''
        },
        [getContactsThunk.pending.type]: (state, action) => {
            state.error = ''
            state.isLoading = true
        },
        [getContactsThunk.rejected.type]: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
        [addContactThunk.fulfilled.type]: (state, { payload }: PayloadAction<addDeleteChangeContType>) => {

            state.users = [payload.item, ...state.users]
            state.totalPages = state.totalPages + 1
            state.isLoading = false
            state.error = ''
        },
        [addContactThunk.pending.type]: (state, action) => {
            state.error = ''
            state.isLoading = true
        },
        [addContactThunk.rejected.type]: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
        [changeContactThunk.fulfilled.type]: (state, { payload }: PayloadAction<addDeleteChangeContType>) => {
            state.users.forEach(user => {
                if (user.id === payload.item.id) {

                    const index = state.users.indexOf(user)
                    return state.users[index] = payload.item
                }
            })
            state.changeContactIsLoading = false
            state.error = ''
        },
        [changeContactThunk.pending.type]: (state, action) => {
            state.error = ''
            state.changeContactIsLoading = true
        },
        [changeContactThunk.rejected.type]: (state, action) => {
            state.changeContactIsLoading = false
            state.error = action.payload
        },
        [deleteContactThunk.fulfilled.type]: (state, { payload }: PayloadAction<addDeleteChangeContType>) => {
            state.users.forEach(user => {
                if (user.id === payload.item.id) {

                    const index = state.users.indexOf(user)
                    return state.users.splice(index, 1)
                }
            })
            state.totalPages = state.totalPages - 1
            state.deleteContactIsLoading = false
            state.error = ''
        },
        [deleteContactThunk.pending.type]: (state, action) => {
            state.error = ''
            state.deleteContactIsLoading = true
        },
        [deleteContactThunk.rejected.type]: (state, action) => {
            state.deleteContactIsLoading = false
            state.error = action.payload
        },


    }
})
export const contactsSliceName = contactsSlice.name
export const contactsSliceReducer = contactsSlice.reducer
export const contactsSliceActions = contactsSlice.actions