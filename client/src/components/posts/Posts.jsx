import "./posts.scss"
import Post from "../../components/post/Post"
export default function Posts() {
    const posts = [
        {
            id:1,
            username:"Aran Shrestha",
            profilePicture:"https://static.freeimages.com/images/home/filetypes/photo.png",
            userid:3,
            img:"https://images.freeimages.com/images/large-previews/b5a/bucegi-mountains-1641852.jpg",
            desc:"Mazaa aayo guys..... awesome awesome"
        },
        {
            id:2,
            username:"Nauraj Lamjel",
            profilePicture:"https://static.freeimages.com/images/home/filetypes/psd.png",
            userid: 1,
            desc:"Ghumna chaldim na ni... kasto alxi laagiraaxa"
        },
        {
            id:3,
            username:"Bhabishya Luitel",
            profilePicture:"https://images.freeimages.com/images/previews/49b/shoe-friends-1436939.jpg",
            userid:4,
            img:"https://images.freeimages.com/images/previews/31a/traverse-1234278.jpg",
            desc:"Paris here I come"
        }
    ]
  return (
    <div className="posts">
        {posts.map(post=>{
         return(
             <Post post={post} key={post.id}/>
         )   
        })}
    </div>
  )
}
