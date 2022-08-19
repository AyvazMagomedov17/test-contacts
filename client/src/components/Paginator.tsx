import { Pagination } from '@mui/material'
import React from 'react'

type Props = {
    pagesCount: number,
    currentPage: number,
    setCurrentPage: (payload: number) => void
}

const Paginator = ({ pagesCount, currentPage, setCurrentPage }: Props) => {
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    return (
        <Pagination sx={{ 'marginBottom': 2, 'marginTop': 2 }} variant='outlined' color='primary' count={pagesCount} page={currentPage} onChange={handleChange} />
    )
}

export default Paginator