import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import '../styles/Blog.css';

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('/api/blog').then(res => setPosts(res.data));
  }, []);

  return (
    <div className="container">
      <Helmet>
        <title>Blog - SolidSquare Estates</title>
        <meta name="description" content="Real estate tips and news in Nigeria" />
      </Helmet>
      <h1>Blog</h1>
      <div className="grid">
        {posts.map(post => (
          <div key={post._id} className="card">
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 100)}...</p>
            <Link to={`/blog/${post._id}`}>Read More</Link>
          </div>
        ))}
      </div>
      {posts.map((post, i) => (
  <div key={post._id} data-aos="zoom-in" data-aos-delay={i * 100}>
    <BlogCard post={post} />
  </div>
))}
    </div>

  );
};

export default Blog;