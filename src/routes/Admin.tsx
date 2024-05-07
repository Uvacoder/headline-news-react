import { Suspense } from "react";
import stylex from "@stylexjs/stylex";

import LoginPanel from "@/components/admin/LoginPanel";
import CSVUpload from "@/components/admin/CSVUpload";
import usePostApi from "@/hooks/usePostApi";
import AuthResponse from "@/types/admin/AuthResponse";
import LoadingFallback from "@/components/LoadingFallback";
import useFetchApi from "@/hooks/useFetchApi";
import { useNavigate } from "react-router-dom";

import { Colors } from "../styles/token.stylex";
import AdminSideBar from "@/components/admin/AdminSideBar";


const styles = stylex.create({
    container:{
        height: "100dvh",
        width: "100%",
        backgroundColor: Colors.primary,
        display: "grid",
        gridTemplateColumns: "min-content auto",
    }
})

function Admin()
{
    const authed = useFetchApi("api/adminOps.php");
    const navigator = useNavigate();
    const authenticate = usePostApi<AuthResponse>("api/auth.php");
    const signOut = usePostApi<AuthResponse>("api/signout.php");

    const onSingIn = async (username:string, password:string)=>{
        const result = await authenticate({username: username, password: password}) as AuthResponse | Error;
        if(result instanceof Error)
        {
            console.log(result);
        }
        else
        {
            navigator("/admin");
        }
    }

    const onSignOut = async ()=>
    {
        const result = await signOut() as AuthResponse | Error;
        if(result instanceof Error)
        {
            console.log(result);
        }
        else
        {
            navigator("/admin");
        }
    }

    return(<Suspense fallback={<LoadingFallback />}>
        <div {...stylex.props(styles.container)}>
            <AdminSideBar onSignOut={onSignOut}/>
            <CSVUpload /> 
        </div>
        <LoginPanel authed={authed} onSubmit={onSingIn} />
        </Suspense>);
    
}

export default Admin;