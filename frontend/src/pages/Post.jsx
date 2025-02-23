import { useState } from "react";
import axios from "axios";

const Post = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [url, setUrl] = useState("");
  const [statement, setStatement] = useState("");


  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    
    const formData = new FormData();
    formData.append("image", image);
    formData.append("text", text);
    

    try {
      const response = await axios.post("https://cw-announced-swaziland-authentication.trycloudflare.com/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
     
      setMessage(response.data.similarity.toString());
      setUrl(response.data.image_url.toString());
      setStatement(response.data.text.toString());
      
    } catch (error) {
      setMessage(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-lg text-black font-semibold mb-4">Upload Text & Image</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <input type="file" accept="image/*" onChange={handleImageChange} className="mb-2" />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Submit"}
        </button>
      </form>
      <div className="mx-auto inset-0 flex flex-col items-center justify-center">
      {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}
      {url && <p className="mt-2 text-sm text-gray-600"><img src={url} alt="" /></p>}
      {statement && <p className="mt-2 text-sm text-gray-600">{statement}</p>}
      </div>
    </div>
  );
};

export default Post;
