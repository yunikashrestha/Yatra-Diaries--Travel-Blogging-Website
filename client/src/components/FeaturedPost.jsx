import {Link} from "react-router-dom"
import { format } from "timeago.js";

const FeaturedPost=({post})=>{
    // console.log(post);
    const firstPost=post[0]
     const secondPost=post[1]
     const thirdPost=post[2]
     const fourthPost=post[3]
    return(
        <div className="mt-8 flex flex-row gap-8 "> 
       {/* //////////First/////////// */}
        <div className=" w-1/2 h-[500px] flex flex-col gap-4">
            {/* image */}
            <img src={`http://localhost:3000/${firstPost?.photo}`} className="rounded-3xl h-[70%] w-full object-cover"/>

            {/* details */}
            <div className=" flex items-center gap-4 ">
                <h1 className="font-semibold">01.</h1>
                <Link className="text-blue-800 text-lg">{firstPost?.category}</Link>
                <span className="text-gray-500 ">{format(firstPost?.createdAt)}</span>

            </div>

            {/* title */}
            <Link to={`/${firstPost?._id}`} className="text-3xl font-bold">
            {firstPost?.title}
            </Link>
        </div>

         {/*Others */}
        <div className="w-1/2 flex flex-col gap-4">

        {/* Second */}
        <div className="h-1/4 overflow-hidden flex justify-between gap-4 ">
        {/* image */}
        <img src={`http://localhost:3000/${secondPost?.photo}`} className="rounded-3xl object-cover h-full w-1/3"/>
      
         {/* details and title */}
        <div className="w-2/3">
        {/* details */}
        <div className="flex items-center gap-2 mb-3">
            <h1 className="font-semibold">02.</h1>
            <Link to="" className="text-blue-800"> {secondPost?.category}</Link>
            <span className="text-gray-500 text-sm ">{format(secondPost?.createdAt)}</span>

        </div>
        {/* title */}
        <Link to={`/${secondPost?._id}`} className="text-xl font-medium">{secondPost?.title}</Link>
        </div>
         </div>


         {/* Third*/}
         <div className="h-1/4 flex justify-between gap-4">
        {/* image */}
        <img src={`http://localhost:3000/${thirdPost?.photo}`} className="rounded-3xl object-cover w-1/3"/>

         {/* details and title */}
        <div className="w-2/3">
        {/* details */}
        <div className="flex items-center gap-2 mb-3">
            <h1 className="font-semibold">03.</h1>
            <Link to="" className="text-blue-800">{thirdPost?.category}</Link>
            <span className="text-gray-500 text-sm ">{format(thirdPost?.createdAt)}</span>

        </div>
        {/* title */}
        <Link to={`/${thirdPost?._id}`} className="text-xl font-medium">{thirdPost?.title}</Link>
        </div>
         </div>

         {/* Fourth*/}
         <div className="h-1/4 flex justify-between gap-4">
        {/* image */}
        <img src={`http://localhost:3000/${fourthPost?.photo}`} className="rounded-3xl object-cover w-1/3"/>

         {/* details and title */}
        <div className="w-2/3">
        {/* details */}
        <div className="flex items-center gap-2 mb-3">
            <h1 className="font-semibold">04.</h1>
            <Link to="" className="text-blue-800"> {fourthPost?.category}</Link>
            <span className="text-gray-500 text-sm ">{format(fourthPost?.createdAt)}</span>

        </div>
        {/* title */}
        <Link to={`/${fourthPost?._id}`} className="text-xl font-medium">{fourthPost?.title}</Link>
        </div>
         </div>
       

        </div>

        </div>

    );

}
export default FeaturedPost