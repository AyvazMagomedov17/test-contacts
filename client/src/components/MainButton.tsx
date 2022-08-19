import { Button } from "@mui/material"
import { Link } from "react-router-dom"

type Props = {
    color: "inherit" | "secondary" | "primary" | "success" | "error" | "info" | "warning" | undefined,
    children: string,
    link: string,
    click?: () => void
}

const MainButton = ({ color, children, link, click }: Props) => {
    return (

        <Link to={link}>
            <Button onClick={() => {
                click && click()
            }} color={color} size='large' sx={{ 'width': '300px', 'borderRadius': '15px' }} variant='contained' >
                {children}
            </Button>

        </Link>


    )
}

export default MainButton