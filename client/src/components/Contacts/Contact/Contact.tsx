import { Button, Grid, Typography } from "@mui/material"
import ContactInfo from "./ContactInfo"
import DeleteIcon from '@mui/icons-material/Delete';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Box } from "@mui/system";
import AddChangeContactModal from "../AddEditContactModal";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { getContactThunk } from "../../../store/thunks/contactThunk";
import { deleteContactThunk } from "../../../store/thunks/contactsThunk";
type Props = {
    id: number
    name: string,
    description: string,
    phoneNumber: string
    isModalOpen: boolean
    handleCloseModal: () => void
    handleOpenModal: () => void
    isEdit: boolean
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
    setModalContactId: React.Dispatch<React.SetStateAction<number>>
}


const Contact = ({ id, name, description, phoneNumber, isModalOpen, handleCloseModal, handleOpenModal, setIsEdit, isEdit, setModalContactId }: Props) => {
    const dispatch = useAppDispatch()

    const handleClickOnDeleteContact = () => {
        dispatch(deleteContactThunk({ id: id, token: localStorage.getItem('token') }))
    }
    const contacts = useAppSelector(state => state.contactsSlice)

    return (
        <>
            <Grid sx={{ 'border': '1px solid black', 'borderRadius': '10px', 'position': 'relative' }} justifyContent='center' container>
                <Box sx={{ 'position': 'absolute', 'right': '10px', 'top': '10px' }}>
                    <Button onClick={() => {
                        handleOpenModal()
                        setModalContactId(id)
                        setIsEdit(true)
                    }} ><ManageAccountsIcon /></Button>
                    <Button disabled={contacts.deleteContactIsLoading} onClick={handleClickOnDeleteContact} ><DeleteIcon /></Button>
                </Box>

                <Grid item xs={12}>
                    <ContactInfo description="Имя" text={name} />
                    <ContactInfo description="Описание" text={description} />
                    <Grid marginTop={1} marginBottom={1} justifyContent='center' container>

                        <Typography color='rgba(91, 89, 90, 1)' display='inline' fontStyle='italic' fontSize={18}>Номер: <Typography color='rgba(0, 0, 0, 1)' display='inline' >
                            {<a href={`tel:${phoneNumber}`} >{phoneNumber}</a>}
                        </Typography></Typography>
                    </Grid>
                </Grid>
            </Grid>


        </>

    )
}

export default Contact