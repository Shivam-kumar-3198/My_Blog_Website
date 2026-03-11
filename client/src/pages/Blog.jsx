import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import Navbar from "../components/Navbar";
import Moment from "moment";
import { FaFacebookF, FaTwitter, FaGooglePlusG } from "react-icons/fa";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import axios from "axios";

const Blog = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  // Fetch blog + comments
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const { data } = await axios.get(`/api/blog/${id}`);
        data.success ? setData(data.blog) : toast.error(data.message);
      } catch (error) {
        toast.error(error.message);
      }
    };

    const fetchComments = async () => {
      try {
        const { data } = await axios.get(`/api/blog/${id}/comments`);
        if (data.success) setComments(data.comments);
        else toast.error(data.message);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchBlogData();
    fetchComments();
  }, [id]);

  // Add comment
  const addComment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/api/blog/${id}/comments`, {
        blog: id, // ✅ include blog ID
        name,
        content,
      });

      if (data.success) {
        toast.success(data.message);
        if (data.comment) {
          setComments((prev) => [data.comment, ...prev]);
        }
        setName("");
        setContent("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return data ? (
    <div className="relative min-h-screen flex flex-col font-sans overflow-x-hidden">
      
      {/* Background Image */}
      <img
        src={assets.gradientBackground}
        alt="Background"
        className="absolute top-0 left-0 w-full h-[50vh] object-cover -z-10 opacity-40 pointer-events-none"
      />
      
      <Navbar />

      {/* Main Content Wrapper */}
      <main className="flex-grow pb-16">
        
        {/* Blog Header */}
        <header className="text-center mt-12 sm:mt-20 px-4 sm:px-6 lg:px-8 text-gray-800">
          <p className="text-violet-600 py-2 font-semibold text-sm sm:text-base tracking-wide uppercase">
            Published on {Moment(data.createdAt).format("MMMM Do, YYYY")}
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold my-4 sm:my-6 max-w-4xl mx-auto leading-tight text-gray-900">
            {data.title}
          </h1>
          {data.subtitle && (
            <h2 className="text-lg sm:text-2xl lg:text-3xl font-medium text-gray-600 max-w-3xl mx-auto mb-6 leading-snug">
              {data.subtitle}
            </h2>
          )}
          <div className="inline-flex items-center gap-2 py-1.5 px-5 rounded-full mb-8 sm:mb-12 border border-violet-200 bg-violet-50 font-semibold text-violet-700 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-violet-500"></span>
            {data.author || "Michal Brown"}
          </div>
        </header>

        {/* Blog Body */}
        <article className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
          <img
            src={data.image}
            alt="Blog visual"
            onError={(e) => (e.target.src = "/default-image.png")}
            className="w-full max-h-[60vh] object-cover rounded-2xl sm:rounded-3xl shadow-lg mb-10 sm:mb-14 border border-gray-100"
          />

          <div
            className="rich-text max-w-3xl mx-auto prose prose-lg prose-violet sm:prose-xl text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: data.description }}
          ></div>
        </article>

        <hr className="max-w-3xl mx-auto my-12 border-gray-200" />

        {/* Comments Section */}
        <section className="px-4 sm:px-6 max-w-3xl mx-auto w-full">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            Comments ({comments?.length || 0})
          </h3>

          <div className="space-y-5">
            {comments && comments.length > 0 ? (
              comments.map((comment) => (
                <div
                  key={comment._id}
                  className="p-5 sm:p-6 border border-gray-100 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 text-lg flex-shrink-0">
                      👤
                    </div>
                    <div>
                      <p className="text-gray-900 font-bold text-base leading-tight">
                        {comment.name}
                      </p>
                      <p className="text-gray-500 text-xs sm:text-sm font-medium mt-0.5">
                        {Moment(comment.createdAt).fromNow()}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 mt-3 text-sm sm:text-base leading-relaxed pl-13">
                    {comment.content}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic bg-gray-50 p-6 rounded-2xl text-center border border-gray-100">
                No comments yet. Be the first to share your thoughts!
              </p>
            )}
          </div>

          {/* Add Comment Form */}
          <div className="mt-12 bg-gray-50 p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-inner">
            <h4 className="text-xl font-bold text-gray-900 mb-6">Leave a Reply</h4>
            <form onSubmit={addComment} className="flex flex-col gap-4">
              <div>
                <label htmlFor="name" className="sr-only">Name</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all shadow-sm bg-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="content" className="sr-only">Comment</label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="What are your thoughts?"
                  rows="4"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all shadow-sm bg-white resize-y"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto self-end bg-violet-700 hover:bg-violet-800 text-white font-semibold px-8 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
              >
                Post Comment
              </button>
            </form>
          </div>
        </section>

        {/* Social Share */}
        <section className="text-center mt-16 sm:mt-20 px-4">
          <p className="text-lg font-bold text-gray-800 mb-6">
            Share this article
          </p>
          <div className="flex justify-center gap-4 sm:gap-6 text-white">
            <a
              href="https://www.facebook.com/sharer/sharer.php"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 hover:bg-violet-700 p-3.5 sm:p-4 rounded-full shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-110"
              aria-label="Share on Facebook"
            >
              <FaFacebookF className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com/intent/tweet"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 hover:bg-violet-700 p-3.5 sm:p-4 rounded-full shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-110"
              aria-label="Share on Twitter"
            >
              <FaTwitter className="w-5 h-5" />
            </a>
            <a
              href="https://plus.google.com/share"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 hover:bg-violet-700 p-3.5 sm:p-4 rounded-full shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-110"
              aria-label="Share on Google Plus"
            >
              <FaGooglePlusG className="w-5 h-5" />
            </a>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  ) : (
    <Loader />
  );
};

export default Blog;