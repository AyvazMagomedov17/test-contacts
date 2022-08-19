import { Alert } from "@mui/material"

type Props = {
    message: string
}

const ErrorAlert = ({ message }: Props) => {
    return (
        <Alert severity="error" sx={{ 'position': 'absolute', 'bottom': '20px', 'left': '20px' }}>{message}</Alert>
    )
}

export default ErrorAlert