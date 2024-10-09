import { useEffect, useState } from "react"
// Definición del hook useDebounce, que toma un valor(value) y un retraso(delay) opcional
export function useDebounce<T>(value: T, delay = 500) {
    const [debouncedValue, setDebouncedValue] = useState(value)  // Estado para almacenar el valor con debounce

    useEffect(() => { // Efecto que se ejecuta cuando el valor o el retraso cambian
        const timer = setTimeout(() => { // Configura un temporizador que se ejecutará después del retraso especificado
            setDebouncedValue(value) // Actualiza el valor debounced después del retraso
        }, delay)
        // Limpieza del temporizador al desmontar o cambiar el valor
        return () => { clearTimeout(timer) }// Cancela el temporizador anterior
    }, [value, delay]) // Dependencias: se ejecuta cuando value o delay cambian

    return debouncedValue // Devuelve el valor debounced
}

/*
0ms -> user type -'h'
    useEffecti ... L7
150ms -> user type -'he'
    clear useEffect - L11
    useEffect ... L7
300ms -> user type - 'hel'
    clear useEffect -L11
    useEffect ... L7
400ms -> user type - 'hell'
    clear useEffect -L11
    useEffect ... L7
900ms -> L8 -> setDebouncedValue('hell') -> debouncedValue L14
*/