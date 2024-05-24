import { useState } from "react";
import { toast } from "react-toastify";
import "./login.css";

const Login = () => {
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

    const handleLogin = e => {
        e.preventDefault();
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const { username, email, password } = Object.fromEntries(formData);

        try{
            
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
                    <label htmlFor="file"><img src={avatar.url || "../../images/avatar.png"} alt="" />Nahrať fotografiu</label>
                    <input type="file" id="file" style={{display: "none"}} onChange={handleAvatar}/>
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