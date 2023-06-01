import React, { useEffect, useState } from 'react'
import DarkModeIcon from '@mui/icons-material/DarkMode';

export default function ButtonDarkMode() {

    const [isCurrentDarkmode, setIsCurrentDarkmode] = useState(() => {
        const darkModeWasSet = localStorage.getItem("mode");
        if (darkModeWasSet == 'dark') return true;
        else return false;
    });

    useEffect(() => {
        const html = document.querySelector(".mainbody");
        if (isCurrentDarkmode) {
            html.classList.add("dark");
            localStorage.setItem("mode", "dark");
        } else {
            html.classList.remove("dark");
            localStorage.setItem("mode", "light");
        }
    }, [isCurrentDarkmode]);

    const handleDarkMode = () => {
        setIsCurrentDarkmode((prevState) => !prevState);
    };

    return <>
        <a href="#">
            <i><DarkModeIcon/></i>
            <span className="link-name">Dark Mode</span>
        </a>

        <div className="mode-toggle" onClick={handleDarkMode}>
            <span className="switch"></span>
        </div>
    </>
}
