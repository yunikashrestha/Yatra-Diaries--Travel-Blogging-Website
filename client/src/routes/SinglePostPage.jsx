import { Link, Navigate, useNavigate } from "react-router-dom";
import Comments from "../components/Comments";
import { useParams } from "react-router-dom"; //URL mathi bata parameter tancha
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
        <div className="flex flex-col md:flex-row gap-12 mb-12">
          <div className="md:w-3/5 flex flex-col gap-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center gap-3 text-gray-600 text-sm">
              <span>Written by</span>
              <Link className="font-medium text-indigo-600 hover:text-indigo-700">
                {post.userId?.fullname}
              </Link>
              <span>•</span>
              <Link className="font-medium text-indigo-600 hover:text-indigo-700">
                {post.category}
              </Link>
              <span>•</span>
              <span>{format(post.createdAt)}</span>
            </div>

            <div className="text-lg text-gray-600 leading-relaxed">
              {post.shortDescription}
            </div>
          </div>

          <div className="md:w-2/5">
            <div className="aspect-video overflow-hidden rounded-xl shadow-lg">
              <img
                src={`http://localhost:3000/${post.photo}`}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                alt={post.title}
              />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="lg:w-3/4">
            <article className="prose prose-lg max-w-none">
              <div
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.content }}
              ></div>
            </article>
          </div>

          {/* Sidebar */}
          <aside className="lg:w-1/4">
            <div className="sticky top-8 space-y-8">
              {/* Author Card */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Author
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                      <span className="text-indigo-600 font-semibold text-xl">
                        {post.userId?.fullname?.[0]?.toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <Link className="font-medium text-gray-800 hover:text-indigo-600">
                        {post.userId?.fullname}
                      </Link>
                      <p className="text-sm text-gray-500">
                        Blog Writer, Explorer, Photographer
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions Card */}
              {(userId === post.userId?._id || isAdmin=="true") && (
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Actions
                  </h2>
                  <div className="space-y-3">
                    <button
                      onClick={editPost}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors"
                    >
                      <span>💾</span>
                      <span>Edit this post</span>
                    </button>

                    <button
                      onClick={deletePost}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <span>🗑️</span>
                      <span>Delete this post</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>

        {/* Comments Section */}
        <div className="mt-16">
          <Comments />
        </div>
      </div>
    </>
  );
};
export default SinglePostPage;
