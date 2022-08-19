import { AppBar, Grid, Toolbar, Typography } from "@mui/material"
import { Container } from "@mui/system"
import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { userSliceActions } from "../../store/reducers/userSlice"
import HeaderItem from "./HeaderItem"

type Props = {}

const Header = (props: Props) => {
    const isAuth = useAppSelector(state => state.userReducer.isAuth)
    const dispatch = useAppDispatch()
    const logout = () => {
        dispatch(userSliceActions.logout())
    }
    return (
        <AppBar color="primary" sx={{ height: '70px' }} position='sticky'>
            <Container fixed>
                <Toolbar >
                    <Grid gap={4} justifyContent='flex-end' container>
                        <HeaderItem link="/">Главная</HeaderItem>
                        {
                            !isAuth ? <HeaderItem link="/login">Войти</HeaderItem>
                                : <span onClick={logout}><HeaderItem link="/">Выйти</HeaderItem></span>
                        }

                        <HeaderItem link="/contacts">Контакты</HeaderItem>
                    </Grid>
                </Toolbar>
            </Container>

        </AppBar>
    )

}

export default Header