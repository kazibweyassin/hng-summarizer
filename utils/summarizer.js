export const isSummarizerAvailable = async () => {
    if (typeof self === "undefined" || !self.ai || !self.ai.summarizer) {
      console.error("Summarizer API is not available in this browser.");
      return false;
    }
  
    try {
      const capabilities = await self.ai.summarizer.capabilities();
      return capabilities.available !== "no";
    } catch (error) {
      console.error("Error checking summarizer capabilities:", error);
      return false;
    }
  };
  
  export const summarizeText = async (text, context = "") => {
    if (!(await isSummarizerAvailable())) {
      throw new Error("Summarizer API is not available.");
    }
  
    const options = {
      sharedContext: context,
      type: "key-points", 
      format: "plain-text", 
      length: "medium", 
    };
  
    try {
      const summarizer = await self.ai.summarizer.create(options);
  
      if (!summarizer || typeof summarizer.summarize !== "function") {
        throw new Error("Failed to create summarizer instance.");
      }
  
      return await summarizer.summarize(text);
    } catch (error) {
      console.error("Error summarizing text:", error);
      throw new Error("Summarization failed.");
    }
  };
  