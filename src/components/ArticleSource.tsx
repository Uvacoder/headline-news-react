import { Article } from "@/types/Article";
import stylex from "@stylexjs/stylex";

import { Colors } from "../styles/token.stylex";

const styles = stylex.create({
    container:{
        backgroundColor: Colors.secondary,
        // borderRadius: "10px",
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
    return(<div {...stylex.props(styles.container)} >{article.issueDate} <br/> {article.source}{article.subSources? <><br/>{article.subSources}</>: null }</div>);
}

export default ArticleSource;