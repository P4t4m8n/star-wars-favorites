import React from 'react'
import { useEntity } from 'simpler-state'
import { theme, toggleTheme } from '../../store/theme.store'
import { EmpireThemeSvg, RebellionThemeSvg } from '../../services/icon.service'

function ThemeButton() {
    const currTheme = useEntity(theme)
    return <button className='theme-btn' onClick={toggleTheme}>
        {currTheme === 'empire' ? <EmpireThemeSvg /> : <RebellionThemeSvg />}
    </button>
}

export default ThemeButton
