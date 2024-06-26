/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react"
//Prevent  double rendering
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