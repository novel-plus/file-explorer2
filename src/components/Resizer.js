import { useEffect, useRef, useState } from "react";
import "./style.css";

function Resizer({sidebarRef, setWidth}) {
    const resizerRef = useRef(null);

    const resize = (event) => {
        const newSize = event.clientX - sidebarRef.current.getBoundingClientRect().left;
        setWidth(newSize);
    }
    useEffect(() => {
        const resizeHandler = () => {
            document.addEventListener("mousemove", resize, false);
            const handleMouseup = () => {
                document.removeEventListener("mousemove", resize, false);
                document.removeEventListener("mouseup", handleMouseup);
            }
            document.addEventListener("mouseup", handleMouseup, false)
        };
        resizerRef.current.addEventListener("mousedown", resizeHandler);
        return () => resizerRef.current.removeEventListener("mousedown", resizeHandler);
    }, [])
    return <div className="component-resizer" ref={resizerRef}></div>
}

export default Resizer;