
import stylex from "@stylexjs/stylex";

import { IconLogout2, IconFile } from "@tabler/icons-react";

import { Colors } from "../../styles/token.stylex";

const styles = stylex.create({
    container:{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: Colors.primaryUi,
        borderRight: "1px solid" + Colors.secondary,
    },
    icon:{
        backgroundColor:{
            default: Colors.primaryUi,
            ":hover": Colors.secondaryUi
        },
        color: {
            default: "white",
            ":hover": "black"
        },
        margin: ".5em",
        borderRadius: ".5em"
    },
    signout:{
        marginTop: "auto",
    },
    selected:{
        backgroundColor:{
            default: Colors.secondaryUi,
            ":hover": Colors.primaryUi
        },
        color: {
            default: "black",
            ":hover": "white"
        },
    }
});

interface Props
{
    onSignOut: ()=>void
}

function AdminSideBar({onSignOut}:Props)
{
    return(<div {...stylex.props(styles.container)}>
        <IconFile {...stylex.props(styles.icon, styles.selected)} size={48} />
        <IconLogout2 {...stylex.props(styles.icon, styles.signout)} size={48} onClick={onSignOut}/>
    </div>)
}

export default AdminSideBar;