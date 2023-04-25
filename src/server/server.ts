import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

type Post = {
  text: string;
  id: number;
  timestamp: number;
}
type Posts = Post[];

let posts: Posts = [];

app.get("/api/posts", (req, res) => {
  res.status(200).json(posts);
});

app.post("/api/posts", (req, res) => {
  const { text, id } = req.body;
  const newPost = { text: text, id: id, timestamp: Date.now() };
  posts.push(newPost);

  res.status(200).json(posts);
});

app.delete("api/posts/:id", (req, res) => {
  const { id } = req.params;
  posts.filter((el) => el.id !== Number(id));
  res.status(200).json(posts);
});



app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
