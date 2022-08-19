import { Box } from "@mui/material";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import ContactsPage from "../pages/ContactsPage";
import LoginPage from "../pages/LoginPage";
import MainPage from "../pages/MainPage";
import RegistrationPage from "../pages/RegistrationPage";
import { authThunk } from "../store/thunks/userThunks";
import ErrorAlert from "./ErrorAlert";
import Header from "./Header/Header";
import Loader from "./Loader/Loader";


function App() {
    const isLoading = useAppSelector(state => state.userReducer.authIsLoading)
    const dispatch = useAppDispatch()
    const contactError = useAppSelector(state => state.contactReducer.error)
    const contactsError = useAppSelector(state => state.contactsSlice.error)
    useEffect(() => {
        dispatch(authThunk())
    }, [])
    if (isLoading) {
        return <Box sx={{ 'width': '100vw', 'height': '100vh', 'display': 'flex', 'justifyContent': 'center', 'alignItems': 'center' }}>
            <Loader />
        </Box>
    }
    return (
        <BrowserRouter>
            {contactError || contactsError ? <ErrorAlert message={contactError || contactsError} /> : null}
            <div className="App">
                <Header />
                <Routes>
                    <Route path='/' element={<MainPage />} />
                    <Route path='/login/*' element={<LoginPage />} />
                    <Route path='/registration' element={<RegistrationPage />} />
                    <Route path='/contacts' element={<ContactsPage />} />
                </Routes>
            </div>

        </BrowserRouter>

    );
}

export default App;
