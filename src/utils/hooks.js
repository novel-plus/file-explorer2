import { useEffect, useState } from "react"

function useEvent(eventType, initialState, listener) {
    const [state, setState] = useState(initialState);
    useEffect(() => {
        const handleEvent = (event) => listener(event.detail);
        document.addEventListener(eventType, handleEvent);
        return () => document.removeEventListener(eventType, handleEvent);
    })
    return [state, setState];
}

export { useEvent } 