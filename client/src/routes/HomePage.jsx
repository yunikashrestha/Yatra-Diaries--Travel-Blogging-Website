import { Link} from "react-router-dom";
import MainCategories from "../components/MainCategories";
import FeaturedPost from "../components/FeaturedPost";
import PostList from "../components/PostList";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";



const HomePage = () => {
  const userId=sessionStorage.getItem("login") || false
  const [post,setPost]=useState([])

  useEffect(() => {
    const retrievePost = async () => {
      const res = await axios.get(`http://localhost:3000/retrievePost/`);
      setPost((res.data).reverse());
    };
    retrievePost()
  },[userId]);
  console.log(post);
  return (
    <>
    <Navbar/>
    <div className="mt-3 flex-col gap-4">
      {/* BREADCRUMB*/}
      <div className="flex gap-4">
        <Link to="/">Home</Link>
        <span></span>
        <span className="text-blue-800 ">Blogs and Articles</span>
      </div>

      {/* INTRODUCTION*/}
      <div className="flex justify-between items-center">
        {/*Titles */}
        <div className="">
          <h1 className=" text-4xl font-bold ">
            Let stories take you places you've never been.{" "}
          </h1>

          <p className="mt-4 text-md ">
            Every journey begins with a story and we bring them to life through
            travel, culture, and connection.
          </p>
        </div>
        <Link to="/write" className="relative">
          <svg
            viewBox="0 0 200 200"
            width="130"
            height="130"
            className="text-lg tracking-widest animate-spin animateButton"
          >
            <path
              id="circlePath"
              fill="none"
              d="M 100, 100 m -75, 0 a 75, 75 0 1,1 150 ,0 a 75,75 0 1,1 -150, 0"
            />
            <text>
              <textPath href="#circlePath" startOffset="0%">
                Share your ideas.
              </textPath>
              <textPath href="#circlePath" startOffset="50%">
                Write your stories.
              </textPath>
            </text>
          </svg>
          <button className=" absolute top-0 bottom-0 right-0 left-0 m-auto w-20 h-20 bg-blue-800 rounded-full flex items-center justify-center">
            <svg
            xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="40"
                height="40"
                fill="none"
                stroke="white"
                strokeWidth="1"
                >
                    <line x1="6" y1="18" x2="18" y2="6"/>
                    <polyline points="9 6 18 6 18 15"/>

                </svg>
            

          </button>
        </Link>
      </div>

      {/* Animated Button*/}

      {/* CATEGORIES*/}
      <MainCategories />

      {/* FEATURE*/}
      <FeaturedPost post={post}/>

      {/* POST LIST*/}
      <div className="">
        <h1 className="my-10 text-xl text-gray-800 font-bold ">Recent Posts</h1>

        <PostList />
      </div>
    </div>
    </>
  );
};
export default HomePage;
