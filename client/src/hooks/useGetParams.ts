import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
export const useGetParam = (param: string) => {
    const pars = new URLSearchParams(useLocation().search)
    const par = pars.get(param)
    return par
}