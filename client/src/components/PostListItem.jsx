import { Link } from "react-router-dom"

import { format } from 'timeago.js';
const PostListItem=({post})=>{//{post}=>props(properties that can be shared betn components)
    
    return(

        <div className="grid grid-cols-[20%_80%] gap-8 h-17">
            <div className="h-[200px] w-[250px] overflow-hidden">
            <img src={`http://localhost:3000/${post.photo}`} className="rounded-2xl object-cover h-full w-full"></img>
            </div>
            <div className="flex flex-col gap-3">
                <Link to={`/${post._id}`} className="text-2xl font-semibold">{post.title}</Link>

                <div className="flex items-center text-sm text-gray-400 gap-2 w-2/3">
                    <span>Written by</span>
                    <Link className="text-blue-800">{post.userId?.fullname}</Link>
                    <span>on</span>
                    <Link className="text-blue-800">{post.category}</Link>?
                    <span>{format(post.createdAt)}</span>

                </div>
                <div>
                    {post.shortDescription}
                </div>
                <Link to={`/${post._id}`} className="underline text-blue-800">Read more</Link>
            </div>

        </div>

    )
}
export default PostListItem