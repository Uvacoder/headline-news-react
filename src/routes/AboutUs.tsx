import { useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from "react";
import { BackgroundImage } from "@/types/Image";
import stylex from "@stylexjs/stylex";
import GoBack from "../assets/goback.svg";
import { Content } from "@/types/Content";
import ImageContainer from "@/components/ImageContainer";

const styles = stylex.create({
  mainContainer: {
    color: "white",
    textShadow: "2px 2px 4px black",
    display: "flex",
    flexDirection: "column",
    gap: "2em",
    padding: "1em",
    zIndex: "2",
  },
  button: {
    display: "flex",
    alignItems: "center",
    color: "white",
    textShadow: "2px 2px 4px black",
    gap: "0.5em"
  },
  center: {
    textAlign: "center"
  },
  content: {
    fontSize: "1.3em",
    textAlign: "center"
  }
})

function AboutUs()
{
  const navigation = useNavigate();

  const [backgroundImage, setBackgroundImage] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
      axios.get("api/getImage.php?type=temp").then(
        (res: AxiosResponse<BackgroundImage>) => setBackgroundImage(`${axios.defaults.baseURL}${res.data.url}`)
      );
      axios.get("api/getContent.php?type=about").then(
        (res: AxiosResponse<Content>) => setContent(res.data.text)
      )
  }, [])

  return (
    <ImageContainer {...stylex.props(styles.mainContainer)} onClick={() => { navigation("/view"); }} backgroundImage={backgroundImage}>    
      <div {...stylex.props(styles.button)}>
        <img src={GoBack} /> Go Back
      </div>
      <h1 {...stylex.props(styles.center)}>About Us</h1>
      <div {...stylex.props(styles.content)}>{ content }</div>
    </ImageContainer>
  );
}

export default AboutUs