
import stylex from "@stylexjs/stylex";
import Menu from "@/components/Menu";
import { Article } from "@/types/Article";
import { Suspense, useState, useEffect } from "react";
import axios, { AxiosResponse } from 'axios';
import { BackgroundImage } from "@/types/Image";
import ArticleSource from "./ArticleSource";


const styles = stylex.create({
    header:{
        display: "grid",
        width: "100%",
        gridTemplateColumns: "min-content min-content auto",
        columnGap: "1.25em",
        margin: ".5em"
    }
});

interface Props
{
    toggleAudio: (on:boolean) => void,
    audio: Boolean,
    toggleAutoScroll: (on:boolean) => void,
    autoScroll: Boolean,
    article:Article
}

function Header({toggleAudio ,audio, toggleAutoScroll, autoScroll, article}:Props)
{   
    const [backgroundImage, setBackgroundImage] = useState("");

    useEffect(() => {
        axios.get(`api/getImage.php?type=gif/${article.category}`).then(
            (res: AxiosResponse<BackgroundImage>) => setBackgroundImage(`${axios.defaults.baseURL}${res.data.url}`)
        );
        console.log(article.category);
    }, [article])

    return(
        <div {...stylex.props(styles.header)}>
            <Menu toggleAudio={toggleAudio} audio={audio} toggleAutoScroll={toggleAutoScroll} autoScroll={autoScroll} />
            <img src={backgroundImage} style={{width: "54px", height:"54px", border: "2px solid white"}}/>
            <Suspense>
                <ArticleSource article={article} />
            </Suspense>            
        </div>);
}

export default Header;