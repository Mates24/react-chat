import "./userInfo.css";
import { pocketbase } from "../../../lib/server";


const userInfo = () => {
    return(
        <div className="userInfo">
            <div className="user">
                <img src={pocketbase.authStore.model.avatar ? pocketbase.authStore.model.avatar : ".././avatar.png"} alt=""/>
                <h2>{pocketbase.authStore.model.name}</h2>
            </div>
            <div className="icons">
                <img src="./more.png" alt=""/>
                <img src="./video.png" alt=""/>
                <img src="./edit.png" alt=""/>
            </div>
        </div>
    )
}

export default userInfo;