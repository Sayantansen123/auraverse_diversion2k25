import { useNavigate } from "react-router-dom";

export default function AuraPointsBalance() {
  const navigate = useNavigate();
  const checkBalance = () => {
    navigate("/dashboard");
  }

  console.log("Rendering AuraPointsBalance")

  return (
    <div className="max-w-2xl mx-auto mt-8 text-center">
      <button onClick={checkBalance} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
        Check Your Aura Points Balance
      </button>
    </div>
  )
}

