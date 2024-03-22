import React from 'react'
import { useEntity } from 'simpler-state'
import { theme, toggleTheme } from '../../store/theme.store'

function ThemeButton() {
    const currTheme = useEntity(theme)
    return <button className='theme-btn' onClick={toggleTheme}>{currTheme}</button>
}

export default ThemeButton
