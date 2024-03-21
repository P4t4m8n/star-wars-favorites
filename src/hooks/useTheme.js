import React, { createContext, useContext, useState } from 'react'

const ThemeContext = createContext()

export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('empire') 

    const toggleTheme = () => {
        setTheme((currentTheme) => (currentTheme === 'empire' ? 'rebellion' : 'empire'))
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
