import { Article } from "@/types/Article";
import stylex from "@stylexjs/stylex";

import InfoIcon from "../assets/info.svg";

const styles = stylex.create({
    container:{
        display: "flex",
        alignItems: "flex-start",
        backgroundColor: "#f0f0f060",
        width: "100%",
        color: "white",
        textShadow: "2px 2px 4px black",
        border: "2px solid white",
        padding: ".25em",
        overflow: "hidden",
    }
});

interface Props
{
    article:Article
}

function ArticleSource({article}:Props)
{
    const dateString = new Date(article.issueDate).toDateString().slice(4).replace(/(\d) /g, (_, digit) => `${digit}, `);

    return (
        <div {...stylex.props(styles.container)}>
            <img src={InfoIcon} style={{ paddingTop: "0.25em" }} /> 
            <table>
                <tbody>
                    <tr>
                        <td style={{ width: "120px"}}>{dateString}</td>
                        <td>Whopper</td>
                    </tr>
                    <tr>
                        <td>{article.source}</td>
                        <td style={{ textTransform: "capitalize"}}>{article.category}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default ArticleSource;