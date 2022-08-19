import { useEffect } from "react"
import Contacts from "../components/Contacts/Contacts"
import NavigationButtons from "../components/NavigationButtons"
import { useAppDispatch, useAppSelector } from "../hooks/redux"
import { redirectPathSliceActions } from "../store/reducers/redirectPathSlice"

type Props = {}

const ContactsPage = (props: Props) => {
    const dispatch = useAppDispatch()
    const isAuth = useAppSelector(state => state.userReducer.isAuth)
    useEffect(() => {
        dispatch(redirectPathSliceActions.handleChangeRedirectPath('/contacts'))
    }, [])
    return (
        <> {!isAuth ? <NavigationButtons fromContacts text="Страница контактов доступна только авторизованным пользователям" /> : <Contacts />}</>

    )
}

export default ContactsPage