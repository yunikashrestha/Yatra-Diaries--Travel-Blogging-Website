import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import PostListItem from "../components/PostListItem.jsx";
import MainCategories from "../components/MainCategories.jsx";
import Navbar from "../components/Navbar.jsx";


const PostListPage = () => {

  const userId=sessionStorage.getItem("login") || false

  const { category } = useParams();
  // console.log(category);
  const [post, setPost] = useState([]);

  useEffect(() => {
    const fetchPostByCategory = async () => {
      const posts = await axios.get(
        `http://localhost:3000/retrievePostByCategory/${category}`
      );
      setPost(posts.data.reverse());
    };
    fetchPostByCategory();
  }, [category]);

  return (
    <>
    <Navbar></Navbar>
    <div className="">
      <MainCategories category={category}/>
      <h1 className="mt-10 mb-10 text-3xl">{category}</h1>
    
      
          <div className="flex flex-col gap-12 mb-8 ">
            {post.map((val) => {
              return <PostListItem post={val} />;
            })}
          </div>
        </div>
</>
  );
};
export default PostListPage;
