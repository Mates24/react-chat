import { useEffect, useState } from "react";
import { pocketbase } from "../../../lib/server";
import AddUser from "./addUser/AddUser";
import "./chatList.css";

const ChatList = () => {
    const [chats, setChats] = useState([]);
    const [addMode, setAddMode] = useState(false);

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const currentUserId = pocketbase.authStore.model.id;
                const userChats = await pocketbase.collection('userChats').getFullList({
                    filter: `senderId = "${currentUserId}" || receiverId = "${currentUserId}"`,
                    expand: 'senderId,receiverId,chats'
                });
                
                
                const chatsWithReceiverName = userChats.map(userChat => {
                    const receiverId = userChat.expand.receiverId.id;
                    let receiver;
                    let receiverImg;
                    let url;
                    
                    if(currentUserId !== receiverId){
                        receiver = userChat.expand.receiverId;
                        receiverImg = receiver.avatar;
                        url = receiver ? pocketbase.files.getUrl(receiver, receiverImg, {'thumb': '100x250'}) : null;
    
                        console.log(chats);
                        return {
                            ...userChat,
                            receiverName: receiver.username,
                            receiverImg: url
                        };
                    }else if(currentUserId === receiverId){  
                        receiver = userChat.expand.senderId;
                        receiverImg = receiver.avatar;
                        url = receiver ? pocketbase.files.getUrl(receiver, receiverImg, {'thumb': '100x250'}) : null;

                        return {
                            ...userChat,
                            receiverName: receiver.username,
                            receiverImg: url
                        };
                    }

                });

                setChats(chatsWithReceiverName);

            } catch (err) {
                console.error('Error fetching chats:', err);
            }
        };

        fetchChats();
    }, []);

    return (
        <div className="chatList">
            <div className="search">
                <div className="searchBar">
                    <img src="./search.png" alt=""/>
                    <input type="text" placeholder="Hľadať"/>
                </div>
                <img src={addMode ? "./minus.png" : "./plus.png"} alt="" className="add" onClick={() => setAddMode((prev) => !prev)}/>
            </div>
            {chats.map(chat => (
                <div key={chat.id} className="item">
                    <img src={chat.receiverImg || "./avatar.png"} alt="" />
                    <div className="texts">
                        <span>{chat.receiverName}</span>
                        <p>{chat.chats.messages}</p>
                    </div>
                </div>
            ))}
            {addMode && <AddUser />}
        </div>
    );
};

export default ChatList;
