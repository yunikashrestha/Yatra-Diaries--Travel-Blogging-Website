import { Link, Navigate, useNavigate } from "react-router-dom";
import Comments from "../components/Comments";
import { useParams } from "react-router-dom"; 
import { useEffect, useState } from "react";
import { format } from "timeago.js";
import Navbar from "../components/Navbar";
import axios from "axios";
import { toast } from "react-toastify";

const SinglePostPage = () => {
  const userId = sessionStorage.getItem("login") || false;
  const isAdmin = sessionStorage.getItem("admin") || false;

  const navigate = useNavigate();

  const { id } = useParams();
  const [post, setPost] = useState({});
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const fetchPost = await axios.get(
          `http://localhost:3000/getPostById/${id}`
        );
        setPost(fetchPost.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchPost();
  }, []);
  console.log(post);

  async function deletePost() {
    try {
      const res = await axios.post("http://localhost:3000/deletePost", {
        id: post._id,
      });
      toast.success(res.data);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  }
  async function editPost() {
    navigate("/update", { state: { post } });
  }

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="relative mb-12">
          {/* Cover Image */}
          <div className="w-full h-[60vh] rounded-2xl overflow-hidden shadow-2xl mb-8">
            <img
              src={`http://localhost:3000/${post.photo}`}
              className="w-full h-full object-cover"
              alt={post.title}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>

          {/* Post Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="max-w-4xl">
              {/* Category Badge */}
              <Link to={`/posts/${post.category}`} className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4 hover:bg-white/30 transition-colors">
                {post.category}
              </Link>

              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                {post.title}
              </h1>

              <div className="flex items-center gap-4 text-white/90 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                    <Link to={`/profile/${post.userId?._id}`} className="text-indigo-600 font-semibold text-lg">
                      {post.userId?.fullname?.[0]?.toUpperCase()}
                    </Link>
                  </div>
                  <div>
                    <Link to={`/profile/${post.userId?._id}`} className="font-medium hover:text-white">
                      {post.userId?.fullname}
                    </Link>
                    <p className="text-white/70 text-xs">Travel Enthusiast</p>
                  </div>
                </div>
                <span>•</span>
                <span>{format(post.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Short Description */}
            <div className="text-xl text-gray-600 leading-relaxed mb-12 p-6 bg-gray-50 rounded-xl border border-gray-100 italic">
              {post.shortDescription}
            </div>

            <article className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-p:text-gray-600 prose-a:text-indigo-600 prose-img:rounded-xl">
              <div
                className="leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.content }}
              ></div>
            </article>
          </div>

          {/* Sidebar */}
          <aside className="lg:w-1/4">
            <div className="sticky top-8 space-y-8">
              {/* Author Card */}
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  About the Author
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
                      <span className="text-indigo-600 font-semibold text-2xl">
                        {post.userId?.fullname?.[0]?.toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <Link to={`/profile/${post.userId?._id}`} className="font-medium text-gray-800 hover:text-indigo-600 block mb-1">
                        {post.userId?.fullname}
                      </Link>
                      <p className="text-sm text-gray-500">
                        Travel Blogger & Photographer
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions Card */}
              {(userId === post.userId?._id || isAdmin==="true") && (
                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Post Actions
                  </h2>
                  <div className="space-y-3">
                    <button
                      onClick={editPost}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                      <span>Edit Post</span>
                    </button>

                    <button
                      onClick={deletePost}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <span>Delete Post</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>

        {/* Comments Section */}
        <div className="mt-16 bg-gray-50 rounded-2xl p-8 border border-gray-100">
          <Comments />
        </div>
      </div>
    </>
  );
};
export default SinglePostPage;
