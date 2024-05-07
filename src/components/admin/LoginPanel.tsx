import stylex from "@stylexjs/stylex";

import { Colors } from "../../styles/token.stylex";
import Button from "@/components/Button";

const styles = stylex.create({
    overlay:{
        backgroundColor: Colors.secondary,
        position: "fixed",
        top: "0",
        left: "0",
        display: "flex",
        height: "100dvh",
        width: "100dvw",
        alignItems: "center",
        justifyContent: "center"
    },
    modal:
    {
        backgroundColor: Colors.primary,
        borderRadius: ".5em",
        border: "1px solid",
        borderColor: Colors.primaryUi
    },
    modalHeader:
    {
        backgroundColor: Colors.primaryUi,
        padding: ".5em",
        borderTopLeftRadius: ".5em",
        borderTopRightRadius: ".5em",
        color: "white",
        marginBottom: ".5em"
    },
    modalContent:
    {
        padding: ".5em"
    },
    formUiElement:
    {
        display: "grid",
        gridTemplateColumns: "auto auto",
        padding: ".25em",
        textAlign: "right",
        columnGap: ".25em",
        alignItems: "center",
        fontWeight: "bold"
    },
    input:{
        padding: "8px 25px",
        margin: "4px",
        boxSizing: "border-box",
        fontSize: "1em",
        border: "1px solid",
        borderColor: Colors.primaryUi,
        outline: "none"
    },
    signInButton:
    {
        marginLeft: "auto"
    }
});

interface Props
{
    authed:any,
    onSubmit: (user:string, password:string) => void
}

interface FormElements extends HTMLFormControlsCollection
{
    username:HTMLInputElement,
    password:HTMLInputElement
}

function LoginPanel({authed, onSubmit}: Props)
{
   
    const onSignin = (event:React.SyntheticEvent<HTMLFormElement>) =>
    {
        event.preventDefault();
        const formData = event.currentTarget.elements as FormElements;
        onSubmit(formData.username.value, formData.password.value);
    }

    if(authed.read().loggedIn === true)
    {
        return null;
    }

    return(
        <div {...stylex.props(styles.overlay)}>
            <div {...stylex.props(styles.modal)}>
                <div {...stylex.props(styles.modalHeader)}>Admin Area</div>
                <div {...stylex.props(styles.modalContent)}>
                    <form onSubmit={onSignin} method="POST" >
                        <div {...stylex.props(styles.formUiElement)}>User: <input required type="text" {...stylex.props(styles.input)} name="username"/></div>
                        <div {...stylex.props(styles.formUiElement)}>Pass: <input required type="password" {...stylex.props(styles.input)} name="password"/></div>
                        <Button style={styles.signInButton} isSubmit >Sign In</Button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginPanel;