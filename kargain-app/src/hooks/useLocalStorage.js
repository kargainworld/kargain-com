import { useState } from 'react'
import window from 'global'

function useLocalStorage (key, initialValue = {}) {
    const [storedValue, setStoredValue] = useState(get)

    function get () {
        try {
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item) : initialValue
        } catch (err) {
            return initialValue
        }
    }

    const set = value => {
        const valueToStore = value instanceof Function ? value(storedValue) : value
        setStoredValue(valueToStore)
        window.localStorage.setItem(key, JSON.stringify(value))
    }

    const clear = () => {
        window.localStorage.removeItem(key)
    }

    return [storedValue, set, clear]
}

export default useLocalStorage
