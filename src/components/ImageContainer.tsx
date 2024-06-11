import { HTMLAttributes} from 'react';

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
                overflow: "auto",
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