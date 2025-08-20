 import { useState } from "react";
import {Link} from "react-router-dom";
 

 const MainCategories=({category})=>{
    const [transition,setTransition]=useState(category||'All Post')
    return(
        <div className="flex justify-center items-center gap-2 bg-white rounded-full py-2 px-5 mt-5  ">
            {/* /* Links/* */}
            <div className="flex-1 flex items-center justify-between"> 
                <Link to="/" className={transition=='All Post'?"bg-blue-800 rounded-full px-2 text-white":'hover:bg-blue-800 rounded-full px-2 text-black'}>
                All Posts
                </Link>
                <Link to="/posts/cultural-heritage" className={transition=='cultural-heritage'?"bg-blue-800 rounded-full px-2 text-white":'hover:bg-blue-800 rounded-full px-2 text-black'} onClick={()=>setTransition('cultural-heritage')}>
               Cultural Heritages
                </Link>
                <Link to="/posts/wildlife-nationalpark" className={transition=='wildlife-nationalpark'?"bg-blue-800 rounded-full px-2 text-white":'hover:bg-blue-800 rounded-full px-2 text-black'} onClick={()=>setTransition('wildlife-nationalpark')}>
               Wildlife & National Park
                </Link>
                <Link to="/posts/foods-cuisine" className={transition=='foods-cuisine'?"bg-blue-800 rounded-full px-2 text-white":'hover:bg-blue-800 rounded-full px-2 text-black'} onClick={()=>setTransition('foods-cuisine')}>
               Foods and Cuisines
                </Link>
                <Link to="/posts/hikes-natures" className={transition=='hikes-natures'?"bg-blue-800 rounded-full px-2 text-white":'hover:bg-blue-800 rounded-full px-2 text-black'} onClick={()=>setTransition('hikes-natures')}>
               Hikes and Nature
                </Link>
                

            </div>
            <span className="text-xl font-medium"> |</span>

             {/* /* Search/* */}
            <div className="bg-gray-200 p-2 rounded-full flex items-center gap-2"> 
                <input type="text" placeholder="Search a post.." className="bg-transparent pl-5 outline-none" />
            </div>

        </div>
    )
 }
 export default MainCategories