import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import { pocketbase } from "../../lib/server";
import "./chat.css";

const Chat = () => {
    const [receiverName, setReceiverName] = useState();
    const [receiverImg, setReceiverImg] = useState();
    const [userChat, setUserChat] = useState();
    const [chat, setChat] = useState();
    const [oldMessages, setOldMessages] = useState([]);
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");
    const [img, setImg] = useState({
        file: null,
        url: ""
    });


    const currentUserId = pocketbase.authStore.model.id;
    
    const endRef = useRef(null);

    useEffect(() => {
        const updateChatFromStorage = async () => {
            const storedUserChat = JSON.parse(localStorage.getItem('selectedChat'));

            if (storedUserChat) {
                setUserChat(storedUserChat.chats);
                fetchChatMessages(storedUserChat.chats);
                fetchReceiverInfo(storedUserChat);
                console.log(receiverName);
            }
        };

        window.addEventListener('storage', updateChatFromStorage);

        updateChatFromStorage();
        
        return () => {
            window.removeEventListener('storage', updateChatFromStorage);
        };
    }, []);

    const fetchChatMessages = async (chatId) => {
        try {
            const chatData = await pocketbase.collection('chats').getOne(chatId);
            setChat(chatData);
            setOldMessages(chatData.messages || []);
        } catch (err) {
            console.log(err);
        }
    };
    
    const fetchReceiverInfo = async (chatId) => {
        try{
            if(currentUserId === chatId.receiverId){
                const receiver = await pocketbase.collection('users').getOne(chatId.senderId);
                const receiverImg = receiver.avatar;
                const imgUrl =  receiver ? pocketbase.files.getUrl(receiver, receiverImg, {'thumb': '100x250'}) : null; 

                setReceiverName(receiver.username);
                setReceiverImg(imgUrl);

            }else if(currentUserId === chatId.senderId){
                const receiver = await pocketbase.collection('users').getOne(chatId.receiverId);
                const receiverImg = receiver.avatar;
                const imgUrl =  receiver ? pocketbase.files.getUrl(receiver, receiverImg, {'thumb': '100x250'}) : null; 

                setReceiverName(receiver.username);
                setReceiverImg(imgUrl);
            };
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chat]);

    const handleEmoji = (e, emojiObject) => {
        setText((prev) => prev + emojiObject.emoji);
        setOpen(false);
    };

    const handleImg = e => {
        if(e.target.files[0]){
            setImg({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
        })}
    };

    const handleSend = async () => {
        if (text === "") return;

        let imgUrl = null;

        try{
            if(img.file){
                imgUrl = await upload(img.file);
            }
        }catch(err){
            console.log(err);
        };


        const newMessage = {
            senderId: currentUserId,
            text,
            createdAt: new Date(),
            ...(imgUrl && { img: imgUrl })
        };

        try {
            const currentChat = await pocketbase.collection('chats').getOne(userChat);
            const updatedMessages = [...(currentChat.messages || []), newMessage];

            await pocketbase.collection('chats').update(userChat, { messages: updatedMessages });
            setOldMessages(updatedMessages);
            setText("");
        } catch (err) {
            console.log(err);
        }

        setImg({
            file: null,
            url: ""
        });

        setText("");
    };

    return (
        <div className="chat">
            <div className="top">
                <div className="user">
                    <img src={receiverImg ? receiverImg : "./avatar.png"} alt="" />
                    <div className="texts">
                        <span>{receiverName}</span>
                    </div>
                </div>
                <div className="icons">
                    <img src="./phone.png" alt="" />
                    <img src="./video.png" alt="" />
                    <img src="./info.png" alt="" />
                </div>
            </div>
            <div className="center">
                {oldMessages.map((message, index) => (
                    <div className={message.senderId === currentUserId ? "message own" : "message"} key={index}>
                        <div className="texts">
                            {message.img && <img src={message.img} alt="" />}
                            <p>{message.text}</p>
                        </div>
                    </div>
                ))}
                {img.url && (
                    <div className={message.senderId === currentUserId ? "message own" : "message"}>
                        <div className="texts">
                            <img src={img.url} alt="" />
                        </div>
                    </div>
                )}
                <div ref={endRef}></div>
            </div>
            <div className="bottom">
                <div className="icons">
                    <label htmlFor="file">
                        <img src="./img.png" alt="" />
                    </label>
                    <input type="file" id="file" style={{ display: "none" }} onChange={handleImg}/>
                    <img src="./camera.png" alt="" />
                    <img src="./mic.png" alt="" />
                </div>
                <input type="text" placeholder="Začnite písať..." value={text} onChange={(e) => setText(e.target.value)} />
                <div className="emoji">
                    <img src="./emoji.png" alt="" onClick={() => setOpen(prev => !prev)} />
                    {open && (
                        <div className="picker">
                            <EmojiPicker onEmojiClick={handleEmoji} />
                        </div>
                    )}
                </div>
                <button className="sendButton" onClick={handleSend}>Poslať</button>
            </div>
        </div>
    );
};

export default Chat;