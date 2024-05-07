import stylex from "@stylexjs/stylex";

const styles = stylex.create({
desktopNavElement:
{
    display:
    {
        default: "static",
        '@media (max-width: 761px)': "none"
    }
}});

function DesktopNavButton()
{

    return(<div  {...stylex.props(styles.desktopNavElement)}>Nav Area</div>);
}

export default DesktopNavButton;