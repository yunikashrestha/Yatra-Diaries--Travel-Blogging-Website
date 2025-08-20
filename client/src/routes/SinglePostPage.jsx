import { Link, useNavigate } from "react-router-dom";
import PostMenuAction from "../components/PostMenuActions";
import Comments from "../components/Comments";
import { useParams } from "react-router-dom";//URL mathi bata parameter tancha 
import { useEffect, useState } from "react";
import { format } from 'timeago.js';
import Navbar from "../components/Navbar";
import axios from "axios";




const SinglePostPage = () => {

  const userId=sessionStorage.getItem("login") || false

    const {id}=useParams();
const[post,setPost]=useState({})
useEffect(()=>{
    const fetchPost=async()=>{
        try{
        const fetchPost= await axios.get(`http://localhost:3000/getPostById/${id}`)
        setPost(fetchPost.data)
        
        }
        catch(e){
            console.log(e);
        }
    }
    fetchPost()
    
},[])
console.log(post);
    

        return (
        <>
        <Navbar/>
            <div className="flex flex-col gap-8 mt-5">
                {/* Details */}
                <div className="flex gap-8">
                    <div className="w-3/5 flex flex-col gap-8">
                        <h1 className="text-4xl font-semibold">{post.title}</h1>

                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                            <span>Written by</span>
                            <Link className="text-blue-800">{post.userId?.fullname}</Link>
                            <span>on</span>
                            <Link className="text-blue-800">{post.category}</Link>
                            <span>{format(post.createdAt)}</span>
                        </div>
                        <div>
                            {post.shortDescription}

                        </div>

                    </div>

                    <div className="w-2/5 h-[300px]">
                        <img src={`http://localhost:3000/${post.photo}`} className="rounded-2xl object-cover h-full" width="500" height="250" />
                    </div>
                </div>




                {/* Content */}
                <div className="flex flex-row gap-10">
                    {/* text */}
                    <div className="flex  flex-col gap-6 text-justify text-lg">
                        <div dangerouslySetInnerHTML={{ __html: post.content }}></div>

                    </div>
                    {/* menu */}
                    <div className="px-4 h-max sticky top-8">
                        <h1 className=" mt-8 text-large font-xl font-semibold">Author</h1>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-6 mt-4">
                                {/* <img src="./userImg.jpeg" className=" w-16 h-16 rounded-full object-cover" w="60" h="48" /> */}
                                <Link>{post.userId?.fullname}</Link>
                            </div>
                            <p className="text-gray-500 text-sm">Blog Writer, Explorer, Photographer</p>
                        </div>
                        <PostMenuAction />
                         </div>
                </div>

                {/* Comments */}
                <Comments/>

            </div>

        </>
    )

}
export default SinglePostPage