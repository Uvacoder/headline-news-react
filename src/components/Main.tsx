import { useState, useEffect } from "react";

import { Article } from "@/types/Article";
import { FetchData } from "@/types/FetchData";

import Header from "./Header";
import ArticlePreview from "./ArticlePreview";

import axios, { AxiosResponse } from 'axios';
import { BackgroundImage } from "@/types/Image";

import UpArrow from "../assets/uparrow.svg";
import DownArrow from "../assets/downarrow.svg";
import LeftArrow from "../assets/leftarrow.svg";
import RightArrow from "../assets/rightarrow.svg";
import { createSearchParams, useNavigate } from "react-router-dom";
import { GlobalHotKeys } from "react-hotkeys";

import "./Main.css"

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

const keyMap = {
    [SwipeDirection.LEFT]: "ArrowLeft",
    [SwipeDirection.RIGHT]: "ArrowRight",
    [SwipeDirection.DOWN]: "ArrowDown",
    [SwipeDirection.UP]: "ArrowUp"
};

interface Props
{
    articleData:FetchData<Article>,
    onSetAutoscroll: (scroll:boolean) => void,
    autoScroll: boolean,
    addToHistory: (id:number) => void,
    onSwipe: (dir:SwipeDirection) => void,
    setupTimer: () => void
}

function Main({articleData, autoScroll, onSetAutoscroll, addToHistory, onSwipe, setupTimer}:Props)
{
    const navigation = useNavigate();
    const [audioOn, setAudioOn] = useState<Boolean>(true);
    const [backgroundImage, setBackgroundImage] = useState("");

    useEffect(() => {
        axios.get("api/getImage.php?type=main").then(
            (res: AxiosResponse<BackgroundImage>) => setBackgroundImage(`url('${axios.defaults.baseURL}${res.data.url}')`)
        );
    }, [articleData])
    
    const article:Article = articleData.read();

    if(article === null || !article.category) {
        onSwipe(SwipeDirection.UP);
        navigation("/view");
        return;
    }

    addToHistory(article.id);
    
    const onSetAudio = (on:boolean)=>
    {
        setAudioOn(on);
    }

    const goToDetail = ()=>
    {
        navigation({pathname: "/details", search: createSearchParams({id: article.id.toString()}).toString()});
    }

    const keyHandler = {
        [SwipeDirection.LEFT]: () => onSwipe(SwipeDirection.LEFT),
        [SwipeDirection.RIGHT]: () => onSwipe(SwipeDirection.RIGHT),
        [SwipeDirection.DOWN]: () => onSwipe(SwipeDirection.DOWN),
        [SwipeDirection.UP]: () => onSwipe(SwipeDirection.UP),
    };

    return (
        <GlobalHotKeys handlers={keyHandler} keyMap={keyMap} allowChanges={true}>
            <div className="main" style={{ backgroundImage }} onClick={goToDetail} >
                <Header toggleAudio={onSetAudio} audio={audioOn} toggleAutoScroll={onSetAutoscroll} autoScroll={autoScroll} article={article} setupTimer={setupTimer}/>
                <div className="arrow-box">
                    <img src={UpArrow} onClick={e => { onSwipe(SwipeDirection.UP); e.stopPropagation(); } }/>
                </div>
                <div className="arrow-box content">
                    <img src={LeftArrow} onClick={e => { onSwipe(SwipeDirection.LEFT); e.stopPropagation(); }}/>
                    <div>
                        <ArticlePreview article={article} />
                    </div>
                    <img src={RightArrow} onClick={e => { onSwipe(SwipeDirection.RIGHT); e.stopPropagation(); }}/>
                </div>
                <div className="arrow-box">
                    <img src={DownArrow} onClick={e => { onSwipe(SwipeDirection.DOWN); e.stopPropagation(); }}/>
                </div>
            </div>
        </GlobalHotKeys>
    );
}

export default Main;