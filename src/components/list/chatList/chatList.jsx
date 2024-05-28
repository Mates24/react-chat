import { useState } from "react";
import AddUser from "./addUser/addUser"
import "./chatList.css";

const chatList = () => {
    const [addMode, setAddMode] = useState(false);

    return(
        <div className="chatList">
            <div className="search">
                <div className="searchBar">
                    <img src="../../../public/search.png" alt=""/>
                    <input type="text" placeholder="Hľadať"/>
                </div>
                <img src={addMode ? "../../../public/minus.png" : "../../../public/plus.png"} alt="" className="add" onClick={() => setAddMode((prev) => !prev)}/>
            </div>
            <div className="item">
                <img src="../../../public/avatar.png" alt="" />
                <div className="texts">
                    <span>Mathias Matejčík</span>
                    <p>Hello</p>
                </div>
            </div>
            <div className="item">
                <img src="../../../public/avatar.png" alt="" />
                <div className="texts">
                    <span>Mathias Matejčík</span>
                    <p>Hello</p>
                </div>
            </div>
            <div className="item">
                <img src="../../../public/avatar.png" alt="" />
                <div className="texts">
                    <span>Mathias Matejčík</span>
                    <p>Hello</p>
                </div>
            </div>
            <div className="item">
                <img src="../../../public/avatar.png" alt="" />
                <div className="texts">
                    <span>Mathias Matejčík</span>
                    <p>Hello</p>
                </div>
            </div>
            {addMode && <AddUser/>}
        </div>
    )
}

export default chatList;