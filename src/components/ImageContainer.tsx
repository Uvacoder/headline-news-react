import { useEffect, useState, HTMLAttributes} from 'react';
import LoadingFallback from './LoadingFallback';

interface Props extends HTMLAttributes<HTMLDivElement> {
    backgroundImage: string;
}

const ImageContainer = ({backgroundImage, children, style, ...restProps}: Props) => {  
    return (
        <div
            {...restProps}
            style={{ 
                ...style,
                width: "100vw",
                height: "100vh",
                backgroundImage: `url('${backgroundImage}')`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center center"
            }}
        >
            { children }
        </div>
    );
};

export default ImageContainer;