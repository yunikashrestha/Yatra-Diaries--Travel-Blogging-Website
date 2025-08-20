import { format } from "timeago.js"

const Comment=({comment})=>{
    return(
        <div className="p-4 bg-white rounded-l mb-8">
            <div className="flex items-center gap-4">
                {/* <img src="./userImg.jpeg" className="w-10 h-10 rounded-full " w="60"/> */}
                <span>{comment.userId?.fullname}</span>
                <span className="text-gray-700">{format(comment.createdAt)}</span>

            </div>
            <div className="mt-4">
                <p>{comment.caption}</p>

                </div>

        </div>
    )

}
export default Comment