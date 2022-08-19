import { contactSliceName, contactSliceReducer } from './reducers/contactSlice';
import { redirectPathSliceName, redirectPathSliceReducer } from './reducers/redirectPathSlice';
import { contactsSliceName, contactsSliceReducer } from './reducers/contactsSlice';
import { userSliceName, userSliceReducer } from './reducers/userSlice';
import { combineReducers, configureStore } from "@reduxjs/toolkit"


const rootReducer = combineReducers({
    [userSliceName]: userSliceReducer,
    [contactsSliceName]: contactsSliceReducer,
    [redirectPathSliceName]: redirectPathSliceReducer,
    [contactSliceName]: contactSliceReducer
})
export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootStateType = ReturnType<typeof rootReducer>
export type AppStoreType = ReturnType<typeof setupStore>
export type AppDispatchType = AppStoreType['dispatch']



export { }