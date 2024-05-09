import stylex from "@stylexjs/stylex";

import {Colors} from "../styles/token.stylex";
import { ReactNode } from "react";

const styles = stylex.create({
    TextSection:
    {
        border: "2px solid black",
        borderRadius: "10px",
        padding: ".4em",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    text:{
        color: "white",
        textAlign: "center",
        fontSize: "1.25em",
        
        width: "100%",
        maxHeight: "90%",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
        textShadow: "2px 2px 4px black",
    },
});

interface Props
{
    children:ReactNode,
    backgroundColor:string,
    lines:number
}

function TextSection({children, backgroundColor, lines}: Props)
{
    return(
        <div {...stylex.props(styles.TextSection)} style={{ backgroundColor }}>
            <div {...stylex.props(styles.text)} style={{ WebkitLineClamp: lines }}>{children}</div>
        </div>
    )
}

export default TextSection;