import stylex, { StyleXStyles } from "@stylexjs/stylex"

import { Colors } from "../styles/token.stylex"
import { ReactNode } from "react"

const styles = stylex.create({
    Button: {
        backgroundColor:{
            default: Colors.primaryUi,
            ":hover": Colors.secondary
        },
        borderColor:{ 
            default: Colors.primaryUi,
            ":hover": Colors.secondary
        },
        color:{ 
            default:"white",
            ":hover": "black"
        },
        border: "solid 1px",
        padding: "8px 25px",
        fontWeight: "bold",
        display: "flex",
        borderRadius: "5px",
        cursor: "pointer",
        margin: ".5em",
    }
})

interface Props
{
    children:ReactNode,
    style?:StyleXStyles,
    isSubmit?:boolean,
    disabled?:boolean,
    onClick?: ()=> void
}

function Button({children, style, isSubmit=false, disabled=false, onClick}:Props)
{
    const buttonType = isSubmit? "submit" : "button";
    return(<button disabled={disabled} type={buttonType} {...stylex.props(styles.Button, style)} onClick={onClick} >{children}</button>)
}

export default Button;