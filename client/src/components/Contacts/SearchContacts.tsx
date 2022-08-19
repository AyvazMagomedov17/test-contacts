import { Box, Button, Grid, TextField } from '@mui/material'
import { Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../hooks/redux'
import { useGetParam } from '../../hooks/useGetParams'
import Paginator from '../Paginator'
import SearchIcon from '@mui/icons-material/Search';

type Props = {}

const SearchContacts = (props: Props) => {

    const page = useGetParam('page')
    const name = useGetParam('name')

    let history = useNavigate()
    const pagesCount = useAppSelector(state => state.contactsSlice.totalPages)
    const setCurrentPage = (payload: number) => {
        history(`/contacts?page=${payload}&name=${name ? name : ''}`)
    }


    return (
        <>

            <Formik initialValues={{
                name: name ? name : ''
            }} onSubmit={(values) => {
                history(`/contacts?page=${1}&name=${values.name}`)
            }} >
                {({ values, handleChange, handleSubmit }) => (<Box sx={{ 'display': 'flex', 'alignItems': 'center' }} >
                    <TextField onKeyDown={(e) => {
                        if (e.keyCode === 13)
                            handleSubmit()

                    }} sx={{ 'width': '400px' }} name='name' value={values.name} onChange={handleChange} label="Найти по имени..." variant="outlined" />
                    <Button type='submit' onClick={() => handleSubmit()}><SearchIcon /></Button>

                </Box>)}
            </Formik>
            <Paginator currentPage={Number(page) || 1} pagesCount={pagesCount || 1} setCurrentPage={setCurrentPage} />




        </>

    )
}

export default SearchContacts