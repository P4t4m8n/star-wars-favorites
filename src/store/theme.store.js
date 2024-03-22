import { entity } from "simpler-state"

export const theme = entity('empire')

export const toggleTheme = () => {
    theme.set((currentTheme) => (currentTheme === 'empire' ? 'rebellion' : 'empire'))
}



