import { Grid, Typography } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../hooks/redux"
import { userSliceActions } from "../store/reducers/userSlice"
import MainButton from "./MainButton"

type Props = {
    text?: string
    fromContacts: boolean
}

const NavigationButtons = ({ text, fromContacts }: Props) => {
    const dispatch = useAppDispatch()
    const handleLogout = () => {
        dispatch(userSliceActions.logout())
    }


    const isAuth = useAppSelector(state => state.userReducer.isAuth)
    return <Grid gap={3} direction={'column'} container height={'90vh'} alignItems='center' justifyContent='center'>
        <Typography fontSize={20}>{text}</Typography>
        {isAuth ?
            <MainButton click={handleLogout} link='/' color='secondary'>Выйти из аккаунта</MainButton>
            :
            <MainButton link='/login' color='secondary'>Войти</MainButton>}

        {!fromContacts && <MainButton link='/contacts' color='warning'>Контакты</MainButton>}

    </Grid>
}

export default NavigationButtons