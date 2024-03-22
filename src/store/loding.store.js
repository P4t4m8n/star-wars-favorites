import { entity } from "simpler-state"

export const loading = entity(true)

export const toggleLoading = () => {
    loading.set(value => !value)
}