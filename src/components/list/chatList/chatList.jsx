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
                    let chat;
                    
                    if(currentUserId !== receiverId){
                        receiver = userChat.expand.receiverId;
                        receiverImg = receiver.avatar;
                        url = receiver ? pocketbase.files.getUrl(receiver, receiverImg, {'thumb': '100x250'}) : null;
                        chat = userChat.expand.chats.messages[userChat.expand.chats.messages.length - 1];
    
                       if(chat){
                            return {
                                ...userChat,
                                receiverName: receiver.username,
                                receiverImg: url,
                                lastMessage: chat.text
                            };
                                
                       }else{
                            return {
                                ...userChat,
                                receiverName: receiver.username,
                                receiverImg: url,
                            };
                       };

                    }else if(currentUserId === receiverId){  
                        receiver = userChat.expand.senderId;
                        receiverImg = receiver.avatar;
                        url = receiver ? pocketbase.files.getUrl(receiver, receiverImg, {'thumb': '100x250'}) : null;
                        chat = userChat.expand.chats.messages[userChat.expand.chats.messages.length - 1];

                        if(chat){
                            return {
                                ...userChat,
                                receiverName: receiver.username,
                                receiverImg: url,
                                lastMessage: chat.text
                            };
                        }else{
                            return {
                                ...userChat,
                                receiverName: receiver.username,
                                receiverImg: url,
                            };
                        }
                    }

                });

                setChats(chatsWithReceiverName);

            } catch (err) {
                console.error('Error fetching chats:', err);
            }
        };

        fetchChats();
    }, []);

    const handleSelect = async (chat) => {
        const record = await pocketbase.collection('userChats').getOne(chat);
        localStorage.setItem('selectedChat', JSON.stringify(record));
        window.dispatchEvent(new Event('storage'));
    };

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
                <div key={chat.id} className="item" onClick={() => handleSelect(chat.id)}>
                    <img src={chat.receiverImg || "./avatar.png"} alt="" />
                    <div className="texts">
                        <span>{chat.receiverName}</span>
                        <p>{chat.lastMessage}</p>
                    </div>
                </div>
            ))}
            {addMode && <AddUser />}
        </div>
    );
};

export default ChatList;