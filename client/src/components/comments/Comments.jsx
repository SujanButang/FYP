import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useContext } from "react";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import moment from "moment";
import "./comments.scss";

export default function Comments({ postId }) {
  const { isLoading, error, data } = useQuery(["comments"], () =>
    makeRequest.get(`/comments?postId= ${postId}`).then((res) => {
      return res.data;
    })
  );

  const [commentDescription, setCommentDescription] = useState("");
  const queryCient = useQueryClient();
  const mutation = useMutation(
    (newComment) => {
      return makeRequest.post(`/comments?postId=${postId}`, newComment);
    },
    {
      onSuccess: () => {
        queryCient.invalidateQueries(["comments"]);
      },
    }
  );

  const handleClick = (e) => {
    e.preventDefault();
    mutation.mutate({ commentDescription });
    setCommentDescription("");
  };
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="comments">
      <div className="post-comment">
        <img src={currentUser.profilePicture} alt="" />
        <input
          type="text"
          placeholder="write something about this post"
          value={commentDescription}
          onChange={(e) => setCommentDescription(e.target.value)}
        />
        <button onClick={handleClick}>Send</button>
      </div>
      {data &&
        data.map((comment) => (
          <div className="comment" key={comment.id}>
            <img src={comment.user.profilePicture} alt="" />
            <div className="info">
              <span>{comment.user.username}</span>
              <p>{comment.comment_description}</p>
            </div>
            <span className="date">
              {moment(comment.comment_date).fromNow()}
            </span>
          </div>
        ))}
    </div>
  );
}
