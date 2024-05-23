import "./userInfo.css";

const userInfo = () => {
    return(
        <div className="userInfo">
            <div className="user">
                <img src="../../../images/avatar.png" alt=""/>
                <h2>Mathias</h2>
            </div>
            <div className="icons">
                <img src="../../../images/more.png" alt=""/>
                <img src="../../../images/video.png" alt=""/>
                <img src="../../../images/edit.png" alt=""/>
            </div>
        </div>
    )
}

export default userInfo;