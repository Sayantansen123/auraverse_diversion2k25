import { useState } from "react";
import Button from "../Components/Button";
import { rewardData } from "../utils/dropdown.js";
import axios from "axios";
import { toast } from "react-toastify";

export default function TaskSubmissionForm() {
  
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [points, setPoints] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedActivity, setSelectedActivity] = useState("");
  const [message, setMessage] = useState("");
  const [url, setUrl] = useState("");
  const [statement, setStatement] = useState("");
  const [loading, setLoading] = useState(false);
  const [imgHash, setimgHash] = useState("");

  

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedActivity("");
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleActivityChange = (e) => {
    const activity = e.target.value;
    setSelectedActivity(activity);
    const selected = rewardData[selectedCategory]?.find(
      (item) => item.activity === activity
    );
    setPoints(selected?.points || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!selectedCategory || !selectedActivity || !image) {
      toast.error("Please select a category, activity, and upload an image!");
      return;
    }
  
    console.log("Submitting:", { selectedActivity, image, points });
    setLoading(true);
  
    const formData = new FormData();
    formData.append("image", image);
    formData.append("text", selectedActivity);
  
    try {
      const response = await axios.post(
        "http://192.168.40.74:8000/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
  
      const { similarity, image_url: imageUrl, text: statement, hash: imgHash } = response.data || {};
  
      setMessage(similarity);
      setUrl(imageUrl);
      setStatement(statement);
      setimgHash(imgHash);
       
      if (similarity) {
        toast.success("Your post is verified! 🎉");
  
        const selectedActivityData = rewardData[selectedCategory]?.find(
          (item) => item.activity === selectedActivity
        );
        const pointsAwarded = selectedActivityData?.points || 0;
  
        const postData = { description: statement, imageUrl, imageHash: imgHash, pointsAwarded };
        console.log("Sending to postsave:", postData);
  
        try {
          const storedData = localStorage.getItem("auraverse");
          let token = "";
  
          if (storedData) {
            const parsedData = JSON.parse(storedData);
            token = parsedData.token;
          }
  
          if (!token) {
            toast.error("Authentication failed. Please log in again.");
            return;
          }
  
          const saveResponse = await axios.post(
            "http://localhost:5000/api/user/postsave",
            postData,
            {
              headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
              withCredentials: true,
            }
          );
  
          console.log("Save Response:", saveResponse.data);
  
          if (saveResponse.data.success) {
            toast.success("Post saved successfully!");
            await resetForm();
          } else {
            throw new Error(saveResponse.data.message || "Failed to save post");
          }
        } catch (error) {
          console.error("Save Error:", error);
        }
      } else {
        toast.error("You are not eligible for this reward ❌");
      }
    } catch (error) {
      console.error("Submission Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Error submitting form.");
    } finally {
      setLoading(false);
      setSelectedCategory("");
      setSelectedActivity("");
      setDescription("");
      setImage(null);
      setPoints(null);
    }
  };
  
  


  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white/10 backdrop-blur-lg p-6 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-semibold mb-4">Submit Your Task</h2>

      <div className="space-y-4">
        {/* Category Dropdown */}
        <div>
          <label htmlFor="category" className="block mb-2">
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="w-full p-2 bg-gray-700 rounded"
          >
            <option value="">Select a category</option>
            {Object.keys(rewardData).map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Activity Dropdown (Appears only if a category is selected) */}
        {selectedCategory && (
          <div>
            <label htmlFor="activity" className="block mb-2">
              Activity
            </label>
            <select
              value={selectedActivity}
              onChange={handleActivityChange}
              className="w-full p-2 bg-gray-700 rounded"
            >
              <option value="">Select an activity</option>
              {rewardData[selectedCategory]?.map((item, index) => (
                <option key={index} value={item.activity}>
                  {item.activity}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Image Upload */}
        <div>
          <label htmlFor="proof" className="block mb-2">
            Upload Proof (Photo)
          </label>
          <input type="file" accept="image/*" onChange={handleImageChange} className="mb-2" />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block mb-2">
            Description
          </label>
          <textarea
            id="description"
            placeholder="Provide a short description of your contribution"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 bg-gray-700 rounded"
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Submit"}
        </Button>

        {/* Response Messages */}
        {message === "true" && (
          <p className="mt-2 text-sm text-green-500">✅ You are accepted for the reward!</p>
        )}
        {message === "false" && (
          <p className="mt-2 text-sm text-red-500">❌ You are not eligible for this reward.</p>
        )}
        {url && <img className="mt-2 w-[300px] rounded" src={url} alt="Uploaded proof" />}
        {statement && <p className="mt-2 text-sm text-gray-600">{statement}</p>}
      </div>
    </form>
  );
}
