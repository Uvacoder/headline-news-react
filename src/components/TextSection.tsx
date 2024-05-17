import stylex from "@stylexjs/stylex";
import { ReactNode } from "react";

const styles = stylex.create({
    container: {
        position: "relative",
        alignItems: "center",
        textShadow: "2px 2px 4px black",
        color: "white",
        height: "100%",
        width: "100%",
    },
    heading: {
        position: "absolute",
        top: "50%",
        left: "0.25em",
        fontSize: "1em",
        fontWeight: "bold",
        whiteSpace: "nowrap",
        transform: "rotate(-90deg)",
        transformOrigin: "center center",
        translate: "-50% -50%"
    },
    TextSection:
    {
        border: "2px solid black",
        borderRadius: "10px",
        padding: ".4em",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        backgroundColor: "#f0f0f060",
        minHeight: "100px",
    },
    text:{
        textAlign: "center",
        fontSize: "1.25em",
        
        width: "100%",
        maxHeight: "90%",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
        wordBreak: "break-word"
    },
});

interface Props
{
    children:ReactNode,
    lines?:number,
    heading?:string
}

function TextSection({children, lines, heading}: Props)
{
    return(
        <div { ...stylex.props(styles.container)}>
            {heading ? <div { ...stylex.props(styles.heading)}>{ heading }</div> : null}
            <div {...stylex.props(styles.TextSection)} style={{ marginLeft: (heading ? "1em" : "0") }}>
                <div {...stylex.props(styles.text)} style={ lines ? { WebkitLineClamp: lines } : {} }>{children}</div>
            </div>
        </div>
        
    )
}

export default TextSection;