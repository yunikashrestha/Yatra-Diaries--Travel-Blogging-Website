import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useRef } from "react";

const Write = () => {
  //Login vaye pachi matra lekhna paucha
  const id = sessionStorage.getItem("login");
  const navigate = useNavigate();

  useEffect(() => {
    // Only run redirect on first mount, not on every id change
    if (!id) {
      navigate("/landingPage", { replace: true });
    }
    // eslint-disable-next-line
  }, []); // Remove [id] dependency to avoid repeated redirects

  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("cultural-heritage");
  const [error, setError] = useState("");
  const [photo, setPhoto] = useState("");
  const userId = sessionStorage.getItem("login");
  const photoRef = useRef(null);

  const postSubmit = async (event) => {
    event.preventDefault();

    if (title === "") {
      setError("Title Field is Empty");
    }
    if (shortDescription === "") {
      setError("Description Field is Empty");
    }
    if (content === "") {
      setError("Content Field is Empty");
    } else {
      try {
        // Create FormData and append all fields including the file
        const formData = new FormData();
        formData.append("title", title);
        formData.append("shortDescription", shortDescription);
        formData.append("content", content);
        formData.append("userId", userId);
        formData.append("file", photo); // 'photo' should be the selected file object

        // Send POST request with multipart/form-data headers
        const res = await axios.post(
          "http://localhost:3000/addPost",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        // Navigate to the new post's page using returned ID
        navigate(`/${res.data}`);
      } catch (e) {
        console.log(e);
      }
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
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Create Your Travel Story</h1>
        <form
          className="flex flex-col gap-8"
          onSubmit={postSubmit}
        >
          {/* Cover Image Section */}
          <div className="space-y-4">
            <button
              className="px-6 py-3 rounded-lg bg-blue-50 text-blue-600 font-medium hover:bg-blue-100 transition-colors duration-200 flex items-center gap-2"
              onClick={() => photoRef.current.click()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Add Cover Image
            </button>
            <div className="w-full h-[400px] rounded-xl bg-gray-50 overflow-hidden">
              {photo ? (
                <img
                  src={URL.createObjectURL(photo)}
                  className="h-full w-full object-cover"
                  alt="Cover preview"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-gray-400">
                  No image selected
                </div>
              )}
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
              className="w-full p-4 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 min-h-[100px] text-gray-700"
              value={shortDescription}
              onChange={(event) => setShortDescription(event.target.value)}
              maxLength={500}
            />
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 self-end"
          >
            Publish Story
          </button>
        </form>
      </div>
    </>
  );
};
export default Write;
