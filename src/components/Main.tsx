import { Article } from "@/types/Article";

import Header from "./Header";
import ArticlePreview from "./ArticlePreview";
import UpArrow from "../assets/uparrow.svg";
import DownArrow from "../assets/downarrow.svg";
import LeftArrow from "../assets/leftarrow.svg";
import RightArrow from "../assets/rightarrow.svg";
import { createSearchParams, useNavigate } from "react-router-dom";
import { GlobalHotKeys } from "react-hotkeys";

import "./Main.css"
import ImageContainer from "./ImageContainer";

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
    article: Article,
    addToHistory: (article:Article | null) => void,
    onSetAutoscroll: (scroll:boolean) => void,
    autoScroll: boolean,
    onSwipe: (dir:SwipeDirection) => void,
    setupTimer: () => void,
    backgroundImage: string,
    gifImage: string,
    showMenu: boolean,
    setShowMenu: (id:boolean) => void
}

function Main({article, autoScroll, showMenu, setShowMenu, addToHistory, gifImage, backgroundImage, onSetAutoscroll, onSwipe, setupTimer}:Props)
{
    const navigation = useNavigate();

    const goToDetail = ()=>
    {
        addToHistory(article);
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
            <ImageContainer style={{ display: "flex", flexDirection: "column" }} backgroundImage={backgroundImage} onClick={goToDetail} >
                <Header 
                    showMenu={showMenu}
                    setShowMenu={setShowMenu}
                    toggleAutoScroll={onSetAutoscroll}
                    autoScroll={autoScroll}
                    gifImage={gifImage}
                    article={article}
                    setupTimer={setupTimer}
                />
                <p style={{ textAlign: "center", fontSize: "1em", fontWeight: "bold", color: "white", textShadow: "2px 2px 4px black"}}>Click anywhere for details</p>
                <div className="arrow-box">
                    <img src={UpArrow} onClick={e => { onSwipe(SwipeDirection.UP); e.stopPropagation(); } }/>
                </div>
                <div className="arrow-box content">
                    <img src={LeftArrow} onClick={e => { onSwipe(SwipeDirection.LEFT); e.stopPropagation(); }}/>
                    <div style={{ width: "100%" }}>
                        <ArticlePreview article={article} />
                    </div>
                    <img src={RightArrow} onClick={e => { onSwipe(SwipeDirection.RIGHT); e.stopPropagation(); }}/>
                </div>
                <div className="arrow-box">
                    <img src={DownArrow} onClick={e => { onSwipe(SwipeDirection.DOWN); e.stopPropagation(); }}/>
                </div>
            </ImageContainer>
        </GlobalHotKeys>
    );
}

export default Main;