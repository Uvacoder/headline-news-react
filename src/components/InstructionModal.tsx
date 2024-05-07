import stylex from "@stylexjs/stylex";

import { useState } from "react";

import { IconHandClick } from "@tabler/icons-react";
import { Colors, Background } from "../styles/token.stylex";

const slideLeft = stylex.keyframes({
    '0%': {marginLeft: "90%"},
    '100%': {marginLeft: '-90%'}
});

const slideRight = stylex.keyframes({
    '0%': {marginLeft: "-90%"},
    '100%': {marginLeft: '90%'}
});

const slideDown = stylex.keyframes({
    '0%': {marginTop: "0%"},
    '100%': {marginTop: '60%'}
});

const slideUp = stylex.keyframes({
    '0%': {marginTop: "60%"},
    '100%': {marginTop: '0%'}
});

const styles = stylex.create({
    overlay:
    {
        position: "fixed",
        top: "0",
        left: "0",
        height: "100dvh",
        width: "100dvw",
        backgroundColor: Colors.overlay,
        display: {
            default: "none",
            '@media (max-width: 761px)': "block"
        }
    },
    modal:
    {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        backgroundColor: Background.primary,
        width: "80%",
        height: "50%",
        borderRadius: "10px",
        padding: "1rem",
        textAlign: "center",
        display: "grid",
        gridTemplateRows: "20% 60% 20%",
        gridTemplateColumns: "1fr",
    },
    slideLeft:
    {
        animationName: slideLeft,
        animationDuration: '1s',
        animationIterationCount: 'infinite',
        marginTop: "30%",
    },
    slideRight:
    {
        animationName: slideRight,
        animationDuration: '1s',
        animationIterationCount: 'infinite',
        marginTop: "30%",
    },
    slideDown:
    {
        animationName: slideDown,
        animationDuration: '1s',
        animationIterationCount: 'infinite',
    },
    slideUp:
    {
        animationName: slideUp,
        animationDuration: '1s',
        animationIterationCount: 'infinite',
    }
});

interface Props
{
    onClose: ()=> void
}

function InstructionModal({onClose}: Props)
{
    const [step, setStep] = useState<number>(0);

    function getStep(step:number)
    {
        switch(step)
        {
            case 0:
                return(
                    <>
                        <h3>Swipe Left for Loser and Lies</h3>
                        <div>
                            <IconHandClick size={48} {...stylex.props(styles.slideLeft)}/>
                        </div>
                    </>
                );

            case 1:
                return(
                    <>
                        <h3>Swipe Right for Rudeness and Wrong</h3>
                        <div>
                            <IconHandClick size={48} {...stylex.props(styles.slideRight)}/>
                        </div>
                    </>
                );

            case 2:
                return(
                    <>
                        <h3>Swipe Down to Go Back</h3>
                        <div>
                            <IconHandClick size={48} {...stylex.props(styles.slideDown)}/>
                        </div>
                    </>
                );

            case 3:
                return(
                    <>
                        <h3>Swipe Up for Next Headline</h3>
                        <div>
                            <IconHandClick size={48}  {...stylex.props(styles.slideUp)}/>
                        </div>
                    </>
                );
        }
    }

    const insStep = getStep(step);

    const onTap = ()=>
    {
        if(step + 1 >= 4)
        {
            onClose();
        }
        else
        {
            setStep(prev => prev + 1);
        }
    }

    return(
        <div {...stylex.props(styles.overlay)} onClick={onTap}>
            <div {...stylex.props(styles.modal)}>
                { insStep }
                <h4>Tap to continue</h4>
            </div>
        </div>
    )

}

export default InstructionModal;