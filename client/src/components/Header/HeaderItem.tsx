import { Typography } from "@mui/material"
import { Link } from "react-router-dom"

type Props = {
    link: string
    children: string
}

const HeaderItem = ({ link, children }: Props) => {
    return (
        <Link to={link}>
            <Typography color='white' fontSize={18}>
                {children}
            </Typography>
        </Link>
    )
}

export default HeaderItem