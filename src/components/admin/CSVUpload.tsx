import stylex from "@stylexjs/stylex";

import { Colors } from "../../styles/token.stylex";
import { useRef, useState } from "react";
import Button from "../Button";
import LoadingFallback from "../LoadingFallback";
import usePostApi from "@/hooks/usePostApi";

const styles = stylex.create({
    container:{
        width: "inherit",
        height: "inherit",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    modal:
    {
        backgroundColor: Colors.secondaryUi,
        borderRadius: ".5em",
        border: "solid 1px",
        borderColor: Colors.primaryUi,
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
    form:{
        padding: "1em",
        flexDirection: "column",
    },
    formUiElemet:
    {
        display: "flex",
        marginTop: ".5em",
    },
    processButton:{
        marginLeft: "auto"
    },
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
        appearance: "none",
    }
})

function CSVUpload()
{
    const [isProcessing, setIsProcessing] = useState<boolean>(false);

    const fileRef = useRef<HTMLInputElement>(null);
    const appenedRef = useRef<HTMLInputElement>(null);

    const processCSV = usePostApi("api/processCsv.php");

    const onProcess = async ()=>
    {
        if(fileRef.current?.files !== undefined && fileRef.current?.files !== null && fileRef.current?.files.length > 0 && appenedRef.current !== null)
        {
            setIsProcessing(true);
            
            const formData = new FormData();
            formData.append("userfile", fileRef.current.files[0]);
            formData.append("append", appenedRef.current?.checked.toString());
            const result = await processCSV(formData);
            console.log(result);
            setIsProcessing(false);
        }
    }

    return(<div {...stylex.props(styles.container)}>
        {isProcessing? <LoadingFallback /> :
        <div {...stylex.props(styles.modal)}>
            <div {...stylex.props(styles.modalHeader)}>CSV Processing</div>
            <form {...stylex.props(styles.form)} onSubmit={onProcess}>
                <div>
                    <input type="hidden" name="MAX_FILE_SIZE" value="30000" />
                    <input ref={fileRef} name="userfile" type="file" {...stylex.props(styles.Button)} />
                </div>
                <div {...stylex.props(styles.formUiElemet)} ><input ref={appenedRef} type="checkbox" name="append" defaultChecked /><b>Appened to Database</b></div>
                <Button disabled={isProcessing} isSubmit style={styles.processButton}>Process</Button>
            </form>
        </div>}
    </div>);
}

export default CSVUpload;