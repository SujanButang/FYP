import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import Post from "../post/Post";
import "./wall.scss";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";

export default function Wall({ event }) {
  const { isLoading, error, data } = useQuery(["wall", event.id], async () => {
    const res = await makeRequest.get("/posts?eventId=" + event.id);
    return res.data;
  });

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {}
  };

  const { currentUser } = useContext(AuthContext);
  const [postDescription, setPostDescription] = useState("");
  const [file, setFile] = useState(null);
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (newPost) => {
      return makeRequest.post("/posts", newPost);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["wall"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    let imgURL = "";
    if (file) imgURL = await upload();
    mutation.mutate({ postDescription, imgURL, eventId: event.id });
    setPostDescription("");
    setFile(null);
  };

  return (
    <div className="wall">
      <div className="wall-container">
        {isLoading
          ? "Loading"
          : data &&
            data.map((post) => {
              return <Post post={post} key={post.id} />;
            })}
      </div>

      <div className="create-post">
        <div className="post-info">
          <div className="left">
            <img src={"/upload/" + currentUser.profilePicture} alt="" />
            <textarea
              placeholder="Write Something"
              value={postDescription}
              onChange={(e) => setPostDescription(e.target.value)}
            />
          </div>
          <div className="right">
            {file && <img className="file" src={URL.createObjectURL(file)} />}
          </div>
        </div>
        <div className="actions">
          <div className="item">
            <input
              type="file"
              style={{ display: "none" }}
              id="file"
              required
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="file" style={{ cursor: "pointer" }}>
              <AddPhotoAlternateIcon />
              <span>Add images</span>
            </label>
          </div>
          {/* <div className="item">
            <SellIcon />
            <span>Tag friends</span>
          </div> */}
          <div className="item">
            {postDescription == "" ? (
              <button
                onClick={handleClick}
                style={{ cursor: "pointer" }}
                disabled
              >
                Post
              </button>
            ) : (
              <button onClick={handleClick} style={{ cursor: "pointer" }}>
                Post
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
