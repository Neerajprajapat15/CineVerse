// src/pages/ReviewAnalysis/ReviewAnalysis.jsx
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const AnalysisPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  if (!location.state) {
    navigate("/");
    return null;
  }

  const { analysis, review } = location.state || {};
  const sentiment = analysis?.sentiment;
  const bias = analysis?.bias;
  const spam = analysis?.spam;

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-[#111418] text-white flex flex-col items-center p-8">
        <h1 className="text-4xl font-bold mb-8">Review Analysis Results</h1>

        <div className="w-full max-w-3xl space-y-6">
          {/* Sentiment */}
          <div className="bg-[#1a1e23] p-6 rounded-md border border-gray-700">
            <h2 className="text-xl font-bold mb-2">Sentiment Analysis</h2>
            <p
              className={`text-2xl ${
                sentiment?.prediction === "Positive"
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {sentiment?.prediction || "N/A"}
            </p>
            <p className="text-gray-400 text-sm">
              Positive:{" "}
              {(sentiment?.confidence?.positive * 100).toFixed(2)}% | Negative:{" "}
              {(sentiment?.confidence?.negative * 100).toFixed(2)}%
            </p>
          </div>

          {/* Bias */}
          <div className="bg-[#1a1e23] p-6 rounded-md border border-gray-700">
            <h2 className="text-xl font-bold mb-2">Bias Identification</h2>
            <p
              className={`text-2xl ${
                bias?.prediction === "Not Hate"
                  ? "text-blue-400"
                  : "text-red-400"
              }`}
            >
              {bias?.prediction || "N/A"}
            </p>
            <p className="text-gray-400 text-sm">
              Hate: {(bias?.confidence?.Hate * 100).toFixed(2)}% | Not hate:{" "}
              {(bias?.confidence?.["Not hate"] * 100).toFixed(2)}%
            </p>
          </div>

          {/* Spam (future) */}
          <div className="bg-[#1a1e23] p-6 rounded-md border border-gray-700">
            <h2 className="text-xl font-bold mb-2">Spam Detection</h2>
            {spam ? (
              <>
                <p
                  className={`text-2xl ${
                    spam?.prediction === "Spam"
                      ? "text-red-400"
                      : "text-yellow-400"
                  }`}
                >
                  {spam?.prediction}
                </p>
                <p className="text-gray-400 text-sm">
                  Confidence: {(spam?.confidence * 100).toFixed(2)}%
                </p>
              </>
            ) : (
              <p className="text-gray-500">Not available yet.</p>
            )}
          </div>

          <button
            className="mt-6 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-md font-bold"
            onClick={() => navigate(-1)}
          >
            Submit Another Review
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AnalysisPage;
