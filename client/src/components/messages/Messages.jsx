import Message from "../message/Message";
import "./messages.scss";

export default function Messages() {
  return (
    <div className="messages">
      <div className="messages-wrapper">
        <div className="chat-info">
          <div className="receiver">
            <img
              src="https://images.freeimages.com/images/previews/bb0/cat-in-window-1218032.jpg"
              alt=""
            />
            <div className="receiver-info">
              <span className="receiver-name">Sujan Rai</span>
              <spann className="status">
                <div className="active"></div>Online
              </spann>
            </div>
          </div>
        </div>
        <div className="messages-top">
          <Message own={true} />
          <Message />
          <Message own={true} />
          <Message />
          <Message />
          <Message />
          <Message />
        </div>
        <div className="messages-bottom">
          <div className="chatBoxBottom">
            <textarea
              className="chatMessageInput"
              placeholder="write something..."
            ></textarea>
            <button className="chatSubmitButton">Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}
