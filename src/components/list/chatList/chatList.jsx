import useState from "react";
import "./chatList.css";

const chatList = () => {
    /* const [addMode, setAddMode] = useState(flase); */

    return(
        <div className="chatList">
            <div className="search">
                <div className="searchBar">
                    <img src="../../../images/search.png" alt=""/>
                    <input type="text" placeholder="Hľadať"/>
                </div>
                {/* <img src={addMode ? "../../../images/minus.png" : "../../../images/plus.png"} alt="" className="add" onClick={() => setAddMode(prev => !prev)}/> */}
            </div>
            <div className="item">
                <img src="../../../images/avatar.png" alt="" />
                <div className="texts">
                    <span>Mathias Matejčík</span>
                    <p>Hello</p>
                </div>
            </div>
            <div className="item">
                <img src="../../../images/avatar.png" alt="" />
                <div className="texts">
                    <span>Mathias Matejčík</span>
                    <p>Hello</p>
                </div>
            </div>
            <div className="item">
                <img src="../../../images/avatar.png" alt="" />
                <div className="texts">
                    <span>Mathias Matejčík</span>
                    <p>Hello</p>
                </div>
            </div>
            <div className="item">
                <img src="../../../images/avatar.png" alt="" />
                <div className="texts">
                    <span>Mathias Matejčík</span>
                    <p>Hello</p>
                </div>
            </div>
        </div>
    )
}

export default chatList;