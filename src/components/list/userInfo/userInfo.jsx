import "./userInfo.css";
import { pocketbase } from "../../../lib/server";


const userInfo = () => {
    return(
        <div className="userInfo">
            <div className="user">
                <img src={pocketbase.authStore.model.avatar ? url : "../../../../public/avatar.png"} alt=""/>
                <h2>{pocketbase.authStore.model.name}</h2>
            </div>
            <div className="icons">
                <img src="../../../public/more.png" alt=""/>
                <img src="../../../public/video.png" alt=""/>
                <img src="../../../public/edit.png" alt=""/>
            </div>
        </div>
    )
}

export default userInfo;