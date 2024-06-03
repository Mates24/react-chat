import { useState } from "react";
import { pocketbase } from "../../../../lib/server";
import "./addUser.css";

const addUser = () => {
    const [user, setUser] = useState(null);
    const [url, setUrl] = useState(null);
    const [userName, setUserName] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const username = formData.get("username");

        try{
            const searchedUser = await pocketbase.collection('users').getFullList({
                filter: `username = "${username}"`,
            })
            const record = searchedUser[0];
            const avatarFileName = record.avatar;
            const url = avatarFileName ? pocketbase.files.getUrl(record, avatarFileName, {'thumb': '100x250'}) : null;
            const userName = record.username;

            setUrl(url);
            setUserName(userName);

            if(!searchedUser.empty){
                setUser(searchedUser);
            }

        }catch(err){
            console.log(err);
        }
    }

    return(
        <div className="addUser">
            <form onSubmit={handleSearch}>
                <input type="text" placeholder="Meno" name="username"/>
                <button>Hľadať</button>
            </form>
            {user && <div className="user">
                <div className="detail">
                    <img src={url || "./avatar.png"} alt=""/>
                    <span>{userName}</span>
                </div>
                <button>Pridať</button>
            </div>}
        </div>
    )
}

export default addUser;