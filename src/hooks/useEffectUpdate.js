import { useEffect, useRef } from "react"


export const useEffectUpdate = (callBack, dependencies = [], props = {}) => {

    const isFirstRender = useRef(true)

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }
        callBack({ ...props })
    }, dependencies)
}