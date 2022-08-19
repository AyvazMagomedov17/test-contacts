import { Alert, Button, Grid, Modal, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { Formik } from "formik"
import CancelIcon from '@mui/icons-material/Cancel';
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useEffect } from "react";
import { getContactThunk } from "../../store/thunks/contactThunk";
import { addContactThunk, changeContactThunk } from "../../store/thunks/contactsThunk";
import { contactSliceActions } from "../../store/reducers/contactSlice";
import * as yup from 'yup'
type Props = {
    isOpen: boolean,
    handleClose: () => void
    isEdit: boolean
    contactId: number
}

const AddEditContactModal = ({ isOpen, handleClose, isEdit, contactId }: Props) => {
    const validationSchema = yup.object().shape({
        name: yup.string().required('Обязательное поле'),
        description: yup.string().required('Обязательное поле'),
        phoneNumber: yup.string().required('Обязательное поле')
    })
    const dispatch = useAppDispatch()
    useEffect(() => {

        isEdit && dispatch(getContactThunk({ id: contactId }))
        return function () {
            dispatch(contactSliceActions.resetContact())
        }
    }, [])

    const contact = useAppSelector(state => state.contactReducer.contact)
    const contactIsLoading = useAppSelector(state => state.contactReducer.isLoading)
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        minWidth: '70vw',
        bgcolor: 'white',
        minHeight: '60vh',

        pt: 2,
        px: 4,
        pb: 3,
    };
    if (contactIsLoading) {
        return <></>
    }
    return (
        <Modal onClose={handleClose} open={isOpen}>
            <Formik validateOnBlur validationSchema={validationSchema} enableReinitialize initialValues={{
                name: isEdit ? contact?.name : '',
                description: isEdit ? contact?.description : '',
                phoneNumber: isEdit ? contact?.phoneNumber : ''
            }} onSubmit={values => {
                isEdit ? dispatch(changeContactThunk({ id: contactId, ...values, token: localStorage.getItem('token') })) :
                    dispatch(addContactThunk({ ...values, token: localStorage.getItem('token') }))

                handleClose()
            }}>{({ values, handleChange, handleSubmit, handleBlur, touched, isValid, errors }) => (
                <Box sx={style}>
                    <Button onClick={handleClose} sx={{ 'position': 'absolute', 'right': '10px', 'top': '10px' }}><CancelIcon /></Button>
                    <Grid marginTop={2} alignItems='center' justifyContent='center' container>
                        <Grid textAlign='center' item xs={12}>
                            <Typography variant="h5">{isEdit ? 'Редактировать контакт' : 'Добавить контакт'}</Typography>
                        </Grid>
                        <Grid marginTop={2} item xs={12}>
                            <Grid direction='column' alignItems='center' justifyContent='center' container>
                                <TextField onKeyDown={(e) => {
                                    if (e.keyCode === 13) {
                                        handleSubmit()
                                    }
                                }} onBlur={handleBlur} onChange={handleChange} name='name' value={values.name} sx={{ 'width': '30vw' }} label="Введите имя..." variant="outlined" />
                                {touched.name && errors.name && <Alert sx={{ 'width': '30vw' }} severity="error">{errors.name}</Alert>}
                            </Grid>

                        </Grid>
                        <Grid marginTop={2} item xs={12}>
                            <Grid direction='column' alignItems='center' justifyContent='center' container>
                                <TextField onKeyDown={(e) => {
                                    if (e.keyCode === 13) {
                                        handleSubmit()
                                    }
                                }} onBlur={handleBlur} onChange={handleChange} name='description' value={values.description} sx={{ 'width': '30vw' }} label="Введите описание..." variant="outlined" />
                                {touched.description && errors.description && <Alert sx={{ 'width': '30vw' }} severity="error">{errors.description}</Alert>}
                            </Grid>

                        </Grid>
                        <Grid marginTop={2} item xs={12}>
                            <Grid direction='column' alignItems='center' justifyContent='center' container>
                                <TextField onKeyDown={(e) => {
                                    if (e.keyCode === 13) {
                                        handleSubmit()
                                    }
                                }} onBlur={handleBlur} onChange={handleChange} name='phoneNumber' value={values.phoneNumber} sx={{ 'width': '30vw' }} label="Введите номер" variant="outlined" />
                                {touched.phoneNumber && errors.phoneNumber && <Alert sx={{ 'width': '30vw' }} severity="error">{errors.phoneNumber}</Alert>}

                            </Grid>

                        </Grid>
                        <Grid marginTop={2} item xs={12}>
                            <Grid justifyContent='center' container>
                                <Button disabled={!isValid} onClick={() => handleSubmit()} sx={{ 'width': '30vw' }} variant="contained">
                                    {isEdit ? 'Изменить' : 'Создать'}
                                </Button>
                            </Grid>

                        </Grid>




                    </Grid>
                </Box>

            )}

            </Formik>

        </Modal>
    )
}

export default AddEditContactModal