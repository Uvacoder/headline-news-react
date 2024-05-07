import { useState } from "react";

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

interface SwipeCallBack
{
    up: ()=> void,
    left: ()=> void,
    right: ()=> void,
    down: ()=> void
}


function useSwipe(container:HTMLDivElement | null, minDistance:number) : SwipeCallBack
{
    const [startPoint, setStartPoint] = useState<TouchPoint | null>(null);
    console.log("test 2");
    let swipeCallback:SwipeCallBack = {
        up: function (): void {
            
        },
        left: function (): void {
            
        },
        right: function (): void {
            
        },
        down: function (): void {
            
        }
    };

    if(container === null) return swipeCallback;

    const onTouchStart = (param:TouchEvent)=>
    {
        if(param.changedTouches.length !== 0)
        {
            setStartPoint({x: param.changedTouches[0].clientX, y: param.changedTouches[0].clientY});
            param.preventDefault();
            return;
        }

        setStartPoint(null);
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

    const onTouchEnd = (param:TouchEvent)=>
    {
        if(startPoint !== null && param.changedTouches.length !== 0)
        {
            const endPoint:TouchPoint = {x: param.changedTouches[0].clientX, y: param.changedTouches[0].clientY};

            let deltaX = (startPoint.x - endPoint.x);
            let deltaY = (startPoint.y - endPoint.y);

            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

            if(distance >= minDistance)
            {
                const radians = Math.atan2(deltaY, deltaX);
                const dir = angleToDirection(radians)
                switch(dir)
                {
                    case SwipeDirection.UP:
                        swipeCallback.up();
                        return;
                    
                    case SwipeDirection.LEFT:
                        swipeCallback.left();
                        return;

                    case SwipeDirection.RIGHT:
                        swipeCallback.right();
                        return;

                    case SwipeDirection.DOWN:
                        swipeCallback.down();
                        return;
                }
            }
        }
    }

    if(container !== null)
    {
        container.ontouchstart = onTouchStart;
        container.ontouchend = onTouchEnd;
    }

    return swipeCallback;
}

export default useSwipe;