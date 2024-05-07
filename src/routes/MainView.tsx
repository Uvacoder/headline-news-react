import { Suspense, useEffect, useRef, useState, TouchEvent } from "react";
import { Article } from "@/types/Article";
import useFetchApi from "@/hooks/useFetchApi";
import ArticleFetchParams from "@/types/ArticleFetchParams";
import Main from "@/components/Main";
import LoadingFallback from "@/components/LoadingFallback";

interface TouchPoint
{
    x:number,
    y:number
}

export enum SwipeDirection
{
    LEFT = "left",
    LEFT_UP = "left up",
    UP = "up",
    RIGHT_UP = "right up",
    RIGHT = "right",
    RIGHT_DOWN = "right down",
    DOWN = "down",
    LEFT_DOWN = "left down",
    UNKNOWN = "error"
}

interface Props{
    onInstructionsViewed: ()=> void,
    viewInstructions:boolean
}

function MainView({onInstructionsViewed, viewInstructions }:Props)
{
    const [autoScroll, setAutoscroll] = useState<boolean>(true);
    const [fetchParams, setFetchParams] = useState<ArticleFetchParams>({latest: true});
    const article = useFetchApi<Article>("api/article.php", fetchParams);
    
    const timerRef = useRef<number>();
    const autoScrolledCount = useRef<number>(0);
    const articleHistory = useRef<number[]>([]);
    const startPoint = useRef<TouchPoint | null>(null);

    useEffect(()=>{

        if(autoScroll)
        {
            if(timerRef.current !== null || timerRef.current !== undefined)
            {
                clearInterval(timerRef.current);
            }

            timerRef.current = window.setInterval(()=>{
                autoScrolledCount.current++;
                setFetchParams({modifier: autoScrolledCount.current});
            }, 9000, article);
            
        }
        else
        {
            clearInterval(timerRef.current);
        }

    },[autoScroll]);

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
                switch(dir)
                {
                    case SwipeDirection.UP:
                        setAutoscroll(false);
                        setFetchParams({modifier: autoScrolledCount.current});
                        return;
                    
                    case SwipeDirection.LEFT:
                        setAutoscroll(false);
                        autoScrolledCount.current++;
                        setFetchParams({type: "liar", modifier: autoScrolledCount.current});
                        return;

                    case SwipeDirection.RIGHT:
                        setAutoscroll(false);
                        autoScrolledCount.current++;
                        setFetchParams({type: "rude", modifier: autoScrolledCount.current});
                        return;

                    case SwipeDirection.DOWN:
                        setAutoscroll(false);
                        if(articleHistory.current.length >= 2)
                        {
                            articleHistory.current.pop();
                            const lastViewed = articleHistory.current.pop();
                            setFetchParams({articleid: lastViewed });
                        }
                        return;
                }
            }
        }
    }

    const addToHistory = (id:number) =>
    {
        if(articleHistory.current.length == 0)
        {
            articleHistory.current.push(id);
        }

        if(articleHistory.current[articleHistory.current.length-1] != id)
        {
            articleHistory.current.push(id);
            if(articleHistory.current.length >= 10)
            {
                articleHistory.current = articleHistory.current.slice(1,10);
            }
        }
    }

    return(<Suspense fallback={<LoadingFallback />} ><div onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} ><Main onInstructionsViewed={onInstructionsViewed} viewInstructions={viewInstructions} articleData={article} addToHistory={addToHistory} onSetAutoscroll={(val)=>{setAutoscroll(val)}} autoScroll={autoScroll} /></div></Suspense>);
}

export default MainView;