import TaskSubmissionForm from "./TaskSubmissionForm";
import AuraPointsBalance from "./AuraPointsBalance";
import Header from "../Components/Header";
import Threads from "../Components/Threads";
import { useState } from "react";
import Button from "../Components/Button";
import axios from "axios";
import { toast } from "react-toastify";


const SubmitTask = () =>{
  
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [image1, setImage1] = useState(null);

  const handleDataFromChild = (data) => {
    setChildData(data);
  };
  
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  const handleImageChange1 = (e) => {
    setImage1(e.target.files[0]);
  };

  const handleSubmit = async(e) =>{
    e.preventDefault();
    if (!image || !image1) {
      alert("Please upload both before and after images.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("image1", image);
    formData.append("image2", image1);

    
    try {
      const response = await axios.post("http://192.168.40.74:80/compare", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Upload Success:", response.data);
      const { match } = response.data || {};
      if(match){
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

        toast.success("Image matched")
        try {
          const saveResponse = await axios.post(
            "http://localhost:5000/api/user/reward",
            {points : 20},
            {
              headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
              withCredentials: true,
            }
          );
          console.log("Save Response:", saveResponse.data);
          if (saveResponse.data.success) {
            toast.success("reward sended successfully!");
          } else {
            throw new Error(saveResponse.data.message || "Failed to save post");
          }
  
        } catch (error) {
          console.log(error)
        }
       
      }else{
        toast.error("Image dont matched")
      }

    } catch (error) {
      console.error("Upload Failed:", error);
      toast.error("Image need face")
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
    <div style={{ width: '100%', height: '600px', position: 'relative' }}>
    <Threads
    amplitude={1}
    distance={0}
    enableMouseInteraction={true}
    className="h-screen w-screen fixed "
    />

    <div className="min-h-screen absolute top-0  text-white p-8">
      <Header/>
      <h1 className="text-4xl mt-[66px] font-bold mb-6 text-center">Auraverse Task Submission</h1>
      <div className="flex justify-center"><p className="text-lg mb-8 text-center w-[70%]">
        Upload proof of your positive actions and earn Aura Points & NFTs for your contributions. Whether it's planting
        trees, cleaning rivers, or donating to charity, every action counts!
      </p></div>
      <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-lg p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">How to Submit Your Task?</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Choose a category (Environment, Charity, Volunteering, Awareness, Others).</li>
          <li>Upload a photo/video as proof of your completed task.</li>
          <li>Provide a short description of your contribution.</li>
          <li>Click Submit for Review and wait for verification.</li>
        </ol>
        <p className="mt-4 font-semibold">📌 Once approved, you'll receive Aura Points & NFT rewards!</p>
      </div>
      <TaskSubmissionForm />

      <form onSubmit={handleSubmit}>
      <div className="max-w-2xl mx-auto mt-12 bg-white/10 backdrop-blur-lg  p-6 rounded-lg shadow-lg">
       <div>
          <label htmlFor="proof" className="block mb-2">
            Upload Proof (Photo after work with face)
          </label>
          <input type="file" accept="image/*" onChange={handleImageChange} className="mb-2" />
        </div>

        <div>
          <label htmlFor="proof" className="block mb-2">
            Upload Proof (Photo before work with face)
          </label>
          <input type="file" accept="image/*" onChange={handleImageChange1} className="mb-2" />
        </div>

        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Submit"}
        </Button>
      </div>
      </form>

      <section className="   text-white">
      <div className="max-w-2xl mx-auto mt-12 bg-white/10 backdrop-blur-lg  p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Task Categories & Aura Points</h2>
        <ul className="space-y-2">
          <li>🌱 Environmental Actions (5-50 points) – Tree planting, waste recycling, clean-ups.</li>
          <li>❤️ Charity & Donations (10-100 points) – Donating essentials, crowdfunding, supporting NGOs.</li>
          <li>🤝 Volunteering (15-75 points) – Helping at shelters, mentoring, blood donation.</li>
          <li>📢 Awareness & Campaigns (5-30 points) – Social media activism, organizing events.</li>
        </ul>
        <p className="mt-4 font-semibold">💡 Higher impact = More points!</p>
      </div>
</section>

      <AuraPointsBalance />
    </div>
    </div>
    </>
  );
}

export default SubmitTask