import { Suspense, useEffect, useRef, useState, TouchEvent } from "react";
import { Article } from "@/types/Article";
import useFetchApi from "@/hooks/useFetchApi";
import ArticleFetchParams from "@/types/ArticleFetchParams";
import Main, { SwipeDirection } from "@/components/Main";
import LoadingFallback from "@/components/LoadingFallback";
import { BackgroundImage } from "@/types/Image";

interface TouchPoint
{
    x:number,
    y:number
}

interface Props
{
    addToHistory: (id:number) => void,
    popFromHistory: () => number,
    autoScroll: boolean,
    setAutoscroll: (id:boolean) => void
}

function MainView({ addToHistory, popFromHistory, autoScroll, setAutoscroll } : Props)
{
    const [fetchParams, setFetchParams] = useState<ArticleFetchParams>({latest: true});
    const article = useFetchApi<Article>("api/article.php", fetchParams);
    const backgroundImage = useFetchApi<BackgroundImage>("api/getImage.php?type=main");
    
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
        if(article.getStatus() !== "pending")
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
                setupTimer();
                setFetchParams({modifier: autoScrolledCount.current});
                return;            
            case SwipeDirection.LEFT:
                setupTimer();
                autoScrolledCount.current++;
                setFetchParams({type: "liar", modifier: autoScrolledCount.current});
                return;

            case SwipeDirection.RIGHT:
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

    return (
        <Suspense fallback={<LoadingFallback />} >
            <div onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} style={{ width: "100vw", height: "100%"}}>
                <Main articleData={article} backgroundImageData={backgroundImage} addToHistory={addToHistory} onSetAutoscroll={(val)=>{setAutoscroll(val)}} autoScroll={autoScroll} onSwipe={doSwipe} setupTimer={setupTimer}/>
            </div>
        </Suspense>
    );
}

export default MainView;