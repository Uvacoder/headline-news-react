import ArticleView from "@/components/ArticleView";
import { Article } from "@/types/Article";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";


function DetailedView()
{
    const [searchParams] = useSearchParams();
    const [article, setArticle] = useState<Article | null>(null);
    const [backgroundImage, setBackgroundImage] = useState("");

    useEffect(() => {
        Promise.all([
            axios.get("api/article.php", { params: { articleid: searchParams.get("id") }}),
            axios.get("api/getImage.php?type=details")
        ]).then((responses: Array<AxiosResponse>) => {
            setArticle(responses[0].data);
            setBackgroundImage(`${axios.defaults.baseURL}${responses[1].data.url}`);
        });
    }, []);
    
    if(!article || !backgroundImage) return <></>;
    
    return <ArticleView article={article} backgroundImage={backgroundImage} />;
}

export default DetailedView;