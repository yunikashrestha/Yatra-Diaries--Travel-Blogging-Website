import axios from "axios";
import PostListItem from "./PostListItem";
import { useState, useEffect } from "react";
//backend ma vako blog lai frontend ma dekhayo 
//useEffect kei kura tanda ekchoti matra tancha tara dharai change huncha vane change huna paarcha so condition ma matra useeffect chalcha 
const PostList = () => {
  const [post, setPost] = useState([]);

  const userId=sessionStorage.getItem("login")
  useEffect(() => {
    const retrievePost = async () => {
      const res = await axios.get(`http://localhost:3000/retrievePost/`);
      setPost((res.data).reverse());
    };
    retrievePost()
  },[userId]);

  
  return (
    <div className="flex flex-col gap-12 mb-8 ">
      {
        post.map((val,index)=>{
          if(index>3){
            return (<PostListItem post={val}/>)
}})
      }
    </div>
  );
};
export default PostList;
