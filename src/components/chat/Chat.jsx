import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import "./chat.css";

const Chat = () => {
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");

    const handleEmoji = e => {
        setText((prev) => prev + e.emoji);
        setOpen(false);
    };

    return(
        <div className="chat">
            <div className="top">
                <div className="user">
                    <img src="../../images/avatar.png" alt="" />
                    <div className="texts">
                        <span>Mathias</span>
                        <p>Lorem ipsum dolor sit amet.</p>
                    </div>
                </div>
                <div className="icons">
                    <img src="../../images/phone.png" alt="" />
                    <img src="../../images/video.png" alt="" />
                    <img src="../../images/info.png" alt="" />
                </div>
            </div>
            <div className="center"></div>
            <div className="bottom">
                <div className="icons">
                    <img src="../../images/img.png" alt="" />
                    <img src="../../images/camera.png" alt="" />
                    <img src="../../images/mic.png" alt="" />
                </div>
                <input type="text" placeholder="Začnite písať..." value={text} onChange={(e) => setText(e.target.value)}/>
                <div className="emoji">
                    <img src="../../images/emoji.png" alt="" onClick={() => setOpen(prev => !prev)}/>
                    <div className="picker">
                        <EmojiPicker open={open} onEmojiClick={handleEmoji}/>
                    </div>
                </div>
                <button className="sendButton">Poslať</button>
            </div>
        </div>
    )
}

export default Chat;