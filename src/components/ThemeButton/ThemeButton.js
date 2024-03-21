import React from 'react'
import { useTheme } from '../../hooks/useTheme'

function ThemeButton() {
    const { toggleTheme, theme } = useTheme()

    return <button className='theme-btn' onClick={toggleTheme}>{theme}</button>
}

export default ThemeButton
