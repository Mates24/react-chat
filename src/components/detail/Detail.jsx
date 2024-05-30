import "./detail.css";
import { pocketbase } from "../../lib/server";
import { toast } from "react-toastify";

const Detail = ({ onLogout }) => {
    const handleLogOut = async (e) => {
        e.preventDefault();

        try{
            pocketbase.authStore.clear();

            onLogout();
        }catch(err){
            console.log(err);
            toast.error(err.message);
        }
    }

    return(
        <div className="detail">
            <div className="user">
                <img src="./avatar.png" alt="" />
                <h2>Mathias</h2>
                <p>Lorem ipsum dolor sit amet.</p>
            </div>
            <div className="info">
                <div className="option">
                    <div className="title">
                        <span>Chat Settings</span>
                        <img src="./arrowUp.png" alt="" />
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Privacy & help</span>
                        <img src="./arrowUp.png" alt="" />
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Shared photos</span>
                        <img src="./arrowDown.png" alt="" />
                    </div>
                    <div className="photos">
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="" alt="" />
                                <span>photo_2024__.png</span>
                            </div>
                            <img src="./download.png" alt="" className="icon"/>
                        </div>
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="" alt="" />
                                <span>photo_2024__.png</span>
                            </div>
                            <img src="./download.png" alt="" className="icon"/>
                        </div>
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="" alt="" />
                                <span>photo_2024__.png</span>
                            </div>
                            <img src="./download.png" alt="" className="icon"/>
                        </div>
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Shared files</span>
                        <img src="./arrowUp.png" alt="" />
                    </div>
                </div>
                <button>Block user</button>
                <button className="logOut" onClick={handleLogOut}>Log Out</button>
            </div>
        </div>
    )
}

export default Detail;