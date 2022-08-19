import { useAppSelector } from './redux';
import { useEffect } from "react"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"

export const useAuthRedirect = () => {
    let history = useNavigate()
    const isAuth = useAppSelector(state => state.userReducer.isAuth)
    const pars = new URLSearchParams(useLocation().search)

    const queryRedirect = pars.get('redirect') ? String(pars.get('redirect')) : '/'

    useEffect(() => {
        if (isAuth) history(queryRedirect)
    }, [isAuth, queryRedirect])

}