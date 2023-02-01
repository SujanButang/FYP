import React from 'react'
import { useContext } from 'react'
import {AuthContext} from "../../context/authContext"
import "./comments.scss"

export default function Comments() {
    const comments =[
        {
            id:1,
            username:"Lajima Limbu",
            desc:"lorem ipusum dollar jkhsdfjhkjasfnasdfadfda ytfdgshjhkhfdshasf uasfuigdjhfagkjhaf uiaghfkjgkj",
            profilePicture: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
        },
        {
            id:1,
            username:"Lajima Limbu",
            desc:"lorem ipusum dollar jkhsdfjhkjasf",
            profilePicture: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
        },
        {
            id:1,
            username:"Lajima Limbu",
            desc:"lorem ipusum dollar jkhsdfjhkjasf",
            profilePicture: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
        },
    ];
    const {currentUser} = useContext(AuthContext);
  return (
    <div className='comments'>
        <div className="post-comment">
            <img src={currentUser.profilePicture} alt="" />
            <input type="text" placeholder='write something about this post' />
            <button>Send</button>
        </div>
        {comments.map(comment=>(
            <div className="comment" key={comment.id}>
                <img src={comment.profilePicture} alt="" />
                <div className="info">
                    <span>{comment.username}</span>
                    <p>{comment.desc}</p>
                </div>
                <span className='date'>1h ago</span>
            </div>
        ))}
    </div>
  )
}
