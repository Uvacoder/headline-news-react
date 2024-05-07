import stylex from "@stylexjs/stylex";

import { IconLoader2 } from "@tabler/icons-react";

import { Colors } from "../styles/token.stylex";

const rotate = stylex.keyframes({
    '0%': {transform: "rotate(0)"},
    '100%': {transform: 'rotate(360deg)'}
});

const styles = stylex.create({
    loader:{
        backgroundColor: Colors.secondary,
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    rotate:{
        animationName: rotate,
        animationDuration: '1s',
        animationIterationCount: 'infinite',
        animationTimingFunction: "linear"
    }
    
});

function LoadingFallback()
{
    return(<div {...stylex.props(styles.loader)}><IconLoader2 {...stylex.props(styles.rotate)} size={64} /></div>);
}

export default LoadingFallback;