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
      <div className=" flex flex-col gap-7">
        <h1 className="text-xl underline mt-5 ">Create a new post</h1>
        <form
          className="flex flex-col gap-6 max-h-[90vh]"
          onSubmit={postSubmit}
        >
          <button
          type="button"
            className="w-max p-3 rounded-xl bg-white text-sm shadow-lg text-black"
            onClick={() => photoRef.current.click()}
          >
            Add a cover picture
          </button>
          <div className="h-[300px] w-[300px] rounded-xl">
            <img
              src={
                photo
                  ? URL.createObjectURL(photo)
                  : ` http://localhost:3000/${post.photo}`
              }
              className="h-full w-full object-cover rounded-xl"
            />
          </div>
          <input
            type="file"
            accept="image/*"
            ref={photoRef}
            className="hidden"
            onChange={(event) => setPhoto(event.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title Here"
            value={title}
            className="text-gray-500 font-5xl font-semibold bg-transparent outline-none"
            onChange={(event) => setTitle(event.target.value)}
          />

          <textarea
            name="description"
            value={shortDescription}
            placeholder="A Short Description"
            className="rounded-xl p-7 shadow-md text-sm outline-none"
            onChange={(event) => setShortDescription(event.target.value)}
          />

          <ReactQuill
            ref={quillRef}
            theme="snow"
            className="rounded-xl bg-white shadow-md flex-1"
            value={content}
            onChange={setContent}
          />

          <button
            type="submit"
            className="bg-blue-800 rounded-xl px-3 py-2 text-white w-36"
          >
            Send
          </button>
        </form>
      </div>
    </>
  );
};
export default UpdatePage;
