import { Grid, Typography } from '@mui/material'
import React from 'react'
import { JsxElement } from 'typescript'

type Props = {
    text: string,
    description: string
}

const ContactInfo = ({ text, description }: Props) => {
    return (
        <Grid marginTop={1} marginBottom={1} justifyContent='center' container>

            <Typography color='rgba(91, 89, 90, 1)' display='inline' fontStyle='italic' fontSize={18}>{description}: <Typography color='rgba(0, 0, 0, 1)' display='inline' >
                {text}
            </Typography></Typography>
        </Grid>
    )
}

export default ContactInfo