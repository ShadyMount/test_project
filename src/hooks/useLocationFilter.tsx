import { useEffect, useState } from 'react';

interface ChosenLocation {
    id: number | undefined,
    name: string | undefined
}

export const useLocationFilter = () => {

    const [location, setLocation] = useState<ChosenLocation>()

    const setChosenLocation = (location: ChosenLocation) => {
        localStorage.setItem('location', JSON.stringify(location))
        setLocation(location)
    }

    useEffect(() => {
        
        const localLocation = localStorage.getItem('location') && JSON.parse(localStorage.getItem('location') || '') 
        localLocation && setLocation(localLocation)
    }, [])

    return [location, setChosenLocation] as const

}