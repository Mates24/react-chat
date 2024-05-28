import { useState } from "react";
import { toast } from "react-toastify";
import PocketBase from "pocketbase";
import "./login.css";

const Login = () => {
    const pb = new PocketBase('http://127.0.0.1:8090');

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
            const record = await pb.collection('users').create(data);
            await pb.collection('userChats').create(userChatsData);

            toast.success("Registrácia bola úspešná!");
        }catch(err){
            console.log(err);
            toast.error(err.message);
        }
    };

    const handleLogin = e => {
        e.preventDefault();
        
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
                    <label htmlFor="file"><img src={avatar.url || "../../images/avatar.png"} alt="" />Nahrať fotografiu</label>
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