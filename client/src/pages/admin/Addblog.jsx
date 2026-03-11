import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

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

  // sanitize minimal html (remove script tags). For stronger sanitization, use DOMPurify.
  const sanitizeHTML = (html = "") =>
    html.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "");

  // Initialize Quill editor on mount
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
          "blockquote",
          "code-block",
          "list",    // list is the correct format; it supports values "ordered" and "bullet"
          "link",
          "image",
        ],
      });
    }

    return () => {
      if (quillRef.current) {
        quillRef.current = null;
      }
    };
  }, []);

  // preview image
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

  // Generate content using backend AI route (requires auth)
  const generateContent = async () => {
    if (!title) {
      toast.error("Please enter a title to generate content.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to use AI content generation.");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(
        "/api/blog/ai/generate",
        { prompt: title, subTitle },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data?.success && data.content) {
        const cleaned = sanitizeHTML(data.content);
        if (quillRef.current) {
          quillRef.current.root.innerHTML = cleaned;
        } else {
          toast.success("Content generated but editor not initialized.");
        }
        toast.success("Content generated successfully!");
      } else {
        toast.error(data?.message || "AI generation failed.");
      }
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        error.message ||
        "Failed to generate content. Try again.";
      toast.error(msg);
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
        setIsAdding(false);
        return;
      }

      const { data } = await axios.post("/api/blog/add", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data?.success) {
        toast.success(data.message || "Blog added successfully!");
        resetForm();
      } else {
        toast.error(data?.message || "Failed to add blog.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "An error occurred while adding the blog."
      );
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50/50 flex flex-col items-center py-6 sm:py-10 px-4 sm:px-6 w-full box-border overflow-x-hidden">
      <style>{`
        .ql-editor h1 { font-size: 1.6em; margin: 0.67em 0; font-weight: bold; }
        .ql-editor h2 { font-size: 1.3em; margin: 0.75em 0; font-weight: bold; }
        .ql-editor { line-height: 1.6; font-size: 1rem; }
      `}</style>

      <form
        onSubmit={handleFormSubmit}
        className="bg-white w-full max-w-5xl p-5 sm:p-8 md:p-10 shadow-sm border border-gray-100 rounded-xl space-y-6 sm:space-y-8"
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 border-b border-gray-100 pb-4">
          Create a New Blog Post
        </h2>

        {/* Upload Thumbnail */}
        <section>
          <p className="font-semibold text-gray-700 mb-2">Upload Thumbnail</p>
          <label
            htmlFor="image"
            className="flex items-center justify-center w-32 h-32 sm:w-40 sm:h-40 mt-2 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all duration-300"
          >
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Thumbnail preview"
                className="object-cover w-full h-full rounded-lg"
              />
            ) : (
              <span className="text-gray-500 text-sm font-medium text-center px-4">
                Click to upload
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

        {/* Title & Subtitle */}
        <section className="space-y-4">
          <div>
            <label className="font-semibold text-gray-700 block mb-1">Blog Title</label>
            <input
              type="text"
              placeholder="Enter blog title"
              required
              className="w-full p-3 text-sm sm:text-base border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
          <div>
            <label className="font-semibold text-gray-700 block mb-1">Sub Title</label>
            <input
              type="text"
              placeholder="Enter a brief subtitle"
              className="w-full p-3 text-sm sm:text-base border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow"
              onChange={(e) => setSubTitle(e.target.value)}
              value={subTitle}
            />
          </div>
        </section>

        {/* Quill Editor */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
             <p className="font-semibold text-gray-700">Blog Description</p>
             <button
              type="button"
              disabled={loading}
              onClick={generateContent}
              className="text-xs sm:text-sm text-white bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-700 shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap w-full sm:w-auto"
            >
              {loading ? "Generating..." : "✨ Generate with AI"}
            </button>
          </div>
          
          <div className="w-full border border-gray-300 rounded-lg overflow-hidden flex flex-col focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-shadow">
            <div
              ref={toolbarRef}
              className="ql-toolbar ql-snow flex flex-wrap items-center gap-1 sm:gap-2 bg-gray-50 border-b border-gray-300 p-2"
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
                <button className="ql-image" aria-label="Insert image"></button>
              </span>
              <span className="ql-formats">
                <button
                  className="ql-clean"
                  aria-label="Remove formatting"
                ></button>
              </span>
            </div>

            <div ref={editorRef} className="min-h-[250px] sm:min-h-[300px] md:min-h-[400px] bg-white"></div>
          </div>
        </section>

        {/* Category & Publish */}
        <section className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="w-full sm:w-1/2 md:w-1/3">
            <label className="font-semibold text-gray-700 block mb-1">Category</label>
            <select
              className="w-full p-3 text-sm sm:text-base border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Startup">Startup</option>
              <option value="Technology">Technology</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
            </select>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto p-3 sm:p-0">
            <input
              type="checkbox"
              id="publish"
              checked={isPublished}
              onChange={() => setIsPublished((s) => !s)}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
            />
            <label htmlFor="publish" className="text-gray-800 font-semibold cursor-pointer select-none">
              Publish Immediately
            </label>
          </div>
        </section>

        {/* Submit */}
        <div className="pt-6 border-t border-gray-100">
          <button
            disabled={isAdding}
            type="submit"
            className="w-full bg-blue-600 text-white text-lg font-bold py-3 sm:py-4 rounded-xl hover:bg-blue-700 shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAdding ? "Adding Blog..." : "Submit Blog Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Addblog;