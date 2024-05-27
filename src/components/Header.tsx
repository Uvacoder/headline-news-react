
import stylex from "@stylexjs/stylex";
import Menu from "@/components/Menu";
import { Article } from "@/types/Article";
import { Suspense, useState, useEffect } from "react";
import axios, { AxiosResponse } from 'axios';
import { BackgroundImage } from "@/types/Image";
import ArticleSource from "./ArticleSource";


const styles = stylex.create({
    header:{
        display: "flex",
        columnGap: "1.5em",
        padding: "0.5em"
    }
});

interface Props
{
    showMenu: boolean,
    gifImage: string,
    setShowMenu: (id:boolean) => void,
    toggleAutoScroll: (on:boolean) => void,
    autoScroll: Boolean,
    article:Article,
    setupTimer: () => void,
}

function Header({showMenu, setShowMenu, gifImage, toggleAutoScroll, autoScroll, article, setupTimer}:Props)
{   
    return(
        <div {...stylex.props(styles.header)}>
            <Menu setShowMenu={setShowMenu} showMenu={showMenu} toggleAutoScroll={toggleAutoScroll} autoScroll={autoScroll} article={article} setupTimer={setupTimer}/>
            <img src={gifImage} style={{width: "58px", height:"58px", border: "2px solid white"}}/>
            <Suspense>
                <ArticleSource article={article} />
            </Suspense>      
        </div>);
}

export default Header;