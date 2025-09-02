import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useRef } from "react";
import { useLocation } from "react-router-dom";

const UpdatePage = ({}) => {
  //Login vaye pachi matra lekhna paucha
  const id = sessionStorage.getItem("login");
  const navigate = useNavigate();
  const location = useLocation();
  const { post } = location.state || {};
  const photoRef = useRef(null);

  useEffect(() => {
    if (!id) {
      navigate("/landingPage", { replace: true });
    }
  }, []);

  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("cultural-heritage");
  const [error, setError] = useState("");
  const [photo, setPhoto] = useState("");
  useEffect(() => {
    if (post) {
      setTitle(post.title || "");
      setShortDescription(post.shortDescription || "");
      setContent(post.content || "");
      setCategory(post.category || "cultural-heritage");
    }
  }, [post]);

  const postSubmit = async (event) => {
    event.preventDefault();

    if (!title || !shortDescription || !content) {
      setError("All fields are required");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("shortDescription", shortDescription);
      formData.append("content", content);
      formData.append("userId", post.userId?._id);
      formData.append("postId", post._id); // ✅ send postId for update
      if (photo) {
        formData.append("photo", photo); // ✅ must match multer field
      }

      const res = await axios.post(
        "http://localhost:3000/updatePost",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      navigate(`/${res.data}`);
    } catch (e) {
      console.error("Error updating post:", e);
      setError("Failed to update post. Please try again.");
    }
  };

  const quillRef = useRef();

  useEffect(() => {
    const editor = quillRef.current?.getEditor?.();
    const container = quillRef.current?.editor?.container;

    const adjustHeight = () => {
      const scrollHeight = editor?.root?.scrollHeight;
      if (scrollHeight) {
        container.style.height = scrollHeight + "px";
      }
    };

    if (editor) {
      editor.on("text-change", adjustHeight);
      adjustHeight();
    }

    return () => {
      editor?.off("text-change", adjustHeight);
    };
  }, [quillRef]);

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Update Your Travel Story</h1>
        <form
          className="flex flex-col gap-8"
          onSubmit={postSubmit}
        >
          {/* Cover Image Section */}
          <div className="space-y-4">
            <button
              type="button"
              className="px-6 py-3 rounded-lg bg-blue-50 text-blue-600 font-medium hover:bg-blue-100 transition-colors duration-200 flex items-center gap-2"
              onClick={() => photoRef.current.click()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Change Cover Image
            </button>
            <div className="w-full h-[400px] rounded-xl bg-gray-50 overflow-hidden">
              <img
                src={
                  photo
                    ? URL.createObjectURL(photo)
                    : `http://localhost:3000/${post.photo}`
                }
                className="h-full w-full object-cover"
                alt="Cover preview"
              />
            </div>
          </div>
          
          <input
            type="file"
            accept="image/*"
            ref={photoRef}
            className="hidden"
            onChange={(event) => setPhoto(event.target.files[0])}
          />

          {/* Title Input */}
          <input
            type="text"
            placeholder="Write your title here..."
            value={title}
            className="text-3xl font-semibold text-gray-800 bg-transparent outline-none border-b-2 border-gray-200 focus:border-blue-500 transition-colors duration-200 pb-2"
            onChange={(event) => setTitle(event.target.value)}
          />

          {/* Short Description */}
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium text-gray-700">Short Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Add a brief description of your travel story..."
              value={shortDescription}
              className="w-full p-4 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 min-h-[100px] text-gray-700"
              onChange={(event) => setShortDescription(event.target.value)}
              maxLength={500}
            />
          </div>

          {/* Category Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
            >
              <option value="cultural-heritage">Cultural Heritage</option>
              <option value="wildlife-nationalpark">Wildlife & National Park</option>
              <option value="foods-cuisine">Foods and Cuisines</option>
              <option value="hikes-natures">Hikes and Nature</option>
            </select>
          </div>

          {/* Rich Text Editor */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <ReactQuill
              ref={quillRef}
              theme="snow"
              className="min-h-[300px]"
              value={content}
              onChange={setContent}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Submit Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Update Story
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default UpdatePage;
