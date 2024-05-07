import stylex from "@stylexjs/stylex";
import TextSection from "./TextSection";
import { Article } from "@/types/Article";
import { FetchData } from "@/types/FetchData";
import { useNavigate } from "react-router-dom";


const styles = stylex.create({
    container:
    {
        display: "flex",
        flexDirection: "column",
        gap: "1em",
        margin: "1em"
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
            <div {...stylex.props(styles.container)}>
                <button onClick={onClick}>Go Back</button>
                <TextSection>{header}</TextSection>
                {article.source != ""? <TextSection>{article.shortHeadline}</TextSection> : null }
                <TextSection>{article.completeArticle}</TextSection>
                {article.rebuttal != ""? <TextSection>{article.rebuttal}</TextSection>  : null}
            </div>);    
}

export default ArticleView;