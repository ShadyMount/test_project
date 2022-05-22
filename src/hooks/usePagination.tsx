import { useEffect, useState } from 'react';

export const usePagination = () => {

    const [currentPage, setCP] = useState('1')
    const [pagesAmount, setPA] = useState('3')


    const setCurrentPage = (currentPage: string) => {
        localStorage.setItem('currentPage', currentPage)
        setCP(currentPage)
    }

    const setPagesAmount = (pagesAmount: string) => {
        localStorage.setItem('currentPage', pagesAmount)
        setCP(pagesAmount)
    }

    useEffect(() => {
        const localCurrentPage = localStorage.getItem('currentPage')
        localCurrentPage && localCurrentPage !== '' && setCP(localCurrentPage)

        const localPagesAmount = localStorage.getItem('pagesAmount')
        localPagesAmount && localPagesAmount !== '' && setPA(localPagesAmount)
    }, [])

    return {currentPage, setCurrentPage, pagesAmount, setPagesAmount} as const

}