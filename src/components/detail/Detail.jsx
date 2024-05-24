import "./detail.css";

const Detail = () => {
    return(
        <div className="detail">
            <div className="user">
                <img src="../../images/avatar.png" alt="" />
                <h2>Mathias</h2>
                <p>Lorem ipsum dolor sit amet.</p>
            </div>
            <div className="info">
                <div className="option">
                    <div className="title">
                        <span>Chat Settings</span>
                        <img src="../../images/arrowUp.png" alt="" />
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Privacy & help</span>
                        <img src="../../images/arrowUp.png" alt="" />
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Shared photos</span>
                        <img src="../../images/arrowDown.png" alt="" />
                    </div>
                    <div className="photos">
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="" alt="" />
                                <span>photo_2024__.png</span>
                            </div>
                            <img src="../../images/download.png" alt="" className="icon"/>
                        </div>
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="" alt="" />
                                <span>photo_2024__.png</span>
                            </div>
                            <img src="../../images/download.png" alt="" className="icon"/>
                        </div>
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="" alt="" />
                                <span>photo_2024__.png</span>
                            </div>
                            <img src="../../images/download.png" alt="" className="icon"/>
                        </div>
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Shared files</span>
                        <img src="../../images/arrowUp.png" alt="" />
                    </div>
                </div>
                <button>Block user</button>
                <button className="logOut">Log Out</button>
            </div>
        </div>
    )
}

export default Detail;