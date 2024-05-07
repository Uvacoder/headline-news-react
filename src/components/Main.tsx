import { useState } from "react";
import stylex from "@stylexjs/stylex";

import { Article } from "@/types/Article";
import { FetchData } from "@/types/FetchData";

import { Background } from "../styles/token.stylex";
import Header from "./Header";
import InstructionModal from "./InstructionModal";
import DesktopNavButton from "./DesktopNavButton";
import ArticlePreview from "./ArticlePreview";
import { createSearchParams, useNavigate } from "react-router-dom";

const styles = stylex.create({
    mainContainer:{
        backgroundColor: Background.primary,
        height: "100dvh",
        width: "100dvw",
        display: "grid",
        alignItems: "center",
        justifyItems: "center",
        gridTemplateRows:
        { 
            default: "min-content minmax(min-content, .1fr) auto minmax(min-content, .1fr)",
            '@media (max-width: 761px)': "min-content 0 auto 0"
        },
        gridTemplateColumns:
        { 
            default: "minmax(min-content, .1fr) auto minmax(min-content, .1fr)",
            '@media (max-width: 761px)': "0 auto 0"
        },
    },
    content:{
        gridColumnStart: "2",
        height: "100%",
        width: "100%" ,
    },
    rowFull: {
        gridColumnStart: "1",
        gridColumnEnd: "4",
        width: "100%"
    }
});

interface Props
{
    articleData:FetchData<Article>,
    onSetAutoscroll: (scroll:boolean) => void,
    autoScroll: boolean,
    addToHistory: (id:number) => void,
    onInstructionsViewed: ()=> void,
    viewInstructions:boolean
}

function Main({articleData, autoScroll, onSetAutoscroll, addToHistory, onInstructionsViewed, viewInstructions}:Props)
{
    const navigation = useNavigate();
    const [audioOn, setAudioOn] = useState<Boolean>(true);
    
    const article:Article = articleData.read();
    if(article === null) 
    {
        throw Error("Null article detected!");
    }

    addToHistory(article.id);
    
    const onSetAudio = (on:boolean)=>
    {
        setAudioOn(on);
    }

    const onCloseInstructions = ()=>
    {
        onInstructionsViewed();
    }

    const onClick = ()=>
    {
        if(viewInstructions == false)
        {
            navigation({pathname: "/details", search: createSearchParams({id: article.id.toString()}).toString()});
        }
    }


    return(<div {...stylex.props(styles.mainContainer)}>
            <div {...stylex.props(styles.rowFull)}>
                    <Header toggleAudio={onSetAudio} audio={audioOn} toggleAutoScroll={onSetAutoscroll} autoScroll={autoScroll} article={article} />
                {viewInstructions? <InstructionModal onClose={onCloseInstructions} /> : null }
            </div>
            <div {...stylex.props(styles.rowFull)}>
                <DesktopNavButton />
            </div>
            <DesktopNavButton />
            <div {...stylex.props(styles.content)}  onClick={onClick}>
                    <ArticlePreview article={article}/>
            </div>
            <DesktopNavButton />
            <div {...stylex.props(styles.rowFull)}>
                <DesktopNavButton />
            </div>
        </div>);
}

export default Main;