import { Link } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, provider } from "@/configs/firebase";

const NavBar = () => {
    const handleLoginUsingGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);

            if (!credential) {
                alert('none credential')
                return;
            }
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.info('user login google successfully', token);
            console.info(user);
        } catch (error: any) {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);

            console.error({
                errorCode,
                errorMessage,
                email,
                credential
            })
        }
    }

    return (
        <div className="navbar bg-base-100 shadow-xl">
            <div className="navbar-start">
                <Link className="btn btn-ghost text-xl capitalize font-bold" to="/">TechNest</Link>
            </div>
            <div className="navbar-end">
                <button className="btn capitalize" onClick={handleLoginUsingGoogle}>login</button>
            </div>
        </div>
    )
}

export default NavBar;