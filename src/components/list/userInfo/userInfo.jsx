import "./userInfo.css";
import { pocketbase } from "../../../lib/server";


const userInfo = () => {
    const record = pocketbase.authStore.model;
    const avatarFileName = record?.avatar;
    const url = avatarFileName ? pocketbase.files.getUrl(record, avatarFileName, {'thumb': '100x250'}) : null;
    const userName = pocketbase.authStore.model.name;

    return(
        <div className="userInfo">
            <div className="user">
                <img src={url || ".././avatar.png"} alt=""/>
                <h2>{userName}</h2>
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