import { Button, Grid, Typography } from "@mui/material"
import { Container } from "@mui/system"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { useGetParam } from "../../hooks/useGetParams"
import { getContactsThunk } from "../../store/thunks/contactsThunk"
import Loader from "../Loader/Loader"
import AddEditContactModal from "./AddEditContactModal"
import Contact from "./Contact/Contact"
import SearchContacts from "./SearchContacts"

type Props = {}

const Contacts = (props: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const isAuth = useAppSelector(state => state.userReducer.isAuth)
    const [modalContactId, setModalContactId] = useState(0)
    const page = useGetParam('page')
    const name = useGetParam('name')
    const handleCloseModal = () => {
        setIsModalOpen(false)
    }
    const handleOpenModal = () => {
        setIsModalOpen(true)
    }
    const token = localStorage.getItem('token')
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (isAuth && token) {

            if (!name && !page) {
                debugger
                dispatch(getContactsThunk({ name: '', page: 1, token: token }))
            }
            if (name && page) {

                dispatch(getContactsThunk({ name: String(name), page: Number(page), token: token }))
            }
            if (!name && page) {

                dispatch(getContactsThunk({ name: '', page: Number(page), token: token }))
            }
            if (!page && name) {

                dispatch(getContactsThunk({ name: name, page: 1, token: token }))
            }
        }




    }, [name, page, isAuth, token])
    const contactsState = useAppSelector(state => state.contactsSlice)

    const listOfContacts = contactsState.users.map(contact => <Contact setModalContactId={setModalContactId} key={contact.id} setIsEdit={setIsEdit} isEdit={isEdit} handleOpenModal={handleOpenModal} isModalOpen={isModalOpen} handleCloseModal={handleCloseModal} {...contact} />)
    return (
        <>
            <Container fixed>
                <Grid marginTop={3} container  >
                    <Grid marginBottom={3} textAlign='center' item xs={12}>
                        <Typography variant="h3">Контакты</Typography>
                    </Grid>
                    <Grid marginBottom={3} item xs={12}>
                        <Button onClick={() => {
                            handleOpenModal()
                            setIsEdit(false)
                        }} size="large" fullWidth variant="outlined">Добавить контакт</Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid direction='column' alignItems='center' container>
                            <SearchContacts />

                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        {contactsState.isLoading ? <Grid justifyContent='center' container><Loader /></Grid> : contactsState.totalPages !== 0 ?
                            listOfContacts :
                            <Typography marginTop={5} textAlign='center' fontSize={20}>Контакты не найдены</Typography>}

                    </Grid>
                </Grid>
            </Container>
            {isModalOpen && <AddEditContactModal isOpen={isModalOpen} handleClose={handleCloseModal} isEdit={isEdit} contactId={modalContactId} />}
        </>


    )
}

export default Contacts