import stylex from "@stylexjs/stylex";

import {Colors} from "../styles/token.stylex";
import { ReactNode } from "react";

const styles = stylex.create({
    TextSection:
    {
        backgroundColor: Colors.secondary,
        borderRadius: "10px",
        padding: ".5em",
        overflow: "hidden",
        textAlign: "center"
    },
    text:{
        margin: "0",
        fontSize: "1.25em",
        overflow: "hidden",
    },
    truncate:
    {
        textOverflow: "ellipsis",
        WebkitLineClamp: "4",
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
    }
});

interface Props
{
    children:ReactNode,
    truncate?:boolean
}

function TextSection({children, truncate=false}: Props)
{
    const opstyle = truncate? styles.truncate: null;

    return(
        <div {...stylex.props(styles.TextSection)}>
            <div {...stylex.props(styles.text, opstyle)}>{children}</div>
        </div>
    )
}

export default TextSection;