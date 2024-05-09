import { Article } from "@/types/Article";
import stylex from "@stylexjs/stylex";

import InfoIcon from "../assets/info.svg";

const styles = stylex.create({
    container:{
        backgroundColor: "transparent",
        color: "white",
        textShadow: "2px 2px 4px black",
        border: "2px solid white",
        padding: ".5em",
        overflow: "hidden",
        marginRight: "1em",
        marginBottom: ".5em"
    }
});

interface Props
{
    article:Article
}

function ArticleSource({article}:Props)
{
    return (
        <div {...stylex.props(styles.container)} >{article.issueDate} <br/> {article.source} &nbsp;
            <img src={InfoIcon}/>
        </div>
    );
}

export default ArticleSource;