import stylex from "@stylexjs/stylex";

import { Article } from "@/types/Article";
import TextSection from "./TextSection";

const styles = stylex.create({
    container:
    {
        display: "grid",
        height: "100%",
        gridTemplateColumns: ".9fr",
        gridTemplateRows: ".2fr .4fr .4fr 1rem",
        justifyContent: "center",
        rowGap: "1rem",
    },
    rebuttalessContainer:
    {
        display: "grid",
        height: "100%",
        gridTemplateColumns: ".9fr",
        gridTemplateRows: ".2fr .8fr .5rem",
        justifyContent: "center",
        rowGap: "1rem",
    }
});

interface Props
{
    article:Article
}

function ArticlePreview({article}:Props)
{
    const containerStyle = article.rebuttal? styles.container : styles.rebuttalessContainer;
    return(
        
            <div {...stylex.props(containerStyle)}>
                <TextSection backgroundColor="#40404040" lines={3}>{article.shortHeadline}</TextSection>
                <TextSection backgroundColor="#f0f0f060" lines={article.rebuttal ? 5 : 12}>{article.summary}</TextSection>
                {article.rebuttal? <TextSection backgroundColor="#80f08060" lines={7}>{article.rebuttal}</TextSection>: null}
            </div>
    );
}

export default ArticlePreview;