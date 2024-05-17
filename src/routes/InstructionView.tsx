import stylex from "@stylexjs/stylex";
import axios, { AxiosResponse } from 'axios';

import { useNavigate } from "react-router-dom";
import { BackgroundImage } from "@/types/Image";
import { useEffect, useState } from "react";
import UpArrow from "../assets/uparrow.svg";
import DownArrow from "../assets/downarrow.svg";
import LeftArrow from "../assets/leftarrow.svg";
import RightArrow from "../assets/rightarrow.svg";
import ImageContainer from "@/components/ImageContainer";

const styles = stylex.create({
    mainContainer:{
        display: "grid",
        alignItems: "center",
        justifyItems: "center",
        gridTemplateRows: "minmax(min-content, .3fr) minmax(min-content, .6fr) minmax(min-content, .1fr)",
        gridTemplateColumns: ".1fr .8fr .1fr"
     },
    content: {
        gridColumnStart: "2",
        gridRowStart: "2",
        display: "grid",
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyItems: "center",
        textAlign: "center",
        rowGap: "0",
        fontSize: "1.5em",
        marginTop: "1.5em",
        color: "white",
        textShadow: "2px 2px 4px black"
    },
});

function InstructionView()
{
    const navigator = useNavigate();
    const [backgroundImage, setBackgroundImage] = useState("");

    useEffect(() => {
        axios.get("api/getImage.php?type=instruction").then(
            (res: AxiosResponse<BackgroundImage>) => setBackgroundImage(`${axios.defaults.baseURL}${res.data.url}`)
        );
        localStorage.setItem("visited", "true");
    }, [])

    const onToMainView = ()=>
    {
        navigator("/view");
    }

    return (<ImageContainer {...stylex.props(styles.mainContainer)} backgroundImage={backgroundImage} onClick={onToMainView}>
        <div {...stylex.props(styles.content)}>
            <img src={UpArrow} width={"64px"}/>
            <p>Explore all the reasons why Donald Trump and his allies are the wrong choice for the USA and for you in 2024</p>
            <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                <img src={LeftArrow} width={"64px"}/>
                <img src={RightArrow} width={"64px"}/>
            </div>
            
            <p>Support a better candidate for 2024 and ask your politicians to get back to work</p>
            <img src={DownArrow} width={"64px"}/>
            <h5>Click to Continue</h5>
        </div>
    </ImageContainer>);
}

export default InstructionView;