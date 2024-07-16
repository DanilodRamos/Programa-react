import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Importando o arquivo CSS

const App = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  return (
    <div className="App">
      <header>
        <h1>Lista de Posts</h1>
      </header>
      <main>
        {loading ? (
          <p className="loading">Carregando...</p>
        ) : (
          <div className="post-list">
            <ul>
              {posts.map(post => (
                <li key={post.id} onClick={() => handlePostClick(post)}>
                  {post.title}
                </li>
              ))}
            </ul>
            {selectedPost && (
              <div className="post-details">
                <h2>{selectedPost.title}</h2>
                <p>{selectedPost.body}</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
