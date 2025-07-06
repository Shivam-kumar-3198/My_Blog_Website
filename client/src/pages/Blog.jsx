import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { blog_data, assets, comments_data } from "../assets/assets";
import Navbar from "../components/Navbar";
import Moment from "moment";

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

  return data ? (
    <div className="relative">
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
        <img src={data.image} alt="" className="rounded-3xl mb-5" />

        <div
          className="rich-text max-w-3xl mx-auto"
          dangerouslySetInnerHTML={{ __html: data.description }}
        ></div>

        {/* Comments Section */}
        <div className="mt-14 mb-10 max-w-3xl mx-auto">
          <p className="text-xl font-semibold mb-4">Comments</p>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment._id} className="mb-4 p-4 border rounded-lg">
                <p className="font-semibold">{comment.username}</p>
                <p className="text-gray-600 text-sm">{Moment(data.createdAt).format("MMMM Do YYYY, h:mm A")}</p>
                <p className="mt-2">{comment.text}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No comments yet.</p>
          )}
        </div>
      </div>

      <div className="pt-10 px-6 md:px-16 max-w-4xl mx-auto text-justify">
        
        <p className="text-gray-700 leading-7">{data.content}</p>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default Blog;
