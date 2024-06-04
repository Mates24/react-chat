import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./login.css";
import { pocketbase } from "../../lib/server";

const Login = ({ onLogin }) => {
    useEffect(() => {
        try{
            pocketbase.authStore.loadFromCookie(window.localStorage.getItem("auth"));
            if(pocketbase.authStore.isValid) onLogin();
        }catch(e){
            console.log(e);
        }
    }, [onLogin]);

    const [avatar, setAvatar] = useState({
        file: null,
        url: ""
    });
    const handleAvatar = e => {
        if(e.target.files[0]){
            setAvatar({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
        })}
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const {avatar, username, email, password} = Object.fromEntries(formData);
        const data = {
            "avatar": avatar,
            "username": username,
            "email": email,
            "password": password,
            "passwordConfirm": password,
            "name": username,
            "userChats": []
        };
        const userChatsData = {
            "chats": []
        }

        try{
            const record = await pocketbase.collection('users').create(data);
            await pocketbase.collection('userChats').create(userChatsData);

            toast.success("Registrácia bola úspešná!");
        }catch(err){
            console.log(err);
            toast.error(err.message);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const {email, password} = Object.fromEntries(formData);

        try{
            await pocketbase.collection('users').authWithPassword(email, password);

            onLogin();
        }catch(err){
            console.log(err);
            toast.error(err.message);
        }
    };

    return(
        <div className="login">
            <div className="item">
                <h2>Vitaj späť!</h2>
                <form  onSubmit={handleLogin}>
                    <input type="email" placeholder="Email" name="email"/>
                    <input type="password" placeholder="Heslo" name="password"/>
                    <button type="submit">Prihlásiť sa</button>
                </form>
            </div>
            <div className="separator"></div>
            <div className="item">
            <h2>Vytvoriť účet</h2>
                <form onSubmit={handleRegister}>
                    <label htmlFor="file"><img src={avatar.url || "./avatar.png"} alt="" />Nahrať fotografiu</label>
                    <input type="file" id="file" style={{display: "none"}} onChange={handleAvatar} name="avatar"/>
                    <input type="text" placeholder="Meno" name="username"/>
                    <input type="email" placeholder="Email" name="email"/>
                    <input type="password" placeholder="Heslo" name="password"/>
                    <button type="submit">Registrovať sa</button>
                </form>
            </div>
        </div>
    )
}

export default Login;