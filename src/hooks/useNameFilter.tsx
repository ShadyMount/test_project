import { useEffect, useState } from 'react';

export const useNameFilter = () => {

    const [name, setName] = useState('')

    const setChosenName = (name: string) => {
        localStorage.setItem('name', name)
        setName(name)
    }

    useEffect(() => {
        const localName = localStorage.getItem('name')
        localName && localName !== '' && setName(localName)
    }, [])

    return [name, setChosenName] as const

}