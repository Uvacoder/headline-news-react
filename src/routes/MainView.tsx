import { useEffect, useRef, useState, TouchEvent, AriaAttributes } from "react";
import { Article } from "@/types/Article";
import ArticleFetchParams from "@/types/ArticleFetchParams";
import Main, { SwipeDirection } from "@/components/Main";
import LoadingFallback from "@/components/LoadingFallback";
import { BackgroundImage } from "@/types/Image";
import axios, { AxiosResponse } from "axios";

interface TouchPoint
{
    x:number,
    y:number
}

interface Props
{
    addToHistory: (article:Article | null) => void,
    popFromHistory: () => number,
    autoScroll: boolean,
    setAutoscroll: (id:boolean) => void,
    showMenu: boolean,
    setShowMenu: (id:boolean) => void
}

function MainView({showMenu, setShowMenu, addToHistory, popFromHistory, autoScroll, setAutoscroll } : Props)
{
    const [fetchParams, setFetchParams] = useState<ArticleFetchParams>({latest: true});
    const [isLoading, setLoading] = useState<boolean>(false);
    const [article, setArticle] = useState<Article | null>(null);
    const [backgroundImage, setBackgroundImage] = useState<string>('');
    const [gifImage, setGifImage] = useState<string>('');

    const setData = (_article:Article, _backgroundImage: string, _gifImage: string) => {
        setArticle(_article);
        setBackgroundImage(_backgroundImage);
        setGifImage(_gifImage);
        setLoading(false);
    }

    useEffect(() => {
        if(!isLoading) {
            setLoading(true);
            Promise.all([
                axios.get("api/article.php", { params: fetchParams}),
                axios.get("api/getImage.php?type=main")
            ]).then((responses: Array<AxiosResponse>) => {
                const article_data = responses[0].data;
                axios.get(`api/getImage.php?type=gif/${article_data.category}`).then(
                    (res: AxiosResponse<BackgroundImage>) => {        
                        const img = new Image();
                        img.src = `${axios.defaults.baseURL}${responses[1].data.url}`;
                        const gif = new Image();
                        gif.src = `${axios.defaults.baseURL}${res.data.url}`;
                             
                        let ready = false;
                        img.onload = () => {
                            if(ready) setData(article_data, img.src, gif.src);
                            ready = true;
                        }
                        gif.onload = () => {
                            if(ready) setData(article_data, img.src, gif.src);
                            ready = true;
                        }
                    }
                );
            });
        }        
    }, [fetchParams]);
    
    const timerRef = useRef<number>();
    const autoScrolledCount = useRef<number>(0);
    const startPoint = useRef<TouchPoint | null>(null);

    const setupTimer = () => {
        if(autoScroll)
        {
            if(timerRef.current !== null || timerRef.current !== undefined)
            {
                clearInterval(timerRef.current);
            }

            timerRef.current = window.setInterval(()=>{
                addToHistory(article);
                autoScrolledCount.current++;
                setFetchParams({modifier: autoScrolledCount.current});
            }, 15000, article);
        }
        else
        {
            clearInterval(timerRef.current);
        }
    };

    useEffect(setupTimer, [autoScroll]);

    const onTouchStart = (param:TouchEvent<HTMLDivElement>)=>
    {
        if(!isLoading)
        {
            if(param.changedTouches.length !== 0)
            {
                startPoint.current = {x: param.changedTouches[0].clientX, y: param.changedTouches[0].clientY};
                return;
            }
        }

        startPoint.current = null;
    }

    const angleToDirection = (angle:number)=>
    {
        let degrees = angle * (180/Math.PI);
        if(degrees < 0) degrees += 360;
        if(degrees >= 337.5 || degrees <= 22.5) return SwipeDirection.LEFT;
        if(degrees >= 22.5 && degrees <= 67.5) return SwipeDirection.LEFT_UP;
        if(degrees >= 67.5 && degrees <= 112.5) return SwipeDirection.UP;
        if(degrees >= 112.5 && degrees <= 157.5) return SwipeDirection.RIGHT_UP;
        if(degrees >= 157.5 && degrees <= 202.5) return SwipeDirection.RIGHT;
        if(degrees >= 202.5 && degrees <= 247.5) return SwipeDirection.RIGHT_DOWN;
        if(degrees >= 247.5 && degrees <= 292.5) return SwipeDirection.DOWN;
        if(degrees >= 292.5 && degrees <= 337.5) return SwipeDirection.LEFT_DOWN;

        return SwipeDirection.UNKNOWN;
    }

    const onTouchEnd = (param:TouchEvent<HTMLDivElement>)=>
    {
        if(startPoint.current !== null && param.changedTouches.length !== 0)
        {
            const endPoint:TouchPoint = {x: param.changedTouches[0].clientX, y: param.changedTouches[0].clientY};

            let deltaX = (startPoint.current.x - endPoint.x);
            let deltaY = (startPoint.current.y - endPoint.y);

            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

            if(distance >= 3)
            {
                const radians = Math.atan2(deltaY, deltaX);
                const dir = angleToDirection(radians)
                doSwipe(dir);
            }
        }
    }

    const doSwipe = (dir: SwipeDirection) => {
        switch(dir)
        {
            case SwipeDirection.UP:
                addToHistory(article);
                setupTimer();
                setFetchParams({modifier: autoScrolledCount.current});
                return;            
            case SwipeDirection.LEFT:
                addToHistory(article);
                setupTimer();
                autoScrolledCount.current++;
                setFetchParams({type: "liar", modifier: autoScrolledCount.current});
                return;

            case SwipeDirection.RIGHT:
                addToHistory(article);
                setupTimer();
                autoScrolledCount.current++;
                setFetchParams({type: "rude", modifier: autoScrolledCount.current});
                return;

            case SwipeDirection.DOWN:
                setupTimer();
                const lastViewed = popFromHistory();
                if(lastViewed)
                {
                    setFetchParams({articleid: lastViewed });
                }
                return;
        }
    }

    if(!(article && backgroundImage && gifImage)) return <LoadingFallback />;

    return (
        <div onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} style={{ width: "100vw", height: "100%"}}>
            <Main
                article={article}
                backgroundImage={backgroundImage}
                gifImage={gifImage}
                onSetAutoscroll={setAutoscroll}
                autoScroll={autoScroll}
                addToHistory={addToHistory}
                onSwipe={doSwipe}
                setupTimer={setupTimer}
                showMenu={showMenu}
                setShowMenu={setShowMenu}
            />
            { isLoading && <LoadingFallback /> }
        </div>
    );
}

export default MainView;