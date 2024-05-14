import stylex from "@stylexjs/stylex";
import TextSection from "./TextSection";
import { Article } from "@/types/Article";
import { FetchData } from "@/types/FetchData";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from 'axios';
import { BackgroundImage } from "@/types/Image";
import GoBack from "../assets/goback.svg";

const styles = stylex.create({
    mainContainer: {
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        height: "100dvh",
        width: "100dvw",
        overflow: "auto"
    },
    overlay: {
        position: "absolute",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        backgroundColor: "black",
        opacity: "0.6",
        zIndex: "1"
    },
    container: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "1em",
        margin: "1em",
        zIndex: "2",
    },
    button: {
        display: "flex",
        alignItems: "center",
        color: "white",
        textShadow: "2px 2px 4px black",
        gap: "0.5em"
    }
});

interface Props
{
    articleData:FetchData<Article>
}


function ArticleView({articleData}:Props)
{
    const navigate = useNavigate();
    const article = articleData.read();
    
    const [backgroundImage, setBackgroundImage] = useState("");

    useEffect(() => {
        axios.get("api/getImage.php?type=details").then(
            (res: AxiosResponse<BackgroundImage>) => setBackgroundImage(`url('${axios.defaults.baseURL}${res.data.url}')`)
        );
    }, [])


    const onClick = ()=>
    {
        navigate("/view");
    }

    const getHeader = ()=>
    {
        return(
            <>
                {article.issueDate !== ""? <>{article.issueDate}<br/></>:null}
                {article.source !== ""? <>{article.source}<br/></>:null}
                {article.author !== ""? <>{article.author}<br/></>:null}
                {article.refrenceUrl !== ""? <><a href={article.refrenceUrl}>To Source</a><br/></>:null}
            </>
        );
    }

    const header = getHeader();

    return(
        <div onClick={onClick} {...stylex.props(styles.mainContainer)} style={{backgroundImage}}>
            <div {...stylex.props(styles.overlay)}></div>
            <div {...stylex.props(styles.container)} >
                <div {...stylex.props(styles.button)}>
                    <img src={GoBack} /> Go Back
                </div>
                <TextSection backgroundColor="#40404040">{header}</TextSection>
                {article.source != ""? <TextSection backgroundColor="#f0f0f060">{article.shortHeadline}</TextSection> : null }
                {article.completeArticle != "" ? <TextSection backgroundColor="#f0f0f060">{article.completeArticle}</TextSection> : null }
                {article.rebuttal != ""? <TextSection backgroundColor="#80f08060">{article.rebuttal}</TextSection>  : null}
                <div {...stylex.props(styles.button)} style={{ justifyContent: "flex-end"}}>
                    <img src={GoBack} /> Go Back
                </div>
            </div>
        </div>
    );    
}

export default ArticleView;