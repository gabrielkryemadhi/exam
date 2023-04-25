import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

function App() {
  const [input, setInput] = useState("");
  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getPosts = async () => {
    const response = await fetch("http://localhost:3001/api/posts", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const content = await response.json();
    setPosts(content);
    console.log(posts);
    setIsLoading(false);
  };

  async function addPost() {
    await fetch("http://localhost:3001/api/posts", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: input, id: posts.length + 1 }),
    });
    setInput("");
    getPosts();
  }

  async function deleteEle(id) {
    const response = await fetch(
      "http://localhost:3001/api/posts/" + `${id}`,
      {
        method: "DELETE",
        mode: "cors",
      }
    );
    const content = await response.json();
    setPosts([...content.posts]);
    setIsLoading(false)
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="main-content">
      <h3>My Posts</h3>
      <form onSubmit={addPost}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Add Post</button>
      </form>
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        posts.map((post) => (
          <div key={post.id}>
            <h4>{post.text}</h4>
            {/* <h5>date.toUTCString({post.timestamp})</h5> */}
            <button onClick={deleteEle}>Delete</button>
          </div>
        ))
      )}
      <button onClick={sortPosts}>Sort by Time</button>
      <button onClick={reversePosts}>Reverse</button>
    </div>
  );
}

export default App;
