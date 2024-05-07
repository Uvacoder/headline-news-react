import stylex from "@stylexjs/stylex";
import { ReactNode } from "react";

const styles = stylex.create({
MobileNavHintElement:
{
    display:
    {
        default: "static",
        '@media (min-width: 761px)': "none"
    }
}});

interface Props
{
    children:ReactNode
}

function MobileNavHint({children}:Props)
{
    return(<div  {...stylex.props(styles.MobileNavHintElement)}>{children}</div>);
}

export default MobileNavHint;