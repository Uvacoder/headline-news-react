import stylex from "@stylexjs/stylex";
import TextSection from "./TextSection";
import { Article } from "@/types/Article";
import { FetchData } from "@/types/FetchData";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from 'axios';
import { BackgroundImage } from "@/types/Image";
import GoBack from "../assets/goback.svg";
import ImageContainer from "./ImageContainer";

const styles = stylex.create({
    mainContainer: {
        overflow: "auto"
    },
    overlay: {
        position: "fixed",
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
        zIndex: "2"
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
            (res: AxiosResponse<BackgroundImage>) => setBackgroundImage(`${axios.defaults.baseURL}${res.data.url}`)
        );
    }, [])


    const onClick = ()=>
    {
        navigate(-1);
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
        <ImageContainer onClick={onClick} {...stylex.props(styles.mainContainer)} backgroundImage={backgroundImage}>
            <div {...stylex.props(styles.overlay)}></div>
            <div {...stylex.props(styles.container)} >
                <div {...stylex.props(styles.button)}>
                    <img src={GoBack} /> Go Back
                </div>
                <TextSection heading="Source">{header}</TextSection>
                {article.source != ""? <TextSection heading="Headline">{article.shortHeadline}</TextSection> : null }
                {article.completeArticle != "" ? <TextSection heading="Full Article">{article.completeArticle}</TextSection> : null }
                {article.rebuttal != ""? <TextSection heading="Rebuttal">{article.rebuttal}</TextSection>  : null}
                <div {...stylex.props(styles.button)} style={{ justifyContent: "flex-end"}}>
                    <img src={GoBack} /> Go Back
                </div>
            </div>
        </ImageContainer>
    );    
}

export default ArticleView;