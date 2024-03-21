import { useState } from "react"


export const useFlip = () => {

    const [flip, setFlip] = useState(false)

    const toggleFlip = (ev) => {
        console.log("ev:", ev)
        ev.stopPropagation()
        ev.preventDefault()
        setFlip(!flip)
    }

    return [flip, toggleFlip]
}