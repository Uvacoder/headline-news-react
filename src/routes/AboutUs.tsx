import { useNavigate } from "react-router-dom";

function AboutUs()
{
  const navigation = useNavigate();

  return (
    <div onClick={() => { navigation("/view"); }}>
      hello
    </div>
  );
}

export default AboutUs