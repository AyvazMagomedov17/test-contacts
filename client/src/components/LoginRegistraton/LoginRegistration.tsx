import { Alert, Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { Formik } from "formik"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { useAuthRedirect } from "../../hooks/useAuthRedirect"
import { userSliceActions } from "../../store/reducers/userSlice"
import { loginThunk, registrationThunk } from "../../store/thunks/userThunks"
import { Visibility, VisibilityOff } from '@mui/icons-material'

import * as yup from 'yup'

type Props = {
    isLogin: boolean
}

const LoginRegistration = ({ isLogin }: Props) => {
    const history = useNavigate()
    const redirectPath = useAppSelector(state => state.redirectReducer.path)

    const [isPasswordVisible, setisPasswordVisible] = useState(false)
    const dispatch = useAppDispatch()
    const validationSchema = yup.object().shape({
        email: yup.string().required('Обязательное поле').email('Невалидный e-mail'),
        password: yup.string().required('Обязательное поле').min(3, 'Длина пароля должна быть больше 3 символов')
            .max(12, 'Длина пароля должна быть меньше 12 символов')
    })
    useEffect(() => {
        dispatch(userSliceActions.resetError())
    }, [])

    const error = useAppSelector(state => state.userReducer.error)
    useAuthRedirect()
    useEffect(() => {
        if (redirectPath) {

            if (isLogin) {
                history(`/login?redirect=${redirectPath}`)
            } else {
                history(`/registration?redirect=${redirectPath}`)

            }

        } else {
            if (isLogin) {
                history(`/login`)
            } else {
                history(`/registration`)

            }

        }
    }, [redirectPath])
    const handleClickShowPassword = () => {
        setisPasswordVisible(prev => !prev)
    }
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }

    return (
        <Formik initialValues={{
            email: '',
            password: ''
        }} validateOnBlur validationSchema={validationSchema} onSubmit={values => {
            if (isLogin) {
                dispatch(loginThunk(values))
            } else {
                dispatch(registrationThunk(values))
            }

        }}>{({ values, handleChange, handleSubmit, errors, handleBlur, touched, isValid }) => (
            <Grid gap={3} direction={'column'} container height={'90vh'} alignItems='center' justifyContent='center'>
                <Typography variant="h4">
                    {isLogin ? 'Вход' : 'Регистрация'}
                </Typography>
                <Box sx={{ 'width': '400px' }}>
                    <Box sx={{ 'width': '400px', 'marginBottom': 2 }} >
                        <TextField onKeyDown={(e) => {
                            if (e.keyCode === 13) {
                                handleSubmit()
                            }
                        }} type='email' onBlur={handleBlur} fullWidth name='email' onChange={handleChange} value={values.email} label="Введите email" variant="outlined" />
                        {touched.email && errors.email && <Alert severity="error">{errors.email}</Alert>}
                    </Box>
                    <Box sx={{ 'width': '400px', 'marginBottom': 2 }}>

                        <FormControl fullWidth variant="outlined">
                            <InputLabel  >Введите пароль</InputLabel>
                            <OutlinedInput onKeyDown={(e) => {
                                if (e.keyCode === 13) {
                                    handleSubmit()
                                }
                            }} onBlur={handleBlur} name='password' fullWidth

                                type={isPasswordVisible ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Введите пароль"
                            />
                        </FormControl>
                        {touched.password && errors.password && <Alert severity="error">{errors.password}</Alert>}
                    </Box>
                    {error && <Alert severity="error">{error}</Alert>}
                    <Button disabled={!isValid} sx={{ 'borderRadius': '15px' }} variant="contained" fullWidth onClick={() => { handleSubmit() }}>{isLogin ? 'Войти' : 'Зарегистрироваться'}</Button>
                </Box>
                {isLogin ? <span>Еще нет аккаунта? <Link to='/registration'>Зарегистрируйтесь</Link></span> : <span>Уже есть аккаунт? <Link to='/login'>Войдите</Link></span>}
            </Grid>
        )}</Formik>

    )
}

export default LoginRegistration