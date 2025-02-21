import React, { useEffect, useState } from "react";

function ChatInput() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("en");

  interface SummarizeRequest {
    text: string;
    language: string;
  }

  interface SummarizeResponse {
    summary: string;
  }


  //langauge detection function
  const detectLanguage = async (text: string) => {
    try {
      const response = await fetch("/api/detect-language", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text } as { text: string }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok && data.data?.language) {
        setLanguage(data.data.language);
      } else {
        setLanguage("en");
      }
    } catch (error) {
      console.error("Error detecting language:", error);
      setLanguage("en");
    }
  };

  useEffect(() => {
    if (text.length > 10) {
      detectLanguage(text);
    }
  }, [text]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, language } as SummarizeRequest),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok && data.data?.text) {
        setSummary(data.data.text);
      } else {
        setSummary("Failed to summarize text.");
      }
    } catch (error) {
      console.error("Error summarizing text:", error);
      setSummary("Failed to summarize text.");
    }

    setLoading(false);
  };

  return (
    <section className="max-w-4xl mx-auto px-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Original Text Input */}
        <div>
          <label className="block font-medium text-gray-700">Original Text</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start typing or paste your content here..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
            rows={6}
          />
        </div>
        <div>
        </div>
                {/* Submit Button */}
                <button
          type="submit"
          className="w-full bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-500 focus:outline-none"
          disabled={loading}
        >
          {loading ? "Summarizing..." : "Summarize"}
        </button>

        {/* Language Selection */}
        <div>
          <label className="block font-medium text-gray-700">Select Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="en">English</option>
            <option value="pt">Portuguese</option>
            <option value="ru">Russian</option>
            <option value="tr">Turkish</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
        </div>

        {/* Summary Output */}
        <div>
          <label className="block font-medium text-gray-700">Summarized Text</label>
          <textarea
            value={summary}
            readOnly
            placeholder="Your summary will appear here..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none bg-gray-100"
            rows={6}
          />
        </div>
      </form>
    </section>
  );
}

export default ChatInput;
