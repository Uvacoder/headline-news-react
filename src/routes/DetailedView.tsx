import ArticleView from "@/components/ArticleView";
import LoadingFallback from "@/components/LoadingFallback";
import useFetchApi from "@/hooks/useFetchApi";
import { Article } from "@/types/Article";
import { Suspense } from "react";
import { useSearchParams } from "react-router-dom";


function DetailedView()
{
    const [searchParams] = useSearchParams();
    const articleid = searchParams.get("id");
    const article = useFetchApi<Article>("api/article.php", {articleid: articleid});
    return(<Suspense fallback={<LoadingFallback />}><ArticleView articleData={article} /></Suspense>);
}

export default DetailedView;