import { useEffect, useState } from 'react';

export const useCreatedBeforeFilter = () => {

    const [createdBefore, setCreatedBefore] = useState('')

    const setChosenCreatedBefore = (createdBefore: string) => {
        localStorage.setItem('createdBefore', createdBefore)
        setCreatedBefore(createdBefore)
    }

    useEffect(() => {
        const localCreatedBefore = localStorage.getItem('createdBefore')
        localCreatedBefore && localCreatedBefore !== '' && setCreatedBefore(localCreatedBefore)
    }, [])

    return [createdBefore, setChosenCreatedBefore] as const

}