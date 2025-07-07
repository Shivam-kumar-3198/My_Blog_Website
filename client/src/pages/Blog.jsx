import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { blog_data, assets, comments_data } from "../assets/assets";
import Navbar from "../components/Navbar";
import Moment from "moment";
import {
  FaFacebookF,
  FaTwitter,
  FaGooglePlusG,
} from "react-icons/fa";
import Footer from "../components/Footer"

const Blog = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchBlogData = async () => {
      const blog = blog_data.find((item) => item._id === id);
      setData(blog);
    };

    const fetchComments = async () => {
      const filteredComments = comments_data.filter(
        (comment) => comment.blog_id === id
      );
      setComments(filteredComments);
    };

    fetchBlogData();
    fetchComments();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.name.value.trim();
    const text = e.target.comment.value.trim();
    if (!username || !text) return;

    const newComment = {
      _id: Date.now().toString(),
      username,
      text,
      createdAt: new Date().toISOString(),
      blog_id: id,
    };
    setComments((prev) => [newComment, ...prev]);
    e.target.reset();
  };

  return data ? (
    <div className="relative min-h-screen flex flex-col">
      <img
        src={assets.gradientBackground}
        alt="Background"
        className="absolute -top-50 -z-10 opacity-50"
      />
      <Navbar />

      <div className="text-center mt-20 text-gray-600">
        <p className="text-primary py-4 font-medium">
          Published on {Moment(data.createdAt).format("MMMM Do YYYY")}
        </p>
        <h1 className="text-2xl sm:text-5xl font-semibold my-5 max-w-2xl mx-auto">
          {data.title}
        </h1>
        {data.subtitle && (
          <h2 className="text-xl sm:text-3xl font-medium text-gray-700 max-w-2xl mx-auto mb-4">
            {data.subtitle}
          </h2>
        )}
        <p className="inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary">
          {data.author || "Michal Brown"}
        </p>
      </div>

      <div className="mx-5 max-w-5xl md:mx-auto my-10 mt-6">
        <img
          src={data.image}
          alt="Blog visual"
          onError={(e) => (e.target.src = "/default-image.png")}
          className="rounded-3xl mb-5"
        />

        <div
          className="rich-text max-w-3xl mx-auto"
          dangerouslySetInnerHTML={{ __html: data.description }}
        ></div>

        {/* Comments Section */}
        <div className="mt-14 mb-10 max-w-3xl mx-auto">
          <p className="text-xl font-semibold mb-4">Comments ({comments.length})</p>

          {comments.length > 0 ? (
            comments.map((comment) => (
              <div
                key={comment._id}
                className="mb-4 p-4 border border-gray-200 rounded-lg bg-gray-50"
              >
                <div className="flex items-center gap-2 mb-1 text-gray-700 font-semibold">
                  <span className="text-lg">👤</span>
                  {comment.username}
                </div>
                <p className="text-gray-600 text-sm mb-2">
                  {Moment(comment.createdAt).fromNow()}
                </p>
                <p className="text-gray-800">{comment.text}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No comments yet.</p>
          )}

          {/* Add Comment Form */}
          <div className="mt-10">
            <p className="text-lg font-semibold mb-3">Add your comment</p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <textarea
                name="comment"
                placeholder="Comment"
                rows="4"
                className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              ></textarea>
              <button
                type="submit"
                className="w-fit bg-violet-800 hover:bg-violet-700 text-white font-medium px-6 py-2 rounded"
              >
                Submit
              </button>
            </form>
          </div>
        </div>

        {/* Social Share */}
        <div className="text-center mt-14 mb-10">
          <p className="text-lg font-semibold mb-4">Share this article on social media</p>
          <div className="flex justify-center gap-4 text-white">
            <a
              href="https://www.facebook.com/sharer/sharer.php"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-violet-800 hover:bg-violet-700 p-3 rounded-full"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com/intent/tweet"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-violet-800 hover:bg-violet-700 p-3 rounded-full"
            >
              <FaTwitter />
            </a>
            <a
              href="https://plus.google.com/share"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-violet-800 hover:bg-violet-700 p-3 rounded-full"
            >
              <FaGooglePlusG />
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  ) : (
    <div className="text-center text-gray-500 py-20">Loading blog post...</div>
  );
};

export default Blog;
