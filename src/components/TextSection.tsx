import stylex from "@stylexjs/stylex";
import { ReactNode } from "react";
import "../components/Link.css";

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
        left: "0",
        fontSize: "1.2em",
        whiteSpace: "nowrap",
        transform: "rotate(-90deg)",
        transformOrigin: "top left",
        translate: "0 150%"
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
    },
});

interface Props
{
    children:ReactNode,
    backgroundColor:string,
    lines?:number,
    heading?:string
}

function TextSection({children, backgroundColor, lines, heading}: Props)
{
    return(
        <div { ...stylex.props(styles.container)}>
            {heading ? <div { ...stylex.props(styles.heading)}>{ heading }</div> : null}
            <div {...stylex.props(styles.TextSection)} style={{ backgroundColor, marginLeft: (heading ? "2em" : "0") }}>
                <div {...stylex.props(styles.text)} style={ lines ? { WebkitLineClamp: lines } : {} }>{children}</div>
            </div>
        </div>
        
    )
}

export default TextSection;