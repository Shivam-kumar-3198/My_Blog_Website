import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css"; // Import Quill styles

const Addblog = () => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [category, setCategory] = useState("Startup");
  const [isPublished, setIsPublished] = useState(false);

  const generateContent = async () => {
    // TODO: Add AI content generation logic here
  };

  const onSubmiteHandler = async (e) => {
    e.preventDefault();

    const description = quillRef.current
      ? quillRef.current.root.innerHTML
      : "";

    console.log({ title, subTitle, category, isPublished, image, description });
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Write your blog content here...",
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-blue-50/50 flex justify-center py-10">
      <form
        onSubmit={onSubmiteHandler}
        className="bg-white w-full max-w-5xl p-6 md:p-10 shadow rounded-lg"
      >
        {/* Upload Thumbnail */}
        <p className="font-medium text-gray-700">Upload Thumbnail</p>
        <label
          htmlFor="image"
          className="flex items-center justify-center w-32 h-32 mt-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 transition"
        >
          {image ? (
            <img
              src={URL.createObjectURL(image)}
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
          <div ref={editorRef} className="h-40 border border-gray-300 rounded"></div>
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
          type="submit"
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Submit Blog
        </button>
      </form>
    </div>
  );
};

export default Addblog;
