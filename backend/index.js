const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
const User = require("./model/user.model");
const Post = require("./model/post.model");
const PORT = 3000;
const cors = require("cors");
const multer = require("multer");
app.use(cors());
const Comment = require("./model/comment.model");
const path = require("path");


mongoose
  .connect("mongodb://localhost:27017/Blog")
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log("Connection failed");
  });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // directory to save files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique name
  },
});

const upload = multer({ storage });



app.post("/register", async (req, res) => {
  const userData = req.body;
  const email = await User.findOne({ email: userData.email });
  if (email) {
    res.send("Email already exist");
  }

  const result = await User.create(userData);
  if (result) {
    res.send("User is Registered");
  } else {
    res.send(" User not Registered ");
  }
}); //Database ma data pathaucha

app.post("/login", async (req, res) => {
  try {
    const data = req.body;
    const email = await User.findOne({ email: data.email });
    if (!email) {
      res.json({ success: false, message: "Email does not exist" });
    }
    const userData = await User.findOne({
      email: data.email,
      password: data.password,
    });
    if (!userData) {
      res.json({ success: false, message: "Incorrect Password" });
    } else {
      res.json({ success: true, id: userData._id });
    }
  } catch (e) {}
});

app.use("/uploads", express.static("uploads"));


app.post("/addPost", upload.single("file"), async (req, res) => {
  try {
    // Extract fields from the request body
    const { title, shortDescription, content, category, userId } = req.body;

    // Get the uploaded file name if file is present
    const photo = req.file ? `uploads/${req.file.filename}` : null;

    // Create a new post document in the database
    const success = await Post.create({ title, shortDescription, content, category, userId, photo });

    if (success) {
      // Send back the new post's id to the client
      res.send(success._id);
    } else {
      res.send("Could not add blog");
    }
  } catch (e) {
    console.log(e);
  }
});


app.get("/retrievePost/", async (req, res) => {
  //database ma vako sabai blog retrieve gareko hompage ma lyauna
  
  const retrieve = await Post.find().populate(
    "userId",
    "_id fullname"
  );
  if (retrieve) {
    res.send(retrieve);
  } else {
    res.send("Not found");
  }
});

//Euta matra post retrieve through postko id
app.get("/getPostById/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findById(id).populate("userId", "_id fullname");

    if (post) {
      res.send(post);
    } else {
      res.send("Cannot get the post");
    }
  } catch (error) {
    console.error(error);
    res.send("Server error");
  }
});
app.post("/addComment", async (req, res) => {
  try {
    const comment = req.body;
    const addcomment = await Comment.create(comment);

    if (addcomment) {
      // console.log("Comment Added");
      res.send("Comment Added");
    } else {
      res.send("Comment can't be added");
    }
  } catch (e) {
    console.log(e);
  }
});
app.get("/retrieveComment/:postId", async (req, res) => {
  try {
    const id = req.params.postId;
    const comment = await Comment.find({ postId: id }).populate(
      "userId",
      "_id fullname"
    );
    if (comment) {
      res.send(comment);
    } else {
      res.send("Cannot retrieve comment");
    }
  } catch (e) {
    console.log(e);
  }
});

app.get("/retrievePostByCategory/:category", async (req, res) => {
  try {
    const postCategory = req.params.category;
    const posts = await Post.find({ category: postCategory }).populate('userId','_id fullname');
    if (posts) {
      res.send(posts);
    } else {
      res.send("Failed to fetch posts");
    }
  } catch (e) {
    console.log(e);
  }
});

app.listen(PORT, () => {
  console.log(`Servers is running in, http://localhost:${PORT}`);
});
