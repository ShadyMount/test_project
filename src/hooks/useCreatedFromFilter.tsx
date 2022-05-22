import { useEffect, useState } from 'react';

export const useCreatedFromFilter = () => {

    const [createdFrom, setCreatedFrom] = useState('')

    const setChosenCreatedFrom = (createdFrom: string) => {
        localStorage.setItem('createdFrom', createdFrom)
        setCreatedFrom(createdFrom)
    }

    useEffect(() => {
        const localCreatedFrom = localStorage.getItem('createdFrom')
        localCreatedFrom && localCreatedFrom !== '' && setCreatedFrom(localCreatedFrom)
    }, [])

    return [createdFrom, setChosenCreatedFrom] as const

}