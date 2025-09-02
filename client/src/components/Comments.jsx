import { useState, useEffect } from "react";
import Comment from "./Comment";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Comments = () => {
  const [caption, setCaption] = useState();
  const userId = sessionStorage.getItem("login") || false;
  const { id } = useParams();
  const postId = id;
  const [del, setDel] = useState(false);

  const [comment, setComment] = useState([]);
  const navigate = useNavigate();

  //Adding a comment to backend
  const addComment = async () => {
    if (!userId) {
      navigate("/landingPage");
    }

    try {
      if(caption==""){
        toast.error("Comment Field cannot be empty")
        return
      }
      const res = await axios.post("http://localhost:3000/addComment", {
        caption,
        userId,
        postId,
      });

      setCaption("");
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const retrieveComment = async () => {
      try {
        const getcomment = await axios.get(
          `http://localhost:3000/retrieveComment/${postId}`
        );
        setComment(getcomment.data.reverse());
      } catch (e) {
        console.log(e);
      }
    };
    retrieveComment();
  }, [postId, caption, del]);

  return (
    <div className="flex flex-col gap-5 rounded-l">
      <h1 className="underline text-xl">Comments</h1>
      <div className="flex items-center justify-between gap-8 w-full ">
        <textarea
          placeholder="Write a comment..."
          className="w-full rounded-xl p-2"
          value={caption}
          onChange={(event) => setCaption(event.target.value)}
        ></textarea>
        <button
          className="bg-blue-800 rounded-xl text-white px-5 py-2 font-medium"
          onClick={addComment}
        >
          Send
        </button>
      </div>

      {comment.map((value) => {
        return <Comment comment={value} del={del} setDel={setDel} />;
      })}
    </div>
  );
};
export default Comments;
