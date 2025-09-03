import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css"; // Import Quill styles
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Addblog = () => {
  const { axios } = useAppContext();
  const [isAdding, setIsAdding] = useState(false);

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [category, setCategory] = useState("Startup");
  const [isPublished, setIsPublished] = useState(false);

  // ✅ Placeholder for AI content generation
  const generateContent = async () => {
    toast("AI content generation not implemented yet.");
  };

  // ✅ Submit Handler
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsAdding(true);

    try {
      const blog = {
        title,
        subTitle,
        description: quillRef.current?.root.innerHTML || "",
        category,
        isPublished,
      };

      const formData = new FormData();
      formData.append("blog", JSON.stringify(blog));
      formData.append("image", image);

      // ✅ Get JWT token from localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Unauthorized! Please login again.");
        setIsAdding(false);
        return;
      }

      const { data } = await axios.post("/api/blog/add", formData, {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Send token
        },
      });

      if (data.success) {
        toast.success(data.message || "Blog added successfully!");

        // ✅ Reset form
        setImage(null);
        setPreviewUrl(null);
        setTitle("");
        setSubTitle("");
        setCategory("Startup");
        setIsPublished(false);
        if (quillRef.current) {
          quillRef.current.root.innerHTML = "";
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsAdding(false);
    }
  };

  // ✅ Initialize Quill
  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Write your blog content here...",
      });
    }
    return () => {
      quillRef.current = null; // cleanup
    };
  }, []);

  // ✅ Preview image & cleanup memory
  useEffect(() => {
    if (image) {
      const objectUrl = URL.createObjectURL(image);
      setPreviewUrl(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [image]);

  return (
    <div className="min-h-screen bg-blue-50/50 flex justify-center py-10">
      <form
        onSubmit={onSubmitHandler}
        className="bg-white w-full max-w-5xl p-6 md:p-10 shadow rounded-lg"
      >
        {/* Upload Thumbnail */}
        <p className="font-medium text-gray-700">Upload Thumbnail</p>
        <label
          htmlFor="image"
          className="flex items-center justify-center w-32 h-32 mt-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 transition"
        >
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="thumbnail"
              className="object-cover w-full h-full rounded-lg"
            />
          ) : (
            <span className="text-gray-400 text-sm text-center px-2">
              + Upload
            </span>
          )}
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            accept="image/*"
            required
          />
        </label>

        {/* Blog Title */}
        <p className="mt-6 font-medium text-gray-700">Blog Title</p>
        <input
          type="text"
          placeholder="Type here"
          required
          className="w-full mt-2 p-2 border border-gray-300 outline-none rounded focus:ring-2 focus:ring-blue-300"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        {/* Sub Title */}
        <p className="mt-4 font-medium text-gray-700">Sub Title</p>
        <input
          type="text"
          placeholder="Type here"
          required
          className="w-full mt-2 p-2 border border-gray-300 outline-none rounded focus:ring-2 focus:ring-blue-300"
          onChange={(e) => setSubTitle(e.target.value)}
          value={subTitle}
        />

        {/* Blog Description */}
        <p className="mt-4 font-medium text-gray-700">Blog Description</p>
        <div className="w-full mt-2">
          <div
            ref={editorRef}
            className="h-40 border border-gray-300 rounded"
          ></div>
          <button
            type="button"
            onClick={generateContent}
            className="mt-3 text-xs text-white bg-black px-4 py-1.5 rounded hover:bg-gray-800"
          >
            Generate with AI
          </button>
        </div>

        {/* Category */}
        <p className="mt-6 font-medium text-gray-700">Category</p>
        <select
          className="w-full mt-2 p-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-blue-300"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Startup">Startup</option>
          <option value="Technology">Technology</option>
          <option value="Health">Health</option>
          <option value="Education">Education</option>
        </select>

        {/* Publish Toggle */}
        <div className="mt-6 flex items-center gap-3">
          <input
            type="checkbox"
            id="publish"
            checked={isPublished}
            onChange={() => setIsPublished(!isPublished)}
            className="w-4 h-4"
          />
          <label htmlFor="publish" className="text-gray-700">
            Publish Now
          </label>
        </div>

        {/* Submit Button */}
        <button
          disabled={isAdding}
          type="submit"
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {isAdding ? "Adding..." : "Submit Blog"}
        </button>
      </form>
    </div>
  );
};

export default Addblog;
