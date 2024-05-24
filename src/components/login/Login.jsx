import { useState } from "react";
import "./login.css";
import { toast } from "react-toastify";

const Login = () => {
    const [avatar, setAvatar] = useState({
        file: null,
        url: ""
    })
    const handleAvatar = e => {
        if(e.target.files[0]){
            setAvatar({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
        })}
    }

    const handleLogin = e => {
        e.preventDefault();
    }

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
                <form>
                    <label htmlFor="file"><img src={avatar.url || "../../images/avatar.png"} alt="" />Nahrať fotografiu</label>
                    <input type="file" id="file" style={{display: "none"}} onChange={handleAvatar}/>
                    <input type="text" placeholder="Meno" name="username"/>
                    <input type="email" placeholder="Email" name="email"/>
                    <input type="password" placeholder="Heslo" name="password"/>
                    <button>Registrovať sa</button>
                </form>
            </div>
        </div>
    )
}

export default Login;