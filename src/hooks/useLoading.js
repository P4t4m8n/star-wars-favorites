import { createContext, useContext, useState } from "react"

const LoadingContext = createContext()

export const useLoading = () => useContext(LoadingContext)

export const LoadingProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(true)

    const toggleLoading = () => {
        setLoading(!isLoading)
    }

    return (
        <LoadingContext.Provider value={{ isLoading, toggleLoading }}>
            {children}
        </LoadingContext.Provider>
    )
}