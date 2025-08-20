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
        formData.append("category", category);
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
      <div className=" flex flex-col gap-7">
        <h1 className="text-xl underline mt-5 ">Create a new post</h1>
        <form
          className="flex flex-col gap-6 max-h-[90vh]"
          onSubmit={postSubmit}
        >
          <button
            className="w-max p-3 rounded-xl bg-white text-sm shadow-lg text-black"
            onClick={() => photoRef.current.click()}
          >
            Add a cover picture
          </button>
          <div className="h-[300px] w-[300px] rounded-xl">
            <img
              src={photo ? URL.createObjectURL(photo) : ""}
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
            className=" text-gray-500 font-5xl font-semibold bg-transparent outline-none"
            onChange={(event) => setTitle(event.target.value)}
          ></input>
          <div className="flex items-center gap-2">
            <label htmlFor="">Choose a category:</label>
            <select
              name="cat"
              id=""
              className="p-2 rounded-xl bg-white outline-none shadow-lg"
              onChange={(event) => setCategory(event.target.value)}
            >
              <option value="cultural-heritage">Culture </option>
              <option value="wildlife-nationalpark">
                Wildlife and National Park
              </option>
              <option value="hikes-natures">Treks and Hikes </option>
              <option value="foods-cuisine">Foods and Cuisine</option>
            </select>
          </div>
          <textarea
            name="description"
            placeholder="A Short Description"
            className="rounded-xl p-7 shadow-md text-sm outline-none"
            onChange={(event) => setShortDescription(event.target.value)}
          ></textarea>
          <ReactQuill
            ref={quillRef}
            theme="snow"
            className="rounded-xl bg-white shadow-md flex-1"
            value={content}
            onChange={setContent}
          />

          <div className="text-red-600">{error}</div>

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
export default Write;
