import { useState } from "react";
import { pocketbase } from "../../../../lib/server";
import "./addUser.css";

const addUser = () => {
    const [user, setUser] = useState(null);
    const [url, setUrl] = useState(null);
    const [userName, setUserName] = useState(null);

    const currentUserId = pocketbase.authStore.model.id;

    const [receiverId, setReceiverId] = useState();

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
            
            if(!searchedUser.empty){
                setReceiverId(record.id);
                
                setUrl(url);
                setUserName(userName);
                setUser(searchedUser);
            }
        }catch(err){
            console.log(err);
        };
    };

    const handleAdd = async () => {
        try{
            const date = new Date();
            const chatsData = {
                "messages": [],
                "createdAt": date,
            };
            const chat = await pocketbase.collection('chats').create(chatsData);
            
            const userChatsData = {
                "senderId": currentUserId,
                "receiverId": receiverId,
                "chats": chat.id,
            };
            const newUserChat = await pocketbase.collection('userChats').create(userChatsData);
            
            const currentUser = await pocketbase.collection('users').getOne(currentUserId);
            const currentUserChats = currentUser.userchats;
            console.log(currentUserChats);
            const currentUserData = {
                "userchats": [...currentUserChats, newUserChat.id]
            };
            await pocketbase.collection('users').update(currentUserId, currentUserData);
            
            const receiverUser = await pocketbase.collection('users').getOne(receiverId);
            const receiverUserChats = receiverUser.userchats;
            console.log(receiverUserChats);
            const receiverUserData = {
                "userchats": [...receiverUserChats, newUserChat.id]
            };
            await pocketbase.collection('users').update(receiverId, receiverUserData);
            
        }catch(err){
            console.log(err);
        }
    };
    
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
                <button onClick={handleAdd}>Pridať</button>
            </div>}
        </div>
    )
}

export default addUser;