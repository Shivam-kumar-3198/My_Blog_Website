import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { parse } from "marked";

const Addblog = () => {
  const { axios } = useAppContext();
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const toolbarRef = useRef(null);

  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [category, setCategory] = useState("Startup");
  const [isPublished, setIsPublished] = useState(false);

  // Initialize Quill editor on component mount
  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Write your blog content here...",
        modules: {
          toolbar: toolbarRef.current,
        },
        formats: [
          "header",
          "bold",
          "italic",
          "underline",
          "strike",
          "list",
          "link",
          "clean",
        ],
      });
    }

    return () => {
      // Cleanup Quill instance on component unmount
      if (quillRef.current) {
        quillRef.current = null;
      }
    };
  }, []);

  // Handle image selection and create a preview URL
  useEffect(() => {
    if (!image) {
      setPreviewUrl(null);
      return;
    }
    const objectUrl = URL.createObjectURL(image);
    setPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    setImage(file || null);
  };

  const generateContent = async () => {
    if (!title) {
      toast.error("Please enter a title to generate content.");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post("/api/blog/generate", {
        prompt: title,
      });

      if (data.success) {
        quillRef.current.root.innerHTML = parse(data.content);
        toast.success("Content generated successfully!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to generate content. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setImage(null);
    setPreviewUrl(null);
    setTitle("");
    setSubTitle("");
    setCategory("Startup");
    setIsPublished(false);
    if (quillRef.current) {
      quillRef.current.setContents([]);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsAdding(true);

    try {
      const description = quillRef.current?.root?.innerHTML || "";
      const blogData = {
        title,
        subTitle,
        description,
        category,
        isPublished,
      };

      const formData = new FormData();
      formData.append("blog", JSON.stringify(blogData));
      if (image) formData.append("image", image);

      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Unauthorized! Please login again.");
        return;
      }

      const { data } = await axios.post("/api/blog/add", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        toast.success(data.message || "Blog added successfully!");
        resetForm();
      } else {
        toast.error(data.message || "Failed to add blog.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "An error occurred while adding the blog."
      );
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50/50 flex justify-center py-10 px-4">
      <style>{`
        .ql-editor h1 { font-size: 1.6em; margin: 0.67em 0; }
        .ql-editor h2 { font-size: 1.3em; margin: 0.75em 0; }
        .ql-editor { line-height: 1.6; }
      `}</style>
      <form
        onSubmit={handleFormSubmit}
        className="bg-white w-full max-w-5xl p-6 md:p-10 shadow-lg rounded-lg space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Create a New Blog Post</h2>

        {/* Upload Thumbnail Section */}
        <section>
          <p className="font-medium text-gray-700 mb-2">Upload Thumbnail</p>
          <label
            htmlFor="image"
            className="flex items-center justify-center w-40 h-40 mt-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 transition-colors"
          >
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Thumbnail preview"
                className="object-cover w-full h-full rounded-lg"
              />
            ) : (
              <span className="text-gray-400 text-sm text-center px-2">
                Click to upload image
              </span>
            )}
            <input
              onChange={handleImageChange}
              type="file"
              id="image"
              hidden
              accept="image/*"
            />
          </label>
        </section>

        {/* Title and Subtitle Section */}
        <section>
          <div>
            <p className="font-medium text-gray-700">Blog Title</p>
            <input
              type="text"
              placeholder="Enter blog title"
              required
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 transition-shadow"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
          <div className="mt-4">
            <p className="font-medium text-gray-700">Sub Title</p>
            <input
              type="text"
              placeholder="Enter a brief subtitle"
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 transition-shadow"
              onChange={(e) => setSubTitle(e.target.value)}
              value={subTitle}
            />
          </div>
        </section>

        {/* Blog Description (Quill Editor) Section */}
        <section>
          <p className="font-medium text-gray-700">Blog Description</p>
          <div className="w-full mt-2 border border-gray-300 rounded-lg overflow-hidden">
            <div
              ref={toolbarRef}
              className="ql-toolbar ql-snow"
              aria-hidden="true"
            >
              <span className="ql-formats">
                <select className="ql-header" defaultValue="">
                  <option value="">Normal</option>
                  <option value="1">Heading 1</option>
                  <option value="2">Heading 2</option>
                </select>
              </span>
              <span className="ql-formats">
                <button className="ql-bold" aria-label="Bold"></button>
                <button className="ql-italic" aria-label="Italic"></button>
                <button className="ql-underline" aria-label="Underline"></button>
                <button className="ql-strike" aria-label="Strike"></button>
              </span>
              <span className="ql-formats">
                <button
                  className="ql-list"
                  value="ordered"
                  aria-label="Ordered list"
                ></button>
                <button
                  className="ql-list"
                  value="bullet"
                  aria-label="Bullet list"
                ></button>
              </span>
              <span className="ql-formats">
                <button className="ql-link" aria-label="Insert link"></button>
              </span>
              <span className="ql-formats">
                <button
                  className="ql-clean"
                  aria-label="Remove formatting"
                ></button>
              </span>
            </div>
            <div
              ref={editorRef}
              className="h-64 bg-white"
            ></div>
          </div>
          <button
            type="button"
            disabled={loading}
            onClick={generateContent}
            className="mt-3 text-sm text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Generating..." : "Generate with AI"}
          </button>
        </section>

        {/* Category & Publish Section */}
        <section className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <p className="font-medium text-gray-700">Category</p>
            <select
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-300"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Startup">Startup</option>
              <option value="Technology">Technology</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
            </select>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="publish"
              checked={isPublished}
              onChange={() => setIsPublished((s) => !s)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="publish" className="text-gray-700 font-medium">
              Publish Now
            </label>
          </div>
        </section>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            disabled={isAdding}
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAdding ? "Adding Blog..." : "Submit Blog"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Addblog;