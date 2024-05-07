
import stylex from "@stylexjs/stylex";
import Menu from "@/components/Menu";
import { Article } from "@/types/Article";
import { Suspense } from "react";
import ArticleSource from "./ArticleSource";


const styles = stylex.create({
    header:{
        display: "grid",
        gridTemplateColumns: "min-content min-content auto",
        columnGap: ".5em",
        margin: ".25em"
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
    return(
        <div {...stylex.props(styles.header)}>
            <Menu toggleAudio={toggleAudio} audio={audio} toggleAutoScroll={toggleAutoScroll} autoScroll={autoScroll} />
            Header
            <Suspense>
                <ArticleSource article={article} />
            </Suspense>            
        </div>);
}

export default Header;