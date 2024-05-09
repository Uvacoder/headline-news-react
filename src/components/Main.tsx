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
import "./Main.css"
import { createSearchParams, useNavigate } from "react-router-dom";

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

interface Props
{
    articleData:FetchData<Article>,
    onSetAutoscroll: (scroll:boolean) => void,
    autoScroll: boolean,
    addToHistory: (id:number) => void,
    onSwipe: (dir:SwipeDirection) => void
}

function Main({articleData, autoScroll, onSetAutoscroll, addToHistory, onSwipe}:Props)
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
    if(article === null) 
    {
        location.href = "/view";
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

    return (
        <div className="main" style={{ backgroundImage }} >
            <Header toggleAudio={onSetAudio} audio={audioOn} toggleAutoScroll={onSetAutoscroll} autoScroll={autoScroll} article={article}/>
            <div className="arrow-box">
                <img src={UpArrow} onClick={() => {onSwipe(SwipeDirection.UP)} }/>
            </div>
            <div className="arrow-box content">
                <img src={LeftArrow} onClick={() => onSwipe(SwipeDirection.LEFT)}/>
                <div onClick={goToDetail}>
                    <ArticlePreview article={article} />
                </div>
                <img src={RightArrow} onClick={() => onSwipe(SwipeDirection.RIGHT)}/>
            </div>
            <div className="arrow-box">
                <img src={DownArrow} onClick={() => onSwipe(SwipeDirection.DOWN)}/>
            </div>
        </div>
    );
}

export default Main;