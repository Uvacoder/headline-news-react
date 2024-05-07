import stylex from "@stylexjs/stylex";

import { Background } from "../styles/token.stylex";
import { IconMenu2 } from "@tabler/icons-react";
import { useState } from "react";
import MenuToggleItem from "./MenuToggleItem";
import { Link } from "react-router-dom";

const styles = stylex.create({
    menuButton: {
        margin: ".25rem",
        backgroundColor:{
            default: Background.primary,
            ":hover": Background.secondary
        }
    },
    menuButtonExpanded:{
        margin: ".25rem",
        backgroundColor:{
            default: Background.secondary,
        }
    },
    menuContainer:{
        position: "absolute",
        top: "0",
        left: "0",
        zIndex: "1",
        backgroundColor: Background.secondary,
        width: "100%",
        display: "grid",
        gridTemplateColumns: "min-content auto"
    }
});

interface Props
{
    toggleAudio: (on:boolean) => void,
    audio: Boolean,
    toggleAutoScroll: (on:boolean) => void,
    autoScroll: Boolean
}

function Menu({toggleAudio, audio, toggleAutoScroll, autoScroll}:Props)
{
    const [showMenu, setShowMenu] = useState<Boolean>(false);

    const onShowMenu = ()=>
    {
        setShowMenu(prev => !prev);
    }

    return(
        <>
            <div {...stylex.props(styles.menuButton)} onClick={onShowMenu}>
                <IconMenu2 size={"2.5rem"} />
            </div>
            {showMenu? 
            <div {...stylex.props(styles.menuContainer)}>
                <div {...stylex.props(styles.menuButtonExpanded)} onClick={onShowMenu}>
                    <IconMenu2 size={"2.5rem"} />
                </div>
                <div>
                    <MenuToggleItem heading="Audio" value={audio} onClick={()=>toggleAudio(!audio)} />
                    <MenuToggleItem heading="Auto Scroll" value={autoScroll} onClick={()=>toggleAutoScroll(!autoScroll)} />
                    <Link to="ContactUs">Contact Us</Link>
                </div>
            </div>
            : null }
        </>
    )
}

export default Menu;