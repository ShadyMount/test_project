import { useEffect, useState } from 'react';

interface ChosenAuthor {
    id: number | undefined,
    name: string | undefined
} 

export const useAuthorFilter = () => {

    const [author, setAuthor] = useState<ChosenAuthor>()

    const setChosenAuthor = (author: ChosenAuthor) => {
        localStorage.setItem('author', JSON.stringify(author))
        setAuthor(author)
    }

    useEffect(() => {
        const localAuthor = localStorage.getItem('author') && JSON.parse(localStorage.getItem('author') || '') 
        localAuthor && setAuthor(localAuthor)
    }, [])

    return [author, setChosenAuthor] as const

}