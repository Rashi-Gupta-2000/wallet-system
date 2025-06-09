export const handleApiError = (error) => {
  if (error.name === "TypeError" && error.message.includes("fetch")) {
    return "Unable to connect to server. Please check your internet connection.";
  }

  if (error.message.includes("400")) {
    return "Invalid request. Please check your input.";
  }

  if (error.message.includes("401")) {
    return "Authentication failed. Please try again.";
  }

  if (error.message.includes("404")) {
    return "Wallet not found. Please check the wallet ID.";
  }

  if (error.message.includes("500")) {
    return "Server error. Please try again later.";
  }

  return error.message || "An unexpected error occurred.";
};

export const retryApiCall = async (apiCall, retries = 3, delay = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await apiCall();
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
};
