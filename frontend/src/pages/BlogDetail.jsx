import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import '../styles/BlogDetail.css';

const BlogDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(`/api/blog/${id}`).then(res => setPost(res.data));
  }, [id]);

  if (!post) return <p>Loading...</p>;

  return (
    <div className="container">
      <Helmet>
        <title>{post.title} - SolidSquare Estates</title>
        <meta name="description" content={post.content.substring(0, 160)} />
      </Helmet>
      <h1>{post.title}</h1>
      <p>By {post.author} on {new Date(post.createdAt).toDateString()}</p>
      <div>{post.content}</div>
    </div>
  );
};

export default BlogDetail;