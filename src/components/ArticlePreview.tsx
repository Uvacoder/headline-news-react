import stylex from "@stylexjs/stylex";

import { Article } from "@/types/Article";
import TextSection from "./TextSection";

const styles = stylex.create({
    container:
    {
        display: "grid",
        height: "100%",
        gridTemplateColumns: ".9fr",
        gridTemplateRows: ".2fr .4fr .4fr",
        justifyContent: "center",
        rowGap: "1rem",
    },
    rebuttalessContainer:
    {
        display: "grid",
        height: "100%",
        gridTemplateColumns: ".9fr",
        gridTemplateRows: ".2fr .8fr",
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
            <TextSection backgroundColor="#40404040" lines={2}>{article.shortHeadline}</TextSection>
            <TextSection backgroundColor="#f0f0f060" lines={article.rebuttal ? 4 : 7}>{article.summary}</TextSection>
            {article.rebuttal? <TextSection backgroundColor="#80f08060" lines={4}>{article.rebuttal}</TextSection>: null}
        </div>
    );
}

export default ArticlePreview;