import { Button, Grid, Typography } from '@mui/material'
import { useEffect } from 'react'
import MainButton from '../components/MainButton'
import NavigationButtons from '../components/NavigationButtons'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { redirectPathSliceActions } from '../store/reducers/redirectPathSlice'
import { userSliceActions } from '../store/reducers/userSlice'

type Props = {}

const MainPage = (props: Props) => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(redirectPathSliceActions.handleChangeRedirectPath(''))
    }, [])
    return (
        <NavigationButtons fromContacts={false} />
    )
}

export default MainPage