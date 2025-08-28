import { format } from "timeago.js"
import axios from "axios"
import { toast } from "react-toastify";


const Comment=({comment,del,setDel})=>{
    const userId=sessionStorage.getItem("login")|| false;
    const isAdmin=sessionStorage.getItem("admin")|| false;
    async function deleteComment(){
        try{
            const res= await axios.post('http://localhost:3000/deleteComment',{id:comment._id})
            setDel(!del)
            toast.success(res.data)
            
            
        }
        catch(e){
            console.log(e);
        }
    }

    return(
        <div className="p-6 bg-white rounded-lg mb-6 border border-gray-100 hover:border-gray-200 transition-all shadow-sm hover:shadow-md">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                        <span className="text-indigo-600 font-medium">
                            {comment.userId?.fullname?.[0]?.toUpperCase()}
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-medium text-gray-800">{comment.userId?.fullname}</span>
                        <span className="text-sm text-gray-500">{format(comment.createdAt)}</span>
                    </div>
                </div>
                {(userId==comment.userId?._id || isAdmin=="true")  &&(<button className="text-gray-400 hover:text-red-500 transition-colors text-sm px-3 py-1 rounded-full hover:bg-red-50" 
                onClick={deleteComment}>
                    Delete 
                </button>)}
            </div>
            <div className="mt-4 pl-13">
                <p className="text-gray-700 leading-relaxed">{comment.caption}</p>
            </div>
        </div>
    )

}
export default Comment