import "./message.scss";

export default function Message({ own }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="message-top ">
        <img
          src="https://images.freeimages.com/images/previews/bb0/cat-in-window-1218032.jpg"
          alt=""
          className="receiver-img"
        />
        <p className="text-content">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, ab?
          Consectetur velit magnam hic dolor quis officiis! Earum cupiditate,
          ducimus architecto rerum perferendis placeat, ad modi cumque illum,
          eum possimus.
          <span>1 hour ago</span>
        </p>
      </div>
    </div>
  );
}
